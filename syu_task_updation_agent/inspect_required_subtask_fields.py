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
    
    # 48563
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks/6addaea16a658ef0b12ebbc9")
    page.wait_for_selector("button:has-text('Create Subtask')")
    time.sleep(1)
    page.locator("button:has-text('Create Subtask')").first.click()
    time.sleep(3)
    
    # Click Submit with everything empty to see all required fields!
    page.locator("button:has-text('Submit')").first.click()
    time.sleep(2)
    
    # Inspect every form-field-wrapper
    wrappers = page.locator(".form-field-wrapper").all()
    print("Total wrappers:", len(wrappers))
    for w in wrappers:
        lbl = w.locator("label").first.inner_text().strip() if w.locator("label").count() > 0 else "NO LABEL"
        html = w.inner_html()
        if "aria-invalid=\"true\"" in html or "error" in html or "invalid" in html:
            print(f" -> REQUIRED / INVALID FIELD: '{lbl}'")
            
    browser.close()
