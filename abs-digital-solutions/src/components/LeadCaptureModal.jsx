import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  MessageCircle,
  FileText,
  Loader2,
  Database
} from 'lucide-react';
import { saveLead } from '../lib/supabaseClient';

export default function LeadCaptureModal({ source = 'General Inquiry', onClose, onLeadCaptured }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    stream: 'Management (MBA/PGDM)',
    city: '',
    budget: '₹2 Lakhs - ₹5 Lakhs',
    query: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavedToBackend, setIsSavedToBackend] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const generatedId = 'CB-' + Math.floor(100000 + Math.random() * 900000);
    const newLead = {
      id: generatedId,
      reference_id: generatedId,
      ...formData,
      source,
      date: new Date().toLocaleString(),
      status: 'New / Pending Call',
    };

    try {
      const result = await saveLead(newLead);
      setIsSavedToBackend(result.remoteSuccess);
      if (onLeadCaptured) onLeadCaptured(newLead);
    } catch (err) {
      console.error('Lead storage error', err);
    } finally {
      setIsSubmitting(false);
    }

    setLeadId(generatedId);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content lead-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '620px' }}
      >
        {/* Sticky Header with prominent close button */}
        <div
          className="modal-header-box"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '1rem 1.25rem',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
              <span
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.65rem',
                  padding: '0.12rem 0.45rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                }}
              >
                100% Free
              </span>
              <span style={{ fontSize: '0.72rem', color: '#6ee7b7', fontWeight: 600 }}>
                Helpline: 8802155810
              </span>
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Free 1-on-1 Admission Counseling
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body-box" style={{ padding: '1.25rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                Application Received!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                Thank you, <strong>{formData.fullName}</strong>. Reference ID:{' '}
                <strong style={{ color: '#1d4ed8' }}>{leadId}</strong>.
              </p>
              {isSavedToBackend && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.85rem' }}>
                  <Database size={12} />
                  <span>Verified & Saved in Backend</span>
                </div>
              )}
              <p style={{ color: '#64748b', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                Our Senior Admission Counselor for <strong>{formData.stream}</strong> will contact you at{' '}
                <strong>{formData.mobile}</strong> within 15 minutes.
              </p>

              {/* Direct Instant Hotline Options */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.65rem' }}>
                  Need Instant Guidance Right Now?
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href="tel:8802155810" className="btn btn-call" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                    <Phone size={15} /> 8802155810
                  </a>
                  <a
                    href={`https://wa.me/918802155810?text=Hi%20CollegeBundle,%20my%20lead%20ID%20is%20${leadId}.%20I%20need%20immediate%20guidance%20for%20${encodeURIComponent(formData.stream)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#25d366',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
              </div>

              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%', padding: '0.65rem' }}>
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.85rem' }}>
                Fill out details to get cutoffs, admission brochures & scholarship help:
              </p>

              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                    }}
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Mobile Number * (Call/WhatsApp)
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                    }}
                    required
                  />
                </div>

                {/* Stream / Course Interested In */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Stream / Course *
                  </label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      fontSize: '0.88rem',
                    }}
                  >
                    <option value="Medical (MBBS/BDS/AYUSH)">Medical (MBBS / BDS / AYUSH)</option>
                    <option value="Engineering (B.Tech/M.Tech)">Engineering (B.Tech / M.Tech)</option>
                    <option value="Management (MBA/PGDM)">Management (MBA / PGDM)</option>
                    <option value="Online Degree (MBA/MCA/BCA/BBA)">Online Degree (MBA / MCA / BCA / BBA)</option>
                    <option value="Study Abroad / Global Degree">Study Abroad / Global Degree</option>
                  </select>
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                    }}
                    required
                  />
                </div>

                {/* City / State */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Current City / State
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, Patna, Bangalore..."
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>

                {/* Target Budget */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="modal-input"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      fontSize: '0.88rem',
                    }}
                  >
                    <option value="Under ₹1 Lakh">Under ₹1 Lakh (Online & Affordable)</option>
                    <option value="₹1 - ₹3 Lakhs">₹1 - ₹3 Lakhs</option>
                    <option value="₹3 - ₹7 Lakhs">₹3 - ₹7 Lakhs</option>
                    <option value="₹7 - ₹15 Lakhs">₹7 - ₹15 Lakhs</option>
                    <option value="Above ₹15 Lakhs">Above ₹15 Lakhs</option>
                  </select>
                </div>
              </div>

              {/* Message / Query - Compact 1-row */}
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                  Specific College or Query (Optional)
                </label>
                <input
                  type="text"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="e.g., Looking for scholarship, NEET cutoff..."
                  className="modal-input"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              {/* Privacy and Free Guarantee Notice */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.74rem',
                  color: '#64748b',
                  marginBottom: '0.85rem',
                }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>
                  100% Privacy Protected · Zero Spam · Free Guidance by Counselors
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Connecting Counselor...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Get Free Counseling & Cutoffs (8802155810)</span>
                  </>
                )}
              </button>

              {/* Dismiss / Later Link */}
              <div style={{ textAlign: 'center', marginTop: '0.65rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '0.2rem',
                  }}
                >
                  I'll browse colleges first (Close)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Modal Mobile Responsiveness Styles */}
      <style>{`
        @media (max-width: 640px) {
          .modal-header-box {
            padding: 0.75rem 1rem !important;
          }
          .modal-title {
            font-size: 1rem !important;
          }
          .modal-body-box {
            padding: 0.85rem 0.95rem !important;
          }
          .modal-form-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
            margin-bottom: 0.6rem !important;
          }
          .modal-form-grid > div:nth-child(1),
          .modal-form-grid > div:nth-child(2),
          .modal-form-grid > div:nth-child(3),
          .modal-form-grid > div:nth-child(4) {
            grid-column: 1 / -1;
          }
          .modal-input {
            padding: 0.48rem 0.65rem !important;
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
}
