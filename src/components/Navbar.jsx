import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  FileText, 
  MessageCircle, 
  Sparkles, 
  Award, 
  Layers, 
  TrendingUp, 
  MapPin, 
  HelpCircle, 
  BookOpen,
  ChevronRight,
  Phone,
  Clock,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS, BRANDS } from '../data/mockData';
import AnimatedMenuToggle from './reactbits/AnimatedMenuToggle';
import ShinyText from './reactbits/ShinyText';

export default function Navbar({ activeTab, setActiveTab, onOpenModal, onOpenAdvisorModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs = [
    { id: 'inicio', name: 'Inicio', desc: 'Banners, marcas y novedades', icon: Sparkles, color: 'text-primary' },
    { id: 'marcas', name: 'Marcas', desc: 'Xti, Refresh, Petite Jolie, Giulia', icon: Award, color: 'text-rose-400' },
    { id: 'catalogo', name: 'Catálogo', desc: 'Líneas y productos en módulo', icon: Layers, color: 'text-amber-400' },
    { id: 'beneficios', name: 'Rentabilidad', desc: 'Simulador y márgenes netos', icon: TrendingUp, color: 'text-emerald-400' },
    { id: 'showroom', name: 'Showroom', desc: 'Curapaligüe 1428 en Tapiales', icon: MapPin, color: 'text-sky-400' },
    { id: 'faq', name: 'FAQ', desc: 'Dudas sobre pedidos y envíos', icon: HelpCircle, color: 'text-purple-400' },
    { id: 'blog', name: 'Blog', desc: 'Guías comerciales para zapaterías', icon: BookOpen, color: 'text-neutral-400' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Ribbon */}
      <div className="bg-neutral-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-neutral-800/80 relative z-50">
        <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold text-primary">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Venta Exclusiva Mayorista con CUIT</span>
            </span>
            <span className="hidden md:inline-block text-neutral-700">•</span>
            <span className="hidden md:inline-block font-semibold text-neutral-300">
              Mínimo 1 módulo (8 o 12 pares surtidos de fábrica)
            </span>
            <span className="hidden lg:inline-block text-neutral-700">•</span>
            <span className="hidden lg:inline-block text-amber-400 font-medium">
              10% adicional por transferencia o efectivo
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-extrabold text-white hover:text-amber-300 transition-colors bg-neutral-900 hover:bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-700 shadow-xs"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>mayoristas.skyblue.com.ar</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            <button
              onClick={() => onOpenAdvisorModal(ADVISORS[0])}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-white bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Asesores Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Dynamic Glass Capsule Navbar */}
      <header className="sticky top-2 sm:top-4 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
          
          {/* Main Floating Capsule Container */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-full transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6 border ${
              isScrolled
                ? 'bg-neutral-950/90 backdrop-blur-2xl shadow-2xl border-neutral-800 shadow-black/80'
                : 'bg-neutral-950/80 backdrop-blur-xl shadow-xl border-neutral-800/80'
            }`}
          >
            
            {/* Brand Logo with Glow */}
            <button
              onClick={() => handleTabClick('inicio')}
              className="flex items-center gap-2.5 group shrink-0 pl-1"
            >
              <div className="h-8 sm:h-9 flex items-center">
                <img
                  src="/logos/SkyBlue.svg"
                  alt="SkyBlue Calzado Mayorista"
                  className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden xl:flex flex-col text-left pl-2.5 border-l border-neutral-800">
                <span className="bg-primary/15 text-primary text-[9px] font-black uppercase px-1.5 py-0.2 rounded tracking-wider border border-primary/30 w-max">
                  Mayorista B2B
                </span>
                <span className="text-[10px] text-neutral-400 font-bold">
                  Xti • Refresh • Petite Jolie • Giulia Domna
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links with Spring Layout Indicator */}
            <nav 
              className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-neutral-900/90 backdrop-blur-md border border-neutral-800"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isHovered = hoveredTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-sf-bold transition-colors duration-200 flex items-center gap-1.5 z-10 ${
                      isActive
                        ? 'text-white font-extrabold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {/* Active Pill Spring Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-reactbits-pill"
                        className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30 border border-primary/50 -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}

                    {/* Hover Pill Indicator */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="hover-reactbits-pill"
                        className="absolute inset-0 bg-neutral-800 rounded-full -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}

                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action CTAs & Animated Hamburger Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href={COMPANY_INFO.b2bPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal B2B</span>
              </a>

              <button
                onClick={() => onOpenModal('catalogo')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/15 hover:bg-primary/25 text-white font-sf-bold text-xs border border-primary/30 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Catálogo</span>
              </button>

              <button
                onClick={() => onOpenAdvisorModal(ADVISORS[0])}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Asesora</span>
              </button>

              {/* ReactBits Morphing Animated Hamburger Toggle Button */}
              <AnimatedMenuToggle
                isOpen={mobileMenuOpen}
                toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 shadow-md"
              />
            </div>

          </motion.div>
        </div>

        {/* Fullscreen / Staggered Drawer Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto mt-2.5 pointer-events-auto"
            >
              <div className="rounded-3xl bg-neutral-950/95 backdrop-blur-3xl border border-neutral-800 shadow-2xl p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
                
                {/* Navigation Items Staggered List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-sf-bold uppercase text-neutral-400 tracking-wider block px-1 mb-2">
                    Menú Principal
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {navTabs.map((tab, idx) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;

                      return (
                        <motion.button
                          key={tab.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          onClick={() => handleTabClick(tab.id)}
                          className={`p-3 sm:p-3.5 rounded-2xl text-left flex items-center justify-between transition-all group ${
                            isActive
                              ? 'bg-primary text-white shadow-lg shadow-primary/25'
                              : 'bg-neutral-900/80 hover:bg-neutral-900 text-neutral-200 border border-neutral-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-white/20 text-white' : 'bg-neutral-950 border border-neutral-800 text-primary'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-sf-bold text-xs sm:text-sm leading-tight text-white">
                                {tab.name}
                              </h4>
                              <span className={`text-[11px] font-sf-regular block ${
                                isActive ? 'text-white/80' : 'text-neutral-400'
                              }`}>
                                {tab.desc}
                              </span>
                            </div>
                          </div>

                          <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                            isActive ? 'text-white' : 'text-neutral-500'
                          }`} />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Brands Quick Selector */}
                <div className="pt-3 border-t border-neutral-800">
                  <span className="text-[10px] font-sf-bold uppercase text-neutral-400 tracking-wider block px-1 mb-2">
                    Catálogos Oficiales por Marca
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BRANDS.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenModal(brand.id);
                        }}
                        className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 flex items-center justify-center text-xs font-sf-bold text-white transition-colors"
                      >
                        <span>{brand.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* B2B Action Buttons */}
                <div className="pt-3 border-t border-neutral-800 space-y-2.5">
                  <a
                    href={COMPANY_INFO.b2bPlatformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Acceder a mayoristas.skyblue.com.ar (Portal B2B)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenModal('alta');
                      }}
                      className="py-3 px-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Alta con CUIT</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdvisorModal(ADVISORS[0]);
                      }}
                      className="py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Directo</span>
                    </button>
                  </div>
                </div>

                {/* Advisors Quick Contact Bar */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-sf-medium">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>3 Asesores en línea</span>
                  </span>
                  <span>Lun a Vie 08 a 17 hs</span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
