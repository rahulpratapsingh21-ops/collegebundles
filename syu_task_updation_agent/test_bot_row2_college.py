from sheet_manager import SheetManager
import config
from cms_bot import SYUCmsBot

url = 'https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit?gid=0#gid=0'
sm = SheetManager(url)
task = sm.get_task_by_row(2)
print("Fetched Task for Row 2:", task)

classification = config.classify_task_automatically(task)
print("\nClassification Result:")
for k, v in classification.items():
    print(f"  {k}: {v}")

bot = SYUCmsBot(headless=True)
bot.start()
try:
    bot.login_if_needed()
    task_id = bot.process_task_automatically(task)
    print(f"\nFinal Result: Task ID created = {task_id}")
finally:
    bot.stop()
