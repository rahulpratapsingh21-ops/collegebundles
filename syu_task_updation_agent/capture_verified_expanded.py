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

    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="networkidle")
    time.sleep(2)
    page.wait_for_selector("table tbody tr")
    
    first_row = page.locator("table tbody tr").first
    print("Row 0 text:", first_row.inner_text().replace("\n", " | "))
    
    expand_btn = first_row.locator("span[title='Toggle Row Expanded'], svg").first
    if expand_btn.is_visible():
        expand_btn.click()
        time.sleep(2)
        
    page.screenshot(path="row_1558_verified_expanded.png")
    print("Saved row_1558_verified_expanded.png")
    browser.close()
