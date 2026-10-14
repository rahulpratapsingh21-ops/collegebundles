import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Phone, 
  Mail, 
  User, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  FileSpreadsheet, 
  Database, 
  Loader2,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../lib/supabaseClient';

// Allowed Admin Passcodes
const VALID_PASSCODES = ['admin@2026', '8802155810', 'admin8802'];

export default function LeadAdminDrawer({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('cb_admin_authenticated') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState('supabase');

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

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadLeads();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    const cleanInput = passcode.trim();
    if (VALID_PASSCODES.includes(cleanInput)) {
      sessionStorage.setItem('cb_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('');
      loadLeads();
    } else {
      setAuthError('Incorrect passcode. Access is restricted to authorized site administrators.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('cb_admin_authenticated');
    setIsAuthenticated(false);
    setLeads([]);
    setPasscode('');
    setAuthError('');
  };

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
    if (leads.length === 0) return alert('No leads to export.');
    const headers = ['Lead ID', 'Full Name', 'Phone', 'Email', 'Stream', 'City', 'Budget', 'Date', 'Status', 'Source'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      l.mobile,
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
          maxWidth: isAuthenticated ? '920px' : '460px', 
          display: 'flex', 
          flexDirection: 'column', 
          maxHeight: '90vh',
          transition: 'max-width 0.3s ease'
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
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  Administrator Verification
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
                Restricted Access
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.45' }}>
                This portal contains private student leads and applicant phone numbers. Please enter your administrator passcode to continue.
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
                  <span>Unlock Lead Manager</span>
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                Helpline Administrator Key: Default helpline PIN or master pass
              </div>
            </div>
          </div>
        ) : (
          /* ================= IF AUTHENTICATED: SHOW FULL CRM DRAWER ================= */
          <>
            {/* Unlocked Header */}
            <div
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '1.25rem 1.5rem',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                    CollegeBundle Lead Manager (Admin CRM)
                  </h3>
                  <span
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                    }}
                  >
                    {leads.length} Leads
                  </span>
                  <span
                    style={{
                      backgroundColor: dataSource === 'supabase' ? '#065f46' : '#92400e',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Database size={11} />
                    {dataSource === 'supabase' ? 'Supabase Live DB' : 'Local Cache'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                  Official Helpline for Followups: 8802155810
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleExportCSV}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                  title="Download Leads to CSV file"
                >
                  <Download size={14} /> Export CSV
                </button>
                <button
                  onClick={handleLock}
                  style={{
                    padding: '0.45rem 0.75rem',
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
                  title="Lock CRM and Logout"
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
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Search & Actions Bar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads by name, phone, course..."
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  width: '100%',
                  maxWidth: '380px',
                  fontSize: '0.85rem',
                }}
              />

              <button
                onClick={loadLeads}
                disabled={isRefreshing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: '#1d4ed8',
                  fontWeight: 600,
                  cursor: isRefreshing ? 'not-allowed' : 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                {isRefreshing ? (
                  <>
                    <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Syncing Supabase...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} />
                    <span>Refresh Leads</span>
                  </>
                )}
              </button>
            </div>

            {/* Leads Table */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {filteredLeads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                  No leads found. Submit an admission form to see it appear here live!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id || lead.reference_id}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                            {lead.fullName}
                          </span>
                          <span
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              fontSize: '0.72rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              fontFamily: 'monospace',
                            }}
                          >
                            {lead.id}
                          </span>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.85rem',
                            color: '#475569',
                            marginBottom: '0.4rem',
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: '#059669' }}>
                            <Phone size={14} /> {lead.mobile}
                          </span>
                          {lead.email && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Mail size={14} /> {lead.email}
                            </span>
                          )}
                          {lead.city && <span>📍 {lead.city}</span>}
                        </div>

                        <div style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '0.4rem' }}>
                          Course: <strong>{lead.stream}</strong> • Budget: <strong>{lead.budget || 'Not specified'}</strong>
                        </div>

                        {lead.query && (
                          <div
                            style={{
                              backgroundColor: '#f8fafc',
                              padding: '0.4rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              color: '#64748b',
                              fontStyle: 'italic',
                              marginBottom: '0.4rem',
                            }}
                          >
                            "{lead.query}"
                          </div>
                        )}

                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          Captured on: {lead.date} ({lead.source || 'Website'})
                        </div>
                      </div>

                      {/* Right Side Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            border: '1px solid #cbd5e1',
                            backgroundColor:
                              lead.status.includes('New')
                                ? '#fef3c7'
                                : lead.status.includes('Called')
                                ? '#dbeafe'
                                : lead.status.includes('Admitted')
                                ? '#dcfce7'
                                : '#ffffff',
                            color:
                              lead.status.includes('New')
                                ? '#92400e'
                                : lead.status.includes('Called')
                                ? '#1e40af'
                                : lead.status.includes('Admitted')
                                ? '#166534'
                                : '#334155',
                          }}
                        >
                          <option value="New / Pending Call">New / Pending Call</option>
                          <option value="Called / In Counseling">Called / In Counseling</option>
                          <option value="Application Submitted">Application Submitted</option>
                          <option value="Admitted / Enrolled">Admitted / Enrolled</option>
                          <option value="Not Interested">Not Interested</option>
                        </select>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <a
                            href={`tel:${lead.mobile}`}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '6px',
                              backgroundColor: '#ecfdf5',
                              color: '#065f46',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                            }}
                          >
                            <Phone size={12} /> Call
                          </a>
                          <a
                            href={`https://wa.me/91${lead.mobile.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)},%20this%20is%20from%20CollegeBundle.com%20regarding%20your%20${encodeURIComponent(lead.stream)}%20counseling%20request.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '6px',
                              backgroundColor: '#25d366',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            WhatsApp
                          </a>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            style={{
                              padding: '0.35rem',
                              borderRadius: '6px',
                              backgroundColor: '#fee2e2',
                              color: '#b91c1c',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            title="Delete lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
