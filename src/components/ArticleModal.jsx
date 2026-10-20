import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Share2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { getAllArticles } from '../lib/newsCmsStorage';

export default function ArticleModal({ 
  article, 
  allArticles, 
  onSelectArticle, 
  onClose, 
  onOpenLeadModal 
}) {
  const [modalScrollTriggered, setModalScrollTriggered] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Recommended Articles: 2 or 3 articles from the exact same category
  const articlesList = (allArticles && allArticles.length > 0) ? allArticles : getAllArticles();
  const recommendedArticles = useMemo(() => {
    if (!articlesList || !article) return [];
    const currentCatSlug = (article.categorySlug || article.category || '').toLowerCase();
    const currentCat = (article.category || '').toLowerCase();

    const matches = articlesList.filter((a) => {
      if (a.id === article.id || (a.slug && a.slug === article.slug)) return false;
      const catSlug = (a.categorySlug || '').toLowerCase();
      const cat = (a.category || '').toLowerCase();
      return (catSlug && catSlug === currentCatSlug) || (cat && cat === currentCat);
    });

    return matches.slice(0, 3);
  }, [articlesList, article]);

  if (!article) return null;

  const handleSelectRecommended = (rec) => {
    if (onSelectArticle) {
      onSelectArticle(rec);
      if (modalContentRef.current) {
        modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleModalScroll = (e) => {
    if (modalScrollTriggered) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - clientHeight <= 0) return;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (progress >= 50) {
      setModalScrollTriggered(true);
      if (onOpenLeadModal) {
        onOpenLeadModal(`50% Scroll in Article: ${article.title}`);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalContentRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onScroll={handleModalScroll}
        style={{ maxWidth: '850px' }}
      >
        {/* Sticky Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                textTransform: 'uppercase',
              }}
            >
              {article.category} News
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              CollegeBundles.in Editorial
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.75rem' }}>
          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              lineHeight: 1.3,
              color: '#0f172a',
              marginBottom: '1rem',
            }}
          >
            {article.title}
          </h1>

          {/* Meta Info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.82rem',
              color: '#64748b',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <User size={14} color="#2563eb" /> {article.author}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> {article.date}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} /> {article.readTime}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Eye size={14} /> {article.views} Views
            </span>
          </div>

          {/* Article Featured Image */}
          <div
            style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '1.75rem',
              maxHeight: '400px',
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Key Highlights Card */}
          {article.keyHighlights && article.keyHighlights.length > 0 && (
            <div
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '14px',
                padding: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <h3
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#1e40af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                <Sparkles size={16} /> Key Takeaways for Students & Parents:
              </h3>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: '#1e293b' }}>
                {article.keyHighlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Article Content */}
          <div
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Dates Table if provided and not already in HTML content */}
          {(() => {
            const hasHtmlTable = article.content && article.content.includes('<table');
            const validDates = Array.isArray(article.datesTable)
              ? article.datesTable.filter((r) => (r.event || r.milestone || r.Event) && (r.date || r.scheduledDate || r.Date))
              : [];
            if (hasHtmlTable || validDates.length === 0) return null;

            return (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>
                  Important Dates & Counselling Timetable
                </h3>
                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 600 }}>Event / Milestone</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 600 }}>Scheduled Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validDates.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx !== validDates.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{row.event || row.milestone || row.Event}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#1d4ed8', fontWeight: 700 }}>{row.date || row.scheduledDate || row.Date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* FAQs Accordion if provided and not already rendered in HTML */}
          {(() => {
            const hasFaqsInContent = article.content && (
              article.content.includes('Frequently Asked Questions') ||
              article.content.includes('Frequently Asked')
            );
            const validFaqs = Array.isArray(article.faqs)
              ? article.faqs
                  .map((f) => ({
                    q: (f.question || f.q || f.Question || '').trim(),
                    a: (f.answer || f.a || f.Answer || '').trim(),
                  }))
                  .filter((f) => f.q.length > 0 && f.a.length > 0)
              : [];

            if (hasFaqsInContent || validFaqs.length === 0) return null;

            return (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <HelpCircle size={18} color="#2563eb" /> Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {validFaqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '1.1rem',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                        {faq.q.match(/^Q\d+[:.]/i) ? faq.q : `Q${i + 1}: ${faq.q.replace(/^Q\d*[:.]\s*/i, '')}`}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Recommended Articles in Same Category (2 or 3 articles) */}
          {recommendedArticles.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '1rem', 
                  borderBottom: '2px solid #f1f5f9', 
                  paddingBottom: '0.6rem' 
                }}
              >
                <h3 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    margin: 0 
                  }}
                >
                  <BookOpen size={20} color="#2563eb" />
                  Recommended in {article.category} News
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {recommendedArticles.length} Related Articles
                </span>
              </div>

              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '1rem' 
                }}
              >
                {recommendedArticles.map((rec) => (
                  <div
                    key={rec.id || rec.slug}
                    onClick={() => handleSelectRecommended(rec)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 18px rgba(37,99,235,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                    }}
                  >
                    <div style={{ height: '120px', width: '100%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                      <img
                        src={rec.image || '/engineering-news.jpg'}
                        alt={rec.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = '/engineering-news.jpg'; }}
                      />
                    </div>
                    <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.72rem', color: '#64748b' }}>
                        <span style={{ fontWeight: 700, color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {rec.category}
                        </span>
                        <span>•</span>
                        <span>{rec.readTime || '4 min read'}</span>
                      </div>
                      <h4 
                        style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: 700, 
                          color: '#0f172a', 
                          lineHeight: 1.4, 
                          margin: '0 0 0.5rem 0', 
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical', 
                          overflow: 'hidden' 
                        }}
                      >
                        {rec.title}
                      </h4>
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, paddingTop: '0.3rem' }}>
                        <span>Read Full Story</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Counselor Call-to-Action Box inside Modal */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
              borderRadius: '18px',
              padding: '1.75rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.5rem',
                }}
              >
                Official Admission Desk
              </span>
              <h4 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                Confused about cutoffs, eligibility, or direct admissions?
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                Speak directly with our senior admission counselors for {article.category} courses. Get fee waivers, scholarship verification, and 100% genuine guidance.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="tel:8802155810"
                className="btn btn-call"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                <Phone size={16} />
                <span>Call Hotline: 8802155810</span>
              </a>

              <a
                href={`https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20have%20questions%20regarding%20${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Expert</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenLeadModal(`Article Modal: ${article.title}`);
                }}
                className="btn btn-gold"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                Request Free Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
