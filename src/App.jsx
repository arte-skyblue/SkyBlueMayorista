import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SeoHeaderBlock from './components/SeoHeaderBlock';
import HeroSlider from './components/HeroSlider';
import CommercialConditions from './components/CommercialConditions';
import BrandShowcase from './components/BrandShowcase';
import CategoryCatalog from './components/CategoryCatalog';
import BenefitsSection from './components/BenefitsSection';
import ProfitCalculator from './components/ProfitCalculator';
import ReelsSection from './components/ReelsSection';
import AdvisorsHub from './components/AdvisorsHub';
import ShowroomSection from './components/ShowroomSection';
import EventsSection from './components/EventsSection';
import BlogSection from './components/BlogSection';
import FaqSection from './components/FaqSection';
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] selection:bg-sky-500 selection:text-white">
      
      {/* 1. Top Navbar with Tabs & SVG Logo */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenModal={handleOpenModal} 
        onOpenAdvisorModal={handleOpenAdvisorModal} 
      />

      {/* 2. SEO Header Block: Unique H1, Search Intent, TL;DR and Schema */}
      <SeoHeaderBlock 
        pageData={currentSeoPage} 
        activeTab={activeTab} 
      />

      {/* Main Tab Content */}
      <main className="flex-grow">
        
        {/* Tab 1: Inicio (Full Funnel & Hub Overview) */}
        {activeTab === 'inicio' && (
          <>
            <HeroSlider 
              setActiveTab={setActiveTab}
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <CommercialConditions 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <BrandShowcase 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            {/* 6 Columns of Selected Products on Desktop */}
            <CategoryCatalog 
              onOpenModal={handleOpenModal} 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <ProfitCalculator 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <ReelsSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <AdvisorsHub />

            <ShowroomSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />

            <EventsSection 
              onOpenModal={handleOpenModal} 
            />

            <FaqSection 
              onOpenAdvisorModal={handleOpenAdvisorModal} 
            />
          </>
        )}

        {/* Tab 2: Marcas Oficiales */}
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

        {/* Tab 3: Catálogo Módulos B2B */}
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

        {/* Tab 4: Beneficios & Rentabilidad */}
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

        {/* Tab 5: Showroom Tapiales & Locales */}
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

        {/* Tab 6: Preguntas Frecuentes & Asesores */}
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

        {/* Tab 7: Blog B2B */}
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

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Wholesale Modal */}
      <WholesaleModal 
        isOpen={modalState.isOpen} 
        onClose={handleCloseModal} 
        modalType={modalState.type} 
      />

    </div>
  );
}
