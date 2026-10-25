import time
from playwright.sync_api import sync_playwright
import config

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    page.goto(config.CMS_LOGIN_URL, wait_until="domcontentloaded")
    time.sleep(1)
    if "/admin/login" in page.url:
        page.locator("input[type='email']").fill(config.CMS_EMAIL)
        page.locator("input[type='password']").fill(config.CMS_PASSWORD)
        page.locator("button[type='submit']").click()
        page.wait_for_url("**/admin/collections/**", timeout=20000)
        time.sleep(2)

    page.goto(config.CMS_CREATE_SUBTASK_URL, wait_until="networkidle")
    time.sleep(2)

    def pick_dropdown(label, val):
        w = page.locator(f"div.form-field-wrapper:has(label:has-text('{label}'))").first
        c = w.locator(".select__control").first
        c.scroll_into_view_if_needed()
        c.click()
        time.sleep(0.3)
        inp = w.locator("input.select__input, input.css-1hac4vs-dummyInput, input").first
        try:
            inp.type(str(val), delay=40)
            time.sleep(0.5)
        except Exception:
            page.keyboard.type(str(val), delay=40)
            time.sleep(0.5)
        opt = page.locator(f"div[class*='-option']:has-text('{val}')").first
        if opt.is_visible():
            opt.click()
        else:
            first = page.locator("div[class*='-option']").first
            if first.is_visible():
                first.click()
            else:
                page.keyboard.press("Enter")
        time.sleep(0.3)

    task_title = "JEE Mains 2025 Registration"
    page.locator("input[name='title']").first.fill(task_title)
    pick_dropdown("Parent Task Id", task_title)
    pick_dropdown("Page", "Overview")
    pick_dropdown("Mandatory", "Yes")

    pk = page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS')) input").first
    pk.fill(task_title)
    page.keyboard.press("Enter")
    time.sleep(0.3)

    sk = page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS')) input").first
    sk.fill(task_title)
    page.keyboard.press("Enter")
    time.sleep(0.3)

    page.locator("input[name='pageUrl']").first.fill("jee-mains-2025-registration")
    page.locator("input[name='metaTitle']").first.fill(task_title)
    page.locator("textarea[name='metaDescription']").first.fill(f"Get complete details regarding {task_title} on SelectYourUniversity.")

    page.locator("input[name='day']").first.click()
    time.sleep(0.3)
    page.locator(".react-calendar__tile--now").first.click()
    time.sleep(0.3)

    pick_dropdown("SEO Manager", "rahul@syu.com")
    pick_dropdown("Content Editor", "arsh.ce@syu.com")
    pick_dropdown("Content Writer", "natasha@syu.com")

    # Click submit
    page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first.click()
    time.sleep(2)

    # Find which field is in error
    err_ps = page.locator("p.error-text").all()
    for ep in err_ps:
        wrapper = ep.locator("xpath=ancestor::div[contains(@class, 'form-field-wrapper')]").first
        lbl = wrapper.locator("label").first.inner_text() if wrapper.is_visible() else "UNKNOWN"
        print("EXACT MISSING FIELD IS:", lbl)

    browser.close()
