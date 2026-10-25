import os
import re
import html
import urllib.request

# Base CMS URL
CMS_LOGIN_URL = "https://cms.selectyouruniversity.com/admin/login?redirect=%2Fcollections%2Fusers"
CMS_TASKS_URL = "https://cms.selectyouruniversity.com/admin/collections/tasks"
CMS_CREATE_TASK_URL = "https://cms.selectyouruniversity.com/admin/collections/tasks/create"
CMS_CREATE_SUBTASK_URL = "https://cms.selectyouruniversity.com/admin/collections/subTasks/create"

# Default SEO Manager & CMS Login Credentials
DEFAULT_SEO_MANAGER = "rahul@syu.com"
CMS_EMAIL = "rahul@syu.com"
CMS_PASSWORD = "Rahul@123"

LEARNED_RULES_PATH = os.path.join(os.path.dirname(__file__), "learned_rules.json")

# =============================================================
# COMPLETE CMS USER DIRECTORY (Display Name -> CMS email)
# Dumped directly from cms.selectyouruniversity.com/admin/collections/users
# =============================================================
CMS_USER_DIRECTORY = {
    # ─── Content Writers  (all 52 from CMS dropdown) ────────────────────────
    "abhishek": "abhishek@syu.com",
    "ajit": "ajit@syu.com",
    "akshita": "akshita@syu.com",
    "aman": "aman@syu.com",
    "amrita": "amrita@syu.com",
    "anubha": "anubha@syu.com",
    "arsh cw": "arsh.cw@syu.com",
    "arsh.cw": "arsh.cw@syu.com",
    "ashna": "ashna@syu.com",
    "ayushi": "ayushi@syu.com",
    "contentwriter": "contentwriter@syu.com",
    "debanjali": "debanjali@syu.com",
    "devanshi": "devanshi@syu.com",
    "durgesh": "durgesh@syu.com",
    "garima": "garima@syu.com",
    "hardik cw": "hardik.cw@syu.com",
    "hardik.cw": "hardik.cw@syu.com",
    "jyoti": "jyoti@syu.com",
    "kapil": "kapil@syu.com",
    "kashish": "kashish@syu.com",
    "khushi": "khushi@syu.com",
    "lakshmi": "lakshmi@syu.com",
    "manika": "manikagupta@syu.com",
    "manikagupta": "manikagupta@syu.com",
    "manshi": "manshi@syu.com",
    "natasha": "natasha@syu.com",
    "neelakshi": "neelakshi@syu.com",
    "notif writer": "notifwriter@syu.com",
    "notifwriter": "notifwriter@syu.com",
    "pragya": "pragyagupta@syu.com",
    "pragyagupta": "pragyagupta@syu.com",
    "prince": "prince@syu.com",
    "puja": "puja.das@syu.com",
    "puja das": "puja.das@syu.com",
    "rajat": "rajat@syu.com",
    "rehana": "rehana@syu.com",
    "rimi": "rimi@syu.com",
    "rimi roy": "rimi@syu.com",
    "sabita": "sabita@syu.com",
    "sakshi": "sakshi@syu.com",
    "sampada": "sampada@syu.com",
    "santosh": "santosh@syu.com",
    "saptarshi": "saptarshi@syu.com",
    "shivam": "shivam.singh@syu.com",
    "shivam singh": "shivam.singh@syu.com",
    "shreyosee": "shreyosee@syu.com",
    "shreyosee chatterjee": "shreyosee@syu.com",
    "shubham": "shubhamverma@syu.com",
    "shubham verma": "shubhamverma@syu.com",
    "shubhamverma": "shubhamverma@syu.com",
    "srijita": "srijita@syu.com",
    "srijita ghosh": "srijita@syu.com",
    "swati": "swati@syu.com",
    "tanisha": "tanisha@syu.com",
    "tanya": "tanyasaxena@syu.com",
    "tanyasaxena": "tanyasaxena@syu.com",
    "trisha": "trisha@syu.com",
    "udit": "uditpandit@syu.com",
    "udit pandit": "uditpandit@syu.com",
    "uditpandit": "uditpandit@syu.com",
    "update arpita": "update_arpita@syu.com",
    "update manugarg": "update_manugarg@syu.com",
    "update nischay": "update_nischay@syu.com",
    "update pragati": "update_pragati@syu.com",
    "update samrat": "update_samrat@syu.com",
    "update shreshtha": "update_shreshtha@syu.com",
    "vishakha": "vishakha@syu.com",
    # ─── Content Editors  (all 9 from CMS dropdown) ─────────────────────────
    "arsh": "arsh.ce@syu.com",
    "arsh ce": "arsh.ce@syu.com",
    "arsh.ce": "arsh.ce@syu.com",
    "contenteditor": "contenteditor@syu.com",
    "hardik": "hardik.ce@syu.com",
    "hardik ce": "hardik.ce@syu.com",
    "hardik.ce": "hardik.ce@syu.com",
    "insiya": "insiya@syu.com",
    "natasha ce": "natasha.ce@syu.com",
    "natasha.ce": "natasha.ce@syu.com",
    "notif editor": "notifeditor@syu.com",
    "notifeditor": "notifeditor@syu.com",
    "saksham": "saksham.ce@syu.com",
    "saksham ce": "saksham.ce@syu.com",
    "saksham.ce": "saksham.ce@syu.com",
    "sushil": "sushil@syu.com",
    "vaibhav": "vaibhav@syu.com",
    # ─── Typos / generic cell values (fallback to defaults) ──────────────────
    "contet writr": "contentwriter@syu.com",
    "contet writer": "contentwriter@syu.com",
    "content writer": "contentwriter@syu.com",
    "writer": "contentwriter@syu.com",
    "ediotr": "contenteditor@syu.com",
    "content editor": "contenteditor@syu.com",
    "editor": "contenteditor@syu.com",
}

