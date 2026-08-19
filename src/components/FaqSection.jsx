import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Plus, 
  Minus, 
  Search, 
  MessageCircle, 
  Sparkles, 
  Layers, 
  Lock, 
  Percent, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  Send,
  Users
} from 'lucide-react';
import { FAQS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function FaqSection({ onOpenAdvisorModal }) {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todas', name: 'Todas las Preguntas', icon: HelpCircle, count: FAQS.length },
    { id: 'minimos', name: 'Módulos & Mínimos (8/12 Pares)', icon: Layers, count: 2 },
    { id: 'precios', name: 'Precios & Plataforma B2B', icon: Lock, count: 2 },
    { id: 'pagos', name: '10% Adicional & Pagos', icon: Percent, count: 1 },
    { id: 'showroom', name: 'Showroom Tapiales (1er Piso)', icon: Building2, count: 1 },
    { id: 'envios', name: 'Envíos a Todo el País', icon: Truck, count: 2 },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'todas' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>Centro de Ayuda Mayorista B2B</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Preguntas Frecuentes de Zapaterías y Locales
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Resolvé de forma rápida tus dudas comerciales antes de realizar tu pedido por módulos.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave: CUIT, 8 pares, María Becerra, Tapiales..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm text-white placeholder:text-slate-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* FAQ 7 Architecture: Vertical Category Rail on Left + Interactive Accordion on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (4 Cols): Vertical Category Rail with Layout-Animated Indicator (FAQ-7 Pattern) */}
          <div className="lg:col-span-4 space-y-2 p-2 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-3 py-2 block">
              Categorías de Ayuda:
            </span>

            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm flex items-center justify-between transition-all relative ${
                    isActive
                      ? 'text-slate-950 font-black shadow-lg shadow-sky-500/20'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {/* Animated Background Indicator for Active Rail Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="faq-category-rail-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-sky-400'}`} />
                    <span>{cat.name}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950 text-sky-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}

            {/* Sticky Advisor Mini-Trigger in Left Rail */}
            <div className="pt-4 mt-4 border-t border-slate-800 px-3 pb-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>¿Pregunta puntual?</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Juliana y el equipo comercial te asesoran directamente por WhatsApp.
              </p>
              <button
                onClick={() => onOpenAdvisorModal(ADVISORS[0])}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column (8 Cols): Accordion List */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-slate-900 border-sky-400/70 shadow-xl shadow-sky-500/5'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                          isOpen ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                        }`}>
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>

                        <span className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                          isOpen ? 'text-white font-extrabold' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {faq.question}
                        </span>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-sky-500 text-slate-950 rotate-180' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                          <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 mt-1">
                            <p className="pt-4">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
                <p className="font-bold text-slate-300">No encontramos resultados para tu búsqueda.</p>
                <p className="text-xs text-slate-500">Probá con otra palabra clave o consultanos por WhatsApp.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
