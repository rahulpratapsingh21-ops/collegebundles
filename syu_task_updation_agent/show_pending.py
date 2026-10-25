from sheet_manager import SheetManager

sm = SheetManager("http://docs.google.com/spreadsheets/d/1bsGKL667kifcVDHeWK35Edb0juxoRvNUDsFWiQVE2zc/edit?gid=0#gid=0")

for r in range(1555, 1565):
    t = sm.get_task_by_row(r)
    if t:
        task_id = t.get("row_dict", {}).get("Task ID", "")
        print(f"Row #{r}: Task ID='{task_id}' | Title='{t.get('title')}' | URL='{t.get('live_url')}'")
