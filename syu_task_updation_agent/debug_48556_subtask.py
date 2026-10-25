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

    page.goto(config.CMS_TASKS_URL + "?limit=100", wait_until="networkidle")
    time.sleep(2)
    search_box = page.locator("input[placeholder*='Search'], input[type='search'], input").first
    search_box.fill("48556")
    page.keyboard.press("Enter")
    time.sleep(2)

    row = page.locator("tr:has-text('48556'), div[class*='row']:has-text('48556')").first
    title_link = row.locator("a, td:nth-child(3), div[class*='cell']:nth-child(3)").first
    print("Clicking title link:", title_link.inner_text().strip())
    title_link.click()
    time.sleep(3)
    print("Opened URL:", page.url)
    
    create_sub_btn = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible:", create_sub_btn.is_visible())
    create_sub_btn.click()
    time.sleep(3)
    print("After click URL:", page.url)
    page.screenshot(path="debug_subtask_form_48556.png")
    
    # Check fields
    wrappers = page.locator("div.form-field-wrapper").all()
    for w in wrappers:
        lbl = w.locator("label").first
        if lbl.is_visible():
            txt = lbl.inner_text().strip().replace("\n", " ")
            val = ""
            inp = w.locator("input, textarea").first
            if inp.is_visible():
                val = inp.input_value() if inp.get_attribute("type") != "file" else ""
            sel = w.locator(".select__single-value, .select__placeholder").first
            if sel.is_visible():
                val = f"[Select: {sel.inner_text().strip()}]"
            print(f" - {txt}: {val}")

    browser.close()
