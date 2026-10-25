import os
import re
import pandas as pd
from datetime import datetime

class SheetManager:
    def __init__(self, file_path_or_url):
        self.source = file_path_or_url
        self.df = None
        self.is_excel = False
        self.is_csv = False
        self.file_path = None
        self.load_data()

    def load_data(self):
        src = self.source.strip()
        
        # Check if Google Sheet URL
        if "docs.google.com/spreadsheets" in src:
            # Convert edit URL to export CSV URL
            match = re.search(r"/d/([a-zA-Z0-9-_]+)", src)
            if match:
                sheet_id = match.group(1)
                gid = "0"
                gid_match = re.search(r"[#&]gid=([0-9]+)", src)
                if gid_match:
                    gid = gid_match.group(1)
                csv_export_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
                print(f"[SheetManager] Loading Google Sheet from: {csv_export_url}")
                self.df = pd.read_csv(csv_export_url)
                self.is_csv = True
                self.file_path = os.path.join(os.path.dirname(__file__), f"syu_sheet_exported_{int(datetime.now().timestamp())}.csv")
                self.df.to_csv(self.file_path, index=False)
                return

        self.file_path = os.path.abspath(src)
        if not os.path.exists(self.file_path):
            raise FileNotFoundError(f"File not found: {self.file_path}")

        if self.file_path.endswith(".xlsx") or self.file_path.endswith(".xls"):
            self.df = pd.read_excel(self.file_path)
            self.is_excel = True
        else:
            self.df = pd.read_csv(self.file_path)
            self.is_csv = True

        print(f"[SheetManager] Loaded {len(self.df)} rows from {os.path.basename(self.file_path)}")

    def get_column_mapping(self):
        """
        Maps standard field names to actual column names in the sheet
        """
        cols = list(self.df.columns)
        mapping = {
            "title": None,
            "live_url": None,
            "writer": None,
            "editor": None,
            "task_id": None,
            "category": None
        }

        for col in cols:
            c = str(col).strip().lower()
            if "task id" in c or c == "task_id" or c == "taskid":
                if not mapping["task_id"] or c == "task id":
                    mapping["task_id"] = col
            elif "news title" in c or "topic" in c or "task name" in c or c == "title":
                if not mapping["title"] or c == "news title" or c == "title":
                    mapping["title"] = col
            elif "live url" in c or "live_url" in c or "url" in c:
                if not mapping["live_url"] or c == "live url" or c == "url":
                    mapping["live_url"] = col
            elif "writer" in c:
                if not mapping["writer"] or c == "writer":
                    mapping["writer"] = col
            elif "editor" in c:
                if not mapping["editor"] or c == "editor":
                    mapping["editor"] = col
            elif c == "category" or c == "content category":
                # EXACT match takes absolute highest priority!
                mapping["category"] = col
            elif ("category" in c or "blog type" in c) and not mapping["category"]:
                # Only use partial match (e.g. blog type) if exact category is not yet found
                if not c.endswith(".1") and not c.endswith(".2"):
                    mapping["category"] = col

        # Fallbacks if columns are not found
        if not mapping["title"] and len(cols) > 1:
            mapping["title"] = cols[1]  # Column B usually
        if not mapping["task_id"]:
            # Check if Column E exists
            for col in cols:
                if str(col).strip().upper() in ["E", "TASK ID"]:
                    mapping["task_id"] = col
                    break
            if not mapping["task_id"]:
                mapping["task_id"] = "Task ID"
                self.df["Task ID"] = ""

        return mapping

    def get_pending_tasks(self, mode="updation"):
        """
        Returns a list of dicts representing pending rows where Task ID is blank.
        mode='updation': requires live_url to be present
        mode='new_task': handles rows where live_url is empty
        """
        mapping = self.get_column_mapping()
        pending = []

        for idx, row in self.df.iterrows():
            task_id = str(row.get(mapping["task_id"], "")).strip()
            # If task_id is already filled (digits), skip
            if task_id and task_id.lower() != "nan" and task_id.replace(".0", "").isdigit():
                continue

            title = str(row.get(mapping["title"], "")).strip()
            if not title or title.lower() == "nan":
                continue

            # Check FULL row for ANY selectyouruniversity.com URL
            row_dict = row.to_dict()
            found_url = ""
            for k, v in row_dict.items():
                if v is not None:
                    v_str = str(v).strip()
                    m = re.search(r"https?://(?:www\.)?selectyouruniversity\.com/[^\s,\"\']+", v_str)
                    if m:
                        found_url = m.group(0).rstrip(".,;\"'")
                        break

            live_url = found_url or (str(row.get(mapping["live_url"], "")).strip() if mapping["live_url"] else "")
            if live_url.lower() == "nan":
                live_url = ""

            writer = str(row.get(mapping["writer"], "")).strip() if mapping["writer"] else ""
            editor = str(row.get(mapping["editor"], "")).strip() if mapping["editor"] else ""
            category = str(row.get(mapping["category"], "")).strip() if mapping["category"] else ""

            if mode == "updation" and not live_url:
                continue
            if mode == "new_task" and live_url:
                continue

            pending.append({
                "row_index": idx,
                "title": title,
                "live_url": live_url,
                "writer": writer if writer.lower() != "nan" else "",
                "editor": editor if editor.lower() != "nan" else "",
                "category": category if category.lower() != "nan" else "",
                "row_dict": row_dict,
                "found_url": live_url,
                "sheet_url": self.source,
                "row_number": idx + 2,
            })

        return pending

    def get_task_by_row(self, row_number):
        """
        Retrieves a task by its 1-based sheet row number (e.g. Row 1558).
        In Excel / Google Sheets, Row 1 is Header, so Row N is index N - 2.
        """
        mapping = self.get_column_mapping()
        idx = int(row_number) - 2
        if idx < 0 or idx >= len(self.df):
            return None

        row = self.df.iloc[idx]
        title = str(row.get(mapping["title"], "")).strip()

        # Check FULL row for ANY selectyouruniversity.com URL
        row_dict = row.to_dict()
        found_url = ""
        for k, v in row_dict.items():
            if v is not None:
                v_str = str(v).strip()
                m = re.search(r"https?://(?:www\.)?selectyouruniversity\.com/[^\s,\"\']+", v_str)
                if m:
                    found_url = m.group(0).rstrip(".,;\"'")
                    break

        live_url = found_url or (str(row.get(mapping["live_url"], "")).strip() if mapping["live_url"] else "")
        if live_url.lower() == "nan":
            live_url = ""

        writer = str(row.get(mapping["writer"], "")).strip() if mapping["writer"] else ""
        editor = str(row.get(mapping["editor"], "")).strip() if mapping["editor"] else ""
        category = str(row.get(mapping["category"], "")).strip() if mapping["category"] else ""
        if not category or category.lower() == "nan":
            for k, v in row_dict.items():
                if "category" in str(k).lower() and not str(k).lower().endswith(".1") and not str(k).lower().endswith(".2"):
                    v_str = str(v).strip()
                    if v_str and v_str.lower() != "nan":
                        category = v_str
                        break

        return {
            "row_index": idx,
            "row_number": int(row_number),
            "title": title if title.lower() != "nan" else "",
            "live_url": live_url,
            "writer": writer if writer.lower() != "nan" else "",
            "editor": editor if editor.lower() != "nan" else "",
            "category": category if category.lower() != "nan" else "",
            "row_dict": row_dict,
            "found_url": live_url,
            "sheet_url": self.source,
        }

    def get_tasks_from_row(self, start_row, count=None):
        """
        Retrieves a list of tasks starting from start_row (e.g. Row 1560) onward.
        If count is None or 'all', returns all remaining rows with valid titles.
        """
        mapping = self.get_column_mapping()
        start_idx = max(0, int(start_row) - 2)
        tasks = []
        for idx in range(start_idx, len(self.df)):
            if count is not None and len(tasks) >= count:
                break
            row = self.df.iloc[idx]
            title = str(row.get(mapping["title"], "")).strip()
            if not title or title.lower() == "nan":
                continue

            row_dict = row.to_dict()
            found_url = ""
            for k, v in row_dict.items():
                if v is not None:
                    v_str = str(v).strip()
                    m = re.search(r"https?://(?:www\.)?selectyouruniversity\.com/[^\s,\"\']+", v_str)
                    if m:
                        found_url = m.group(0).rstrip(".,;\"'")
                        break

            live_url = found_url or (str(row.get(mapping["live_url"], "")).strip() if mapping["live_url"] else "")
            if live_url.lower() == "nan":
                live_url = ""

            writer = str(row.get(mapping["writer"], "")).strip() if mapping["writer"] else ""
            editor = str(row.get(mapping["editor"], "")).strip() if mapping["editor"] else ""
            category = str(row.get(mapping["category"], "")).strip() if mapping["category"] else ""
            if not category or category.lower() == "nan":
                for k, v in row_dict.items():
                    if "category" in str(k).lower() and not str(k).lower().endswith(".1") and not str(k).lower().endswith(".2"):
                        v_str = str(v).strip()
                        if v_str and v_str.lower() != "nan":
                            category = v_str
                            break

            tasks.append({
                "row_index": idx,
                "row_number": idx + 2,
                "title": title,
                "live_url": live_url,
                "writer": writer if writer.lower() != "nan" else "",
                "editor": editor if editor.lower() != "nan" else "",
                "category": category if category.lower() != "nan" else "",
                "row_dict": row_dict,
                "found_url": live_url,
                "sheet_url": self.source,
            })
        return tasks

    def update_task_id(self, row_index, task_id):
        """
        Updates the Task ID for a specific row in the DataFrame
        """
        mapping = self.get_column_mapping()
        task_id_col = mapping["task_id"] or "Task ID"
        if task_id_col not in self.df.columns:
            self.df[task_id_col] = ""
        self.df[task_id_col] = self.df[task_id_col].astype(object)
        self.df.at[row_index, task_id_col] = str(task_id)
        print(f"[SheetManager] Row #{row_index + 2} Task ID column '{task_id_col}' set to: {task_id}")

    def save(self):
        """
        Saves updated dataframe back to the original file AND exports to syu_sheet_updated.xlsx
        """
        # 1. Save to primary file
        if self.file_path.endswith(".xlsx") or self.file_path.endswith(".xls"):
            self.df.to_excel(self.file_path, index=False)
        else:
            self.df.to_csv(self.file_path, index=False)
        print(f"[SheetManager] Successfully updated file: {self.file_path}")

        # 2. Always also export to syu_sheet_updated.xlsx in the working directory
        excel_backup = os.path.join(os.path.dirname(__file__), "syu_sheet_updated.xlsx")
        try:
            self.df.to_excel(excel_backup, index=False)
            print(f"[SheetManager] Updated Excel spreadsheet saved at: {excel_backup}")
        except Exception as e:
            print(f"[Warn] Excel export: {e}")

