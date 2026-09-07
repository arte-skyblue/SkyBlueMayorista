import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SeoHeaderBlock from './components/SeoHeaderBlock';
import HeroSlider from './components/HeroSlider';
import BrandShowcase from './components/BrandShowcase';
import CategoryCatalog from './components/CategoryCatalog';
import ProfitCalculator from './components/ProfitCalculator';
import CommercialConditions from './components/CommercialConditions';
import BenefitsSection from './components/BenefitsSection';
import ReelsSection from './components/ReelsSection';
import ReviewsSection from './components/ReviewsSection';
import ShowroomSection from './components/ShowroomSection';
import EventsSection from './components/EventsSection';
import AdvisorsHub from './components/AdvisorsHub';
import FaqSection from './components/FaqSection';
import BlogSection from './components/BlogSection';
import WholesaleModal from './components/WholesaleModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { ADVISORS, SEO_PAGES } from './data/mockData';
import { ErpApp } from './erp/ErpApp';
import { AiStudioApp } from './components/AiStudioApp';
import { LayoutDashboard, ExternalLink, Globe } from 'lucide-react';

export default function App() {
  const getInitialViewMode = () => {
    const search = window.location.search;
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.startsWith('/ai-studio') || search.includes('mode=ai-studio') || search.includes('view=ai-studio') || hash.includes('ai-studio')) {
      return 'ai-studio';
    }
    if (path.startsWith('/erp') || search.includes('mode=erp') || search.includes('view=erp') || hash.includes('erp')) {
      return 'erp';
    }
    return 'web';
  };

  const [viewMode, setViewMode] = useState(getInitialViewMode());
  const [activeTab, setActiveTab] = useState('inicio');
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'general',
  });

  // Sync browser URL when switching viewMode
  useEffect(() => {
    const handlePopState = () => {
      setViewMode(getInitialViewMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenErp = (inNewTab = false) => {
    if (inNewTab) {
      window.open('/erp', '_blank');
    } else {
      window.history.pushState({}, '', '/erp');
      setViewMode('erp');
    }
  };

  const handleOpenAiStudio = (inNewTab = false) => {
    if (inNewTab) {
      window.open('/?mode=ai-studio', '_blank');
    } else {
      window.history.pushState({}, '', '/?mode=ai-studio');
      setViewMode('ai-studio');
    }
  };

  const handleExitToWeb = (inNewTab = false) => {
    if (inNewTab) {
      window.open('/', '_blank');
    } else {
      window.history.pushState({}, '', '/');
      setViewMode('web');
    }
  };

  const handleOpenModal = (type = 'general') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: 'general' });
  };

  const handleOpenAdvisorModal = (advisor = ADVISORS[0]) => {
    setModalState({ isOpen: true, type: 'asesor', advisor });
  };

  const currentPageData = SEO_PAGES[activeTab] || SEO_PAGES.inicio;

  // Standalone AI Studio View Mode
  if (viewMode === 'ai-studio') {
    return (
      <AiStudioApp onExitToWeb={() => handleExitToWeb(false)} />
    );
  }

  // Standalone ERP View Mode
  if (viewMode === 'erp') {
    return (
      <div className="min-h-screen bg-slate-950">
        <ErpApp onExitToWeb={() => handleExitToWeb(false)} />
      </div>
    );
  }

  // Wholesale Web View Mode
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-white flex flex-col font-sans selection:bg-primary selection:text-white relative transition-colors duration-300">
      {/* Dynamic SEO Meta & Schema Block */}
      <SeoHeaderBlock pageData={currentPageData} activeTab={activeTab} />

      {/* Floating Dynamic Glass Capsule Navbar with Morphing Animated Toggle */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenModal={handleOpenModal} 
        onOpenAdvisorModal={handleOpenAdvisorModal} 
      />

      {/* Main Content Area with High Conversion B2B Funnel Order */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <>
            {/* 1. Hero Slider: Massive Hook + 3 Glass Pills */}
            <HeroSlider 
              setActiveTab={setActiveTab} 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 2. Brand Showcase: Authority & Campaign Video 3D Glare */}
            <BrandShowcase 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 3. Category Catalog: Product Showcase in 45° with Margin Stickers */}
            <CategoryCatalog 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 4. Profit Calculator: Financial Simulator with NumberTicker & Confetti */}
            <ProfitCalculator 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 5. Commercial Conditions & Factory Box Curve Infographic */}
            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 6. Benefits Section: B2B Exclusive Perks */}
            <BenefitsSection 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 7. Social Content: Dual Track 4K Video Marquee */}
            <ReelsSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 8. Social Proof: 3-Column Vertical Marquee with Verified CUITs */}
            <ReviewsSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 9. Showroom & Physical Trust: Tapiales HQ Bento */}
            <ShowroomSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 10. Industry Exhibitions & Events: EFICA, EXICAL & Giras */}
            <EventsSection 
              onOpenModal={handleOpenModal} 
            />

            {/* 11. Blog & B2B Footwear Strategy Insights */}
            <BlogSection 
              onOpenModal={handleOpenModal} 
            />

            {/* 12. Human Commercial Advisors: Juliana, Jesica & Marcelino */}
            <AdvisorsHub />

            {/* 13. Quick FAQ Accordion with Live Search */}
            <FaqSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
          </>
        )}

        {activeTab === 'marcas' && (
          <div className="space-y-12 py-8">
            <BrandShowcase 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <CategoryCatalog 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <AdvisorsHub />
          </div>
        )}

        {activeTab === 'catalogo' && (
          <div className="space-y-12 py-8">
            <CategoryCatalog 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ProfitCalculator 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
          </div>
        )}

        {activeTab === 'beneficios' && (
          <div className="space-y-12 py-8">
            <BenefitsSection 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ProfitCalculator 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
          </div>
        )}

        {activeTab === 'showroom' && (
          <div className="space-y-12 py-8">
            <ShowroomSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <AdvisorsHub />
            <EventsSection 
              onOpenModal={handleOpenModal} 
            />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-12 py-8">
            <FaqSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <AdvisorsHub />
            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-12 py-8">
            <BlogSection onOpenModal={handleOpenModal} />
            <AdvisorsHub />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenModal={handleOpenModal} 
        onOpenAdvisorModal={handleOpenAdvisorModal} 
        setActiveTab={setActiveTab} 
      />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Wholesale Registration Modal */}
      <WholesaleModal 
        isOpen={modalState.isOpen} 
        onClose={handleCloseModal} 
        modalType={modalState.type} 
      />
    </div>
  );
}
