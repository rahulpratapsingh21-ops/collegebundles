import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Phone, 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  Stethoscope, 
  Laptop, 
  Briefcase, 
  Globe, 
  Scale, 
  MessageCircle,
  ChevronRight
} from 'lucide-react';

export default function Navbar({
  activeCategory,
  onSelectCategory,
  onOpenAICounselor,
  onOpenLeadModal,
  searchQuery,
  setSearchQuery,
  onScrollToSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'news', label: 'News', icon: GraduationCap },
    { id: 'medical', label: 'Medical (NEET/MBBS)', icon: Stethoscope },
    { id: 'engineering', label: 'Engineering (B.Tech)', icon: Laptop },
    { id: 'management', label: 'Management (MBA)', icon: Briefcase },
    { id: 'online', label: 'Online', icon: Globe },
    { id: 'compare', label: 'Compare', icon: Scale },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'compare') {
      onScrollToSection('compare-section');
    } else if (id === 'news') {
      onSelectCategory('all');
      onScrollToSection('news-section');
    } else {
      onSelectCategory(id);
      onScrollToSection('news-section');
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          className="container navbar-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            gap: '1rem',
            maxWidth: '100%',
          }}
        >
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ textDecoration: 'none' }}
          >
            <Logo size="normal" />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#1d4ed8' : '#334155',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon size={15} color={isActive ? '#1d4ed8' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* AI Advisor Special Pill Link */}
            <button
              onClick={onOpenAICounselor}
              className="btn-ai"
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                marginLeft: '0.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Sparkles size={14} />
              <span>AI Advisor</span>
            </button>
          </nav>

          {/* Right Action Items: Phone, Search, Lead Button */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Search Input on Desktop */}
            <div
              style={{
                position: 'relative',
                display: 'none',
                alignItems: 'center',
              }}
              className="desktop-search"
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '10px',
                  color: '#94a3b8',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college, course, cutoff..."
                style={{
                  padding: '0.45rem 0.75rem 0.45rem 2rem',
                  fontSize: '0.8125rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px',
                  backgroundColor: '#f8fafc',
                  width: '210px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.width = '260px';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.width = '210px';
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.backgroundColor = '#f8fafc';
                }}
              />
            </div>

            {/* Phone Hotline Badge (Required: 8802155810) */}
            <a
              href="tel:8802155810"
              className="phone-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                color: '#065f46',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.15)',
                transition: 'all 0.2s',
              }}
              title="Call Helpline: 8802155810"
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Phone size={13} fill="#ffffff" />
              </div>
              <span className="phone-text">8802155810</span>
            </a>

            {/* "Free Counseling" Lead CTA Button */}
            <button
              onClick={() => onOpenLeadModal('Navbar Lead CTA')}
              className="btn btn-primary"
              style={{
                display: 'none',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
              }}
              id="counseling-btn-desktop"
            >
              Free Counseling
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '8px',
                color: '#0f172a',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
              }}
              className="mobile-hamburger"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Visible only on mobile) */}
        <div
          style={{
            padding: '0.5rem 1.25rem 0.75rem',
            borderTop: '1px solid #f1f5f9',
            display: 'none',
          }}
          className="mobile-search-bar"
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, cutoffs, engineering, medical..."
              style={{
                width: '100%',
                padding: '0.55rem 1rem 0.55rem 2.25rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',
              }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            zIndex: 90,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '340px',
              backgroundColor: '#ffffff',
              height: '100%',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 25px rgba(0,0,0,0.15)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <Logo size="small" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.4rem',
                  borderRadius: '6px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* AI Advisor Button inside Drawer */}
            <div style={{ marginBottom: '1.25rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAICounselor();
                }}
                className="btn-ai"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                }}
              >
                <Sparkles size={18} />
                <span>Launch AI College Finder</span>
              </button>
            </div>

            {/* Navigation Category Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700, marginBottom: '0.25rem' }}>
                Browse Streams & News
              </p>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Icon size={18} color="#2563eb" />
                      {item.label}
                    </span>
                    <ChevronRight size={16} color="#94a3b8" />
                  </button>
                );
              })}
            </div>

            {/* Quick Contact & Lead Support */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="tel:8802155810"
                className="btn btn-call"
                style={{ width: '100%' }}
              >
                <Phone size={16} />
                <span>Call Helpline: 8802155810</span>
              </a>

              <a
                href="https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20am%20looking%20for%20admission%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Counselor</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadModal('Mobile Drawer');
                }}
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                <span>Request Free Callback</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Style adjustments for responsive navbar */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-search {
            display: flex !important;
          }
          #counseling-btn-desktop {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-search-bar {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .navbar-container {
            height: 60px !important;
            gap: 0.5rem !important;
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          .navbar-actions {
            gap: 0.45rem !important;
          }
          .phone-text {
            display: none !important;
          }
          .phone-badge {
            padding: 0.45rem !important;
            border-radius: 50% !important;
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            justify-content: center !important;
            gap: 0 !important;
            flex-shrink: 0 !important;
          }
          .phone-badge div {
            width: 22px !important;
            height: 22px !important;
          }
        }
        @media (max-width: 400px) {
          .mobile-hamburger {
            padding: 0.35rem !important;
          }
        }
        @media (max-width: 360px) {
          .navbar-container {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            gap: 0.25rem !important;
          }
          .navbar-actions {
            gap: 0.25rem !important;
          }
          .phone-badge {
            width: 34px !important;
            height: 34px !important;
            min-width: 34px !important;
          }
        }
      `}</style>
    </>
  );
}
