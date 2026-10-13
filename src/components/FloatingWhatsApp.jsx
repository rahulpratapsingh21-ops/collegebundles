import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '80px',
        zIndex: 998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
      className="floating-whatsapp-container"
    >
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '0.65rem 0.9rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e2e8f0',
            maxWidth: '220px',
            fontSize: '0.8125rem',
            color: '#1e293b',
            position: 'relative',
            animation: 'fadeIn 0.3s ease-out',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
              <span>WhatsApp Helpline</span>
            </div>
            <div style={{ color: '#475569', fontSize: '0.75rem', lineHeight: 1.35 }}>
              Chat directly at <strong style={{ color: '#15803d' }}>8802155810</strong> for instant brochure & cutoffs!
            </div>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Dismiss"
          >
            <X size={14} />
          </button>
          {/* Arrow pointing down */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '24px',
              width: '12px',
              height: '12px',
              backgroundColor: '#ffffff',
              transform: 'rotate(45deg)',
              borderRight: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
            }}
          />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href="https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20am%20looking%20for%20admission%20guidance"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#25d366',
          color: '#ffffff',
          padding: '0.75rem 1.15rem',
          borderRadius: '999px',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.45)';
        }}
        aria-label="Chat on WhatsApp 8802155810"
        title="Chat on WhatsApp: 8802155810"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageCircle size={22} fill="#ffffff" color="#25d366" />
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
        </div>
        <span className="wa-btn-text">WhatsApp 8802155810</span>
      </a>

      <style>{`
        @media (max-width: 640px) {
          .floating-whatsapp-container {
            right: 14px !important;
            bottom: 74px !important;
          }
          .wa-btn-text {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
}
