import React from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  BarChart3,
  CheckCircle2,
  Lock,
  Headphones,
  Compass,
} from 'lucide-react';

export default function WhyChooseUs({ onOpenAuditModal }) {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Human-Certified WCAG Compliance',
      description:
        'We never rely solely on automated scanners. Every audit is verified manually by accessibility engineers and assistive technology power users with screen readers (NVDA, JAWS, VoiceOver).',
      badge: 'Zero False Positives',
      color: '#0c5adb',
    },
    {
      icon: Zap,
      title: 'Proprietary AI SEO & LLMO Framework',
      description:
        'While other agencies are still doing 2018 keyword stuffing, ABS Digital Solutions optimizes for vector embeddings, entity graphs, and generative AI citation algorithms across SearchGPT & Perplexity.',
      badge: 'Future-Proof',
      color: '#06b6d4',
    },
    {
      icon: Award,
      title: 'Official VPAT & Legal Protection',
      description:
        'Receive full Voluntary Product Accessibility Templates (VPAT 2.4/2.5) that protect your business against ADA Title III and Section 508 legal challenges in the US, UK, and EU.',
      badge: 'Audit-Proof',
      color: '#059669',
    },
    {
      icon: Users,
      title: 'Experienced EdTech & LMS Engineers',
      description:
        'Over a decade of specialized experience remediating interactive learning materials, SCORM packages, Canvas/Moodle LMS platforms, and high-volume academic PDFs.',
      badge: 'EdTech Specialists',
      color: '#7c3aed',
    },
    {
      icon: BarChart3,
      title: 'Measurable ROI & Transparent Dashboards',
      description:
        'Live tracking of keyword rankings, AI citation frequency, contrast fix logs, and user conversion rates. You always know exactly what impact our solutions produce.',
      badge: 'Data-Driven',
      color: '#0891b2',
    },
    {
      icon: Headphones,
      title: 'Dedicated Engineering from Noida, India',
      description:
        'Direct access to senior accessibility auditors and AI search strategists based in Sector 22, Noida. Quick turnarounds, flexible communication, and 24/7 client helpline.',
      badge: '24/7 Helpline',
      color: '#d97706',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-b border-slate-200">
      <div className="abs-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge">
            <Compass className="w-4 h-4 text-[#0c5adb]" />
            <span>The ABS Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081120] font-['Outfit'] mt-2">
            Why Leading Brands Trust ABS Digital Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Bridging the gap between universal digital accessibility and next-generation artificial intelligence search dominance.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="abs-card flex flex-col justify-between hover:border-[#0c5adb]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: pt.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {pt.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#081120] mb-2 font-['Outfit']">
                    {pt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #081120 0%, #0c5adb 55%, #06b6d4 100%)',
          }}
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              Ready to make your website fully accessible &amp; AI-search ready?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
              Get an executive compliance scorecard and an LLMO strategy blueprint within 24 hours.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenAuditModal}
              className="btn-orange text-xs uppercase tracking-wider py-3 px-6 font-extrabold rounded-xl shadow-lg cursor-pointer"
            >
              Get Free 24h Audit
            </button>
            <a
              href="tel:+919286185258"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-3 px-5 rounded-xl border border-white/20 transition cursor-pointer"
            >
              Call: +91 9286185258
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
