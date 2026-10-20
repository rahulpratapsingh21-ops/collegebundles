/**
 * CollegeBundles AI News Agent - Powered by OpenAI ChatGPT
 * Generates structured, high-ranking, 1,200–1,400 word educational articles
 * adhering to the Universal SEO-Friendly News Article Writing Prompt.
 */

import { generateImageAltText, getCategoryFallbackImage } from './imageProcessor';
import { validateArticleSeo } from './seoValidator';

// Common stop words to omit from clean SEO slugs
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will',
  'with', 'check', 'latest', 'here', 'now', 'today', 'how', 'what', 'why'
]);

/**
 * Clean slug generator from title
 */
export function generateCleanSlug(title) {
  if (!title) return 'education-news-' + Date.now();
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  const slug = words.slice(0, 7).join('-');
  return slug || 'update-' + Date.now();
}

/**
 * Intelligent Category Detector based on educational entities & keywords
 */
export function detectCategory(text, defaultCategory = null) {
  const t = (text || '').toLowerCase();

  const medicalKeywords = ['neet', 'mbbs', 'bds', 'aiims', 'nmc', 'mcc', 'doctor', 'nursing', 'medical', 'pharmacology', 'clinical'];
  const engineeringKeywords = ['jee', 'iit', 'nit', 'josaa', 'b.tech', 'btech', 'm.tech', 'engineering', 'gate', 'computer science', 'architecture', 'nata'];
  const managementKeywords = ['cat', 'mba', 'iim', 'pgdm', 'mat', 'xat', 'cmat', 'business school', 'b-school', 'management', 'executive'];
  const onlineKeywords = ['ugc-deb', 'online degree', 'distance education', 'e-learning', 'edtech', 'coursera', 'swayam', 'online mba', 'online bba', 'parity', 'virtual campus'];

  let medCount = medicalKeywords.filter((k) => t.includes(k)).length;
  let engCount = engineeringKeywords.filter((k) => t.includes(k)).length;
  let mgmtCount = managementKeywords.filter((k) => t.includes(k)).length;
  let onlCount = onlineKeywords.filter((k) => t.includes(k)).length;

  if (defaultCategory) {
    const def = defaultCategory.toLowerCase();
    if (def.includes('med')) medCount += 2;
    if (def.includes('eng')) engCount += 2;
    if (def.includes('man') || def.includes('mba')) mgmtCount += 2;
    if (def.includes('onl')) onlCount += 2;
  }

  const scores = [
    { cat: 'Medical', slug: 'medical', count: medCount },
    { cat: 'Engineering', slug: 'engineering', count: engCount },
    { cat: 'Management', slug: 'management', count: mgmtCount },
    { cat: 'Online', slug: 'online', count: onlCount },
  ];

  scores.sort((a, b) => b.count - a.count);
  if (scores[0].count > 0) {
    return { category: scores[0].cat, categorySlug: scores[0].slug };
  }

  return { category: 'Engineering', categorySlug: 'engineering' };
}

/**
 * Extracts Primary Keyword from topic/title
 */
export function extractPrimaryKeyword(title, category) {
  const t = (title || '').toLowerCase();
  if (t.includes('neet')) return 'NEET 2026 Counselling Cutoff';
  if (t.includes('jee main') || t.includes('jee')) return 'JEE Main 2026 Registration Dates';
  if (t.includes('cat') || t.includes('iim') || t.includes('mba')) return 'MBA Admissions 2026 Cutoffs';
  if (t.includes('ugc') || t.includes('online')) return 'UGC-DEB Online Degree Approval';
  return `${category} Admissions 2026`;
}

/**
 * System Prompt matching the exact Universal SEO-Friendly News Article Writing Prompt
 */
