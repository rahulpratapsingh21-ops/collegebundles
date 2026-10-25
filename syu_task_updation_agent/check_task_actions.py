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
    
    # Check Row 1 (48560)
    rows = page.locator("table tbody tr").all()
    print("Clicking Row 1 (48560)...")
    rows[1].locator("td").nth(2).click()
    time.sleep(3)
    print("Task 48560 URL:", page.url)

    # Check buttons on page (e.g. Delete, etc.)
    buttons = page.locator("button, a").all()
    print("Action buttons:")
    for b in buttons:
        txt = b.inner_text().strip()
        if any(w in txt.lower() for w in ["delete", "remove", "subtask", "cancel", "status"]):
            print(" - Button:", txt)

    browser.close()
