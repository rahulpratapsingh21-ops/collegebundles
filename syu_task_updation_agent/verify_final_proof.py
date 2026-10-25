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

    page.goto("https://cms.selectyouruniversity.com/admin/collections/subTasks?limit=10", wait_until="domcontentloaded")
    page.wait_for_selector("table tbody tr")
    time.sleep(1)
    rows = page.locator("table tbody tr").all()
    print("Latest SubTasks in CMS:")
    for i, r in enumerate(rows[:5]):
        print(f"Subtask {i}:", r.inner_text().replace("\n", " | "))

    # Also capture screenshot of tasks table with row 1559 (48561) expanded
    page.goto(config.CMS_TASKS_URL + "?limit=10", wait_until="domcontentloaded")
    page.wait_for_selector("table tbody tr")
    time.sleep(2)
    # Expand 48561
    r_48561 = page.locator("tr:has-text('48561')").first
    btn = r_48561.locator("span[title='Toggle Row Expanded'], svg").first
    if btn.is_visible():
        btn.click()
        time.sleep(1)
    page.screenshot(path="tasks_table_final_proof.png")
    print("Saved tasks_table_final_proof.png")

    browser.close()
