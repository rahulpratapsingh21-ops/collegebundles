import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Phone, 
  Mail, 
  Trash2, 
  RefreshCw, 
  Database, 
  Loader2,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff,
  LogOut,
  Newspaper,
  Users,
  Rss,
  Settings,
  Globe,
  Plus
} from 'lucide-react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../lib/supabaseClient';
import { 
  getAllArticles, 
  saveArticle, 
  deleteArticle as deleteArticleFromStorage, 
  getAllRssSources, 
  saveRssSource, 
  deleteRssSource, 
  getRssItems, 
  saveRssItems,
  getAiLogs, 
  getAutomationSettings, 
  saveAutomationSettings,
  addAiLog 
} from '../lib/newsCmsStorage';
import { processRssItemWithAi } from '../lib/aiNewsAgent';
import { fetchRssFeed } from '../lib/rssEngine';
import PublishingQueue from './admin/PublishingQueue';
import AiArticleEditor from './admin/AiArticleEditor';
import RssSourceManager from './admin/RssSourceManager';
import AutomationSettingsModal from './admin/AutomationSettingsModal';
import SitemapViewer from './admin/SitemapViewer';

// Default Master Passcodes
export const DEFAULT_ADMIN_PASSCODES = ['College@2026', 'admin123', 'admin@2026', '8802155810', 'admin8802'];

export function getValidPasscodes() {
  const custom = localStorage.getItem('cb_admin_custom_pin');
  return custom ? [custom, ...DEFAULT_ADMIN_PASSCODES] : DEFAULT_ADMIN_PASSCODES;
}

