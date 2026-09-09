import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  User, 
  Building, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Eye, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATALOGS_LIST } from '../data/mockData';
import SpotlightCard from './reactbits/SpotlightCard';

// 3D Tilt Card Component matching React Bits Showcase-2 Style
function CatalogCoverCard({ catalog, isUnlocked, onTriggerUnlock }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleDownloadClick = (e) => {
    if (!isUnlocked) {
      e.preventDefault();
      onTriggerUnlock();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative shrink-0 w-[280px] sm:w-[320px] 2xl:w-[340px] aspect-[1/1.42] rounded-3xl overflow-hidden cursor-pointer select-none transition-shadow duration-300 shadow-xl hover:shadow-2xl dark:shadow-black/60 group"
    >
      {/* 3D Content Wrapper */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="relative w-full h-full bg-slate-900 dark:bg-neutral-950 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 flex flex-col justify-between"
      >
        {/* Cover SVG Image */}
        <img
          src={catalog.cover}
          alt={`Portada ${catalog.title}`}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          draggable={false}
          loading="lazy"
        />

        {/* Dynamic Vignette & Dark Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

        {/* Glare Lighting Highlight that follows cursor */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-30 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          />
        )}

        {/* Top Header Floating Badges */}
        <div className="relative z-20 p-4 sm:p-5 flex items-start justify-between gap-2">
          <span 
            style={{ backgroundColor: `${catalog.accent}25`, borderColor: `${catalog.accent}60`, color: '#fff' }}
            className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-sf-bold uppercase tracking-wider backdrop-blur-md border shadow-md"
          >
            {catalog.brand}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-sf-bold text-white flex items-center gap-1 shadow-xs">
            <FileText className="w-3 h-3 text-amber-400" />
            <span>{catalog.pages}</span>
          </span>
        </div>

        {/* Bottom Details & Download Action */}
        <div className="relative z-20 p-4 sm:p-5 pt-0 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-[10px] font-sf-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>{catalog.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sf-bold text-white tracking-tight leading-tight">
              {catalog.title}
            </h3>
            <p className="text-xs text-neutral-300 font-sf-regular line-clamp-2 leading-relaxed">
              {catalog.description || catalog.subtitle}
            </p>
          </div>

          {/* Action Button */}
          {isUnlocked ? (
            <a
              href={catalog.pdfUrl}
              download={catalog.fileName || `${catalog.id}.pdf`}
              onClick={(e) => e.stopPropagation()}
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PDF ({catalog.fileSize || 'PDF Oficial'})</span>
            </a>
          ) : (
            <button
              onClick={handleDownloadClick}
              className="w-full py-3 px-4 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 group-hover:bg-primary group-hover:border-primary"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:text-white transition-colors" />
              <span>Completar Formulario para Descargar</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CatalogShowcaseSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    businessName: '',
    cuit: '',
    phone: '',
    location: '',
  });

  const trackRef = useRef(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const unlocked = localStorage.getItem('skyblue_catalogs_unlocked');
      const savedLead = localStorage.getItem('skyblue_lead_data');
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }
      if (savedLead) {
        setLeadInfo(JSON.parse(savedLead));
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.phone) return;

    try {
      localStorage.setItem('skyblue_catalogs_unlocked', 'true');
      localStorage.setItem('skyblue_lead_data', JSON.stringify(leadInfo));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }

    setIsUnlocked(true);
    setShowGateModal(false);

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleResetLead = () => {
    if (window.confirm('¿Deseas modificar tus datos de acceso?')) {
      setIsUnlocked(false);
      setShowGateModal(true);
    }
  };

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="catalogos-showcase" 
      className="py-16 sm:py-24 2xl:py-28 bg-slate-100/90 dark:bg-neutral-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Subtle Atmosphere Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-primary/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-sf-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Catálogos Oficiales 2026/2027</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-slate-500 dark:text-neutral-400 mr-2">PORTADAS Y</span>
            <span className="font-sf-bold text-slate-900 dark:text-white">CATÁLOGOS</span>
          </h2>

          <p className="font-sf-medium text-slate-600 dark:text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline max-w-2xl mx-auto">
            Descargá los catálogos en PDF con fotos de alta resolución, <br className="hidden sm:inline" />
            curvas de talles y modelos listos para comercializar en tu negocio.
          </p>
        </div>

        {/* Verification Status Banner / Access Control */}
        <div className="max-w-3xl mx-auto mb-10">
          {isUnlocked ? (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-sf-bold text-emerald-900 dark:text-emerald-200">
                  Acceso Mayorista Habilitado • {leadInfo.businessName ? `${leadInfo.businessName} (${leadInfo.name})` : leadInfo.name || 'Cliente Verificado'}
                </span>
              </div>
              <button
                onClick={handleResetLead}
                className="text-xs text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white underline underline-offset-2 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Actualizar datos</span>
              </button>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-amber-500" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-sf-bold text-slate-900 dark:text-white">
                    Catálogos protegidos con exclusividad mayorista
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-sf-regular">
                    Completá el formulario en 30 segundos para descargar todas las líneas en PDF.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGateModal(true)}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs flex items-center gap-2 shadow-md shadow-primary/25 shrink-0 transition-all hover:scale-105 cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Desbloquear Acceso Ahora</span>
              </button>
            </div>
          )}
        </div>

        {/* 3D Showcase Carousel Track (ReactBits Showcase-2 Horizontal Track) */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center justify-between absolute -top-14 right-0 gap-2 z-20">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-white hover:border-primary transition-colors shadow-sm active:scale-95 cursor-pointer"
              aria-label="Catálogos anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-white hover:border-primary transition-colors shadow-sm active:scale-95 cursor-pointer"
              aria-label="Catálogos siguientes"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Draggable & Scrollable Carousel Container */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 overflow-x-auto py-6 px-2 scroll-smooth no-scrollbar"
            style={{ perspective: '1200px' }}
          >
            {CATALOGS_LIST.map((catalog) => (
              <CatalogCoverCard
                key={catalog.id}
                catalog={catalog}
                isUnlocked={isUnlocked}
                onTriggerUnlock={() => setShowGateModal(true)}
              />
            ))}
          </div>

          {/* Swipe Indicator on Mobile */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500 dark:text-neutral-400 font-sf-medium">
            <span>Deslizá para ver las 6 portadas</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Unlock Gate Form Modal */}
      <AnimatePresence>
        {showGateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <SpotlightCard
              spotlightColor="rgba(224, 76, 50, 0.2)"
              className="bg-white dark:bg-neutral-950 text-slate-900 dark:text-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-neutral-800 relative transition-colors duration-300"
            >
              <div className="space-y-6">
                
                {/* Modal Header */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-sf-bold uppercase tracking-tight text-slate-900 dark:text-white">
                    Acceso a Catálogos Mayoristas
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-neutral-300 font-sf-medium leading-relaxed">
                    Completá tus datos comerciales una sola vez para habilitar la descarga inmediata de los 6 catálogos oficiales en PDF.
                  </p>
                </div>

                {/* The 5 Fields Form */}
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  {/* Nombre */}
                  <div className="space-y-1">
                    <label className="text-xs font-sf-bold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>Nombre y Apellido *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Marcelo Fernández"
                      value={leadInfo.name}
                      onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Local o Tienda */}
                  <div className="space-y-1">
                    <label className="text-xs font-sf-bold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-primary" />
                      <span>Nombre del local / Tienda online *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Zapatería Glam / Showroom Belgrano"
                      value={leadInfo.businessName}
                      onChange={(e) => setLeadInfo({ ...leadInfo, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* CUIT */}
                    <div className="space-y-1">
                      <label className="text-xs font-sf-bold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        <span>CUIT / DNI *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: 30-71689234-8"
                        value={leadInfo.cuit}
                        onChange={(e) => setLeadInfo({ ...leadInfo, cuit: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-1">
                      <label className="text-xs font-sf-bold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Teléfono (WhatsApp) *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 11 3891-6779"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Localidad */}
                  <div className="space-y-1">
                    <label className="text-xs font-sf-bold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>Localidad y Provincia *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Rosario, Santa Fe"
                      value={leadInfo.location}
                      onChange={(e) => setLeadInfo({ ...leadInfo, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Privacy Badge */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center gap-2 text-[11px] text-slate-500 dark:text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Tus datos quedan guardados en este navegador para no tener que volver a completarlos.</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowGateModal(false)}
                      className="w-1/3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-sf-bold text-xs transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Desbloquear y Descargar Catálogos</span>
                    </button>
                  </div>
                </form>

              </div>
            </SpotlightCard>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
