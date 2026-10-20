import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Database, 
  Activity, 
  Copy, 
  Check, 
  Save, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { getSupabaseSqlSchema } from '../../lib/newsCmsStorage';

export default function AutomationSettingsModal({
  settings = {},
  onSaveSettings,
  aiLogs = [],
}) {
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'sql' | 'logs'
  const [formData, setFormData] = useState({ ...settings });
  const [copiedSql, setCopiedSql] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sqlSchema = getSupabaseSqlSchema();

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      {/* Tab Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#ffffff',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <button
          onClick={() => setActiveTab('settings')}
          className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Sliders size={14} /> Automation Rules
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`btn ${activeTab === 'logs' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Activity size={14} /> AI Processing Audit Logs ({aiLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`btn ${activeTab === 'sql' ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Database size={14} /> Supabase SQL Migration
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', overflowY: 'auto' }}>
        {activeTab === 'settings' && (
          <form onSubmit={handleSave} style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {savedSuccess && (
              <div style={{ padding: '0.75rem 1rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600 }}>
                ✔ Automation settings updated successfully!
              </div>
            )}

            {/* Auto-publish Mode */}
            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
                Auto-Publishing Strategy
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="autoPublishMode"
                    value="hybrid"
                    checked={formData.autoPublishMode === 'hybrid'}
                    onChange={(e) => setFormData({ ...formData, autoPublishMode: e.target.value })}
                  />
                  <div>
                    <strong>Hybrid Mode (Recommended):</strong> Automatically publishes high-confidence stories (SEO score &ge; 85); stores other items in AI Drafts queue for one-click admin approval.
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="autoPublishMode"
                    value="auto"
                    checked={formData.autoPublishMode === 'auto'}
                    onChange={(e) => setFormData({ ...formData, autoPublishMode: e.target.value })}
                  />
                  <div>
                    <strong>100% Fully Automated:</strong> Automatically parses RSS, generates SEO content, processes WebP image, and publishes live immediately or per schedule.
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="autoPublishMode"
                    value="manual"
                    checked={formData.autoPublishMode === 'manual'}
                    onChange={(e) => setFormData({ ...formData, autoPublishMode: e.target.value })}
                  />
                  <div>
                    <strong>Manual Review Only:</strong> All AI-generated articles are marked as drafts; an admin must review and click "Publish Live".
                  </div>
                </label>
              </div>
            </div>

            {/* Threshold & Timing */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Minimum SEO Readiness Score
                </label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={formData.minSeoScore}
                  onChange={(e) => setFormData({ ...formData, minSeoScore: parseInt(e.target.value) || 75 })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Articles below this score will be held for review.</span>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Publishing Delay (Minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.publishDelayMinutes}
                  onChange={(e) => setFormData({ ...formData, publishDelayMinutes: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>0 = immediate publish.</span>
              </div>
            </div>

            {/* Timezone */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Default Site Timezone
              </label>
              <input
                type="text"
                disabled
                value={formData.timezone || 'Asia/Kolkata (Indian Standard Time)'}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', fontSize: '0.85rem', color: '#64748b' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Save size={15} /> Save Automation Settings
              </button>
            </div>
          </form>
        )}

        {activeTab === 'logs' && (
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Recent AI News Agent Activities & Audit Log
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {aiLogs.length === 0 ? (
                <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>
                  No AI logs recorded yet. Ingested feeds and generated articles will appear here.
                </div>
              ) : (
                aiLogs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: log.status === 'failed' ? '#fef2f2' : '#f8fafc',
                      fontSize: '0.8rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong style={{ color: log.status === 'failed' ? '#dc2626' : '#2563eb' }}>
                        ✦ {log.task}
                      </strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {log.inputReference && (
                      <div style={{ color: '#475569', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                        Input: {log.inputReference}
                      </div>
                    )}
                    <div style={{ color: '#0f172a' }}>
                      Result: {typeof log.result === 'string' ? log.result : JSON.stringify(log.result)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'sql' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Supabase Cloud SQL Migration Script
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Copy and run this in your Supabase SQL Editor to enable permanent cloud synchronization.
                </p>
              </div>
              <button
                onClick={handleCopySql}
                className="btn btn-primary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                {copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}
              </button>
            </div>

            <pre
              style={{
                backgroundColor: '#0f172a',
                color: '#38bdf8',
                padding: '1.25rem',
                borderRadius: '10px',
                fontSize: '0.78rem',
                lineHeight: 1.5,
                overflowX: 'auto',
                fontFamily: 'monospace',
                maxHeight: '400px',
              }}
            >
              {sqlSchema}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
