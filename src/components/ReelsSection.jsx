import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  Download, 
  ExternalLink,
  X,
  Play,
  Volume2,
  VolumeX,
  Video,
  ArrowRight
} from 'lucide-react';
import { REELS, ADVISORS } from '../data/mockData';
import ShinyText from './reactbits/ShinyText';

export default function ReelsSection({ onOpenAdvisorModal }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Divide 24 reels into 2 tracks of 12 for high performance
  const row1 = REELS.slice(0, 12);
  const row2 = REELS.slice(12, 24);

  const handleOpenModal = (reel) => {
    setActiveVideo(reel);
    setIsMuted(false);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
    setIsMuted(true);
  };

  return (
    <section id="redes" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800 select-none">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Header with Specified Typographic Styling */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary apple-kicker text-[11px]">
            <Video className="w-3.5 h-3.5 text-primary" />
            <span>Material Audiovisual Oficial en 4K</span>
          </div>

          {/* EXACT REQUESTED TITLE */}
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-white mr-3">CONTENIDO PARA</span>
            <span className="font-sf-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
              TUS REDES
            </span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Videos profesionales listos para usar en tus historias de Instagram, reels y WhatsApp.
          </p>
        </div>

        {/* Dual Track Infinite Video Marquee */}
        <div className="space-y-4 sm:space-y-6 relative">
          
          {/* Side Fades for Smooth Edge Transitions */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-20" />

          {/* Track 1: Normal Direction */}
          <div className="flex overflow-hidden py-1">
            <div className="flex gap-4 sm:gap-6 animate-marquee pause-hover">
              {[...row1, ...row1].map((reel, idx) => (
                <div
                  key={`row1-${reel.id}-${idx}`}
                  onClick={() => handleOpenModal(reel)}
                  className="w-[140px] sm:w-[190px] 2xl:w-[220px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-primary transition-all duration-300 group cursor-pointer relative shrink-0 shadow-lg hover:scale-105"
                >
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/20 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-neutral-950/80 border border-white/20 text-white backdrop-blur-md">
                      {reel.brand}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-[11px] font-sf-bold text-white line-clamp-1 leading-snug">
                      {reel.title}
                    </p>
                    <span className="text-[9px] text-neutral-400 font-sf-medium flex items-center gap-1 mt-0.5">
                      <Play className="w-2.5 h-2.5 text-primary fill-primary" />
                      <span>{reel.views}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Reverse Direction */}
          <div className="flex overflow-hidden py-1">
            <div className="flex gap-4 sm:gap-6 animate-marquee pause-hover" style={{ animationDirection: 'reverse' }}>
              {[...row2, ...row2].map((reel, idx) => (
                <div
                  key={`row2-${reel.id}-${idx}`}
                  onClick={() => handleOpenModal(reel)}
                  className="w-[140px] sm:w-[190px] 2xl:w-[220px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-primary transition-all duration-300 group cursor-pointer relative shrink-0 shadow-lg hover:scale-105"
                >
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/20 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-neutral-950/80 border border-white/20 text-white backdrop-blur-md">
                      {reel.brand}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-[11px] font-sf-bold text-white line-clamp-1 leading-snug">
                      {reel.title}
                    </p>
                    <span className="text-[9px] text-neutral-400 font-sf-medium flex items-center gap-1 mt-0.5">
                      <Play className="w-2.5 h-2.5 text-primary fill-primary" />
                      <span>{reel.views}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm sm:max-w-md w-full aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col justify-between p-4"
            >
              {/* Active Video Player */}
              <video
                src={activeVideo.videoUrl}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60 pointer-events-none" />

              {/* Top Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-white border border-white/20">
                  {activeVideo.brand}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                    aria-label="Sonido"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="w-9 h-9 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                    aria-label="Cerrar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Info & WhatsApp CTA */}
              <div className="relative z-10 space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-sf-bold text-white">
                    {activeVideo.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sf-regular">
                    Material en 4K oficial para clientes de SkyBlue Mayorista.
                  </p>
                </div>

                <a
                  href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola! Quiero pedir este video en 4K para las redes de mi local: ${activeVideo.title} (${activeVideo.brand})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir este Video en 4K por WhatsApp</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
