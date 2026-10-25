from sheet_manager import SheetManager

url = 'https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit?gid=0#gid=0'
sm = SheetManager(url)
print("Columns:", sm.df.columns.tolist())
for i, r in sm.df.head(15).iterrows():
    row_num = i + 2
    title = r.get("News Title")
    cat = r.get("Category")
    live_url = r.get("Live URL")
    task_id = r.get("Task ID")
    print(f"Row {row_num}: Title='{title}' | Cat='{cat}' | LiveURL='{live_url}' | TaskID='{task_id}'")
