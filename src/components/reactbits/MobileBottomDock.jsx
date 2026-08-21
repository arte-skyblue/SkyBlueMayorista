import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Award, 
  Layers, 
  MapPin, 
  MessageCircle,
  FileText,
  Lock
} from 'lucide-react';
import { ADVISORS, COMPANY_INFO } from '../../data/mockData';

export default function MobileBottomDock({ activeTab, setActiveTab, onOpenModal, onOpenAdvisorModal }) {
  const navItems = [
    { id: 'inicio', name: 'Inicio', icon: Sparkles },
    { id: 'marcas', name: 'Marcas', icon: Award },
    { id: 'catalogo', name: 'Catálogo', icon: Layers },
    { id: 'showroom', name: 'Showroom', icon: MapPin },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none md:hidden pb-[env(safe-area-inset-bottom)]">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center justify-between gap-1 p-1.5 rounded-full bg-neutral-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 max-w-sm w-full"
      >
        {/* Navigation Tabs */}
        <div className="flex items-center gap-0.5 flex-1 justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                whileTap={{ scale: 0.88 }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-full transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label={item.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-dock-active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-neutral-400'}`} />
                <span className="text-[9px] font-sf-medium tracking-tight mt-0.5">
                  {item.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* WhatsApp Fast Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onOpenAdvisorModal ? onOpenAdvisorModal(ADVISORS[0]) : window.open('https://wa.me/5491138916779', '_blank')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-[10px] shadow-lg shadow-emerald-600/30 shrink-0 ml-1"
          aria-label="WhatsApp Asesores"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Asesores</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