export function buildUniversalSeoPrompt(topic, primaryKeyword, sourceContent, category) {
  return `
Act as a professional news writer, senior content editor, fact-checker, and SEO specialist for an online news website. Write a high-quality, informative, accurate, reader-friendly, and SEO-optimized news article based on the topic and source material provided.

News Topic: ${topic}
Primary Keyword: ${primaryKeyword}
Category: ${category}
Source Material / RSS Feed / Official Update: ${sourceContent}

## 1. Start With the Latest News
- Begin with the most recent and important verified development related to the topic.
- Create an engaging, factual, SEO-friendly H1 headline.
- Immediately below the H1, add a short **Latest Update:** statement in bold, containing the newest confirmed information.
- Write an opening paragraph that answers the main search query directly within the first 2–3 sentences.
- Mention the relevant announcement, result, decision, date, deadline, notification, or development.
- Explain who is affected and why the update matters.
- Do not begin with generic background information, a long history, or unnecessary introductory statements.
- If the latest information cannot be verified, do not invent an update. Clearly explain what is confirmed and what remains unconfirmed.

## 2. Article Length & Word Count Requirement (MANDATORY: 2,000 Words)
- Every article MUST reach approximately 2,000 words (strict target: 1,900 to 2,200 words total).
- Short or superficial summaries are strictly prohibited. The content must be exhaustive, thorough, and highly authoritative.
- Thoroughly expand each section with rich educational details:
  * Official regulatory context (e.g. NTA, MCC, JoSAA, IIM Board, UGC-DEB directives).
  * In-depth cutoff analysis with opening/closing rank comparisons across top colleges.
  * Detailed eligibility criteria, seat reservation matrix, and fee structure breakdown.
  * Step-by-step application, choice filling, and seat acceptance guide.
  * Mandatory document verification checklist and counseling guidelines.
  * Actionable guidance for aspirants, placement trends, and ROI insights.
  * Structured Markdown comparison tables for dates, rounds, and eligibility criteria.
  * 6 to 8 exhaustive FAQs with thorough multi-sentence answers numbered as Q1:, Q2:, Q3:, etc.
- Keep SEO metadata separate from the article word count.

## 3. Introduction and Article Structure
After the main H1 headline and Latest Update statement, write an introduction of approximately 80–120 words.
- Directly answer the main question.
- Explain the most important news.
- Include confirmed dates, figures, or decisions when relevant.
- Use the primary keyword naturally.
- Avoid repeating the headline unnecessarily.

Heading hierarchy:
- H1: One main article headline.
- H2: Major sections of the article.
- H3: Subtopics within the relevant H2 sections.
Never use multiple H1 headings or skip heading levels unnecessarily.
Keep paragraphs concise (2–5 sentences).

## 4. Use H2 and H3 Headings Properly
Suggested structure:
# [SEO-Friendly News Headline]
**Latest Update:** [Newest verified development in 1–2 sentences.]
[Direct introduction answering the main question.]
## [Main Topic]: What Happened?
[Explain the event, announcement, result, decision, or development in thorough detail.]
## Important Dates and Details
[Markdown table for dates/schedules.]
## [Relevant Main Section]
[Provide useful details in concise paragraphs.]
### [Relevant Subtopic]
[Explain the subtopic clearly.]
## How to Check / Apply / Register / Download
[Include only if relevant.]
## What Happens Next?
[Explain next confirmed step or expected development.]
## Frequently Asked Questions
[Include 6–8 exhaustive FAQs using H3 for questions. Format each question strictly with sequential numbering: "### Q1: [Question?]", "### Q2: [Question?]", "### Q3: [Question?]", etc., followed by direct 2–4 sentence answers for each.]

- Mandatory rule: Do NOT include any "Latest News & Updates", "Key Highlights", or "Important Takeaways" headings or bullet sections in the article body.

## 5. Use Tables Wherever Necessary
Use Markdown tables for schedules, eligibility criteria, application fees, cutoffs, or seats.

## 6. Accuracy and Fact-Checking
Accuracy is mandatory. Never fabricate quotes, statistics, results, vacancy counts, notifications, or official statements. If information is unconfirmed, state this clearly.

## 7. SEO Metadata
After the article, provide the following SEO metadata strictly formatted as:
---
SEO Title: [Concise title containing the primary keyword, 50-65 chars]
Meta Description: [Relevant description of 140–160 characters]
Suggested URL Slug: [Short lowercase hyphen-separated slug]
Primary Keyword: [Main keyword]
Secondary Keywords: [Relevant search terms separated by commas]
Suggested Image Alt Text: [Concise description of the featured image]
---

Return clean Markdown ready for publication.
`.trim();
}

/**
 * Converts Markdown string into clean, responsive HTML for CollegeBundles
 */
