import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { saveLead } from '../lib/supabaseClient';

export default function AuditModal({ isOpen, onClose, defaultService = 'WCAG Accessibility Testing & Auditing' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: defaultService,
    websiteUrl: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState(null);

  React.useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please enter your full name and phone number.');
      return;
    }

    setLoading(true);
    try {
      const result = await saveLead({
        fullName: formData.fullName,
        mobile: formData.phone,
        email: formData.email,
        service: formData.service,
        query: `Audit Request for URL: ${formData.websiteUrl || 'Not provided'} | Notes: ${formData.notes || 'N/A'}`,
        source: 'Free Audit Modal',
      });

      setSuccessRef(result.referenceId);
    } catch (err) {
      console.error('Audit modal submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#081120] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#06b6d4] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-['Outfit'] text-white">
                Request Free 24h Compliance Audit
              </h3>
              <p className="text-xs text-slate-400">
                ABS Digital Solutions • Sector 22, Noida
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Audit Request Registered!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Our lead accessibility &amp; AI search engineer will inspect your platform and contact you with the report.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Ticket Reference</span>
                <span className="text-base font-extrabold text-[#0c5adb] font-mono">{successRef}</span>
              </div>
              <div>
                <button
                  onClick={onClose}
                  className="btn-primary text-xs py-2 px-6 rounded-lg font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Singh"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9286185258"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Audit Focus <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none bg-white"
                >
                  <option value="WCAG Accessibility Testing & Auditing">WCAG Accessibility Testing &amp; Auditing</option>
                  <option value="Accessible eLearning Content Development">Accessible eLearning Content Development</option>
                  <option value="Document Accessibility & Remediation">Document Accessibility &amp; Remediation (PDF/UA)</option>
                  <option value="Learning Management Systems (LMS)">Learning Management Systems (LMS) Accessibility</option>
                  <option value="Interactive & Inclusive Digital Content">Interactive &amp; Inclusive Digital Content</option>
                  <option value="LLMO Services">LLMO Services (Large Language Model Optimization)</option>
                  <option value="AI Search Optimization (AI SEO)">AI Search Optimization (AI SEO - SearchGPT/Perplexity)</option>
                  <option value="Generative Engine Optimization (GEO)">Generative Engine Optimization (GEO)</option>
                  <option value="Answer Engine Optimization (AEO)">Answer Engine Optimization (AEO)</option>
                  <option value="Hybrid Engine Optimization (HEO)">Hybrid Engine Optimization (HEO)</option>
                  <option value="AI Brand Visibility">AI Brand Visibility</option>
                  <option value="Web Development">Full-Stack Accessible Web Development</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website URL / Document Scope
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://myorganization.com or 20 PDF modules"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-orange text-xs py-3.5 font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                }}
              >
                {loading ? 'Submitting Request...' : 'Submit Audit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
