import React from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';
import { REELS } from '../data/mockData';
import SkewedCarousel from './reactbits/SkewedCarousel';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function ReelsSection({ onOpenAdvisorModal }) {
  return (
    <section id="videos" className="py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-extrabold uppercase tracking-wider">
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Contenido & Reels en Formato Vertical</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Colecciones en Acción: Reels para tu Negocio
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Mirá los videos de producto de alta conversión que entregamos a nuestros clientes para sus redes sociales.
          </p>
        </div>

        {/* Skewed Carousel (React Bits Starter: skewed-carousel-tw) */}
        <SkewedCarousel items={REELS} onOpenAdvisorModal={onOpenAdvisorModal} />

        {/* Bottom Instagram CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-pink-400 transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Seguinos en Instagram para ver las novedades diarias</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
