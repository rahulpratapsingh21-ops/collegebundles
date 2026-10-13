import React from 'react';

export default function Logo({ size = 'normal', inverted = false }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: isSmall ? '0.5rem' : '0.75rem', userSelect: 'none' }}>
      {/* Dynamic Emblem */}
      <div
        style={{
          width: isSmall ? '34px' : isLarge ? '48px' : '40px',
          height: isSmall ? '34px' : isLarge ? '48px' : '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <svg
          width={isSmall ? '22' : isLarge ? '30' : '26'}
          height={isSmall ? '22' : isLarge ? '30' : '26'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mortarboard */}
          <path
            d="M12 3L2 8.5L12 14L22 8.5L12 3Z"
            fill="url(#logoGrad)"
          />
          <path
            d="M6 10.7V16.2C6 18.5 8.7 20.5 12 20.5C15.3 20.5 18 18.5 18 16.2V10.7L12 14L6 10.7Z"
            fill="#38BDF8"
            opacity="0.8"
          />
          <path
            d="M21 9V15"
            stroke="#F59E0B"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="21" cy="16" r="1.5" fill="#F59E0B" />
          <defs>
            <linearGradient id="logoGrad" x1="2" y1="3" x2="22" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
        {/* Subtle AI Spark Indicator */}
        <span
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
            boxShadow: '0 0 6px #F59E0B',
          }}
        />
      </div>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isSmall ? '1.2rem' : isLarge ? '1.75rem' : '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: inverted ? '#FFFFFF' : '#0F172A',
            }}
          >
            College
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isSmall ? '1.2rem' : isLarge ? '1.75rem' : '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #2563EB 0%, #0284C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Bundles
          </span>
          <span
            style={{
              fontSize: isSmall ? '0.7rem' : '0.8rem',
              fontWeight: 700,
              color: '#F59E0B',
              marginLeft: '2px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            .in
          </span>
        </div>
        {!isSmall && (
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.04em',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: inverted ? '#94A3B8' : '#64748B',
              marginTop: '2px',
            }}
          >
            Admissions • News • AI Counselor
          </span>
        )}
      </div>
    </div>
  );
}
