import React, { useState } from 'react';
import { Scale, Check, X, Phone, ArrowRight, Star } from 'lucide-react';
import { topUniversities } from '../data/collegesData';

export default function CollegeComparison({ onOpenLeadModal }) {
  const [collegeAId, setCollegeAId] = useState('amity-online');
  const [collegeBId, setCollegeBId] = useState('lpu-online');

  const collegeA = topUniversities.find((c) => c.id === collegeAId) || topUniversities[0];
  const collegeB = topUniversities.find((c) => c.id === collegeBId) || topUniversities[1];

  return (
    <section id="compare-section" style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Scale size={14} />
            <span>Interactive Comparison Tool</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: '#0f172a', marginBottom: '0.75rem' }}>
            Compare Universities Side-by-Side
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1rem', color: '#64748b' }}>
            Evaluate fees, accreditations, ranking, and placement metrics to make an informed career decision.
          </p>
        </div>

        {/* Selection Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>Select College 1:</span>
            <select
              value={collegeAId}
              onChange={(e) => setCollegeAId(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {topUniversities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <span style={{ fontWeight: 800, color: '#94a3b8', fontSize: '1.1rem' }}>VS</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>Select College 2:</span>
            <select
              value={collegeBId}
              onChange={(e) => setCollegeBId(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {topUniversities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: '#ffffff',
            maxWidth: '950px',
            margin: '0 auto 2.5rem auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                <th style={{ padding: '1.25rem', width: '28%', fontSize: '0.95rem' }}>Parameters</th>
                <th style={{ padding: '1.25rem', width: '36%', fontSize: '1.05rem', color: '#60a5fa' }}>{collegeA.name}</th>
                <th style={{ padding: '1.25rem', width: '36%', fontSize: '1.05rem', color: '#f59e0b' }}>{collegeB.name}</th>
              </tr>
            </thead>
            <tbody>
              {/* Ranking & Accreditations */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155', backgroundColor: '#f8fafc' }}>
                  NIRF Rank / NAAC Grade
                </td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#0f172a' }}>{collegeA.ranking}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#0f172a' }}>{collegeB.ranking}</td>
              </tr>

              {/* Fee Range */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155', backgroundColor: '#f8fafc' }}>
                  Estimated Fee Range
                </td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#1d4ed8' }}>{collegeA.fees}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#d97706' }}>{collegeB.fees}</td>
              </tr>

              {/* Rating */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155', backgroundColor: '#f8fafc' }}>
                  Student Satisfaction Rating
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#0f172a' }}>
                    <Star size={15} fill="#f59e0b" color="#f59e0b" /> {collegeA.rating} / 5.0 ({collegeA.reviewsCount} reviews)
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#0f172a' }}>
                    <Star size={15} fill="#f59e0b" color="#f59e0b" /> {collegeB.rating} / 5.0 ({collegeB.reviewsCount} reviews)
                  </span>
                </td>
              </tr>

              {/* Accreditations */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155', backgroundColor: '#f8fafc' }}>
                  Recognitions & Approvals
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {collegeA.approvals.map((app, i) => (
                      <span key={i} style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {app}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {collegeB.approvals.map((app, i) => (
                      <span key={i} style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {app}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>

              {/* Key Highlights */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155', backgroundColor: '#f8fafc' }}>
                  Key Advantages
                </td>
                <td style={{ padding: '1rem 1.25rem', color: '#475569', fontSize: '0.85rem' }}>{collegeA.highlights}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#475569', fontSize: '0.85rem' }}>{collegeB.highlights}</td>
              </tr>

              {/* CTA Row */}
              <tr>
                <td style={{ padding: '1.25rem', backgroundColor: '#f8fafc' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Need unbiased counselor opinion?</span>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <button
                    onClick={() => onOpenLeadModal(`Compare: ${collegeA.name}`)}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
                  >
                    Apply to {collegeA.name}
                  </button>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <button
                    onClick={() => onOpenLeadModal(`Compare: ${collegeB.name}`)}
                    className="btn btn-gold"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
                  >
                    Apply to {collegeB.name}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Support Phone Bar */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Need help deciding between these two universities? Call our senior academic counselor directly:
          </p>
          <a
            href="tel:8802155810"
            className="btn btn-call"
            style={{ padding: '0.65rem 1.5rem', fontSize: '1rem' }}
          >
            <Phone size={18} />
            <span>Call 8802155810 (Free Comparison Report)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
