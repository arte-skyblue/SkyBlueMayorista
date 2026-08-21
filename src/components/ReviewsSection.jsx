import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Quote, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { REVIEWS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function ReviewsSection({ onOpenAdvisorModal }) {
  const col1 = [REVIEWS[0], REVIEWS[1], REVIEWS[2]];
  const col2 = [REVIEWS[3], REVIEWS[4], REVIEWS[5]];
  const col3 = [REVIEWS[6], REVIEWS[7], REVIEWS[8]];

  return (
    <section id="opiniones" className="py-20 sm:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-14 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">OPINIONES DE</span>
            <span className="font-sf-bold text-white">CLIENTES</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed apple-subheadline">
            Más de <span className="font-sf-bold text-white">450 zapaterías, boutiques y showrooms</span> compran periódicamente sus módulos de calzado y marroquinería oficial con nosotros.
          </p>

          <div className="pt-2 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-lg">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-sf-bold text-white">4.9 / 5 Estrellas</span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs text-neutral-400 font-sf-medium">+450 Comercios Atendidos</span>
          </div>
        </div>

        {/* 3 Columns Vertical Infinite Marquee */}
        <div className="relative h-[720px] overflow-hidden rounded-3xl p-3 sm:p-6 bg-neutral-900/40 border border-neutral-800 backdrop-blur-md">
          {/* Top and Bottom Fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
            
            {/* Col 1 */}
            <div className="overflow-hidden h-full">
              <div className="animate-marquee-vertical flex flex-col gap-6 pause-hover">
                {[...col1, ...col1].map((rev, idx) => (
                  <ReviewCard key={'col1-' + idx} review={rev} />
                ))}
              </div>
            </div>

            {/* Col 2 */}
            <div className="overflow-hidden h-full">
              <div className="animate-marquee-vertical-reverse flex flex-col gap-6 pause-hover">
                {[...col2, ...col2].map((rev, idx) => (
                  <ReviewCard key={'col2-' + idx} review={rev} />
                ))}
              </div>
            </div>

            {/* Col 3 */}
            <div className="overflow-hidden h-full hidden lg:block">
              <div className="animate-marquee-vertical-slow flex flex-col gap-6 pause-hover">
                {[...col3, ...col3].map((rev, idx) => (
                  <ReviewCard key={'col3-' + idx} review={rev} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-7 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sf-bold text-white tracking-tight leading-snug">
              ¿Tenés un local o showroom<br className="hidden sm:inline" /> y querés sumar nuestras marcas?
            </h3>
          </div>

          <button
            onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[0]) : null}
            className="px-8 py-4 rounded-2xl bg-white text-neutral-950 hover:bg-red-600 hover:text-white font-sf-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Hablar con un Asesor Comercial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <SpotlightCard
      spotlightColor="rgba(224, 76, 50, 0.15)"
      className="p-6 sm:p-7 bg-neutral-900/90 border-neutral-800/90 hover:border-neutral-700 text-white shadow-xl space-y-4 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-neutral-700 shrink-0 group-hover:border-red-500 transition-colors"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-sf-bold text-sm sm:text-base text-white leading-none">
                {review.name}
              </h4>
              {review.verified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" title="Comercio Verificado con CUIT" />
              )}
            </div>
            <p className="text-xs text-neutral-300 font-sf-medium mt-1">
              {review.business}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-sf-regular mt-0.5">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>{review.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-amber-400 shrink-0">
          {[...Array(review.rating)].map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>
      </div>

      <div className="relative pt-1">
        <Quote className="w-6 h-6 text-neutral-800 absolute -top-1 -left-1 pointer-events-none opacity-40" />
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sf-regular relative z-10">
          "{review.text}"
        </p>
      </div>

      <div className="pt-3.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
        <span className="px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 font-sf-medium text-[11px]">
          {review.bought}
        </span>
        <span className="text-neutral-500 font-sf-regular">
          {review.date}
        </span>
      </div>
    </SpotlightCard>
  );
}
