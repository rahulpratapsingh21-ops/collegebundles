from playwright.sync_api import sync_playwright
import config, time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL)
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url("**/admin/collections/**", timeout=25000)
    
    # Open Task 48567
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=10")
    page.wait_for_selector("input[placeholder*='Search']")
    page.locator("input[placeholder*='Search']").first.fill("48567")
    page.keyboard.press("Enter")
    page.wait_for_timeout(3000)
    
    page.locator("table tbody tr").first.locator("td").nth(1).click()
    page.wait_for_timeout(3000)
    print("Opened Task 48567 URL:", page.url)
    
    btn = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask button visible:", btn.is_visible())
    btn.click()
    page.wait_for_timeout(3000)
    print("Subtask creation URL:", page.url)
    
    # 1. Title = Blog Content (page name)
    page.locator("input[name='title']").first.fill("Blog Content")
    
    # 2. Description
    page.locator("textarea[name='description']").first.fill("NMAT Registration 2026")
    
    # 3. Mandatory: No
    mand = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    if mand.is_visible():
        mand.locator(".select__control").first.click()
        page.wait_for_timeout(300)
        page.keyboard.press("ArrowDown")
        page.wait_for_timeout(200)
        page.keyboard.press("Enter")
        page.wait_for_timeout(300)
        print("Mandatory set to:", mand.locator(".select__single-value").inner_text())
        
    # 4. Keywords
    pk = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS')) input").first
    pk.fill("NMAT Registration 2026")
    page.keyboard.press("Enter")
    sk = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS')) input").first
    sk.fill("NMAT Registration 2026")
    page.keyboard.press("Enter")
    
    # 5. Due date
    now = time.strftime("%Y-%m-%d")
    date_inp = page.locator("input[type='date'], input[name='dueDate']").first
    if date_inp.is_visible():
        date_inp.fill(now)
        
    # 6. SEO Manager
    sm = page.locator("div.form-field-wrapper:has(label:has-text('SEO MANAGER'))").first
    sm.locator(".select__control").first.click()
    page.wait_for_timeout(500)
    opt = page.locator("div[class*='-option']:has-text('rahul@syu.com')").first
    if opt.is_visible():
        opt.click()
        print("Selected SEO Manager: rahul@syu.com")
        
    # 7. Content Editor
    ed = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT EDITOR'))").first
    ed.locator(".select__control").first.click()
    page.wait_for_timeout(500)
    opt = page.locator("div[class*='-option']:has-text('natasha.ce@syu.com')").first
    if opt.is_visible():
        opt.click()
        print("Selected Content Editor: natasha.ce@syu.com")
        
    # 8. Content Writer
    wr = page.locator("div.form-field-wrapper:has(label:has-text('CONTENT WRITER'))").first
    wr.locator(".select__control").first.click()
    page.wait_for_timeout(500)
    opt = page.locator("div[class*='-option']:has-text('rehana@syu.com')").first
    if opt.is_visible():
        opt.click()
        print("Selected Content Writer: rehana@syu.com")
        
    # Click Submit
    submit_btn = page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
    submit_btn.scroll_into_view_if_needed()
    submit_btn.click()
    page.wait_for_timeout(5000)
    
    print("After submit URL:", page.url)
    
    # Check if subtask now appears under the task
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks/6addc44b6a658ef0b12f1f45")
    page.wait_for_timeout(3000)
    subtasks = [r.inner_text().replace("\n", " | ") for r in page.locator("table tbody tr").all()]
    print("Subtasks on Blog Task 48567:", subtasks)
    
    browser.close()
