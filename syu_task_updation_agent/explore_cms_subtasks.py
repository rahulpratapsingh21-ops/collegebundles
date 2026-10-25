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
    print("Logged in successfully")
    
    categories = ["colleges", "courses", "exams", "blogs"]
    results = {}
    
    for cat in categories:
        page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=100")
        page.wait_for_selector("table tbody tr", timeout=15000)
        time.sleep(2)
        
        target_row = None
        for tr in page.locator("table tbody tr").all():
            txt = tr.inner_text().lower()
            if cat in txt:
                target_row = tr
                break
                
        if not target_row:
            results[cat] = f"No task found for category {cat}"
            continue
            
        print(f"Opening {cat} task: {target_row.inner_text().splitlines()[0]}")
        target_row.locator("td").nth(2).click()
        page.wait_for_timeout(3000)
        
        btn = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(3000)
            
            # Find Page dropdown
            pw = page.locator("div.form-field-wrapper:has(label:has-text('PAGE'))").first
            if not pw.is_visible():
                pw = page.locator("div.form-field-wrapper:has(label:has-text('Page'))").first
                
            if pw.is_visible():
                ctrl = pw.locator(".select__control").first
                ctrl.click()
                page.wait_for_timeout(1000)
                opts = [o.inner_text().strip() for o in page.locator("div[class*='-option']").all()]
                results[cat] = opts
                page.keyboard.press("Escape")
            else:
                all_labels = [l.inner_text().strip() for l in page.locator("label").all()]
                results[cat] = f"No Page dropdown found. Form labels: {all_labels}"
        else:
            results[cat] = "No Create Subtask button found"
            
    print("\n================== CMS TABS / SUBTASK PAGES ==================")
    for cat, opts in results.items():
        print(f"\n[{cat.upper()}]:")
        if isinstance(opts, list):
            for o in opts:
                print(f"  * {o}")
        else:
            print(f"  {opts}")
            
    browser.close()
