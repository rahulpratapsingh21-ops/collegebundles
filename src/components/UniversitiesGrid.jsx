import React from 'react';
import { Award, Star, CheckCircle, ArrowRight, Download, Phone } from 'lucide-react';
import { topUniversities } from '../data/collegesData';

export default function UniversitiesGrid({ onOpenLeadModal }) {
  return (
    <section id="universities-section" style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Award size={14} />
            <span>Accredited Institutions</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: '#0f172a', marginBottom: '0.75rem' }}>
            Top Universities & Partner Campuses 2026
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1rem', color: '#64748b' }}>
            Explore leading UGC-DEB and NAAC A++ accredited universities with up to 50% scholarship grants.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.75rem',
            marginBottom: '2.5rem',
          }}
        >
          {topUniversities.map((uni) => (
            <div
              key={uni.id}
              className="card-hover"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    {uni.type}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#b45309',
                    }}
                  >
                    <Star size={14} fill="#f59e0b" color="#f59e0b" /> {uni.rating}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                  {uni.name}
                </h3>

                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10b981', marginBottom: '0.75rem' }}>
                  {uni.ranking}
                </div>

                {/* Popular Courses */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Popular Programs
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {uni.popularCourses.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Fee estimate */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #edf2f7',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Estimated Fees:</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{uni.fees}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <button
                  onClick={() => onOpenLeadModal(`Check Eligibility: ${uni.name}`)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem' }}
                >
                  Apply & Get Scholarship
                </button>
                <a
                  href="tel:8802155810"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                  }}
                  title="Call Counselor"
                >
                  <Phone size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for admissions assistance */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.25rem' }}>
              Looking for a specific university not listed above?
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
              We partner with over 400+ top universities across India and abroad.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:8802155810" className="btn btn-call" style={{ padding: '0.6rem 1.25rem' }}>
              <Phone size={16} /> 8802155810
            </a>
            <button
              onClick={() => onOpenLeadModal('Custom University Request')}
              className="btn btn-gold"
              style={{ padding: '0.6rem 1.25rem' }}
            >
              Request Custom Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
