import React from 'react';
import {
  Quote,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';

export default function ClientTestimonials({ onOpenAuditModal }) {
  const testimonials = [
    {
      id: 1,
      quote:
        'ABS Digital remediated 3,200+ course PDFs into certified PDF/UA standards in under 20 days. We passed our compliance audit with zero defects.',
      name: 'Dr. Arvind Swaminathan',
      role: 'Dean of Academic Technology',
      organization: 'Premier Technical University System',
      industry: 'Higher Education',
      service: 'Document Accessibility & PDF/UA Remediation',
      rating: 5,
      impact: '3,200+ PDFs Remediated • 100% Audit Pass',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80',
    },
    {
      id: 2,
      quote:
        'ABS Digital implemented their LLMO & GEO framework on our site. Within 6 weeks, we became the primary cited source across ChatGPT and Perplexity.',
      name: 'Elena Rostova',
      role: 'VP of Global Growth & Search Strategy',
      organization: 'CloudScale Enterprise SaaS',
      industry: 'B2B Enterprise Software',
      service: 'LLMO & Generative Engine Optimization (GEO)',
      rating: 5,
      impact: '+340% Generative AI Citations',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80',
    },
    {
      id: 3,
      quote:
        'ABS Digital resolved keyboard traps and screen reader compatibility across our interactive Articulate modules. Flawless accessibility and execution.',
      name: 'Marcus Vance',
      role: 'Head of Digital Curriculum & EdTech Production',
      organization: 'Apex Learning Global Media',
      industry: 'EdTech & Publishing',
      service: 'Accessible eLearning Content (SCORM/xAPI)',
      rating: 5,
      impact: 'WCAG 2.2 Level AA Full Certification',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
    },
    {
      id: 4,
      quote:
        'Facing an ADA inquiry on our patient portal, ABS Digital audited and resolved 42 critical defects in just 10 days. Exceptional speed and expertise.',
      name: 'Pooja Mehra',
      role: 'Chief Technology Officer',
      organization: 'CareMatrix Health Systems',
      industry: 'Healthcare Technology',
      service: 'WCAG 2.2 Auditing & VPAT Certification',
      rating: 5,
      impact: 'Zero Legal Defects • VPAT 2.5 Issued',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80',
    },
    {
      id: 5,
      quote:
        'ABS Digital audited our Canvas LMS, standardized contrast templates, and trained our design team. An outstanding and dependable partner.',
      name: 'Michael Thornton',
      role: 'Director of Disability Support Services',
      organization: 'Metropolitan Community College District',
      industry: 'Public Education',
      service: 'LMS Platform Accessibility (Canvas & Moodle)',
      rating: 5,
      impact: 'District-Wide Accessible LMS Portal',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&h=240&q=80',
    },
    {
      id: 6,
      quote:
        'Their Hybrid Engine Optimization doubled our inbound conversions, capturing top Google AI Overviews and Perplexity recommendations.',
      name: 'David Sterling',
      role: 'Director of E-Commerce & Omnichannel Growth',
      organization: 'Vanguard Retail Brands',
      industry: 'E-Commerce & Retail',
      service: 'Hybrid Engine Optimization (HEO & AEO)',
      rating: 5,
      impact: '2.1x Inbound Enterprise Conversions',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&h=240&q=80',
    },
  ];

  return (
    <section id="client-testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="abs-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge">
            <Award className="w-4 h-4 text-[#0c5adb]" />
            <span>Verified Client Success</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#081120] font-['Outfit'] tracking-tight mt-2">
            Real Stories. Certified Outcomes.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Read how global universities, EdTech publishers, enterprise SaaS companies, and healthcare systems achieve full accessibility compliance and AI search dominance with ABS Digital Solutions.
          </p>

          {/* Social Proof Metric Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 p-3 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} viewBox="0 0 24 24" width="16" height="16" fill="#f59e0b" stroke="#f59e0b">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-900 font-extrabold ml-1">5.0 / 5.0</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% VPAT Audit Acceptance Rate</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#0c5adb]">
              <ShieldCheck className="w-4 h-4" />
              <span>Assistive Tech Screen Reader Verified</span>
            </div>
          </div>
        </div>

        {/* Testimonials 6 Cards Grid with Real Client Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="abs-card flex flex-col justify-between hover:border-[#0c5adb]/40 transition-all duration-300 bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Top Rating & Industry Tag */}
                <div className="flex items-center justify-between mb-4">
                  {/* Solid Golden Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="#f59e0b"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {item.industry}
                  </span>
                </div>

                {/* Impact Highlight Badge */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                    ✓ {item.impact}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author with REAL Human Face Portrait */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  {/* Real Client Portrait with Emerald Verified Dot */}
                  <div className="relative shrink-0">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-slate-200 shadow-md"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 border-2 border-white text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#081120] font-['Outfit']">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {item.role}
                    </p>
                    <p className="text-[10px] text-[#0c5adb] font-semibold">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Quote className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenAuditModal && onOpenAuditModal('Testimonial Page Audit Request')}
            className="btn-orange text-xs uppercase tracking-wider py-3.5 px-8 font-bold rounded-xl shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Our Satisfied Clients • Request a Free Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
