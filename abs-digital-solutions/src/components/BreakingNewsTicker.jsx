import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight, Bell } from 'lucide-react';
import { breakingNewsTickerItems } from '../data/newsData';

export default function BreakingNewsTicker({ onSelectArticleByTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNewsTickerItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeItem = breakingNewsTickerItems[currentIndex];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Medical': return '#15803d';
      case 'Engineering': return '#0369a1';
      case 'Management': return '#b45309';
      case 'Online':
      case 'Online A-Z': return '#7e22ce';
      default: return '#dc2626';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.45rem 0',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          overflow: 'hidden',
        }}
      >
        {/* Flashing Live Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.2rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              display: 'inline-block',
              animation: 'pulse-danger 1.5s infinite',
            }}
          />
          <Radio size={12} />
          <span>BREAKING</span>
        </div>

        {/* Current Active Headline */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
          onClick={() => onSelectArticleByTitle && onSelectArticleByTitle(activeItem.text)}
        >
          <span
            style={{
              backgroundColor: getCategoryColor(activeItem.category),
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            {activeItem.category}
          </span>

          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#1e293b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'opacity 0.25s ease-in-out',
            }}
          >
            {activeItem.text}
          </span>
        </div>

        {/* Timestamp & Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexShrink: 0,
            fontSize: '0.75rem',
            color: '#64748b',
          }}
        >
          <span style={{ display: 'none' }} className="ticker-time">
            {activeItem.date}
          </span>
          <div style={{ display: 'flex', gap: '3px' }}>
            {breakingNewsTickerItems.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  backgroundColor: idx === currentIndex ? '#2563eb' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 640px) {
          .ticker-time {
            display: inline-block !important;
          }
        }
      `}</style>
    </div>
  );
}
