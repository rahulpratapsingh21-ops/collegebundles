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
    
    # Toggle IS UPDATE?
    toggle = page.locator("div.form-field-wrapper:has(label:has-text('IS UPDATE')), div:has-text('IS UPDATE?')").locator("button, input[type='checkbox'], span").first
    toggle.click()
    time.sleep(1)
    
    page.screenshot(path="is_update_toggled_inspect.png")
    
    # Inspect wrappers
    wrappers = page.locator("div.form-field-wrapper").all()
    for i, wr in enumerate(wrappers):
        lbl = wr.locator("label").first
        txt = lbl.inner_text().strip().replace("\n", " ") if lbl.is_visible() else "(No label)"
        inps = wr.locator("input, textarea, .select__control").all()
        print(f"{i+1}. Label: '{txt}' | Controls: {len(inps)}")
        
    # Check the dropdown right below IS UPDATE
    update_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('IS UPDATE')), div:has-text('IS UPDATE?')").first
    # Find next sibling or dropdown
    dropdowns = page.locator(".select__control").all()
    print(f"\nTotal dropdown controls: {len(dropdowns)}")
    
    # Let's search H1 in that dropdown
    h1 = "WB NEET PG Counselling 2026: Round 1 Registration Begins, Apply by October 28"
    # Find the dropdown right below IS UPDATE
    # In user's screenshot, it's right under IS UPDATE?
    
    browser.close()
