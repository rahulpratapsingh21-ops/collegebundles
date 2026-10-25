import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Globe,
  Building,
} from 'lucide-react';
import { saveLead } from '../lib/supabaseClient';

export default function ContactUsPage({ onNavigateHome, onLeadSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    organization: '',
    service: 'WCAG Accessibility Testing & Auditing',
    website: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Contact Us | ABS Digital Solutions - Noida Headquarters';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }

    setLoading(true);
    try {
      const detailedQuery = [
        formData.message ? `Message: ${formData.message}` : '',
        formData.organization ? `Company: ${formData.organization}` : '',
        formData.website ? `Website: ${formData.website}` : '',
      ]
        .filter(Boolean)
        .join(' | ') || 'Direct Contact Us Page Inquiry';

      const result = await saveLead({
        fullName: formData.fullName,
        mobile: formData.phone,
        email: formData.email,
        service: formData.service,
        query: detailedQuery,
        source: 'Contact Us Page Form',
        notes: `Website: ${formData.website || 'N/A'} | Organization: ${formData.organization || 'N/A'}`,
      });

      setReferenceId(result.referenceId);
      setSubmitted(true);
      if (onLeadSuccess) onLeadSuccess(result);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setErrorMsg('There was an issue sending your message. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      organization: '',
      service: 'WCAG Accessibility Testing & Auditing',
      website: '',
      message: '',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14 animate-fade-in">
      <div className="abs-container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0c5adb] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Contact Us</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c5adb]/10 border border-[#0c5adb]/20 text-[#0c5adb] text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Direct Enterprise Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#081120] font-['Outfit'] tracking-tight">
            Connect with ABS Digital Solutions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Speak directly with our digital accessibility engineers and AI search specialists at our Noida headquarters. Every request is reviewed and responded to within 2 hours.
          </p>
        </div>

        {/* 2-Column Main Section: Left = Contact Info & Map, Right = Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Contact Details Cards & Google Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-[#081120] font-['Outfit'] border-b border-slate-100 pb-3">
                Corporate Headquarters
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Office Location
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug">
                    Sector 22, Noida, Uttar Pradesh - 201301, India
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Delhi NCR Tech Hub
                  </span>
                </div>
              </div>

              {/* Direct Phone / Hotline */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0c5adb] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Phone &amp; Hotline
                  </h4>
                  <a
                    href="tel:+919286185258"
                    className="text-sm font-bold text-[#0c5adb] hover:underline mt-0.5 block font-mono"
                  >
                    +91 9286185258
                  </a>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Monday to Saturday, 9:00 AM – 8:00 PM IST
                  </span>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#06b6d4] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Corporate Email
                  </h4>
                  <a
                    href="mailto:rahul.singh@absdigitalsolution.com"
                    className="text-sm font-semibold text-slate-800 hover:text-[#0c5adb] transition-colors mt-0.5 block break-all"
                  >
                    rahul.singh@absdigitalsolution.com
                  </a>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Instant audit quotes &amp; RFPs
                  </span>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919286185258?text=Hello%20Rahul,%20I%20am%20contacting%20you%20from%20absdigitalsolution.com%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-xs font-bold shadow-sm transition hover:opacity-95"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 9286185258)</span>
                </a>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-['Outfit'] tracking-wide uppercase">
                    Location Map: Sector 22, Noida
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Sector+22+Noida+Uttar+Pradesh+201301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-300 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Open Maps</span>
                  <Globe className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-64 sm:h-72 bg-slate-100">
                <iframe
                  title="ABS Digital Solutions Noida Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.974052308678!2d77.3444856!3d28.5849887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5772322306d%3A0xbcf046cb5ea81a28!2sSector%2022%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
                📍 Convenient access from Noida City Centre &amp; Greater Noida Expressway
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
                    Thank You! Inquiry Registered
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your query has been saved directly to our system. Our technical director in Noida will examine your project requirements and respond within 2 hours.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block text-center my-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">
                      Ticket Reference Code
                    </span>
                    <span className="text-lg font-black text-[#0c5adb] font-mono tracking-wider">
                      {referenceId}
                    </span>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Send Another Query
                    </button>
                    <button
                      onClick={onNavigateHome}
                      className="btn-primary px-6 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#081120] font-['Outfit']">
                      Send a Query or Request an Audit
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out your details below. Queries are stored directly in our secure CRM database.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name & Phone */}
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
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone / WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                        />
                      </div>
                    </div>

                    {/* Email & Organization */}
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
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Organization / Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Tech / University"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                        />
                      </div>
                    </div>

                    {/* Service & Website URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Service of Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none bg-white"
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
                          Website or Document Details (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. yourwebsite.com or 50 PDFs"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none"
                        />
                      </div>
                    </div>

                    {/* Query Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Describe Your Project or Query
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your digital accessibility compliance requirements, timeline, or AI SEO goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:border-[#0c5adb] focus:ring-1 focus:ring-[#0c5adb] outline-none resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-orange text-xs py-3.5 font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95"
                        style={{
                          background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                          color: '#ffffff',
                          boxShadow: '0 4px 14px rgba(255, 107, 0, 0.35)',
                        }}
                      >
                        {loading ? (
                          <span>Saving Query to Database...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Query &amp; Request Audit</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-2">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Strict NDA &amp; Enterprise IP Protection</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Responds within 2 hours</span>
                      </div>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
