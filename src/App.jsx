import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SeoHeaderBlock from './components/SeoHeaderBlock';
import HeroSlider from './components/HeroSlider';
import BrandShowcase from './components/BrandShowcase';
import CommercialConditions from './components/CommercialConditions';
import CategoryCatalog from './components/CategoryCatalog';
import ProfitCalculator from './components/ProfitCalculator';
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
    const message = encodeURIComponent(advisor.defaultMessage);
    window.open(`https://wa.me/${advisor.cleanPhone}?text=${message}`, '_blank');
  };

  const currentSeoPage = SEO_PAGES[activeTab] || SEO_PAGES.inicio;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-background text-foreground font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] selection:bg-primary selection:text-primary-foreground relative">
      
      {/* 1. Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenModal={handleOpenModal} 
        onOpenAdvisorModal={handleOpenAdvisorModal} 
      />

      {/* 2. SEO Header Block */}
      <SeoHeaderBlock 
        pageData={currentSeoPage} 
        activeTab={activeTab} 
      />

      {/* Main Content */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <>
            <HeroSlider 
              setActiveTab={setActiveTab}
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <BrandShowcase 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <CategoryCatalog 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ProfitCalculator 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <BenefitsSection 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ReelsSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ReviewsSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <ShowroomSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
            <EventsSection 
              onOpenModal={handleOpenModal} 
            />
            <AdvisorsHub />
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