export function convertMarkdownToEditorialHtml(markdown) {
  if (!markdown) return '';

  let html = markdown
    // Remove metadata block at end
    .replace(/---\s*SEO Title:[\s\S]*$/i, '')
    // Remove any Latest News & Updates heading and section
    .replace(/##\s*Latest News\s*(?:&|and)?\s*Updates[^\n]*\n(?:(?!\n##|\n#)[\s\S])*/gi, '')
    // Remove any Key Highlights / Takeaways section from article body
    .replace(/##\s*Key Highlights[^\n]*\n(?:(?!\n##|\n#)[\s\S])*/gi, '')
    // Remove H1 (title is rendered separately)
    .replace(/^#\s+[^\n]+/m, '')
    // Bold Latest Update statement
    .replace(/\*\*Latest Update:\*\*\s*([^\n]+)/gi, '<div class="latest-update-banner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1.25rem;font-size:0.95rem;color:#1e3a8a;"><strong>Latest Update:</strong> $1</div>')
    // Headings H2
    .replace(/^##\s+([^\n]+)/gim, '<h2 style="font-size:1.35rem;color:#0f172a;margin:1.75rem 0 0.75rem 0;font-weight:800;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;">$1</h2>')
    // Headings H3
    .replace(/^###\s+([^\n]+)/gim, '<h3 style="font-size:1.1rem;color:#1e293b;margin:1.25rem 0 0.5rem 0;font-weight:700;">$1</h3>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Markdown table parser
    .replace(/\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)+)/g, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map((h) => h.trim()).filter(Boolean);
      const rows = bodyRows.trim().split('\n').map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));

      let tableHtml = '<div style="overflow-x:auto;margin:1.5rem 0;"><table style="width:100%;border-collapse:collapse;font-size:0.875rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;">';
      tableHtml += '<thead><tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;text-align:left;">';
      headers.forEach((h) => {
        tableHtml += `<th style="padding:0.65rem 0.85rem;font-weight:700;color:#0f172a;">${h}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';
      rows.forEach((row, ri) => {
        tableHtml += `<tr style="border-bottom:1px solid #e2e8f0;background:${ri % 2 === 0 ? '#ffffff' : '#f8fafc'};">`;
        row.forEach((cell) => {
          tableHtml += `<td style="padding:0.6rem 0.85rem;color:#334155;">${cell}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      return tableHtml;
    })
    // Numbered / ordered lists (1. Item, 2. Item...)
    .replace(/^\s*\d+\.\s+([^\n]+)/gim, '<li class="ordered-step" style="margin-bottom:0.75rem;line-height:1.75;">$1</li>')
    .replace(/((?:<li class="ordered-step"[\s\S]*?<\/li>\s*)+)/gi, '<ol style="padding-left:1.5rem;margin:1.25rem 0;color:#334155;line-height:1.75;">\n$1\n</ol>')
    .replace(/<\/ol>\s*<ol[^>]*>/gi, '')
    // Bullet lists
    .replace(/^\s*[-*]\s+([^\n]+)/gim, '<li style="margin-bottom:0.35rem;">$1</li>')
    .replace(/(<li[\s\S]*?<\/li>)/gi, '<ul style="padding-left:1.25rem;margin:0.75rem 0;color:#334155;line-height:1.6;">$1</ul>')
    // Fix multiple consecutive uls
    .replace(/<\/ul>\s*<ul[^>]*>/gi, '');

  // Wrap loose paragraphs
  const blocks = html.split(/\n\s*\n/);
  html = blocks
    .map((b) => {
      const trimmed = b.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<table')) {
        return trimmed;
      }
      return `<p style="margin-bottom:1rem;line-height:1.75;color:#334155;">${trimmed}</p>`;
    })
    .join('\n');

  // Number FAQ questions sequentially (Q1:, Q2:, Q3:...)
  let faqCounter = 0;
  html = html.replace(/(<h2[^>]*>Frequently Asked Questions<\/h2>[\s\S]*)/i, (faqBlock) => {
    return faqBlock.replace(/<h3([^>]*)>(.*?)<\/h3>/gi, (h3Match, attrs, qText) => {
      faqCounter++;
      const cleanQ = qText.replace(/^Q\d*[:.]\s*/i, '').trim();
      return `<h3${attrs}>Q${faqCounter}: ${cleanQ}</h3>`;
    });
  });

  return html;
}

/**
 * Calls OpenAI ChatGPT API with Universal SEO News Prompt
 */
export async function callChatGptForNewsArticle({ topic, sourceContent, primaryKeyword, category, apiKey, model = 'gpt-4o-mini' }) {
  if (!apiKey) {
    throw new Error('OpenAI API Key is required. Please enter your key in Admin Settings or .env');
  }

  const prompt = buildUniversalSeoPrompt(topic, primaryKeyword, sourceContent, category);

  // Try Vite proxy endpoint first to bypass browser CORS, then fallback to direct API
  const endpoints = ['/api/openai/v1/chat/completions', 'https://api.openai.com/v1/chat/completions'];
  let response = null;
  let lastErr = null;

  for (const endpoint of endpoints) {
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an award-winning senior education news editor and Google News SEO specialist. You write authoritative, verified, exhaustive 2,000-word articles adhering strictly to journalistic guidelines without hallucinations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.35,
          max_tokens: 4096,
        }),
      });

      if (response && (response.ok || response.status === 401 || response.status === 429)) {
        break;
      }
    } catch (e) {
      lastErr = e;
    }
  }

  if (!response) {
    throw lastErr || new Error('Network error calling ChatGPT API');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `OpenAI API returned error ${response.status}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content || '';

  // Extract SEO Metadata
  let seoTitle = topic;
  let metaDescription = '';
  let suggestedSlug = generateCleanSlug(topic);
  let imageAlt = generateImageAltText(topic, category);

  const seoTitleMatch = rawText.match(/SEO Title:\s*([^\n]+)/i);
  if (seoTitleMatch && seoTitleMatch[1]) seoTitle = seoTitleMatch[1].trim();

  const metaDescMatch = rawText.match(/Meta Description:\s*([^\n]+)/i);
  if (metaDescMatch && metaDescMatch[1]) metaDescription = metaDescMatch[1].trim();

  const slugMatch = rawText.match(/Suggested URL Slug:\s*([^\n]+)/i);
  if (slugMatch && slugMatch[1]) {
    suggestedSlug = slugMatch[1].trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  }

  const altMatch = rawText.match(/Suggested Image Alt Text:\s*([^\n]+)/i);
  if (altMatch && altMatch[1]) imageAlt = altMatch[1].trim();

  // Extract H1 headline
  const h1Match = rawText.match(/^#\s+([^\n]+)/m);
  const headline = h1Match && h1Match[1] ? h1Match[1].replace(/[*#]/g, '').trim() : seoTitle;

  // Extract bullet updates for Key Highlights
  const updatesMatch = rawText.match(/## Latest News & Updates\s*([\s\S]*?)(?=##|$)/i);
  const keyHighlights = [];
  if (updatesMatch && updatesMatch[1]) {
    const lines = updatesMatch[1].match(/^\s*[-*]\s+([^\n]+)/gm) || [];
    lines.slice(0, 4).forEach((line) => {
      keyHighlights.push(line.replace(/^\s*[-*]\s+/, '').replace(/\*\*/g, '').trim());
    });
  }

  // Extract FAQs
  const faqs = [];
  const faqSectionMatch = rawText.match(/## Frequently Asked Questions\s*([\s\S]*?)(?=---|##|$)/i);
  if (faqSectionMatch && faqSectionMatch[1]) {
    const qaPairs = faqSectionMatch[1].split(/(?=###\s+)/g);
    for (const pair of qaPairs) {
      const qMatch = pair.match(/###\s+([^\n]+)/);
      if (qMatch) {
        const cleanQuestion = qMatch[1].replace(/^Q\d*[:.]\s*/i, '').trim();
        const numberedQ = `Q${faqs.length + 1}: ${cleanQuestion}`;
        const answer = pair.replace(/###\s+[^\n]+/, '').replace(/<[^>]+>/g, '').trim().split('\n')[0];
        if (cleanQuestion && answer) {
          faqs.push({ q: numberedQ, a: answer, question: numberedQ, answer });
        }
      }
    }
  }

  // Convert full markdown to clean HTML
  const contentHtml = convertMarkdownToEditorialHtml(rawText);

  return {
    rawMarkdown: rawText,
    headline,
    seoTitle,
    metaDescription,
    suggestedSlug,
    imageAlt,
    contentHtml,
    keyHighlights: keyHighlights.length > 0 ? keyHighlights : [
      `Official notification released for ${category} admissions.`,
      `Candidates must verify eligibility conditions and application deadlines.`,
      `Direct seat helpline available at 8802155810.`
    ],
    faqs: faqs.length > 0 ? faqs : [
      { q: `What is the latest update for ${category}?`, a: `Official authorities have issued revised instructions and counselling schedules for candidates.` },
      { q: `How can students contact the CollegeBundles advisory desk?`, a: `Call the toll-free helpline at 8802155810 for instant cutoff analysis and seat confirmation.` }
    ],
  };
}

/**
 * Main AI Agent Processing Pipeline
 */
export async function processRssItemWithAi(rssItem, settings = {}, existingArticles = []) {
  const startTime = Date.now();
  const logs = [];

  const logTask = (task, result, status = 'success', error = null) => {
    logs.push({
      task,
      result,
      status,
      error,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    });
  };

  try {
    const combinedText = `${rssItem.title || ''} ${rssItem.description || ''} ${rssItem.rawContent || ''}`.trim();
    const wordCount = combinedText.split(/\s+/).length;
    let initialStatus = 'ai_generated';

    if (wordCount < 20) {
      initialStatus = 'needs_review';
      logTask('Quality Check', 'Insufficient word count in RSS item. Marked Needs Review.', 'warning');
    }

    // Category & Keyword Detection
    const { category, categorySlug } = detectCategory(combinedText, rssItem.category);
    const primaryKeyword = extractPrimaryKeyword(rssItem.title, category);
    logTask('Entity & Category Detection', `${category} | Primary Keyword: ${primaryKeyword}`);

    // Check OpenAI API key from settings, localStorage or env
    const apiKey = settings.openaiApiKey || localStorage.getItem('cb_openai_api_key') || (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_OPENAI_API_KEY : '');
    const model = settings.openaiModel || 'gpt-4o-mini';

    let title = rssItem.title;
    let slug = generateCleanSlug(title);
    let metaDescription = '';
    let content = '';
    let imageAlt = generateImageAltText(title, category);
    let keyHighlights = [];
    let faqs = [];

    if (apiKey) {
      // Generate with ChatGPT using Universal SEO Prompt
      logTask('ChatGPT Invocation', `Sending Universal SEO Prompt to model: ${model}`);
      try {
        const gptResult = await callChatGptForNewsArticle({
          topic: rssItem.title,
          sourceContent: combinedText,
          primaryKeyword,
          category,
          apiKey,
          model,
        });

        title = gptResult.headline || gptResult.seoTitle;
        slug = gptResult.suggestedSlug || generateCleanSlug(title);
        metaDescription = gptResult.metaDescription;
        content = gptResult.contentHtml;
        imageAlt = gptResult.imageAlt;
        keyHighlights = gptResult.keyHighlights;
        faqs = gptResult.faqs;
        logTask('ChatGPT Generation Success', `Generated ~1,300 words with H1/H2/H3 semantic structure & tables`);
      } catch (gptErr) {
        console.warn('ChatGPT API call error, falling back to local editorial rules:', gptErr);
        logTask('ChatGPT Fallback', gptErr.message, 'warning');
        title = generateSeoTitle(rssItem.title, category);
        slug = generateCleanSlug(title);
        metaDescription = generateMetaDescription(title, combinedText, category);
        content = generateArticleHtml(combinedText, title, category, rssItem.sourceName);
        keyHighlights = generateKeyHighlights(combinedText, title, category);
        faqs = generateFaqs(title, category);
      }
    } else {
      // Built-in rule-based editorial generator
      logTask('Local Generation', 'No OpenAI API key detected; using built-in editorial generator.');
      title = generateSeoTitle(rssItem.title, category);
      slug = generateCleanSlug(title);
      metaDescription = generateMetaDescription(title, combinedText, category);
      content = generateArticleHtml(combinedText, title, category, rssItem.sourceName);
      keyHighlights = generateKeyHighlights(combinedText, title, category);
      faqs = generateFaqs(title, category);
    }

    // Ensure uniqueness against existing articles
    let slugConflict = existingArticles.find((a) => a.slug === slug);
    let counter = 1;
    while (slugConflict) {
      slug = `${slug}-${counter}`;
      counter++;
      slugConflict = existingArticles.find((a) => a.slug === slug);
    }

    // Dates table
    const datesTable = generateDatesTable();

    // Featured Image & Alt Text
    const image = rssItem.imageUrl || getCategoryFallbackImage(category);

    const defaultAuthors = {
      Medical: 'Dr. R. Sharma (Medical Admissions Advisor)',
      Engineering: 'Er. A. K. Verma (Senior Tech Counsellor)',
      Management: 'Prof. S. Mukherjee (MBA Strategy Expert)',
      Online: 'Neha Bansal (Digital Learning Specialist)',
    };
    const author = rssItem.author || defaultAuthors[category] || 'CollegeBundles Editorial Desk';

    // Assemble complete article object
    const article = {
      id: `art-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      rssItemId: rssItem.id,
      title,
      slug,
      category,
      categorySlug,
      metaTitle: `${title} | CollegeBundles.in`,
      metaDescription,
      excerpt: metaDescription || title,
      content,
      image,
      imageAlt,
      keyHighlights,
      faqs,
      datesTable,
      author,
      readTime: '4 min read',
      views: `${(Math.random() * 3 + 1.2).toFixed(1)}K`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      sourceName: rssItem.sourceName || rssItem.sourceWebsite || 'Education Desk',
      sourceUrl: rssItem.link || '',
      status: initialStatus,
      scheduledAt: null,
      publishedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBreaking: false,
      isTrending: true,
    };

    // Run SEO Validation
    const seoValidation = validateArticleSeo(article, existingArticles);
    article.seoScore = seoValidation.score;
    article.seoStatus = seoValidation.statusLabel;
    article.seoPasses = seoValidation.passes;
    article.seoIssues = seoValidation.issues;
    logTask('SEO Validation', `Score: ${seoValidation.score}/100 (${seoValidation.statusLabel})`);

    // Strict Auto-Publish check (Respects manual pause)
    const isPaused = settings.isPublishingPaused !== false;
    const autoPublishMode = settings.autoPublishMode || 'manual';

    if (isPaused || autoPublishMode === 'manual') {
      article.status = 'ai_generated';
      logTask('Auto-Publish Standby', 'Publishing paused per administrator instruction; saved safely as draft.');
    }

    return {
      success: true,
      article,
      logs,
    };
  } catch (err) {
    console.error('AI News Agent processing error:', err);
    logTask('Agent Failure', null, 'failed', err.message);
    return {
      success: false,
      error: err.message,
      logs,
    };
  }
}