CMS_KNOWN_WRITERS = [
    "abhishek@syu.com", "ajit@syu.com", "akshita@syu.com", "aman@syu.com",
    "amrita@syu.com", "anubha@syu.com", "arsh.cw@syu.com", "ashna@syu.com",
    "ayushi@syu.com", "contentwriter@syu.com", "debanjali@syu.com", "devanshi@syu.com",
    "durgesh@syu.com", "garima@syu.com", "hardik.cw@syu.com", "jyoti@syu.com",
    "kapil@syu.com", "kashish@syu.com", "khushi@syu.com", "lakshmi@syu.com",
    "manikagupta@syu.com", "manshi@syu.com", "natasha@syu.com", "neelakshi@syu.com",
    "notifwriter@syu.com", "pragyagupta@syu.com", "prince@syu.com", "puja.das@syu.com",
    "rajat@syu.com", "rehana@syu.com", "rimi@syu.com", "sabita@syu.com",
    "sakshi@syu.com", "sampada@syu.com", "santosh@syu.com", "saptarshi@syu.com",
    "shivam.singh@syu.com", "shreyosee@syu.com", "shubhamverma@syu.com", "srijita@syu.com",
    "swati@syu.com", "tanisha@syu.com", "tanyasaxena@syu.com", "trisha@syu.com",
    "uditpandit@syu.com", "update_arpita@syu.com", "update_manugarg@syu.com",
    "update_nischay@syu.com", "update_pragati@syu.com", "update_samrat@syu.com",
    "update_shreshtha@syu.com", "vishakha@syu.com"
]
CMS_KNOWN_EDITORS = [
    "arsh.ce@syu.com", "contenteditor@syu.com", "hardik.ce@syu.com",
    "insiya@syu.com", "natasha.ce@syu.com", "notifeditor@syu.com",
    "saksham.ce@syu.com", "sushil@syu.com", "vaibhav@syu.com"
]

def load_learned_rules():
    if os.path.exists(LEARNED_RULES_PATH):
        try:
            import json
            with open(LEARNED_RULES_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"writers": {}, "editors": {}}

def save_learned_rules(rules):
    try:
        import json
        with open(LEARNED_RULES_PATH, "w", encoding="utf-8") as f:
            json.dump(rules, f, indent=2)
    except Exception:
        pass

