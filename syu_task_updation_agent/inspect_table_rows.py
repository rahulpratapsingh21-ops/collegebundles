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
        
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="networkidle")
    time.sleep(2)
    first_row = page.locator("table tbody tr").first
    tds = first_row.locator("td").all()
    print("TD count:", len(tds))
    for i, td in enumerate(tds):
        print(f"TD {i}: text={td.inner_text().strip()} html={td.inner_html()[:120]}")
        
    # Check if clicking TD 3 or TD 1 opens the task page
    print("\nClicking TD 3 (Title)...")
    tds[3].click()
    time.sleep(3)
    print("New URL after clicking TD 3:", page.url)
    create_sub = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
    print("Create Subtask visible on page:", create_sub.is_visible())
    
    browser.close()
