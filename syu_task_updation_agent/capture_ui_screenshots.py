from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://127.0.0.1:5000", wait_until="networkidle")
    time.sleep(3)
    page.screenshot(path="web_ui_dashboard_preview.png", full_page=True)
    print("Screenshot saved: web_ui_dashboard_preview.png")

    # Preview row 1560
    inp = page.locator("#startRowInput").first
    inp.fill("1560")
    page.locator("#previewRowBtn").first.click()
    time.sleep(2)
    page.screenshot(path="web_ui_row_1560_preview.png")
    print("Screenshot saved: web_ui_row_1560_preview.png")
    browser.close()