def resolve_person_self_learning(raw_name, role="writer"):
    """
    Resolves a writer/editor name from Excel to the correct CMS email.

    Priority:
    1. Direct lookup in CMS_USER_DIRECTORY by display name (from Excel column header match)
    2. Fuzzy prefix match against CMS email handles (2-3 chars)
    3. Persistent learned_rules.json (auto-updates for new names)
    4. Default: rehana@syu.com for writers, natasha.ce@syu.com for editors
    """
    if not raw_name or str(raw_name).strip().lower() in ["", "nan"]:
        return "contentwriter@syu.com" if role == "writer" else "contenteditor@syu.com"

    clean = str(raw_name).strip().lower()

    # 1. Direct lookup in CMS directory by display name
    if clean in CMS_USER_DIRECTORY:
        email = CMS_USER_DIRECTORY[clean]
        print(f"  [Writer/Editor] Matched '{raw_name}' -> '{email}' (from CMS directory)")
        return email

    # Also try matching on first word only (e.g. 'Shreyosee Chatterjee' -> 'shreyosee')
    first_word = clean.split()[0] if clean.split() else clean
    if first_word in CMS_USER_DIRECTORY:
        email = CMS_USER_DIRECTORY[first_word]
        print(f"  [Writer/Editor] Matched '{raw_name}' (first word '{first_word}') -> '{email}'")
        return email

    # 2. Check persistent learned rules
    learned = load_learned_rules()
    mapping_key = "writers" if role == "writer" else "editors"
    rules_map = learned.get(mapping_key, {})
    if clean in rules_map:
        return rules_map[clean]

    # 3. Fuzzy prefix match against known CMS email handles
    target_pool = CMS_KNOWN_WRITERS if role == "writer" else CMS_KNOWN_EDITORS
    prefix3 = clean[:3]
    for email in target_pool:
        handle = email.split("@")[0].lower()
        if len(prefix3) >= 2 and (handle.startswith(prefix3) or prefix3 in handle):
            rules_map[clean] = email
            learned[mapping_key] = rules_map
            save_learned_rules(learned)
            print(f"  [Writer/Editor] Fuzzy-matched '{raw_name}' -> '{email}' (saved to memory)")
            return email

    # 4. Default fallback
    default_email = "contentwriter@syu.com" if role == "writer" else "contenteditor@syu.com"
    rules_map[clean] = default_email
    learned[mapping_key] = rules_map
    save_learned_rules(learned)
    print(f"  [Writer/Editor] No match for '{raw_name}' -> using default '{default_email}'")
    return default_email

def parse_url_details(url):
    """
    Parses full details from a live URL:
    - category: blogs, exams, colleges, courses
    - entity_search: search query to find entity in CMS dropdown
    - sub_page: tab name (e.g. Overview, Past Question Papers)
    - slug: page URL slug
    """
    if not url or not isinstance(url, str):
        return {
            "category": "blogs",
            "entity_search": "",
            "sub_page": "Overview",
            "slug": "",
        }

    clean = url.strip().rstrip("/")
    parts = clean.split("/")

    subpage_map = {
        "overview": "Overview",
        "past-question-papers": "Past Question Papers",
        "syllabus": "Syllabus",
        "exam-dates": "Exam Dates",
        "exam-details": "Exam Details",
        "eligibility-and-preparation": "Eligibility And Preparation",
        "courses": "Courses",
        "cutoff": "Cutoff",
        "fees": "Fees",
        "admission": "Admission",
        "placements": "Placements",
        "ranking": "Ranking",
        "scholarship": "Scholarship",
    }

    if "/exam/" in clean:
        idx = parts.index("exam")
        entity_raw = parts[idx + 1] if len(parts) > idx + 1 else ""
        sub_raw = parts[idx + 2] if len(parts) > idx + 2 else "overview"
        # Remove eid-304 etc.
        entity_clean = re.sub(r"-eid-\d+", "", entity_raw).replace("-", " ")
        mapped_entity = detect_exam_entity(entity_clean) or entity_clean
        return {
            "category": "exams",
            "entity_search": mapped_entity,
            "sub_page": subpage_map.get(sub_raw, sub_raw.replace("-", " ").title()),
            "slug": parts[-1],
        }

    elif "/college/" in clean:
        idx = parts.index("college")
        entity_raw = parts[idx + 1] if len(parts) > idx + 1 else ""
        sub_raw = parts[idx + 2] if len(parts) > idx + 2 else "overview"
        # Remove cid-25654 etc.
        entity_clean = re.sub(r"-cid-\d+", "", entity_raw).replace("-", " ")
        return {
            "category": "colleges",
            "entity_search": entity_clean,
            "sub_page": subpage_map.get(sub_raw, sub_raw.replace("-", " ").title()),
            "slug": parts[-1],
        }

    elif "/course/" in clean:
        idx = parts.index("course")
        entity_raw = parts[idx + 1] if len(parts) > idx + 1 else ""
        id_match = re.search(r"-(\d+)$", entity_raw)
        course_id = id_match.group(1) if id_match else ""
        entity_clean = re.sub(r"-(mci|crse|cid)?-?\d+$", "", entity_raw).replace("-", " ")
        return {
            "category": "courses",
            "entity_search": entity_clean.strip(),
            "course_id": course_id,
            "sub_page": "Overview",
            "slug": parts[-1],
        }

    else:
        # Default to Blogs
        slug = parts[-1] if parts else ""
        return {
            "category": "blogs",
            "entity_search": "",
            "sub_page": "Overview",
            "slug": slug,
        }



