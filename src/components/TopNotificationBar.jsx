import React, { useState, useEffect } from 'react';
import { Phone, Flame, Clock, Sparkles } from 'lucide-react';

export default function TopNotificationBar({ onOpenLeadModal, onOpenAdminDrawer }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 38,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#09101d',
        color: '#f8fafc',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.8125rem',
        padding: '0.45rem 1rem',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {/* Left: Offer text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Flame size={12} /> ADMISSIONS 2026
          </span>
          <span style={{ fontWeight: 500 }}>
            Get up to <strong style={{ color: '#f59e0b' }}>50% Scholarship</strong> on Top Medical, Engineering, MBA & Online Degrees
          </span>
          
          {/* Countdown Clock */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.15rem 0.6rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#fef08a',
            }}
          >
            <Clock size={12} />
            <span>{String(timeLeft.days).padStart(2, '0')}d</span>:
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>

        {/* Right: Hotline Phone Number & CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Direct Phone Number */}
          <a
            href="tel:8802155810"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#6ee7b7',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            title="Click to Call Admission Helpline"
          >
            <Phone size={13} style={{ fill: '#10b981' }} />
            <span>Hotline: 8802155810</span>
          </a>

          {/* Apply / Scholarship button */}
          <button
            onClick={() => onOpenLeadModal('Scholarship 50% Top Bar')}
            style={{
              backgroundColor: '#f59e0b',
              color: '#0f172a',
              border: 'none',
              padding: '0.2rem 0.65rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'background 0.2s',
            }}
          >
            <Sparkles size={11} /> Apply Scholarship
          </button>

          {/* Admin Leads button for site owner */}
          {onOpenAdminDrawer && (
            <button
              onClick={onOpenAdminDrawer}
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.68rem',
                cursor: 'pointer',
              }}
              title="Site Owner: View Captured Leads"
            >
              Leads CRM
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
