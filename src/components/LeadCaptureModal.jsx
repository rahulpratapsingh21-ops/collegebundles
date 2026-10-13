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
  FileText 
} from 'lucide-react';

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
  const [leadId, setLeadId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
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

    const generatedId = 'CB-' + Math.floor(100000 + Math.random() * 900000);
    const newLead = {
      id: generatedId,
      ...formData,
      source,
      date: new Date().toLocaleString(),
      status: 'New / Pending Call',
    };

    // Save to LocalStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('collegebundle_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('collegebundle_leads', JSON.stringify(existingLeads));
      if (onLeadCaptured) onLeadCaptured(newLead);
    } catch (err) {
      console.error('Lead storage error', err);
    }

    setLeadId(generatedId);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                }}
              >
                100% Free Guidance
              </span>
              <span style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 600 }}>
                Helpline: 8802155810
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              Get Free 1-on-1 Admission Counseling
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
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Application Received!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>
                Thank you, <strong>{formData.fullName}</strong>. Your inquiry reference is{' '}
                <strong style={{ color: '#1d4ed8' }}>{leadId}</strong>.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
                Our Senior Admission Counselor for <strong>{formData.stream}</strong> will call you at{' '}
                <strong>{formData.mobile}</strong> within 15 minutes to share college cutoffs, fee structures, and scholarship options.
              </p>

              {/* Direct Instant Hotline Options */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                  Want Instant Assistance Right Now?
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href="tel:8802155810" className="btn btn-call" style={{ fontSize: '0.9rem' }}>
                    <Phone size={16} /> Call 8802155810
                  </a>
                  <a
                    href={`https://wa.me/918802155810?text=Hi%20CollegeBundle,%20my%20lead%20ID%20is%20${leadId}.%20I%20need%20immediate%20guidance%20for%20${encodeURIComponent(formData.stream)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '10px',
                      backgroundColor: '#25d366',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp Now
                  </a>
                </div>
              </div>

              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Fill out the details below to receive cutoffs, verified admission brochures, and up to 50% scholarship assistance.
              </p>

              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                    }}
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Mobile Number * (For Call/WhatsApp)
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                    }}
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                    }}
                    required
                  />
                </div>

                {/* Stream / Course Interested In */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Stream / Program of Interest *
                  </label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="Medical (MBBS/BDS/AYUSH)">Medical (MBBS / BDS / AYUSH)</option>
                    <option value="Engineering (B.Tech/M.Tech)">Engineering (B.Tech / M.Tech)</option>
                    <option value="Management (MBA/PGDM)">Management (MBA / PGDM)</option>
                    <option value="Online Degree (MBA/MCA/BCA/BBA)">Online Degree (MBA / MCA / BCA / BBA)</option>
                    <option value="Study Abroad / Global Degree">Study Abroad / Global Degree</option>
                  </select>
                </div>

                {/* City / State */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Current City / State
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, Lucknow, Patna, Bangalore..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                    }}
                  />
                </div>

                {/* Target Budget */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Preferred Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="Under ₹1 Lakh">Under ₹1 Lakh (Online & Affordable)</option>
                    <option value="₹1 - ₹3 Lakhs">₹1 - ₹3 Lakhs</option>
                    <option value="₹3 - ₹7 Lakhs">₹3 - ₹7 Lakhs</option>
                    <option value="₹7 - ₹15 Lakhs">₹7 - ₹15 Lakhs (Top Tier Colleges)</option>
                    <option value="Above ₹15 Lakhs">Above ₹15 Lakhs (Medical / Private)</option>
                  </select>
                </div>
              </div>

              {/* Message / Query */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Specific College or Query (Optional)
                </label>
                <textarea
                  name="query"
                  rows={2}
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="e.g., Looking for scholarship, NEET cutoff for my score, Amity vs LPU comparison..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Privacy and Free Guarantee Notice */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#64748b',
                  marginBottom: '1.25rem',
                }}
              >
                <ShieldCheck size={16} color="#10b981" />
                <span>
                  100% Privacy Protected. No spam guarantee. Free consultation by CollegeBundle counselors.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  borderRadius: '10px',
                }}
              >
                <Send size={18} />
                <span>Submit & Connect with Counselor (8802155810)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
