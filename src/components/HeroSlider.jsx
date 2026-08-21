import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Percent, 
  MessageCircle,
  Lock,
  ExternalLink
} from 'lucide-react';
import { BANNERS, ADVISORS, COMPANY_INFO } from '../data/mockData';

export default function HeroSlider({ setActiveTab, onOpenModal, onOpenAdvisorModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  const banner = BANNERS[currentSlide];

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[540px] sm:min-h-[580px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Crossfade */}
      {BANNERS.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Overlays */}
          <img
            src={item.image}
            alt={`Banner mayorista ${item.title}`}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 py-10 sm:py-14 2xl:py-20 w-full">
        <div className="max-w-3xl 2xl:max-w-4xl space-y-5 2xl:space-y-7">
          
          {/* Top Tag & Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary/20 text-primary-foreground border border-primary/40 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{banner.tag}</span>
            </span>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span>{banner.benefitBadge}</span>
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            {banner.title.split('×').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground mx-2">
                    ×
                  </span>
                )}
              </React.Fragment>
            ))}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
            {banner.subtitle}
          </p>

          {/* Key Feature Highlight */}
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 inline-flex items-center gap-3 text-xs sm:text-sm text-slate-200">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span className="font-bold">{banner.highlight}</span>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => {
                if (banner.categoryLink === 'marcas') {
                  setActiveTab('marcas');
                } else if (banner.categoryLink === 'condiciones') {
                  setActiveTab('inicio');
                  setTimeout(() => {
                    document.getElementById('condiciones')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else if (banner.categoryLink === 'showroom') {
                  setActiveTab('showroom');
                } else {
                  setActiveTab('catalogo');
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Portal B2B con Precios</span>
            </a>

            <button
              onClick={() => onOpenAdvisorModal(ADVISORS[0])}
              className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Asesora Juliana</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute z-30 bottom-6 right-6 flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm transition-all"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm transition-all"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute z-30 bottom-6 left-6 sm:left-1/2 sm:-translate-x-1/2 flex items-center gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
