import React from 'react';
import { Calendar, Users, ArrowRight, Bell, Sparkles, Phone } from 'lucide-react';
import { examAlerts } from '../data/collegesData';

export default function TrendingExamsAlert({ onOpenLeadModal, onOpenAICounselor }) {
  return (
    <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#fef3c7',
                color: '#b45309',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              <Bell size={13} />
              <span>Counselling & Entrance Hub</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: 0 }}>
              Trending Exams & Cutoff Alerts 2026
            </h3>
          </div>

          <button
            onClick={onOpenAICounselor}
            className="btn btn-ai"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            <Sparkles size={15} /> Predict My Rank with AI
          </button>
        </div>

        {/* Exam Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {examAlerts.map((exam) => (
            <div
              key={exam.id}
              className="card-hover"
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8', backgroundColor: '#eff6ff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {exam.stream}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                    {exam.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                  {exam.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.4rem' }}>
                  <Calendar size={14} /> <span>Scheduled: <strong>{exam.date}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                  <Users size={14} /> <span>{exam.candidates}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                <button
                  onClick={() => onOpenLeadModal(`Exam: ${exam.name} Cutoff Guide`)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
                >
                  {exam.actionText}
                </button>
                <a
                  href="tel:8802155810"
                  style={{
                    padding: '0.45rem 0.65rem',
                    borderRadius: '8px',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Call Counselor for Exam Strategy"
                >
                  <Phone size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
