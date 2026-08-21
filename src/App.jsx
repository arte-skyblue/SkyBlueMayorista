import React, { useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'general',
  });

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

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-primary selection:text-white">
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

            {/* 11. Human Commercial Advisors: Juliana, Jesica & Marcelino */}
            <AdvisorsHub />

            {/* 12. Quick FAQ Accordion with Live Search */}
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
            <BlogSection />
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
