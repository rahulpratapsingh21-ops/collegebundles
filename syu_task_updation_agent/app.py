import os
import sys
import json
import time
import queue
import threading
from datetime import datetime
from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename

import config
from sheet_manager import SheetManager
from cms_bot import SYUCmsBot

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

DEFAULT_SHEET_URL = ""

# Global State
agent_state = {
    "is_running": False,
    "should_stop": False,
    "current_row": None,
    "current_task": None,
    "progress_percent": 0,
    "step": "idle",
    "step_description": "Agent is idle. Ready to launch.",
    "current_source": "",
    "sheet_info": None,
    "processed_tasks": [],
    "logs": []
}

log_queue = queue.Queue()

class LogStreamer:
    """Redirects console output to both terminal and the UI live stream"""
    def __init__(self, original_stdout):
        self.original_stdout = original_stdout

    def write(self, message):
        self.original_stdout.write(message)
        if message and message.strip():
            entry = {
                "timestamp": datetime.now().strftime("%H:%M:%S"),
                "text": message.strip()
            }
            agent_state["logs"].append(entry)
            if len(agent_state["logs"]) > 200:
                agent_state["logs"].pop(0)
            log_queue.put(entry)

    def flush(self):
        self.original_stdout.flush()

sys.stdout = LogStreamer(sys.stdout)

cached_sheet_manager = None
sheet_lock = threading.Lock()

def get_sheet_manager(source_path_or_url=None):
    global cached_sheet_manager
    with sheet_lock:
        if not source_path_or_url:
            source_path_or_url = agent_state.get("current_source")
        if not source_path_or_url:
            raise ValueError("No Google Sheet link provided. Please paste your sheet link and click Load.")
        if cached_sheet_manager is None or cached_sheet_manager.source != source_path_or_url:
            cached_sheet_manager = SheetManager(source_path_or_url)
        return cached_sheet_manager

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/sheet-info", methods=["GET"])
def get_sheet_info():
    source = (request.args.get("source") or agent_state.get("current_source") or "").strip()
    if not source:
        return jsonify({"success": False, "error": "Please provide a Google Sheet link or upload an Excel file."}), 400
    try:
        sm = get_sheet_manager(source)
        cols = list(sm.df.columns)
        total_rows = len(sm.df)
        mapping = sm.get_column_mapping()
        
        info = {
            "source": source,
            "total_rows": total_rows,
            "min_row": 2,
            "max_row": total_rows + 1,
            "columns": cols,
            "mapped_title": mapping.get("title"),
            "mapped_url": mapping.get("live_url"),
            "mapped_task_id": mapping.get("task_id")
        }
        agent_state["sheet_info"] = info
        agent_state["current_source"] = source
        return jsonify({"success": True, "data": info})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/network-info", methods=["GET"])
def get_network_info():
    import socket
    local_ip = "127.0.0.1"
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        pass

    public_url = None
    url_file = os.path.join(BASE_DIR, "current_live_url.txt")
    if os.path.exists(url_file):
        try:
            with open(url_file, "r") as f:
                public_url = f.read().strip()
        except Exception:
            pass

    port = int(os.environ.get("PORT", 5000))
    return jsonify({
        "success": True,
        "data": {
            "localhost": f"http://localhost:{port}",
            "local_network": f"http://{local_ip}:{port}",
            "public_url": public_url
        }
    })

CATEGORY_TABS_MAP = {
    "colleges": [
        "Overview", "Courses And Fees", "Admissions", "Placements",
        "Infrastructure", "Faculty", "Scholarship", "News And Articles"
    ],
    "exams": [
        "Overview", "Application Process", "Eligibility And Preparation",
        "Exam Details", "Results", "Accepting Colleges", "Exam Dates",
        "Syllabus", "Past Question Papers"
    ],
    "courses": [
        "Overview", "Eligibility", "Syllabus", "Jobs And Careers", "General"
    ],
    "blogs": [
        "Blog Content"
    ]
}

