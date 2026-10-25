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
    time.sleep(1)
    
    # Select Category -> Colleges
    cat_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Category'))").first
    cat_wrapper.locator(".select__control").first.click()
    time.sleep(0.5)
    page.locator("div[class*='-option']:has-text('Colleges')").first.click()
    time.sleep(2)
    
    page.screenshot(path="debug_cms_colleges_form.png")
    
    # Print all labels visible
    labels = page.locator(".form-field-wrapper label").all()
    print("Labels when Category is Colleges:")
    for lbl in labels:
        if lbl.is_visible():
            print(f" - {lbl.inner_text().strip()}")
            
    browser.close()
