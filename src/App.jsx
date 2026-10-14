import React, { useState, useEffect } from 'react';
import TopNotificationBar from './components/TopNotificationBar';
import Navbar from './components/Navbar';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import ArticleModal from './components/ArticleModal';
import AICounselorModal from './components/AICounselorModal';
import LeadCaptureModal from './components/LeadCaptureModal';
import LeadFormSection from './components/LeadFormSection';
import OnlineEducationGuide from './components/OnlineEducationGuide';
import CollegeComparison from './components/CollegeComparison';
import UniversitiesGrid from './components/UniversitiesGrid';
import TrendingExamsAlert from './components/TrendingExamsAlert';
import TestimonialsFAQ from './components/TestimonialsFAQ';
import MobileBottomBar from './components/MobileBottomBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LeadAdminDrawer from './components/LeadAdminDrawer';
import Footer from './components/Footer';
import { newsArticles } from './data/newsData';

export default function App() {
  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAICounselorOpen, setIsAICounselorOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('General');
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);
  const [hasTriggeredScrollLead, setHasTriggeredScrollLead] = useState(false);

  // 50% Scroll Lead Form Popup Trigger
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggeredScrollLead) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const progress = (scrollTop / scrollHeight) * 100;
      if (progress >= 50) {
        setHasTriggeredScrollLead(true);
        setLeadSource('50% Scroll Automatic Popup');
        setIsLeadModalOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredScrollLead]);

  // Secret Admin Portal triggers: #admin, ?admin=true, or Ctrl+Shift+A
  useEffect(() => {
    const checkAdminTrigger = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminDrawerOpen(true);
      }
    };
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminDrawerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenLeadModal = (source = 'Inquiry') => {
    setLeadSource(source);
    setIsLeadModalOpen(true);
  };

  const handleSelectArticleByTitle = (title) => {
    const found = newsArticles.find((a) => a.title.toLowerCase().includes(title.toLowerCase().slice(0, 20)));
    if (found) {
      setSelectedArticle(found);
    } else {
      setSelectedArticle(newsArticles[0]);
    }
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Top Offer & Countdown Bar */}
      <TopNotificationBar
        onOpenLeadModal={handleOpenLeadModal}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* 2. Main Navigation Bar with Logo, Phone 8802155810, Search, Categories */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenAICounselor={() => setIsAICounselorOpen(true)}
        onOpenLeadModal={handleOpenLeadModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onScrollToSection={scrollToSection}
      />

      {/* 3. Real-Time Breaking News Ticker */}
      <BreakingNewsTicker onSelectArticleByTitle={handleSelectArticleByTitle} />

      <main style={{ flex: 1 }}>
        {/* 4. Hero Section with AI Banner, Stats & Direct Phone 8802155810 */}
        <HeroSection
          onOpenAICounselor={() => setIsAICounselorOpen(true)}
          onOpenLeadModal={handleOpenLeadModal}
          onSelectCategory={setActiveCategory}
          onScrollToSection={scrollToSection}
        />

        {/* 5. Trending Exams & Cutoff Hub (NEET, JEE, CAT, Online DEB) */}
        <TrendingExamsAlert
          onOpenLeadModal={handleOpenLeadModal}
          onOpenAICounselor={() => setIsAICounselorOpen(true)}
        />

        {/* 6. Comprehensive News Section (Medical, Engineering, Management, Online) */}
        <NewsSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onOpenArticleModal={(art) => setSelectedArticle(art)}
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* 7. Online Education Master Guide (UGC-DEB, Validity, Fees) */}
        <OnlineEducationGuide onOpenLeadModal={handleOpenLeadModal} />

        {/* 8. Top Universities & Accredited Partner Campuses */}
        <UniversitiesGrid onOpenLeadModal={handleOpenLeadModal} />

        {/* 9. College Comparison Tool */}
        <CollegeComparison onOpenLeadModal={handleOpenLeadModal} />

        {/* 10. In-Page High-Converting Lead Capture Section */}
        <LeadFormSection
          onLeadCaptured={(lead) => {
            showToast(`Lead registered successfully! Reference: ${lead.id}`);
          }}
        />

        {/* 11. Student Testimonials & FAQ Section */}
        <TestimonialsFAQ onOpenLeadModal={handleOpenLeadModal} />
      </main>

      {/* 12. Rich Branded Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenLeadModal={handleOpenLeadModal}
        onOpenAICounselor={() => setIsAICounselorOpen(true)}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* 13. Mobile Bottom Sticky Navigation Bar */}
      <MobileBottomBar
        onOpenAICounselor={() => setIsAICounselorOpen(true)}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* 14. Floating WhatsApp Button on the Right Side (8802155810) */}
      <FloatingWhatsApp />

      {/* ================= MODALS ================= */}

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onOpenLeadModal={handleOpenLeadModal}
        />
      )}

      {/* AI College & Career Counselor Modal */}
      {isAICounselorOpen && (
        <AICounselorModal
          onClose={() => setIsAICounselorOpen(false)}
          onOpenLeadModal={handleOpenLeadModal}
        />
      )}

      {/* Lead Capture Modal */}
      {isLeadModalOpen && (
        <LeadCaptureModal
          source={leadSource}
          onClose={() => setIsLeadModalOpen(false)}
          onLeadCaptured={(lead) => {
            showToast(`Lead registered successfully! Reference: ${lead.id}`);
          }}
        />
      )}

      {/* Site Owner Lead Admin / CRM Drawer */}
      <LeadAdminDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
      />

      {/* Success Feedback Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#065f46',
            color: '#ffffff',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 9999,
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <span>✔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