export default function LeadAdminDrawer({ isOpen, onClose, onViewArticle }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('cb_admin_authenticated') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password Management States
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassInput, setNewPassInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState('');

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'leads' | 'rss' | 'settings' | 'sitemap'

  // Leads Data
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState('supabase');

  // News CMS Data
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [rssSources, setRssSources] = useState([]);
  const [rssItems, setRssItems] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);
  const [automationSettings, setAutomationSettings] = useState({});
  const [isFetchingRss, setIsFetchingRss] = useState(false);

  const loadLeads = async () => {
    setIsRefreshing(true);
    try {
      const result = await fetchLeads();
      setLeads(result.leads || []);
      setDataSource(result.source || 'supabase');
    } catch (err) {
      console.error('Error fetching leads from Supabase:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadCmsData = () => {
    setArticles(getAllArticles());
    setRssSources(getAllRssSources());
    setRssItems(getRssItems());
    setAiLogs(getAiLogs());
    setAutomationSettings(getAutomationSettings());
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadLeads();
      loadCmsData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    const cleanInput = passcode.trim();
    const validCodes = getValidPasscodes();
    if (validCodes.includes(cleanInput)) {
      sessionStorage.setItem('cb_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('');
      loadLeads();
      loadCmsData();
    } else {
      setAuthError('Incorrect passcode. Access is restricted to authorized site administrators.');
    }
  };

  const handleSaveNewPassword = (e) => {
    e.preventDefault();
    const clean = newPassInput.trim();
    if (clean.length < 4) {
      setPasswordChangeMsg('Error: Password must be at least 4 characters long.');
      return;
    }
    localStorage.setItem('cb_admin_custom_pin', clean);
    setPasswordChangeMsg(`✔ Admin password updated successfully to: "${clean}"`);
    setNewPassInput('');
    setTimeout(() => {
      setPasswordChangeMsg('');
      setIsChangingPassword(false);
    }, 2500);
  };

  const handleResetPassword = () => {
    localStorage.removeItem('cb_admin_custom_pin');
    setPasswordChangeMsg('✔ Reset to defaults: College@2026 or admin123');
    setTimeout(() => {
      setPasswordChangeMsg('');
      setIsChangingPassword(false);
    }, 2500);
  };

  const handleLock = () => {
    sessionStorage.removeItem('cb_admin_authenticated');
    setIsAuthenticated(false);
    setIsChangingPassword(false);
    setLeads([]);
    setPasscode('');
    setAuthError('');
  };

  // Leads Handlers
  const handleUpdateStatus = async (id, newStatus) => {
    const updated = leads.map((l) => (l.id === id || l.supabase_id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    try {
      await updateLeadStatus(id, newStatus);
    } catch (err) {
      console.error('Error updating status in Supabase:', err);
    }
  };

  const handleDeleteLead = async (id) => {
    if (confirm('Delete this lead record permanently from Supabase?')) {
      const updated = leads.filter((l) => l.id !== id && l.supabase_id !== id);
      setLeads(updated);
      try {
        await deleteLead(id);
      } catch (err) {
        console.error('Error deleting lead from Supabase:', err);
      }
    }
  };

  const handleExportCSV = () => {
    if (!leads.length) {
      alert('No leads available to export.');
      return;
    }
    const headers = ['Reference ID', 'Full Name', 'Mobile', 'Email', 'Course / Stream', 'City', 'Budget', 'Date Captured', 'Status', 'Source'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.mobile}"`,
      l.email,
      `"${l.stream}"`,
      `"${l.city || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.date}"`,
      `"${l.status}"`,
      `"${l.source || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `collegebundle_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // News CMS Handlers
  const handleSaveArticle = (article) => {
    saveArticle(article);
    loadCmsData();
    setEditingArticle(null);
  };

  const handlePublishNow = (articleId) => {
    const found = articles.find((a) => a.id === articleId);
    if (found) {
      const updated = {
        ...found,
        status: 'published',
        publishedAt: new Date().toISOString(),
      };
      saveArticle(updated);
      loadCmsData();
    }
  };

  const handleDeleteArticle = (articleId) => {
    if (confirm('Permanently delete this news article?')) {
      deleteArticleFromStorage(articleId);
      loadCmsData();
    }
  };

  const handleCreateNewArticle = () => {
    setEditingArticle({
      id: `art-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Engineering',
      categorySlug: 'engineering',
      metaDescription: '',
      content: '',
      image: '/engineering-news.jpg',
      imageAlt: '',
      author: 'CollegeBundles Editorial Desk',
      keyHighlights: [],
      status: 'ai_generated',
      scheduledAt: '',
    });
  };

  const handleProcessRssItem = async (rssItem) => {
    const res = await processRssItemWithAi(rssItem, automationSettings, articles);
    if (res.success && res.article) {
      setEditingArticle(res.article);
      addAiLog({
        task: 'Manual AI Ingestion Request',
        inputReference: rssItem.title,
        result: `Generated draft article with SEO score: ${res.article.seoScore}`,
        status: 'success',
      });
      loadCmsData();
      setActiveTab('news');
    } else {
      alert(`AI Processing warning: ${res.error || 'Failed to process item'}`);
    }
  };

  const handleRefreshAllFeeds = async () => {
    setIsFetchingRss(true);
    let totalAdded = 0;
    try {
      const activeSources = rssSources.filter((s) => s.active);
      for (const src of activeSources) {
        const fetchRes = await fetchRssFeed(src);
        if (fetchRes.success && fetchRes.items.length > 0) {
          saveRssItems(fetchRes.items);
          totalAdded += fetchRes.items.length;
        }
      }
      loadCmsData();
      alert(`RSS Ingestion Complete: Fetched and updated ${totalAdded} news feed items.`);
    } catch (e) {
      console.warn('Error refreshing feeds:', e);
    } finally {
      setIsFetchingRss(false);
    }
  };

  const handleSaveRssSource = (source) => {
    saveRssSource(source);
    loadCmsData();
  };

  const handleDeleteRssSource = (sourceId) => {
    if (confirm('Remove this RSS feed source?')) {
      deleteRssSource(sourceId);
      loadCmsData();
    }
  };

  const handleSaveAutomationSettings = (newSettings) => {
    saveAutomationSettings(newSettings);
    loadCmsData();
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.mobile.includes(searchTerm) ||
      l.stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: isAuthenticated ? 'min(1240px, 96vw)' : '460px', 
          width: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          height: isAuthenticated ? '88vh' : 'auto',
          maxHeight: '92vh',
          transition: 'max-width 0.3s ease',
          padding: 0,
          overflow: 'hidden',
          borderRadius: '20px',
        }}
      >
        {/* ================= IF NOT AUTHENTICATED: SHOW SECURE LOCK GATE ================= */}
        {!isAuthenticated ? (
          <div>
            {/* Gate Header */}
            <div
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '1.25rem 1.5rem',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  CollegeBundles Administration
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: '0.4rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Gate Body */}
            <div style={{ padding: '2rem 1.75rem', textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <KeyRound size={30} />
              </div>

              <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.4rem', fontWeight: 800 }}>
                Restricted Admin & News CMS
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.45' }}>
                Enter your administrative passcode to manage student inquiries and AI auto-publishing news feeds.
              </p>

              {authError && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textAlign: 'left',
                  }}
                >
                  <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleVerifyPasscode}>
                <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter Admin Passcode"
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.75rem 0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.95rem',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      letterSpacing: showPasscode ? 'normal' : '0.15em',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                  }}
                >
                  <Unlock size={16} />
                  <span>Unlock Admin Portal</span>
                </button>
              </form>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('cb_admin_custom_pin');
                    setAuthError('');
                    alert('Password has been reset to defaults:\n\n• College@2026\n• admin123\n• admin@2026\n• 8802155810');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 600,
                  }}
                >
                  Reset Password to Default
                </button>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Default Passcode: <strong style={{ color: '#0f172a' }}>College@2026</strong> or <strong style={{ color: '#0f172a' }}>admin123</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= IF AUTHENTICATED: SHOW FULL CMS & CRM PORTAL ================= */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Top Bar with Title & Master Controls */}
            <div
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Newspaper size={20} color="#38bdf8" />
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>
                    CollegeBundles.in Portal
                  </h3>
                </div>
                <span
                  style={{
                    backgroundColor: dataSource === 'supabase' ? '#065f46' : '#92400e',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <Database size={10} />
                  {dataSource === 'supabase' ? 'Supabase Live DB' : 'Local Cache'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: isChangingPassword ? '#2563eb' : 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <KeyRound size={13} /> Change PIN
                </button>

                <button
                  onClick={handleLock}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    color: '#fca5a5',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <LogOut size={13} /> Lock
                </button>

                <button
                  onClick={onClose}
                  style={{
                    padding: '0.4rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '0.5rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '1px solid #334155',
                overflowX: 'auto',
              }}
            >
              <button
                onClick={() => { setActiveTab('news'); setEditingArticle(null); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'news' ? '#2563eb' : 'transparent',
                  color: activeTab === 'news' ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Newspaper size={14} /> Live News CMS ({articles.length})
              </button>

              <button
                onClick={() => { setActiveTab('leads'); setEditingArticle(null); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'leads' ? '#2563eb' : 'transparent',
                  color: activeTab === 'leads' ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Users size={14} /> Student Leads CRM ({leads.length})
              </button>

              <button
                onClick={() => { setActiveTab('rss'); setEditingArticle(null); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'rss' ? '#2563eb' : 'transparent',
                  color: activeTab === 'rss' ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Rss size={14} /> RSS Feeds & Ingestion ({rssSources.length})
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setEditingArticle(null); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'settings' ? '#2563eb' : 'transparent',
                  color: activeTab === 'settings' ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Settings size={14} /> Automation Rules
              </button>

              <button
                onClick={() => { setActiveTab('sitemap'); setEditingArticle(null); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'sitemap' ? '#2563eb' : 'transparent',
                  color: activeTab === 'sitemap' ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Globe size={14} /> XML Sitemap & SEO
              </button>
            </div>

            {/* Change Password Panel */}
            {isChangingPassword && (
              <div style={{ backgroundColor: '#1e293b', padding: '1rem 1.5rem', borderBottom: '1px solid #334155' }}>
                <form onSubmit={handleSaveNewPassword} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="Enter new admin passcode (min 4 chars)"
                    style={{ flex: 1, maxWidth: '280px', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
                    Save Password
                  </button>
                  <button type="button" onClick={handleResetPassword} className="btn btn-outline" style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    Reset Defaults
                  </button>
                </form>
                {passwordChangeMsg && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#4ade80' }}>{passwordChangeMsg}</div>
                )}
              </div>
            )}

            {/* Tab View Body */}
            <div style={{ flex: 1, overflow: 'hidden', padding: '1.25rem', backgroundColor: '#f8fafc' }}>
              {/* TAB 1: LIVE NEWS CMS */}
              {activeTab === 'news' && (
                editingArticle ? (
                  <AiArticleEditor
                    article={editingArticle}
                    onSave={handleSaveArticle}
                    onBack={() => setEditingArticle(null)}
                    existingArticles={articles}
                  />
                ) : (
                  <PublishingQueue
                    articles={articles}
                    onEditArticle={(a) => setEditingArticle(a)}
                    onPublishNow={handlePublishNow}
                    onDeleteArticle={handleDeleteArticle}
                    onCreateNewArticle={handleCreateNewArticle}
                    onViewLive={(a) => {
                      if (onViewArticle) onViewArticle(a);
                    }}
                  />
                )
              )}

              {/* TAB 2: STUDENT LEADS CRM */}
              {activeTab === 'leads' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
                  {/* Search and Export Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search leads by student name, phone, course..."
                      style={{ padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', maxWidth: '380px', fontSize: '0.85rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={loadLeads} disabled={isRefreshing} className="btn btn-outline" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                        {isRefreshing ? 'Syncing...' : '↻ Refresh Leads'}
                      </button>
                      <button onClick={handleExportCSV} className="btn btn-gold" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                        <Download size={14} style={{ marginRight: '0.3rem' }} /> Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Leads List */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filteredLeads.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        No student inquiries found.
                      </div>
                    ) : (
                      filteredLeads.map((lead) => (
                        <div
                          key={lead.id || lead.reference_id}
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1.15rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                          }}
                        >
                          <div style={{ flex: '1 1 300px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{lead.fullName}</span>
                              <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.72rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>{lead.id}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: '#475569', marginBottom: '0.3rem' }}>
                              <span style={{ fontWeight: 600, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={13} /> {lead.mobile}</span>
                              {lead.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={13} /> {lead.email}</span>}
                              {lead.city && <span>📍 {lead.city}</span>}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#334155' }}>Course: <strong>{lead.stream}</strong> • Budget: <strong>{lead.budget || 'N/A'}</strong></div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #cbd5e1' }}
                            >
                              <option value="New / Pending Call">New / Pending Call</option>
                              <option value="Called / In Counseling">Called / In Counseling</option>
                              <option value="Application Submitted">Application Submitted</option>
                              <option value="Admitted / Enrolled">Admitted / Enrolled</option>
                              <option value="Not Interested">Not Interested</option>
                            </select>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <a href={`tel:${lead.mobile}`} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#ecfdf5', color: '#065f46', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>Call</a>
                              <a href={`https://wa.me/91${lead.mobile.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#25d366', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>WhatsApp</a>
                              <button onClick={() => handleDeleteLead(lead.id)} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', cursor: 'pointer' }}><Trash2 size={13} /></button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: RSS FEEDS & INGESTION */}
              {activeTab === 'rss' && (
                <RssSourceManager
                  sources={rssSources}
                  onSaveSource={handleSaveRssSource}
                  onDeleteSource={handleDeleteRssSource}
                  rssItems={rssItems}
                  onProcessItemWithAi={handleProcessRssItem}
                  onRefreshAllFeeds={handleRefreshAllFeeds}
                  isFetching={isFetchingRss}
                />
              )}

              {/* TAB 4: AUTOMATION & AI RULES */}
              {activeTab === 'settings' && (
                <AutomationSettingsModal
                  settings={automationSettings}
                  onSaveSettings={handleSaveAutomationSettings}
                  aiLogs={aiLogs}
                />
              )}

              {/* TAB 5: XML SITEMAP & SEO */}
              {activeTab === 'sitemap' && (
                <SitemapViewer articles={articles} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
