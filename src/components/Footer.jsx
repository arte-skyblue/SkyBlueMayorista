import React from 'react';
import { 
  ShieldCheck, 
  Percent, 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowUp, 
  FileText, 
  Lock, 
  ExternalLink, 
  Store,
  Layers,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer({ onOpenModal, onOpenAdvisorModal, setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800">
      
      {/* Top Value Banner with 3 High Impact B2B Pills (SpotlightCard) */}
      <div className="border-b border-neutral-800 py-10 2xl:py-14 bg-neutral-900/30">
        <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pill 1: Curvas de Fábrica */}
            <SpotlightCard
              spotlightColor="rgba(224, 76, 50, 0.16)"
              className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 flex items-center gap-4 hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-sf-bold text-white text-sm">Curvas de Fábrica (8 y 12 Pares)</h5>
                <p className="text-xs text-neutral-300 font-sf-regular">75% en talles 37 y 38 para rotación total sin clavos.</p>
              </div>
            </SpotlightCard>

            {/* Pill 2: 10% OFF Extra */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.16)"
              className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 flex items-center gap-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-sm">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-sf-bold text-white text-sm">10% OFF Extra Directo</h5>
                <p className="text-xs text-neutral-300 font-sf-regular">Abonando por transferencia bancaria o efectivo.</p>
              </div>
            </SpotlightCard>

            {/* Pill 3: Despacho Bonificado */}
            <SpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.16)"
              className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 flex items-center gap-4 hover:border-amber-500/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-sf-bold text-white text-sm">Despacho Bonificado al Expreso</h5>
                <p className="text-xs text-neutral-300 font-sf-regular">Traslado gratis para el interior y 100% gratis en CABA/GBA.</p>
              </div>
            </SpotlightCard>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 py-14 2xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info with High Contrast White Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* High Contrast Logo Container (White Invert Filter) */}
              <div className="bg-neutral-900 p-2.5 rounded-2xl border border-neutral-800 shadow-md inline-flex items-center">
                <img 
                  src="/logos/SkyBlue.svg" 
                  alt="SkyBlue Calzado Mayorista" 
                  className="h-8 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm font-sf-regular">
              Distribuidor oficial mayorista de calzado y marroquinería en Argentina. Representante oficial de <strong className="text-white">Xti (María Becerra)</strong>, <strong className="text-white">Refresh</strong>, <strong className="text-white">Petite Jolie</strong> y <strong className="text-white">Giulia Domna</strong>.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-primary transition-colors"
                aria-label="Instagram Oficial"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-primary transition-colors"
                aria-label="Facebook Oficial"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_INFO.b2bPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal B2B (mayoristas.skyblue.com.ar)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Marcas */}
          <div className="space-y-3">
            <h6 className="font-sf-bold text-white text-xs uppercase tracking-wider">Marcas Oficiales</h6>
            <ul className="space-y-2 text-xs font-sf-regular">
              <li>
                <button onClick={() => onOpenModal('xti')} className="hover:text-white transition-colors">
                  Xti España (María Becerra)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('refresh')} className="hover:text-white transition-colors">
                  Refresh (Casual Wear)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('petite-jolie')} className="hover:text-white transition-colors">
                  Petite Jolie (J-Lastic®)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('giulia-domna')} className="hover:text-white transition-colors">
                  Giulia Domna (Cuero Brasil)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegación */}
          <div className="space-y-3">
            <h6 className="font-sf-bold text-white text-xs uppercase tracking-wider">Navegación</h6>
            <ul className="space-y-2 text-xs font-sf-regular">
              <li>
                <button onClick={() => setActiveTab('inicio')} className="hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalogo')} className="hover:text-white transition-colors">
                  Catálogo Mayorista
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('showroom')} className="hover:text-white transition-colors">
                  Showroom Tapiales
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faq')} className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors">
                  Blog Mayorista
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="space-y-3">
            <h6 className="font-sf-bold text-white text-xs uppercase tracking-wider">Contacto Mayorista</h6>
            <ul className="space-y-2.5 text-xs font-sf-regular">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Curapaligüe 1428 (1er Piso), Tapiales, Buenos Aires</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Lun a Vie de 08:00 a 17:00 hs</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+54 9 11 3891-6779</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>ventas@skyblue.com.ar</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sf-medium">
          <p>© {new Date().getFullYear()} SkyBlue Calzado Mayorista. Todos los derechos reservados. Venta exclusiva a comerciantes con CUIT.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

      </div>
    </footer>
  );
}
