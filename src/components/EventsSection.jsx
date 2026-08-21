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
import { EVENTS } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';

export default function EventsSection({ onOpenModal }) {
  const eventMedia = {
    efica: { type: 'image', src: '/images/events/efica.jpg' },
    exical: { type: 'image', src: '/images/events/exical.jpg' },
    'gira-norte': { type: 'video', src: '/videos/events/tucuman.mp4' }
  };

  return (
    <section id="eventos" className="py-16 sm:py-24 2xl:py-28 bg-background text-foreground border-b border-border relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
              <span className="font-sf-light-italic text-muted-foreground mr-2">FERIAS Y</span>
              <span className="font-sf-bold text-foreground">EVENTOS</span>
            </h2>

            <p className="font-sf-medium text-muted-foreground text-base sm:text-lg 2xl:text-xl apple-subheadline">
              Presentamos las colecciones de calzado oficial en las exposiciones y ferias más importantes de Argentina.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5491138916779?text=Hola!%20Quiero%20coordinar%20un%20encuentro%20comercial%20en%20el%20stand%20de%20SkyBlue%20en%20la%20pr%C3%B3xima%20feria."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-foreground hover:bg-foreground/90 text-background font-sf-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Agendar Reunión en Stand</span>
            </a>
          </div>
        </div>

        {/* Event Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVENTS.map((event) => {
            const media = eventMedia[event.id] || { type: 'image', src: '/images/events/efica.jpg' };

            return (
              <TiltedCard key={event.id} maxTilt={6} scale={1.01} className="h-full">
                <article className="bg-card hover:bg-card/90 rounded-3xl border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                  
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                      {media.type === 'video' ? (
                        <video
                          src={media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <img
                          src={media.src}
                          alt={`Feria ${event.title} SkyBlue Calzado Mayorista`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-neutral-950/90 text-white text-[10px] font-sf-bold uppercase px-3 py-1 rounded-full border border-white/20">
                        {event.badge}
                      </div>

                      {/* Stand Tag */}
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-sf-medium flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{event.stand}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-sf-bold text-primary">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.location}</span>
                      </div>

                      <h3 className="text-xl font-sf-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sf-regular">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-sf-bold text-foreground">
                      <span className="text-muted-foreground">{event.date}</span>
                      <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Consultar Stand <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </article>
              </TiltedCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
