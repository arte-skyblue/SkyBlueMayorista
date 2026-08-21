import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { FAQS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

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
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary apple-kicker text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Centro de Respuestas B2B para Comerciantes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">PREGUNTAS</span>
            <span className="font-sf-bold text-white">FRECUENTES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg apple-subheadline max-w-2xl mx-auto">
            Respuestas directas y sin vueltas sobre compras por curva, facturación oficial con CUIT y traslados bonificados al expreso.
          </p>

          {/* Search Input with Glassmorphism */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar duda (ej: envíos, curvas, factura, CUIT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-lg transition-all"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List with ReactBits SpotlightCard */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <SpotlightCard
                key={faq.id || idx}
                spotlightColor="rgba(224, 76, 50, 0.14)"
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900 border-primary/50 shadow-xl shadow-primary/10'
                    : 'bg-neutral-900/70 hover:bg-neutral-900 border-neutral-800/80'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-sf-bold ${
                      isOpen ? 'bg-primary text-white' : 'bg-neutral-950 border border-neutral-800 text-neutral-400'
                    }`}>
                      0{idx + 1}
                    </div>
                    <span className="font-sf-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-primary/20 text-primary' : 'bg-neutral-950 text-neutral-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 font-sf-regular leading-relaxed border-t border-neutral-800/60 mt-1">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Quick Advisor Contact Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sf-bold text-xs sm:text-sm text-white">¿Tenés una consulta específica sobre tu local?</h4>
              <p className="text-[11px] text-neutral-400 font-sf-regular">Chateá al instante con Juliana o Jesica para resolver dudas en vivo.</p>
            </div>
          </div>

          <button
            onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[0]) : null}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/25 shrink-0 transition-transform active:scale-95"
          >
            <span>Consultar por WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
