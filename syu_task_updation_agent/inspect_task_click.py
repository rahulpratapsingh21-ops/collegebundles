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
    
    page.goto(config.CMS_TASKS_URL + '?limit=10')
    page.wait_for_selector('table tbody tr td', timeout=15000)
    time.sleep(1)
    first_row = page.locator('table tbody tr').first
    tds = first_row.locator('td').all()
    print('Tds count:', len(tds))
    for i, td in enumerate(tds):
        print(f"TD {i}: text='{td.inner_text().strip()}'")
    
    # Check what <a> or clickable elements exist inside first_row
    links = first_row.locator('a').all()
    print('Links inside first_row:', len(links))
    for l in links:
        print("Link href:", l.get_attribute('href'), "text:", l.inner_text().strip())
        
    # Click title
    if links:
        links[0].click()
    else:
        tds[2].click()
    time.sleep(3)
    print('Current URL after click:', page.url)
    page.screenshot(path='task_details_48568.png', full_page=True)
    
    # Check for Create Subtask button
    sub_btns = page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").all()
    print('Create Subtask buttons found:', len(sub_btns))
    for b in sub_btns:
        print('Button text:', b.inner_text().strip(), 'visible:', b.is_visible())
        
    browser.close()
