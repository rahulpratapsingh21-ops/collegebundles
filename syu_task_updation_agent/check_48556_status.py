from playwright.sync_api import sync_playwright
import time
import config

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL, wait_until="domcontentloaded")
    if "/admin/login" in page.url:
        page.locator("input[type='email']").fill(config.CMS_EMAIL)
        page.locator("input[type='password']").fill(config.CMS_PASSWORD)
        page.locator("button[type='submit']").click()
        page.wait_for_url("**/admin/collections/**", timeout=20000)
        time.sleep(2)
        
    # Check tasks table
    page.goto(config.CMS_TASKS_URL + "?limit=100", wait_until="networkidle")
    time.sleep(2)
    sb = page.locator("input[placeholder*='Search'], input[type='search'], input").first
    sb.fill("48556")
    page.keyboard.press("Enter")
    time.sleep(2)
    
    rw = page.locator("tr:has-text('48556'), div[class*='row']:has-text('48556')").first
    expand_btn = rw.locator("svg, button, td:first-child").first
    if expand_btn.is_visible():
        print("Clicking expand button on 48556...")
        expand_btn.click()
        time.sleep(2)
    page.screenshot(path="check_48556_subtask.png")
    print("Tasks Table text:\n", page.locator("tbody, table").first.inner_text())
    
    # Check subTasks collection directly
    page.goto("https://cms.selectyouruniversity.com/admin/collections/subTasks?limit=25", wait_until="networkidle")
    time.sleep(2)
    page.screenshot(path="check_subtasks_list.png")
    print("\nSubTasks Table text:\n", page.locator("tbody, table").first.inner_text())
    
    browser.close()
