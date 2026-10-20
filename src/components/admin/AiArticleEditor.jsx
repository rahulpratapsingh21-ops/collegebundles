import React, { useState } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Save, 
  Send, 
  Clock, 
  ExternalLink, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { validateArticleSeo } from '../../lib/seoValidator';
import { generateCleanSlug, generateSeoTitle, generateMetaDescription, generateArticleHtml, generateKeyHighlights } from '../../lib/aiNewsAgent';
import { convertToWebP, generateImageAltText, getCategoryFallbackImage } from '../../lib/imageProcessor';

export default function AiArticleEditor({ article, onSave, onBack, existingArticles = [] }) {
  const [formData, setFormData] = useState({
    id: article?.id || `art-${Date.now()}`,
    title: article?.title || '',
    slug: article?.slug || '',
    category: article?.category || 'Engineering',
    categorySlug: article?.categorySlug || 'engineering',
    metaDescription: article?.metaDescription || article?.excerpt || '',
    content: article?.content || '',
    image: article?.image || getCategoryFallbackImage('Engineering'),
    imageAlt: article?.imageAlt || '',
    author: article?.author || 'CollegeBundles Editorial Desk',
    keyHighlights: article?.keyHighlights || [],
    status: article?.status || 'ai_generated',
    scheduledAt: article?.scheduledAt || '',
    sourceName: article?.sourceName || 'RSS Feed',
    sourceUrl: article?.sourceUrl || '',
    rawContent: article?.rawContent || article?.description || '',
    guid: article?.guid || '',
    readTime: article?.readTime || '3 min read',
    views: article?.views || '1.8K',
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const [isProcessingWebp, setIsProcessingWebp] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');

  // Live SEO score calculation
  const seoResult = validateArticleSeo(formData, existingArticles);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && (!prev.slug || prev.slug.startsWith('update-') || prev.slug.startsWith('education-news-'))) {
        updated.slug = generateCleanSlug(value);
      }
      if (field === 'category') {
        updated.categorySlug = value.toLowerCase().replace(/[^a-z]/g, '');
        if (!prev.image || prev.image.includes('-news.jpg')) {
          updated.image = getCategoryFallbackImage(value);
        }
      }
      return updated;
    });
  };

  // Regeneration Handlers
  const handleRegenerateTitle = () => {
    const raw = formData.rawContent || formData.title;
    const newTitle = generateSeoTitle(raw, formData.category);
    handleFieldChange('title', newTitle);
  };

  const handleRegenerateSlug = () => {
    handleFieldChange('slug', generateCleanSlug(formData.title));
  };

  const handleRegenerateMeta = () => {
    const newMeta = generateMetaDescription(formData.title, formData.rawContent, formData.category);
    handleFieldChange('metaDescription', newMeta);
  };

  const handleRegenerateContent = () => {
    const newContent = generateArticleHtml(formData.rawContent, formData.title, formData.category, formData.sourceName);
    handleFieldChange('content', newContent);
  };

  const handleRegenerateHighlights = () => {
    const newHl = generateKeyHighlights(formData.rawContent, formData.title, formData.category);
    setFormData((prev) => ({ ...prev, keyHighlights: newHl }));
  };

  const handleRegenerateAlt = () => {
    handleFieldChange('imageAlt', generateImageAltText(formData.title, formData.category));
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        keyHighlights: [...(prev.keyHighlights || []), highlightInput.trim()],
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyHighlights: (prev.keyHighlights || []).filter((_, i) => i !== index),
    }));
  };

  const handleConvertImageToWebP = async () => {
    if (!formData.image) return;
    setIsProcessingWebp(true);
    try {
      const webpUrl = await convertToWebP(formData.image);
      if (webpUrl) {
        handleFieldChange('image', webpUrl);
      }
    } catch (e) {
      console.warn('WebP conversion failed:', e);
    } finally {
      setIsProcessingWebp(false);
    }
  };

  const handleSaveArticle = (statusOverride = null) => {
    const finalStatus = statusOverride || formData.status;
    const now = new Date().toISOString();
    const finalArticle = {
      ...formData,
      status: finalStatus,
      seoScore: seoResult.score,
      seoStatus: seoResult.statusLabel,
      publishedAt: finalStatus === 'published' ? (formData.publishedAt || now) : formData.publishedAt,
      updatedAt: now,
    };
    onSave(finalArticle);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f8fafc' }}>
      {/* Top Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.5rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onBack}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ArrowLeft size={14} /> Back to Queue
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
            AI News Editorial Studio
          </span>
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: seoResult.score >= 80 ? '#dcfce7' : seoResult.score >= 60 ? '#fef3c7' : '#fee2e2',
              color: seoResult.score >= 80 ? '#15803d' : seoResult.score >= 60 ? '#b45309' : '#dc2626',
            }}
          >
            SEO Score: {seoResult.score}/100 ({seoResult.statusLabel})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          >
            {activeTab === 'editor' ? '👁 Preview Live Article' : '✏ Back to Editor'}
          </button>

          <button
            onClick={() => handleSaveArticle('ai_generated')}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Save size={14} /> Save Draft
          </button>

          <button
            onClick={() => handleSaveArticle('published')}
            className="btn btn-primary"
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Send size={14} /> Publish Live Now
          </button>
        </div>
      </div>

      {/* Main Two-Panel Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT PANEL: Original RSS Context */}
        <div
          style={{
            width: '320px',
            minWidth: '280px',
            backgroundColor: '#f1f5f9',
            borderRight: '1px solid #e2e8f0',
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.8rem', fontWeight: 700 }}>
            <FileText size={16} /> ORIGINAL RSS SOURCE
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.82rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Source Feed</div>
            <strong style={{ color: '#0f172a' }}>{formData.sourceName}</strong>
            {formData.sourceUrl && (
              <a
                href={formData.sourceUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: '#2563eb', textDecoration: 'none', fontSize: '0.75rem' }}
              >
                View Original Story <ExternalLink size={12} />
              </a>
            )}
          </div>

          {formData.guid && (
            <div style={{ backgroundColor: '#ffffff', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
              <strong>GUID:</strong> <span style={{ wordBreak: 'break-all' }}>{formData.guid}</span>
            </div>
          )}

          <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', flex: 1 }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              RAW INGESTED CONTENT:
            </div>
            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5, maxHeight: '250px', overflowY: 'auto' }}>
              {formData.rawContent || 'No raw RSS body captured.'}
            </div>
          </div>

          {/* SEO Health Checklist */}
          <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              SEO Quality Checks
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem' }}>
              {seoResult.passes.map((p, i) => (
                <div key={i} style={{ color: '#16a34a', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                  <CheckCircle size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{p}</span>
                </div>
              ))}
              {seoResult.issues.map((iss, i) => (
                <div key={i} style={{ color: '#dc2626', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                  <AlertCircle size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{iss.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI-Generated Article Editor / Preview */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', backgroundColor: '#ffffff' }}>
          {activeTab === 'preview' ? (
            /* Live Article Preview */
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {formData.category} ADMISSIONS NEWS
              </span>
              <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0.5rem 0 1rem 0', lineHeight: 1.3 }}>
                {formData.title}
              </h1>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
                <span>✍ {formData.author}</span>
                <span>⏱ {formData.readTime}</span>
                <span>👁 {formData.views} Views</span>
              </div>
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.imageAlt || formData.title}
                  style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
                />
              )}
              {formData.keyHighlights && formData.keyHighlights.length > 0 && (
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <Sparkles size={16} /> Key Takeaways for Students & Parents:
                  </strong>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', color: '#1e293b' }}>
                    {formData.keyHighlights.map((hl, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div
                style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#334155' }}
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
          ) : (
            /* Article Field-by-Field Editor */
            <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Category & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Primary Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Medical">Medical (NEET / MBBS)</option>
                    <option value="Engineering">Engineering (JEE / JoSAA)</option>
                    <option value="Management">Management (CAT / MBA)</option>
                    <option value="Online">Online Degrees & UGC</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Workflow Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="ai_generated">AI Generated (Draft)</option>
                    <option value="needs_review">Needs Review</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published Live</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Schedule Live Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledAt ? formData.scheduledAt.slice(0, 16) : ''}
                    onChange={(e) => handleFieldChange('scheduledAt', e.target.value ? new Date(e.target.value).toISOString() : '')}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Title Field with Regen Button */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    SEO Headline / H1 Title ({formData.title.length} chars)
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateTitle}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate Title
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter high-ranking SEO news headline"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', fontWeight: 600 }}
                />
              </div>

              {/* URL Slug Field */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    SEO Clean URL Slug: <code style={{ color: '#2563eb' }}>/{formData.categorySlug || 'news'}/{formData.slug}</code>
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate Slug
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleFieldChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    Meta Description ({formData.metaDescription.length} chars - target: 140–160)
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateMeta}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate Meta
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* Featured Image & WebP Converter */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ImageIcon size={14} /> Featured Image & WebP Processor
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('image', getCategoryFallbackImage(formData.category))}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Use Category Default
                    </button>
                    <button
                      type="button"
                      onClick={handleConvertImageToWebP}
                      disabled={isProcessingWebp}
                      className="btn btn-outline"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      {isProcessingWebp ? 'Converting...' : '⚡ Convert to WebP'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem', alignItems: 'center' }}>
                  <div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => handleFieldChange('image', e.target.value)}
                      placeholder="Image URL (WebP, JPG, PNG)"
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginBottom: '0.5rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Image ALT Text:</span>
                      <button
                        type="button"
                        onClick={handleRegenerateAlt}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Auto-generate ALT
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.imageAlt}
                      onChange={(e) => handleFieldChange('imageAlt', e.target.value)}
                      placeholder="Descriptive image ALT text for Google Images"
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    ) : (
                      <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', borderRadius: '8px', color: '#94a3b8', fontSize: '0.75rem' }}>
                        No Image
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Highlights / Snippets */}
              <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} /> Key Highlights / Featured Takeaways
                  </span>
                  <button
                    type="button"
                    onClick={handleRegenerateHighlights}
                    style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate Highlights
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {formData.keyHighlights && formData.keyHighlights.map((hl, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '0.45rem 0.75rem', borderRadius: '6px', fontSize: '0.82rem', border: '1px solid #dbeafe' }}>
                      <span>• {hl}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.75rem', marginLeft: '0.5rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddHighlight} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    placeholder="Add key takeaway point..."
                    style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '0.82rem' }}
                  />
                  <button type="submit" className="btn btn-outline" style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}>
                    + Add
                  </button>
                </form>
              </div>

              {/* Full Article HTML Content with H2 / H3 semantic structure */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    Article Content HTML (Structured H2 / H3 & Paragraphs)
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateContent}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate Content
                  </button>
                </div>
                <textarea
                  rows={12}
                  value={formData.content}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
