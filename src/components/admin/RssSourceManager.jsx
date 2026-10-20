import React, { useState } from 'react';
import { 
  Rss, 
  Plus, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { fetchRssFeed } from '../../lib/rssEngine';

export default function RssSourceManager({
  sources = [],
  onSaveSource,
  onDeleteSource,
  rssItems = [],
  onProcessItemWithAi,
  onRefreshAllFeeds,
  isFetching = false,
}) {
  const [activeTab, setActiveTab] = useState('sources'); // 'sources' | 'items'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    rssUrl: '',
    category: 'Engineering',
    categorySlug: 'engineering',
    sourceWebsite: '',
    fetchInterval: 30,
    priority: 1,
    defaultAuthor: 'CollegeBundles News Desk',
    active: true,
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSource.name || !newSource.rssUrl) return;
    onSaveSource({
      ...newSource,
      categorySlug: newSource.category.toLowerCase().replace(/[^a-z]/g, ''),
    });
    setNewSource({
      name: '',
      rssUrl: '',
      category: 'Engineering',
      categorySlug: 'engineering',
      sourceWebsite: '',
      fetchInterval: 30,
      priority: 1,
      defaultAuthor: 'CollegeBundles News Desk',
      active: true,
    });
    setShowAddModal(false);
  };

  const handleToggleActive = (source) => {
    onSaveSource({ ...source, active: !source.active });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      {/* Top Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          backgroundColor: '#ffffff',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('sources')}
            className={`btn ${activeTab === 'sources' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <Rss size={14} style={{ marginRight: '0.35rem' }} /> Configured Feeds ({sources.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`btn ${activeTab === 'items' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <Layers size={14} style={{ marginRight: '0.35rem' }} /> Ingested Stories Queue ({rssItems.length})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onRefreshAllFeeds}
            disabled={isFetching}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <RefreshCw size={14} className={isFetching ? 'spin' : ''} />
            {isFetching ? 'Fetching Feeds...' : 'Fetch All Feeds Now'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Plus size={14} /> Add RSS Source
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'sources' ? (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Source & URL</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Frequency</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((src) => (
                  <tr key={src.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{src.name}</div>
                      <a
                        href={src.rssUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.72rem', color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}
                      >
                        {src.rssUrl.slice(0, 55)}... <ExternalLink size={10} />
                      </a>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                        {src.category}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>
                      Every {src.fetchInterval || 30} mins
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button
                        onClick={() => handleToggleActive(src)}
                        style={{
                          border: 'none',
                          background: src.active ? '#dcfce7' : '#f1f5f9',
                          color: src.active ? '#15803d' : '#64748b',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {src.active ? '● Active' : '○ Paused'}
                      </button>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => onDeleteSource(src.id)}
                        style={{
                          border: '1px solid #fee2e2',
                          background: '#fff',
                          color: '#dc2626',
                          padding: '0.3rem 0.55rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Ingested Stories Queue */
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            Latest Raw RSS Feed Items (Ready for AI Transformation)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {rssItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                No raw items fetched yet. Click "Fetch All Feeds Now" above.
              </div>
            ) : (
              rssItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  <div style={{ maxWidth: '75%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {item.sourceName} • {new Date(item.pubDate || item.fetchedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                      {item.title}
                    </div>
                  </div>

                  <button
                    onClick={() => onProcessItemWithAi(item)}
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Sparkles size={13} /> Process with AI
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>
              Add New Education RSS Feed
            </h3>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Feed Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NTA JEE Official Updates"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  RSS Feed URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/rss"
                  value={newSource.rssUrl}
                  onChange={(e) => setNewSource({ ...newSource, rssUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Category
                  </label>
                  <select
                    value={newSource.category}
                    onChange={(e) => setNewSource({ ...newSource, category: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Medical">Medical (NEET/MBBS)</option>
                    <option value="Engineering">Engineering (JEE)</option>
                    <option value="Management">Management (MBA)</option>
                    <option value="Online">Online / UGC</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Fetch Frequency (Mins)
                  </label>
                  <input
                    type="number"
                    min={5}
                    value={newSource.fetchInterval}
                    onChange={(e) => setNewSource({ ...newSource, fetchInterval: parseInt(e.target.value) || 30 })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ padding: '0.45rem 0.85rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 1rem' }}>
                  Save Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
