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
    
    title = "Jorhat Institute of Science and Technology - [JIST]"
    page.locator("input[name='title']").first.fill(title)
    page.locator("textarea[name='description']").first.fill(title)
    
    pw = page.locator("div.form-field-wrapper:has(label:has-text('PAGE'))").first
    pw.locator(".select__control").first.click()
    time.sleep(0.3)
    page.locator("div[class*='-option']:has-text('Overview')").first.click()
    time.sleep(0.3)
    
    mw = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    mw.locator(".select__control").first.click()
    time.sleep(0.3)
    page.keyboard.press("ArrowDown")
    time.sleep(0.2)
    page.keyboard.press("Enter")
    time.sleep(0.3)
    
    pkw = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
    pkw.locator("input").first.fill(title)
    page.keyboard.press("Enter")
    time.sleep(0.2)
    
    skw = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
    skw.locator("input").first.fill(title)
    page.keyboard.press("Enter")
    time.sleep(0.2)
    
    page.locator("input[name='day']").first.click()
    time.sleep(0.2)
    page.locator(".react-calendar__tile--now, .react-calendar__tile").first.click()
    time.sleep(0.2)
    
    sw = page.locator("div.form-field-wrapper:has(label:has-text('SEO MANAGER'))").first
    sw.locator(".select__control").first.click()
    time.sleep(0.2)
    page.locator("div[class*='-option']:has-text('rahul@syu.com')").first.click()
    time.sleep(0.2)
    
    ew = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT EDITOR'))").first
    ew.locator(".select__control").first.click()
    time.sleep(0.2)
    page.keyboard.type("natasha", delay=30)
    time.sleep(0.5)
    page.locator("div[class*='-option']:has-text('natasha.ce@syu.com')").first.click()
    time.sleep(0.2)
    
    ww = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT WRITER'))").first
    ww.locator(".select__control").first.click()
    time.sleep(0.2)
    page.keyboard.type("rehana", delay=30)
    time.sleep(0.5)
    page.locator("div[class*='-option']:has-text('rehana@syu.com')").first.click()
    time.sleep(0.2)
    
    submit_btn = page.locator("button:has-text('Submit')").first
    submit_btn.click()
    time.sleep(2)
    
    # Scroll down to see invalid fields
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    page.screenshot(path="subtask_invalid_fields_bottom.png")
    
    # Find all inputs or elements with error class
    invalid_elements = page.locator(".error, .invalid, [aria-invalid='true'], .field-error, .form-field-wrapper:has([aria-invalid='true']) label").all_inner_texts()
    print("Invalid field labels:", invalid_elements)
    
    browser.close()
