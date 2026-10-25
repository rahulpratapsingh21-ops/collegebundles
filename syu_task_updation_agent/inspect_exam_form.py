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

    page.screenshot(path="exam_create_task_form.png")

    # List all fields visible on page
    wrappers = page.locator("div.form-field-wrapper").all()
    print("--- ALL MAIN TASK FIELDS FOR EXAMS ---")
    for i, wr in enumerate(wrappers):
        lbl = wr.locator("label").first
        txt = lbl.inner_text().strip().replace("\n", " ") if lbl.is_visible() else f"Field {i}"
        print(f" {i+1}. {txt}")

    # Test Entity dropdown for "cbse 10th board"
    ent_w = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    if ent_w.is_visible():
        ent_ctrl = ent_w.locator(".select__control").first
        ent_ctrl.click()
        time.sleep(0.3)
        page.keyboard.type("cbse 10th", delay=40)
        time.sleep(1.5)
        opts = page.locator("div[class*='-option']").all()
        print(f"Entity Options count: {len(opts)}")
        for o in opts[:5]:
            print(" - Option:", o.inner_text().strip())

    browser.close()
