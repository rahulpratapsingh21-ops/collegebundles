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
import { getPublishedArticles, getAllTickers, syncWithSupabaseCloud } from './lib/newsCmsStorage';
import { startNewsScheduler, stopNewsScheduler } from './lib/newsScheduler';

export default function App() {
  // Dynamic Live News CMS Articles & Tickers
  const [liveArticles, setLiveArticles] = useState(getPublishedArticles);
  const [liveTickers, setLiveTickers] = useState(getAllTickers);

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
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  // Background Automation Scheduler & Event Listener
  useEffect(() => {
    // Initial cloud sync from Supabase
    syncWithSupabaseCloud();

    const handleNewsUpdate = () => {
      setLiveArticles(getPublishedArticles());
      setLiveTickers(getAllTickers());
    };
    window.addEventListener('cb_news_updated', handleNewsUpdate);

    // Start background scheduler for RSS ingestion & publishing queue
    startNewsScheduler(45);

    return () => {
      window.removeEventListener('cb_news_updated', handleNewsUpdate);
      stopNewsScheduler();
    };
  }, []);

  // SEO Friendly URL & Slug Navigation Handler (/engineering/{slug} or #article={slug} or ?article={slug})
  useEffect(() => {
    const handleUrlRouting = () => {
      const hash = window.location.hash;
      const search = new URLSearchParams(window.location.search);
      const articleSlug = search.get('article') || (hash.startsWith('#article=') ? hash.replace('#article=', '') : null);

      if (articleSlug) {
        const found = liveArticles.find((a) => a.slug === articleSlug || a.id === articleSlug);
        if (found) {
          setSelectedArticle(found);
        }
      }
    };

    handleUrlRouting();
    window.addEventListener('hashchange', handleUrlRouting);
    return () => window.removeEventListener('hashchange', handleUrlRouting);
  }, [liveArticles]);

  // 65% Scroll Lead Form Popup Trigger (Respects user dismissal in session)
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggeredScrollLead) return;
      if (sessionStorage.getItem('cb_popup_dismissed') === 'true') return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const progress = (scrollTop / scrollHeight) * 100;
      if (progress >= 65) {
        setHasTriggeredScrollLead(true);
        setLeadSource('65% Scroll Automatic Popup');
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

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
    sessionStorage.setItem('cb_popup_dismissed', 'true');
    setHasTriggeredScrollLead(true);
  };

  const handleSelectArticleByTitle = (title) => {
    const found = liveArticles.find((a) => a.title.toLowerCase().includes(title.toLowerCase().slice(0, 20)));
    if (found) {
      setSelectedArticle(found);
    } else {
      setSelectedArticle(liveArticles[0] || newsArticles[0]);
    }
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const appContent = (
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
      <BreakingNewsTicker
        tickers={liveTickers}
        onSelectArticleByTitle={handleSelectArticleByTitle}
      />

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
          articles={liveArticles}
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
          onClose={handleCloseLeadModal}
          onLeadCaptured={(lead) => {
            showToast(`Lead registered successfully! Reference: ${lead.id}`);
          }}
        />
      )}

      {/* Site Owner Lead Admin / CRM Drawer */}
      <LeadAdminDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        onViewArticle={(art) => setSelectedArticle(art)}
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

  if (isMobilePreview) {
    return (
      <div
        style={{
          backgroundColor: '#0f172a',
          minHeight: '100vh',
          padding: '20px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Simulator Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.9rem' }}>
            📱 Mobile Preview (iPhone 390px Viewport)
          </span>
          <button
            onClick={() => {
              if (isLeadModalOpen) {
                handleCloseLeadModal();
              } else {
                handleOpenLeadModal('Mobile Simulator CTA');
              }
            }}
            style={{
              backgroundColor: '#f59e0b',
              color: '#0f172a',
              fontWeight: 800,
              fontSize: '0.78rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {isLeadModalOpen ? 'Hide Lead Popup' : 'Show Lead Popup'}
          </button>
          <button
            onClick={() => {
              window.history.replaceState({}, '', window.location.pathname);
              setIsMobilePreview(false);
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: '0.78rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Switch to Desktop View
          </button>
        </div>

        {/* Realistic Mobile Device Frame */}
        <div
          style={{
            width: '390px',
            maxWidth: '100%',
            height: '844px',
            borderRadius: '44px',
            border: '10px solid #1e293b',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
            position: 'relative',
          }}
        >
          {/* Dynamic Island Notch */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '95px',
              height: '24px',
              backgroundColor: '#000000',
              borderRadius: '20px',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#1e293b',
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              position: 'relative',
            }}
          >
            {appContent}
          </div>
        </div>
      </div>
    );
  }

  return appContent;
}