@app.route("/api/category-tabs", methods=["GET"])
def get_category_tabs():
    return jsonify({"success": True, "tabs": CATEGORY_TABS_MAP})

@app.route("/api/preview-row", methods=["GET"])
def preview_row():
    row_num = request.args.get("row_number", type=int)
    source = (request.args.get("source") or agent_state.get("current_source") or "").strip()
    if not source:
        return jsonify({"success": False, "error": "No sheet connected. Please paste your Google Sheet link first."}), 400
    if not row_num:
        return jsonify({"success": False, "error": "Missing row_number"}), 400

    try:
        sm = get_sheet_manager(source)
        task = sm.get_task_by_row(row_num)
        if not task:
            return jsonify({"success": False, "error": f"Row #{row_num} not found or empty"}), 404

        classification = config.classify_task_automatically(task)
        cat_key = classification.get("category", "").lower()
        available_tabs = CATEGORY_TABS_MAP.get(cat_key, ["Overview"])
        
        preview_data = {
            "row_number": row_num,
            "title": task.get("title"),
            "writer": task.get("writer"),
            "editor": task.get("editor"),
            "live_url": task.get("live_url"),
            "mode": "UPDATION" if classification["is_updation"] else "NEW TASK",
            "is_new_task": not classification["is_updation"],
            "category": classification.get("category", "").capitalize(),
            "category_key": cat_key,
            "available_tabs": available_tabs,
            "entity": classification.get("entity_search"),
            "sub_page": classification.get("sub_page"),
            "h1": classification.get("h1"),
            "meta_title": classification.get("meta_title"),
            "meta_description": classification.get("meta_description")
        }
        return jsonify({"success": True, "data": preview_data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/upload-sheet", methods=["POST"])
def upload_sheet():
    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file provided"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"success": False, "error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{int(time.time())}_{filename}")
    file.save(save_path)

    try:
        global cached_sheet_manager
        cached_sheet_manager = SheetManager(save_path)
        agent_state["current_source"] = save_path
        cols = list(cached_sheet_manager.df.columns)
        total_rows = len(cached_sheet_manager.df)

        info = {
            "source": save_path,
            "filename": filename,
            "total_rows": total_rows,
            "min_row": 2,
            "max_row": total_rows + 1,
            "columns": cols
        }
        agent_state["sheet_info"] = info
        return jsonify({"success": True, "data": info})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def run_agent_thread(start_row, count_val, headless=False, source=None, selected_tabs=None):
    agent_state["is_running"] = True
    agent_state["should_stop"] = False
    agent_state["step"] = "starting"
    agent_state["step_description"] = "Initializing browser and logging into SYU CMS..."

    try:
        sm = get_sheet_manager(source)
        tasks = sm.get_tasks_from_row(start_row, count=count_val)
        
        if not tasks:
            print(f"[Agent UI] No tasks found starting from row #{start_row}.")
            agent_state["step_description"] = f"No tasks found starting from row #{start_row}."
            return

        print(f"[Agent UI] Queued {len(tasks)} tasks starting from Row #{start_row}...")
        
        bot = SYUCmsBot(headless=headless)
        bot.start()

        try:
            agent_state["step"] = "logging_in"
            agent_state["step_description"] = "Logging into CMS (rahul@syu.com)..."
            bot.login_if_needed()

            total_count = len(tasks)
            for idx, task_item in enumerate(tasks, 1):
                if agent_state["should_stop"]:
                    print("\n[Agent UI] Execution stopped by user!")
                    break

                row_num = task_item["row_number"]
                agent_state["current_row"] = row_num
                agent_state["current_task"] = task_item["title"]
                agent_state["progress_percent"] = int(((idx - 1) / total_count) * 100)
                agent_state["step"] = "processing_task"
                agent_state["step_description"] = f"Processing Row #{row_num}: {task_item['title'][:45]}..."

                print(f"\n============================================================")
                print(f"[Agent UI] Processing Row #{row_num} ({idx}/{total_count})")
                print(f"Title: {task_item['title']}")
                print(f"============================================================")

                if selected_tabs:
                    task_item["selected_tabs"] = selected_tabs

                task_id = bot.process_task_automatically(task_item)

                record = {
                    "row_number": row_num,
                    "title": task_item["title"],
                    "live_url": task_item.get("live_url", ""),
                    "mode": "UPDATION" if task_item.get("live_url") else "NEW TASK",
                    "task_id": task_id if task_id else "FAILED",
                    "status": "SUCCESS" if task_id else "WARNING",
                    "time": datetime.now().strftime("%H:%M:%S")
                }
                agent_state["processed_tasks"].insert(0, record)

                if task_id:
                    sm.update_task_id(task_item["row_index"], task_id)
                    sm.save()

            agent_state["progress_percent"] = 100
            agent_state["step"] = "completed"
            agent_state["step_description"] = f"All {total_count} tasks completed successfully!"
            print("\n[Agent UI] Batch execution successfully finished!")

        finally:
            bot.stop()

    except Exception as e:
        print(f"[Agent UI Error]: {e}")
        agent_state["step"] = "error"
        agent_state["step_description"] = f"Error: {e}"
    finally:
        agent_state["is_running"] = False
        agent_state["should_stop"] = False

@app.route("/api/start-agent", methods=["POST"])
def start_agent():
    if agent_state["is_running"]:
        return jsonify({"success": False, "error": "Agent is already running!"}), 400

    data = request.json or {}
    source = (data.get("source") or agent_state.get("current_source") or "").strip()
    if not source:
        return jsonify({"success": False, "error": "Please provide a Google Sheet link or upload an Excel file first!"}), 400

    start_row = data.get("start_row", 2)
    count = data.get("count", 1)
    headless = data.get("headless", False)

    count_val = None if str(count).lower() == "all" else int(count)
    selected_tabs = data.get("selected_tabs")

    t = threading.Thread(target=run_agent_thread, args=(start_row, count_val, headless, source, selected_tabs), daemon=True)
    t.start()

    return jsonify({
        "success": True,
        "message": f"Agent started from Row #{start_row} for count: {count}"
    })

@app.route("/api/stop-agent", methods=["POST"])
def stop_agent():
    if not agent_state["is_running"]:
        return jsonify({"success": False, "message": "Agent is not running."})
    agent_state["should_stop"] = True
    agent_state["step_description"] = "Stopping agent gracefully after current operation..."
    return jsonify({"success": True, "message": "Stop signal sent to agent."})

@app.route("/api/clear-processed-tasks", methods=["POST"])
def clear_processed_tasks():
    agent_state["processed_tasks"] = []
    return jsonify({"success": True, "message": "Processed tasks log cleared."})

@app.route("/api/agent-status", methods=["GET"])
def get_agent_status():
    return jsonify({
        "success": True,
        "state": {
            "is_running": agent_state["is_running"],
            "current_row": agent_state["current_row"],
            "current_task": agent_state["current_task"],
            "progress_percent": agent_state["progress_percent"],
            "step": agent_state["step"],
            "step_description": agent_state["step_description"],
            "processed_tasks": agent_state["processed_tasks"][:15],
            "recent_logs": agent_state["logs"][-25:]
        }
    })

@app.route("/api/stream-logs")
def stream_logs():
    def generate():
        while True:
            try:
                log_entry = log_queue.get(timeout=25)
                yield f"data: {json.dumps(log_entry)}\n\n"
            except queue.Empty:
                yield f": keep-alive\n\n"
    return Response(generate(), mimetype="text/event-stream")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n============================================================")
    print(f"       SYU AUTOMATION STUDIO WEB UI RUNNING")
    print(f"       Local:   http://localhost:{port}")
    print(f"       Network: http://0.0.0.0:{port} (Any device on your Wi-Fi)")
    print(f"============================================================\n")
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
