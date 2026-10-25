# SYU Task & Subtask Autonomous Automation Agent

Autonomous engine built for **SelectYourUniversity (SYU)** to process SEO content tasks from Google Sheets / Excel into the SYU CMS (`https://cms.selectyouruniversity.com`), create properly nested SubTasks, and write the resulting Task ID back into the live spreadsheet.

---

## 🚀 Key Capabilities & Architecture

### 1. Automated Task Classification (`config.py`)
- **Full Row URL Detection**: Scans **all columns** of every row for any `selectyouruniversity.com` URL.
  - If a URL is found $\rightarrow$ **EXISTING (UPDATION)** task (`is_updation = True`, `IS UPDATE?` toggled ON in CMS, tab set to `Overview` or target page).
  - If no URL is found $\rightarrow$ **NEW TASK** (`is_updation = False`, generates clean URL slug).
- **Exam Entity Resolver**: Maps exam acronyms and titles to exact CMS dropdown names (e.g., `JEE Mains` $\rightarrow$ `Joint Entrance Exam Main`, `NEET PG` $\rightarrow$ `NEET PG`, `VITEEE` $\rightarrow$ `Vellore Institute of Technology Engineering Entrance Examination`).

### 2. CMS Assignee Self-Learning Resolver (`config.py`)
- Extracted directly from live CMS dropdowns:
  - **52 Content Writers** (`natasha@syu.com`, `shreyosee@syu.com`, `rehana@syu.com`, `contentwriter@syu.com`, etc.)
  - **9 Content Editors** (`arsh.ce@syu.com`, `contenteditor@syu.com`, `hardik.ce@syu.com`, `natasha.ce@syu.com`, `sushil@syu.com`, etc.)
- Dynamically resolves names, nicknames, and typos with fuzzy matching and persists them in `learned_rules.json`.

### 3. Main Task & SubTask Workflow (`cms_bot.py`)
- **Stage 1 (Main Task)**:
  - Fills Title, Content Category (`Blogs`), Blog Type (`Exams` / `Colleges`), Blog For, Blog Category (`Overview`), Page Category (`SYU India`), Due Date, Editor, Writer.
  - Submits the task.
- **Stage 2 (SubTask Creation)**:
  - Navigates to the newly created Task page (`/admin/collections/tasks/<taskId>`).
  - Clicks the dedicated **`Create Subtask`** button.
  - Pre-links the Parent Task ID automatically.
  - Fills all mandatory fields: **Title**, **Slug**, **Primary & Secondary Keywords**, **SEO Manager (`rahul@syu.com`)**, **Content Editor**, **Content Writer**, **Mandatory (`Yes`)**, **Due Date**.
  - Submits the SubTask so it nests directly under the parent task in the Tasks table.
- **Stage 3 (Task ID Retrieval)**:
  - Extracts the verified 5-digit Task ID from the CMS tasks table.
- **Stage 4 (Live Google Sheet Updation)**:
  - Navigates to `range=E{row_number}` via Playwright and writes the Task ID directly into Column E of the live Google Sheet.

---

## 📁 Core Project Files

| File | Description |
|---|---|
| [`cms_bot.py`](cms_bot.py) | Main Playwright automation bot handling login, form filling, subtask creation, and Google Sheet cell updates. |
| [`config.py`](config.py) | CMS credentials, exam entity dictionary, CMS team directories, URL parsers, and task classification logic. |
| [`sheet_manager.py`](sheet_manager.py) | Google Sheet CSV / Excel data loader, column mapper, and backup exporter. |
| [`test_fill_form.py`](test_fill_form.py) | **Primary single-row runner**. Allows testing any row visibly on screen. |
| [`agent.py`](agent.py) | CLI driver for running continuous batch processing across all pending rows. |
| [`learned_rules.json`](learned_rules.json) | Cache of self-learning writer/editor name resolutions. |
| [`syu_sheet_updated.xlsx`](syu_sheet_updated.xlsx) | Latest exported local Excel copy with updated Task IDs. |
| [`debug_archive/`](debug_archive/) | Archived debug scripts, screenshots, and inspection helpers. |

---

## 📋 Recently Processed Rows (Verified Live)

| Row # | Title | Task Type | CMS Task ID | Google Sheet Status |
|---|---|---|---|---|
| **1555** | CHSE Odisha +2 Exam 2027... | Updation | **48539** | Column E Recorded |
| **1556** | VITEEE 2027 Registration | Updation | **48540** | Column E Recorded |
| **1557** | CBSE 10th Exam Pattern | New Task | **48541** | Column E Recorded |
| **1558** | JEE Mains 2025 Registration | New Task | **48551** | Column E Recorded + SubTask Verified |
| **1559** | VITEEE 2028 Enrer | Updation | **48554** | Column E Recorded + SubTask Verified |
| **1560** | WB NEET PG Counselling 2027 | New Task | **48553** | Column E Recorded + SubTask Verified |

---

## 🛠️ How to Run

### 1. Test a Specific Row
To run any specific row with a visible browser on your desktop:
```powershell
python test_fill_form.py <row_number>
```
*Example:*
```powershell
python test_fill_form.py 1561
```

### 2. Run Batch Processing
To process multiple pending rows automatically:
```powershell
python agent.py
```
