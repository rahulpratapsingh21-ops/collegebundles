import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCheck,
  Award,
} from 'lucide-react';

export default function AccessibilitySolutions({ onSelectService }) {
  const accessibilityServices = [
    {
      id: 'wcag-testing',
      title: 'WCAG Accessibility Testing & Auditing',
      badge: 'WCAG 2.1 & 2.2 AA/AAA',
      icon: ShieldCheck,
      color: '#0c5adb',
      description:
        'Comprehensive manual and automated accessibility testing ensuring full compliance with WCAG 2.1 & 2.2 Level AA/AAA, ADA Title III, Section 508, and EN 301 549 standards.',
      features: [
        'Automated code scans + 100% thorough manual verification',
        'Screen reader testing across JAWS, NVDA, and iOS VoiceOver',
        'Keyboard-only navigation and focus trap diagnostics',
        'Color contrast ratios (4.5:1 text, 3:1 graphical elements)',
        'Detailed VPAT (Voluntary Product Accessibility Template) report',
      ],
      tag: 'Core Compliance',
    },
    {
      id: 'elearning-content',
      title: 'Accessible eLearning Content Development',
      badge: 'SCORM & xAPI Compliant',
      icon: GraduationCap,
      color: '#06b6d4',
      description:
        'Creation of fully accessible, interactive eLearning courses designed for all learners, including individuals with visual, auditory, motor, or cognitive disabilities.',
      features: [
        'Articulate Storyline 360 & Adobe Captivate course development',
        'Synchronized closed captions & descriptive audio tracks',
        'Keyboard-accessible quizzes, drag-and-drops & branching scenarios',
        'High-contrast slide design adhering to accessibility color palettes',
        'Fully accessible transcripts and downloadable student resources',
      ],
      tag: 'EdTech Specialization',
    },
    {
      id: 'document-remediation',
      title: 'Document Accessibility & Remediation',
      badge: 'PDF/UA & Section 508',
      icon: FileText,
      color: '#059669',
      description:
        'Remediating complex enterprise documents into fully accessible formats certified for assistive technologies and screen readers.',
      features: [
        'PDF/UA ISO 14289-1 standard remediation & tagging',
        'Microsoft Word, PowerPoint, and Excel accessibility tagging',
        'Logical reading order structuring and semantic headings',
        'Complex data tables remediation with proper header cells',
        'Meaningful alternative text (Alt text) & MathML formulas',
      ],
      tag: 'Enterprise Remediation',
    },
    {
      id: 'lms-accessibility',
      title: 'Learning Management Systems (LMS) Accessibility',
      badge: 'Canvas • Moodle • Blackboard',
      icon: Layers,
      color: '#7c3aed',
      description:
        'Auditing and remediation of LMS environments to ensure faculty, students, and administrators enjoy an inclusive, barrier-free digital learning ecosystem.',
      features: [
        'Auditing LMS theme templates, navigation menus & course shells',
        'Integration with Moodle, Canvas, Blackboard Learn, Brightspace & Totara',
        'Student portal accessibility testing for admissions & exams',
        'Instructor guideline creation for accessible syllabus creation',
        'Custom accessible plugins and inclusive UI widgets',
      ],
      tag: 'Academic & Corporate LMS',
    },
    {
      id: 'interactive-inclusive',
      title: 'Interactive & Inclusive Digital Content',
      badge: 'WAI-ARIA 1.2 Standards',
      icon: Sparkles,
      color: '#d97706',
      description:
        'Modern interactive web widgets, calculators, dynamic data dashboards, and multimedia players built natively accessible from the ground up.',
      features: [
        'WAI-ARIA landmark roles, states, and live announcements',
        'Accessible video and audio players with dual-track captions',
        'Inclusive UX design for neurodivergent and low-vision users',
        'Accessible SVG charts and interactive data visualizations',
        'Cross-platform testing on Windows, macOS, Android, and iOS',
      ],
      tag: 'Inclusive UX',
    },
  ];

  return (
    <section id="accessibility-solutions" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="abs-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge">
            <ShieldCheck className="w-4 h-4 text-[#0c5adb]" />
            <span>Digital Accessibility Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081120] font-['Outfit'] mt-2">
            Inclusive Experiences. Full Legal Compliance. Zero Barriers.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            At ABS Digital Solutions, we engineer digital products that comply with global accessibility mandates (WCAG 2.1/2.2, ADA Title III, Section 508, EN 301 549) while delivering unmatched usability.
          </p>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessibilityServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService && onSelectService(service.title)}
                className="abs-card flex flex-col justify-between group hover:border-[#0c5adb]/40 transition-all duration-300 cursor-pointer"
                style={{ cursor: 'pointer' }}
                title={`Click to request audit for ${service.title}`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: service.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#081120] mb-2.5 font-['Outfit'] group-hover:text-[#0c5adb] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                      Included Capabilities
                    </span>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectService) onSelectService(service.title);
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-slate-100 group-hover:bg-[#0c5adb] text-slate-700 group-hover:text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                >
                  <span>Request Audit for This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {/* 6th Card: Enterprise VPAT & Certification Assurance (Matching the other cards in white) */}
          <div
            onClick={() => onSelectService && onSelectService('Full Enterprise VPAT & Accessibility Audit')}
            className="abs-card flex flex-col justify-between group hover:border-[#0c5adb]/40 transition-all duration-300 cursor-pointer"
            style={{ cursor: 'pointer' }}
            title="Click to speak with an accessibility auditor"
          >
            <div>
              {/* Top Bar: Icon + Badge */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: '#06b6d4' }}
                >
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  Global Standards
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#081120] mb-2.5 font-['Outfit'] group-hover:text-[#0c5adb] transition-colors">
                Certified Accessibility Guarantee
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Every audit and remediation by ABS Digital Solutions comes with an executive VPAT / ACR compliance report verified against global accessibility laws.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                  Compliance Assurance
                </span>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ADA Title III &amp; Section 508 Litigation Protection</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>EN 301 549 European Accessibility Act (EAA)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Manual Screen-Reader Certified Testing</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>24/7 Dedicated Support from Noida, India</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectService) onSelectService('Full Enterprise VPAT & Accessibility Audit');
              }}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-slate-100 group-hover:bg-[#0c5adb] text-slate-700 group-hover:text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
            >
              <span>Speak with an Accessibility Auditor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>



        </div>

      </div>
    </section>
  );
}
