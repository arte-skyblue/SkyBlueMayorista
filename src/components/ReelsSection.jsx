import React, { useState } from 'react';
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

export default function ReelsSection({ onOpenAdvisorModal }) {
  const [activeReel, setActiveReel] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const row1 = REELS.slice(0, 12);
  const row2 = REELS.slice(12, 24);

  return (
    <section id="videos" className="py-16 sm:py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 apple-kicker text-[11px]">
            <Video className="w-3.5 h-3.5 text-red-500" />
            <span>Contenido Audiovisual Listo para Redes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] leading-tight">
            <span className="font-light italic tracking-wider text-white mr-3 block sm:inline">
              CONTENIDO PARA
            </span>
            <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_0_35px_rgba(239,68,68,0.65)] block sm:inline">
              TUS REDES
            </span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg apple-subheadline">
            Videos y reels en formato vertical listos para publicar en WhatsApp, Instagram y TikTok de tu local o showroom.
          </p>
        </div>

        {/* 2-Row Infinite Video Reels Track */}
        <div className="relative w-full overflow-hidden select-none space-y-4 sm:space-y-6">
          {/* Side Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

          {/* Row 1: Forward Marquee */}
          <div className="overflow-hidden w-full flex pause-hover">
            <div className="animate-marquee flex items-center gap-4 sm:gap-6 shrink-0">
              {[...row1, ...row1].map((reel, idx) => (
                <ReelCard
                  key={'r1-' + idx}
                  reel={reel}
                  onSelect={() => setActiveReel(reel)}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Reverse Marquee */}
          <div className="overflow-hidden w-full flex pause-hover">
            <div
              className="flex items-center gap-4 sm:gap-6 shrink-0"
              style={{ animation: 'marquee 36s linear infinite reverse', width: 'max-content' }}
            >
              {[...row2, ...row2].map((reel, idx) => (
                <ReelCard
                  key={'r2-' + idx}
                  reel={reel}
                  onSelect={() => setActiveReel(reel)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Marketing VIP Drive Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-900 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base sm:text-lg font-sf-bold text-white">
              ¿Querés descargar estos reels para tu comercio?
            </h4>
            <p className="text-xs sm:text-sm font-sf-regular text-neutral-400">
              Todo el material de marketing se encuentra disponible en alta resolución listo para usar en nuestro Drive VIP.
            </p>
          </div>

          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 justify-center">
            <button
              onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[0]) : null}
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sf-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Pedir acceso al Contenido</span>
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-sf-medium text-xs sm:text-sm border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>Ver Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        </div>

      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-red-950/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors border border-white/10"
                aria-label="Cerrar reproductor"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Container */}
              <div className="relative aspect-[9/16] max-h-[72vh] w-full bg-black overflow-hidden flex items-center justify-center">
                <video
                  src={activeReel.videoUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

                {/* Mute Button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-20 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-white border border-white/20 transition-all"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Video Info Overlay */}
                <div className="absolute bottom-4 left-4 right-16 z-20 space-y-1 text-white pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    <span>{activeReel.brand}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight text-white drop-shadow">
                    {activeReel.title}
                  </h3>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveReel(null);
                    if (onOpenAdvisorModal) {
                      onOpenAdvisorModal(ADVISORS[0]);
                    } else {
                      window.open('https://wa.me/' + ADVISORS[0].cleanPhone + '?text=' + encodeURIComponent('Hola Juliana! Quiero pedir el video en 4K de ' + activeReel.title + ' (' + activeReel.brand + ') para mis redes.'), '_blank');
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir este video en 4K para mis redes</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

function ReelCard({ reel, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="relative shrink-0 w-40 sm:w-52 aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-neutral-800/90 hover:border-red-500 shadow-xl cursor-pointer group transition-all duration-300 transform hover:scale-[1.04] hover:shadow-red-600/25"
    >
      <video
        src={reel.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </div>
      </div>

      <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
    </div>
  );
}
