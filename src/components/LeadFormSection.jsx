import React, { useState } from 'react';
import { Phone, CheckCircle2, Send, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export default function LeadFormSection({ onLeadCaptured }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    stream: 'Management (MBA/PGDM)',
    city: '',
    budget: '₹2 Lakhs - ₹5 Lakhs',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const newLead = {
      id: 'CB-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      source: 'In-Page Form Section',
      date: new Date().toLocaleString(),
      status: 'New / Pending Call',
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('collegebundle_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('collegebundle_leads', JSON.stringify(existingLeads));
      if (onLeadCaptured) onLeadCaptured(newLead);
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  return (
    <section
      id="lead-section"
      style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Value Proposition & Contact Hotline */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>Free Admission Advisory 2026</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                color: '#ffffff',
                lineHeight: 1.25,
                marginBottom: '1.25rem',
              }}
            >
              Stuck Between Colleges?{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Let Our Experts Guide You.
              </span>
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Whether you need Medical NEET cutoff advice, Engineering seat matrix counseling, CAT/MBA ROI comparison, or UGC-DEB verified Online Degrees, our counselors have helped 50,000+ students secure their ideal admission.
            </p>

            {/* Direct Helpline Banner */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                Instant Telephone Helpline (10 AM - 8 PM)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="tel:8802155810"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#6ee7b7',
                    fontFamily: 'var(--font-heading)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Phone size={24} style={{ fill: '#10b981' }} />
                  <span>8802155810</span>
                </a>

                <a
                  href="https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20am%20seeking%20admission%20guidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25d366',
                    color: '#ffffff',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Counselor Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>100% Free Counseling with No Hidden Brokerage Fees</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Direct Access to Up to 50% University Scholarships</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Verified Approvals (NMC, AICTE, UGC-DEB, NAAC) Only</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Lead Capture Form Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                  Request Registered!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. A dedicated counselor will call you on <strong>{formData.mobile}</strong> shortly to share college options and cutoff analysis.
                </p>
                <a href="tel:8802155810" className="btn btn-call" style={{ width: '100%' }}>
                  <Phone size={16} /> Need Faster Answer? Call 8802155810
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                    Request Free Counseling Call
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Receive official brochures, seat vacancy lists, and cutoff analysis.
                  </p>
                </div>

                {errorMsg && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#b91c1c',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Stream of Interest *
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
                      <option value="Online Degree (MBA/MCA/BCA/BBA)">Online Degree (UGC-DEB)</option>
                      <option value="Study Abroad">Study Abroad / Global Degree</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Preferred Budget
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
                      <option value="Under ₹1.5 Lakhs">Under ₹1.5 Lakhs (Online / Low cost)</option>
                      <option value="₹2 - ₹5 Lakhs">₹2 - ₹5 Lakhs</option>
                      <option value="₹5 - ₹10 Lakhs">₹5 - ₹10 Lakhs</option>
                      <option value="Above ₹10 Lakhs">Above ₹10 Lakhs (Private / Deemed)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', borderRadius: '10px' }}
                >
                  <Send size={16} />
                  <span>Get Free Counseling & Callback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
