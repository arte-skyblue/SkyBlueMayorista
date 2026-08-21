import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Send, 
  CheckCircle2, 
  Percent,
  Lock,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADVISORS, COMPANY_INFO } from '../data/mockData';

export default function WholesaleModal({ isOpen, onClose, modalType }) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    cuit: '',
    phone: '',
    location: '',
    advisor: 'juliana',
    categories: ['dama'],
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const advisorObj = ADVISORS.find((a) => a.id === formData.advisor) || ADVISORS[0];
    const catLabels = formData.categories.join(', ');

    // Clean text generation without special broken symbols
    const whatsappMessage = `Hola ${advisorObj.name}! Me contacto desde la web mayorista de SkyBlue.\n\n*Nombre:* ${formData.name}\n*Comercio/Showroom:* ${formData.businessName}\n*CUIT:* ${formData.cuit}\n*Localidad:* ${formData.location}\n*Líneas de interés:* ${catLabels}\n\nQuiero solicitar el catálogo con la lista de precios mayorista por módulos y consultar las condiciones comerciales.`;

    const whatsappUrl = `https://wa.me/${advisorObj.cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card text-card-foreground rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-border relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Alta Mayorista con CUIT</span>
              </div>

              <h3 className="text-2xl font-black text-foreground">
                {modalType === 'xti' ? 'Catálogo Oficial María Becerra × XTI' : 'Solicitar Catálogo Mayorista y Precios'}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Completá los datos de tu local o showroom para enviarte el catálogo digital y habilitar el <span className="font-bold text-emerald-600">10% de descuento adicional</span> por pago al contado o transferencia.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground uppercase">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Lucía Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground uppercase">
                    Comercio / Showroom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Ej: Calzados Lucía"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground uppercase">
                    CUIT Comercial / DNI *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cuit}
                    onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    placeholder="27-12345678-4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground uppercase">
                    Ciudad y Provincia *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ej: Rosario, Santa Fe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Asesor Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase">
                  Asesor Comercial de Preferencia:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ADVISORS.map((adv) => (
                    <button
                      type="button"
                      key={adv.id}
                      onClick={() => setFormData({ ...formData, advisor: adv.id })}
                      className={`p-2 rounded-xl border text-left flex flex-col items-center text-center transition-all ${
                        formData.advisor === adv.id
                          ? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
                          : 'bg-muted/60 border-border text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      <img
                        src={adv.avatar}
                        alt={adv.name}
                        className="w-8 h-8 rounded-full object-cover mb-1"
                      />
                      <div className="text-xs leading-tight">{adv.name}</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">Online</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Checkboxes */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-foreground uppercase block">
                  Líneas de Interés:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categoryOptions.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleCategoryToggle(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        formData.categories.includes(cat.id)
                          ? 'bg-primary text-primary-foreground border-primary font-bold'
                          : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar y Abrir WhatsApp para Recibir Catálogo</span>
                </button>
              </div>

            </form>

          </div>
        ) : (
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">
                ¡Solicitud Enviada con Éxito!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Se está abriendo WhatsApp para que recibas el catálogo completo y tu <span className="font-bold text-emerald-600">10% de descuento</span> directamente con tu asesor comercial.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs text-muted-foreground">
              ¿No se abrió automáticamente?{' '}
              <a
                href={`https://wa.me/5491138916779`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline"
              >
                Hacé clic acá para chatear con Juliana
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
