import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { FAQS, ADVISORS } from '../data/mockData';

export default function FaqSection({ onOpenAdvisorModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary apple-kicker text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Centro de Respuestas B2B</span>
          </div>

          <h2 className="text-3xl sm:text-5xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">PREGUNTAS</span>
            <span className="font-sf-bold text-white">FRECUENTES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg apple-subheadline">
            Todo lo que necesitás saber sobre compras por curva, facturación oficial y envíos al interior.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar duda (ej: envíos, curvas, factura)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id || idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900 border-primary/50 shadow-xl'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-sf-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-primary text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-sf-regular leading-relaxed border-t border-neutral-800/80">
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
