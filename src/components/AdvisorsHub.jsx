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
    <section id="asesoras" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Atención B2B Directa por WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Nuestro Equipo de Asesores Comerciales
          </h2>

          <p className="text-slate-700 text-base sm:text-lg">
            Te asesoramos de forma personalizada para armar tus módulos de 8 o 12 pares, coordinar tu visita al Showroom de Tapiales o gestionar tus despachos al interior.
          </p>
        </div>

        {/* 3 Advisor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.id}
              className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background gradient banner */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-sky-600 to-teal-600 opacity-10 group-hover:opacity-20 transition-opacity" />

              <div className="relative z-10 space-y-5">
                
                {/* Header Profile with Avatar & Status */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={advisor.avatar}
                      alt={`Asesor comercial ${advisor.name} SkyBlue Calzado`}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="En línea" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-900">
                        {advisor.name}
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-200">
                        {advisor.status}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold text-sky-700 mt-0.5">
                      {advisor.role}
                    </p>

                    <div className="flex items-center gap-1 text-[10px] text-slate-700 font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{advisor.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Phone & Specialty Box */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-sm">
                  <div className="text-xs font-black text-slate-900 flex items-center justify-between">
                    <span>Contacto Directo:</span>
                    <span className="text-sky-700">{advisor.phone}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    {advisor.specialty}
                  </p>
                </div>

                {/* Benefits Bullet Points */}
                <div className="space-y-1.5 text-xs text-slate-700">
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
              <div className="relative z-10 pt-5 mt-5 border-t border-slate-200">
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