EXAM_CMS_MAPPING = {
    "jee main": "Joint Entrance Exam Main",
    "jee mains": "Joint Entrance Exam Main",
    "jee advanced": "Joint Entrance Examination Advanced",
    "jee": "Joint Entrance Exam Main",
    "neet pg": "NEET PG",
    "neet": "NEET UG",
    "viteee": "Vellore Institute of Technology Engineering Entrance Examination",
    "cat": "Common Admission Test (CAT)",
    "gate": "GATE",
    "wbjee": "West Bengal Joint Entrance Examinations Board (WBJEEB)",
    "bitsat": "BITSAT",
    "cbse 10th board": "CBSE Class X Board",
    "cbse 10th": "CBSE Class X Board",
    "cbse 10": "CBSE Class X Board",
    "cbse class 10": "CBSE Class X Board",
    "cbse class x": "CBSE Class X Board",
    "cbse 12th board": "CBSE Class Twelve Board Exam",
    "cbse 12th": "CBSE Class Twelve Board Exam",
    "cbse 12": "CBSE Class Twelve Board Exam",
    "cbse class 12": "CBSE Class Twelve Board Exam",
    "cbse class xii": "CBSE Class Twelve Board Exam",
    "eamcet": "AP EAMCET",
}

def detect_exam_entity(title):
    t_lower = title.lower()
    # Check longer specific keys first
    for k in sorted(EXAM_CMS_MAPPING.keys(), key=len, reverse=True):
        # Match whole word or key
        if re.search(r"\b" + re.escape(k) + r"\b", t_lower):
            return EXAM_CMS_MAPPING[k]
    return ""

def fetch_live_page_metadata(url):
    """
    Fetches the live URL and extracts:
    - h1: <h1> tag text
    - meta_title: <title> tag text
    - meta_description: <meta name="description"> content
    """
    if not url or "selectyouruniversity.com" not in url:
        return {"h1": "", "meta_title": "", "meta_description": ""}
        
    try:
        print(f"  [Live Page] Fetching metadata from: {url}...")
        req = urllib.request.Request(
            url, 
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        )
        with urllib.request.urlopen(req, timeout=12) as resp:
            page_html = resp.read().decode("utf-8", errors="ignore")
            
        # 1. Extract H1
        h1_text = ""
        h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", page_html, re.DOTALL | re.IGNORECASE)
        if h1_match:
            clean_h1 = re.sub(r"<[^>]+>", "", h1_match.group(1))
            h1_text = html.unescape(clean_h1).strip()
            
        # 2. Extract Meta Title
        meta_title = ""
        title_match = re.search(r"<title[^>]*>(.*?)</title>", page_html, re.DOTALL | re.IGNORECASE)
        if title_match:
            clean_title = re.sub(r"<[^>]+>", "", title_match.group(1))
            meta_title = html.unescape(clean_title).strip()
            
        # 3. Extract Meta Description
        meta_desc = ""
        desc_patterns = [
            r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
            r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']',
            r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\']',
            r'<meta[^>]+content=["\'](.*?)["\'][^>]+property=["\']og:description["\']'
        ]
        for pat in desc_patterns:
            desc_match = re.search(pat, page_html, re.DOTALL | re.IGNORECASE)
            if desc_match:
                meta_desc = html.unescape(desc_match.group(1)).strip()
                break
                
        print(f"  [Live Page] Extracted H1: '{h1_text}'")
        return {
            "h1": h1_text,
            "meta_title": meta_title,
            "meta_description": meta_desc
        }
    except Exception as e:
        print(f"  [Warn] Failed to fetch live URL metadata from {url}: {e}")
        return {"h1": "", "meta_title": "", "meta_description": ""}

