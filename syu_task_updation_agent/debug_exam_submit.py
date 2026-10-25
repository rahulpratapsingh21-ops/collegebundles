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

    page.goto(config.CMS_CREATE_TASK_URL, wait_until="domcontentloaded")
    time.sleep(2)

    h1 = "CBSE 10th Previous Year Question Papers: Download CBSE Class 10th Papers PDFs"
    page.locator("input[name='title']").first.fill(h1)
    desc = page.locator("textarea[name='description']").first
    if desc.is_visible():
        desc.fill(h1)

    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Exams')").first.click()
    time.sleep(0.5)

    ent_w = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_ctrl = ent_w.locator(".select__control").first
    ent_ctrl.click()
    page.keyboard.type("CBSE Class X", delay=35)
    time.sleep(1)
    page.locator("div[class*='-option']:has-text('CBSE Class X Board')").first.click()
    time.sleep(0.5)

    day_inp = page.locator("input[name='day']").first
    day_inp.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now").first.click()
    time.sleep(0.3)

    ed_w = page.locator("div.form-field-wrapper:has(label:has-text('Content Editor'))").first
    ed_w.locator(".select__control").first.click()
    page.keyboard.type("contenteditor@syu.com", delay=30)
    time.sleep(0.5)
    page.locator("div[class*='-option']").first.click()
    time.sleep(0.3)

    wr_w = page.locator("div.form-field-wrapper:has(label:has-text('Content Writer'))").first
    wr_w.locator(".select__control").first.click()
    page.keyboard.type("contentwriter@syu.com", delay=30)
    time.sleep(0.5)
    page.locator("div[class*='-option']").first.click()
    time.sleep(0.5)

    # Click Submit
    submit_btn = page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
    print("Submit button text:", submit_btn.inner_text())
    submit_btn.click()
    time.sleep(5)
    print("URL after submit:", page.url)
    page.screenshot(path="exam_after_submit_debug.png")

    # Check any toasts or error messages
    toasts = page.locator("div[class*='toast'], div[role='alert'], .notification, span[class*='error']").all()
    for t in toasts:
        if t.is_visible():
            print("Alert/Toast:", t.inner_text())

    browser.close()
