import React from 'react';

export default function Logo({
  variant = 'default',
  showTagline = true,
  className = '',
}) {
  const isWhite = variant === 'white';

  return (
    <div
      className={`abs-logo-root ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* High-Tech Cyber Cyan & Royal Blue Geometric 'A' Emblem */}
      <div
        style={{
          position: 'relative',
          width: '46px',
          height: '50px',
          minWidth: '46px',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 115"
          width="44"
          height="50"
          style={{ width: '44px', height: '50px', display: 'block' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left Pillar: Deep Electric Royal Blue */}
            <linearGradient id="absRoyalBlue" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#0c5adb" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Right Pillar: Radiant Cyber Cyan */}
            <linearGradient id="absCyberCyan" x1="50%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="55%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>

            {/* Central Accessibility & AI Bridge Beam */}
            <linearGradient id="absBridgeBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Radiant Cyber Glow */}
            <filter id="absTechGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#06b6d4" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Left Pillar (Royal Blue) */}
          <path
            d="M24 92 L50 20"
            stroke="url(#absRoyalBlue)"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Right Pillar (Cyber Cyan with ambient glow) */}
          <path
            d="M50 20 L76 92"
            stroke="url(#absCyberCyan)"
            strokeWidth="15"
            strokeLinecap="round"
            filter="url(#absTechGlow)"
          />

          {/* Digital Accessibility Connection Bridge */}
          <path
            d="M34 65 L66 65"
            stroke="url(#absBridgeBeam)"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Central Neural Aperture Core */}
          <circle
            cx="50"
            cy="40"
            r="4.5"
            fill="#ffffff"
            opacity="0.98"
          />
        </svg>
      </div>

      {/* Stacked Typography with Cyber Cyan & Royal Blue Harmony */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '0.02em',
            color: isWhite ? '#ffffff' : '#081120',
          }}
        >
          ABS DIGITAL
        </span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #0c5adb 0%, #06b6d4 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            textShadow: isWhite ? '0 0 16px rgba(6, 182, 212, 0.45)' : 'none',
          }}
        >
          SOLUTIONS
        </span>

        {showTagline && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '8.5px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: isWhite ? '#cbd5e1' : '#64748b',
              marginTop: '2px',
            }}
          >
            Unlocking Potential Crafting Digital Solutions
          </span>
        )}
      </div>
    </div>
  );
}
