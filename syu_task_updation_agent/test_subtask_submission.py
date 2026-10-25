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
    
    # Go to 48563 create subtask
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks/6addaea16a658ef0b12ebbc9")
    page.wait_for_selector("button:has-text('Create Subtask')")
    time.sleep(1)
    page.locator("button:has-text('Create Subtask')").first.click()
    time.sleep(3)
    
    title = "Jorhat Institute of Science and Technology - [JIST]"
    # 1. Title
    page.locator("input[name='title']").first.fill(title)
    page.locator("textarea[name='description']").first.fill(title)
    
    # 2. Page -> Overview
    page_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('PAGE'))").first
    page_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    page.locator("div[class*='-option']:has-text('Overview')").first.click()
    time.sleep(0.5)
    
    # 3. Mandatory -> No
    mand_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    mand_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    page.locator("div[class*='-option']:text-is('No')").first.click()
    time.sleep(0.5)
    
    # 4. Due Date
    page.locator("input[name='day']").first.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now, .react-calendar__tile").first.click()
    time.sleep(0.3)
    
    # 5. SEO Manager
    seo_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('SEO MANAGER'))").first
    seo_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    page.locator("div[class*='-option']:has-text('rahul@syu.com')").first.click()
    time.sleep(0.3)
    
    # 6. Content Editor
    ed_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT EDITOR'))").first
    ed_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    ed_wrapper.locator("input.select__input, input").first.type("contenteditor", delay=30)
    time.sleep(0.6)
    page.locator("div[class*='-option']:has-text('contenteditor@syu.com')").first.click()
    time.sleep(0.3)
    
    # 7. Content Writer
    wr_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT WRITER'))").first
    wr_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    wr_wrapper.locator("input.select__input, input").first.type("contentwriter", delay=30)
    time.sleep(0.6)
    page.locator("div[class*='-option']:has-text('contentwriter@syu.com')").first.click()
    time.sleep(0.3)
    
    # Click Submit
    print("Clicking Submit button on SubTask...")
    sub_submit = page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
    sub_submit.click()
    time.sleep(5)
    
    print("Current URL after subtask submit:", page.url)
    page.screenshot(path="subtask_after_submit_result.png")
    
    # Check for any error messages or toast
    toasts = page.locator(".toast, .notification, .alert, [class*='toast'], [class*='error']").all_inner_texts()
    print("Toasts/Alerts:", toasts)
    browser.close()
