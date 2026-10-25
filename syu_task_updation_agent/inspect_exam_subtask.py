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

    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
    page.wait_for_selector("table tbody tr")
    time.sleep(1)
    first_row = page.locator("table tbody tr").first
    tds = first_row.locator("td").all()
    print("Top Task ID:", tds[1].inner_text().strip())
    tds[2].click()
    time.sleep(3)
    print("Task Details URL:", page.url)

    create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible:", create_sub.is_visible())
    create_sub.click()
    time.sleep(3)
    print("Subtask Form URL:", page.url)

    page.screenshot(path="exam_subtask_form.png")

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

    # Check PAGE dropdown options
    page_w = page.locator("div.form-field-wrapper:has(label:has-text('Page'))").first
    if page_w.is_visible():
        page_w.locator(".select__control").first.click()
        time.sleep(0.5)
        opts = page.locator("div[class*='-option']").all()
        print(f"Page dropdown options count: {len(opts)}")
        for o in opts[:10]:
            print(" - Page Option:", o.inner_text().strip())

    browser.close()
