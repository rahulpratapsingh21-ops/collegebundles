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
      style={{
        position: 'relative',
        backgroundColor: '#09101d',
        color: '#ffffff',
        paddingTop: '2.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Campus Image with Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-campus.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.28,
        }}
      />
      
      {/* Multi-gradient backdrop overlay for high contrast and modern edtech vibe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9, 16, 29, 0.88) 0%, rgba(9, 16, 29, 0.96) 100%), radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 60%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Feature Pill: AI Counselor Launch Alert */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={onOpenAICounselor}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(124, 58, 237, 0.2)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              backdropFilter: 'blur(10px)',
              padding: '0.4rem 1.1rem',
              borderRadius: '999px',
              color: '#c4b5fd',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.35)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Sparkles size={16} color="#a78bfa" />
            <span>AI College & Cutoff Advisor Live:</span>
            <span style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Check Admission Probability Now &rarr;
            </span>
          </button>
        </div>

        {/* Hero Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Headlines & Action Buttons */}
          <div style={{ textAlign: 'center' }} className="hero-left-content">
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.25rem',
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
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#cbd5e1',
                maxWidth: '750px',
                margin: '0 auto 2rem auto',
                lineHeight: 1.6,
              }}
            >
              India’s comprehensive educational intelligence platform. Get real-time admission cutoffs, fee structures, UGC-DEB verified online degrees, and 1-on-1 counseling support.
            </p>

            {/* Quick Stream Filters */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.6rem',
                marginBottom: '2rem',
              }}
            >
              {streamChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectCategory(chip.category);
                    onScrollToSection('news-section');
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '999px',
                    color: '#f1f5f9',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
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
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              {/* Phone Hotline Button: 8802155810 */}
              <a
                href="tel:8802155810"
                className="btn btn-call"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                }}
              >
                <Phone size={20} />
                <span>Call Helpline: 8802155810</span>
              </a>

              {/* AI College Finder */}
              <button
                onClick={onOpenAICounselor}
                className="btn btn-ai"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                }}
              >
                <Sparkles size={20} />
                <span>Use AI College Finder</span>
              </button>

              {/* Get Free Counseling Lead Modal */}
              <button
                onClick={() => onOpenLeadModal('Hero Primary CTA')}
                className="btn btn-gold"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                }}
              >
                <span>Get Free Counseling & Brochure</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Metrics Counters */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                maxWidth: '850px',
                margin: '0 auto',
                padding: '1.25rem',
                borderRadius: '16px',
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>
                  50,000+
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  Students Counseled
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-heading)' }}>
                  400+
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  Verified Partner Colleges
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>
                  50% Off
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  Scholarship Assistance
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-heading)' }}>
                  100% Free
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  Counseling Hotline: 8802155810
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
