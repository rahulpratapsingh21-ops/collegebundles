import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Lock,
  ShieldCheck,
  Cpu,
  ArrowUp,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenAdminModal, onOpenAuditModal, hasAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081120] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="abs-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Corporate Overview (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={scrollToTop}>
              <Logo variant="white" />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-['Plus_Jakarta_Sans']">
              ABS Digital Solutions is a premier digital engineering agency headquartered in Sector 22, Noida. We specialize in certified WCAG 2.1/2.2 AA &amp; AAA accessibility auditing, accessible eLearning content, PDF/UA remediation, and next-generation AI Search Optimization (LLMO, GEO, AEO, HEO).
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WCAG 2.2 Compliant</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-[#06b6d4] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Search Engine Ready</span>
              </span>
            </div>
          </div>

          {/* Quick Links: Digital Accessibility (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0c5adb]" />
              <span>Accessibility Solutions</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('accessibility-solutions')}
                  className="footer-link"
                >
                  WCAG Accessibility Testing &amp; Auditing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('accessibility-solutions')}
                  className="footer-link"
                >
                  Accessible eLearning Content (SCORM)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('accessibility-solutions')}
                  className="footer-link"
                >
                  Document Accessibility &amp; PDF Remediation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('accessibility-solutions')}
                  className="footer-link"
                >
                  Learning Management Systems (LMS)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('accessibility-solutions')}
                  className="footer-link"
                >
                  Interactive &amp; Inclusive Digital Content
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: AI SEO & Web (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#06b6d4]" />
              <span>Next-Gen SEO</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  LLMO Services (ChatGPT / Claude)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  AI Search Optimization (AI SEO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  Generative Engine Optimization (GEO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  Answer Engine Optimization (AEO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  Hybrid Engine Optimization (HEO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('ai-seo-services')}
                  className="footer-link"
                >
                  AI Brand Visibility
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('client-testimonials')}
                  className="footer-link"
                  style={{ color: '#fbbf24', fontWeight: 700 }}
                >
                  ★ Client Testimonials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('insights-blog')}
                  className="footer-link"
                  style={{ color: '#38bdf8', fontWeight: 600 }}
                >
                  What to Read Next (Guides)
                </button>
              </li>
            </ul>
          </div>


          {/* Contact Details Column (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Noida Headquarters
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sector 22, Noida, Uttar Pradesh - 201301</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#06b6d4] shrink-0" />
                <a
                  href="tel:+919286185258"
                  className="text-white hover:text-[#06b6d4] font-mono font-semibold"
                >
                  +91 9286185258
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0c5adb] shrink-0" />
                <a
                  href="mailto:rahul.singh@absdigitalsolution.com"
                  className="text-slate-300 hover:text-white break-all"
                >
                  rahul.singh@absdigitalsolution.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAuditModal}
                className="w-full btn-orange text-xs py-2.5 px-4 font-bold rounded-lg shadow-md"
              >
                Request Free 24h Audit
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright & EXCLUSIVE Admin Sign-Up / Login Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ABS Digital Solutions. All Rights Reserved. Sector 22, Noida, UP 201301.
          </div>

          {/* STRICT USER REQUIREMENT: Admin link ONLY in website footer! */}
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* The ONLY Admin Portal Link */}
            <button
              id="footer-admin-link"
              onClick={onOpenAdminModal}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60"
              title="Admin Access - Leads Management"
            >
              <Lock className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span className="font-semibold text-slate-300 hover:text-white">Admin Portal</span>
              {!hasAdmin && (
                <span className="text-[10px] bg-[#06b6d4] text-white px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">
                  1-Time Setup
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
