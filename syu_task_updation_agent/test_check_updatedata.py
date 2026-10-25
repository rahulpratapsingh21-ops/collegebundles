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
        
    page.goto(config.CMS_CREATE_TASK_URL, wait_until="networkidle")
    time.sleep(2)
    
    # Select Blogs
    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Blogs')").first.click()
    time.sleep(1)
    
    # Check checkbox with force=True
    chk = page.locator("#updateData")
    print("Is checked before:", chk.is_checked())
    chk.check(force=True)
    time.sleep(1)
    print("Is checked after:", chk.is_checked())
    
    page.screenshot(path="is_update_checked_true.png")
    
    # Inspect all visible labels and fields now!
    labels = page.locator("label").all()
    for l in labels:
        if l.is_visible():
            print("Visible label:", l.inner_text().strip())
            
    browser.close()
