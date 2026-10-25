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
    
    # Let's inspect:
    # 1. College task: Jorhat Institute (Row 2, Task 48563)
    # 2. Course task: Diploma in Medical Laboratory Technology (Row 4, Task 48566)
    # 3. Exam task: find one in the CMS tasks list
    # 4. Blog task: NMAT (Task 48567)
    
    target_tasks = [
        ("COLLEGE", "48563"),
        ("COURSE", "48566"),
        ("BLOG", "48567")
    ]
    
    # First find an exam task ID from tasks list
    page.goto("https://cms.selectyouruniversity.com/admin/collections/tasks?limit=100")
    page.wait_for_selector("table tbody tr")
    time.sleep(2)
    for tr in page.locator("table tbody tr").all():
        tds = [td.inner_text().strip() for td in tr.locator("td").all()]
        if len(tds) > 3 and "exams" in tds[3].lower():
            target_tasks.append(("EXAM", tds[0].replace("#", "").strip()))
            print(f"Found Exam task ID: {tds[0]} ({tds[1]})")
            break
            
    print("\nTarget tasks to inspect:", target_tasks)
    
    for category_name, task_id in target_tasks:
        print(f"\n=======================================================")
        print(f" CATEGORY: {category_name} | Task ID: {task_id}")
        print(f"=======================================================")
        page.goto(f"https://cms.selectyouruniversity.com/admin/collections/tasks?limit=10")
        page.wait_for_selector("input[placeholder*='Search']")
        search_input = page.locator("input[placeholder*='Search']").first
        search_input.fill(task_id)
        page.keyboard.press("Enter")
        time.sleep(3)
        
        # Click row
        row = page.locator("table tbody tr").first
        if not row.is_visible():
            print(f"No row found for Task #{task_id}")
            continue
            
        print(f"Found row: {row.inner_text().replace(chr(10), ' | ')}")
        row.locator("td").nth(1).click()
        time.sleep(3)
        
        # Check Create Subtask button
        create_btn = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
        if not create_btn.is_visible():
            print("Create Subtask button NOT visible!")
            continue
            
        create_btn.click()
        time.sleep(3)
        
        # Inspect Page field
        page_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('PAGE')), div.form-field-wrapper:has(label:has-text('Page'))").first
        if page_wrapper.is_visible():
            curr_val = page_wrapper.locator(".select__single-value").inner_text() if page_wrapper.locator(".select__single-value").count() > 0 else "None"
            print(f"Default/Current PAGE value: '{curr_val}'")
            
            # Click control to see dropdown
            page_wrapper.locator(".select__control").first.click()
            time.sleep(1)
            options = [o.inner_text().strip() for o in page.locator("div[class*='-option']").all()]
            print(f"Total Page Options available: {len(options)}")
            for idx, opt in enumerate(options, 1):
                print(f"  {idx}. {opt}")
            page.keyboard.press("Escape")
        else:
            print("PAGE field wrapper not found!")
            labels = [l.inner_text().strip() for l in page.locator("label").all()]
            print(f"All form labels: {labels}")
            
    browser.close()
