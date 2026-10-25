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

    # Open task 48557 via table
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="networkidle")
    time.sleep(2)
    first_row = page.locator("table tbody tr").first
    tds = first_row.locator("td").all()
    task_id = tds[1].inner_text().strip()
    print("Top Task ID:", task_id)
    tds[2].click()
    time.sleep(3)

    create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible:", create_sub.is_visible())
    create_sub.click()
    time.sleep(3)

    h1 = "WB NEET PG Counselling 2026: Round 1 Registration Begins, Apply by October 28"
    meta_title = "WB NEET PG Counselling 2026: Round 1 Registration Begins, Apply by October 28"
    meta_desc = "WB NEET PG Counselling 2026: WBMC will conduct the WB NEET PG counselling for admission into state quota seats. Check Round 1 registration dates here."

    # 1. Title
    print("Filling Title...")
    page.locator("input[name='title']").first.fill(h1)
    time.sleep(0.3)

    # 2. Description
    print("Filling Description...")
    desc_inp = page.locator("textarea[name='description']").first
    if desc_inp.is_visible():
        desc_inp.fill(h1)
        time.sleep(0.3)

    # 3. Keywords
    print("Filling Primary Keywords...")
    pk_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
    if pk_wrapper.is_visible():
        pk_inp = pk_wrapper.locator("input").first
        pk_inp.fill(h1)
        page.keyboard.press("Enter")
        time.sleep(0.3)

    print("Filling Secondary Keywords...")
    sk_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
    if sk_wrapper.is_visible():
        sk_inp = sk_wrapper.locator("input").first
        sk_inp.fill(h1)
        page.keyboard.press("Enter")
        time.sleep(0.3)

    # 4. Meta Title & Meta Description
    print("Filling Meta Title...")
    mt_inp = page.locator("input[name='metaTitle']").first
    if mt_inp.is_visible():
        mt_inp.fill(meta_title)
        time.sleep(0.3)

    print("Filling Meta Description...")
    md_inp = page.locator("textarea[name='metaDescription']").first
    if md_inp.is_visible():
        md_inp.fill(meta_desc)
        time.sleep(0.3)

    # 5. Due Date
    print("Selecting Due Date (today)...")
    day_inp = page.locator("input[name='day']").first
    if day_inp.is_visible():
        day_inp.click()
        time.sleep(0.3)
        page.locator(".react-calendar__tile--now").first.click()
        time.sleep(0.3)

    # 6. Submit SubTask
    print("Submitting SubTask...")
    sub_submit = page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
    sub_submit.click()
    time.sleep(4)
    print("URL after submit:", page.url)

    # 7. Check tasks table to see if subtask is listed under task_id
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="networkidle")
    time.sleep(2)
    first_row = page.locator("table tbody tr").first
    expand_btn = first_row.locator("span[title='Toggle Row Expanded']").first
    if expand_btn.is_visible():
        print("Clicking expand button to verify nested subtask...")
        expand_btn.click()
        time.sleep(2)
    page.screenshot(path="subtask_nested_verified.png")
    print("Screenshot saved to subtask_nested_verified.png")

    browser.close()
