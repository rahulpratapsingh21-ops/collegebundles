from playwright.sync_api import sync_playwright
import time
import config
from cms_bot import SYUCmsBot

bot = SYUCmsBot(headless=True)
bot.start()
bot.login_if_needed()

h1 = "CBSE 10th Previous Year Question Papers: Download CBSE Class 10th Papers PDFs"
meta_title = "CBSE 10th Past Question Papers: Download CBSE Class 10th Papers PDFs"
meta_desc = "Download CBSE Class 10 previous year question papers in PDF format for all subjects including Mathematics, Science, Social Science, Hindi, and English. Boost your exam preparation with real past exam papers."

# Open task 48559
bot.page.goto(config.CMS_TASKS_URL + "?limit=25", wait_until="domcontentloaded")
bot.page.wait_for_selector("table tbody tr")
time.sleep(1)

row = bot.page.locator("tr:has-text('48559')").first
row.locator("td").nth(2).click()
time.sleep(3)

bot.page.locator("button:has-text('Create Subtask')").first.click()
time.sleep(3)

# Title & Desc
bot.page.locator("input[name='title']").first.fill(h1)
desc = bot.page.locator("textarea[name='description']").first
if desc.is_visible():
    desc.fill(h1)

# Page & Mandatory: No
bot.select_dropdown_field("Page", "Past Question Papers")
time.sleep(0.3)
bot.select_dropdown_field("Mandatory", "No")
time.sleep(0.3)

# Keywords
pk_wrapper = bot.page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
pk_inp = pk_wrapper.locator("input").first
pk_inp.fill(h1)
bot.page.keyboard.press("Enter")
time.sleep(0.3)

sk_wrapper = bot.page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
sk_inp = sk_wrapper.locator("input").first
sk_inp.fill(h1)
bot.page.keyboard.press("Enter")
time.sleep(0.3)

# Meta tags
mt = bot.page.locator("input[name='metaTitle']").first
if mt.is_visible():
    mt.fill(meta_title)
md = bot.page.locator("textarea[name='metaDescription']").first
if md.is_visible():
    md.fill(meta_desc)

# Due date
bot.fill_due_date_today()

# SEO Manager, Editor, Writer
bot.select_dropdown_field("SEO Manager", "rahul@syu.com")
bot.select_dropdown_field("Content Editor", "contenteditor@syu.com")
bot.select_dropdown_field("Content Writer", "contentwriter@syu.com")

# Submit
bot.page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first.click()
time.sleep(4)
print("Subtask for 48559 submitted successfully!")

# Take screenshot of table with 48561, 48560, 48559
bot.page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
bot.page.wait_for_selector("table tbody tr")
time.sleep(2)
# Expand 48561
r_top = bot.page.locator("tr:has-text('48561')").first
btn_top = r_top.locator("span[title='Toggle Row Expanded']").first
if btn_top.is_visible():
    btn_top.click()
    time.sleep(1)

bot.page.screenshot(path="all_tasks_clean_verified.png")
print("Saved all_tasks_clean_verified.png")

bot.stop()
