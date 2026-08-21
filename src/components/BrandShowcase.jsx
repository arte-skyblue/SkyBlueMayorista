import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Check, 
  ArrowRight, 
  FileText, 
  MessageCircle,
  Star,
  Globe2,
  Package
} from 'lucide-react';
import { BRANDS, ADVISORS } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';
import ShinyText from './reactbits/ShinyText';

export default function BrandShowcase({ onOpenModal, onOpenAdvisorModal }) {
  const [selectedBrandId, setSelectedBrandId] = useState('xti');

  const selectedBrand = BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[0];

  return (
    <section id="marcas" className="py-16 sm:py-24 2xl:py-28 bg-neutral-900 text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-neutral-800/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-10 sm:mb-14 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 apple-kicker text-[11px]">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>Marcas Internacionales Oficiales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">NUESTRAS</span>
            <span className="font-sf-bold text-white">MARCAS</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Importación oficial y distribución mayorista en Argentina de Xti España, Refresh, Petite Jolie y Giulia Domna.
          </p>
        </div>

        {/* Brand Selector Tabs with Official SVG Logos */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-3 px-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 sm:p-2.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-xl gap-1.5 sm:gap-4 shadow-2xl shrink-0">
            {BRANDS.map((brand) => {
              const isSelected = selectedBrandId === brand.id;
              const isGiulia = brand.id === 'giulia-domna';

              return (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrandId(brand.id)}
                  className={`group relative px-3 sm:px-7 py-2.5 sm:py-4 rounded-xl transition-all flex items-center justify-center shrink-0 z-10 ${
                    isSelected
                      ? 'bg-white/10 shadow-lg border border-white/20'
                      : 'bg-transparent hover:bg-white/5'
                  }`}
                  aria-label={brand.name}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-brand-tab"
                      className={`absolute inset-0 bg-white/10 rounded-xl border shadow-lg -z-10 ${
                        isGiulia ? 'border-sky-400/60 shadow-sky-400/25' : 'border-primary/50 shadow-primary/20'
                      }`}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <img
                    src={brand.logoSvg}
                    alt={brand.name}
                    className={`h-7 sm:h-11 2xl:h-12 w-auto max-w-[105px] sm:max-w-[190px] object-contain transition-all duration-300 ${
                      isSelected
                        ? isGiulia
                          ? '[filter:brightness(0)_saturate(100%)_invert(75%)_sepia(45%)_saturate(1200%)_hue-rotate(160deg)_brightness(105%)_contrast(95%)] opacity-100 scale-105 drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]'
                          : 'filter-none opacity-100 scale-105 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]'
                        : 'brightness-0 invert opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-105'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Detail Showcase Card with Video Support */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-xl overflow-hidden shadow-2xl mb-12 sm:mb-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-10 2xl:p-12 items-center">
              
              {/* Left Column: Video / Image with React Bits TiltedCard (3D Perspective) */}
              <div className="lg:col-span-5">
                <TiltedCard maxTilt={8} scale={1.02} className="rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-[3/4] border border-neutral-700 bg-neutral-950 rounded-2xl overflow-hidden">
                    {selectedBrand.video ? (
                      <video
                        key={selectedBrand.id}
                        src={selectedBrand.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={selectedBrand.image}
                        alt={`Calzado y marroquinería marca ${selectedBrand.name} venta mayorista en Argentina`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent pointer-events-none" />
                    
                    {/* Floating Brand Origin Badge */}
                    <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md">
                      <Globe2 className="w-4 h-4 text-primary" />
                      <span>{selectedBrand.country} • {selectedBrand.origin}</span>
                    </div>

                    {/* Bottom Highlight with ShinyText */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-1">
                      {selectedBrand.id === 'xti' ? (
                        <div className="bg-gradient-to-r from-red-600/95 to-rose-700/95 backdrop-blur-md p-3.5 rounded-xl border border-red-400/40 text-white shadow-xl">
                          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                            <Award className="w-4 h-4" />
                            <span>Campaña Oficial Global</span>
                          </div>
                          <p className="font-extrabold text-sm sm:text-base">
                            <ShinyText text="María Becerra • Embajadora Internacional" speed={3} />
                          </p>
                        </div>
                      ) : selectedBrand.id === 'petite-jolie' ? (
                        <div className="bg-gradient-to-r from-pink-600/95 to-purple-600/95 backdrop-blur-md p-3.5 rounded-xl border border-pink-400/40 text-white shadow-xl">
                          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" />
                            <span>Tecnología J-Lastic®</span>
                          </div>
                          <p className="font-extrabold text-sm sm:text-base">
                            <ShinyText text="Aroma dulce icónico y material 100% impermeable" speed={3} />
                          </p>
                        </div>
                      ) : selectedBrand.id === 'giulia-domna' ? (
                        <div className="bg-gradient-to-r from-sky-700/95 to-neutral-800/95 backdrop-blur-md p-3.5 rounded-xl border border-sky-400/40 text-white shadow-xl">
                          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-sky-200">
                            <Award className="w-4 h-4 text-sky-300" />
                            <span>Cuero Genuino Brasil</span>
                          </div>
                          <p className="font-extrabold text-sm sm:text-base text-white">
                            <ShinyText text="Calzado boutique de lujo para zapaterías selectas" speed={3} />
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-neutral-800/95 to-neutral-900/95 backdrop-blur-md p-3.5 rounded-xl border border-neutral-700 text-white shadow-xl">
                          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>Streetwear Español</span>
                          </div>
                          <p className="font-extrabold text-sm sm:text-base">
                            <ShinyText text="Modelos casual wear de altísima rotación semanal" speed={3} />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TiltedCard>
              </div>

              {/* Right Column: Brand Copy & USPs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-primary/20 text-red-400 border border-primary/30">
                      {selectedBrand.badge}
                    </span>
                    <span className="text-xs text-neutral-400 font-sf-medium">
                      Embajadora: <strong className="text-white">{selectedBrand.ambassador}</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl 2xl:text-5xl font-sf-bold text-white mb-3">
                    Colección {selectedBrand.name} en Argentina
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sf-regular">
                    {selectedBrand.description}
                  </p>
                </div>

                {/* Categories Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Líneas disponibles en módulo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* USPs List */}
                <div className="space-y-3 pt-2">
                  {selectedBrand.uspList.map((usp, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-neutral-200 font-sf-regular">
                        {usp}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenModal('xti')}
                    className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sf-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Catálogo {selectedBrand.name}</span>
                  </button>

                  <button
                    onClick={() => onOpenAdvisorModal(ADVISORS[0])}
                    className="px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-sf-medium text-xs sm:text-sm border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Consultar Disponibilidad</span>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
