from playwright.sync_api import sync_playwright
import config

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL)
    page.wait_for_selector("input[type='email']")
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url("**/admin/collections/**", timeout=25000)
    
    # Check tasks table
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=25")
    page.wait_for_selector("table tbody tr")
    page.screenshot(path="debug_cms_tasks_table.png")
    
    rows = page.locator("table tbody tr")
    print(f"Total rows in tasks table: {rows.count()}")
    for i in range(min(10, rows.count())):
        print(f"Row {i}: {rows.nth(i).inner_text().replace(chr(10), ' | ')}")
        
    browser.close()
