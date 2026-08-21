import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Percent 
} from 'lucide-react';
import { BANNERS } from '../data/mockData';

const AUTO_SLIDE_INTERVAL = 6000;

export default function HeroSlider({ setActiveTab, onOpenModal, onOpenAdvisorModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  const banner = BANNERS[currentSlide];

  const handleCtaClick = (link) => {
    if (link === 'marcas') {
      setActiveTab('marcas');
    } else if (link === 'condiciones') {
      setActiveTab('inicio');
      setTimeout(() => {
        document.getElementById('condiciones')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (link === 'showroom') {
      setActiveTab('showroom');
    } else {
      setActiveTab('catalogo');
    }
  };

  return (
    <section 
      className="relative bg-neutral-950 overflow-hidden border-b border-border select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mobile Vertical Layout */}
      <div className="flex flex-col md:hidden w-full">
        <div className="relative w-full aspect-[4/3] bg-neutral-950 overflow-hidden">
          {BANNERS.map((item, idx) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={item.image}
                alt={`Banner mayorista ${item.title}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/10 pointer-events-none" />
            </div>
          ))}

          {/* Floating Slide Counter */}
          <div className="absolute top-3 right-3 z-20 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-sf-bold text-white">
            0{currentSlide + 1} / 0{BANNERS.length}
          </div>
        </div>

        {/* Mobile Info Box */}
        <div className="p-5 pb-6 bg-neutral-950 text-white space-y-3.5 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary-foreground border border-primary/40 text-[10px] font-sf-bold uppercase px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-primary" />
              <span>{banner.tag}</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-sf-bold uppercase tracking-tight leading-snug line-clamp-2">
                {banner.title.includes('×') ? (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-1.5">{banner.title.split('×')[0].trim()}</span>
                    <span className="text-primary font-sf-bold mx-1">×</span>
                    <span className="font-sf-bold text-white ml-1">{banner.title.split('×')[1].trim()}</span>
                  </>
                ) : banner.title.includes('&') ? (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-1.5">{banner.title.split('&')[0].trim()}</span>
                    <span className="text-primary font-sf-bold mx-1">&</span>
                    <span className="font-sf-bold text-white ml-1">{banner.title.split('&')[1].trim()}</span>
                  </>
                ) : (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-1.5">{banner.title.split(' ')[0]}</span>
                    <span className="font-sf-bold text-white">{banner.title.split(' ').slice(1).join(' ')}</span>
                  </>
                )}
              </h2>

              <p className="font-sf-medium text-xs text-neutral-300 leading-relaxed line-clamp-2">
                {banner.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pt-1">
            <button
              onClick={() => handleCtaClick(banner.categoryLink)}
              className="w-full py-3.5 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-sf-bold text-xs shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bars and Navigation */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-1">
              {BANNERS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSlide(idx)}
                  className="flex-1 py-1 focus:outline-none"
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                >
                  <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden relative">
                    {idx === currentSlide && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary rounded-full w-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: isPaused ? 0 : AUTO_SLIDE_INTERVAL / 1000, ease: 'linear' }}
                        style={{ originX: 0 }}
                      />
                    )}
                    {idx < currentSlide && (
                      <div className="absolute inset-0 bg-white/60 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15"
                aria-label="Diapositiva anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15"
                aria-label="Siguiente diapositiva"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-[580px] lg:min-h-[640px] 2xl:min-h-[720px] items-center relative">
        {BANNERS.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={`Banner mayorista ${item.title}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-900/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-6 2xl:px-12 py-16 2xl:py-24 w-full flex flex-col justify-between">
          <div className="max-w-3xl 2xl:max-w-4xl space-y-6 2xl:space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary/20 backdrop-blur-md text-primary-foreground border border-primary/40 text-xs 2xl:text-sm font-sf-bold uppercase px-3.5 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 shadow-lg shadow-primary/10">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>{banner.tag}</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h2 className="text-4xl lg:text-6xl 2xl:text-7xl tracking-tight leading-[1.08] text-white uppercase apple-headline">
                  {banner.title.includes('×') ? (
                    <>
                      <span className="font-sf-light-italic text-neutral-300 mr-2">{banner.title.split('×')[0].trim()}</span>
                      <span className="text-primary font-sf-bold mx-1">×</span>
                      <span className="font-sf-bold text-white ml-1">{banner.title.split('×')[1].trim()}</span>
                    </>
                  ) : banner.title.includes('&') ? (
                    <>
                      <span className="font-sf-light-italic text-neutral-300 mr-2">{banner.title.split('&')[0].trim()}</span>
                      <span className="text-primary font-sf-bold mx-1">&</span>
                      <span className="font-sf-bold text-white ml-1">{banner.title.split('&')[1].trim()}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-sf-light-italic text-neutral-300 mr-2">{banner.title.split(' ')[0]}</span>
                      <span className="font-sf-bold text-white">{banner.title.split(' ').slice(1).join(' ')}</span>
                    </>
                  )}
                </h2>

                <p className="font-sf-medium text-base 2xl:text-xl text-neutral-300 leading-relaxed max-w-2xl 2xl:max-w-3xl apple-subheadline">
                  {banner.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 flex items-center">
              <button
                onClick={() => handleCtaClick(banner.categoryLink)}
                className="px-7 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-sf-bold text-sm 2xl:text-base shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>{banner.ctaText}</span>
                <ArrowRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Progress Bar & Arrows at Bottom */}
        <div className="absolute z-30 bottom-6 left-6 right-6 max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto flex items-center justify-between gap-4 pointer-events-none">
          <div className="flex items-center gap-2 w-auto pointer-events-auto">
            {BANNERS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentSlide(idx)}
                className="group py-2 focus:outline-none"
                aria-label={`Ir a diapositiva ${idx + 1}`}
              >
                <div className="w-16 2xl:w-20 h-1.5 rounded-full bg-white/20 overflow-hidden relative transition-all group-hover:bg-white/40">
                  {idx === currentSlide && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full w-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: isPaused ? 0 : AUTO_SLIDE_INTERVAL / 1000, ease: 'linear' }}
                      style={{ originX: 0 }}
                    />
                  )}
                  {idx < currentSlide && (
                    <div className="absolute inset-0 bg-white/60 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105"
              aria-label="Siguiente diapositiva"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
