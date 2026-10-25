import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5000")
    page.wait_for_selector("#startRowInput")
    
    # Enter user's sheet
    page.fill("#sheetUrlInput", "https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit?gid=0#gid=0")
    page.click("#loadSheetBtn")
    time.sleep(2)
    
    # Preview Row 2
    page.fill("#startRowInput", "2")
    page.click("#previewRowBtn")
    time.sleep(2)
    
    page.screenshot(path="verified_row2_colleges_preview.png")
    print("Screenshot saved: verified_row2_colleges_preview.png")
    browser.close()
