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
    
    page.locator("button:has-text('Create Subtask')").first.click()
    time.sleep(3)
    
    page.screenshot(path="inspect_48563_subtask_form.png")
    print("Subtask form URL:", page.url)
    
    labels = page.locator(".form-field-wrapper label").all_inner_texts()
    print("Subtask form labels:")
    for l in labels:
        print(f" - {l.strip()}")
        
    browser.close()
