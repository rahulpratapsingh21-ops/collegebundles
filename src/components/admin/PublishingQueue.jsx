import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Send, 
  Clock, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function PublishingQueue({
  articles = [],
  onEditArticle,
  onPublishNow,
  onDeleteArticle,
  onCreateNewArticle,
  onViewLive,
}) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter((a) => {
    const matchesCat = categoryFilter === 'all' || (a.categorySlug || a.category || '').toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || (a.status || 'published') === statusFilter;
    const matchesSearch =
      !searchTerm ||
      (a.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.slug || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>● Published</span>;
      case 'scheduled':
        return <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>⏱ Scheduled</span>;
      case 'needs_review':
        return <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>⚠ Needs Review</span>;
      case 'ai_generated':
        return <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>✦ AI Draft</span>;
      case 'rejected':
        return <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>✕ Rejected</span>;
      default:
        return <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>● Live</span>;
    }
  };

  const getSeoBadge = (score) => {
    const s = score || 85;
    let color = '#16a34a';
    let bg = '#dcfce7';
    if (s < 60) {
      color = '#dc2626';
      bg = '#fee2e2';
    } else if (s < 80) {
      color = '#d97706';
      bg = '#fef3c7';
    }
    return (
      <span style={{ backgroundColor: bg, color: color, padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
        {s}/100
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      {/* Action Header & Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          backgroundColor: '#ffffff',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search news by title or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem 0.5rem 2.1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="all">All Categories</option>
            <option value="medical">Medical (NEET/MBBS)</option>
            <option value="engineering">Engineering (JEE)</option>
            <option value="management">Management (CAT/MBA)</option>
            <option value="online">Online / UGC Degrees</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="all">All Statuses ({articles.length})</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="ai_generated">AI Generated Drafts</option>
            <option value="needs_review">Needs Review</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button
          onClick={onCreateNewArticle}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={15} /> ✦ Create / AI Ingest Article
        </button>
      </div>

      {/* Articles Queue Table */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Article Details & Slug</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Image</th>
                <th style={{ padding: '0.75rem 1rem' }}>SEO</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Schedule / Publish</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.75rem 1rem', maxWidth: '320px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem', lineHeight: 1.35 }}>
                        {article.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <code>/{article.categorySlug || 'news'}/{article.slug}</code>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: '#eff6ff',
                          color: '#1d4ed8',
                        }}
                      >
                        {article.category}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      {article.image ? (
                        <img
                          src={article.image}
                          alt="thumbnail"
                          style={{ width: '45px', height: '32px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        />
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>None</span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      {getSeoBadge(article.seoScore)}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      {getStatusBadge(article.status)}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#64748b' }}>
                      {article.status === 'scheduled' && article.scheduledAt ? (
                        <div style={{ color: '#1d4ed8', fontWeight: 600 }}>
                          ⏱ {new Date(article.scheduledAt).toLocaleString()}
                        </div>
                      ) : (
                        <div>{article.date || 'Just Now'}</div>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                        <button
                          onClick={() => onEditArticle(article)}
                          className="btn btn-outline"
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          title="Edit in AI Studio"
                        >
                          <Edit3 size={13} />
                        </button>

                        {article.status !== 'published' && (
                          <button
                            onClick={() => onPublishNow(article.id)}
                            className="btn btn-primary"
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                            title="Publish Live Now"
                          >
                            <Send size={13} />
                          </button>
                        )}

                        <button
                          onClick={() => onViewLive(article)}
                          className="btn btn-outline"
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          title="Preview Live Modal"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={() => onDeleteArticle(article.id)}
                          style={{
                            padding: '0.3rem 0.55rem',
                            borderRadius: '6px',
                            border: '1px solid #fee2e2',
                            backgroundColor: '#fff',
                            color: '#dc2626',
                            cursor: 'pointer',
                          }}
                          title="Delete Article"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
