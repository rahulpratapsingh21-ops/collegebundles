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
    
    # 1. Select Category -> Colleges
    cat_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Category'))").first
    cat_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    page.locator("div[class*='-option']:has-text('Colleges')").first.click()
    time.sleep(1)
    
    # 2. Check Entity dropdown
    entity_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    entity_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    
    inp = entity_wrapper.locator("input.select__input, input").first
    inp.type("Jorhat Institute of Science", delay=50)
    time.sleep(2)
    
    options = page.locator("div[class*='-option']").all()
    print("Entity search results for 'Jorhat Institute of Science':")
    for opt in options:
        print(f" -> '{opt.inner_text().strip()}'")
        
    page.screenshot(path="debug_entity_jorhat.png")
    browser.close()
