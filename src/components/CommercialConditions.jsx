import React, { useState } from 'react';
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
  ShieldCheck 
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function CommercialConditions({ onOpenModal, onOpenAdvisorModal }) {
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);

  const conditions = [
    {
      icon: Building2,
      tag: "EXCLUSIVO B2B",
      title: "Precios Sin IVA + Factura A/B",
      description: "Precios de catálogo netos sin IVA. Todas las ventas requieren facturación obligatoria (Factura A o B oficial con CUIT), garantizando mercadería 100% importada legalmente por aduana.",
      highlight: "Facturación oficial con CUIT comercial",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      spotlight: "rgba(224, 76, 50, 0.16)"
    },
    {
      icon: Layers,
      tag: "SURTIDO DE FÁBRICA",
      title: "Módulos de 8 y 12 Pares",
      description: "Curvas surtidas de manera ideal directo de fábrica con máxima concentración en talles centrales (37 y 38 en dama) para rápida rotación de mostrador y cero clavos de stock.",
      highlight: "Curvas balanceadas de alta rotación",
      badgeColor: "bg-neutral-900 text-white border-neutral-700",
      spotlight: "rgba(224, 76, 50, 0.16)"
    },
    {
      icon: Percent,
      tag: "PAGO Y CONDICIONES",
      title: "10% Adicional en tu Pago",
      description: "Abonando en efectivo en showroom, mediante transferencia bancaria inmediata o depósito, aplicás un 10% de descuento adicional sobre la liquidación neta de tu compra.",
      highlight: "Aumenta directo tu margen de ganancia",
      badgeColor: "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
      spotlight: "rgba(16, 185, 129, 0.16)"
    },
    {
      icon: Truck,
      tag: "LOGÍSTICA FEDERAL",
      title: "Envío Gratis en CABA y GBA",
      description: "Entrega 100% bonificada y gratuita en CABA y Gran Buenos Aires. Para el interior: embalaje y traslado sin cargo hasta tu expreso de confianza (Vía Cargo, Cruz del Sur, etc.) en 24 a 48 hs.",
      highlight: "Despacho bonificado hasta tu transporte",
      badgeColor: "bg-amber-950/60 text-amber-300 border-amber-500/30",
      spotlight: "rgba(245, 158, 11, 0.16)"
    }
  ];

  return (
    <section id="condiciones" className="py-16 sm:py-20 2xl:py-28 bg-neutral-950 text-white border-b border-neutral-800 relative">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary apple-kicker text-[11px]">
            <FileCheck className="w-3.5 h-3.5 text-primary" />
            <span>Condiciones Comerciales Mayoristas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">CONDICIONES</span>
            <span className="font-sf-bold text-white">COMERCIALES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            En <span className="font-bold text-white">SkyBlue Calzado Mayorista</span> establecemos reglas comerciales claras: venta por módulos surtidos de fábrica, precios netos protegidos y logística bonificada.
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
                className="p-6 sm:p-7 bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-primary/40 hover:shadow-xl flex flex-col justify-between rounded-3xl"
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

                  <h3 className="font-sf-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sf-regular text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-sf-medium text-neutral-200">
                    {item.highlight}
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Curvas de Fábrica Box & Guía de Talles Modal Trigger */}
        <div className="mt-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 2xl:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-sf-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Distribución Oficial de Fábrica</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-sf-bold text-white">
                Curvas Ideales de Numeración (8 y 12 Pares)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-sf-regular">
                Cada caja cerrada viene configurada con las proporciones exactas de venta masiva de fábrica.
              </p>
            </div>

            <button
              onClick={() => setShowSizeGuideModal(true)}
              className="px-5 py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-sf-bold text-xs sm:text-sm border border-neutral-700 flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <Ruler className="w-4 h-4 text-primary" />
              <span>Ver Guía de Talles Oficial</span>
            </button>
          </div>

          {/* Curvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-800">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <span className="text-xs font-sf-bold text-primary uppercase tracking-wider block">
                Módulo de 8 Pares (Ejemplo Dama):
              </span>
              <div className="text-sm font-sf-medium text-neutral-200">
                1/36 — 2/37 — 2/38 — 2/39 — 1/40
              </div>
              <span className="text-[11px] text-neutral-400 block">
                75% concentrado en los números más demandados de mostrador.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <span className="text-xs font-sf-bold text-emerald-400 uppercase tracking-wider block">
                Módulo de 12 Pares (Ejemplo Dama):
              </span>
              <div className="text-sm font-sf-medium text-neutral-200">
                1/35 — 2/36 — 3/37 — 3/38 — 2/39 — 1/40
              </div>
              <span className="text-[11px] text-neutral-400 block">
                Mayor volumen y reposición continua para locales de alto tránsito.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Guía de Talles Oficial */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-sf-bold text-white">Guía Oficial de Talles y Medidas</h3>
              </div>
              <button
                onClick={() => setShowSizeGuideModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
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

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
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
