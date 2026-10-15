import React from 'react';
import { Phone, MessageCircle, Sparkles, Send } from 'lucide-react';

export default function MobileBottomBar({ onOpenAICounselor, onOpenLeadModal }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '0.5rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.08)',
      }}
      className="mobile-bottom-bar"
    >
      {/* Call Button: 8802155810 */}
      <a
        href="tel:8802155810"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#059669',
          textDecoration: 'none',
          fontSize: '0.72rem',
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Phone size={18} fill="#059669" color="#059669" />
        </div>
        <span>Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918802155810?text=Hi%20CollegeBundle,%20I%20need%20admission%20guidance"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#15803d',
          textDecoration: 'none',
          fontSize: '0.72rem',
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MessageCircle size={18} color="#15803d" />
        </div>
        <span>WhatsApp</span>
      </a>

      {/* AI Counselor Option */}
      <button
        onClick={onOpenAICounselor}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#7c3aed',
          fontSize: '0.72rem',
          fontWeight: 700,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)',
          }}
        >
          <Sparkles size={18} />
        </div>
        <span>AI Matcher</span>
      </button>

      {/* Free Counseling Lead Modal */}
      <button
        onClick={() => onOpenLeadModal('Mobile Sticky Bar')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#1d4ed8',
          fontSize: '0.72rem',
          fontWeight: 700,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Send size={18} color="#1d4ed8" />
        </div>
        <span>Free Advice</span>
      </button>

      <style>{`
        @media (min-width: 768px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
