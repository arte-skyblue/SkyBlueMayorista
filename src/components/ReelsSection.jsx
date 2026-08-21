import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  Download, 
  ExternalLink,
  X,
  Volume2,
  VolumeX,
  Video,
  ArrowRight
} from 'lucide-react';
import { REELS, ADVISORS } from '../data/mockData';
import DriftWall from './reactbits/DriftWall';

export default function ReelsSection({ onOpenAdvisorModal }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

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
            Videos profesionales listos para usar en tus historias de Instagram, reels y estados de WhatsApp. Multiplicá tus ventas orgánicas sin gastar en producción audiovisual.
          </p>
        </div>

        {/* DriftWall Component by ReactBits (Continuous Movement Without Hover Pause) */}
        <div className="w-full">
          <DriftWall items={REELS} onItemClick={handleOpenModal} />
        </div>

        {/* VIP Google Drive Kit CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-sf-bold uppercase text-primary tracking-wider">
              Kit de Marketing Mayorista Incluido
            </span>
            <h4 className="text-lg sm:text-2xl font-sf-bold text-white">
              ¿Querés acceso a la carpeta completa con más de 200 fotos y videos en 4K?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 font-sf-regular">
              Solicitá el enlace al Drive VIP exclusivo para comerciantes y zapaterías asociadas.
            </p>
          </div>

          <button
            onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[2]) : null}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 shrink-0 hover:scale-105 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Pedir Acceso al Drive VIP</span>
          </button>
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
              transition={{ duration: 0.25 }}
              className="relative max-w-sm w-full aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col justify-between"
            >
              {/* Close & Sound Buttons */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 shadow-md"
                  aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 shadow-md"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <video
                src={activeVideo.url}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 pointer-events-none" />

              {/* Bottom Caption & WhatsApp CTA */}
              <div className="relative z-20 p-5 mt-auto space-y-3">
                <div>
                  <span className="text-[10px] font-sf-bold uppercase px-2 py-0.5 rounded-full bg-primary text-white w-max block mb-1">
                    {activeVideo.brand}
                  </span>
                  <h4 className="text-base font-sf-bold text-white">
                    {activeVideo.title}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    handleCloseModal();
                    if (onOpenAdvisorModal) onOpenAdvisorModal(ADVISORS[0]);
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por este Calzado en WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
