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
    print("1. Filling Title & Description...")
    page.locator("input[name='title']").first.fill(title)
    page.locator("textarea[name='description']").first.fill(title)
    
    print("2. Selecting Page: Overview...")
    pw = page.locator("div.form-field-wrapper:has(label:has-text('PAGE'))").first
    pw.locator(".select__control").first.click()
    time.sleep(0.3)
    page.locator("div[class*='-option']:has-text('Overview')").first.click()
    time.sleep(0.3)
    
    print("3. Selecting Mandatory: No...")
    mw = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    mw.locator(".select__control").first.click()
    time.sleep(0.3)
    page.keyboard.press("ArrowDown")
    time.sleep(0.2)
    page.keyboard.press("Enter")
    time.sleep(0.3)
    
    print("4. Filling Keywords...")
    pkw = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
    pkw.locator("input").first.fill(title)
    page.keyboard.press("Enter")
    time.sleep(0.2)
    
    skw = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
    skw.locator("input").first.fill(title)
    page.keyboard.press("Enter")
    time.sleep(0.2)
    
    print("5. Filling Meta Title & Meta Description...")
    page.locator("input[name='metaTitle']").first.fill(title)
    page.locator("textarea[name='metaDescription']").first.fill(f"Get complete details regarding {title} on SelectYourUniversity.")
    
    print("6. Selecting Due Date...")
    page.locator("input[name='day']").first.click()
    time.sleep(0.2)
    page.locator(".react-calendar__tile--now, .react-calendar__tile").first.click()
    time.sleep(0.2)
    
    print("7. SEO Manager: rahul@syu.com...")
    sw = page.locator("div.form-field-wrapper:has(label:has-text('SEO MANAGER'))").first
    sw.locator(".select__control").first.click()
    time.sleep(0.2)
    page.locator("div[class*='-option']:has-text('rahul@syu.com')").first.click()
    time.sleep(0.2)
    
    print("8. Content Editor & Content Writer...")
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
    
    print("9. Clicking Submit...")
    submit_btn = page.locator("button:has-text('Submit')").first
    submit_btn.click()
    time.sleep(5)
    
    print("Final URL after submit:", page.url)
    page.screenshot(path="subtask_final_success_proof.png")
    
    browser.close()
