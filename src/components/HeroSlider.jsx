import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Percent,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { BANNERS } from '../data/mockData';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';

const AUTO_SLIDE_INTERVAL = 6500;

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
      className="relative bg-neutral-950 overflow-hidden border-b border-neutral-800 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mobile Layout (iPhone / Android) */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 pointer-events-none" />
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
            <span className="bg-primary/20 text-white border border-primary/40 text-[10px] font-sf-bold uppercase px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1">
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
                    <span className="text-white font-sf-bold">{banner.title.split('×')[1].trim()}</span>
                  </>
                ) : banner.title.includes('&') ? (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-1.5">{banner.title.split('&')[0].trim()}</span>
                    <span className="text-primary font-sf-bold mx-1">&</span>
                    <span className="text-white font-sf-bold">{banner.title.split('&')[1].trim()}</span>
                  </>
                ) : (
                  <span className="text-white">{banner.title}</span>
                )}
              </h2>

              <p className="text-xs text-neutral-300 font-sf-medium leading-relaxed">
                {banner.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Button & Slider Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => handleCtaClick(banner.link)}
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <span>{banner.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white active:scale-95"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white active:scale-95"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop & iPad Hero Layout (16:9 / 21:9 Widescreen) */}
      <div className="hidden md:block relative w-full h-[480px] lg:h-[560px] 2xl:h-[640px] 3xl:h-[700px] overflow-hidden">
        {BANNERS.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={`Banner campaña mayorista ${item.title}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic Gradient Overlays for Extreme Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/60 to-transparent pointer-events-none w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 pointer-events-none" />
          </div>
        ))}

        {/* Content Floating Container */}
        <div className="relative z-20 h-full max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-6 2xl:px-12 flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-2xl 2xl:max-w-3xl space-y-6">
            
            {/* Tag Badge */}
            <motion.div
              key={`tag-${banner.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs font-sf-bold uppercase tracking-wider"
            >
              <Award className="w-4 h-4 text-primary" />
              <span>{banner.tag}</span>
            </motion.div>

            {/* Split Title with SF Pro Display */}
            <motion.div
              key={`title-${banner.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl lg:text-6xl 2xl:text-7xl uppercase tracking-tight apple-headline text-white leading-none">
                {banner.title.includes('×') ? (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-3">
                      {banner.title.split('×')[0].trim()}
                    </span>
                    <span className="text-primary font-sf-bold mx-2">×</span>
                    <span className="text-white font-sf-bold">
                      {banner.title.split('×')[1].trim()}
                    </span>
                  </>
                ) : banner.title.includes('&') ? (
                  <>
                    <span className="font-sf-light-italic text-neutral-300 mr-3">
                      {banner.title.split('&')[0].trim()}
                    </span>
                    <span className="text-primary font-sf-bold mx-2">&</span>
                    <span className="text-white font-sf-bold">
                      {banner.title.split('&')[1].trim()}
                    </span>
                  </>
                ) : (
                  <span className="text-white">{banner.title}</span>
                )}
              </h1>

              <div className="pt-2">
                <BlurText
                  key={`blur-${banner.id}`}
                  text={banner.subtitle}
                  className="font-sf-medium text-neutral-300 text-lg lg:text-xl 2xl:text-2xl apple-subheadline max-w-xl leading-relaxed"
                />
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              key={`cta-${banner.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="pt-2 flex items-center gap-4"
            >
              <button
                onClick={() => handleCtaClick(banner.link)}
                className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-sm lg:text-base shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-3 group"
              >
                <span>{banner.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenModal('catalogo')}
                className="px-6 py-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 text-white font-sf-medium text-sm lg:text-base border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-primary" />
                <span>Ver Todos los Catálogos</span>
              </button>
            </motion.div>

          </div>
        </div>

        {/* Slide Progress Bars and Arrows */}
        <div className="absolute bottom-6 right-6 2xl:right-12 z-20 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 bg-neutral-950/70 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
