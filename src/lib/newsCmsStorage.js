/**
 * CollegeBundles News CMS Storage & State Engine
 * Provides dual-layer persistence: Supabase DB + Reactive LocalStorage with instant front-end sync.
 */

import { PRECONFIGURED_RSS_SOURCES } from './rssEngine';
import { newsArticles as seedArticles, breakingNewsTickerItems as seedTickers } from '../data/newsData';
import { supabase } from './supabaseClient';

const STORAGE_KEYS = {
  ARTICLES: 'cb_news_articles_v2',
  RSS_SOURCES: 'cb_news_rss_sources_v2',
  RSS_ITEMS: 'cb_news_rss_items_v2',
  TICKERS: 'cb_news_tickers_v2',
  AI_LOGS: 'cb_news_ai_logs_v2',
  SETTINGS: 'cb_news_automation_settings_v2',
};

export const DEFAULT_AUTOMATION_SETTINGS = {
  autoPublishMode: 'manual', // 'manual' | 'auto' | 'hybrid' (PAUSED per user request)
  isPublishingPaused: true,  // Master switch to prevent any automatic publishing
  minSeoScore: 75,
  publishDelayMinutes: 0,
  fetchIntervalMinutes: 30,
  maxArticlesPerFeed: 10,
  enableWebpConversion: true,
  imageQuality: 0.85,
  imageMaxWidth: 1200,
  timezone: 'Asia/Kolkata',
  aiProvider: 'CollegeBundles AI Editorial Engine',
};

// Dispatch custom event when articles or news update so website UI reacts instantly
export function dispatchNewsUpdateEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cb_news_updated', { detail: { timestamp: Date.now() } }));
  }
}

/**
 * 1. ARTICLES CRUD
 */
export function getAllArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('LocalStorage read error for articles:', e);
  }

  // Initial seed from newsData.js
  const initial = seedArticles.map((a) => ({
    ...a,
    status: 'published',
    seoScore: 92,
    seoStatus: 'Excellent',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initial));
  } catch (e) {
    // Ignore quota issues
  }
  return initial;
}

export function getPublishedArticles() {
  const all = getAllArticles();
  const now = new Date();

  return all
    .filter((a) => {
      if (a.status === 'published' || !a.status) return true;
      if (a.status === 'scheduled' && a.scheduledAt && new Date(a.scheduledAt) <= now) {
        // Auto transition to published
        a.status = 'published';
        a.publishedAt = a.scheduledAt;
        saveArticle(a);
        return true;
      }
      return false;
    })
    .sort((a, b) => new Date(b.publishedAt || b.createdAt || 0) - new Date(a.publishedAt || a.createdAt || 0));
}

export function saveArticle(article) {
  const all = getAllArticles();
  const index = all.findIndex((a) => a.id === article.id || (a.slug && a.slug === article.slug));

  const updatedArticle = {
    ...article,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    all[index] = { ...all[index], ...updatedArticle };
  } else {
    all.unshift(updatedArticle);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(all));
    dispatchNewsUpdateEvent();
  } catch (e) {
    console.warn('LocalStorage write error:', e);
  }

  // Background attempt to sync with Supabase
  try {
    supabase
      .from('news_articles')
      .upsert({
        id: updatedArticle.id,
        title: updatedArticle.title,
        slug: updatedArticle.slug,
        category: updatedArticle.category,
        category_slug: updatedArticle.categorySlug,
        meta_description: updatedArticle.metaDescription || updatedArticle.excerpt,
        content: updatedArticle.content,
        image_url: updatedArticle.image,
        image_alt: updatedArticle.imageAlt,
        author: updatedArticle.author,
        seo_score: updatedArticle.seoScore,
        status: updatedArticle.status,
        scheduled_at: updatedArticle.scheduledAt,
        published_at: updatedArticle.publishedAt,
        key_highlights: updatedArticle.keyHighlights || [],
        faqs: updatedArticle.faqs || [],
        dates_table: updatedArticle.datesTable || [],
        views: updatedArticle.views || '1.8K',
        read_time: updatedArticle.readTime || '3 min read',
        is_breaking: updatedArticle.isBreaking || false,
        is_trending: updatedArticle.isTrending ?? true,
        source_name: updatedArticle.sourceName || 'Editorial Desk',
        source_url: updatedArticle.sourceUrl || '',
        updated_at: updatedArticle.updatedAt,
      })
      .then(({ error }) => {
        if (error) console.info('Supabase news_articles table sync info:', error.message);
      });
  } catch (e) {
    // Ignore offline errors
  }

  return updatedArticle;
}

/**
 * Syncs cloud articles, tickers, and RSS feeds from Supabase into client storage
 */
export async function syncWithSupabaseCloud() {
  try {
    const { data: cloudArticles, error: artErr } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (!artErr && Array.isArray(cloudArticles) && cloudArticles.length > 0) {
      const mapped = cloudArticles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category,
        categorySlug: a.category_slug,
        metaTitle: a.meta_title,
        metaDescription: a.meta_description,
        excerpt: a.excerpt || a.meta_description,
        content: a.content,
        image: a.image_url,
        imageAlt: a.image_alt,
        author: a.author,
        seoScore: a.seo_score,
        status: a.status,
        scheduledAt: a.scheduled_at,
        publishedAt: a.published_at,
        keyHighlights: a.key_highlights || [],
        faqs: a.faqs || [],
        datesTable: a.dates_table || [],
        views: a.views || '2.1K',
        readTime: a.read_time || '3 min read',
        isBreaking: a.is_breaking,
        isTrending: a.is_trending,
        sourceName: a.source_name,
        sourceUrl: a.source_url,
      }));

      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(mapped));
      dispatchNewsUpdateEvent();
    }
  } catch (e) {
    console.warn('Supabase cloud articles sync fallback:', e);
  }
}

