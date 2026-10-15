import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Award,
  Cpu,
  Zap,
} from 'lucide-react';

export default function HeroBanner({ onOpenAuditModal }) {
  const directWhatsAppUrl = `https://wa.me/919286185258?text=${encodeURIComponent(
    'Hello Rahul, I would like to consult about your Accessibility and AI SEO services.'
  )}`;

  const scrollToServices = () => {
    const el = document.getElementById('accessibility-solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="abs-hero-section">
      <div className="abs-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse"></span>
              <span className="text-[#06b6d4] font-bold">ENTERPRISE:</span>
              <span>Generative AI (GEO &amp; LLMO) + WCAG 2.2 Enterprise Audits</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-['Outfit']">
              Enterprise <span className="gradient-text-blue">Digital Accessibility</span> &amp;{' '}
              <span className="gradient-text-orange">Next-Gen AI SEO</span> Solutions
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-['Plus_Jakarta_Sans']">
              ABS Digital Solutions empowers global organizations with certified WCAG 2.1/2.2 AA &amp; AAA compliance, accessible eLearning modules, document remediation, and cutting-edge AI Search Optimization (LLMO, GEO, AEO, HEO) to dominate ChatGPT, Perplexity, and Google.
            </p>

            {/* Core Pillars Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-medium text-slate-200">
              <div className="abs-hero-pill cursor-pointer hover:border-[#0c5adb] transition" onClick={scrollToServices}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WCAG 2.2 AA/AAA Audits</span>
              </div>
              <div className="abs-hero-pill cursor-pointer hover:border-[#0c5adb] transition" onClick={scrollToServices}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PDF/UA Remediation</span>
              </div>
              <div className="abs-hero-pill cursor-pointer hover:border-[#06b6d4] transition" onClick={() => {
                const el = document.getElementById('ai-seo-services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                <CheckCircle2 className="w-4 h-4 text-[#06b6d4] shrink-0" />
                <span>LLMO &amp; GEO AI SEO</span>
              </div>
              <div className="abs-hero-pill cursor-pointer hover:border-[#0c5adb] transition" onClick={scrollToServices}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Accessible eLearning (SCORM)</span>
              </div>
              <div className="abs-hero-pill cursor-pointer hover:border-[#0c5adb] transition" onClick={scrollToServices}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LMS Platform Audits</span>
              </div>
              <div className="abs-hero-pill cursor-pointer hover:border-[#06b6d4] transition" onClick={() => {
                const el = document.getElementById('ai-seo-services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                <CheckCircle2 className="w-4 h-4 text-[#06b6d4] shrink-0" />
                <span>AI Brand Visibility</span>
              </div>
            </div>

            {/* High-Conversion Action Buttons */}
            <div
              className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start"
              style={{ gap: '14px' }}
            >
              <button
                onClick={() => onOpenAuditModal && onOpenAuditModal('Hero Free 24h Audit')}
                className="btn-orange text-xs sm:text-sm py-3.5 px-6 font-extrabold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                }}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Request Free 24h Audit</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp: 9286185258</span>
              </a>

              <button
                onClick={scrollToServices}
                className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 transition cursor-pointer w-full sm:w-auto text-center"
              >
                <span>View All Services</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap justify-center lg:justify-start gap-8 text-left">
              <div>
                <div className="abs-stat-num text-white">100%</div>
                <div className="text-xs text-slate-400">WCAG Legal Compliance</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
              <div>
                <div className="abs-stat-num text-[#06b6d4]">500+</div>
                <div className="text-xs text-slate-400">Remediated Modules &amp; PDFs</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
              <div>
                <div className="abs-stat-num text-[#0c5adb]">10x</div>
                <div className="text-xs text-slate-400">Generative AI Search Reach</div>
              </div>
            </div>

          </div>

          {/* Right Column: Attractive High-Tech Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group"
              style={{
                boxShadow: '0 20px 50px rgba(12, 90, 219, 0.35)',
                background: '#0a1628',
              }}
            >
              {/* Main Futuristic Visual */}
              <img
                src="/hero-accessibility-ai.jpg"
                alt="Digital Accessibility WCAG 2.2 and AI Search Optimization Interface"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                style={{
                  display: 'block',
                  maxHeight: '440px',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Floating Glassmorphic Badge Top */}
              <div
                className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-xl border border-white/20 shadow-lg flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">WCAG 2.2 AA / AAA Certified</span>
              </div>

              {/* Floating Glassmorphic Badge Bottom */}
              <div
                className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-xs py-2 px-3.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-pulse"></div>
                <span className="font-bold">LLMO • GEO • AEO • HEO</span>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div
              className="absolute -inset-4 bg-gradient-to-r from-[#0c5adb] to-[#06b6d4] opacity-20 blur-2xl -z-10 rounded-3xl"
            ></div>
          </div>

        </div>
      </div>
    </section>
  );
}
