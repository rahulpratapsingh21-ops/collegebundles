"""
Quick Test Runner for SYU Task Agent
Runs automated task creation for a sheet row (Default: Row 1558)
"""
import sys
import time
from cms_bot import SYUCmsBot
from sheet_manager import SheetManager

def run(row_number=1558):
    print(f"\n[Quick Runner] Starting SYU Task Agent for Row #{row_number}...")
    
    # 1. Load sheet
    sm = SheetManager("http://docs.google.com/spreadsheets/d/1bsGKL667kifcVDHeWK35Edb0juxoRvNUDsFWiQVE2zc/edit?gid=0#gid=0")
    task = sm.get_task_by_row(row_number)
    
    if not task:
        print(f"[Error] Row #{row_number} not found in sheet!")
        return

    print(f"\nProcessing Task from Row #{row_number}:")
    print(f"  Title: {task['title']}")
    print(f"  Writer: '{task.get('writer')}'")
    print(f"  Editor: '{task.get('editor')}'")
    print(f"  Detected URL: '{task.get('live_url')}'")

    # 2. Launch CMS bot (visible browser so you can watch live)
    bot = SYUCmsBot(headless=False)
    bot.start()
    
    try:
        bot.login_if_needed()
        task_id = bot.process_task_automatically(task)
        
        if task_id:
            sm.update_task_id(task["row_index"], task_id)
            sm.save()
            print(f"\n[SUCCESS] Row #{row_number} created in CMS with Task ID: {task_id}")
            print(f"[SUCCESS] Updated sheet saved at: {sm.file_path}")
        else:
            print(f"\n[Warning] Task processed but could not read Task ID.")
    finally:
        if sys.stdin and sys.stdin.isatty() and "--auto" not in sys.argv:
            try:
                input("\nPress Enter to close browser...")
            except (EOFError, Exception):
                time.sleep(5)
        else:
            time.sleep(5)
        bot.stop()

if __name__ == "__main__":
    row = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else 1558
    run(row)
