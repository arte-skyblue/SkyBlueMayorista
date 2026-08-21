import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Plus,
  ArrowRight,
  Truck,
  FileText,
  Building2,
  Percent
} from 'lucide-react';
import { FAQS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function FaqSection({ onOpenAdvisorModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'todas', label: 'Todas las preguntas' },
    { id: 'minimos', label: 'Curvas & Módulos' },
    { id: 'envios', label: 'Envíos y Logística' },
    { id: 'precios', label: 'Precios & Factura' },
    { id: 'pagos', label: '10% Descuento' },
    { id: 'showroom', label: 'Showroom' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'todas' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Background Subtle Atmospheric Glow */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-primary/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (Sticky Sidebar - ReactBits FAQ-2 pattern) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-sf-bold shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span>Centro de Ayuda Mayorista</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl uppercase tracking-tight apple-headline">
                <span className="font-sf-light-italic text-neutral-400 mr-2">PREGUNTAS</span>
                <span className="font-sf-bold text-white">FRECUENTES</span>
              </h2>

              <p className="font-sf-regular text-neutral-300 text-sm sm:text-base leading-relaxed">
                Todo lo que necesitás saber sobre compras por curva, facturación oficial con CUIT, traslados bonificados al expreso y rentabilidad garantizada.
              </p>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-sf-bold text-neutral-400 uppercase tracking-wider block">
                Filtrar por tema:
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setOpenIndex(0);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-sf-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white font-sf-bold shadow-md shadow-primary/25 scale-105'
                          : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advisor Help Card */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.15)"
              className="p-5 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={ADVISORS[0].avatar}
                    alt={ADVISORS[0].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                </div>
                <div>
                  <h4 className="font-sf-bold text-sm text-white">¿Tenés una consulta puntual?</h4>
                  <p className="text-xs text-neutral-400 font-sf-regular">Juliana está en línea para responderte.</p>
                </div>
              </div>

              <a
                href="https://wa.me/5491138916779?text=Hola%20Juliana!%20Tengo%20una%20consulta%20sobre%20la%20compra%20mayorista%20en%20SkyBlue."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chatear por WhatsApp Ahora</span>
              </a>
            </SpotlightCard>
          </div>

          {/* Right Column (Accordion List - ReactBits FAQ-2 pattern) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Search Bar with Crisp Glassmorphism */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar duda (ej: envíos, curvas, factura, CUIT, 10% off)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(0);
                }}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-lg transition-all"
              />
            </div>

            {/* Accordion Items */}
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <motion.div
                      layout
                      key={idx}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'bg-neutral-900 border-primary/50 shadow-xl shadow-primary/10'
                          : 'bg-neutral-900/60 hover:bg-neutral-900/90 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start sm:items-center gap-3.5 pr-2">
                          <span className={`text-xs font-sf-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5 sm:mt-0 ${
                            isOpen ? 'bg-primary text-white' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                          }`}>
                            0{idx + 1}
                          </span>
                          <span className="font-sf-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors leading-snug">
                            {faq.question}
                          </span>
                        </div>

                        {/* Animated Plus / Close Toggle Icon (+ to × transition) */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen 
                            ? 'bg-primary text-white rotate-45 shadow-md shadow-primary/30' 
                            : 'bg-neutral-950 text-neutral-400 border border-neutral-800 group-hover:border-neutral-600 group-hover:text-white'
                        }`}>
                          <Plus className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-sf-regular leading-relaxed border-t border-neutral-800/60 mt-1">
                              <p>{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 text-neutral-400 text-sm">
                  No se encontraron preguntas con el término "{searchQuery}". Podés consultarle directamente a un asesor en el botón de la izquierda.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
