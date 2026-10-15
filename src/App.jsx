import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TrustedBrandsRating from './components/TrustedBrandsRating';
import AccessibilitySolutions from './components/AccessibilitySolutions';
import AiSeoServices from './components/AiSeoServices';
import ClientTestimonials from './components/ClientTestimonials';
import BlogSection from './components/BlogSection';
import WhyChooseUs from './components/WhyChooseUs';
import LeadSection from './components/LeadSection';
import ScrollLeadPopup from './components/ScrollLeadPopup';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import AuditModal from './components/AuditModal';
import { checkAdminExists } from './lib/supabaseClient';
import { Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('WCAG Accessibility Testing & Auditing');
  const [hasAdmin, setHasAdmin] = useState(true);
  const [toastNotification, setToastNotification] = useState(null);

  // Initial check if admin exists for footer badge
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await checkAdminExists();
        setHasAdmin(res.hasAdmin);
      } catch (err) {
        console.warn('Could not check admin status:', err);
      }
    };
    verifyAdmin();
  }, []);

  const handleOpenAuditModal = (serviceName = null) => {
    if (serviceName && typeof serviceName === 'string') {
      setSelectedService(serviceName);
    }
    setIsAuditModalOpen(true);
  };

  const handleLeadSuccess = (result) => {
    setToastNotification(`Inquiry registered successfully! Reference ID: ${result.referenceId}`);
    setTimeout(() => {
      setToastNotification(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-['Plus_Jakarta_Sans'] flex flex-col selection:bg-[#0c5adb] selection:text-white">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-20 right-4 z-50 bg-[#081120] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Main Navbar (Fixed and stands permanently at top) */}
      <Navbar onOpenAuditModal={() => handleOpenAuditModal('General Consultation')} />

      {/* Fixed Navbar Spacer so content is never covered */}
      <div style={{ height: '105px' }} className="hidden md:block w-full shrink-0" aria-hidden="true" />
      <div style={{ height: '72px' }} className="md:hidden w-full shrink-0" aria-hidden="true" />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Banner with High-Tech 3D Image & High-Converting CTAs */}
        <HeroBanner onOpenAuditModal={handleOpenAuditModal} />

        {/* 2. Ratings (Google 4.9, Clutch 4.8, GoodFirms 4.9) & Trusted by Global Brands (Magic Software, etc.) */}
        <TrustedBrandsRating />

        {/* 3. Digital Accessibility Solutions (5 Core Services) */}
        <AccessibilitySolutions onSelectService={handleOpenAuditModal} />

        {/* 4. AI SEO & Next-Gen Search (LLMO, GEO, AEO, HEO, Web Dev) */}
        <AiSeoServices onSelectService={handleOpenAuditModal} />

        {/* 5. Client Testimonials (Real Client Faces & Verified Outcomes) */}
        <ClientTestimonials onOpenAuditModal={handleOpenAuditModal} />

        {/* 6. Blog & Industry Guides ("What to Read Next" Focusing on Services) */}
        <BlogSection onOpenAuditModal={handleOpenAuditModal} />

        {/* 7. Why Choose Us & Quality Guarantee */}
        <WhyChooseUs onOpenAuditModal={() => handleOpenAuditModal('Full Enterprise Strategy')} />

        {/* 8. Dedicated Main Lead & Contact Section */}
        <LeadSection
          preselectedService={selectedService}
          onLeadSuccess={handleLeadSuccess}
        />
      </main>

      {/* 50% Website Scrolling Lead Form Popup */}
      <ScrollLeadPopup onLeadSuccess={handleLeadSuccess} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl"
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <a
          href="tel:+919286185258"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>Call Us</span>
        </a>

        <a
          href="https://wa.me/919286185258?text=Hello%20Rahul,%20I%20want%20to%20discuss%20Accessibility%20and%20AI%20SEO%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-white text-xs font-bold shadow-sm cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => handleOpenAuditModal('Mobile Quick Audit')}
          className="flex-1 btn-orange text-xs py-2 px-3 rounded-lg font-bold cursor-pointer"
        >
          <span>Free Audit</span>
        </button>
      </div>

      {/* Footer with Contact info and EXCLUSIVE Admin Sign-Up/Login Link */}
      <Footer
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAuditModal={() => handleOpenAuditModal('Footer Audit Request')}
        hasAdmin={hasAdmin}
      />

      {/* Admin Panel Modal (One-time registration lockout + Lead viewer) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          // Refresh admin state check when modal closes
          checkAdminExists().then((res) => setHasAdmin(res.hasAdmin));
        }}
      />

      {/* Quick Audit Request Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultService={selectedService}
      />

    </div>
  );
}
