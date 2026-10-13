import React from 'react';
import { 
  Clock, 
  Calendar, 
  Eye, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Stethoscope, 
  Laptop, 
  Briefcase, 
  Globe 
} from 'lucide-react';
import { newsCategories, newsArticles } from '../data/newsData';

export default function NewsSection({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onOpenArticleModal,
  onOpenLeadModal
}) {
  // Filter articles based on active category and search query
  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      activeCategory === 'all' || article.categorySlug === activeCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0] || newsArticles[0];
  const otherArticles = filteredArticles.slice(1);

  const getCategoryBadgeClass = (categorySlug) => {
    switch (categorySlug) {
      case 'medical': return 'badge-medical';
      case 'engineering': return 'badge-engineering';
      case 'management': return 'badge-management';
      case 'online': return 'badge-online';
      default: return 'badge-engineering';
    }
  };

  const getCategoryIcon = (categorySlug) => {
    switch (categorySlug) {
      case 'medical': return <Stethoscope size={13} />;
      case 'engineering': return <Laptop size={13} />;
      case 'management': return <Briefcase size={13} />;
      case 'online': return <Globe size={13} />;
      default: return null;
    }
  };

  const handleShare = (article, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - Read more on CollegeBundles.in: ${window.location.href}`);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <section id="news-section" style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={14} />
            <span>Real-Time Educational Journalism</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#0f172a',
              marginBottom: '0.75rem',
            }}
          >
            Latest News, Cutoffs & Admission Bulletins
          </h2>

          <p style={{ maxWidth: '650px', fontSize: '1rem', color: '#64748b' }}>
            Verified editorial reports across Medical (NEET), Engineering (JEE), Management (CAT), and Online Degrees with helpline <strong>8802155810</strong>.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
          }}
        >
          {newsCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 700 : 600,
                  backgroundColor: isSelected ? '#1e40af' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #1e40af' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 4px 12px rgba(30, 64, 175, 0.25)' : 'var(--shadow-sm)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search Results Notice (if active) */}
        {searchQuery && (
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              color: '#1e40af',
            }}
          >
            <span>Showing results matching: <strong>"{searchQuery}"</strong> ({filteredArticles.length} found)</span>
            <button
              onClick={() => onSelectCategory('all')}
              style={{ fontWeight: 600, textDecoration: 'underline', color: '#1e40af' }}
            >
              Reset
            </button>
          </div>
        )}

        {filteredArticles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed #cbd5e1',
            }}
          >
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1rem' }}>
              No articles found matching "{searchQuery}".
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="btn btn-primary"
            >
              View All News Articles
            </button>
          </div>
        ) : (
          <>
            {/* Featured Hero Story Card */}
            {featuredArticle && (
              <div
                className="card-hover"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                }}
                onClick={() => onOpenArticleModal(featuredArticle)}
              >
                {/* Image */}
                <div style={{ position: 'relative', minHeight: '280px', overflow: 'hidden' }}>
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    className="featured-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                  >
                    <span className="badge badge-breaking">BREAKING REPORT</span>
                    <span className={`badge ${getCategoryBadgeClass(featuredArticle.categorySlug)}`}>
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={14} /> {featuredArticle.date}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} /> {featuredArticle.readTime}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Eye size={14} /> {featuredArticle.views} Views
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                        color: '#0f172a',
                        lineHeight: 1.3,
                        marginBottom: '1rem',
                      }}
                    >
                      {featuredArticle.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#475569',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {featuredArticle.excerpt}
                    </p>

                    {/* Key Highlights bullet list */}
                    {featuredArticle.keyHighlights && (
                      <div
                        style={{
                          backgroundColor: '#f8fafc',
                          padding: '1rem',
                          borderRadius: '12px',
                          border: '1px solid #edf2f7',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#1e40af', marginBottom: '0.4rem' }}>
                          Key Highlights:
                        </div>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {featuredArticle.keyHighlights.slice(0, 3).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #f1f5f9',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        <span>Read Full Report</span>
                        <ArrowRight size={15} />
                      </button>

                      <a
                        href="tel:8802155810"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        <Phone size={13} />
                        <span>Counselor: 8802155810</span>
                      </a>
                    </div>

                    <button
                      onClick={(e) => handleShare(featuredArticle, e)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                      }}
                      title="Share Article"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other News Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {otherArticles.map((article) => (
                <article
                  key={article.id}
                  className="card-hover"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onClick={() => onOpenArticleModal(article)}
                >
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                      }}
                    >
                      <span className={`badge ${getCategoryBadgeClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                    </div>

                    {article.isTrending && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: '#f59e0b',
                            color: '#ffffff',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '999px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                          }}
                        >
                          HOT TREND
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.78rem',
                          color: '#64748b',
                          marginBottom: '0.65rem',
                        }}
                      >
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h4
                        style={{
                          fontSize: '1.15rem',
                          color: '#0f172a',
                          lineHeight: 1.35,
                          marginBottom: '0.75rem',
                        }}
                      >
                        {article.title}
                      </h4>

                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: '#64748b',
                          lineHeight: 1.55,
                          marginBottom: '1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Card Action Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid #f1f5f9',
                      }}
                    >
                      <span
                        style={{
                          color: '#1d4ed8',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        Read More <ArrowRight size={14} />
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <a
                          href="tel:8802155810"
                          onClick={(e) => e.stopPropagation()}
                          title="Call Counselor for this course"
                          style={{
                            padding: '0.35rem 0.6rem',
                            borderRadius: '6px',
                            backgroundColor: '#ecfdf5',
                            color: '#065f46',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <Phone size={11} /> 8802155810
                        </a>

                        <button
                          onClick={(e) => handleShare(article, e)}
                          style={{
                            padding: '0.35rem',
                            borderRadius: '6px',
                            backgroundColor: '#f8fafc',
                            color: '#64748b',
                          }}
                          title="Share Article"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
