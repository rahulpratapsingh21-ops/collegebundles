import os
import re
import time
from datetime import datetime
from playwright.sync_api import sync_playwright
import config

class SYUCmsBot:
    def __init__(self, headless=False):
        # Set headless=False so every user can see the browser actions live!
        self.headless = headless
        self.playwright = None
        self.browser = None
        self.context = None
        self.page = None

    def start(self):
        print("[CMS Bot] Launching visible browser on desktop...")
        self.playwright = sync_playwright().start()
        # Launch visible browser window with slow_mo so user can watch actions clearly
        self.browser = self.playwright.chromium.launch(
            headless=self.headless,
            slow_mo=150,
            args=["--start-maximized"]
        )
        self.context = self.browser.new_context(viewport={"width": 1440, "height": 900})
        self.page = self.context.new_page()
        self.page.set_default_timeout(30000)

    def stop(self):
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
        print("[CMS Bot] Browser closed.")

    def login_if_needed(self):
        print("[CMS Bot] Opening CMS Login page...")
        self.page.goto(config.CMS_LOGIN_URL, wait_until="domcontentloaded")
        time.sleep(2)

        if "/admin/login" in self.page.url:
            print("[CMS Bot] Entering login credentials (rahul@syu.com)...")
            self.page.locator("input[type='email']").first.fill(config.CMS_EMAIL)
            time.sleep(0.3)
            self.page.locator("input[type='password']").first.fill(config.CMS_PASSWORD)
            time.sleep(0.3)
            print("[CMS Bot] Clicking login submit button...")
            self.page.locator("button[type='submit']").first.click()
            print("[CMS Bot] Waiting for login redirect to dashboard...")
            self.page.wait_for_url("**/admin/collections/**", timeout=25000)
            time.sleep(2)

        print(f"[CMS Bot] Successfully logged in! Current URL: {self.page.url}")
        return True

    def select_dropdown_field(self, label_name, search_val, fallback_val="", match_hint=""):
        """
        Interacts reliably with React-Select dropdowns inside form-field-wrapper
        Prioritizes EXACT matches to avoid fuzzy substring collisions (e.g. JEE matching Narsee Monjee).
        """
        if not search_val:
            search_val = fallback_val
        if not search_val:
            return False

        try:
            print(f"  [Dropdown] Selecting '{search_val}' for field '{label_name}' (hint: '{match_hint}')...")
            wrapper = self.page.locator(f"div.form-field-wrapper:has(label:has-text('{label_name}'))").first
            control = wrapper.locator(".select__control").first
            control.scroll_into_view_if_needed()
            control.click()
            time.sleep(0.4)

            # Type search query (use first 35 chars for Entity to trigger fast dropdown filter)
            query_to_type = str(search_val)[:35] if label_name == "Entity" else str(search_val)
            inp = wrapper.locator("input.select__input, input.css-1hac4vs-dummyInput, input").first
            try:
                inp.type(query_to_type, delay=35)
                time.sleep(0.8)
            except Exception:
                self.page.keyboard.type(query_to_type, delay=35)
                time.sleep(0.8)

            all_opts = self.page.locator("div[class*='-option']").all()

            # Priority 0: Option matching match_hint (e.g. course ID or short name)
            if match_hint:
                for opt in all_opts:
                    t = opt.inner_text().strip()
                    if str(match_hint).lower() in t.lower():
                        opt.click()
                        time.sleep(0.4)
                        return True

            # 1. First priority: EXACT match
            exact_opt = self.page.locator(f"div[class*='-option']:text-is('{search_val}')").first
            if exact_opt.is_visible():
                exact_opt.click()
                time.sleep(0.4)
                return True

            # 2. Second priority: Options starting with search_val or matching case-insensitively
            for opt in all_opts:
                t = opt.inner_text().strip()
                if t.lower() == str(search_val).lower() or t.lower().startswith(str(search_val).lower()) or str(search_val).lower() in t.lower() or t.lower() in str(search_val).lower():
                    opt.click()
                    time.sleep(0.4)
                    return True

            # 3. Third priority: Contains search_val
            menu_opt = self.page.locator(f"div[class*='-option']:has-text('{search_val}')").first
            if menu_opt.is_visible():
                menu_opt.click()
                time.sleep(0.4)
                return True

            # 4. If any options visible in dropdown, click the first one
            if all_opts:
                all_opts[0].click()
                time.sleep(0.4)
                return True

            # 5. If fallback exists, try fallback
            if fallback_val and fallback_val != search_val:
                self.page.keyboard.press("Backspace")
                time.sleep(0.2)
                self.page.keyboard.type(str(fallback_val), delay=40)
                time.sleep(0.6)
                fb_opt = self.page.locator(f"div[class*='-option']:has-text('{fallback_val}')").first
                if fb_opt.is_visible():
                    fb_opt.click()
                    time.sleep(0.4)
                    return True

            # Press Enter on first option
            first_opt = self.page.locator("div[class*='-option']").first
            if first_opt.is_visible():
                first_opt.click()
            else:
                self.page.keyboard.press("Enter")
            time.sleep(0.4)
            return True
        except Exception as e:
            print(f"  [Warn] Dropdown selection warning for '{label_name}': {e}")
            return False

    def update_google_sheet_cell(self, sheet_url, row_number, task_id):
        """
        Directly opens the Google Sheet in a background tab and types Task ID into Column E, row_number.
        """
        if not sheet_url or "docs.google.com/spreadsheets" not in sheet_url:
            return False

        try:
            print(f"\n>>> [STAGE 4] Updating live Google Sheet Row #{row_number} (Column E) with Task ID {task_id}...")
            sheet_page = self.context.new_page()
            
            # Extract gid if present
            gid_match = re.search(r"[#&]gid=([0-9]+)", sheet_url)
            gid = gid_match.group(1) if gid_match else "0"
            match = re.search(r"/d/([a-zA-Z0-9-_]+)", sheet_url)
            sheet_id = match.group(1) if match else "1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA"

            direct_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/edit#gid={gid}&range=E{row_number}"
            sheet_page.goto(direct_url, wait_until="domcontentloaded")
            sheet_page.wait_for_selector("#t-name-box, input[aria-label*='Name box']", timeout=12000)
            time.sleep(2)
            
            # Type Task ID into the cell
            sheet_page.keyboard.type(str(task_id))
            sheet_page.keyboard.press("Enter")
            time.sleep(3) # Wait for 'Saving... -> Saved to Drive'
            sheet_page.close()
            print(f"  [SUCCESS] Online Google Sheet Row #{row_number} Column E successfully updated with Task ID: {task_id}!")
            return True
        except Exception as e:
            print(f"  [Warn] Could not directly write to Google Sheet online: {e}")
            return False

    def fill_due_date_today(self):
        """
        Sets today's Due Date and cleanly closes the calendar popup
        """
        try:
            print("  [Due Date] Selecting today's date...")
            day_inp = self.page.locator("input[name='day']").first
            day_inp.scroll_into_view_if_needed()
            day_inp.click()
            time.sleep(0.4)

            now_tile = self.page.locator(".react-calendar__tile--now").first
            if now_tile.is_visible():
                now_tile.click()
            else:
                self.page.locator(".react-calendar__tile").first.click()
            time.sleep(0.4)
        except Exception as e:
            print(f"  [Warn] Due Date filling: {e}")

    def get_latest_task_id(self, clean_title=""):
        """
        Navigates to tasks table and extracts the verified Task ID from the topmost row or search.
        Ensures status is OPEN (NEVER returns a COMPLETED task from the past).
        """
        try:
            self.page.goto(config.CMS_TASKS_URL + "?limit=15", wait_until="domcontentloaded")
            time.sleep(2)

            # Check topmost row first (newly created task is always row 0)
            first_row = self.page.locator("table tbody tr").first
            tds = first_row.locator("td").all()
            if len(tds) >= 5:
                tid = tds[1].inner_text().strip()
                row_title = tds[2].inner_text().strip()
                status = tds[4].inner_text().strip().upper()
                
                # Verify row_title matches target clean_title
                first_word = clean_title.split()[0].lower() if clean_title else ""
                title_ok = not clean_title or (first_word and first_word in row_title.lower()) or (clean_title[:20].lower() in row_title.lower())
                
                if re.match(r"^\d{4,6}$", tid) and "COMPLETED" not in status and title_ok:
                    print(f"  [Task ID Found] Newly created top row Task ID: #{tid} (Status: {status}, Title: '{row_title}')")
                    return tid

            # 2. Search table specifically for clean_title (ONLY accepting OPEN tasks matching title)
            if clean_title:
                try:
                    search_box = self.page.locator("input[placeholder*='Search'], input[type='search'], input").first
                    if search_box.is_visible():
                        search_box.fill(clean_title[:30])
                        self.page.keyboard.press("Enter")
                        time.sleep(2)
                except Exception as e:
                    print(f"  [Warn] CMS table search error: {e}")

                rows = self.page.locator("table tbody tr").all()
                for r in rows:
                    tds = r.locator("td").all()
                    if len(tds) >= 5:
                        status = tds[4].inner_text().strip().upper()
                        row_title = tds[2].inner_text().strip()
                        if "COMPLETED" in status:
                            continue  # Skip old completed tasks!
                        first_word = clean_title.split()[0].lower() if clean_title else ""
                        if first_word and first_word not in row_title.lower() and clean_title[:20].lower() not in row_title.lower():
                            continue
                        tid = tds[1].inner_text().strip()
                        if re.match(r"^\d{4,6}$", tid):
                            print(f"  [Task ID Match] Found open task ID #{tid} (Status: {status}, Title: '{row_title}')")
                            return tid
        except Exception as e:
            print(f"  [Warn] Could not extract task ID automatically: {e}")
        return ""

    def check_existing_task_in_cms(self, item, classification):
        """
        USER REQUIREMENT:
        Check in CMS if a task already exists:
        - Check task Status: Is it OPEN or COMPLETED?
        - If COMPLETED:
            -> Agent will NOT reuse it. Agent will CREATE A NEW TASK AGAIN!
        - If OPEN:
            -> Check Content Writer name and Content Editor name.
            -> If BOTH Writer AND Editor match what's in the Excel sheet:
                Agent will NOT create task, and update previous Task ID in excel sheet.
            -> If Writer OR Editor does NOT match:
                Agent will CREATE a new task with the new assignees.
        """
        try:
            raw_title = item.get("title", "")
            clean_title = classification.get("clean_title", "")
            raw_writer = item.get("writer", "")
            raw_editor = item.get("editor", "")

            # Targeted search query
            search_query = (raw_title or clean_title)[:30].strip()
            if not search_query:
                return None

            print(f"\n>>> [CMS CHECK] Checking CMS for existing task matching '{search_query}'...")
            self.page.goto(config.CMS_TASKS_URL + "?limit=25", wait_until="domcontentloaded")
            time.sleep(2)

            search_box = self.page.locator("input[placeholder*='Search'], input[type='search'], input").first
            if search_box.is_visible():
                search_box.fill(search_query)
                self.page.keyboard.press("Enter")
                time.sleep(2.5)

            rows = self.page.locator("table tbody tr").all()
            if not rows:
                print("  [CMS CHECK] No existing tasks found in table.")
                return None

            for r in rows:
                tds = r.locator("td").all()
                if len(tds) < 5:
                    continue

                tid = tds[1].inner_text().strip()
                t_title = tds[2].inner_text().strip()
                t_cat = tds[3].inner_text().strip().lower()
                t_status = tds[4].inner_text().strip().upper()

                # Check if this row title matches our query
                COMMON_SEO_WORDS = {"2024", "2025", "2026", "2027", "2028", "registration", "exam", "exams", "date", "dates", "admission", "admissions", "eligibility", "counselling", "begins", "apply", "round", "results", "syllabus", "fees", "course", "college"}
                core_words = [w.lower() for w in re.findall(r"\w+", search_query) if w.lower() not in COMMON_SEO_WORDS and len(w) > 2]

                title_match = False
                if search_query.lower() in t_title.lower() or t_title.lower() in (raw_title or clean_title).lower():
                    title_match = True
                elif core_words:
                    # All core words (e.g. 'nmat' or 'kmea') must appear in t_title
                    title_match = all(cw in t_title.lower() for cw in core_words)
                if not title_match:
                    continue

                print(f"  [Found Task in CMS] Task ID #{tid} | Title: '{t_title}' | Status: '{t_status}'")

                # RULE 1: If Status is COMPLETED -> Create again!
                if "COMPLETED" in t_status or "CLOSED" in t_status:
                    print(f"  [Rule Triggered] Task #{tid} is COMPLETED. User rule: If completed, create again! Proceeding to create a brand new task.")
                    return None

                # RULE 2: If Status is OPEN -> Check Writer and Editor
                elif "OPEN" in t_status:
                    print(f"  [Rule Triggered] Task #{tid} is OPEN. Checking assigned Writer & Editor on Task page...")
                    tds[2].click()
                    time.sleep(3)

                    # Extract CMS Writer & Editor from the opened task details page
                    cms_writer = ""
                    cms_editor = ""
                    try:
                        wr_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('CONTENT WRITER'))").first
                        if wr_wrapper.is_visible():
                            s_val = wr_wrapper.locator(".select__single-value").first
                            cms_writer = s_val.inner_text().strip() if s_val.is_visible() else ""

                        ed_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('CONTENT EDITOR'))").first
                        if ed_wrapper.is_visible():
                            s_val = ed_wrapper.locator(".select__single-value").first
                            cms_editor = s_val.inner_text().strip() if s_val.is_visible() else ""
                    except Exception as e:
                        print(f"  [Warn] Could not read writer/editor from task page: {e}")

                    # Resolve target writer & editor from sheet
                    sheet_writer_email = config.resolve_person_self_learning(raw_writer, role="writer").lower()
                    sheet_editor_email = config.resolve_person_self_learning(raw_editor, role="editor").lower()
                    clean_raw_w = str(raw_writer).strip().lower()
                    clean_raw_e = str(raw_editor).strip().lower()

                    writer_matches = (
                        cms_writer.lower() == sheet_writer_email
                        or (clean_raw_w and clean_raw_w in cms_writer.lower())
                        or (cms_writer and cms_writer.lower() in clean_raw_w)
                        or ("contentwriter" in cms_writer.lower() and "content writer" in clean_raw_w)
                    )
                    editor_matches = (
                        cms_editor.lower() == sheet_editor_email
                        or (clean_raw_e and clean_raw_e in cms_editor.lower())
                        or (cms_editor and cms_editor.lower() in clean_raw_e)
                        or ("contenteditor" in cms_editor.lower() and "content editor" in clean_raw_e)
                    )

                    print(f"  [Assignee Comparison] CMS: Writer='{cms_writer}', Editor='{cms_editor}' | Sheet: Writer='{sheet_writer_email}', Editor='{sheet_editor_email}'")
                    print(f"  [Assignee Match] Writer Match: {writer_matches} | Editor Match: {editor_matches}")

                    if writer_matches and editor_matches:
                        # Check if this task already has subtasks
                        subtask_count = 0
                        try:
                            st_rows = self.page.locator("table tbody tr").all()
                            subtask_count = len(st_rows)
                        except Exception:
                            pass

                        if subtask_count == 0:
                            print(f"  [Notice] Active OPEN Task #{tid} has no subtasks yet. Proceeding to Stage 2 to create subtasks!")
                            return {"action": "create_subtasks", "task_id": tid, "task_page_url": self.page.url}
                        else:
                            print(f"  [SUCCESS] Both Writer and Editor match active OPEN Task #{tid} (with {subtask_count} subtasks)! Skipping duplicate creation and updating Sheet with Task ID #{tid}.")
                            return {"action": "reuse", "task_id": tid}
                    else:
                        print(f"  [Notice] Assignees differ on Task #{tid}. Creating new task with updated assignees.")
                        return None

        except Exception as e:
            print(f"  [Warn] Exception during existing task check: {e}")
            return None
        return None

    def process_task_automatically(self, item):
        """
        AUTONOMOUS DECISION & VISIBLE EXECUTION:
        0. Checks CMS if task exists:
           - If COMPLETED: Creates a fresh new task.
           - If OPEN with SAME Writer & Editor: Reuses task ID without duplicate creation.
        1. Classifies as EXISTING (Updation) vs NEW task.
        2. Fills Main Task fields visibly on screen.
           - For Blog Updation: IS UPDATE? toggle set to RIGHT, Entity selected with H1.
        3. Submits Main Task, opens Task page, and clicks Create Subtask.
        4. Fills SubTask fields (Keywords=H1, Page URL=unchanged, Meta Title/Desc from live page, Mandatory: No).
        5. Extracts Task ID from CMS table and updates Sheet.
        """
        classification = config.classify_task_automatically(item)
        is_updation = classification["is_updation"]
        clean_title = classification["clean_title"]
        category = classification["category"]
        entity_search = classification["entity_search"]
        sub_page = classification["sub_page"]
        slug = classification["slug"]

        raw_writer = item.get("writer", "")
        raw_editor = item.get("editor", "")

        print(f"\n============================================================")
        print(f"[AI DECISION] Task Classification: {'EXISTING (UPDATION)' if is_updation else 'NEW TASK'}")
        print(f"  Title: {clean_title}")
        print(f"  Category: {category.capitalize()}")
        if is_updation:
            print(f"  Live URL: {classification['url']}")
            if entity_search:
                print(f"  Entity: {entity_search}")
                print(f"  Target Tab: {sub_page}")
        else:
            print(f"  Generated URL Slug: {slug}")
        print(f"  Writer: {raw_writer}")
        print(f"  Editor: {raw_editor}")
        # Resolve Writer & Editor using Self-Learning AI Resolver
        writer_email = config.resolve_person_self_learning(raw_writer, role="writer")
        editor_email = config.resolve_person_self_learning(raw_editor, role="editor")

        # -------------------------------------------------------------
        # STEP 0: Check if an existing task already exists in CMS
        # -------------------------------------------------------------
        existing_check = self.check_existing_task_in_cms(item, classification)
        task_id = ""
        task_page_url = ""

        if existing_check and existing_check.get("action") == "reuse":
            reused_id = existing_check["task_id"]
            sheet_url = item.get("sheet_url") or "https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit#gid=0"
            row_num = item.get("row_number") or (item.get("row_index", 0) + 2)
            if row_num:
                self.update_google_sheet_cell(sheet_url, row_num, reused_id)
            return reused_id

        elif existing_check and existing_check.get("action") == "create_subtasks":
            task_id = existing_check["task_id"]
            task_page_url = existing_check["task_page_url"]
            print(f"  [Fast Path] Skipping Main Task creation; using existing Task #{task_id} at {task_page_url} to create SubTasks.")

        else:
            # -------------------------------------------------------------
            # STAGE 1: Main Task Creation (/admin/collections/tasks/create)
            # -------------------------------------------------------------
            print("\n>>> [STAGE 1] Creating Main Task in CMS...")
            self.page.goto(config.CMS_CREATE_TASK_URL, wait_until="domcontentloaded")
            time.sleep(2)

            # 1. Title & Description
            print(f"  [Main Task] Typing Title: '{clean_title}'...")
            self.page.locator("input[name='title']").first.fill(clean_title)
            time.sleep(0.3)

            desc_inp = self.page.locator("textarea[name='description']").first
            if desc_inp.is_visible():
                desc_inp.fill(clean_title)
                time.sleep(0.3)

            # 2. Content Category
            cat_display = category.capitalize()
            self.select_dropdown_field("Content Category", cat_display)
            time.sleep(0.6)

            # 3. Dynamic Field Handling for Blogs & Exams
            if category.lower() == "blogs":
                if is_updation:
                    print("  [Main Task] Setting IS UPDATE? toggle to ON (knob on RIGHT)...")
                    update_chk = self.page.locator("#updateData, input[name='isUpdate']").first
                    if not update_chk.is_checked():
                        update_chk.check(force=True)
                    time.sleep(0.8)

                    # When IS UPDATE? is ON, CMS displays ENTITY * dropdown!
                    # Select Entity with the H1 (clean_title) copied from the live URL
                    print(f"  [Main Task] Selecting Entity dropdown with H1: '{clean_title}'...")
                    self.select_dropdown_field("Entity", clean_title)
                    time.sleep(0.5)
                else:
                    # NEW Blog task (Not an updation)
                    EXAM_KEYWORDS = ["exam", "nmat", "cat", "mat", "xat", "snap", "cmat", "gmat", "gre", "gate", "clat", "jee", "neet", "viteee", "bitsat", "wbjee", "board", "paper", "date", "admit", "counselling", "cutoff"]
                    b_type = "Exams" if any(w in clean_title.lower() for w in EXAM_KEYWORDS) else "Colleges"
                    self.select_dropdown_field("Blog Type", b_type, fallback_val="General")
                    time.sleep(0.4)

                    for_search = entity_search if entity_search else clean_title.split()[0]
                    if "nmat" in clean_title.lower():
                        for_search = "NMAT by GMAC"
                    self.select_dropdown_field("Blog For", for_search, fallback_val="Joint Entrance Exam Main")
                    time.sleep(0.4)

                    self.select_dropdown_field("Blog Category", "Overview", fallback_val="Exam Dates")
                    time.sleep(0.4)

                    self.select_dropdown_field("Page Category", "SYU India")
                    time.sleep(0.4)

                    try:
                        tag_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('TAGS'))").first
                        tag_inp = tag_wrapper.locator("input").first
                        if tag_inp.is_visible():
                            tag_inp.fill(clean_title)
                            self.page.keyboard.press("Enter")
                            time.sleep(0.3)
                    except Exception:
                        pass

            elif entity_search:
                course_id = classification.get("course_id", "")
                self.select_dropdown_field("Entity", entity_search, fallback_val=item.get("title", ""), match_hint=course_id)

            # 4. Due Date (Required)
            self.fill_due_date_today()

            # 5. SEO Manager & Assignees
            self.select_dropdown_field("SEO Manager", "rahul@syu.com")
            time.sleep(0.3)
            self.select_dropdown_field("Content Editor", editor_email, fallback_val="natasha.ce@syu.com")
            time.sleep(0.3)
            self.select_dropdown_field("Content Writer", writer_email, fallback_val="rehana@syu.com")
            time.sleep(0.5)

            # 6. Submit Main Task
            print("  [Main Task] Clicking Submit button...")
            submit_btn = self.page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
            submit_btn.scroll_into_view_if_needed()
            submit_btn.click()
            time.sleep(3)
            
            # After submitting Main Task, CMS redirects to /admin/collections/tasks table!
            try:
                self.page.wait_for_url("**/admin/collections/tasks*", timeout=25000)
                time.sleep(2)
            except Exception:
                time.sleep(3)

            # Ensure we are on tasks table
            if "/admin/collections/tasks" not in self.page.url:
                self.page.goto(config.CMS_TASKS_URL + "?limit=25", wait_until="domcontentloaded")
                time.sleep(2)

            # Topmost row (Row 0) in the table is our newly created task!
            try:
                self.page.wait_for_selector("table tbody tr td", timeout=20000)
                time.sleep(1)
                first_row = self.page.locator("table tbody tr").first
                tds = first_row.locator("td").all()
                if len(tds) >= 3:
                    raw_tid = tds[1].inner_text().strip()
                    if re.match(r"^\d{4,6}$", raw_tid):
                        task_id = raw_tid
                        print(f"  [Task Found] Top row Task ID: #{task_id}")
            except Exception as e:
                print(f"  [Warn] Could not read top row task ID directly: {e}")

        # -------------------------------------------------------------
        # STAGE 2: Navigate to Task & Create SubTask(s)
        # -------------------------------------------------------------
        # Explored tabs per content category in CMS
        CATEGORY_TABS_MAP = {
            "colleges": [
                "Overview", "Courses And Fees", "Admissions", "Placements",
                "Infrastructure", "Faculty", "Scholarship", "News And Articles"
            ],
            "exams": [
                "Overview", "Application Process", "Eligibility And Preparation",
                "Exam Details", "Results", "Accepting Colleges", "Exam Dates",
                "Syllabus", "Past Question Papers"
            ],
            "courses": [
                "Overview", "Eligibility", "Syllabus", "Jobs And Careers", "General"
            ],
            "blogs": [
                "Blog Content"
            ]
        }

        cat_key = category.lower()
        if cat_key == "blogs":
            # USER REQUIREMENT: In blog ONE subtask is needed (Page: Blog Content, Title: Blog Content)
            tabs_to_create = ["Blog Content"]
            print("\n>>> [SubTask Policy] Category is 'Blogs': Creating 1 SubTask ('Blog Content') as required by CMS.")
        elif is_updation:
            # UPDATION: Only update/create the specific tab requested in the Excel sheet
            effective_page = sub_page or "Overview"
            tabs_to_create = [effective_page]
            print(f"\n>>> [SubTask Policy] Updation task: Creating SubTask for target page tab: '{effective_page}'")
        else:
            # NEW TASK: Colleges, Exams, Courses
            # Agent creates subtasks for each user-selected tab (or default tab)
            user_selected_tabs = item.get("selected_tabs")
            if user_selected_tabs and isinstance(user_selected_tabs, list) and len(user_selected_tabs) > 0:
                tabs_to_create = user_selected_tabs
            elif sub_page:
                tabs_to_create = [sub_page]
            else:
                tabs_to_create = ["Overview"]
            print(f"\n>>> [SubTask Policy] NEW TASK in '{category}': Creating {len(tabs_to_create)} SubTask(s): {tabs_to_create}")

        # Locate created Task to open Task details page
        print("\n>>> [STAGE 2] Locating created Task to open Task page and create SubTask(s)...")
        if not task_page_url or "/admin/collections/tasks/" not in task_page_url:
            try:
                self.page.wait_for_selector("table tbody tr td", timeout=20000)
                time.sleep(1)
                first_row = self.page.locator("table tbody tr").first
                tds = first_row.locator("td").all()
                if len(tds) >= 3:
                    print("  [Task Navigation] Clicking Task row Title to open Task page...")
                    tds[2].click()
                    self.page.wait_for_url("**/admin/collections/tasks/*", timeout=15000)
                    time.sleep(2)
            except Exception as e:
                print(f"  [Warn] Could not click top row directly: {e}")

        # If not yet on task details page, search and open
        if "/admin/collections/tasks/" not in self.page.url:
            try:
                self.page.goto(config.CMS_TASKS_URL + "?limit=25", wait_until="domcontentloaded")
                self.page.wait_for_selector("table tbody tr td", timeout=15000)
                time.sleep(1)
                sb = self.page.locator("input[placeholder*='Search'], input[type='search'], input").first
                search_term = task_id if task_id else clean_title[:30]
                sb.fill(search_term)
                self.page.keyboard.press("Enter")
                time.sleep(2)
                self.page.wait_for_selector("table tbody tr td", timeout=15000)
                self.page.locator("table tbody tr").first.locator("td").nth(2).click()
                self.page.wait_for_url("**/admin/collections/tasks/*", timeout=15000)
                time.sleep(2)
            except Exception as e:
                print(f"  [Warn] Fallback navigation error: {e}")

        task_page_url = self.page.url
        print(f"  [Task Page] Current Task URL: {task_page_url}")

        for s_idx, target_tab in enumerate(tabs_to_create, 1):
            print(f"\n------------------------------------------------------------")
            print(f"  [SubTask {s_idx}/{len(tabs_to_create)}] Creating SubTask for Page Tab: '{target_tab}'")
            print(f"------------------------------------------------------------")

            # Ensure we are on the main task details page
            if "/admin/collections/tasks/" not in self.page.url or self.page.url.endswith("/tasks"):
                self.page.goto(task_page_url, wait_until="domcontentloaded")
                time.sleep(2.5)

            create_sub_btn = self.page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first
            if not create_sub_btn.is_visible():
                print("  [SubTask] 'Create Subtask' button not directly visible, reloading task page...")
                self.page.goto(task_page_url, wait_until="domcontentloaded")
                time.sleep(2.5)
                create_sub_btn = self.page.locator("button:has-text('Create Subtask'), a:has-text('Create Subtask')").first

            if create_sub_btn.is_visible():
                create_sub_btn.click()
                time.sleep(3)
                print(f"  [SubTask {s_idx}] SubTask form opened successfully!")
            else:
                print(f"  [Error] Could not open SubTask form for tab '{target_tab}'!")
                continue

            # 1. Title (USER REQUIREMENT: In College, Exam, Course, and Blog subtask name will be the PAGE NAME!)
            sub_title = target_tab
            print(f"  [SubTask {s_idx}] Setting Subtask Title to Page Name: '{sub_title}'...")
            sub_title_inp = self.page.locator("input[name='title']").first
            if sub_title_inp.is_visible():
                sub_title_inp.fill(sub_title)
                time.sleep(0.3)

            # 2. Description
            desc_inp = self.page.locator("textarea[name='description']").first
            if desc_inp.is_visible():
                desc_inp.fill(clean_title)
                time.sleep(0.3)

            # 3. Page Tab (Required for Exams/Colleges/Courses, e.g. "Overview" or "Past Question Papers")
            if cat_key != "blogs":
                try:
                    page_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('Page')), div.form-field-wrapper:has(label:has-text('PAGE'))").first
                    if page_wrapper.is_visible():
                        sel = page_wrapper.locator(".select__single-value").first
                        if not sel.is_visible() or sel.inner_text().strip() != target_tab:
                            print(f"  [SubTask {s_idx}] Selecting Page Tab: '{target_tab}'...")
                            self.select_dropdown_field("Page", target_tab, fallback_val="Overview")
                            time.sleep(0.4)
                except Exception as e:
                    print(f"  [Warn] Page dropdown error: {e}")
            else:
                print(f"  [SubTask {s_idx}] Blog subtask: Page is automatically set to 'Blog Content'.")

            # 4. Mandatory: No (User requirement: in subtask Mandatory will ALWAYS be No)
            try:
                mand_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('Mandatory')), div.form-field-wrapper:has(label:has-text('MANDATORY'))").first
                if mand_wrapper.is_visible():
                    print(f"  [SubTask {s_idx}] Setting Mandatory dropdown to 'No'...")
                    mand_control = mand_wrapper.locator(".select__control").first
                    mand_control.scroll_into_view_if_needed()
                    mand_control.click()
                    time.sleep(0.4)
                    
                    # Direct click on 'No' option
                    no_opt = self.page.locator("div[class*='-option']:text-is('No'), div[class*='-option']:has-text('No')").first
                    if no_opt.is_visible():
                        no_opt.click()
                    else:
                        self.page.keyboard.press("ArrowDown")
                        time.sleep(0.2)
                        self.page.keyboard.press("Enter")
                    time.sleep(0.3)
                    print(f"  [SubTask {s_idx}] Mandatory successfully verified as 'No'!")
            except Exception as e:
                print(f"  [Warn] Mandatory field error: {e}")

            # 5. Primary & Secondary Keywords
            try:
                pk_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('PRIMARY KEYWORDS'))").first
                pk_inp = pk_wrapper.locator("input").first
                if pk_inp.is_visible():
                    pk_inp.fill(clean_title)
                    self.page.keyboard.press("Enter")
                    time.sleep(0.3)

                sk_wrapper = self.page.locator("div.form-field-wrapper:has(label:has-text('SECONDARY KEYWORDS'))").first
                sk_inp = sk_wrapper.locator("input").first
                if sk_inp.is_visible():
                    sk_inp.fill(clean_title)
                    self.page.keyboard.press("Enter")
                    time.sleep(0.3)
            except Exception as e:
                print(f"  [Warn] Keywords input warning: {e}")

            # 6. Page URL Slug (Preserved on updation, generated on new task)
            try:
                purl = self.page.locator("input[placeholder*='page url'], input[placeholder*='Page url'], input[name='pageUrl']").first
                if purl.is_visible():
                    if is_updation:
                        print(f"  [SubTask {s_idx}] Updation task: Preserving existing Page URL '{purl.input_value()}'.")
                    else:
                        sub_slug = re.sub(r"[^a-z0-9]+", "-", target_tab.lower()).strip("-")
                        if cat_key == "blogs":
                            sub_slug = "blog-content"
                        print(f"  [SubTask {s_idx}] Filling Page URL slug: '{sub_slug}'...")
                        purl.fill(sub_slug)
                        time.sleep(0.3)
            except Exception as e:
                print(f"  [Warn] Page URL filling: {e}")

            # 7. Meta Title & Meta Description
            meta_title = classification.get("meta_title") or clean_title
            meta_description = classification.get("meta_description") or f"Get complete details regarding {clean_title} on SelectYourUniversity."
            try:
                mt_inp = self.page.locator("input[name='metaTitle']").first
                if mt_inp.is_visible():
                    mt_inp.fill(meta_title)
                    time.sleep(0.2)

                md_inp = self.page.locator("textarea[name='metaDescription']").first
                if md_inp.is_visible():
                    md_inp.fill(meta_description)
                    time.sleep(0.2)
            except Exception as e:
                print(f"  [Warn] Meta tags warning: {e}")

            # 8. Due Date
            self.fill_due_date_today()

            # 9. SEO Manager
            self.select_dropdown_field("SEO Manager", "rahul@syu.com")
            time.sleep(0.3)

            # 10. Assignees
            self.select_dropdown_field("Content Editor", editor_email, fallback_val="natasha.ce@syu.com")
            time.sleep(0.3)
            self.select_dropdown_field("Content Writer", writer_email, fallback_val="rehana@syu.com")
            time.sleep(0.5)

            # 11. Submit SubTask
            print(f"  [SubTask {s_idx}] Clicking Submit button...")
            sub_submit = self.page.locator("button:has(.button-text:has-text('Submit')), button:has-text('Submit')").first
            sub_submit.scroll_into_view_if_needed()
            sub_submit.click()
            time.sleep(4)
            print(f"  [SubTask {s_idx}] SubTask for '{target_tab}' successfully submitted and linked!")

        # -------------------------------------------------------------
        # STAGE 3: Extract & Verify Task ID
        # -------------------------------------------------------------
        if not task_id:
            task_id = self.get_latest_task_id(clean_title)
        if task_id:
            print(f"\n============================================================")
            print(f">>> [SUCCESS] Task ID Created in CMS: {task_id} <<<")
            print(f"============================================================\n")

            # ---------------------------------------------------------
            # STAGE 4: Update Online Google Sheet directly
            # ---------------------------------------------------------
            sheet_url = item.get("sheet_url") or "https://docs.google.com/spreadsheets/d/1PSc-TNUTrR9CvJpvtEyIUSm532SSJCzEHmfzaNSWKYA/edit#gid=0"
            row_num = item.get("row_number") or (item.get("row_index", 0) + 2)
            if row_num:
                self.update_google_sheet_cell(sheet_url, row_num, task_id)

        return task_id
