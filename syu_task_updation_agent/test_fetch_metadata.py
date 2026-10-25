import urllib.request
import re
import html

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
                
        return {
            "h1": h1_text,
            "meta_title": meta_title,
            "meta_description": meta_desc
        }
    except Exception as e:
        print(f"  [Warn] Failed to fetch live URL metadata from {url}: {e}")
        return {"h1": "", "meta_title": "", "meta_description": ""}

if __name__ == "__main__":
    blog_url = "https://www.selectyouruniversity.com/blog/viteee-registration"
    exam_url = "https://www.selectyouruniversity.com/exam/cbse-10th-board-eid-304/past-question-papers"
    
    print("Fetching Blog URL Metadata:")
    print(fetch_live_page_metadata(blog_url))
    
    print("\nFetching Exam URL Metadata:")
    print(fetch_live_page_metadata(exam_url))
