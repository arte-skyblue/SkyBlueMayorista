import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Send,
  Building,
  FileSpreadsheet,
  Truck,
  FileCheck
} from 'lucide-react';
import { ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState('catalog');
  const { isDark } = useTheme();

  const intents = [
    {
      id: 'catalog',
      label: '📦 Pedir Catálogo',
      text: '¡Hola! Quiero solicitar los catálogos mayoristas con lista de precios de la nueva temporada.'
    },
    {
      id: 'stock',
      label: '👟 Consultar Stock',
      text: '¡Hola! Quiero consultar disponibilidad de stock y curvas de talles para mi zapatería.'
    },
    {
      id: 'showroom',
      label: '🏢 Cita Showroom',
      text: '¡Hola! Quiero coordinar una visita con cita previa al Showroom Mayorista de Tapiales.'
    },
    {
      id: 'cuit',
      label: '📄 Alta con CUIT',
      text: '¡Hola! Quiero solicitar el alta comercial como cliente mayorista con mi número de CUIT.'
    }
  ];

  const currentIntentText = intents.find((i) => i.id === selectedIntent)?.text || intents[0].text;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Expanded Popup Menu (Light / Dark Adaptive Theme) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3.5 w-[330px] sm:w-[380px] max-w-[calc(100vw-2.5rem)] rounded-[28px] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl shadow-2xl shadow-neutral-950/25 border border-slate-200/90 dark:border-neutral-800 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300"
          >
            
            {/* Header (Adaptive Theme with Emerald Accent) */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-emerald-50/80 dark:from-emerald-950/30 via-white dark:via-neutral-950 to-white dark:to-neutral-950 border-b border-slate-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-950 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sf-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                      Asesores SkyBlue B2B
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-sf-bold">
                      En línea
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sf-regular flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Respuesta comercial inmediata</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar ventana de asesores"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Intent Shortcut Chips */}
            <div className="px-4 sm:px-5 pt-3 pb-1 bg-slate-50/70 dark:bg-neutral-900/50">
              <span className="text-[10px] font-sf-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                ¿Qué necesitas consultar?
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {intents.map((intent) => {
                  const isActive = selectedIntent === intent.id;
                  return (
                    <button
                      key={intent.id}
                      onClick={() => setSelectedIntent(intent.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-sf-medium text-left transition-all truncate border ${
                        isActive
                          ? 'bg-emerald-600 text-white font-sf-bold border-emerald-600 shadow-xs'
                          : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 border-slate-200/80 dark:border-neutral-800'
                      }`}
                    >
                      {intent.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advisors List */}
            <div className="p-4 sm:p-5 space-y-2.5 max-h-[310px] overflow-y-auto custom-scrollbar">
              
              {/* Opción Rápida Directa */}
              <a
                href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola! Quiero consultar listas de precios mayoristas, catálogos en PDF y condiciones para mi local/showroom.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="font-sf-bold text-xs block leading-tight">Atención Comercial Inmediata</span>
                    <span className="text-[10px] text-emerald-100 font-sf-medium">Catálogo general y cotizaciones</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <span className="text-[10px] font-sf-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider block pt-1 mb-1">
                O elegí una asesora directa:
              </span>

              {ADVISORS.map((advisor) => (
                <SpotlightCard
                  key={advisor.id}
                  spotlightColor={isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.08)"}
                  className="rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 hover:bg-emerald-50/40 dark:hover:bg-neutral-900 hover:border-emerald-300 dark:hover:border-emerald-500/40 shadow-xs transition-all duration-200 overflow-hidden"
                >
                  <a
                    href={`https://wa.me/${advisor.cleanPhone}?text=${encodeURIComponent(
                      `Hola ${advisor.name.split(' ')[0]}! ` + currentIntentText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-3.5 flex items-center justify-between gap-3 group select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={advisor.avatar}
                          alt={advisor.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-neutral-700 shadow-xs"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-950" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-sf-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {advisor.name}
                          </h5>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-sf-medium">
                            {advisor.id === 'juliana' ? 'Dama & Showroom' : advisor.id === 'jesica' ? 'Kids & CUIT' : 'Marketing'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-neutral-400 font-sf-regular line-clamp-1 mt-0.5">
                          {advisor.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 group-hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 group-hover:text-white flex items-center justify-center shrink-0 shadow-xs transition-all">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                </SpotlightCard>
              ))}
            </div>

            {/* Trust Footer */}
            <div className="p-3 sm:p-3.5 bg-slate-50 dark:bg-neutral-900/90 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-slate-600 dark:text-neutral-400 font-sf-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Factura A/B • Curvas 8 y 12 pares</span>
              </div>
              <span className="font-sf-bold text-emerald-700 dark:text-emerald-400">
                10% OFF 1ra Compra
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-sf-bold text-xs sm:text-sm shadow-2xl shadow-neutral-950/30 border border-slate-200/90 dark:border-neutral-800 transition-all duration-300"
        aria-label="Abrir WhatsApp Mayorista con Asesores"
      >
        {/* Advisor Mini Avatar Stack */}
        <div className="flex items-center -space-x-2">
          {ADVISORS.map((adv, i) => (
            <img
              key={adv.id}
              src={adv.avatar}
              alt={adv.name}
              className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-neutral-900 shadow-xs"
              style={{ zIndex: 3 - i }}
            />
          ))}
        </div>

        {/* Pulsating Emerald WhatsApp Icon */}
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white shadow-xs">
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <span className="font-sf-bold text-slate-900 dark:text-white tracking-tight pr-1">
          {isOpen ? 'Cerrar' : 'Asesores Online'}
        </span>
      </motion.button>

    </div>
  );
}

