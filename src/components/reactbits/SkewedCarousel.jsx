import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Heart, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

function InstagramIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function SkewedCarousel({ items, onOpenAdvisorModal }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const nextSlide = () => {
    setScrollIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setScrollIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full py-6 overflow-hidden">
      
      {/* 3D Perspective Skewed Container */}
      <div 
        className="flex items-center justify-center gap-4 sm:gap-6 py-8 px-4 overflow-x-auto no-scrollbar"
        style={{ perspective: '1200px' }}
      >
        {items.map((item, idx) => {
          const isCenter = idx === scrollIndex;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateY: isCenter ? 0 : idx < scrollIndex ? 18 : -18,
                scale: isCenter ? 1.05 : 0.95,
                z: isCenter ? 40 : 0
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950 group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 hover:border-sky-400"
              onClick={() => setActiveVideo(item)}
            >
              {/* Poster Image */}
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Top Tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <InstagramIcon className="w-3 h-3 text-pink-400" />
                  <span>{item.brand}</span>
                </span>

                <span className="bg-sky-500/90 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <Eye className="w-3 h-3" />
                  <span>{item.views}</span>
                </span>
              </div>

              {/* Center Animated Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all duration-300">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Reel Details */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                  {item.category}
                </span>

                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1 text-pink-400 font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-pink-400" />
                    <span>{item.likes}</span>
                  </span>

                  <span className="text-[10px] font-bold text-sky-300">
                    Ver en pantalla completa
                  </span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:scale-105"
          aria-label="Reel anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-slate-400">
          Deslizá para explorar reels en 3D
        </span>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:scale-105"
          aria-label="Siguiente reel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl p-4 space-y-4">
              
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black relative">
                <img
                  src={activeVideo.poster}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center p-4 space-y-2">
                    <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
                    <p className="text-white font-bold text-sm">
                      {activeVideo.title}
                    </p>
                    <p className="text-xs text-slate-300">
                      Material disponible en el Drive VIP Mayorista para clientes con CUIT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    onOpenAdvisorModal();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir este modelo y material a la asesora</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
