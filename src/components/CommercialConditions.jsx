import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Layers, 
  Percent, 
  Truck, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  ExternalLink, 
  Ruler, 
  X, 
  ShieldCheck, 
  PackageCheck, 
  Flame,
  Sparkles 
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';
// Elegant Woman Shoe (High Heel / Stiletto) SVG Icon
function WomanShoeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-label="Zapato de mujer">
      <path d="M216,144a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V152A8,8,0,0,0,216,144ZM32,168a8,8,0,0,0,8,8h75.78l33.68-47.16A56.24,56.24,0,0,1,192,104a8,8,0,0,0,8-8V80a8,8,0,0,0-13.66-5.66l-50.62,50.63a40.16,40.16,0,0,0-8.26,13.23L108.22,160H40A8,8,0,0,0,32,168Z" />
    </svg>
  );
}

// Elegant Woman Boot / Ankle Boot SVG Icon
function WomanBootIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-label="Bota de mujer">
      <path d="M224,184V144a8,8,0,0,0-2.48-5.81L168,84.69V40a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8V184a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24Zm-16,8H104a8,8,0,0,1-8-8V48h56V88a8,8,0,0,0,2.34,5.66l51.66,51.65V184A8,8,0,0,1,208,192Z" />
    </svg>
  );
}

export default function CommercialConditions({ onOpenModal, onOpenAdvisorModal }) {
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [activeCurveTab, setActiveCurveTab] = useState('12pares'); // 12 pares por defecto
  const [footwearIconType, setFootwearIconType] = useState('zapato'); // 'zapato' or 'bota'
  const { isDark } = useTheme();

  const conditions = [
    {
      icon: Building2,
      tag: "FACTURACIÓN",
      title: "Factura A/B con CUIT",
      description: "Precios de catálogo netos sin IVA. Todas las ventas cuentan con facturación oficial (Factura A o B con CUIT), garantizando mercadería 100% legal e importada formalmente por aduana.",
      highlight: "Facturación oficial con CUIT comercial",
      badgeColor: "bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white border-slate-300 dark:border-white/20",
      spotlight: isDark ? "rgba(224, 76, 50, 0.16)" : "rgba(224, 76, 50, 0.08)"
    },
    {
      icon: Layers,
      tag: "SURTIDO DE FÁBRICA",
      title: "Curvas de 8 y 12 Pares",
      description: "Curvas surtidas de manera ideal directo de fábrica con 75% de concentración en talles centrales (37 y 38 en dama) para rápida rotación de mostrador y cero remanentes.",
      highlight: "Curvas balanceadas de alta rotación",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      spotlight: isDark ? "rgba(224, 76, 50, 0.16)" : "rgba(224, 76, 50, 0.08)"
    },
    {
      icon: Percent,
      tag: "BIENVENIDA MAYORISTA",
      title: "10% OFF En tu primer compra",
      description: "Aboná por transferencia o efectivo y obtené un 10% de descuento directo en tu factura, sumando ganancia líquida a tu negocio.",
      highlight: "10% OFF de bienvenida + pago ágil",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30",
      spotlight: isDark ? "rgba(16, 185, 129, 0.16)" : "rgba(16, 185, 129, 0.08)"
    },
    {
      icon: Truck,
      tag: "LOGÍSTICA FEDERAL",
      title: "Envíos a todo el país",
      description: "Entrega 100% bonificada en CABA y Gran Buenos Aires. Para el interior: embalaje y traslado sin cargo hasta tu expreso de confianza (Vía Cargo, Cruz del Sur, etc.) en 24 a 48 hs.",
      highlight: "Despacho bonificado en 24 a 48 hs",
      badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30",
      spotlight: isDark ? "rgba(245, 158, 11, 0.16)" : "rgba(245, 158, 11, 0.08)"
    }
  ];

  // Distribution data for factory curve infographic
  const curve8 = [
    { size: '36', pairs: 1, percent: 12.5, hot: false },
    { size: '37', pairs: 2, percent: 25.0, hot: true },
    { size: '38', pairs: 2, percent: 25.0, hot: true },
    { size: '39', pairs: 2, percent: 25.0, hot: true },
    { size: '40', pairs: 1, percent: 12.5, hot: false }
  ];

  const curve12 = [
    { size: '35', pairs: 1, percent: 8.3, hot: false },
    { size: '36', pairs: 2, percent: 16.7, hot: false },
    { size: '37', pairs: 3, percent: 25.0, hot: true },
    { size: '38', pairs: 3, percent: 25.0, hot: true },
    { size: '39', pairs: 2, percent: 16.7, hot: true },
    { size: '40', pairs: 1, percent: 8.3, hot: false }
  ];

  const currentCurve = activeCurveTab === '12pares' ? curve12 : curve8;

  return (
    <section id="condiciones" className="py-16 sm:py-20 2xl:py-28 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 relative transition-colors duration-300">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-slate-500 dark:text-neutral-400 mr-2">CONDICIONES</span>
            <span className="font-sf-bold text-slate-900 dark:text-white">COMERCIALES</span>
          </h2>

          <p className="font-sf-medium text-slate-600 dark:text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Comprá con reglas claras: curvas de fábrica balanceadas para no quedarte con pares clavados, 10% OFF por transferencia y flete bonificado.
          </p>
        </div>

        {/* 4 Cards Grid with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {conditions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor={item.spotlight}
                className="p-6 sm:p-7 bg-white/95 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 hover:border-primary/40 hover:shadow-xl flex flex-col justify-between rounded-3xl transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 shadow-xs border border-primary/20 flex items-center justify-center text-primary transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-sf-bold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-sf-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sf-regular text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-sf-medium text-slate-800 dark:text-neutral-200">
                    {item.highlight}
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Interactive Factory Box Curve Infographic with Shoes & Boots Representation */}
        <div className="mt-12 rounded-3xl bg-white/95 dark:bg-neutral-900/90 border border-slate-200/90 dark:border-neutral-800 p-6 sm:p-8 2xl:p-10 shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-neutral-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-sf-bold text-xs uppercase tracking-wider">
                <PackageCheck className="w-4 h-4" />
                <span>Infografía de Caja Cerrada de Fábrica</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-sf-bold text-slate-900 dark:text-white">
                Distribución Ideal de Talles (Cero Clavos de Stock)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-2xl font-sf-regular">
                El módulo viene cargado en los números centrales para que vendas la caja entera de forma pareja y recuperes tu dinero rápido.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Curve Selector: 12 Pares (Default) / 8 Pares */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xs">
                <button
                  onClick={() => setActiveCurveTab('12pares')}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-sf-bold transition-all flex items-center gap-1.5 ${
                    activeCurveTab === '12pares'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span>Curva 12 Pares</span>
                  <span className="text-[10px] opacity-85 hidden sm:inline">(Por Defecto)</span>
                </button>
                <button
                  onClick={() => setActiveCurveTab('8pares')}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-sf-bold transition-all ${
                    activeCurveTab === '8pares'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Curva 8 Pares
                </button>
              </div>

              {/* Shoe / Boot Icon Mode Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xs">
                <button
                  onClick={() => setFootwearIconType('zapato')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sf-bold transition-all flex items-center gap-1.5 ${
                    footwearIconType === 'zapato'
                      ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs border border-slate-300/80 dark:border-neutral-700'
                      : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Representar con Zapatos de Mujer (Stilettos / Pumps)"
                >
                  <WomanShoeIcon className="w-4 h-4 text-red-500" />
                  <span className="hidden sm:inline">Zapato</span>
                </button>
                <button
                  onClick={() => setFootwearIconType('bota')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sf-bold transition-all flex items-center gap-1.5 ${
                    footwearIconType === 'bota'
                      ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs border border-slate-300/80 dark:border-neutral-700'
                      : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Representar con Botas de Mujer (Botinetas / Botas)"
                >
                  <WomanBootIcon className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Bota</span>
                </button>
              </div>

              {/* Guía de Talles Button */}
              <button
                onClick={() => setShowSizeGuideModal(true)}
                className="px-4 sm:px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 font-sf-bold text-xs border border-slate-300 dark:border-neutral-700 flex items-center gap-2 shadow-xs hover:scale-105 transition-all"
              >
                <Ruler className="w-4 h-4 text-primary" />
                <span>Guía de Talles</span>
              </button>
            </div>
          </div>

          {/* Animated Visual Curve Distribution With Real Shoe/Boot Stacks */}
          <div className="pt-8">
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5 sm:gap-4 items-end min-h-[220px]">
              {currentCurve.map((item, idx) => (
                <div key={`${activeCurveTab}-${item.size}`} className="flex flex-col items-center gap-2.5 h-full justify-end group">
                  {/* Top Badge (TOP SALIDA) */}
                  <div className="h-6 flex items-center">
                    {item.hot ? (
                      <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-2 py-0.5 rounded-full border border-red-300 dark:border-red-500/30 shadow-xs">
                        <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 animate-pulse" />
                        <span className="tracking-tight">TOP SALIDA</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-sf-medium">
                        Curva base
                      </span>
                    )}
                  </div>
                  
                  {/* Quantity of Pairs */}
                  <span className={`text-xs sm:text-sm font-sf-bold ${
                    item.hot ? 'text-primary font-black' : 'text-slate-900 dark:text-white'
                  }`}>
                    {item.pairs} {item.pairs === 1 ? 'par' : 'pares'}
                  </span>

                  {/* Vertical Shoe / Boot Rack Container */}
                  <div className={`w-full max-w-[80px] sm:max-w-[96px] rounded-2xl p-1.5 sm:p-2 border flex flex-col justify-end gap-1.5 min-h-[155px] sm:min-h-[175px] transition-all duration-300 ${
                    item.hot 
                      ? 'bg-gradient-to-t from-red-500/10 via-rose-500/5 to-transparent border-red-500/30 dark:border-red-500/40 shadow-lg shadow-red-500/10 group-hover:border-red-500 group-hover:scale-105' 
                      : 'bg-slate-100/80 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 group-hover:border-slate-300 dark:group-hover:border-neutral-700'
                  }`}>
                    {/* Stack of Shoe / Boot icons: 1, 2 or 3 pairs stacked */}
                    {Array.from({ length: item.pairs }).map((_, pairIdx) => (
                      <motion.div
                        key={`${activeCurveTab}-${item.size}-${pairIdx}`}
                        initial={{ opacity: 0, scale: 0.5, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          duration: 0.35, 
                          delay: idx * 0.05 + pairIdx * 0.08,
                          type: 'spring',
                          stiffness: 400,
                          damping: 24 
                        }}
                        className={`py-1.5 sm:py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                          item.hot
                            ? 'bg-white/95 dark:bg-neutral-900/90 text-red-600 dark:text-red-400 border border-red-400/40 shadow-sm shadow-red-500/20'
                            : 'bg-white/90 dark:bg-neutral-900/80 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 shadow-xs'
                        }`}
                        title={`Par ${pairIdx + 1} de ${item.pairs} en talle ${item.size}`}
                      >
                        {footwearIconType === 'zapato' ? (
                          <WomanShoeIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                        ) : (
                          <WomanBootIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                        )}
                        <span className="text-[9px] font-sf-bold text-slate-500 dark:text-neutral-400 hidden sm:inline">
                          #{pairIdx + 1}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Size Label & Percentage */}
                  <div className="text-center pt-1">
                    <span className="text-sm sm:text-base font-sf-bold text-slate-900 dark:text-white block">
                      Talle {item.size}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-sf-bold block ${
                      item.hot ? 'text-primary' : 'text-slate-500 dark:text-neutral-400'
                    }`}>
                      {item.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Insight Bar */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  {activeCurveTab === '12pares' 
                    ? 'Curva oficial de 12 pares: 8 de los 12 pares (67%) se concentran en talles centrales (37, 38 y 39).' 
                    : 'Curva oficial de 8 pares: 6 de los 8 pares (75%) se concentran en talles centrales (37, 38 y 39).'}
                </span>
              </div>
              <span className="font-sf-bold text-primary shrink-0 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Salida Pareja • Cero Remanentes</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Modal Guía de Talles Oficial */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl overflow-hidden text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-sf-bold text-slate-900 dark:text-white">Guía Oficial de Talles y Medidas</h3>
              </div>
              <button
                onClick={() => setShowSizeGuideModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-slate-700 dark:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4">
              <img
                src="/assets/images/guia-de-tallas.jpeg"
                alt="Guía de Talles y Medidas Oficial SkyBlue"
                className="w-full h-auto rounded-2xl object-contain shadow-md"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowSizeGuideModal(false)}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs"
              >
                Cerrar Guía
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
