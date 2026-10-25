import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5000")
    page.wait_for_selector("#liveNetworkBtn")
    time.sleep(1)
    page.click("#liveNetworkBtn")
    time.sleep(1)
    page.screenshot(path="web_ui_live_anywhere_preview.png")
    print("Screenshot captured: web_ui_live_anywhere_preview.png")
    browser.close()
