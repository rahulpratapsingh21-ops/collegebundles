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
    time.sleep(1)
    page.locator("button:has-text('Create Subtask')").first.click()
    time.sleep(3)
    
    mand_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    mand_wrapper.locator(".select__control").first.click()
    time.sleep(0.5)
    
    # Try pressing ArrowDown and Enter
    page.keyboard.press("ArrowDown")
    time.sleep(0.3)
    page.keyboard.press("Enter")
    time.sleep(0.5)
    
    val = mand_wrapper.locator(".select__single-value").inner_text()
    print("Selected value in Mandatory:", val)
    
    browser.close()
