import React from 'react';
import { 
  TrendingUp, 
  Camera, 
  Star, 
  Percent, 
  Truck, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { BENEFITS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';

export default function BenefitsSection({ onOpenModal, onOpenAdvisorModal }) {
  const { isDark } = useTheme();

  const iconMap = {
    TrendingUp,
    Camera,
    Star,
    Percent,
    Truck,
    Users
  };

  return (
    <section id="beneficios" className="py-16 sm:py-24 2xl:py-28 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-18">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-slate-500 dark:text-neutral-400 mr-2">BENEFICIOS</span>
            <span className="font-sf-bold text-slate-900 dark:text-white">EXCLUSIVOS</span>
          </h2>

          <p className="font-sf-medium text-slate-600 dark:text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Márgenes netos superiores, material publicitario oficial de estudio y atención personalizada para hacer crecer tu zapatería o showroom.
          </p>
        </div>

        {/* 6 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
          {BENEFITS.map((item) => {
            const Icon = iconMap[item.icon] || Star;
            const isFeatured = item.id === 'embajadora' || item.id === 'margen';

            return (
              <SpotlightCard
                key={item.id}
                spotlightColor={isFeatured ? "rgba(224, 76, 50, 0.2)" : isDark ? "rgba(224, 76, 50, 0.12)" : "rgba(224, 76, 50, 0.08)"}
                className={`p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative transition-all duration-300 group overflow-hidden ${
                  isFeatured
                    ? 'bg-white dark:bg-neutral-900 border-2 border-primary/50 shadow-xl dark:shadow-2xl shadow-primary/10'
                    : 'bg-white/95 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 hover:border-primary/40 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                        isFeatured
                          ? 'bg-primary text-white shadow-primary/30'
                          : 'bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-[11px] font-sf-bold text-primary uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h3 className="text-base sm:text-lg font-sf-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-sf-regular text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-neutral-800 flex items-center gap-2 text-xs font-sf-medium text-slate-800 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Incluido para todos los clientes SkyBlue</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

