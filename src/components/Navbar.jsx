import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Lock, 
  FileText, 
  Sun, 
  Moon, 
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, BRANDS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenModal, onOpenAdvisorModal, onOpenErp }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'catalogo', name: 'Catálogo' },
    { id: 'beneficios', name: 'Simular Ganancias' },
    { id: 'showroom', name: 'Showroom' },
    { id: 'faq', name: 'FAQ' },
    { id: 'blog', name: 'Blog' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandClick = (brandId) => {
    setActiveTab('marcas');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const el = document.getElementById('marcas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50 w-full transition-all duration-300">
      <nav className={`relative w-full border-b transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 ${
        isScrolled
          ? 'bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-neutral-200/90 dark:border-neutral-800 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800/80'
      }`}>
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Left: Brand Wordmark / Logo */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => handleTabClick('inicio')}
                className="flex items-center group shrink-0 focus:outline-none z-50"
                aria-label="Ir a Inicio"
              >
                <div className="h-7 sm:h-8 flex items-center">
                  <img
                    src="/logos/SKYBLUE Horizontal.svg"
                    alt="SkyBlue Calzado Mayorista"
                    className={`h-5 sm:h-6 w-auto object-contain transition-all duration-300 ${
                      isDark
                        ? 'brightness-0 invert opacity-95 group-hover:opacity-100'
                        : 'brightness-0 opacity-90 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </button>

              {/* Desktop Navigation Links (React Bits Pro Navigation 1 layout) */}
              <div className="hidden items-center gap-1 lg:flex">
                {/* Inicio Direct Link */}
                <button
                  onClick={() => handleTabClick('inicio')}
                  className={`rounded-lg px-3 py-2 text-xs font-sf-bold transition-colors ${
                    activeTab === 'inicio'
                      ? 'text-primary dark:text-white font-extrabold bg-primary/10 dark:bg-white/10'
                      : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  Inicio
                </button>

                {/* Marcas Dropdown Menu */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('marcas')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleTabClick('marcas')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-sf-bold transition-colors ${
                      activeTab === 'marcas'
                        ? 'text-primary dark:text-white font-extrabold bg-primary/10 dark:bg-white/10'
                        : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span>Marcas</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeDropdown === 'marcas' ? 'rotate-180 text-primary' : 'text-neutral-400'
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'marcas' && (
                      <>
                        <div className="absolute left-0 top-full h-2 w-full" />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-0 top-full z-50 mt-2 w-84 overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                        >
                          <div className="p-2 space-y-1">
                            <div className="px-3 py-2 text-[10px] font-sf-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-900">
                              Marcas Oficiales B2B
                            </div>

                            {BRANDS.map((b, idx) => (
                              <motion.button
                                key={b.id}
                                onClick={() => handleBrandClick(b.id)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: idx * 0.04 }}
                                className="w-full text-left flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                  <span className="text-xs">{b.id === 'xti' || b.id === 'refresh' ? '🇪🇸' : '🇧🇷'}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-sf-bold text-xs text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                                      {b.name}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-sf-medium">
                                      {b.id === 'xti' ? 'María Becerra' : b.id === 'refresh' ? 'Mar Lucas' : b.id === 'petite-jolie' ? 'J-Lastic®' : 'Cuero'}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                    {b.badge}
                                  </p>
                                </div>
                              </motion.button>
                            ))}

                            <div className="pt-1.5 border-t border-neutral-100 dark:border-neutral-900">
                              <button
                                onClick={() => handleTabClick('marcas')}
                                className="w-full py-2 px-3 rounded-lg text-xs font-sf-bold text-primary dark:text-white hover:bg-primary/10 flex items-center justify-between transition-colors"
                              >
                                <span>Ver todas las colecciones</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Remaining Direct Links */}
                {navLinks.slice(1).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`rounded-lg px-3 py-2 text-xs font-sf-bold transition-colors ${
                        isActive
                          ? 'text-primary dark:text-white font-extrabold bg-primary/10 dark:bg-white/10'
                          : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                      }`}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Actions (Theme toggle, Plataforma B2B, Ver catálogos & Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-amber-300 border border-neutral-200 dark:border-neutral-800 transition-all hover:scale-105 flex items-center justify-center shrink-0"
                title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                aria-label="Alternar modo claro y oscuro"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                </motion.div>
              </button>

              {/* Plataforma B2B CTA */}
              <a
                href={COMPANY_INFO.b2bPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-xs shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Plataforma B2B</span>
              </a>

              {/* Ver Catálogos CTA */}
              <button
                onClick={() => onOpenModal('catalogo')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 font-sf-bold text-xs transition-all whitespace-nowrap shadow-sm hover:shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Ver catálogos</span>
              </button>

              {/* Mobile Hamburger Button (React Bits Pro Navigation 1) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 lg:hidden z-50 transition-transform active:scale-95"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Fullscreen / Slide Overlay (React Bits Pro Navigation 1 overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-950 lg:hidden"
          >
            {/* Header spacer */}
            <div className="h-[65px] border-b border-neutral-200 dark:border-neutral-800" />

            <div className="mx-auto flex h-[calc(100%-65px)] max-w-[1400px] flex-col px-6 justify-between">
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-6 pb-2">
                {/* Inicio */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <button
                    onClick={() => handleTabClick('inicio')}
                    className={`text-left text-2xl font-sf-bold transition-colors ${
                      activeTab === 'inicio' ? 'text-primary' : 'text-neutral-900 dark:text-white'
                    }`}
                  >
                    Inicio
                  </button>
                </motion.div>

                {/* Marcas with Accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'marcas' ? null : 'marcas')}
                    className="flex w-full items-center justify-between text-left text-2xl font-sf-bold text-neutral-900 dark:text-white"
                  >
                    <span>Marcas</span>
                    <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${
                      mobileSubmenu === 'marcas' ? 'rotate-180 text-primary' : 'text-neutral-400'
                    }`} />
                  </button>

                  <AnimatePresence>
                    {mobileSubmenu === 'marcas' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-3 pl-2">
                          {BRANDS.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => handleBrandClick(b.id)}
                              className="w-full text-left flex items-center justify-between py-2.5 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-sm font-sf-bold text-neutral-800 dark:text-neutral-200"
                            >
                              <span>{b.name}</span>
                              <span className="text-xs text-neutral-400 font-sf-medium">
                                {b.id === 'xti' ? '🇪🇸 María Becerra' : b.id === 'refresh' ? '🇪🇸 Mar Lucas' : b.id === 'petite-jolie' ? '🇧🇷 J-Lastic' : '🇧🇷 Cuero'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Direct Links */}
                {navLinks.slice(1).map((tab, idx) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.15 + idx * 0.04 }}
                  >
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`text-left text-2xl font-sf-bold transition-colors ${
                        activeTab === tab.id ? 'text-primary' : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {tab.name}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Mobile Action Buttons */}
              <div className="flex flex-col gap-3 border-t border-neutral-200 dark:border-neutral-800 py-6">
                <a
                  href={COMPANY_INFO.b2bPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sf-bold text-sm flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <Lock className="w-4 h-4" />
                  <span>Plataforma B2B</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal('catalogo');
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-sf-bold text-sm flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ver catálogos</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
