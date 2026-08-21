import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS, BRANDS } from '../data/mockData';
import AnimatedMenuToggle from './reactbits/AnimatedMenuToggle';

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
    { id: 'inicio', name: 'Inicio', desc: 'Banners y novedades', icon: Sparkles },
    { id: 'marcas', name: 'Marcas', desc: 'Xti, Refresh, Petite Jolie', icon: Award },
    { id: 'catalogo', name: 'Catálogo', desc: 'Módulos y curvas', icon: Layers },
    { id: 'beneficios', name: 'Rentabilidad', desc: 'Simulador de ganancia', icon: TrendingUp },
    { id: 'showroom', name: 'Showroom', desc: 'Espacio físico en Tapiales', icon: MapPin },
    { id: 'faq', name: 'FAQ', desc: 'Dudas y pedidos', icon: HelpCircle },
    { id: 'blog', name: 'Blog', desc: 'Guías comerciales', icon: BookOpen },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl 2xl:max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* LumaBar Floating Glass Capsule Container */}
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-full transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 border ${
            isScrolled
              ? 'bg-neutral-950/90 backdrop-blur-2xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
              : 'bg-neutral-950/80 backdrop-blur-xl border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
          }`}
        >
          
          {/* Brand Identity & Logo in High-Contrast White Filter */}
          <button
            onClick={() => handleTabClick('inicio')}
            className="flex items-center gap-2 group shrink-0 pl-1"
          >
            <div className="h-7 sm:h-8 flex items-center">
              <img
                src="/logos/SkyBlue.svg"
                alt="SkyBlue Calzado Mayorista"
                className="h-6 sm:h-7 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="bg-primary/20 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider border border-primary/40 hidden sm:inline-block">
              Mayorista B2B
            </span>
          </button>

          {/* Desktop Navigation Links with Spring Pill Glow Indicator */}
          <nav 
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800"
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
                  {/* Active Indicator with Spring Physics and Subtle Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="lumabar-indicator"
                      className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30 border border-primary/50 -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Hover Indicator */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="lumabar-hover"
                      className="absolute inset-0 bg-neutral-800/90 rounded-full -z-10"
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
          <div className="flex items-center gap-2">
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
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 hover:bg-primary/25 text-white font-sf-bold text-xs border border-primary/30 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => onOpenAdvisorModal(ADVISORS[0])}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-xs shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Asesora</span>
            </button>

            {/* ReactBits Animated Morphing Hamburger Toggle Button */}
            <AnimatedMenuToggle
              isOpen={mobileMenuOpen}
              toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 shadow-md"
            />
          </div>

        </motion.div>
      </div>

      {/* Floating Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto mt-2 pointer-events-auto"
          >
            <div className="rounded-3xl bg-neutral-950/95 backdrop-blur-3xl border border-neutral-800 shadow-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Menu Items List */}
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
                      className={`p-3 rounded-2xl text-left flex items-center justify-between transition-all group ${
                        isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'bg-neutral-900/80 hover:bg-neutral-900 text-neutral-200 border border-neutral-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-neutral-950 border border-neutral-800 text-primary'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-sf-bold text-xs sm:text-sm text-white">
                            {tab.name}
                          </h4>
                          <span className={`text-[10px] font-sf-regular block ${
                            isActive ? 'text-white/80' : 'text-neutral-400'
                          }`}>
                            {tab.desc}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* B2B Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 space-y-2">
                <a
                  href={COMPANY_INFO.b2bPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Acceder al Portal Mayorista (mayoristas.skyblue.com.ar)</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenModal('alta');
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-primary text-white font-sf-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Alta con CUIT</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdvisorModal(ADVISORS[0]);
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-emerald-600 text-white font-sf-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
