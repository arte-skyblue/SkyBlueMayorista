import React from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle,
  Eye,
  Coffee,
  Car
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function ShowroomSection({ onOpenAdvisorModal }) {
  const showroomPhotos = [
    {
      src: "/images/showroom/showroom-1.jpg",
      title: "Salón Principal de Exhibición",
      desc: "Colecciones completas de temporada Xti, Refresh y Petite Jolie.",
      span: "lg:col-span-8 aspect-[16/10]"
    },
    {
      src: "/images/showroom/showroom-2.jpg",
      title: "Muestrarios Dama & Marroquinería",
      desc: "Líneas de bolsos, carteras y calzado de fiesta en exposición.",
      span: "lg:col-span-4 aspect-[4/3] lg:aspect-auto"
    },
    {
      src: "/images/showroom/showroom-3.jpg",
      title: "Módulos y Stock de Temporada",
      desc: "Inspección de calidad y prueba de calce para comerciantes.",
      span: "lg:col-span-12 aspect-[21/9]"
    }
  ];

  const amenities = [
    { icon: Eye, title: "Prueba de Calce y Muestras", desc: "Tocá los materiales y evaluá la calidad antes de comprar." },
    { icon: Coffee, title: "Atención Café & Negocios", desc: "Espacio reservado para armar tu pedido con asesor comercial." },
    { icon: Car, title: "Estacionamiento Propio", desc: "Acceso seguro sobre Curapaligüe 1428 en Tapiales." },
    { icon: ShieldCheck, title: "Retiro Inmediato de Módulos", desc: "Si abonás en el local podés llevarte tu compra en el acto." }
  ];

  const defaultWhatsappMessage = "Hola! Quiero coordinar una visita con cita previa al Showroom de Tapiales para ver las colecciones de calzado mayorista.";

  return (
    <section id="showroom" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary apple-kicker text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Espacio Mayorista Tapiales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">NUESTRO</span>
            <span className="font-sf-bold text-white">SHOWROOM</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Vení a conocer las colecciones completas, probar calces y recibir atención personalizada para tu comercio.
          </p>
        </div>

        {/* 3 Photos Bento Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-12">
          {showroomPhotos.map((photo, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-xs font-sf-bold text-primary uppercase tracking-wider block">
                  Showroom SkyBlue
                </span>
                <h3 className="text-lg sm:text-xl 2xl:text-2xl font-sf-bold text-white leading-tight">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sf-regular line-clamp-1">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom Details & Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-sf-bold text-primary uppercase tracking-wider block mb-2">
                Atención Exclusiva para Comerciantes
              </span>
              <h3 className="text-2xl sm:text-3xl font-sf-bold text-white mb-3">
                Curapaligüe 1428 (1er Piso) — Tapiales, Bs. As.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sf-regular">
                Ubicado en zona estratégica con fácil acceso desde autopista Riccheri y General Paz. Contamos con estacionamiento exclusivo y muestrarios completos de cada temporada.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sf-medium">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-white font-bold block">Horario de Atención:</span>
                  <span className="text-neutral-400">Lunes a Viernes de 08:00 a 17:00 hs</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block">Modalidad de Visita:</span>
                  <span className="text-neutral-400">Con cita previa coordinada</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/5491138916779?text=${encodeURIComponent(defaultWhatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar Cita con Juliana</span>
              </a>

              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-sf-medium text-xs sm:text-sm border border-neutral-700 flex items-center gap-2 transition-all hover:scale-105"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-sf-bold text-xs text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sf-regular leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
