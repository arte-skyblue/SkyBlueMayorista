import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Download, 
  ExternalLink,
  X,
  Play,
  Video
} from 'lucide-react';
import { DRIFT_WALL_ITEMS, REELS, ADVISORS } from '../data/mockData';
import DriftWall from './reactbits/DriftWall';

export default function ReelsSection({ onOpenAdvisorModal }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="videos" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-red-600/20 via-rose-500/15 to-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Section Header with SF PRO Light Italic + Bold Heavy Glow */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-10 2xl:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 apple-kicker text-[11px] shadow-lg shadow-red-600/10">
            <Video className="w-3.5 h-3.5 text-red-500" />
            <span>Kit de Marketing B2B & Reels Verticales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] leading-tight">
            <span className="font-light italic tracking-wider text-white mr-3 block sm:inline">
              CONTENIDO PARA
            </span>
            <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_0_35px_rgba(239,68,68,0.65)] block sm:inline">
              TUS REDES
            </span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline max-w-2xl 2xl:max-w-3xl mx-auto">
            Accedé al banco exclusivo de fotos de estudio, gráficas de María Becerra y videos verticales listos para publicar en tus historias de Instagram, TikTok y estados de WhatsApp.
          </p>
        </div>

        {/* 3D Interactive DriftWall Component (React Bits: DriftWall-JS-CSS) */}
        <div className="relative w-full h-[520px] sm:h-[600px] 2xl:h-[680px] rounded-3xl overflow-hidden border border-neutral-800/80 bg-neutral-900/40 shadow-2xl backdrop-blur-xs">
          <DriftWall
            items={DRIFT_WALL_ITEMS}
            columns={5}
            tileWidth={230}
            tileHeight={320}
            gap={16}
            radius={20}
            tilt={10}
            turn={-8}
            speed={28}
            variance={0.4}
            parallax={0.5}
            pauseOnHover={true}
            overlayColor="#0a0a0a"
            fade={0.5}
            dim={0.4}
            onItemClick={(item) => setSelectedItem(item)}
            className="w-full h-full"
          />

          {/* Floating Action Badge Over Wall */}
          <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none">
            <div className="px-5 py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-neutral-700/80 text-xs text-neutral-300 shadow-xl flex items-center gap-2 pointer-events-auto font-sf-medium">
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Mové el cursor sobre el muro o tocá cualquier tarjeta para abrir el contenido</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions & Marketing VIP Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-neutral-950 border border-neutral-900 text-neutral-200">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-sf-bold text-white">¿Querés el Google Drive con todo el material publicitario?</div>
              <div className="text-xs font-sf-regular text-neutral-400">Sin costo para todos los clientes mayoristas activos con compra por módulo.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (onOpenAdvisorModal) {
                  onOpenAdvisorModal(ADVISORS[2] || ADVISORS[0]);
                } else {
                  window.open(`https://wa.me/${ADVISORS[0].cleanPhone}?text=${encodeURIComponent('Hola! Quiero solicitar acceso al Drive de contenido publicitario para redes de SkyBlue.')}`, '_blank');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-sf-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir Acceso al Drive VIP</span>
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Seguir en Instagram"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Item Detail Modal with Video Preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-neutral-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-neutral-950">
              {selectedItem.videoUrl ? (
                <video
                  src={selectedItem.videoUrl}
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 text-xs font-sf-bold uppercase">
                {selectedItem.brand}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-sf-bold text-red-400 uppercase tracking-wide">
                {selectedItem.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-sf-bold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sf-regular">
                Este material forma parte del kit de marketing que entregamos a nuestras zapaterías aliadas para traccionar ventas automáticas en redes sociales.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-800">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-sf-bold text-neutral-300 hover:text-white transition-colors"
              >
                Cerrar
              </button>

              <button
                onClick={() => {
                  window.open(`https://wa.me/${ADVISORS[0].cleanPhone}?text=${encodeURIComponent(`Hola Juliana! Me interesa el material para redes de ${selectedItem.title} (${selectedItem.brand}).`)}`, '_blank');
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-sf-bold transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
