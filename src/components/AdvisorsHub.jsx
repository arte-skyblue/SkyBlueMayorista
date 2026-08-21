import React from 'react';
import { 
  Users, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { ADVISORS } from '../data/mockData';

export default function AdvisorsHub() {
  return (
    <section id="asesoras" className="py-16 sm:py-24 2xl:py-28 bg-background border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs 2xl:text-sm font-extrabold uppercase tracking-wider">
            <Users className="w-4 h-4 text-primary" />
            <span>Atención B2B Directa por WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl font-black text-foreground tracking-tight">
            Nuestro Equipo de Asesores Comerciales
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg 2xl:text-xl">
            Te asesoramos de forma personalizada para armar tus módulos de 8 o 12 pares, coordinar tu visita al Showroom de Tapiales o gestionar tus despachos al interior.
          </p>
        </div>

        {/* 3 Advisor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl 2xl:max-w-7xl mx-auto">
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.id}
              className="group p-6 rounded-3xl bg-card hover:bg-card/90 border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background gradient banner */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary to-accent opacity-10 group-hover:opacity-20 transition-opacity" />

              <div className="relative z-10 space-y-5">
                
                {/* Header Profile with Avatar & Status */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={advisor.avatar}
                      alt={`Asesor comercial ${advisor.name} SkyBlue Calzado`}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-border shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" title="En línea" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-foreground">
                        {advisor.name}
                      </h3>
                      <span className="bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {advisor.status}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold text-primary mt-0.5">
                      {advisor.role}
                    </p>

                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{advisor.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Phone & Specialty Box */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1.5 shadow-xs">
                  <div className="text-xs font-black text-foreground flex items-center justify-between">
                    <span>Contacto Directo:</span>
                    <span className="text-primary">{advisor.phone}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium leading-snug">
                    {advisor.specialty}
                  </p>
                </div>

                {/* Benefits Bullet Points */}
                <div className="space-y-1.5 text-xs text-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Envío de catálogo y lista mayorista</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Coordinación de módulos y 10% OFF</span>
                  </div>
                </div>

              </div>

              {/* Bottom WhatsApp Button */}
              <div className="relative z-10 pt-5 mt-5 border-t border-border">
                <a
                  href={`https://wa.me/${advisor.cleanPhone}?text=${encodeURIComponent(advisor.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chatear con {advisor.name}</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
