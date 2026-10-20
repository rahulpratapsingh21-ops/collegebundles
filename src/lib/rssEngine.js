/**
 * CollegeBundles RSS Parser & Duplicate Detection Engine
 */

export const PRECONFIGURED_RSS_SOURCES = [
  {
    id: 'feed-med-1',
    name: 'Medical & NEET UG/PG Official Bulletin',
    rssUrl: 'https://news.google.com/rss/search?q=NEET+UG+MBBS+admissions+counselling&hl=en-IN&gl=IN&ceid=IN:en',
    category: 'Medical',
    categorySlug: 'medical',
    sourceWebsite: 'Google News / Medical Desk',
    active: true,
    fetchInterval: 30, // minutes
    priority: 1,
    defaultAuthor: 'Dr. Aarav Mehta, MD',
    language: 'en',
    lastFetchedAt: null,
    lastError: null,
  },
  {
    id: 'feed-eng-1',
    name: 'Engineering & JEE Main / JoSAA News',
    rssUrl: 'https://news.google.com/rss/search?q=JEE+Main+JoSAA+counselling+BTech+admissions&hl=en-IN&gl=IN&ceid=IN:en',
    category: 'Engineering',
    categorySlug: 'engineering',
    sourceWebsite: 'Engineering Desk',
    active: true,
    fetchInterval: 30,
    priority: 1,
    defaultAuthor: 'Er. Rohan Singhania',
    language: 'en',
    lastFetchedAt: null,
    lastError: null,
  },
  {
    id: 'feed-mgmt-1',
    name: 'Management & CAT / MBA Admissions Tracker',
    rssUrl: 'https://news.google.com/rss/search?q=CAT+exam+MBA+admissions+IIM+cutoffs&hl=en-IN&gl=IN&ceid=IN:en',
    category: 'Management',
    categorySlug: 'management',
    sourceWebsite: 'B-School Desk',
    active: true,
    fetchInterval: 60,
    priority: 2,
    defaultAuthor: 'Pooja Deshmukh, MBA',
    language: 'en',
    lastFetchedAt: null,
    lastError: null,
  },
  {
    id: 'feed-onl-1',
    name: 'Online Degrees & UGC-DEB Notifications',
    rssUrl: 'https://news.google.com/rss/search?q=UGC+DEB+online+degrees+distance+education+India&hl=en-IN&gl=IN&ceid=IN:en',
    category: 'Online',
    categorySlug: 'online',
    sourceWebsite: 'Higher Ed Gazette',
    active: true,
    fetchInterval: 60,
    priority: 2,
    defaultAuthor: 'Prof. Rajeshwari Sen',
    language: 'en',
    lastFetchedAt: null,
    lastError: null,
  },
];

/**
 * Calculates string similarity between two strings (0 to 1)
 */
