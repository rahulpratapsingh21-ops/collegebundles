import sys
import os
from config import CMS_LOGIN_URL
from sheet_manager import SheetManager
from cms_bot import SYUCmsBot

def print_banner():
    print("""
============================================================
       SYU AUTONOMOUS TASK UPDATION & CREATION AGENT
       SelectYourUniversity CMS AI Automation Engine
============================================================
""")

def main():
    print_banner()

    default_sample = "https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit?gid=0#gid=0"
    sm = SheetManager(default_sample)
    all_pending = sm.get_pending_tasks(mode="all")

    # Check CLI arguments for quick execution (e.g. python agent.py 1560 or python agent.py 1560 all)
    start_row = None
    count_val = 1

    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        start_row = int(sys.argv[1])
        if len(sys.argv) > 2:
            if sys.argv[2].isdigit():
                count_val = int(sys.argv[2])
            elif sys.argv[2].lower() == "all":
                count_val = None
    elif len(sys.argv) > 1 and sys.argv[1].lower() == "all":
        start_row = 2
        count_val = None

    if start_row is None:
        while True:
            r_inp = input("\nEnter Starting Row Number from Excel (e.g. 1560): ").strip()
            if r_inp.isdigit():
                start_row = int(r_inp)
                break
            elif r_inp.lower() in ["exit", "q"]:
                print("Exiting.")
                sys.exit(0)
            print("Please enter a valid row number (e.g. 1560).")

        print("\nHow many rows do you want to process?")
        print("  - Press [Enter] for ONLY this 1 row")
        print("  - Enter a number (e.g. 5, 10) to process continuously")
        print("  - Type 'all' to process continuously from this row to the end")
        c_inp = input("\nEnter choice (Default: 1 row): ").strip().lower()
        if c_inp == "all":
            count_val = None
        elif c_inp.isdigit() and int(c_inp) > 0:
            count_val = int(c_inp)
        else:
            count_val = 1

    print(f"\n[Fetching] Loading tasks starting from Row #{start_row} (Count: {'ALL' if count_val is None else count_val})...")
    pending = sm.get_tasks_from_row(start_row, count=count_val)

    if not pending:
        print("\n[Info] No tasks to process.")
        return

    print(f"\n[Ready] Queued {len(pending)} tasks to process.")
    for idx, item in enumerate(pending[:5], 1):
        row_num = item["row_index"] + 2
        task_type = "UPDATION" if item.get("live_url") else "NEW"
        w_name = item.get("writer", "")
        e_name = item.get("editor", "")
        print(f"  [{idx}] Row #{row_num}: [{task_type}] {item['title'][:50]}... | Writer: '{w_name}' | Editor: '{e_name}'")

    # Initialize Bot (Visible browser so user can watch in real time)
    bot = SYUCmsBot(headless=False)
    bot.start()

    try:
        # Step 1: Ensure Logged In
        bot.login_if_needed()

        # Process each task
        success_count = 0
        for i, item in enumerate(pending, 1):
            row_num = item["row_index"] + 2
            print(f"\n------------------------------------------------------------")
            print(f"Processing Task {i} of {len(pending)} (Row #{row_num})")
            print(f"  Title: {item['title']}")
            print(f"  Excel Writer: '{item.get('writer', '')}' | Excel Editor: '{item.get('editor', '')}'")
            print(f"  Detected URL: '{item.get('live_url', '')}'")
            print(f"------------------------------------------------------------")

            task_id = bot.process_task_automatically(item)

            if task_id:
                sm.update_task_id(item["row_index"], task_id)
                sm.save()
                success_count += 1
                print(f"[PROGRESS] Successfully updated Row #{row_num} with Task ID: {task_id}")
            else:
                print(f"[SKIPPED] No Task ID retrieved for row #{row_num}")

        print("\n" + "="*60)
        print(f"FINISHED! Successfully processed {success_count} / {len(pending)} tasks.")
        print(f"Updated sheet saved at: {sm.file_path}")
        print("="*60 + "\n")

    except Exception as e:
        print(f"\n[Error during execution]: {e}")
        import traceback
        traceback.print_exc()

    finally:
        input("\nPress Enter to exit and close browser...")
        bot.stop()

if __name__ == '__main__':
    main()
