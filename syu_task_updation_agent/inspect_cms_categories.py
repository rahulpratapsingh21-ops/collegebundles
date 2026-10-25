from playwright.sync_api import sync_playwright
import config
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL)
    page.wait_for_selector("input[type='email']")
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url("**/admin/collections/**", timeout=25000)
    
    page.goto(config.CMS_CREATE_TASK_URL)
    page.wait_for_selector(".select__control")
    time.sleep(2)
    
    # Click Category dropdown
    wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Category'))").first
    wrapper.locator(".select__control").first.click()
    time.sleep(1)
    
    options = page.locator("div[class*='-option']").all()
    print("Available Category options in CMS:")
    for opt in options:
        print(f" - '{opt.inner_text().strip()}'")
        
    page.screenshot(path="debug_cms_category_options.png")
    browser.close()