export function calculateStringSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  const s1 = str1.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const s2 = str2.toLowerCase().replace(/[^\w\s]/g, '').trim();
  if (s1 === s2) return 1;

  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));
  const intersection = [...words1].filter((w) => words2.has(w)).length;
  const union = new Set([...words1, ...words2]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Checks if an incoming RSS item is a duplicate of any existing items or articles
 */
export function checkDuplicate(item, existingItems = [], existingArticles = []) {
  const normTitle = (item.title || '').trim().toLowerCase();
  const normUrl = (item.link || item.originalUrl || '').trim().toLowerCase();
  const guid = (item.guid || '').trim();

  // 1. Direct GUID check
  if (guid) {
    const guidMatch = existingItems.find((i) => i.guid && i.guid === guid);
    if (guidMatch) return { isDuplicate: true, reason: 'Duplicate RSS GUID', matchedItem: guidMatch };
  }

  // 2. Direct URL check
  if (normUrl) {
    const urlMatch = existingItems.find(
      (i) => (i.link || i.originalUrl || '').toLowerCase() === normUrl
    );
    if (urlMatch) return { isDuplicate: true, reason: 'Duplicate Source URL', matchedItem: urlMatch };

    const articleUrlMatch = existingArticles.find(
      (a) => (a.sourceUrl || a.originalUrl || '').toLowerCase() === normUrl
    );
    if (articleUrlMatch) return { isDuplicate: true, reason: 'Article already published for this URL', matchedItem: articleUrlMatch };
  }

  // 3. Normalized Title Similarity check (> 75%)
  for (const past of existingArticles) {
    const sim = calculateStringSimilarity(normTitle, past.title || '');
    if (sim >= 0.75) {
      return { isDuplicate: true, reason: `High Title Similarity (${Math.round(sim * 100)}%) with "${past.title}"`, matchedItem: past };
    }
  }

  for (const past of existingItems) {
    const sim = calculateStringSimilarity(normTitle, past.title || '');
    if (sim >= 0.8) {
      return { isDuplicate: true, reason: `Duplicate RSS Story (${Math.round(sim * 100)}% match)`, matchedItem: past };
    }
  }

  return { isDuplicate: false };
}

/**
 * Parses XML/RSS text into structured items
 */
export function parseRssXml(xmlText, source) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const items = [];

  const itemNodes = doc.querySelectorAll('item, entry');
  itemNodes.forEach((node, index) => {
    try {
      const title = node.querySelector('title')?.textContent?.trim() || 'Untitled Notification';
      
      // Link extraction (handles both RSS link and Atom link)
      let link = node.querySelector('link')?.textContent?.trim() || '';
      if (!link) {
        link = node.querySelector('link')?.getAttribute('href') || '';
      }

      const guid = node.querySelector('guid, id')?.textContent?.trim() || link || `${source.id}-${index}-${Date.now()}`;
      const pubDateStr = node.querySelector('pubDate, updated, published')?.textContent?.trim() || new Date().toISOString();
      const description = node.querySelector('description, summary')?.textContent?.trim() || '';
      const content = node.querySelector('content\\:encoded, content')?.textContent?.trim() || description;
      const author = node.querySelector('author, dc\\:creator')?.textContent?.trim() || source.defaultAuthor || 'Education Desk';

      // Image detection from media:content or enclosure or HTML inside description
      let image = null;
      const media = node.querySelector('media\\:content, enclosure[type*="image"]');
      if (media && media.getAttribute('url')) {
        image = media.getAttribute('url');
      } else {
        // Match <img> inside description
        const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          image = imgMatch[1];
        }
      }

      items.push({
        id: `rss-item-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        sourceId: source.id,
        sourceName: source.name,
        sourceWebsite: source.sourceWebsite,
        category: source.category,
        categorySlug: source.categorySlug,
        guid,
        title,
        link,
        pubDate: pubDateStr,
        description: cleanHtmlText(description),
        rawContent: cleanHtmlText(content),
        author,
        imageUrl: image,
        fetchedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Error parsing single RSS node:', e);
    }
  });

  return items;
}

/**
 * Removes dangerous tags and cleans HTML snippets
 */
function cleanHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .trim();
}

/**
 * Fetches RSS feed via CORS proxies or direct fetch
 */
export async function fetchRssFeed(source) {
  const urlsToTry = [
    // Standard CORS proxy 1: allorigins
    `https://api.allorigins.win/raw?url=${encodeURIComponent(source.rssUrl)}`,
    // Direct URL (works if CORS is enabled on source)
    source.rssUrl,
  ];

  let lastError = null;
  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/rss+xml, application/xml, text/xml' } });
      if (response.ok) {
        const text = await response.text();
        if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<xml') || text.includes('<channel'))) {
          const items = parseRssXml(text, source);
          return { success: true, items, error: null };
        }
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return {
    success: false,
    items: [],
    error: lastError || 'Failed to fetch or parse RSS feed through proxy.',
  };
}
