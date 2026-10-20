import React, { useState } from 'react';
import { Download, Globe, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { generateSitemapXml, downloadSitemapFile } from '../../lib/sitemapGenerator';

export default function SitemapViewer({ articles = [] }) {
  const [copied, setCopied] = useState(false);
  const sitemapXml = generateSitemapXml(articles);

  const publishedArticles = articles.filter(
    (a) => a.status === 'published' || !a.status
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.8rem', fontWeight: 700 }}>
            <CheckCircle size={15} /> GOOGLE NEWS & SEARCH CONSOLE READY
          </div>
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: '0.25rem 0' }}>
            Dynamic XML Sitemap Index
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
            Includes 5 core sections and {publishedArticles.length} active live news articles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
          >
            {copied ? 'Copied XML!' : 'Copy XML'}
          </button>
          <button
            onClick={() => downloadSitemapFile(articles)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Download size={14} /> Download sitemap.xml
          </button>
        </div>
      </div>

      {/* Code Preview */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '12px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.78rem',
          lineHeight: 1.5,
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{sitemapXml}</pre>
      </div>
    </div>
  );
}
