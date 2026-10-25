from playwright.sync_api import sync_playwright
import config
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL)
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url("**/admin/collections/**", timeout=25000)
    
    # Open 48563
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=10")
    page.wait_for_selector("table tbody tr")
    page.locator("table tbody tr").first.locator("td").nth(2).click()
    time.sleep(3)
    
    page.screenshot(path="verified_48563_subtask.png")
    print("Page URL:", page.url)
    
    subtasks = page.locator("div.subtask, table tbody tr, .subtasks-list").all_inner_texts()
    print("Subtasks count/info:", len(subtasks))
    browser.close()
