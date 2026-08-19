import React from 'react';
import { 
  TrendingUp, 
  Camera, 
  Star, 
  Percent, 
  Truck, 
  Users, 
  Sparkles, 
  CheckCircle,
  Download
} from 'lucide-react';
import { BENEFITS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

const iconMap = {
  TrendingUp: TrendingUp,
  Camera: Camera,
  Star: Star,
  Percent: Percent,
  Truck: Truck,
  Users: Users,
};

export default function BenefitsSection({ onOpenModal, onOpenAdvisorModal }) {
  return (
    <section id="beneficios" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>¿Por qué Elegir SkyBlue Mayorista?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Beneficios Diseñados para Potenciar tu Zapatería
          </h2>

          <p className="text-slate-700 text-base sm:text-lg">
            No solo te vendemos calzado: te entregamos una solución integral con margen, marca y herramientas comerciales para venderlo más rápido.
          </p>
        </div>

        {/* 6 Benefit Cards with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => {
            const Icon = iconMap[benefit.icon] || TrendingUp;
            const isHighlighted = benefit.id === 'embajadora' || benefit.id === 'margen';

            return (
              <SpotlightCard
                key={benefit.id}
                spotlightColor={isHighlighted ? "rgba(14, 165, 233, 0.2)" : "rgba(16, 185, 129, 0.15)"}
                className={`p-8 flex flex-col justify-between relative ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-sky-50/70 to-white border-sky-300 shadow-xl shadow-sky-600/5'
                    : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {/* Highlight Badge if special */}
                {benefit.id === 'embajadora' && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>María Becerra</span>
                  </div>
                )}
                {benefit.id === 'descuento' && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">
                    10% Adicional
                  </div>
                )}

                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                    isHighlighted 
                      ? 'bg-sky-600 text-white shadow-sky-600/30' 
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block mb-1">
                    {benefit.subtitle}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Incluido para todos los clientes SkyBlue</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Marketing Asset Kit Callout Card */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-black uppercase">
                <Camera className="w-3.5 h-3.5" />
                <span>Kit Digital para Redes Sociales</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                ¿No tenés fotógrafo ni tiempo para crear contenido? Nosotros te lo damos todo listo.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Al realizar tu compra mayorista, recibís acceso a nuestro Drive VIP con fotos en estudio de alta resolución, reels editados y piezas gráficas con la imagen de María Becerra y las marcas oficiales para que subas a tu Instagram, TikTok y WhatsApp.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onOpenModal('marketing')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Ver Muestra del Kit</span>
              </button>

              <button
                onClick={() => onOpenAdvisorModal(ADVISORS[0])}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <span>Consultar con Juliana</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
