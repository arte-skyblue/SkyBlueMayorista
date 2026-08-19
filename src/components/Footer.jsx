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
  Store
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';

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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-800 py-10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-white text-sm">Venta por Módulos (8/12 Pares)</h5>
                <p className="text-xs text-slate-400">Exclusivo comerciantes con CUIT.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-white text-sm">10% Adicional en tu Pago</h5>
                <p className="text-xs text-slate-400">En efectivo, transferencia o depósito.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-white text-sm">Despachos en 24 a 48 hs</h5>
                <p className="text-xs text-slate-400">Envíos asegurados a todo el país.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logos/SkyBlue.svg" 
                alt="SkyBlue Calzado Mayorista" 
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Distribuidor oficial mayorista de calzado y marroquinería en Argentina. Representante oficial de <strong className="text-slate-200">Xti (María Becerra)</strong>, <strong className="text-slate-200">Refresh</strong>, <strong className="text-slate-200">Petite Jolie</strong> y <strong className="text-slate-200">Giulia Domna</strong>.
            </p>

            <div className="pt-1 text-xs text-slate-400 space-y-1.5">
              <div>CUIT Comercial: <span className="text-slate-200 font-bold">{COMPANY_INFO.cuit}</span></div>
              <div className="flex items-start gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Showroom Mayorista: {COMPANY_INFO.showroom.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.showroom.schedule} (Cita previa)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/5491138916779`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-600 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Marcas Oficiales */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm uppercase tracking-wider">
              Marcas Oficiales
            </h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('marcas')} className="hover:text-sky-400 text-left transition-colors">Xti España (María Becerra)</button></li>
              <li><button onClick={() => setActiveTab('marcas')} className="hover:text-sky-400 text-left transition-colors">Refresh Casual Wear</button></li>
              <li><button onClick={() => setActiveTab('marcas')} className="hover:text-sky-400 text-left transition-colors">Petite Jolie Brasil (J-Lastic®)</button></li>
              <li><button onClick={() => setActiveTab('marcas')} className="hover:text-sky-400 text-left transition-colors">Giulia Domna (Cuero Legítimo)</button></li>
              <li><button onClick={() => setActiveTab('catalogo')} className="hover:text-sky-400 text-left transition-colors">XTI Kids Colegial & Urbano</button></li>
            </ul>
          </div>

          {/* Col 3: Secciones & B2B */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm uppercase tracking-wider">
              Portal Mayorista
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={COMPANY_INFO.b2bPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>mayoristas.skyblue.com.ar</span>
                </a>
              </li>
              <li><button onClick={() => setActiveTab('catalogo')} className="hover:text-sky-400 text-left transition-colors">Catálogo por Módulos</button></li>
              <li><button onClick={() => setActiveTab('beneficios')} className="hover:text-sky-400 text-left transition-colors">Calculadora de Ganancia x2.5</button></li>
              <li><button onClick={() => setActiveTab('showroom')} className="hover:text-sky-400 text-left transition-colors">Showroom Tapiales (1er Piso)</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-sky-400 text-left transition-colors">Preguntas Frecuentes FAQ</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-sky-400 text-left transition-colors">Blog para Zapaterías</button></li>
            </ul>
          </div>

          {/* Col 4: Asesores de Contacto */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm uppercase tracking-wider">
              Asesores Comerciales
            </h5>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-white block">Juliana (Showroom & Dama)</span>
                <span className="text-slate-400 block text-[11px]">+54 9 11 3891-6779</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-white block">Jesica (Interior & Kids)</span>
                <span className="text-slate-400 block text-[11px]">+54 9 11 3093-6075</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-white block">Marcelino (Cuentas B2B)</span>
                <span className="text-slate-400 block text-[11px]">+54 9 11 3658-2482</span>
              </div>
            </div>
          </div>

        </div>

        {/* Retail Stores Mention */}
        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Locales minoristas a la calle: Curapaligüe 1428 (Tapiales) | Av. Libertad 1190 (Cañuelas)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 mt-6 border-t border-slate-900 text-center text-xs text-slate-700">
          <p>© {new Date().getFullYear()} SkyBlue Calzado Mayorista. Venta exclusiva a comerciantes con CUIT por módulos de 8 o 12 pares.</p>
        </div>

      </div>
    </footer>
  );
}
