import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Building, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { EVENTS, ADVISORS } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';
import TiltedCard from './reactbits/TiltedCard';

export default function EventsSection({ onOpenModal }) {
  const eventImages = {
    efica: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    exical: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    "gira-norte": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <section id="eventos" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Ferias, Exposiciones & Giras Comerciales</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Encontranos en los Grandes Eventos del Calzado
            </h2>

            <p className="text-slate-700 text-base sm:text-lg">
              Presentamos las nuevas curvas y modelos oficiales de Xti, Refresh, Petite Jolie y Giulia Domna en las principales ferias del país.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero coordinar un encuentro comercial en el stand de SkyBlue en la próxima feria de calzado.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Agendar Reunión en Stand</span>
            </a>
          </div>
        </div>

        {/* Blog 9 Event Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((event, idx) => (
            <TiltedCard key={event.id} maxTilt={6} scale={1.01} className="h-full">
              <article className="bg-slate-50 hover:bg-white rounded-3xl border border-slate-200 hover:border-sky-300 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                
                {/* Event Image Banner with Date Badge */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={eventImages[event.id] || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"}
                      alt={`Feria ${event.title} SkyBlue Calzado Mayorista`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/90 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/20">
                      {event.badge}
                    </div>

                    {/* Stand Tag */}
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{event.stand}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                  <a
                    href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero información sobre la presencia de SkyBlue en ${event.title} (${event.location}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-800 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Consultar Fechas & Acreditación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </article>
            </TiltedCard>
          ))}
        </div>

      </div>
    </section>
  );
}
