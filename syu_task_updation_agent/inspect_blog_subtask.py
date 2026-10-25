from playwright.sync_api import sync_playwright
import config

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(config.CMS_LOGIN_URL)
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url("**/admin/collections/**", timeout=25000)
    
    # Find a Blog task in CMS
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=25")
    page.wait_for_selector("table tbody tr")
    
    rows = page.locator("table tbody tr").all()
    blog_row = None
    for r in rows:
        text = r.inner_text()
        if "blogs" in text.lower():
            blog_row = r
            print("Found blog task:", text.replace("\n", " | "))
            break
            
    if blog_row:
        blog_row.locator("td").nth(2).click()
        page.wait_for_timeout(3000)
        print("Opened blog task URL:", page.url)
        
        # Check Create Subtask button
        create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
        print("Create Subtask button visible:", create_sub.is_visible())
        if create_sub.is_visible():
            create_sub.click()
            page.wait_for_timeout(3000)
            print("Subtask URL:", page.url)
            page.screenshot(path="debug_blog_subtask_form.png")
            labels = [l.inner_text().strip() for l in page.locator("label").all()]
            print("Labels on Blog subtask form:", labels)
            
            # Check Page dropdown options on blog subtask
            page_w = page.locator("div.form-field-wrapper:has(label:has-text('Page'))").first
            if page_w.is_visible():
                page_w.locator(".select__control").first.click()
                page.wait_for_timeout(500)
                opts = [o.inner_text().strip() for o in page.locator("div[class*='-option']").all()]
                print("Page dropdown options on Blog subtask:", opts)
        else:
            print("No Create Subtask button on Blog task!")
    else:
        print("No blog task found in recent tasks table")
        
    browser.close()
