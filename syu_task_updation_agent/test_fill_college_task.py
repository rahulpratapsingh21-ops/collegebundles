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
    page.wait_for_selector("input[name='title']")
    time.sleep(1)
    
    title = "Jorhat Institute of Science and Technology - [JIST]"
    print(f"Typing Title: {title}")
    page.locator("input[name='title']").first.fill(title)
    page.locator("textarea[name='description']").first.fill(title)
    
    # 1. Content Category -> Colleges
    print("Selecting Content Category: Colleges...")
    cat_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    cat_wrapper.locator(".select__control").first.click()
    time.sleep(0.4)
    page.locator("div[class*='-option']:has-text('Colleges')").first.click()
    time.sleep(1)
    
    # 2. Entity -> Jorhat
    print("Selecting Entity: Jorhat Institute of Science...")
    ent_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_wrapper.locator(".select__control").first.click()
    time.sleep(0.3)
    ent_inp = ent_wrapper.locator("input.select__input, input").first
    ent_inp.type("Jorhat Institute of Science", delay=40)
    time.sleep(1.5)
    
    opt = page.locator("div[class*='-option']:has-text('Jorhat Institute of Science')").first
    if opt.is_visible():
        print(f"Found option: {opt.inner_text().strip()}")
        opt.click()
        time.sleep(0.5)
    else:
        print("Option not visible!")
        
    # 3. Due Date
    print("Selecting Due Date...")
    page.locator("input[name='day']").first.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now, .react-calendar__tile").first.click()
    time.sleep(0.3)
    
    # 4. Content Editor & Content Writer
    print("Selecting Content Editor & Writer...")
    # Editor
    ed_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Content Editor'))").first
    ed_wrapper.locator(".select__control").first.click()
    time.sleep(0.3)
    ed_wrapper.locator("input.select__input, input").first.type("natasha", delay=40)
    time.sleep(0.8)
    page.locator("div[class*='-option']:has-text('natasha.ce@syu.com')").first.click()
    time.sleep(0.3)
    
    # Writer
    wr_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Content Writer'))").first
    wr_wrapper.locator(".select__control").first.click()
    time.sleep(0.3)
    wr_wrapper.locator("input.select__input, input").first.type("rehana", delay=40)
    time.sleep(0.8)
    page.locator("div[class*='-option']:has-text('rehana@syu.com')").first.click()
    time.sleep(0.3)
    
    page.screenshot(path="debug_filled_college_task.png")
    print("Screenshot saved: debug_filled_college_task.png")
    browser.close()
