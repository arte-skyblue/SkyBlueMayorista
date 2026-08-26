import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Sun, Moon } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenModal, onOpenAdvisorModal, onOpenErp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'marcas', name: 'Marcas' },
    { id: 'catalogo', name: 'Catálogo' },
    { id: 'beneficios', name: 'Rentabilidad' },
    { id: 'showroom', name: 'Showroom' },
    { id: 'faq', name: 'FAQ' },
    { id: 'blog', name: 'Blog' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
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
          className={`w-full rounded-full transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 border ${
            isScrolled
              ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-2xl border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
              : 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-slate-200/80 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
          }`}
        >
          
          {/* Brand Identity with SKYBLUE Horizontal Logo */}
          <button
            onClick={() => handleTabClick('inicio')}
            className="flex items-center group shrink-0 pl-1"
          >
            <div className="h-6 sm:h-7 flex items-center">
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

          {/* Clean Desktop Navigation Links Without Icons */}
          <nav 
            className="flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-neutral-900/80 backdrop-blur-md border border-slate-200/80 dark:border-neutral-800 overflow-x-auto no-scrollbar"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isHovered = hoveredTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-sf-bold transition-colors duration-200 flex items-center shrink-0 z-10 ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {/* Active Indicator with Spring Physics */}
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
                      className="absolute inset-0 bg-slate-200/80 dark:bg-neutral-800/90 rounded-full -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs: Theme Toggle, Plataforma B2B & Ver catálogos */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-neutral-700 shadow-xs transition-all hover:scale-105 flex items-center justify-center shrink-0"
              title={isDark ? 'Cambiar a Modo Claro (Light Mode)' : 'Cambiar a Modo Oscuro (Dark Mode)'}
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
                  <Sun className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-indigo-600" />
                )}
              </motion.div>
            </button>

            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Plataforma B2B</span>
            </a>

            <button
              onClick={() => onOpenModal('catalogo')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary dark:text-white font-sf-bold text-xs border border-primary/30 transition-all whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Ver catálogos</span>
            </button>
          </div>

        </motion.div>
      </div>
    </header>
  );
}

