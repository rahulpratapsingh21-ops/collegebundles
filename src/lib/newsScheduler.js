/**
 * CollegeBundles Background Automation Scheduler
 * Runs independent background jobs for RSS ingestion, AI processing, duplicate checking, and auto-publishing.
 */

import { getAllRssSources, getRssItems, saveRssItems, getAllArticles, saveArticle, getAutomationSettings, addAiLog } from './newsCmsStorage';
import { fetchRssFeed, checkDuplicate } from './rssEngine';
import { processRssItemWithAi } from './aiNewsAgent';

let schedulerInterval = null;
let isJobRunning = false;

/**
 * Executes a single pass of the automation cycle
 */
export async function runAutomationCycle() {
  if (isJobRunning) return { skipped: true, reason: 'Previous job still running' };
  isJobRunning = true;

  const results = {
    scheduledPublishedCount: 0,
    rssFetchedCount: 0,
    newArticlesGenerated: 0,
    errors: [],
  };

  try {
    const settings = getAutomationSettings();
    const existingArticles = getAllArticles();
    const now = new Date();

    // ==========================================
    // TASK 1: Check and Publish Scheduled Articles
    // ==========================================
    for (const article of existingArticles) {
      if (article.status === 'scheduled' && article.scheduledAt) {
        const scheduledTime = new Date(article.scheduledAt);
        if (scheduledTime <= now) {
          article.status = 'published';
          article.publishedAt = now.toISOString();
          saveArticle(article);
          results.scheduledPublishedCount++;
          addAiLog({
            task: 'Auto-Publish Scheduled Article',
            inputReference: article.title,
            result: `Article published live: ${article.slug}`,
            status: 'success',
          });
        }
      }
    }

    // ==========================================
    // TASK 2: Ingest Active RSS Feeds
    // ==========================================
    const sources = getAllRssSources().filter((s) => s.active);
    const existingRssItems = getRssItems();

    for (const source of sources) {
      try {
        const fetchRes = await fetchRssFeed(source);
        if (fetchRes.success && fetchRes.items.length > 0) {
          const freshItems = [];
          for (const rawItem of fetchRes.items) {
            const dupCheck = checkDuplicate(rawItem, existingRssItems, existingArticles);
            if (!dupCheck.isDuplicate) {
              freshItems.push(rawItem);
            }
          }

          if (freshItems.length > 0) {
            saveRssItems(freshItems);
            results.rssFetchedCount += freshItems.length;

            // In Auto or Hybrid mode, automatically process fresh items through AI Agent
            if (settings.autoPublishMode === 'auto' || settings.autoPublishMode === 'hybrid') {
              for (const item of freshItems.slice(0, 3)) { // process top 3 to avoid throttling
                const aiResult = await processRssItemWithAi(item, settings, existingArticles);
                if (aiResult.success && aiResult.article) {
                  saveArticle(aiResult.article);
                  results.newArticlesGenerated++;
                  addAiLog({
                    task: 'AI Auto-Processing Ingested Item',
                    inputReference: item.title,
                    result: `Generated article with status: ${aiResult.article.status} (SEO: ${aiResult.article.seoScore})`,
                    status: 'success',
                  });
                }
              }
            }
          }
        }
      } catch (err) {
        results.errors.push(`Feed ${source.name} error: ${err.message}`);
      }
    }
  } catch (globalErr) {
    results.errors.push(globalErr.message);
  } finally {
    isJobRunning = false;
  }

  return results;
}

/**
 * Starts background heartbeat timer (runs every 60 seconds)
 */
export function startNewsScheduler(intervalSeconds = 60) {
  if (schedulerInterval) clearInterval(schedulerInterval);
  // Run once immediately
  runAutomationCycle().catch(console.warn);
  schedulerInterval = setInterval(() => {
    runAutomationCycle().catch(console.warn);
  }, intervalSeconds * 1000);
}

export function stopNewsScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}
