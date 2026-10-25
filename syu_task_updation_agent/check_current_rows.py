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
    rows = page.locator("table tbody tr").all()
    print("Current top rows:")
    for i, r in enumerate(rows[:8]):
        print(f"Row {i}:", r.inner_text().replace("\n", " | "))
    browser.close()
