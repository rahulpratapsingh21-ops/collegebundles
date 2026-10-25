import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Building2,
} from 'lucide-react';
import { saveLead } from '../lib/supabaseClient';

export default function LeadSection({ preselectedService, onLeadSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'WCAG Accessibility Testing & Auditing',
    city: 'Noida / Delhi NCR',
    budget: '₹25,000 - ₹50,000',
    query: '',
  });

  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState(null);

  // Keep synced if parent changes preselected service
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    try {
      const result = await saveLead({
        fullName: formData.fullName,
        mobile: formData.phone,
        email: formData.email,
        service: formData.service,
        city: formData.city,
        budget: formData.budget,
        query: formData.query || `Quotation Request for ${formData.service}`,
        source: 'Website Main Contact Form',
      });

      setSuccessRef(result.referenceId);
      if (onLeadSuccess) onLeadSuccess(result);
    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-audit" className="py-20 bg-slate-100 border-t border-slate-200">
      <div className="abs-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge orange">
            <Sparkles className="w-4 h-4 text-[#06b6d4]" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081120] font-['Outfit'] mt-2">
            Request a Proposal or Free Accessibility &amp; AI SEO Audit
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Our engineering center is headquartered in Sector 22, Noida. Speak directly with our technical compliance and generative search architects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Office Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Info Card */}
            <div
              className="rounded-2xl shadow-xl space-y-6"
              style={{
                background: 'linear-gradient(135deg, #081120 0%, #0c1e3d 100%)',
                border: '1px solid #1e293b',
                color: '#ffffff',
                padding: '28px',
              }}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#06b6d4] block mb-1">
                  Corporate Headquarters
                </span>
                <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                  ABS Digital Solutions
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Digital Accessibility, EdTech &amp; AI Search Engine Optimization
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                {/* Address */}
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                >
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Office Address</span>
                    <span className="text-slate-300">Sector 22, Noida, Uttar Pradesh 201301, India</span>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                >
                  <Phone className="w-5 h-5 text-[#06b6d4] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">WhatsApp &amp; Direct Phone</span>
                    <a
                      href="https://wa.me/919286185258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-white font-mono font-semibold"
                    >
                      +91 9286185258
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                >
                  <Mail className="w-5 h-5 text-[#0c5adb] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Official Email</span>
                    <a
                      href="mailto:rahul.singh@absdigitalsolution.com"
                      className="text-blue-300 hover:text-white"
                    >
                      rahul.singh@absdigitalsolution.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                >
                  <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Operating Hours</span>
                    <span className="text-slate-300">Monday - Saturday: 9:00 AM - 7:00 PM IST (24/7 Client Helpline)</span>
                  </div>
                </div>
              </div>


              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919286185258?text=Hello%20Rahul,%20I%20am%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant Chat on WhatsApp (+91 9286185258)</span>
                </a>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#0c5adb]" />
                <span>Our Quality Commitment:</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-slate-600">
                <li>Non-Disclosure Agreement (NDA) signed before project audit</li>
                <li>Certified CPACC / WAS accessibility specialists</li>
                <li>Zero-hallucination factual optimization for LLM training sets</li>
                <li>Rapid turnarounds on urgent RFP submissions &amp; VPATs</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Full Interactive Lead Generation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#081120] font-['Outfit']">
                  Send Your Project Requirements
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details for a tailored estimate, timeline, and accessibility audit.
                </p>
              </div>

              {successRef ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                    Thank You, {formData.fullName || 'Partner'}!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your inquiry has been stored directly into the ABS Digital Solutions database. Our Noida engineering team will contact you shortly via phone or email.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block">
                    <span className="text-[11px] text-slate-400 uppercase font-mono block">Ticket Reference</span>
                    <span className="text-lg font-extrabold text-[#0c5adb] font-mono">{successRef}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setSuccessRef(null);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          service: 'WCAG Accessibility Testing & Auditing',
                          city: 'Noida / NCR',
                          budget: '₹25,000 - ₹50,000',
                          query: '',
                        });
                      }}
                      className="btn-primary text-xs py-2.5 px-6 font-bold rounded-lg cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone / WhatsApp number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Noida / Delhi NCR / Global"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Desired <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none bg-white"
                      >
                        <option value="WCAG Accessibility Testing & Auditing">WCAG Accessibility Testing &amp; Auditing</option>
                        <option value="Accessible eLearning Content Development">Accessible eLearning Content Development</option>
                        <option value="Document Accessibility & Remediation">Document Accessibility &amp; Remediation (PDF/UA)</option>
                        <option value="Learning Management Systems (LMS)">Learning Management Systems (LMS) Accessibility</option>
                        <option value="Interactive & Inclusive Digital Content">Interactive &amp; Inclusive Digital Content</option>
                        <option value="LLMO Services">LLMO Services (Large Language Model Optimization)</option>
                        <option value="AI Search Optimization (AI SEO)">AI Search Optimization (AI SEO)</option>
                        <option value="Generative Engine Optimization (GEO)">Generative Engine Optimization (GEO)</option>
                        <option value="Answer Engine Optimization (AEO)">Answer Engine Optimization (AEO)</option>
                        <option value="Hybrid Engine Optimization (HEO)">Hybrid Engine Optimization (HEO)</option>
                        <option value="AI Brand Visibility">AI Brand Visibility</option>
                        <option value="Full-Stack Accessible Web Development">Full-Stack Accessible Web Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none bg-white"
                      >
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1.5 Lakhs">₹50,000 - ₹1.5 Lakhs</option>
                        <option value="₹1.5 Lakhs - ₹5 Lakhs">₹1.5 Lakhs - ₹5 Lakhs</option>
                        <option value="Enterprise / Ongoing Retainer">Enterprise / Ongoing Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Details, Website Link or PDF Quantity
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your requirements: e.g. We have 40 PDF guides requiring Section 508 tagging, and we want our brand to rank #1 in Perplexity & SearchGPT for our domain..."
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-2 focus:ring-[#0c5adb]/20 outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-orange text-xs py-3.5 font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                    }}
                  >
                    {loading ? (
                      <span>Submitting to ABS Digital Solutions...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Request &amp; Get Free Audit</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>⚡ Response guaranteed within 2 business hours</span>
                    <span>🛡️ Direct verification with Noida team</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
