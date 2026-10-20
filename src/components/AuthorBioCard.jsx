import React, { useState } from 'react';
import { CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { getAuthorForCategory } from '../data/authorsData';

export default function AuthorBioCard({ category, authorName, style = {} }) {
  const author = getAuthorForCategory(category, authorName);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        ...style,
      }}
    >
      {/* Header Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '0.65rem',
        }}
      >
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <Award size={18} color="#2563eb" />
          About the Author
        </h3>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#15803d',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            padding: '0.2rem 0.55rem',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <CheckCircle2 size={12} color="#16a34a" />
          Verified EEAT Expert
        </span>
      </div>

      {/* Author Card Main Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            minWidth: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #e2e8f0',
            backgroundColor: author.avatarBg || '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.2rem',
          }}
        >
          {!imgError && author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            author.fallbackInitials || 'CB'
          )}
        </div>

        {/* Name, Role & Socials */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexWrap: 'wrap',
              marginBottom: '0.15rem',
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#0f172a',
                lineHeight: 1.2,
              }}
            >
              {author.name}
            </span>
            <span
              title="Verified Education Researcher"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#16a34a',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5l-4-4 1.41-1.41L10.5 13.67l6.59-6.59 1.41 1.41-8 8z"
                  fill="#16a34a"
                />
              </svg>
            </span>
          </div>

          <div
            style={{
              fontSize: '0.82rem',
              color: '#64748b',
              fontWeight: 500,
              marginBottom: '0.45rem',
            }}
          >
            {author.title}
          </div>

          {/* Social Badges (Twitter & LinkedIn) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a
              href={author.social?.twitter || 'https://twitter.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: '#1da1f2',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={author.social?.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: '#0a66c2',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            <span
              style={{
                fontSize: '0.72rem',
                color: '#64748b',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              {author.credentials}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed EEAT Bio Text */}
      <p
        style={{
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: '#334155',
          margin: 0,
        }}
      >
        <strong>{author.name}</strong> {author.bio.replace(new RegExp(`^${author.name}\\s*`, 'i'), '')}
      </p>
    </div>
  );
}