export function deleteArticle(articleId) {
  let all = getAllArticles();
  all = all.filter((a) => a.id !== articleId);
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(all));
    dispatchNewsUpdateEvent();
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  try {
    supabase.from('news_articles').delete().eq('id', articleId).then(() => {});
  } catch (e) {}

  return all;
}

/**
 * 2. RSS SOURCES CRUD
 */
export function getAllRssSources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RSS_SOURCES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  try {
    localStorage.setItem(STORAGE_KEYS.RSS_SOURCES, JSON.stringify(PRECONFIGURED_RSS_SOURCES));
  } catch (e) {}
  return PRECONFIGURED_RSS_SOURCES;
}

export function saveRssSource(source) {
  const sources = getAllRssSources();
  const index = sources.findIndex((s) => s.id === source.id);
  if (index >= 0) {
    sources[index] = { ...sources[index], ...source };
  } else {
    sources.push({
      ...source,
      id: source.id || `rss-src-${Date.now()}`,
      createdDate: new Date().toISOString(),
    });
  }
  localStorage.setItem(STORAGE_KEYS.RSS_SOURCES, JSON.stringify(sources));
  return sources;
}

export function deleteRssSource(sourceId) {
  const sources = getAllRssSources().filter((s) => s.id !== sourceId);
  localStorage.setItem(STORAGE_KEYS.RSS_SOURCES, JSON.stringify(sources));
  return sources;
}

/**
 * 3. RSS ITEMS
 */
export function getRssItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RSS_ITEMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

export function saveRssItems(newItems) {
  const existing = getRssItems();
  const existingGuids = new Set(existing.map((i) => i.guid));
  const toAdd = newItems.filter((i) => !existingGuids.has(i.guid));
  const combined = [...toAdd, ...existing].slice(0, 150); // keep last 150
  try {
    localStorage.setItem(STORAGE_KEYS.RSS_ITEMS, JSON.stringify(combined));
  } catch (e) {}
  return combined;
}

/**
 * 4. BREAKING NEWS TICKERS CRUD
 */
export function getAllTickers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TICKERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return seedTickers;
}

export function saveTicker(ticker) {
  const tickers = getAllTickers();
  const index = tickers.findIndex((t) => t.id === ticker.id);
  if (index >= 0) {
    tickers[index] = { ...tickers[index], ...ticker };
  } else {
    tickers.unshift({
      ...ticker,
      id: ticker.id || `ticker-${Date.now()}`,
      date: ticker.date || 'Just Now',
    });
  }
  localStorage.setItem(STORAGE_KEYS.TICKERS, JSON.stringify(tickers));
  dispatchNewsUpdateEvent();
  return tickers;
}

export function deleteTicker(tickerId) {
  const tickers = getAllTickers().filter((t) => t.id !== tickerId);
  localStorage.setItem(STORAGE_KEYS.TICKERS, JSON.stringify(tickers));
  dispatchNewsUpdateEvent();
  return tickers;
}

/**
 * 5. AI PROCESSING LOGS
 */
export function getAiLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_LOGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

export function addAiLog(log) {
  const logs = getAiLogs();
  logs.unshift({
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...log,
  });
  try {
    localStorage.setItem(STORAGE_KEYS.AI_LOGS, JSON.stringify(logs.slice(0, 80)));
  } catch (e) {}
}

/**
 * 6. AUTOMATION SETTINGS
 */
export function getAutomationSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return { ...DEFAULT_AUTOMATION_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {}
  return DEFAULT_AUTOMATION_SETTINGS;
}

export function saveAutomationSettings(settings) {
  const merged = { ...DEFAULT_AUTOMATION_SETTINGS, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
  return merged;
}

/**
 * 7. READY-TO-RUN SUPABASE SQL MIGRATION
 */
export function getSupabaseSqlSchema() {
  return `
-- ========================================================
-- CollegeBundles.in Live News & RSS Auto-Publishing Schema
-- Run this in your Supabase SQL Editor:
-- ========================================================

CREATE TABLE IF NOT EXISTS public.news_articles (
  id TEXT PRIMARY KEY,
  rss_item_id TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  image_alt TEXT,
  author TEXT,
  seo_score INTEGER DEFAULT 90,
  status TEXT DEFAULT 'published',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rss_sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rss_url TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  source_website TEXT,
  active BOOLEAN DEFAULT TRUE,
  fetch_interval INTEGER DEFAULT 30,
  last_fetched_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.breaking_news (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  text TEXT NOT NULL,
  date TEXT DEFAULT 'Live Now',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) setup
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Articles" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Public Read RSS" ON public.rss_sources FOR SELECT USING (true);
CREATE POLICY "Public Read Breaking News" ON public.breaking_news FOR SELECT USING (true);

-- Allow authenticated/anon insert & update
CREATE POLICY "Public Write Articles" ON public.news_articles FOR ALL USING (true);
CREATE POLICY "Public Write RSS" ON public.rss_sources FOR ALL USING (true);
CREATE POLICY "Public Write Breaking News" ON public.breaking_news FOR ALL USING (true);
  `.trim();
}
