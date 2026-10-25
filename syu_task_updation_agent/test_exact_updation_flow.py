from playwright.sync_api import sync_playwright
import time
import config

h1 = "WB NEET PG Counselling 2026: Round 1 Registration Begins, Apply by October 28"

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
        
    page.goto(config.CMS_CREATE_TASK_URL, wait_until="networkidle")
    time.sleep(2)
    
    # 1. Title & Desc
    page.locator("input[name='title']").first.fill(h1)
    desc = page.locator("textarea[name='description']").first
    if desc.is_visible():
        desc.fill(h1)
        
    # 2. Content Category: Blogs
    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Blogs')").first.click()
    time.sleep(1)
    
    # 3. Check IS UPDATE
    chk = page.locator("#updateData")
    chk.check(force=True)
    time.sleep(1)
    print("Is checked:", chk.is_checked())
    
    # 4. Select Entity: h1
    print("Selecting Entity dropdown with H1...")
    ent_w = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_ctrl = ent_w.locator(".select__control").first
    ent_ctrl.click()
    time.sleep(0.3)
    page.keyboard.type("WB NEET PG Counselling 2026", delay=40)
    time.sleep(1.5)
    
    opts = page.locator("div[class*='-option']").all()
    print(f"Entity Options count: {len(opts)}")
    for o in opts[:5]:
        print(" - Option:", o.inner_text().strip())
        
    if opts:
        opts[0].click()
        time.sleep(0.5)
        
    page.screenshot(path="entity_selected_preview.png")
    
    # 5. Due date
    day_inp = page.locator("input[name='day']").first
    day_inp.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now").first.click()
    time.sleep(0.3)
    
    # 6. Assignees
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
    
    # 7. Submit Main Task
    print("Submitting Main Task...")
    page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first.click()
    time.sleep(4)
    print("Current URL after submit:", page.url)
    page.screenshot(path="main_task_submitted_page.png")
    
    # 8. Check Create Subtask button
    create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible:", create_sub.is_visible())
    if create_sub.is_visible():
        create_sub.click()
        time.sleep(3)
        print("Subtask page opened URL:", page.url)
        page.screenshot(path="subtask_opened_properly.png")
        
        # Check subtask fields
        wrappers = page.locator("div.form-field-wrapper").all()
        for i, wr in enumerate(wrappers):
            lbl = wr.locator("label").first
            txt = lbl.inner_text().strip().replace("\n", " ") if lbl.is_visible() else "(No label)"
            inp = wr.locator("input, textarea").first
            val = inp.input_value() if inp.is_visible() and inp.get_attribute("type") != "file" else ""
            sel = wr.locator(".select__single-value, .select__placeholder").first
            if sel.is_visible():
                val = f"[Select: {sel.inner_text().strip()}]"
            print(f" Subtask Field {i+1}: '{txt}' -> '{val}'")
            
    browser.close()