def classify_task_automatically(row_data):
    raw_title = str(row_data.get("title", "")).strip()
    clean_title = raw_title
    found_url = ""

    # Check full row dictionary if present
    full_dict = row_data.get("row_dict", {})
    if not full_dict:
        full_dict = row_data

    # 1. Scan EVERY column in the entire row for selectyouruniversity.com URL
    for col_key, col_val in full_dict.items():
        if col_val is None:
            continue
        val_str = str(col_val).strip()
        if not val_str or val_str.lower() == "nan":
            continue
        
        # Look for selectyouruniversity.com URL
        url_match = re.search(r"https?://(?:www\.)?selectyouruniversity\.com/[^\s,\"\']+", val_str)
        if url_match:
            found_url = url_match.group(0).rstrip(".,;\"'")
            break

    # 2. If title itself is or starts with a URL, clean the title
    url_in_title = re.search(r"https?://(?:www\.)?selectyouruniversity\.com/[^\s,\"\']+", raw_title)
    if url_in_title:
        if not found_url:
            found_url = url_in_title.group(0).rstrip(".,;\"'")
        clean_title = re.sub(r"^Existing URL[:\s-]*https?://[^\s]+", "", raw_title).strip()
        clean_title = clean_title.replace(found_url, "").strip(" -:,\t\r\n")

    # Check category from sheet
    raw_cat = str(row_data.get("category", "")).strip()
    if not raw_cat or raw_cat.lower() == "nan":
        for k, v in full_dict.items():
            if "category" in str(k).lower() and not str(k).lower().endswith(".1") and not str(k).lower().endswith(".2"):
                v_str = str(v).strip()
                if v_str and v_str.lower() != "nan":
                    raw_cat = v_str
                    break

    sheet_cat = ""
    if raw_cat:
        rc = raw_cat.lower()
        if "college" in rc or "institute" in rc or "university" in rc:
            sheet_cat = "colleges"
        elif "course" in rc or "program" in rc:
            sheet_cat = "courses"
        elif "exam" in rc:
            sheet_cat = "exams"
        elif "blog" in rc or "news" in rc:
            sheet_cat = "blogs"
        elif "country" in rc:
            sheet_cat = "countries"

    if found_url:
        # It's an UPDATION (existing) task!
        details = parse_url_details(found_url)
        cat = sheet_cat if sheet_cat else details["category"]
        
        # EXACT USER REQUIREMENT: Fetch live URL and copy H1, meta title, and meta description!
        live_meta = fetch_live_page_metadata(found_url)
        h1 = live_meta.get("h1") or clean_title or details["slug"].replace("-", " ").title()
        meta_title = live_meta.get("meta_title") or h1
        meta_description = live_meta.get("meta_description") or f"Get complete details regarding {h1} on SelectYourUniversity."

        if cat == "colleges":
            entity = details.get("entity_search") or (clean_title.split(" - [")[0].strip() if " - [" in clean_title else clean_title)
        elif cat == "courses":
            entity = clean_title or details.get("entity_search")
        elif cat == "exams":
            entity = details.get("entity_search") or detect_exam_entity(h1) or detect_exam_entity(clean_title) or clean_title
        else:
            entity = details.get("entity_search") or detect_exam_entity(h1) or detect_exam_entity(clean_title)

        return {
            "is_updation": True,
            "mode": "existing",
            "clean_title": h1,              # Title & Description will be H1 copied from live URL!
            "h1": h1,
            "meta_title": meta_title,       # Meta Title copied from live URL
            "meta_description": meta_description, # Meta Description copied from live URL
            "url": found_url,
            "category": cat,                # Colleges, Courses, Exams, Blogs
            "entity_search": entity,
            "course_id": details.get("course_id", ""),
            "sub_page": details.get("sub_page", "Overview"),
            "slug": details.get("slug", ""),
            "preserve_page_url": True,      # No change in page url for updation tasks!
        }
    else:
        # It's a BRAND NEW task!
        cat = sheet_cat if sheet_cat else "blogs"
        slug = re.sub(r"[^a-z0-9]+", "-", clean_title.lower()).strip("-")
        
        if cat == "colleges":
            detected_entity = clean_title.split(" - [")[0].strip() if " - [" in clean_title else clean_title
        elif cat == "courses":
            detected_entity = clean_title
        elif cat == "exams":
            detected_entity = detect_exam_entity(clean_title) or clean_title
        else:
            detected_entity = detect_exam_entity(clean_title)

        return {
            "is_updation": False,
            "mode": "new",
            "clean_title": clean_title,
            "h1": clean_title,
            "meta_title": clean_title,
            "meta_description": f"Get complete details regarding {clean_title} on SelectYourUniversity.",
            "url": "",
            "category": cat,                # Colleges, Courses, Exams, Blogs
            "entity_search": detected_entity,
            "sub_page": "Overview",
            "slug": slug,
            "preserve_page_url": False,
        }



