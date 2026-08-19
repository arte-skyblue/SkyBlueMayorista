import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Coffee, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  Store,
  ExternalLink,
  Award,
  Users,
  Navigation
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import TiltedCard from './reactbits/TiltedCard';
import ShinyText from './reactbits/ShinyText';

export default function ShowroomSection({ onOpenAdvisorModal }) {
  const stats = [
    { value: "+300", label: "Modelos Exhibidos", desc: "Curvas y muestras físicas" },
    { value: "1er Piso", label: "Showroom Tapiales", desc: "Curapaligüe 1428" },
    { value: "2 Locales", label: "Venta Minorista", desc: "Tapiales & Cañuelas" },
    { value: "10% OFF", label: "Retiro en Mano", desc: "Efectivo / Transferencia" },
  ];

  const amenities = [
    { icon: Sparkles, title: "Muestrarios Completos", desc: "Xti, Refresh, Petite Jolie y Giulia Domna para revisar materiales y confección." },
    { icon: ShieldCheck, title: "Prueba de Calce y Textura", desc: "Comprobá las suelas anatómicas, cueros genuinos y polímeros J-Lastic®." },
    { icon: Coffee, title: "Espacio Climatizado & Café", desc: "Atención exclusiva para comerciantes en un ambiente cómodo y privado." },
    { icon: Building2, title: "Despacho Inmediato", desc: "Posibilidad de retirar tus bultos y módulos en el momento con tu asesor." },
  ];

  return (
    <section id="showroom" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background glow and subtle dot pattern */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Showroom Mayorista & Red de Locales</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Visitanos en Nuestro Showroom B2B de Tapiales
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              Espacio exclusivo para comerciantes, boutiques y zapaterías. Conocé las colecciones de la temporada en persona y armá tus módulos con asesoramiento personalizado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero agendar una visita al Showroom de SkyBlue en Tapiales (Curapaligüe 1428, 1er piso) para conocer las curvas y modelos de la temporada.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-sky-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5 text-slate-950" />
              <span>Coordinar Cita con Juliana</span>
            </a>
          </div>
        </div>

        {/* 4 Key Stats Bar (About-10 Pattern) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-colors space-y-1"
            >
              <div className="text-2xl sm:text-3xl font-black text-sky-400">
                {st.value}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {st.label}
              </div>
              <div className="text-[11px] text-slate-400">
                {st.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Main Split Layout: Info & Facilities on Left, Visual Bento Gallery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (6 Cols): Addresses, Hours, Retail Stores */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Showroom Tapiales Card */}
            <SpotlightCard
              spotlightColor="rgba(14, 165, 233, 0.2)"
              className="p-6 sm:p-7 bg-slate-950/80 border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Showroom B2B (1er Piso)</span>
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  *Cita Previa Obligatoria
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {COMPANY_INFO.showroom.address}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Buenos Aires, Argentina • Estacionamiento coordinable
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {COMPANY_INFO.showroom.schedule}
                    </span>
                    <p className="text-xs text-slate-400">
                      Atención personalizada con muestrarios de temporada
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Curapaligüe 1428, Tapiales, Buenos Aires')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-400" />
                  <span>Cómo Llegar en Google Maps</span>
                </a>
              </div>
            </SpotlightCard>

            {/* Retail Stores Callout */}
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider">
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Locales Comerciales a la Calle (Venta Minorista):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_INFO.retailStores.map((store, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="font-bold text-sm text-white block">{store.name}</span>
                    <span className="text-xs text-slate-400 block">{store.address}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {amenities.map((am, i) => {
                const Icon = am.icon;
                return (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{am.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{am.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column (6 Cols): Bento Visual Photo Showcase with TiltedCard */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <TiltedCard maxTilt={6} scale={1.01} className="col-span-2">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                  alt="Showroom mayorista SkyBlue Calzado Tapiales"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-black uppercase text-sky-300">Showroom Mayorista</span>
                  <p className="text-sm font-bold text-white">Espacio de exhibición comercial para comerciantes de todo el país</p>
                </div>
              </div>
            </TiltedCard>

            <TiltedCard maxTilt={8} scale={1.02}>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
                  alt="Exhibición calzado Xti en showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">Línea Dama XTI</span>
              </div>
            </TiltedCard>

            <TiltedCard maxTilt={8} scale={1.02}>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
                  alt="Exhibición marroquinería Petite Jolie en showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">Petite Jolie J-Lastic®</span>
              </div>
            </TiltedCard>
          </div>

        </div>

      </div>
    </section>
  );
}
