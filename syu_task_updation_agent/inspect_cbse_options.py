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

    # Select Content Category: Exams
    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Exams')").first.click()
    time.sleep(1)

    ent_w = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_ctrl = ent_w.locator(".select__control").first
    ent_ctrl.click()
    time.sleep(0.3)
    page.keyboard.type("CBSE", delay=40)
    time.sleep(1.5)
    opts = page.locator("div[class*='-option']").all()
    print(f"Entity Options for 'CBSE' count: {len(opts)}")
    for o in opts[:10]:
        print(" - Option:", o.inner_text().strip())

    page.keyboard.press("Backspace")
    page.keyboard.press("Backspace")
    page.keyboard.press("Backspace")
    page.keyboard.press("Backspace")
    time.sleep(0.5)
    page.keyboard.type("10th", delay=40)
    time.sleep(1.5)
    opts = page.locator("div[class*='-option']").all()
    print(f"Entity Options for '10th' count: {len(opts)}")
    for o in opts[:10]:
        print(" - Option:", o.inner_text().strip())

    browser.close()
