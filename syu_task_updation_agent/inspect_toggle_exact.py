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
        
    page.goto(config.CMS_CREATE_TASK_URL, wait_until="networkidle")
    time.sleep(2)
    
    # Select Blogs
    w = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    w.locator(".select__control").first.click()
    page.locator("div[class*='-option']:has-text('Blogs')").first.click()
    time.sleep(1)
    
    # Inspect IS UPDATE HTML before any click
    toggle_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('IS UPDATE')), div:has-text('IS UPDATE?')").first
    print("Initial HTML of IS UPDATE wrapper:")
    print(toggle_wrapper.inner_html())
    
    # Click toggle
    btn = toggle_wrapper.locator("button, input, span, div[class*='switch'], div[class*='toggle']").first
    print("Clicking element:", btn)
    btn.click()
    time.sleep(1)
    
    print("\nAfter 1 click HTML:")
    print(toggle_wrapper.inner_html())
    page.screenshot(path="toggle_after_click_1.png")
    
    # If not on right, click again or inspect class
    btn.click()
    time.sleep(1)
    print("\nAfter 2 clicks HTML:")
    print(toggle_wrapper.inner_html())
    page.screenshot(path="toggle_after_click_2.png")

    browser.close()
