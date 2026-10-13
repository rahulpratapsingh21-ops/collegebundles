import React, { useState } from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, MessageCircle, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenLeadModal, onOpenAICounselor, onOpenAdminDrawer }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: '#09101d', color: '#f8fafc', paddingTop: '4rem', paddingBottom: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        {/* Top Newsletter & Advisory Banner */}
        <div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stay Ahead of Admission Cutoffs
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '0.35rem 0' }}>
              Subscribe to CollegeBundle Admission Alerts
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
              Receive instant SMS/email alerts on NEET state seat matrix, JoSAA rounds, and online degree scholarship windows.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: '280px', maxWidth: '420px' }}>
            {subscribed ? (
              <div style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
                ✔ Thank you for subscribing! You will receive verified news bulletins.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Column 1: Brand Info & Direct Hotline */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="normal" inverted={true} />
            </div>

            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              CollegeBundles.in is India’s foremost educational news and admission counseling network. Covering Medical, Engineering, Management, and UGC-DEB entitled Online Degrees.
            </p>

            {/* Helpline Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '12px',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Admission Hotline 2026
              </div>
              <a
                href="tel:8802155810"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Phone size={18} color="#10b981" />
                <span>8802155810</span>
              </a>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                Free Student & Parent Advisory Desk
              </div>
            </div>
          </div>

          {/* Column 2: Medical & Healthcare News */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '2px solid #15803d', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Medical (NEET / MBBS)
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('medical')}
                  style={{ color: '#cbd5e1', transition: 'color 0.2s' }}
                >
                  NEET UG 2026 Cutoffs & Ranks
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('medical')}
                  style={{ color: '#cbd5e1' }}
                >
                  NMC State Quota Seat Matrix
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('medical')}
                  style={{ color: '#cbd5e1' }}
                >
                  AIIMS & Govt Medical Colleges
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('medical')}
                  style={{ color: '#cbd5e1' }}
                >
                  Private MBBS Low Fee Packages
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('medical')}
                  style={{ color: '#cbd5e1' }}
                >
                  BDS, BAMS & AYUSH Counselling
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering & Management */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Engineering & Management
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('engineering')}
                  style={{ color: '#cbd5e1' }}
                >
                  JEE Main 2026 JoSAA Matrix
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('engineering')}
                  style={{ color: '#cbd5e1' }}
                >
                  B.Tech in Artificial Intelligence
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('engineering')}
                  style={{ color: '#cbd5e1' }}
                >
                  Top IITs, NITs & IIITs Cutoffs
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('management')}
                  style={{ color: '#cbd5e1' }}
                >
                  CAT Percentile vs IIM Calls
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('management')}
                  style={{ color: '#cbd5e1' }}
                >
                  Top 50 Non-IIM Business Schools
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Online & Quick Tools */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '2px solid #7e22ce', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Online
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
              <li>
                <a
                  href="#online-guide-section"
                  style={{ color: '#cbd5e1' }}
                >
                  UGC-DEB Entitlement Register
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('online')}
                  style={{ color: '#cbd5e1' }}
                >
                  Online MBA Specializations
                </a>
              </li>
              <li>
                <a
                  href="#news-section"
                  onClick={() => onSelectCategory('online')}
                  style={{ color: '#cbd5e1' }}
                >
                  Online MCA & BCA Degrees
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAICounselor}
                  style={{
                    color: '#c4b5fd',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Sparkles size={14} /> AI College Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLeadModal('Footer Counselor Link')}
                  style={{ color: '#f59e0b', fontWeight: 700 }}
                >
                  Request 50% Scholarship
                </button>
              </li>
              {onOpenAdminDrawer && (
                <li>
                  <button
                    onClick={onOpenAdminDrawer}
                    style={{ color: '#64748b', fontSize: '0.75rem', textDecoration: 'underline' }}
                  >
                    Site Owner Leads CRM
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>CollegeBundles.in</strong>. All Rights Reserved. Empowering education seekers across India.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Helpline: <strong>8802155810</strong></span>
            <span>UGC-DEB & AICTE Information Portal</span>
            <span>Privacy Policy</span>
            <span>Terms of Advisory</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
