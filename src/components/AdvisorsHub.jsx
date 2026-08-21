import React from 'react';
import { MessageCircle, ShieldCheck, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function AdvisorsHub({ onOpenAdvisorModal }) {
  return (
    <section id="asesores" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 apple-kicker text-[11px]">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Equipo Comercial SkyBlue Mayorista</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">ASESORES</span>
            <span className="font-sf-bold text-white">COMERCIALES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Atención humana y personalizada para armar tus compras por módulos, despachos y altas con CUIT.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ADVISORS.map((advisor) => (
            <SpotlightCard
              key={advisor.id}
              spotlightColor="rgba(224, 76, 50, 0.15)"
              className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={advisor.avatar}
                      alt={advisor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-neutral-700"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-950 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sf-bold text-lg text-white leading-tight">
                      {advisor.name}
                    </h3>
                    <span className="text-xs text-primary font-sf-bold block mt-0.5">
                      {advisor.role}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-sf-medium block">
                      {advisor.specialty}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-sf-regular leading-relaxed mb-4">
                  {advisor.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-sf-medium">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>En línea ahora</span>
                  </span>
                  <span>{advisor.phone}</span>
                </div>

                <a
                  href={`https://wa.me/${advisor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${advisor.name}! Me contacto desde la web de SkyBlue Mayorista para hacer una consulta sobre calzado.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar con {advisor.name.split(' ')[0]}</span>
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
