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

export default function ShowroomSection({ onOpenAdvisorModal }) {
  const stats = [
    { value: "+300", label: "Modelos Exhibidos", desc: "Curvas y muestras físicas" },
    { value: "Exclusivo", label: "Atención B2B", desc: "Comercios y zapaterías" },
    { value: "Colecciones", label: "Muestrarios Completos", desc: "Líneas oficiales" },
    { value: "Inmediato", label: "Despacho Ágil", desc: "Coordinación con tu asesor" }
  ];

  const amenities = [
    { icon: Sparkles, title: "Muestrarios Completos", desc: "Colecciones completas de todas nuestras marcas para que puedas revisar en persona materiales, confección y terminaciones." },
    { icon: ShieldCheck, title: "Prueba de Calce y Textura", desc: "Comprobá directamente la comodidad, suavidad, peso y calidad de cada calzado y producto de marroquinería." },
    { icon: Coffee, title: "Espacio Climatizado & Café", desc: "Atención exclusiva para comerciantes en un ambiente cómodo, privado y profesional." },
    { icon: Users, title: "Asesoramiento Personalizado", desc: "Asesoramiento comercial directo para optimizar tus curvas y armar tus pedidos de temporada." }
  ];

  return (
    <section id="showroom" className="py-16 sm:py-24 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-10">
          <div className="space-y-3 max-w-2xl 2xl:max-w-3xl">
            <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
              <span className="font-sf-light-italic text-neutral-400 mr-2">NUESTRO</span>
              <span className="font-sf-bold text-white">SHOWROOM</span>
            </h2>

            <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
              Visitá nuestro showroom y conocé nuestros más de 300 modelos con cita previa personalizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/5491138916779?text=Hola!%20Quiero%20coordinar%20una%20visita%20al%20Showroom%20de%20SkyBlue%20para%20conocer%20las%20curvas%20y%20modelos%20de%20la%20temporada."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-sf-bold text-xs sm:text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-primary-foreground" />
              <span>Coordinar Visita al showroom</span>
            </a>
          </div>
        </div>

        {/* 4 Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-primary/40 transition-colors space-y-1"
            >
              <div className="text-2xl sm:text-3xl font-sf-bold text-primary">
                {st.value}
              </div>
              <div className="text-xs font-sf-bold text-white uppercase tracking-wider">
                {st.label}
              </div>
              <div className="text-[11px] font-sf-regular text-neutral-400">
                {st.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Main Split Layout: Info on Left, Bento Photos on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (6 Cols): Addresses, Hours, Retail Stores */}
          <div className="lg:col-span-6 space-y-4">
            <SpotlightCard
              spotlightColor="rgba(224, 76, 50, 0.2)"
              className="p-6 sm:p-7 bg-neutral-950/80 border-neutral-800 space-y-4 rounded-3xl"
            >
              <div className="flex items-center justify-between">
                <span className="bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-sf-bold uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Showroom Comercial</span>
                </span>
                <span className="text-xs text-amber-400 font-sf-bold">
                  *Cita Previa Obligatoria
                </span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-sf-bold text-white block">Lunes a Viernes de 08:00 a 17:00 hs</span>
                  <p className="text-xs text-neutral-400 font-sf-regular">Atención personalizada con muestrarios y asesor asignado.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-sf-bold text-white block">{COMPANY_INFO.showroom.address}</span>
                  <p className="text-xs text-neutral-400 font-sf-regular">A metros de Autopista Riccheri y Av. Boulogne Sur Mer (Fácil acceso y estacionamiento).</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY_INFO.showroom.googleMapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-sf-bold transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary" />
                  <span>Abrir ubicación en Google Maps</span>
                </a>
              </div>
            </SpotlightCard>

            {/* 4 Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-sf-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sf-regular leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (6 Cols): Bento Visual Grid with Local Showroom Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-3xl overflow-hidden aspect-[16/10] border border-neutral-800 relative group bg-neutral-950 shadow-2xl">
              <img
                src="/images/showroom/showroom-1.jpg"
                alt="Showroom Mayorista SkyBlue Calzado Tapiales"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-sf-bold text-red-400 uppercase tracking-wider block mb-1">Muestrarios Oficiales</span>
                <h4 className="text-base sm:text-lg font-sf-bold text-white">Espacio Mayorista Tapiales (1er Piso)</h4>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-square border border-neutral-800 relative group bg-neutral-950 shadow-xl">
              <img
                src="/images/showroom/showroom-2.jpg"
                alt="Muestrario de Calzado Dama Xti y Petite Jolie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[11px] font-sf-bold text-white block">Calzado & Moda</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-square border border-neutral-800 relative group bg-neutral-950 shadow-xl">
              <img
                src="/images/showroom/showroom-3.jpg"
                alt="Sector de Marroquinería Petite Jolie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[11px] font-sf-bold text-white block">Bolsos en J-Lastic®</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
