import React from 'react';
import { 
  Building2, 
  Layers, 
  Percent, 
  Truck, 
  CheckCircle2, 
  FileCheck,
  Lock,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function CommercialConditions({ onOpenModal, onOpenAdvisorModal }) {
  const conditions = [
    {
      icon: Building2,
      tag: "EXCLUSIVO B2B",
      title: "Venta Exclusiva con CUIT",
      description: "Dirigido a locales de calzado, zapaterías, boutiques, showrooms y revendedoras con actividad comercial demostrable. Protegemos los precios para el canal minorista.",
      highlight: "No vendemos por unidad al consumidor final",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      spotlight: "rgba(224, 76, 50, 0.15)"
    },
    {
      icon: Layers,
      tag: "COMPRA MÍNIMA",
      title: "1 Módulo (8 o 12 Pares)",
      description: "Venta por módulos cerrados estándar (8 o 12 pares por modelo) con numeraciones balanceadas de alta rotación (35 al 40 en dama, 39 al 44 en hombre, 28 al 35 en kids).",
      highlight: "Facilidad de rotación y reposición ágil",
      badgeColor: "bg-secondary text-foreground border-border",
      spotlight: "rgba(224, 76, 50, 0.15)"
    },
    {
      icon: Percent,
      tag: "PAGO Y CONDICIONES",
      title: "10% Adicional en tu Pago",
      description: "Abonando en efectivo en showroom, mediante transferencia bancaria inmediata o depósito, aplicás un 10% de descuento adicional sobre la liquidación de tu compra.",
      highlight: "Aumenta directo tu margen de ganancia",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      spotlight: "rgba(16, 185, 129, 0.15)"
    },
    {
      icon: Truck,
      tag: "DESPACHO NACIONAL",
      title: "Envíos en 24 a 48 hs a Todo el País",
      description: "Entregamos tu mercadería embalada y asegurada en el expreso de tu preferencia (Vía Cargo, Cruz del Sur, Expreso Luján, etc.) o con retiro directo en Showroom Tapiales.",
      highlight: "Remito y guía de seguimiento online",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      spotlight: "rgba(245, 158, 11, 0.15)"
    }
  ];

  return (
    <section id="condiciones" className="py-16 sm:py-20 2xl:py-28 bg-background border-b border-border relative">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-primary" />
            <span>Condiciones Comerciales Mayoristas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Transparencia y Rentabilidad para tu Comercio
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground font-normal">
            En <span className="font-semibold text-foreground">SkyBlue Calzado Mayorista</span> establecemos reglas comerciales claras: venta por módulos de 8 o 12 pares, protección de precios y acceso a catálogo B2B privado.
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
                className="p-6 bg-card hover:bg-card/90 border-border hover:border-primary/40 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 shadow-xs border border-primary/20 flex items-center justify-center text-primary transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
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

        {/* B2B Private Platform Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-foreground text-background shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-border">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Plataforma Exclusiva para Comerciantes</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-background">
              ¿Buscás ver listas de precios y stock en tiempo real?
            </h4>
            <p className="text-muted text-sm max-w-2xl">
              Accedé a nuestra plataforma B2B mayorista en <span className="text-amber-300 font-bold">mayoristas.skyblue.com.ar</span>. Para proteger a nuestros clientes, deberás solicitar una cuenta ingresando tus datos personales y de la empresa.
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
              <span>Solicitar Cuenta</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
