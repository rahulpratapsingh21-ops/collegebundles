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
    
    page.goto(config.CMS_CREATE_TASK_URL)
    time.sleep(2)
    
    clean_title = 'Lakshmi Narain College of Technology'
    page.locator("input[name='title']").first.fill(clean_title)
    desc = page.locator("textarea[name='description']").first
    if desc.is_visible():
        desc.fill(clean_title)
        
    # Content Category -> Colleges
    wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Content Category'))").first
    wrapper.locator('.select__control').first.click()
    time.sleep(0.5)
    page.locator("div[class*='-option']:has-text('Colleges')").first.click()
    time.sleep(0.8)
    
    # Entity -> Lakshmi Narain College of Technology
    ent_wrapper = page.locator("div.form-field-wrapper:has(label:has-text('Entity'))").first
    ent_wrapper.locator('.select__control').first.click()
    time.sleep(0.5)
    ent_inp = ent_wrapper.locator('input.select__input, input').first
    ent_inp.type('Lakshmi Narain College', delay=50)
    time.sleep(1.5)
    
    options = page.locator("div[class*='-option']").all()
    print('Entity options found:', [o.inner_text().strip() for o in options[:5]])
    if options:
        options[0].click()
        time.sleep(0.5)
    else:
        print('NO ENTITY OPTIONS FOUND for Lakshmi Narain College!')
        
    # Due Date
    page.locator("input[name='day']").first.click()
    time.sleep(0.3)
    page.locator('.react-calendar__tile--now, .react-calendar__tile').first.click()
    time.sleep(0.3)
    
    # SEO Manager
    m_wrap = page.locator("div.form-field-wrapper:has(label:has-text('SEO Manager'))").first
    m_wrap.locator('.select__control').first.click()
    time.sleep(0.3)
    page.locator("div[class*='-option']:has-text('rahul@syu.com')").first.click()
    time.sleep(0.3)
    
    # Content Editor
    e_wrap = page.locator("div.form-field-wrapper:has(label:has-text('Content Editor'))").first
    e_wrap.locator('.select__control').first.click()
    time.sleep(0.3)
    page.locator("div[class*='-option']:has-text('contenteditor@syu.com')").first.click()
    time.sleep(0.3)
    
    # Content Writer
    w_wrap = page.locator("div.form-field-wrapper:has(label:has-text('Content Writer'))").first
    w_wrap.locator('.select__control').first.click()
    time.sleep(0.3)
    page.locator("div[class*='-option']:has-text('contentwriter@syu.com')").first.click()
    time.sleep(0.5)
    
    page.screenshot(path='debug_filled_lnct_college.png', full_page=True)
    
    # Click Submit
    submit_btn = page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
    print('Submit button text:', submit_btn.inner_text().strip(), 'Disabled:', submit_btn.is_disabled())
    submit_btn.click()
    time.sleep(5)
    print('URL after submit:', page.url)
    page.screenshot(path='debug_after_submit_lnct.png', full_page=True)
    
    errs = page.locator('.field-error, .error, div[class*="error"]').all()
    print('Errors:', [e.inner_text().strip() for e in errs if e.is_visible()])
    
    browser.close()
