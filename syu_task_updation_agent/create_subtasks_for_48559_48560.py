from playwright.sync_api import sync_playwright
import time
import config

h1 = "CBSE 10th Previous Year Question Papers: Download CBSE Class 10th Papers PDFs"
meta_title = "CBSE 10th Past Question Papers: Download CBSE Class 10th Papers PDFs"
meta_desc = "Download CBSE Class 10 previous year question papers in PDF format for all subjects including Mathematics, Science, Social Science, Hindi, and English. Boost your exam preparation with real past exam papers."

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

    for task_id in ["48560", "48559"]:
        print(f"\n--- Creating SubTask for Task #{task_id} ---")
        page.goto(config.CMS_TASKS_URL + "?limit=25", wait_until="domcontentloaded")
        page.wait_for_selector("table tbody tr")
        time.sleep(1)

        row = page.locator(f"tr:has-text('{task_id}')").first
        if not row.is_visible():
            print(f"Task {task_id} not found in table!")
            continue

        row.locator("td").nth(2).click()
        time.sleep(3)
        print("Opened Task URL:", page.url)

        create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
        if not create_sub.is_visible():
            print(f"Subtask button not visible on {task_id}")
            continue

        create_sub.click()
        time.sleep(3)

        # Title & Desc
        page.locator("input[name='title']").first.fill(h1)
        desc = page.locator("textarea[name='description']").first
        if desc.is_visible():
            desc.fill(h1)

        # Page Tab: Past Question Papers
        pw = page.locator("div.form-field-wrapper:has(label:has-text('Page'))").first
        pw.locator(".select__control").first.click()
        time.sleep(0.3)
        page.locator("div[class*='-option']:has-text('Past Question Papers')").first.click()
        time.sleep(0.3)

        # Mandatory: No (User requirement: Mandatory will be No!)
        mw = page.locator("div.form-field-wrapper:has(label:has-text('Mandatory'))").first
        mw.locator(".select__control").first.click()
        time.sleep(0.3)
        page.locator("div[class*='-option']:has-text('No')").first.click()
        time.sleep(0.3)
        print("Selected Mandatory: No")

        # Keywords
        pk_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
        pk_inp = pk_wrapper.locator("input").first
        pk_inp.fill(h1)
        page.keyboard.press("Enter")
        time.sleep(0.3)

        sk_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
        sk_inp = sk_wrapper.locator("input").first
        sk_inp.fill(h1)
        page.keyboard.press("Enter")
        time.sleep(0.3)

        # Meta tags
        mt = page.locator("input[name='metaTitle']").first
        if mt.is_visible():
            mt.fill(meta_title)
        md = page.locator("textarea[name='metaDescription']").first
        if md.is_visible():
            md.fill(meta_desc)

        # Due date
        day_inp = page.locator("input[name='day']").first
        day_inp.click()
        time.sleep(0.3)
        page.locator(".react-calendar__tile--now").first.click()
        time.sleep(0.3)

        # Submit SubTask
        page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first.click()
        time.sleep(4)
        print(f"SubTask created successfully for Task #{task_id}!")

    # Capture verified table screenshot showing all tasks with subtasks
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
    page.wait_for_selector("table tbody tr")
    time.sleep(2)
    # Expand 48560
    r0 = page.locator("tr:has-text('48560')").first
    btn0 = r0.locator("span[title='Toggle Row Expanded']").first
    if btn0.is_visible():
        btn0.click()
        time.sleep(1)
    page.screenshot(path="tasks_48560_subtask_verified.png")
    print("Screenshot saved to tasks_48560_subtask_verified.png")

    browser.close()
