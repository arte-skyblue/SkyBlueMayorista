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
  Flame 
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';

export default function CommercialConditions({ onOpenModal, onOpenAdvisorModal }) {
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [activeCurveTab, setActiveCurveTab] = useState('8pares');
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
      description: "Disfrutá de un 10% OFF directo en tu primer pedido por módulos. Además, mantenés un 10% adicional permanente abonando por transferencia o efectivo en showroom.",
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

  const currentCurve = activeCurveTab === '8pares' ? curve8 : curve12;

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
            En <span className="font-bold text-slate-900 dark:text-white">SkyBlue Calzado Mayorista</span> establecemos reglas claras: venta por módulos surtidos de fábrica, precios netos protegidos y logística bonificada.
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

        {/* Interactive Factory Box Curve Infographic */}
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
                El 75% del módulo viene concentrado en los talles más vendidos (37, 38 y 39), garantizando rotación total.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                <button
                  onClick={() => setActiveCurveTab('8pares')}
                  className={`px-4 py-2 rounded-lg text-xs font-sf-bold transition-all ${
                    activeCurveTab === '8pares' ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Curva 8 Pares
                </button>
                <button
                  onClick={() => setActiveCurveTab('12pares')}
                  className={`px-4 py-2 rounded-lg text-xs font-sf-bold transition-all ${
                    activeCurveTab === '12pares' ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Curva 12 Pares
                </button>
              </div>

              <button
                onClick={() => setShowSizeGuideModal(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 font-sf-bold text-xs border border-slate-300 dark:border-neutral-700 flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
              >
                <Ruler className="w-4 h-4 text-primary" />
                <span>Guía de Talles</span>
              </button>
            </div>
          </div>

          {/* Animated Visual Curve Distribution Bars */}
          <div className="pt-8">
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-4 items-end min-h-[180px]">
              {currentCurve.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  {item.hot && (
                    <span className="flex items-center gap-1 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30">
                      <Flame className="w-2.5 h-2.5" />
                      <span>TOP</span>
                    </span>
                  )}
                  
                  <span className="text-xs font-sf-bold text-slate-900 dark:text-white">
                    {item.pairs} {item.pairs === 1 ? 'par' : 'pares'}
                  </span>

                  {/* Animated Bar */}
                  <div className="w-full max-w-[60px] bg-slate-100 dark:bg-neutral-950 rounded-2xl p-1 border border-slate-200 dark:border-neutral-800 h-[100px] flex items-end">
                    <motion.div
                      key={`${activeCurveTab}-${item.size}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${item.percent * 3.2}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-xl ${
                        item.hot ? 'bg-gradient-to-t from-red-600 to-rose-400 shadow-lg shadow-red-600/30' : 'bg-slate-300 dark:bg-neutral-700'
                      }`}
                    />
                  </div>

                  <span className="text-sm font-sf-bold text-slate-900 dark:text-white">
                    Talle {item.size}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-sf-medium">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Las cajas vienen precintadas de origen por el fabricante con su etiqueta de control de calidad.</span>
              </div>
              <span className="font-sf-bold text-primary shrink-0">
                100% Listo para Exhibir y Vender
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
