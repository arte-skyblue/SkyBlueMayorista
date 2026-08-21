import React, { useState } from 'react';
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
import BrandMarquee from './reactbits/BrandMarquee';

export default function BrandShowcase({ onOpenModal, onOpenAdvisorModal }) {
  const [selectedBrandId, setSelectedBrandId] = useState('xti');

  const selectedBrand = BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[0];

  return (
    <section id="marcas" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs 2xl:text-sm font-extrabold uppercase tracking-wider">
            <Award className="w-4 h-4 text-primary" />
            <span>Portafolio de Marcas Oficiales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl font-black tracking-tight text-white">
            Marcas Internacionales Representadas por SkyBlue
          </h2>

          <p className="text-slate-300 text-base sm:text-lg 2xl:text-xl">
            Somos distribuidores mayoristas oficiales en Argentina de firmas globales de calzado y marroquinería de alta rotación.
          </p>
        </div>

        {/* Brand Selector Tabs with Official SVG Logos */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700 backdrop-blur-md gap-2">
            {BRANDS.map((brand) => {
              const isSelected = selectedBrandId === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrandId(brand.id)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 shrink-0 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span className="font-extrabold text-sm">{brand.name}</span>
                  {brand.id === 'xti' && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      María Becerra
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Detail Showcase Card */}
        <div className="rounded-3xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-md overflow-hidden shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
            
            {/* Left Column: Image with React Bits TiltedCard (3D Perspective) */}
            <div className="lg:col-span-5">
              <TiltedCard maxTilt={10} scale={1.02} className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] sm:aspect-square border border-slate-700 bg-slate-950 rounded-2xl overflow-hidden">
                  <img
                    src={selectedBrand.image}
                    alt={`Calzado y marroquinería marca ${selectedBrand.name} venta mayorista en Argentina`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  
                  {/* Floating Brand Origin Badge */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-primary" />
                    <span>{selectedBrand.country} • {selectedBrand.origin}</span>
                  </div>

                  {/* Bottom Highlight on Image with ShinyText */}
                  <div className="absolute bottom-4 left-4 right-4">
                    {selectedBrand.id === 'xti' ? (
                      <div className="bg-gradient-to-r from-amber-500/95 to-amber-600/95 backdrop-blur-md p-3 rounded-xl border border-amber-300/40 text-slate-950">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                          <Star className="w-4 h-4 fill-slate-950" />
                          <span>Embajadora Global Oficial</span>
                        </div>
                        <p className="font-extrabold text-sm sm:text-base">
                          <ShinyText text="María Becerra viste y representa la colección XTI" speed={3} />
                        </p>
                      </div>
                    ) : selectedBrand.id === 'petite-jolie' ? (
                      <div className="bg-gradient-to-r from-pink-500/95 to-rose-600/95 backdrop-blur-md p-3 rounded-xl border border-pink-300/40 text-white">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4" />
                          <span>Tecnología J-Lastic®</span>
                        </div>
                        <p className="font-extrabold text-sm sm:text-base">
                          <ShinyText text="Bolsos impermeables con aroma inconfundible" speed={3} />
                        </p>
                      </div>
                    ) : selectedBrand.id === 'giulia-domna' ? (
                      <div className="bg-gradient-to-r from-purple-600/95 to-indigo-700/95 backdrop-blur-md p-3 rounded-xl border border-purple-300/40 text-white">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                          <Award className="w-4 h-4" />
                          <span>Cuero Legítimo de Exportación</span>
                        </div>
                        <p className="font-extrabold text-sm sm:text-base">
                          <ShinyText text="Calzado boutique de alta gama y costura fina" speed={3} />
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-emerald-500/95 to-teal-600/95 backdrop-blur-md p-3 rounded-xl border border-emerald-300/40 text-white">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                          <Package className="w-4 h-4" />
                          <span>Street Chic & Casual</span>
                        </div>
                        <p className="font-extrabold text-sm sm:text-base">
                          <ShinyText text="Calzado juvenil ultraliviano de alta salida" speed={3} />
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </TiltedCard>
            </div>

            {/* Right Column: Description, Features & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {selectedBrand.name}
                  </h3>
                  <span className="bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-black uppercase px-3 py-1 rounded-full">
                    {selectedBrand.badge}
                  </span>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedBrand.description}
                </p>
              </div>

              {/* Categories Covered */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Líneas Comerciales Disponibles por Módulos:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedBrand.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-700/80 border border-slate-600 text-slate-200 text-xs font-semibold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Selling Points (USPs) */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Ventajas para tu Zapatería / Showroom:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedBrand.uspList.map((usp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{usp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenModal(selectedBrand.id)}
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-primary-foreground" />
                  <span>Pedir Catálogo {selectedBrand.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero consultar stock por módulos y catálogo de la marca ${selectedBrand.name} para mi negocio.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Stock con Juliana</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* React Bits BrandMarquee Component: Infinite Logo Ribbon */}
        <BrandMarquee />

      </div>
    </section>
  );
}
