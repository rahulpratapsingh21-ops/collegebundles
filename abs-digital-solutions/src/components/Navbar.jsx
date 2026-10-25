import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Award,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenAuditModal, currentView = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  const accessibilityServices = [
    'WCAG 2.1 & 2.2 AA/AAA Audits',
    'Accessible eLearning Content (SCORM)',
    'Document Remediation (PDF/UA)',
    'LMS Platform Accessibility',
    'VPAT® Voluntary Product Certification',
  ];

  const aiSeoServices = [
    'LLMO Services (ChatGPT & Claude)',
    'Generative Engine Optimization (GEO)',
    'Answer Engine Optimization (AEO)',
    'Human Experience Optimization (HEO)',
    'AI Search Entity Authority',
  ];

  const webDevServices = [
    'Custom Web Development',
    'WordPress Development',
    'PHP Development',
    'Laravel Development',
    'ASP .Net Development',
    'CMS Development',
    'Shopify Development',
    'Magento Development',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // WhatsApp URL without website name
  const directWhatsAppUrl = `https://wa.me/919286185258?text=${encodeURIComponent(
    'Hello Rahul, I want to consult about your Accessibility and AI SEO services.'
  )}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Top Notification / Contact Bar */}
      <div className="bg-[#081120] text-slate-300 text-xs border-b border-slate-800 py-1.5 px-4 hidden md:block">
        <div className="abs-container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+919286185258"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>+91 9286185258</span>
            </a>
            <a
              href="mailto:rahul.singh@absdigitalsolution.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0c5adb]" />
              <span>rahul.singh@absdigitalsolution.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sector 22, Noida, UP 201301</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WCAG 2.2 AA &amp; Section 508 Compliant Delivery</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Next-Gen LLMO &amp; GEO Ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: isScrolled
            ? '0 4px 20px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)'
            : '0 1px 3px rgba(0, 0, 0, 0.04)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div className="abs-container flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              if (onNavigate) onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <Logo />
          </div>

          {/* Desktop Navigation Links (strictly NO admin link) */}
          <div className="desktop-only-flex items-center gap-5">
            {/* Services Mega-Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="text-slate-700 hover:text-[#0c5adb] font-semibold text-xs tracking-wide uppercase transition-colors flex items-center gap-1 cursor-pointer py-2"
                style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <span>Services</span>
                <ChevronDown
                  className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"
                  style={{
                    transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: servicesDropdownOpen ? '#0c5adb' : '#94a3b8',
                  }}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 animate-fade-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 20px 45px -10px rgba(8, 17, 32, 0.22)',
                    width: '780px',
                    borderRadius: '16px',
                    padding: '24px',
                  }}
                >
                  <div className="grid grid-cols-3 gap-6 text-left">
                    {/* Col 1: Web Development (Exact match to user's requirements) */}
                    <div>
                      <div
                        style={{
                          borderLeft: '3px solid #ff6b00',
                          paddingLeft: '10px',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: '13px',
                            color: '#ff6b00',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Web Development
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {webDevServices.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              scrollToSection('web-development');
                            }}
                            className="w-full text-left text-xs font-semibold text-slate-700 hover:text-[#0c5adb] hover:translate-x-1 transition-all py-1 cursor-pointer block"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 2: Digital Accessibility */}
                    <div>
                      <div
                        style={{
                          borderLeft: '3px solid #0c5adb',
                          paddingLeft: '10px',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: '13px',
                            color: '#0c5adb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Accessibility
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {accessibilityServices.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              scrollToSection('accessibility-solutions');
                            }}
                            className="w-full text-left text-xs font-semibold text-slate-700 hover:text-[#0c5adb] hover:translate-x-1 transition-all py-1 cursor-pointer block"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: AI SEO & Next-Gen Search */}
                    <div>
                      <div
                        style={{
                          borderLeft: '3px solid #06b6d4',
                          paddingLeft: '10px',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: '13px',
                            color: '#06b6d4',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          AI SEO &amp; LLMO
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {aiSeoServices.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              scrollToSection('ai-seo-services');
                            }}
                            className="w-full text-left text-xs font-semibold text-slate-700 hover:text-[#0c5adb] hover:translate-x-1 transition-all py-1 cursor-pointer block"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('why-choose-us')}
              className="text-slate-700 hover:text-[#0c5adb] font-semibold text-xs tracking-wide uppercase transition-colors cursor-pointer"
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Why ABS
            </button>

            <button
              onClick={() => scrollToSection('client-testimonials')}
              className="text-slate-700 hover:text-[#0c5adb] font-semibold text-xs tracking-wide uppercase transition-colors flex items-center gap-1 cursor-pointer"
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => scrollToSection('insights-blog')}
              className="text-slate-700 hover:text-[#0c5adb] font-semibold text-xs tracking-wide uppercase transition-colors cursor-pointer"
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Blog
            </button>

            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className={`font-semibold text-xs tracking-wide uppercase transition-colors cursor-pointer py-1 px-2.5 rounded-lg ${
                currentView === 'contact'
                  ? 'bg-[#0c5adb] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0c5adb]'
              }`}
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Contact
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="desktop-only-flex items-center gap-3">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-lg border transition-all cursor-pointer"
              style={{
                backgroundColor: '#f0fdf4',
                color: '#15803d',
                borderColor: '#86efac',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dcfce7';
                e.currentTarget.style.borderColor = '#22c55e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.borderColor = '#86efac';
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'inline-block',
                }}
              ></span>
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: 9286185258</span>
            </a>

            <button
              onClick={onOpenAuditModal}
              className="btn-orange text-xs uppercase tracking-wider py-2.5 px-4 font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                color: '#ffffff',
                border: 'none',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Audit Request</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="mobile-only-flex items-center gap-2">
            <button
              onClick={onOpenAuditModal}
              className="btn-orange text-xs py-2 px-3 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ff6b00 0%, #ea580c 100%)',
                color: '#ffffff',
              }}
            >
              Audit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0c5adb] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="mobile-only-flex flex-col border-t px-4 pt-3 pb-6 shadow-2xl animate-fade-in"
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              boxShadow: '0 12px 30px -4px rgba(0, 0, 0, 0.18)',
            }}
          >
            <div className="flex flex-col gap-3">
              {/* Mobile Services Accordion */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-2.5 text-slate-800 font-bold text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff6b00]" />
                    <span className="text-sm font-extrabold text-[#081120]">ALL SERVICES</span>
                  </div>
                  <ChevronDown
                    className="w-4 h-4 text-slate-400 transition-transform duration-200"
                    style={{
                      transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: mobileServicesOpen ? '#0c5adb' : '#94a3b8',
                    }}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-2 pr-1 pt-2 pb-2 space-y-3 bg-slate-50 rounded-xl mt-1 text-xs">
                    {/* Web Development Group (User's Exact List) */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <div
                        style={{
                          borderLeft: '3px solid #ff6b00',
                          paddingLeft: '8px',
                          marginBottom: '8px',
                        }}
                      >
                        <span className="font-extrabold text-[#ff6b00] uppercase text-[11px] tracking-wider">
                          Web Development
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 pl-2">
                        {webDevServices.map((srv) => (
                          <button
                            key={srv}
                            onClick={() => scrollToSection('web-development')}
                            className="text-left text-slate-700 hover:text-[#0c5adb] py-1 cursor-pointer font-medium text-xs flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                            <span>{srv}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accessibility Group */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <div
                        style={{
                          borderLeft: '3px solid #0c5adb',
                          paddingLeft: '8px',
                          marginBottom: '8px',
                        }}
                      >
                        <span className="font-extrabold text-[#0c5adb] uppercase text-[11px] tracking-wider">
                          Digital Accessibility
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 pl-2">
                        {accessibilityServices.map((srv) => (
                          <button
                            key={srv}
                            onClick={() => scrollToSection('accessibility-solutions')}
                            className="text-left text-slate-700 hover:text-[#0c5adb] py-1 cursor-pointer font-medium text-xs flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span>{srv}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI SEO Group */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <div
                        style={{
                          borderLeft: '3px solid #06b6d4',
                          paddingLeft: '8px',
                          marginBottom: '8px',
                        }}
                      >
                        <span className="font-extrabold text-[#06b6d4] uppercase text-[11px] tracking-wider">
                          AI SEO &amp; LLMO
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 pl-2">
                        {aiSeoServices.map((srv) => (
                          <button
                            key={srv}
                            onClick={() => scrollToSection('ai-seo-services')}
                            className="text-left text-slate-700 hover:text-[#0c5adb] py-1 cursor-pointer font-medium text-xs flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                            <span>{srv}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('why-choose-us')}
                className="flex items-center justify-between py-2.5 text-slate-800 font-semibold border-b border-slate-100 text-left cursor-pointer"
              >
                <span>Why ABS Digital</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => scrollToSection('client-testimonials')}
                className="flex items-center justify-between py-2.5 text-slate-800 font-semibold border-b border-slate-100 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Verified Client Testimonials</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => scrollToSection('insights-blog')}
                className="flex items-center justify-between py-2.5 text-slate-800 font-semibold border-b border-slate-100 text-left cursor-pointer"
              >
                <span>Blog</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('contact');
                }}
                className={`flex items-center justify-between py-2.5 font-semibold border-b border-slate-100 text-left cursor-pointer ${
                  currentView === 'contact' ? 'text-[#0c5adb]' : 'text-slate-800'
                }`}
              >
                <span>Contact Us (Office &amp; Map)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Mobile Contact Info Card */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-2 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <a href="tel:+919286185258" className="font-semibold">
                    +91 9286185258
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-[#0c5adb]" />
                  <a href="mailto:rahul.singh@absdigitalsolution.com" className="font-medium">
                    rahul.singh@absdigitalsolution.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sector 22, Noida, UP 201301</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="btn-orange w-full py-3 mt-1 text-sm font-bold shadow-md cursor-pointer"
              >
                Request Free Audit &amp; Proposal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
