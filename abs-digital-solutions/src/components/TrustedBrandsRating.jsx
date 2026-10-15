import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function TrustedBrandsRating() {
  const brands = [
    {
      name: 'Magic Software',
      category: 'Strategic Client Partner',
      highlight: true,
      desc: 'Global EdTech & Digital Content Solutions',
      badge: '★ Featured Client',
    },
    {
      name: 'Pearson',
      category: 'Education & Assessment',
      highlight: false,
      desc: 'Global Learning Systems',
    },
    {
      name: 'Wiley',
      category: 'Research & Publishing',
      highlight: false,
      desc: 'Scientific & Academic Content',
    },
    {
      name: 'McGraw Hill',
      category: 'Higher Ed Courseware',
      highlight: false,
      desc: 'Interactive Digital Learning',
    },
    {
      name: 'Coursera',
      category: 'Global eLearning',
      highlight: false,
      desc: 'Enterprise Online Modules',
    },
    {
      name: 'Cengage',
      category: 'Curriculum & EdTech',
      highlight: false,
      desc: 'Accessible Digital Courseware',
    },
    {
      name: 'Macmillan',
      category: 'Academic Publishing',
      highlight: false,
      desc: 'Textbook & Media Accessibility',
    },
    {
      name: 'Instructure Canvas',
      category: 'LMS Ecosystem',
      highlight: false,
      desc: 'Global Higher Ed LMS Portal',
    },
    {
      name: 'Blackboard Learn',
      category: 'Enterprise LMS',
      highlight: false,
      desc: 'Inclusive Virtual Classroom',
    },
    {
      name: 'Oxford Press',
      category: 'Academic Publishing',
      highlight: false,
      desc: 'Scholarly Digital Assets',
    },
  ];

  return (
    <div id="trusted-brands-rating-wrapper">
      
      {/* =========================================================================
          PART 1: RATINGS STRIP (Exact Match to User Screenshot 3)
          Pitch Black background, Golden icons & stars, 4.5 / 4.6 / 4.8 ratings
         ========================================================================= */}
      <section
        style={{
          backgroundColor: '#000000',
          padding: '24px 0',
          borderTop: '1px solid rgba(245, 158, 11, 0.3)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="abs-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            
            {/* 1. GOOGLE Card (Screenshot 3: G icon in gold, GOOGLE, 4 stars filled, 1 empty, 4.5) */}
            <div
              style={{
                backgroundColor: '#0c0e14',
                border: '1px solid #1e2330',
                borderRadius: '16px',
                padding: '14px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                minWidth: '220px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Bold Golden G */}
              <div style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: '#f59e0b',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  G
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    letterSpacing: '1.5px',
                    fontFamily: 'monospace',
                  }}
                >
                  GOOGLE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  {/* 4 Filled Stars + 1 Outline Star */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="#f59e0b"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    {/* 5th empty star */}
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: 'monospace',
                    }}
                  >
                    4.5
                  </span>
                </div>
              </div>
            </div>

            {/* 2. CLUTCH Card (Screenshot 3: 6 golden dots icon, CLUTCH, 5 stars, 4.6) */}
            <div
              style={{
                backgroundColor: '#0c0e14',
                border: '1px solid #1e2330',
                borderRadius: '16px',
                padding: '14px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                minWidth: '220px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Clutch 6 Dots Matrix in Solid Golden/Amber */}
              <div style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 7px)',
                    gap: '4px',
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    letterSpacing: '1.5px',
                    fontFamily: 'monospace',
                  }}
                >
                  CLUTCH
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="#f59e0b"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: 'monospace',
                    }}
                  >
                    4.6
                  </span>
                </div>
              </div>
            </div>

            {/* 3. GOODFIRM Card (Screenshot 3: Golden Starburst badge, GOODFIRM, 5 stars, 4.8) */}
            <div
              style={{
                backgroundColor: '#0c0e14',
                border: '1px solid #1e2330',
                borderRadius: '16px',
                padding: '14px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                minWidth: '220px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Goodfirms Starburst Badge in Solid Golden */}
              <div style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="30" height="30" fill="#f59e0b">
                  <path d="M12 2l1.6 3.1 3.4-.6.7 3.4 3.2 1.3-1.1 3.3 2.1 2.7-2.6 2.3.2 3.5-3.4.7-1.5 3.1-3-1.7-3 1.7-1.5-3.1-3.4-.7.2-3.5-2.6-2.3 2.1-2.7-1.1-3.3 3.2-1.3.7-3.4 3.4.6z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    letterSpacing: '1.5px',
                    fontFamily: 'monospace',
                  }}
                >
                  GOODFIRM
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="#f59e0b"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: 'monospace',
                    }}
                  >
                    4.8
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 1.5: CLIENT METRICS COUNTER STRIP (Exact Match to User Screenshot)
          Dark navy background, 4 rounded cards, bright cyan numbers, clean white labels
         ========================================================================= */}
      <section
        style={{
          backgroundColor: '#0c1222',
          padding: '40px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}
      >
        <div className="abs-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Card 1: Happy Clients */}
            <div
              style={{
                backgroundColor: '#161f36',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '26px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#2dd4bf',
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                50+
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  marginTop: '10px',
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Happy Clients
              </div>
            </div>

            {/* Card 2: Projects Completed */}
            <div
              style={{
                backgroundColor: '#161f36',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '26px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#2dd4bf',
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                120+
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  marginTop: '10px',
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Projects Completed
              </div>
            </div>

            {/* Card 3: Running Projects */}
            <div
              style={{
                backgroundColor: '#161f36',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '26px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#2dd4bf',
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                25+
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  marginTop: '10px',
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Running Projects
              </div>
            </div>

            {/* Card 4: Dedicated Support */}
            <div
              style={{
                backgroundColor: '#161f36',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '26px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#2dd4bf',
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                24/7
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  marginTop: '10px',
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Dedicated Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 2: "TRUSTED BY GLOBAL BRANDS" SECTION (Exact Match to User Screenshot 1)
          Clean white background, huge bold black title, Magic Software featured client
         ========================================================================= */}
      <section
        style={{
          backgroundColor: '#ffffff',
          padding: '60px 0 70px 0',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div className="abs-container">
          
          {/* Section Heading (Screenshot 1: Huge Bold "Trusted by Global Brands") */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 900,
                color: '#081120',
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              Trusted by Global Brands
            </h2>
            <p
              style={{
                color: '#64748b',
                fontSize: '15px',
                lineHeight: 1.6,
                maxWidth: '650px',
                margin: '0 auto',
              }}
            >
              Delivering enterprise digital accessibility audits, PDF remediation, and next-gen AI search visibility to the world&apos;s leading education and technology companies.
            </p>
          </div>

          {/* Client Logos Grid - High-Resolution Brand Logos Only */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {/* 1. Magic Software */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #0c5adb',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 4px 14px rgba(12, 90, 219, 0.08)',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
              title="Magic Software - Strategic Client Partner"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
                  <rect width="28" height="28" rx="6" fill="#00529b" />
                  <path d="M6 20L11 8L14 15L17 8L22 20H18L15.5 13L14 16.5L12.5 13L10 20H6Z" fill="#ffffff" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#00529b', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>magic</span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#00a3e0', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>software</span>
                </div>
              </div>
            </div>

            {/* 2. Pearson */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Pearson Education"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#003057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '17px', fontFamily: "Georgia, serif" }}>P</span>
                </div>
                <span style={{ fontSize: '21px', fontWeight: 800, color: '#003057', letterSpacing: '-0.03em', fontFamily: "'Outfit', sans-serif" }}>Pearson</span>
              </div>
            </div>

            {/* 3. Wiley */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Wiley Publishing"
            >
              <span style={{ fontSize: '23px', fontWeight: 900, color: '#111827', letterSpacing: '0.08em', fontFamily: "Georgia, 'Times New Roman', serif" }}>WILEY</span>
            </div>

            {/* 4. McGraw Hill */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="McGraw Hill Education"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ backgroundColor: '#d6001c', padding: '3px 6px', borderRadius: '4px', color: '#ffffff', fontWeight: 900, fontSize: '11px', lineHeight: 1.05, textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>
                  Mc<br/>Graw<br/>Hill
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>McGraw Hill</span>
              </div>
            </div>

            {/* 5. Cengage */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Cengage Learning"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#002855" strokeWidth="2.5" />
                  <path d="M12 4C14 8 16 10 20 12C16 14 14 16 12 20C10 16 8 14 4 12C8 10 10 8 12 4Z" fill="#00a9ce" />
                </svg>
                <span style={{ fontSize: '19px', fontWeight: 900, color: '#002855', letterSpacing: '0.06em', fontFamily: "'Outfit', sans-serif" }}>CENGAGE</span>
              </div>
            </div>

            {/* 6. Macmillan */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Macmillan Education"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#d32f2f', fontFamily: "Georgia, serif", lineHeight: 1 }}>m</span>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937', letterSpacing: '-0.01em', fontFamily: "'Outfit', sans-serif" }}>macmillan</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>education</span>
                </div>
              </div>
            </div>

            {/* 7. Instructure Canvas */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Canvas LMS by Instructure"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <circle cx="12" cy="12" r="3.5" fill="#e02424" />
                  <circle cx="12" cy="4" r="2" fill="#e02424" />
                  <circle cx="12" cy="20" r="2" fill="#e02424" />
                  <circle cx="4" cy="12" r="2" fill="#e02424" />
                  <circle cx="20" cy="12" r="2" fill="#e02424" />
                  <circle cx="6.3" cy="6.3" r="1.8" fill="#e02424" />
                  <circle cx="17.7" cy="17.7" r="1.8" fill="#e02424" />
                  <circle cx="6.3" cy="17.7" r="1.8" fill="#e02424" />
                  <circle cx="17.7" cy="6.3" r="1.8" fill="#e02424" />
                </svg>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#2b2d42', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>canvas</span>
              </div>
            </div>

            {/* 8. Blackboard Learn */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Blackboard Learn LMS"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <rect x="2" y="2" width="10" height="10" rx="2" fill="#ffc20e" />
                  <rect x="9" y="9" width="12" height="12" rx="2" fill="#1e293b" />
                </svg>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.01em', fontFamily: "'Outfit', sans-serif" }}>Blackboard</span>
              </div>
            </div>

            {/* 9. Coursera */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Coursera Global Online Learning"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#0056d2" />
                  <path d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C14.5 18 16.6 16.5 17.5 14.3H14.8C14.2 15.2 13.2 15.8 12 15.8C9.9 15.8 8.2 14.1 8.2 12C8.2 9.9 9.9 8.2 12 8.2C13.2 8.2 14.2 8.8 14.8 9.7H17.5C16.6 7.5 14.5 6 12 6Z" fill="#ffffff" />
                </svg>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#0056d2', letterSpacing: '-0.03em', fontFamily: "'Outfit', sans-serif" }}>coursera</span>
              </div>
            </div>

            {/* 10. Oxford University Press */}
            <div
              className="client-logo-card"
              style={{
                height: '84px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.25s ease',
              }}
              title="Oxford University Press"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z" fill="#002147" />
                  <path d="M7 9H17M7 13H17M9 17H15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                  <span style={{ fontSize: '13px', fontWeight: 900, color: '#002147', letterSpacing: '0.08em', fontFamily: "Georgia, serif" }}>OXFORD</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', letterSpacing: '0.12em' }}>UNIVERSITY PRESS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Assurance Footer Note */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '28px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict NDA &amp; Enterprise IP Protection</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 className="w-4 h-4 text-[#0c5adb]" />
              <span>WCAG 2.2 Level AA / Section 508 VPATs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award className="w-4 h-4 text-amber-500" />
              <span>ISO 14289 PDF/UA Standard Remediations</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
