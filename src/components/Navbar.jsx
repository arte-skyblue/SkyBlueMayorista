import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Menu, 
  X, 
  FileText, 
  MessageCircle, 
  Sparkles, 
  Award, 
  Layers, 
  TrendingUp, 
  MapPin, 
  HelpCircle, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';

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
    { id: 'inicio', name: 'Inicio', icon: Sparkles },
    { id: 'marcas', name: 'Marcas', icon: Award },
    { id: 'catalogo', name: 'Catálogo', icon: Layers },
    { id: 'beneficios', name: 'Rentabilidad', icon: TrendingUp },
    { id: 'showroom', name: 'Showroom', icon: MapPin },
    { id: 'faq', name: 'FAQ', icon: HelpCircle },
    { id: 'blog', name: 'Blog', icon: BookOpen },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="bg-foreground text-background text-[11px] sm:text-xs py-1.5 px-4 border-b border-border/40 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold text-accent">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Venta Exclusiva Mayorista con CUIT</span>
            </span>
            <span className="hidden md:inline-block text-muted-foreground">•</span>
            <span className="hidden md:inline-block font-semibold text-primary-foreground/90">
              Mínimo 1 módulo (8 o 12 pares)
            </span>
            <span className="hidden lg:inline-block text-muted-foreground">•</span>
            <span className="hidden lg:inline-block text-amber-300 font-medium">
              10% adicional por efectivo / transferencia
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-extrabold text-primary hover:text-white transition-colors bg-primary/15 hover:bg-primary px-2.5 py-0.5 rounded-full border border-primary/30"
            >
              <Lock className="w-3 h-3" />
              <span>mayoristas.skyblue.com.ar</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            <button
              onClick={() => onOpenAdvisorModal(ADVISORS[0])}
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Asesores Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Glass Pill Navigation Bar (React Bits Pro: Navigation 12) */}
      <header className="sticky top-2 sm:top-4 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
          
          {/* Main Floating Glass Pill Container */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-full transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-6 border ${
              isScrolled
                ? 'bg-card/90 backdrop-blur-xl shadow-xl shadow-black/5 border-border'
                : 'bg-card/80 backdrop-blur-lg shadow-md shadow-black/5 border-border'
            }`}
          >
            
            {/* Logo & Brand Identity */}
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
              <div className="hidden xl:flex flex-col text-left pl-2 border-l border-border">
                <span className="bg-primary/10 text-primary text-[9px] font-black uppercase px-1.5 py-0.2 rounded tracking-wider border border-primary/20 w-max">
                  Mayorista B2B
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">
                  Xti • Refresh • Petite Jolie • Giulia Domna
                </span>
              </div>
            </button>

            {/* Desktop Navigation with Animated Layout Pill Indicator (Navigation 12) */}
            <nav 
              className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-muted/60 backdrop-blur-md border border-border"
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
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 z-10 ${
                      isActive
                        ? 'text-foreground font-extrabold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {/* Layout Animated Active Background Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-card rounded-full shadow-sm border border-border -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover Indicator if not active */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="hover-nav-pill"
                        className="absolute inset-0 bg-secondary/80 rounded-full -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}

                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions & Portal CTAs */}
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
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs border border-primary/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Catálogo</span>
              </button>

              <button
                onClick={() => onOpenAdvisorModal(ADVISORS[0])}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Asesora</span>
              </button>

              {/* Mobile Menu Trigger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </motion.div>
        </div>

        {/* Expanding Mobile Glass Menu (Navigation 12 Mobile Drawer) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto mt-2 pointer-events-auto"
            >
              <div className="rounded-3xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl p-4 space-y-4">
                
                {/* Tabs Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {navTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted/60 text-foreground hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{tab.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Action Buttons */}
                <div className="pt-2 border-t border-border flex flex-col gap-2">
                  <a
                    href={COMPANY_INFO.b2bPlatformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Acceder a Plataforma Mayorista (mayoristas.skyblue.com.ar)</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenModal('alta');
                      }}
                      className="py-2.5 px-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Alta con CUIT</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdvisorModal(ADVISORS[0]);
                      }}
                      className="py-2.5 px-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
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
    </>
  );
}
