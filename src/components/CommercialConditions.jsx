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
      spotlight: "rgba(224, 76, 50, 0.15)"
    },
    {
      icon: Layers,
      tag: "SURTIDO DE FÁBRICA",
      title: "Módulos de 8 y 12 Pares",
      description: "Curvas surtidas de manera ideal directo de fábrica con máxima concentración en talles centrales (37 y 38 en dama) para rápida rotación de mostrador y cero clavos de stock.",
      highlight: "Curvas balanceadas de alta rotación",
      badgeColor: "bg-secondary text-foreground border-border",
      spotlight: "rgba(224, 76, 50, 0.15)"
    },
    {
      icon: Percent,
      tag: "PAGO Y CONDICIONES",
      title: "10% Adicional en tu Pago",
      description: "Abonando en efectivo en showroom, mediante transferencia bancaria inmediata o depósito, aplicás un 10% de descuento adicional sobre la liquidación neta de tu compra.",
      highlight: "Aumenta directo tu margen de ganancia",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      spotlight: "rgba(16, 185, 129, 0.15)"
    },
    {
      icon: Truck,
      tag: "LOGÍSTICA FEDERAL",
      title: "Envío Gratis en CABA y GBA",
      description: "Entrega 100% bonificada y gratuita en CABA y Gran Buenos Aires. Para el interior: embalaje y traslado sin cargo hasta tu expreso de confianza (Vía Cargo, Cruz del Sur, etc.) en 24 a 48 hs.",
      highlight: "Despacho bonificado hasta tu transporte",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      spotlight: "rgba(245, 158, 11, 0.15)"
    }
  ];

  return (
    <section id="condiciones" className="py-16 sm:py-20 2xl:py-28 bg-background border-b border-border relative">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs 2xl:text-sm font-extrabold uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-primary" />
            <span>Condiciones Comerciales Mayoristas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl font-black text-foreground tracking-tight">
            Transparencia y Rentabilidad para tu Comercio
          </h2>

          <p className="text-base sm:text-lg 2xl:text-xl text-muted-foreground font-normal">
            En <span className="font-semibold text-foreground">SkyBlue Calzado Mayorista</span> establecemos reglas comerciales claras: venta por módulos surtidos de fábrica, precios netos protegidos y logística bonificada.
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
                className="p-6 bg-card hover:bg-card/90 border-border hover:border-primary/40 hover:shadow-xl flex flex-col justify-between rounded-3xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 shadow-xs border border-primary/20 flex items-center justify-center text-primary transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={'text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ' + item.badgeColor}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Visual Matrix of Factory Size Curves & Guide Button */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Curvas Surtidas Directo de Fábrica</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Composición Estándar de Módulos (Calzado Dama 35 al 40)
              </h3>
              <p className="text-sm text-muted-foreground">
                Surtido comercial optimizado desde fábrica con máxima concentración en talles 37 y 38 para rápida rotación.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => setShowSizeGuideModal(true)}
                className="px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-bold text-xs border border-primary/20 hover:border-primary transition-all flex items-center gap-2 shadow-xs"
              >
                <Ruler className="w-4 h-4" />
                <span>Ver Guía de Talles Oficial</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Curva 8 Pares */}
            <div className="p-5 rounded-2xl bg-secondary/50 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-foreground uppercase tracking-wide">
                  Curva 8 Pares (Módulo Clásico)
                </span>
                <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  Total: 8 Pares
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-card border border-border">
                  <div className="text-xs text-muted-foreground font-semibold">T. 36</div>
                  <div className="text-base font-black text-foreground">1 par</div>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-xs text-primary font-bold">T. 37</div>
                  <div className="text-base font-black text-primary">2 pares</div>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-xs text-primary font-bold">T. 38</div>
                  <div className="text-base font-black text-primary">2 pares</div>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-xs text-primary font-bold">T. 39</div>
                  <div className="text-base font-black text-primary">2 pares</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-border">
                  <div className="text-xs text-muted-foreground font-semibold">T. 40</div>
                  <div className="text-base font-black text-foreground">1 par</div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                * Concentración del 75% en talles 37, 38 y 39 (los más pedidos en mostrador).
              </p>
            </div>

            {/* Curva 12 Pares */}
            <div className="p-5 rounded-2xl bg-secondary/50 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-foreground uppercase tracking-wide">
                  Curva 12 Pares (Módulo Completo)
                </span>
                <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  Total: 12 Pares
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1.5 sm:gap-2 text-center">
                <div className="p-2 rounded-xl bg-card border border-border">
                  <div className="text-[11px] text-muted-foreground font-semibold">T. 35</div>
                  <div className="text-sm font-black text-foreground">1 par</div>
                </div>
                <div className="p-2 rounded-xl bg-card border border-border">
                  <div className="text-[11px] text-muted-foreground font-semibold">T. 36</div>
                  <div className="text-sm font-black text-foreground">2 pares</div>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-[11px] text-primary font-bold">T. 37</div>
                  <div className="text-sm font-black text-primary">3 pares</div>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-[11px] text-primary font-bold">T. 38</div>
                  <div className="text-sm font-black text-primary">3 pares</div>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/30 ring-2 ring-primary/20">
                  <div className="text-[11px] text-primary font-bold">T. 39</div>
                  <div className="text-sm font-black text-primary">2 pares</div>
                </div>
                <div className="p-2 rounded-xl bg-card border border-border">
                  <div className="text-[11px] text-muted-foreground font-semibold">T. 40</div>
                  <div className="text-sm font-black text-foreground">1 par</div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                * Cobertura completa de numeración con 8 pares concentrados en 37, 38 y 39.
              </p>
            </div>
          </div>
        </div>

        {/* B2B Private Platform Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-foreground text-background shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-border">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Plataforma Exclusiva para Comerciantes</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-background">
              ¿Buscás ver listas de precios netos y stock en tiempo real?
            </h4>
            <p className="text-muted text-sm max-w-2xl">
              Accedé a nuestra plataforma B2B mayorista en <span className="text-amber-300 font-bold">mayoristas.skyblue.com.ar</span>. Para proteger a nuestros clientes, deberás solicitar una cuenta ingresando tus datos personales y CUIT comercial.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ingresar a mayoristas.skyblue.com.ar</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenModal('alta')}
              className="px-5 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-sm transition-all"
            >
              <span>Solicitar Cuenta con CUIT</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal de Guía de Talles Oficial */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 border border-border shadow-2xl relative">
            <button
              onClick={() => setShowSizeGuideModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
              aria-label="Cerrar guía de talles"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase">
                <Ruler className="w-3.5 h-3.5" />
                <span>Tabla de Medidas Oficial SkyBlue</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Guía de Talles y Equivalencias de Calzado
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Medidas exactas en centímetros y correspondencia de numeración para calzado importado oficial.
              </p>
            </div>

            {/* Imagen oficial de la Guía de Talles cargada en el proyecto */}
            <div className="rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center shadow-inner">
              <img
                src={COMPANY_INFO.sizeGuideImage}
                alt="Guía de Talles Oficial SkyBlue Calzado Mayorista"
                className="w-full h-auto object-contain max-h-[60vh] rounded-xl"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
              <div className="text-xs text-muted-foreground text-center sm:text-left">
                💡 Todas las curvas de fábrica (8 y 12 pares) respetan esta numeración estándar.
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSizeGuideModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:bg-foreground/90 transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
