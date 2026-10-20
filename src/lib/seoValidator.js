/**
 * CollegeBundles SEO Validation Engine
 * Evaluates articles against standard Google News & Educational SEO guidelines.
 */

export function validateArticleSeo(article, existingArticles = []) {
  const issues = [];
  const passes = [];
  let score = 100;

  // 1. Title Checks
  const title = (article.title || '').trim();
  if (!title) {
    issues.push({ id: 'title_missing', text: 'Article title is missing.', penalty: 30 });
  } else {
    if (title.length < 35) {
      issues.push({ id: 'title_short', text: `Title is too short (${title.length} chars). Aim for 50-65 chars.`, penalty: 10 });
    } else if (title.length > 70) {
      issues.push({ id: 'title_long', text: `Title may get truncated in SERPs (${title.length} chars). Aim for 50-65 chars.`, penalty: 8 });
    } else {
      passes.push(`Title length is optimal (${title.length} chars).`);
    }

    // Check title duplication
    const duplicateTitle = existingArticles.find(
      (a) => a.id !== article.id && (a.title || '').toLowerCase() === title.toLowerCase()
    );
    if (duplicateTitle) {
      issues.push({ id: 'title_duplicate', text: 'Identical title already published on CollegeBundles.', penalty: 20 });
    }
  }

  // 2. Slug Checks
  const slug = (article.slug || '').trim();
  if (!slug) {
    issues.push({ id: 'slug_missing', text: 'URL slug is missing.', penalty: 25 });
  } else {
    if (!/^[a-z0-9-]+$/.test(slug)) {
      issues.push({ id: 'slug_invalid', text: 'Slug must be lowercase alphanumeric with hyphens only.', penalty: 10 });
    } else if (slug.length < 10) {
      issues.push({ id: 'slug_short', text: 'Slug is too short for SEO search intent.', penalty: 5 });
    } else {
      passes.push(`URL Slug is clean: /${article.categorySlug || article.category || 'news'}/${slug}`);
    }

    // Check slug uniqueness
    const duplicateSlug = existingArticles.find(
      (a) => a.id !== article.id && (a.slug || '') === slug
    );
    if (duplicateSlug) {
      issues.push({ id: 'slug_duplicate', text: 'Slug conflict with another article.', penalty: 20 });
    }
  }

  // 3. Meta Description Checks
  const metaDesc = (article.metaDescription || article.excerpt || '').trim();
  if (!metaDesc) {
    issues.push({ id: 'meta_missing', text: 'Meta description is missing.', penalty: 15 });
  } else {
    if (metaDesc.length < 110) {
      issues.push({ id: 'meta_short', text: `Meta description is too brief (${metaDesc.length} chars). Aim for 140-160 chars.`, penalty: 7 });
    } else if (metaDesc.length > 170) {
      issues.push({ id: 'meta_long', text: `Meta description may truncate in Google snippets (${metaDesc.length} chars).`, penalty: 5 });
    } else {
      passes.push(`Meta description is optimal length (${metaDesc.length} chars).`);
    }
  }

  // 4. Content Word Count & Semantic Structure
  const content = article.content || '';
  const textOnly = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly ? textOnly.split(' ').length : 0;

  if (wordCount < 150) {
    issues.push({ id: 'content_thin', text: `Thin content warning (${wordCount} words). Minimum 250+ recommended.`, penalty: 20 });
  } else if (wordCount < 250) {
    issues.push({ id: 'content_short', text: `Content length is somewhat short (${wordCount} words).`, penalty: 8 });
  } else {
    passes.push(`Solid editorial depth (${wordCount} words).`);
  }

  // Check Headings (H2 / H3)
  const hasH2 = /<h2\b/i.test(content) || /##\s/i.test(content);
  const h1Matches = (content.match(/<h1\b/gi) || []).length;
  if (h1Matches > 1) {
    issues.push({ id: 'multiple_h1', text: 'Multiple H1 tags detected in body. Only page title should be H1.', penalty: 10 });
  } else if (h1Matches === 0 && !title) {
    issues.push({ id: 'missing_h1', text: 'No H1 tag detected.', penalty: 10 });
  }

  if (!hasH2) {
    issues.push({ id: 'missing_h2', text: 'No H2 section subheadings found. Break content into structured sections.', penalty: 8 });
  } else {
    passes.push('Semantic H2 subheadings present.');
  }

  // 5. Featured Image & Alt Text
  if (!article.image) {
    issues.push({ id: 'image_missing', text: 'Featured image is missing.', penalty: 15 });
  } else {
    passes.push('Featured image attached.');
    if (!article.imageAlt || article.imageAlt.trim().length < 5) {
      issues.push({ id: 'alt_missing', text: 'Image ALT text is missing or too generic for accessibility.', penalty: 8 });
    } else {
      passes.push('Descriptive image ALT text provided.');
    }
  }

  // 6. Highlights & FAQs
  if (article.keyHighlights && article.keyHighlights.length >= 2) {
    passes.push(`${article.keyHighlights.length} Key takeaways defined for featured snippet ranking.`);
  } else {
    issues.push({ id: 'highlights_missing', text: 'Add 2-4 key takeaways/highlights for rich Google snippets.', penalty: 5 });
  }

  if (article.faqs && article.faqs.length >= 1) {
    passes.push(`${article.faqs.length} FAQ items included (Schema ready).`);
  }

  // Calculate final score
  const totalPenalty = issues.reduce((acc, curr) => acc + curr.penalty, 0);
  score = Math.max(0, Math.min(100, 100 - totalPenalty));

  let statusLabel = 'Excellent';
  let badgeColor = '#16a34a'; // Green
  if (score < 60) {
    statusLabel = 'Needs Improvement';
    badgeColor = '#dc2626'; // Red
  } else if (score < 80) {
    statusLabel = 'Good';
    badgeColor = '#d97706'; // Amber
  }

  return {
    score,
    statusLabel,
    badgeColor,
    isReadyToPublish: score >= 70 && !issues.some((i) => i.penalty >= 20),
    issues,
    passes,
    wordCount,
  };
}
