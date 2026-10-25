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
    
    page.goto("https://cms.selectyouruniversity.com/admin/collections/subTasks?limit=10")
    page.wait_for_selector("table tbody tr")
    time.sleep(2)
    
    rows = page.locator("table tbody tr").all_inner_texts()
    print("Latest Subtasks in CMS:")
    for r in rows[:5]:
        print(" ->", r.replace("\n", " | "))
        
    page.screenshot(path="subtasks_table_proof.png")
    browser.close()