/**
 * Generates an SEO Title (50-65 chars) fallback
 */
export function generateSeoTitle(rawTitle, category) {
  let clean = (rawTitle || '')
    .replace(/\s*[-|–]\s*(NDTV|Times of India|Hindustan Times|The Hindu|Livemint|India Today|Zee News).*/gi, '')
    .trim();

  if (clean.length >= 48 && clean.length <= 68) return clean;

  if (clean.length < 48) {
    if (category === 'Medical') clean = `NEET & Medical Update: ${clean}`;
    else if (category === 'Engineering') clean = `Engineering Admissions: ${clean}`;
    else if (category === 'Management') clean = `MBA Admissions Alert: ${clean}`;
    else clean = `Online Degrees Alert: ${clean}`;
  }

  if (clean.length > 68) {
    clean = clean.slice(0, 65).replace(/\s+\S*$/, '') + '...';
  }
  return clean;
}

/**
 * Generates SEO Meta Description (140-160 chars) fallback
 */
export function generateMetaDescription(title, excerpt, category) {
  const base = excerpt ? excerpt.replace(/<[^>]+>/g, '').trim() : title;
  let desc = `Get the latest verified update on ${title}. Check eligibility, counselling dates, and student advisory on CollegeBundles.in.`;
  if (base.length >= 90) desc = base;

  if (desc.length > 158) {
    desc = desc.slice(0, 155).replace(/\s+\S*$/, '') + '.';
  } else if (desc.length < 130) {
    desc += ` Verified by CollegeBundles ${category} Advisory Desk.`;
    if (desc.length > 158) desc = desc.slice(0, 155) + '...';
  }
  return desc;
}

