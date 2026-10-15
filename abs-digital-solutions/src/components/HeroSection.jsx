import React, { useState } from 'react';
import { 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Award, 
  Users, 
  BookOpen, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function HeroSection({
  onOpenAICounselor,
  onOpenLeadModal,
  onSelectCategory,
  onScrollToSection
}) {
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onScrollToSection('news-section');
    }
  };

  const streamChips = [
    { label: '🩺 Medical (MBBS/NEET)', category: 'medical' },
    { label: '⚙️ Engineering (B.Tech)', category: 'engineering' },
    { label: '💼 Management (MBA/PGDM)', category: 'management' },
    { label: '🌐 Online Degrees', category: 'online' },
  ];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        backgroundColor: '#09101d',
        color: '#ffffff',
        paddingTop: '2.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Campus Image with Enhanced Visibility */}
      <div
        className="hero-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-campus.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.42,
        }}
      />
      
      {/* Refined gradient backdrop overlay for high contrast and campus visibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9, 16, 29, 0.72) 0%, rgba(9, 16, 29, 0.90) 100%), radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.28) 0%, transparent 70%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Feature Pill: AI Counselor Launch Alert */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <button
            onClick={onOpenAICounselor}
            className="hero-ai-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(124, 58, 237, 0.22)',
              border: '1px solid rgba(167, 139, 250, 0.45)',
              backdropFilter: 'blur(10px)',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              color: '#c4b5fd',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.35)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.22)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Sparkles size={15} color="#a78bfa" />
            <span className="hero-ai-pill-text">AI College & Cutoff Advisor Live:</span>
            <span style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Check Cutoffs Now &rarr;
            </span>
          </button>
        </div>

        {/* Hero Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '2rem',
            alignItems: 'center',
            width: '100%',
          }}
          className="hero-grid"
        >
          {/* Main Column: Headlines & Action Buttons */}
          <div style={{ textAlign: 'center', minWidth: 0, width: '100%' }} className="hero-left-content">
            <h1
              className="hero-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              Discover Top Colleges & Verified News on{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CollegeBundles.in
              </span>
            </h1>

            <p
              className="hero-subtitle"
              style={{
                fontSize: 'clamp(0.92rem, 1.8vw, 1.12rem)',
                color: '#cbd5e1',
                maxWidth: '720px',
                margin: '0 auto 1.5rem auto',
                lineHeight: 1.55,
              }}
            >
              India’s comprehensive educational intelligence platform. Get real-time admission cutoffs, fee structures, UGC-DEB verified online degrees, and 1-on-1 counseling support.
            </p>

            {/* Quick Stream Filters - Swipeable on Mobile */}
            <div
              className="hero-chips-container no-scrollbar"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1.75rem',
                maxWidth: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {streamChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectCategory(chip.category);
                    onScrollToSection('news-section');
                  }}
                  className="hero-chip-btn"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '999px',
                    color: '#f1f5f9',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.35)';
                    e.currentTarget.style.borderColor = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div
              className="hero-btn-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.85rem',
                marginBottom: '2rem',
              }}
            >
              {/* Phone Hotline Button: 8802155810 */}
              <a
                href="tel:8802155810"
                className="btn btn-call hero-cta-call"
                style={{
                  padding: '0.8rem 1.6rem',
                  fontSize: '0.98rem',
                  borderRadius: '12px',
                }}
              >
                <Phone size={18} />
                <span>Call Helpline: 8802155810</span>
              </a>

              {/* AI College Finder */}
              <button
                onClick={onOpenAICounselor}
                className="btn btn-ai hero-cta-ai"
                style={{
                  padding: '0.8rem 1.4rem',
                  fontSize: '0.98rem',
                  borderRadius: '12px',
                }}
              >
                <Sparkles size={18} />
                <span>AI College Finder</span>
              </button>

              {/* Get Free Counseling Lead Modal */}
              <button
                onClick={() => onOpenLeadModal('Hero Primary CTA')}
                className="btn btn-gold hero-cta-lead"
                style={{
                  padding: '0.8rem 1.4rem',
                  fontSize: '0.98rem',
                  borderRadius: '12px',
                }}
              >
                <span>Free Counseling</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Trust Metrics Counters */}
            <div
              className="hero-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                maxWidth: '850px',
                margin: '0 auto',
                padding: '1.1rem',
                borderRadius: '16px',
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>
                  50,000+
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                  Students Counseled
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-heading)' }}>
                  400+
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                  Partner Colleges
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>
                  50% Off
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                  Scholarship Help
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-heading)' }}>
                  100% Free
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                  Hotline: 8802155810
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Styling for Hero Banner */}
      <style>{`
        @media (max-width: 640px) {
          .hero-section {
            padding-top: 1.25rem !important;
            padding-bottom: 2rem !important;
          }
          .hero-bg-image {
            opacity: 0.45 !important;
            background-position: center top !important;
          }
          .hero-title {
            font-size: 1.6rem !important;
            line-height: 1.22 !important;
            margin-bottom: 0.75rem !important;
          }
          .hero-subtitle {
            font-size: 0.85rem !important;
            line-height: 1.45 !important;
            margin-bottom: 1.1rem !important;
          }
          .hero-ai-pill {
            font-size: 0.75rem !important;
            padding: 0.25rem 0.75rem !important;
          }
          .hero-ai-pill-text {
            display: none;
          }
          .hero-left-content {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .hero-chips-container {
            justify-content: flex-start !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            max-width: 100% !important;
            padding-bottom: 0.25rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-chip-btn {
            font-size: 0.75rem !important;
            padding: 0.35rem 0.75rem !important;
          }
          .hero-btn-group {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .hero-cta-call {
            grid-column: 1 / -1 !important;
            width: 100% !important;
            padding: 0.7rem 1rem !important;
            font-size: 0.92rem !important;
          }
          .hero-cta-ai, .hero-cta-lead {
            width: 100% !important;
            padding: 0.65rem 0.5rem !important;
            font-size: 0.82rem !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
            padding: 0.75rem 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
