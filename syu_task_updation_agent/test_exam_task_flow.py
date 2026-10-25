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

    # Title & Desc
    page.locator("input[name='title']").first.fill(h1)
    desc = page.locator("textarea[name='description']").first
    if desc.is_visible():
        desc.fill(h1)

    # Content Category: Exams
    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Exams')").first.click()
    time.sleep(0.5)

    # Entity: CBSE Class X Board
    ent_w = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_ctrl = ent_w.locator(".select__control").first
    ent_ctrl.click()
    page.keyboard.type("CBSE Class X", delay=35)
    time.sleep(1)
    page.locator("div[class*='-option']:has-text('CBSE Class X Board')").first.click()
    time.sleep(0.5)

    # Due date
    day_inp = page.locator("input[name='day']").first
    day_inp.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now").first.click()
    time.sleep(0.3)

    # Assignees
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

    page.screenshot(path="exam_main_task_filled.png")

    # Submit Main Task
    print("Submitting Exam Main Task...")
    page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first.click()
    time.sleep(4)
    print("URL after submit:", page.url)

    # Wait for tasks table and navigate to task
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
    time.sleep(2)
    first_row = page.locator("table tbody tr").first
    tds = first_row.locator("td").all()
    task_id = tds[1].inner_text().strip()
    print("Created Exam Task ID:", task_id)
    tds[2].click()
    time.sleep(3)
    print("Exam Task Page URL:", page.url)

    # Click Create Subtask
    create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible:", create_sub.is_visible())
    create_sub.click()
    time.sleep(3)
    print("Exam Subtask URL:", page.url)
    page.screenshot(path="exam_subtask_form.png")

    # List all fields in exam subtask form
    wrappers = page.locator("div.form-field-wrapper").all()
    print("--- ALL EXAM SUBTASK FIELDS ---")
    for i, w in enumerate(wrappers):
        lbl = w.locator("label").first
        txt = lbl.inner_text().strip().replace("\n", " ") if lbl.is_visible() else f"Wrapper {i}"
        val = ""
        inp = w.locator("input, textarea").first
        if inp.is_visible() and inp.get_attribute("type") != "file":
            val = inp.input_value()
        sel = w.locator(".select__single-value").first
        if sel.is_visible():
            val = f"[Selected: {sel.inner_text().strip()}]"
        print(f"{i+1}. {txt} -> {val}")

    browser.close()
