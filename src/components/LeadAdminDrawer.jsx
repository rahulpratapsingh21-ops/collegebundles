import React, { useState, useEffect } from 'react';
import { X, Download, Phone, Mail, User, Trash2, CheckCircle, RefreshCw, FileSpreadsheet, Database, Loader2 } from 'lucide-react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../lib/supabaseClient';

export default function LeadAdminDrawer({ isOpen, onClose }) {
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
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
        style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
      >
        {/* Header */}
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
              onClick={onClose}
              style={{
                padding: '0.4rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                cursor: 'pointer',
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
                  key={lead.id}
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
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                        {lead.fullName}
                      </span>
                      <span style={{ fontSize: '0.72rem', backgroundColor: '#f1f5f9', color: '#475569', padding: '0.15rem 0.45rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                        {lead.id}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.4rem' }}>
                      <a href={`tel:${lead.mobile}`} style={{ color: '#059669', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Phone size={13} /> {lead.mobile}
                      </a>
                      <a href={`mailto:${lead.email}`} style={{ color: '#1d4ed8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Mail size={13} /> {lead.email}
                      </a>
                      {lead.city && <span>📍 {lead.city}</span>}
                    </div>

                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>
                      Course: <span style={{ color: '#1d4ed8' }}>{lead.stream}</span> • Budget: {lead.budget}
                    </div>

                    {lead.query && (
                      <div style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', backgroundColor: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                        "{lead.query}"
                      </div>
                    )}

                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                      Captured on: {lead.date} ({lead.source})
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        backgroundColor: lead.status.includes('New') ? '#eff6ff' : lead.status.includes('Called') ? '#fef3c7' : '#ecfdf5',
                        border: '1px solid #cbd5e1',
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
      </div>
    </div>
  );
}
