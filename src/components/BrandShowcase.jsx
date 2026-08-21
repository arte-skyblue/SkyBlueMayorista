import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Check, 
  FileText, 
  MessageCircle,
  Globe2
} from 'lucide-react';
import { BRANDS, ADVISORS } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';
import ShinyText from './reactbits/ShinyText';

export default function BrandShowcase({ onOpenModal, onOpenAdvisorModal }) {
  const [selectedBrandId, setSelectedBrandId] = useState('xti');

  const selectedBrand = BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[0];

  // Brand Dynamic Atmospheric Ambience
  const brandThemes = {
    'xti': {
      glow: 'from-red-600/20 via-rose-500/10 to-transparent',
      accent: 'border-red-500/40 text-red-400',
      badgeBg: 'bg-red-600/20 text-red-400 border-red-500/30',
      tabActive: 'border-red-500/60 shadow-red-500/25 bg-red-600/10'
    },
    'refresh': {
      glow: 'from-amber-600/20 via-orange-500/10 to-transparent',
      accent: 'border-amber-500/40 text-amber-400',
      badgeBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
      tabActive: 'border-amber-500/60 shadow-amber-500/25 bg-amber-600/10'
    },
    'petite-jolie': {
      glow: 'from-pink-600/20 via-purple-500/10 to-transparent',
      accent: 'border-pink-500/40 text-pink-400',
      badgeBg: 'bg-pink-600/20 text-pink-400 border-pink-500/30',
      tabActive: 'border-pink-500/60 shadow-pink-500/25 bg-pink-600/10'
    },
    'giulia-domna': {
      glow: 'from-sky-600/20 via-blue-500/10 to-transparent',
      accent: 'border-sky-500/40 text-sky-300',
      badgeBg: 'bg-sky-600/20 text-sky-300 border-sky-500/30',
      tabActive: 'border-sky-500/60 shadow-sky-500/25 bg-sky-600/10'
    }
  };

  const currentTheme = brandThemes[selectedBrand.id] || brandThemes.xti;

  return (
    <section id="marcas" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden">
      
      {/* Dynamic Atmospheric Ambience Glow */}
      <div className={`absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br ${currentTheme.glow} rounded-full blur-[150px] pointer-events-none transition-all duration-700`} />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-neutral-900/60 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-10 sm:mb-14 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 apple-kicker text-[11px] shadow-sm">
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

        {/* Brand Detail Showcase Card with Integrated Top-Right Selector */}
        <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-2xl overflow-hidden shadow-2xl mb-12 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-10 2xl:p-12 items-center">
            
            {/* Left Column: Video / Image (3:4 Vertical) */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBrand.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltedCard className="rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative aspect-[3/4] border border-neutral-700 bg-neutral-950 rounded-2xl overflow-hidden shadow-inner">
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

                      {/* Bottom Highlight on Media */}
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
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Brand Selector Tabs at the Top + Brand Copy & USPs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand Selector Tabs (Integrated inside Right Column) */}
              <div className="overflow-x-auto pb-1 scrollbar-none">
                <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-xl gap-1.5 sm:gap-2.5 shadow-xl shrink-0 max-w-full">
                  {BRANDS.map((brand) => {
                    const isSelected = selectedBrandId === brand.id;
                    const isGiulia = brand.id === 'giulia-domna';

                    return (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrandId(brand.id)}
                        className={`group relative px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl transition-all flex items-center justify-center shrink-0 z-10 ${
                          isSelected
                            ? 'bg-white/10 shadow-md border border-white/20'
                            : 'bg-transparent hover:bg-white/5'
                        }`}
                        aria-label={brand.name}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-brand-tab"
                            className={`absolute inset-0 rounded-xl border shadow-md -z-10 ${currentTheme.tabActive}`}
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        <img
                          src={brand.logoSvg}
                          alt={brand.name}
                          className={`h-7 sm:h-9 2xl:h-10 w-auto max-w-[80px] sm:max-w-[140px] object-contain transition-all duration-300 ${
                            isSelected
                              ? isGiulia
                                ? '[filter:brightness(0)_saturate(100%)_invert(75%)_sepia(45%)_saturate(1200%)_hue-rotate(160deg)_brightness(105%)_contrast(95%)] opacity-100 scale-105 drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]'
                                : 'filter-none opacity-100 scale-105 drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]'
                              : 'brightness-0 invert opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-105'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Brand Information & Actions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBrand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${currentTheme.badgeBg}`}>
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
                          className="px-3.5 py-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200 shadow-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* USPs List */}
                  <div className="space-y-3 pt-1">
                    {selectedBrand.uspList.map((usp, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5 shadow-sm">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-neutral-200 font-sf-regular">
                          {usp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenModal('xti')}
                      className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sf-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Ver Catálogo {selectedBrand.name}</span>
                    </button>

                    <button
                      onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[0]) : null}
                      className="px-5 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-sf-medium text-xs sm:text-sm border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 transition-colors hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Consultar Disponibilidad</span>
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
