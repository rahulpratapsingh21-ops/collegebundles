from playwright.sync_api import sync_playwright
import config, time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto(config.CMS_LOGIN_URL)
    page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
    page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
    page.locator("button[type='submit']").first.click()
    page.wait_for_url('**/admin/collections/**', timeout=25000)
    
    # Open Task 48568
    page.goto('https://cms.selectyouruniversity.com/admin/collections/tasks/6addf6836a658ef0b12f4381')
    page.wait_for_selector("button:has-text('Create Subtask')")
    page.locator("button:has-text('Create Subtask')").first.click()
    time.sleep(2)
    
    mand_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
    print('Found Mandatory field. Clicking control...')
    mand_wrapper.locator('.select__control').first.click()
    time.sleep(0.5)
    
    # Click option with exact text 'No'
    no_option = page.locator("div[class*='-option']:text-is('No'), div[class*='-option']:has-text('No')").first
    print('Found No option:', no_option.inner_text())
    no_option.click()
    time.sleep(0.5)
    
    val = mand_wrapper.locator(".select__single-value").first.inner_text()
    print('Successfully selected Mandatory value:', val)
    page.screenshot(path='verified_mandatory_no.png')
    browser.close()
