from cms_bot import SYUCmsBot
from sheet_manager import SheetManager
import time
import config

print("\n--- Testing Row 1558 Full Updation Flow with SubTask ---")
sm = SheetManager("http://docs.google.com/spreadsheets/d/1bsGKL667kifcVDHeWK35Edb0juxoRvNUDsFWiQVE2zc/edit?gid=0#gid=0")
task = sm.get_task_by_row(1558)
print("Task data:", task)

bot = SYUCmsBot(headless=True)
bot.start()

try:
    bot.login_if_needed()
    task_id = bot.process_task_automatically(task)
    print(f"\n>>> RESULT TASK ID: {task_id}")
    
    # Verify in CMS tasks table with screenshot of expanded row
    bot.page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
    time.sleep(2)
    first_row = bot.page.locator("table tbody tr").first
    expand_btn = first_row.locator("span[title='Toggle Row Expanded'], svg").first
    if expand_btn.is_visible():
        expand_btn.click()
        time.sleep(2)
    bot.page.screenshot(path="row_1558_verified_with_subtask.png")
    print("Screenshot saved to row_1558_verified_with_subtask.png")
finally:
    bot.stop()
