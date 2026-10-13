import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle, 
  ShieldCheck, 
  HelpCircle, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function OnlineEducationGuide({ onOpenLeadModal }) {
  const [activeTab, setActiveTab] = useState('approvals');

  const tabs = [
    { id: 'approvals', label: '1. UGC-DEB Approvals' },
    { id: 'degrees', label: '2. Top In-Demand Degrees' },
    { id: 'legality', label: '3. Govt & MNC Legality' },
    { id: 'cost', label: '4. Fees & 0% EMI' },
  ];

  return (
    <section id="online-guide-section" style={{ padding: '4rem 0', backgroundColor: '#f1f5f9' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#f3e8ff',
              color: '#7e22ce',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Globe size={14} />
            <span>Exclusive Knowledge Center</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: '#0f172a', marginBottom: '0.75rem' }}>
            Online Higher Education Guide
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', color: '#64748b' }}>
            Demystifying UGC-DEB entitled degrees, employer acceptance, fees, and examination formats for 2026 aspirants.
          </p>
        </div>

        {/* Tab Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: activeTab === tab.id ? 700 : 600,
                backgroundColor: activeTab === tab.id ? '#7e22ce' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                border: activeTab === tab.id ? '1px solid #7e22ce' : '1px solid #e2e8f0',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(126, 34, 206, 0.25)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2rem',
          }}
        >
          {activeTab === 'approvals' && (
            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1rem' }}>
                How to Verify University Approvals (The Checklist)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Before paying any admission deposit for an online degree, verify that the university possesses the 4 essential accreditations:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={20} color="#7e22ce" />
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0 }}>UGC-DEB Entitlement</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Mandatory recognition by University Grants Commission - Distance Education Bureau. Only universities with NAAC score ≥ 3.26 can offer online degrees without prior approval.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={20} color="#2563eb" />
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0 }}>AICTE Approval</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Crucial for professional technical courses like Online MBA, Online MCA, and Data Science certifications.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={20} color="#059669" />
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0 }}>NAAC A/A+/A++ Grade</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    National Assessment and Accreditation Council score reflects faculty standard, digital infrastructure, and curriculum quality.
                  </p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={20} color="#d97706" />
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: 0 }}>AIU & WES Recognition</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Association of Indian Universities ensures your degree is valid for government services and global immigration evaluations (USA/Canada).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'degrees' && (
            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1rem' }}>
                Most Popular Online Degree Programs for 2026
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7e22ce', textTransform: 'uppercase' }}>Master's Degree</span>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.35rem 0' }}>Online MBA (14+ Streams)</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Specializations in Finance, Marketing, HR, Business Analytics, Healthcare, IT.
                  </p>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                    Avg Fees: ₹1.2L - ₹2.5L (2 Years)
                  </div>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Tech Master's</span>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.35rem 0' }}>Online MCA (Cloud & AI)</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Full Stack development, DevOps, Cyber Security, Artificial Intelligence tracks.
                  </p>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                    Avg Fees: ₹1.1L - ₹2.2L (2 Years)
                  </div>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Bachelor's Degree</span>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.35rem 0' }}>Online BCA & BBA</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Foundational graduation degree for direct corporate roles or government exams.
                  </p>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                    Avg Fees: ₹90,000 - ₹1.8L (3 Years)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legality' && (
            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1rem' }}>
                Are Online Degrees Valid for UPSC & Government Jobs?
              </h3>
              <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <p style={{ color: '#065f46', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
                  ✔ YES! As per the UGC Public Notice & Gazette: Degrees acquired through Online Mode from recognized institutions are treated EQUAL to conventional on-campus degrees.
                </p>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                You can appear for UPSC Civil Services, SSC CGL, Banking (IBPS / SBI PO), State PSCs, Defense exams, and public sector undertakings (PSUs). Over 92% of Fortune 500 companies in India also actively recruit and promote online degree holders.
              </p>
            </div>
          )}

          {activeTab === 'cost' && (
            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1rem' }}>
                Affordable Education: No-Cost EMI & Scholarships
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Online degrees eliminate hostel fees, travel expenses, and loss of employment income.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af' }}>Flexible Monthly EMIs</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Pay fees monthly starting at just ₹4,500/month with zero credit card interest.</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>Merit & Defence Grants</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Up to 50% tuition reduction for working women, armed forces personnel, and high GPA scorers.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Call Banner */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              Want to verify if your targeted online university is UGC-DEB approved?
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Our counselors can check the 2026 UGC portal register live for you.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:8802155810" className="btn btn-call">
              <Phone size={15} /> 8802155810
            </a>
            <button
              onClick={() => onOpenLeadModal('Online Education Guide')}
              className="btn btn-primary"
            >
              Get Free University Shortlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
