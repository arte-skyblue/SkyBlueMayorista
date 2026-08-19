import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ADVISORS } from '../data/mockData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Popup Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">
                  SkyBlue Asesores B2B
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                  <span>En línea para responderte</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-50">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Elegí un asesor comercial para recibir el catálogo y cotizar por módulos:
            </p>

            <div className="space-y-2">
              {ADVISORS.map((advisor) => (
                <a
                  key={advisor.id}
                  href={`https://wa.me/${advisor.cleanPhone}?text=${encodeURIComponent(advisor.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={advisor.avatar}
                        alt={advisor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                    </div>

                    <div>
                      <div className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-700">
                        {advisor.name}
                      </div>
                      <div className="text-[10px] text-slate-700 truncate max-w-[170px]">
                        {advisor.specialty}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-[10px] font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Mínimo 1 módulo (8 o 12 pares) con CUIT</span>
            </div>

          </div>

        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Abrir WhatsApp Mayorista"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-300 animate-ping"></span>
        </div>
        
        <span className="hidden sm:inline-block">
          {isOpen ? 'Cerrar' : 'Asesores Online'}
        </span>
      </button>

    </div>
  );
}
