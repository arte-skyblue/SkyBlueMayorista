import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Building2, 
  MessageCircle, 
  Layers, 
  Lock, 
  Percent, 
  Truck, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { FAQS, ADVISORS } from '../data/mockData';

export default function FaqSection({ onOpenAdvisorModal }) {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todas', name: 'Todas las Preguntas', icon: HelpCircle, count: FAQS.length },
    { id: 'minimos', name: 'Módulos & Curvas (8/12 Pares)', icon: Layers, count: 1 },
    { id: 'precios', name: 'Precios Netos & Factura A/B', icon: Lock, count: 1 },
    { id: 'pagos', name: '10% Adicional & Pagos', icon: Percent, count: 1 },
    { id: 'showroom', name: 'Showroom Tapiales (1er Piso)', icon: Building2, count: 1 },
    { id: 'envios', name: 'Envíos Gratis CABA/GBA & Expresos', icon: Truck, count: 1 }
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'todas' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">PREGUNTAS</span>
            <span className="font-sf-bold text-white">FRECUENTES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Respuestas a las dudas habituales sobre mínimos de compra, curvas de fábrica, precios sin IVA y logística
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por módulo, curvas, factura, envíos..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-sf-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:text-primary transition-colors"
                >
                  <span className="font-sf-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sf-regular border-t border-neutral-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
