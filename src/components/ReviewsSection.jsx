import React from 'react';
import { Star, ShieldCheck, Quote, Building2, MapPin } from 'lucide-react';
import { REVIEWS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';

export default function ReviewsSection() {
  const { isDark } = useTheme();
  const col1 = REVIEWS.slice(0, 3);
  const col2 = REVIEWS.slice(3, 6);
  const col3 = REVIEWS.slice(6, 9);

  return (
    <section id="opiniones" className="py-16 sm:py-24 2xl:py-28 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white relative overflow-hidden border-b border-slate-200 dark:border-neutral-800 transition-colors duration-300">
      
      {/* Top & Bottom Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50 dark:from-neutral-950 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 dark:from-neutral-950 to-transparent z-20" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 apple-kicker text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>+450 Comercios Verificados en Argentina</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-slate-500 dark:text-neutral-400 mr-2">OPINIONES DE</span>
            <span className="font-sf-bold text-slate-900 dark:text-white">CLIENTES</span>
          </h2>

          <p className="font-sf-medium text-slate-600 dark:text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Zapaterías, showrooms y cadenas multimarca que eligen a SkyBlue como su distribuidor mayorista oficial.
          </p>
        </div>

        {/* 3 Columns Vertical Marquee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[550px] sm:h-[620px] overflow-hidden relative">
          
          {/* Top & Bottom Fade Overlays for Smooth Card In/Out Transitions */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-slate-50 via-slate-50/90 to-transparent dark:from-neutral-950 dark:via-neutral-950/90 dark:to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent dark:from-neutral-950 dark:via-neutral-950/90 dark:to-transparent z-20" />

          {/* Column 1 */}
          <div className="flex flex-col gap-5 animate-marquee-vertical pause-hover">

            {[...col1, ...col1, ...col1].map((review, idx) => (
              <SpotlightCard
                key={`col1-${review.id}-${idx}`}
                spotlightColor={isDark ? "rgba(224, 76, 50, 0.12)" : "rgba(224, 76, 50, 0.08)"}
                className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/90 border border-slate-200/90 dark:border-neutral-800 space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-neutral-700"
                    />
                    <div>
                      <h4 className="font-sf-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 block font-sf-medium">
                        {review.business}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    CUIT OK
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-sf-regular leading-relaxed">
                  "{review.text}"
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-sf-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{review.location}</span>
                  </span>
                  <span>{review.date}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Column 2 (Slow) */}
          <div className="flex flex-col gap-5 animate-marquee-vertical-slow pause-hover">
            {[...col2, ...col2, ...col2].map((review, idx) => (
              <SpotlightCard
                key={`col2-${review.id}-${idx}`}
                spotlightColor={isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.08)"}
                className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/90 border border-slate-200/90 dark:border-neutral-800 space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-neutral-700"
                    />
                    <div>
                      <h4 className="font-sf-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 block font-sf-medium">
                        {review.business}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    CUIT OK
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-sf-regular leading-relaxed">
                  "{review.text}"
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-sf-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{review.location}</span>
                  </span>
                  <span>{review.date}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Column 3 (Reverse) */}
          <div className="flex flex-col gap-5 animate-marquee-vertical-reverse pause-hover">
            {[...col3, ...col3, ...col3].map((review, idx) => (
              <SpotlightCard
                key={`col3-${review.id}-${idx}`}
                spotlightColor={isDark ? "rgba(245, 158, 11, 0.12)" : "rgba(245, 158, 11, 0.08)"}
                className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/90 border border-slate-200/90 dark:border-neutral-800 space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-neutral-700"
                    />
                    <div>
                      <h4 className="font-sf-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 block font-sf-medium">
                        {review.business}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    CUIT OK
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-sf-regular leading-relaxed">
                  "{review.text}"
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-sf-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{review.location}</span>
                  </span>
                  <span>{review.date}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

