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
  Sparkles,
  Layers,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS, BRANDS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import { useTheme } from '../context/ThemeContext';

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
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/90 dark:bg-neutral-950 text-slate-600 dark:text-neutral-400 border-t border-slate-200 dark:border-neutral-800/80 pt-12 pb-10 transition-colors duration-300">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 space-y-10">
        
        {/* Bento Footer Interactive Matrix (ReactBits Dark Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Bento 1: Brand Authority & B2B Portal Access */}
          <SpotlightCard
            spotlightColor={isDark ? "rgba(224, 76, 50, 0.16)" : "rgba(224, 76, 50, 0.08)"}
            className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/70 border border-slate-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-6 shadow-sm dark:shadow-md transition-colors duration-300"
          >
            <div className="space-y-4">
              {/* Pure Contrast Logo */}
              <div className="bg-slate-50 dark:bg-neutral-950 p-2.5 rounded-2xl border border-slate-200 dark:border-neutral-800 inline-flex items-center shadow-xs">
                <img 
                  src="/logos/SkyBlue.svg" 
                  alt="SkyBlue Calzado Mayorista" 
                  className={`h-8 w-auto object-contain transition-opacity ${
                    isDark ? 'brightness-0 invert opacity-95 hover:opacity-100' : 'brightness-0 opacity-90 hover:opacity-100'
                  }`}
                />
              </div>

              <p className="text-xs text-slate-600 dark:text-neutral-300 font-sf-regular leading-relaxed">
                Distribuidor oficial B2B de calzado y marroquinería internacional en Argentina. Venta exclusiva para comerciantes con CUIT.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={COMPANY_INFO.b2bPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal B2B (mayoristas.skyblue.com.ar)</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={COMPANY_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] text-slate-500 dark:text-neutral-500 font-sf-medium">@skybluemayorista</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Bento 2: Commercial Rules of Trust */}
          <SpotlightCard
            spotlightColor={isDark ? "rgba(16, 185, 129, 0.16)" : "rgba(16, 185, 129, 0.08)"}
            className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/70 border border-slate-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-sf-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Garantías Comerciales</span>
              </span>
              <h4 className="text-base font-sf-bold text-slate-900 dark:text-white">
                Condiciones Claras para tu Zapatería
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-neutral-300 font-sf-regular pt-1">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white shrink-0 mt-1.5" />
                  <span><strong>Factura A/B:</strong> Facturación oficial obligatoria con CUIT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span><strong>Curvas de 8 y 12 pares:</strong> Concentración 75% en talles centrales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>10% OFF En tu primer compra:</strong> Y compras con transferencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0 mt-1.5" />
                  <span><strong>Envíos a todo el país:</strong> Despacho bonificado en 24 a 48 hs.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenModal('alta')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-sf-bold text-xs border border-slate-300 dark:border-neutral-700 flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Solicitar Alta Mayorista</span>
            </button>
          </SpotlightCard>

          {/* Bento 3: Commercial Advisors Online */}
          <SpotlightCard
            spotlightColor={isDark ? "rgba(245, 158, 11, 0.16)" : "rgba(245, 158, 11, 0.08)"}
            className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/70 border border-slate-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-sf-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Atención Humana Directa</span>
              </span>
              <h4 className="text-base font-sf-bold text-slate-900 dark:text-white">
                Asesoras Comerciales en Línea
              </h4>

              {/* Advisors Avatars List */}
              <div className="space-y-2 pt-1">
                {ADVISORS.map((advisor) => (
                  <button
                    key={advisor.id}
                    onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(advisor) : null}
                    className="w-full p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 dark:bg-neutral-950/80 dark:hover:bg-neutral-950 border border-slate-200 dark:border-neutral-800/80 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-neutral-700">
                        <img src={advisor.avatar} alt={advisor.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-neutral-950" />
                      </div>
                      <div className="text-left">
                        <h5 className="font-sf-bold text-xs text-slate-900 dark:text-white leading-tight">{advisor.name}</h5>
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 block">{advisor.specialty}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-slate-500 dark:text-neutral-500 font-sf-medium text-center block">
              Horario: Lun a Vie de 08:00 a 17:00 hs
            </span>
          </SpotlightCard>

          {/* Bento 4: Showroom & Physical Trust */}
          <SpotlightCard
            spotlightColor={isDark ? "rgba(239, 68, 68, 0.16)" : "rgba(239, 68, 68, 0.08)"}
            className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-900/70 border border-slate-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-md transition-colors duration-300"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-sf-bold uppercase text-primary tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Showroom & Venta Física</span>
              </span>
              <h4 className="text-base font-sf-bold text-slate-900 dark:text-white">
                Curapaligüe 1428, Tapiales
              </h4>

              <div className="space-y-2 text-xs text-slate-600 dark:text-neutral-300 font-sf-regular pt-1">
                <p>1er Piso — Salón de exposición con muestrarios completos de todas las líneas europeas y brasileñas.</p>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-600 dark:text-neutral-400">
                  <Clock className="w-3 h-3 text-primary inline mr-1" />
                  <span>Atención con cita previa coordinada por WhatsApp.</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Curapaligue+1428+Tapiales+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-sf-bold text-xs border border-slate-300 dark:border-neutral-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </SpotlightCard>

        </div>

        {/* Bottom Minimalist Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-400 font-sf-medium">
          <p>© {new Date().getFullYear()} SkyBlue Calzado Mayorista. Todos los derechos reservados. Venta exclusiva a comerciantes con CUIT.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:border-primary transition-all text-xs shadow-xs"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

      </div>
    </footer>
  );
}

