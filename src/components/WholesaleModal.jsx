import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Send, 
  CheckCircle2, 
  Lock,
  ExternalLink,
  Sparkles,
  MessageCircle,
  User,
  Building,
  MapPin,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADVISORS, COMPANY_INFO } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

export default function WholesaleModal({ isOpen, onClose, modalType }) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    cuit: '',
    phone: '',
    location: '',
    advisor: 'juliana',
    categories: ['dama', 'marroquineria'],
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const categoryOptions = [
    { id: 'dama', label: 'Calzado Dama (Xti/Refresh/Giulia Domna)' },
    { id: 'caballero', label: 'Calzado Caballero' },
    { id: 'ninos', label: 'XTI Kids (Módulos 8/12 pares)' },
    { id: 'marroquineria', label: 'Marroquinería Petite Jolie' },
    { id: 'accesorios', label: 'Accesorios & Charms' },
  ];

  const handleCategoryToggle = (id) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    const advisorObj = ADVISORS.find((a) => a.id === formData.advisor) || ADVISORS[0];
    const catLabels = formData.categories.map((c) => {
      const opt = categoryOptions.find((o) => o.id === c);
      return opt ? opt.label.split(' (')[0] : c;
    }).join(', ');

    const whatsappMessage = `¡Hola ${advisorObj.name}! Me contacto desde la web mayorista de SkyBlue Calzado.\n\n*Nombre:* ${formData.name}\n*Comercio / Showroom:* ${formData.businessName}\n*CUIT / DNI:* ${formData.cuit}\n*Localidad:* ${formData.location}\n*Líneas de interés:* ${catLabels}\n\nQuiero solicitar el catálogo PDF con la lista de precios mayorista por módulos y consultar stock.`;

    const whatsappUrl = `https://wa.me/${advisorObj.cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Dynamic Background Spotlight Card Container */}
      <SpotlightCard
        spotlightColor="rgba(224, 76, 50, 0.2)"
        className="bg-neutral-950 text-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-800 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800 z-20"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header with SF Pro Light Italic + Bold */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-sf-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>Venta Exclusiva para Comerciantes con CUIT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sf-bold text-white uppercase tracking-tight apple-headline">
                <span className="font-sf-light-italic text-neutral-400 mr-2">SOLICITAR</span>
                <span className="font-sf-bold text-white">CATÁLOGO MAYORISTA</span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sf-regular">
                Recibí en WhatsApp los catálogos en PDF con listas de precios de fábrica, curvas por módulos cerrados y el <span className="text-amber-400 font-sf-bold">10% de descuento adicional</span> en tu primera compra.
              </p>

              {/* Micro Trust Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-sf-medium text-neutral-300">
                <span className="px-2.5 py-0.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  ✓ Factura A / B
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  ✓ Módulos de 8 y 12 pares
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  ✓ Envíos a todo el país
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Lucía Martínez"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none text-xs sm:text-sm text-white placeholder:text-neutral-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider">
                    Comercio / Showroom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Ej: Calzados Lucía"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none text-xs sm:text-sm text-white placeholder:text-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider">
                    CUIT Comercial / DNI *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cuit}
                    onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    placeholder="27-12345678-4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none text-xs sm:text-sm text-white placeholder:text-neutral-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider">
                    Ciudad y Provincia *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ej: Rosario, Santa Fe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none text-xs sm:text-sm text-white placeholder:text-neutral-500"
                  />
                </div>
              </div>

              {/* Asesor Selection with spring layout */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Asesor Comercial de Preferencia:</span>
                  <span className="text-[10px] text-emerald-400 font-sf-medium">Respuesta inmediata</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ADVISORS.map((adv) => {
                    const isSelected = formData.advisor === adv.id;
                    return (
                      <button
                        type="button"
                        key={adv.id}
                        onClick={() => setFormData({ ...formData, advisor: adv.id })}
                        className={`relative p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-neutral-900 border-red-500/70 text-white shadow-lg'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                        }`}
                      >
                        <div className="relative mb-1">
                          <img
                            src={adv.avatar}
                            alt={adv.name}
                            className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                          />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-neutral-950" />
                        </div>
                        <div className="text-xs font-sf-bold text-white leading-tight">{adv.name}</div>
                        <div className="text-[9px] text-neutral-400 font-sf-regular truncate w-full mt-0.5">
                          {adv.id === 'juliana' ? 'Showroom' : adv.id === 'jesica' ? 'Facturación' : 'Marketing'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Checkboxes */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-sf-bold text-neutral-300 uppercase tracking-wider block">
                  Líneas de Interés:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categoryOptions.map((cat) => {
                    const isChecked = formData.categories.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => handleCategoryToggle(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-sf-medium border transition-all flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-red-600/20 border-red-500 text-white font-sf-bold shadow-xs'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-red-400" />}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-sf-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar y Abrir WhatsApp para Recibir Catálogo</span>
                </button>
              </div>

            </form>

          </div>
        ) : (
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-sf-bold text-white uppercase">
                ¡Solicitud Enviada con Éxito!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-sf-regular">
                Se está abriendo WhatsApp para que recibas el catálogo completo y tu <span className="font-bold text-emerald-400">10% de descuento</span> directamente con tu asesor comercial.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 max-w-md mx-auto">
              ¿No se abrió automáticamente?{' '}
              <a
                href={`https://wa.me/5491138916779`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline"
              >
                Hacé clic acá para chatear directamente
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-7 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-sf-bold transition-all"
            >
              Cerrar
            </button>
          </div>
        )}

      </SpotlightCard>
    </div>
  );
}