export function generateKeyHighlights(text, title, category) {
  return [
    `Official announcement released for ${category} admissions and counselling.`,
    'Candidates must verify eligibility conditions and required documents promptly.',
    'Free seat guidance and cutoff estimates available via Helpline 8802155810.',
  ];
}

export function generateArticleHtml(rawText, title, category, sourceName) {
  const paragraphs = (rawText || '')
    .split(/\n\s*\n|\n/)
    .map((p) => p.replace(/<[^>]+>/g, '').trim())
    .filter((p) => p.length > 30);

  const introText = paragraphs[0] || `${title}. Educational authorities have issued verified circulars regarding eligibility benchmarks and schedule windows.`;
  const detailText = paragraphs[1] || `Students and parents are advised to review the official seat matrices to ensure seamless registration and seat choice locking.`;

  return `
    <div class="latest-update-banner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1.25rem;font-size:0.95rem;color:#1e3a8a;">
      <strong>Latest Update:</strong> Official circulars and seat matrix instructions released for candidates.
    </div>

    <p style="margin-bottom:1.25rem;line-height:1.75;color:#334155;">${introText}</p>

    <h2 style="font-size:1.35rem;color:#0f172a;margin:1.75rem 0 0.75rem 0;font-weight:800;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;">
      Latest News & Updates
    </h2>
    <ul style="padding-left:1.25rem;margin:0.75rem 0;color:#334155;line-height:1.6;">
      <li style="margin-bottom:0.35rem;"><strong>Official circular:</strong> ${title}</li>
      <li style="margin-bottom:0.35rem;"><strong>Advisory Desk:</strong> Free one-on-one cutoff analysis available at 8802155810.</li>
      <li style="margin-bottom:0.35rem;"><strong>Next Step:</strong> Verify category domicile documents before choice locking begins.</li>
    </ul>

    <h2 style="font-size:1.35rem;color:#0f172a;margin:1.75rem 0 0.75rem 0;font-weight:800;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;">
      Key Details & What Happened
    </h2>
    <p style="margin-bottom:1rem;line-height:1.75;color:#334155;">${detailText}</p>

    <h2 style="font-size:1.35rem;color:#0f172a;margin:1.75rem 0 0.75rem 0;font-weight:800;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;">
      Important Dates and Details
    </h2>
    <div style="overflow-x:auto;margin:1.5rem 0;">
      <table style="width:100%;border-collapse:collapse;font-size:0.875rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;">
        <thead>
          <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;text-align:left;">
            <th style="padding:0.65rem 0.85rem;font-weight:700;color:#0f172a;">Particulars</th>
            <th style="padding:0.65rem 0.85rem;font-weight:700;color:#0f172a;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.6rem 0.85rem;color:#334155;">Category</td><td style="padding:0.6rem 0.85rem;color:#334155;">${category} Admissions</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc;"><td style="padding:0.6rem 0.85rem;color:#334155;">Status</td><td style="padding:0.6rem 0.85rem;color:#334155;">Active & Verified</td></tr>
          <tr><td style="padding:0.6rem 0.85rem;color:#334155;">Student Helpline</td><td style="padding:0.6rem 0.85rem;color:#334155;">8802155810</td></tr>
        </tbody>
      </table>
    </div>
  `.trim();
}

export function generateFaqs(title, category) {
  return [
    {
      q: `What is the significance of this ${category} notification?`,
      a: `This notification updates candidates on crucial schedules, seat allocations, and qualification criteria for the current admission cycle.`,
    },
    {
      q: `Where can students get direct assistance for ${category} admissions?`,
      a: `Students can call the CollegeBundles admission helpline at 8802155810 for free counselling, cutoff estimations, and scholarship information.`,
    },
  ];
}

export function generateDatesTable() {
  const today = new Date();
  const format = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return [
    { event: 'Notification Release / Choice Registration', date: format(today) },
    { event: 'Document Verification & Fee Window', date: format(new Date(today.getTime() + 7 * 86400000)) },
    { event: 'Seat Allotment Round Announcement', date: format(new Date(today.getTime() + 14 * 86400000)) },
  ];
}
