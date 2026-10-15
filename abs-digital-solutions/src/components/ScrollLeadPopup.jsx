import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle2,
  Gift,
  Clock,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { saveLead } from '../lib/supabaseClient';

export default function ScrollLeadPopup({ onLeadSuccess }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'WCAG Accessibility Testing & Auditing',
    note: '',
  });

  useEffect(() => {
    // Check if user already dismissed it in this session
    const isDismissed = sessionStorage.getItem('abs_scroll_lead_dismissed');
    if (isDismissed) return;

    const handleScroll = () => {
      if (sessionStorage.getItem('abs_scroll_lead_dismissed')) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        // Trigger at 50% website scroll
        if (scrollPercent >= 50 && !isVisible && !hasSubmitted) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, hasSubmitted]);

  const handleClose = () => {
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please enter your name and contact phone number.');
      return;
    }

    setLoading(true);
    try {
      const result = await saveLead({
        fullName: formData.fullName,
        mobile: formData.phone,
        email: formData.email,
        service: formData.service,
        query: formData.note || `50% Scroll Special Offer Lead - ${formData.service}`,
        source: '50% Scroll Triggered Form',
      });

      setReferenceId(result.referenceId);
      setHasSubmitted(true);
      sessionStorage.setItem('abs_scroll_lead_dismissed', 'true');
      if (onLeadSuccess) onLeadSuccess(result);
    } catch (err) {
      console.error('Error submitting scroll lead form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  // Minimized Floating Pill state
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50 animate-bounce">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-[#ff6b00] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border-2 border-white hover:bg-[#ea580c] transition cursor-pointer"
          style={{ backgroundColor: '#ff6b00', color: '#ffffff' }}
        >
          <Gift className="w-4 h-4" />
          <span>Claim 50% Audit Offer</span>
          <Maximize2 className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#081120] via-[#0c5adb] to-[#06b6d4] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Gift className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block">
                Exclusive Visitor Offer (50% Milestone)
              </span>
              <h4 className="text-base font-bold font-['Outfit']">
                Complimentary WCAG &amp; AI SEO Audit
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-md text-slate-200 hover:text-white hover:bg-white/10"
              title="Minimize"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-1 rounded-md text-slate-200 hover:text-white hover:bg-white/10"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {hasSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Audit Request Registered!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you! Our technical director in Noida will examine your web platform and send the full audit report.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Ticket Reference</span>
                <span className="text-sm font-extrabold text-[#0c5adb] font-mono">{referenceId}</span>
              </div>
              <div>
                <button
                  onClick={handleClose}
                  className="btn-primary text-xs py-2 px-6 rounded-lg font-bold"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-600 mb-4">
                You have reached 50% of our website! Drop your details below to receive a <strong>free comprehensive audit report</strong> covering WCAG 2.2 legal vulnerabilities and LLMO search visibility.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Singh / CTO"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9286185258"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none bg-white"
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
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Website or Document Details (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. unidreamsolutions.com or 50 PDFs to remediate"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-orange text-xs py-3.5 font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                    }}
                  >
                    {loading ? (
                      <span>Saving Audit Request...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Free Audit Request</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>⚡ Responds within 2 hours</span>
                  <span>🔒 Direct to ABS Digital Solutions</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
