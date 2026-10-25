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
    
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks/6addaea16a658ef0b12ebbc9")
    page.wait_for_selector("button:has-text('Create Subtask')")
    time.sleep(2)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    page.screenshot(path="verified_48563_bottom.png")
    
    # Check text content at bottom
    text = page.locator("body").inner_text()
    for line in text.splitlines():
        if any(w in line.lower() for w in ["subtask", "mandatory", "rehana", "content writer", "natasha"]):
            print("Found line:", line)
            
    browser.close()
