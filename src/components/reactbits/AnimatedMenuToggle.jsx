import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedMenuToggle({ isOpen, toggle, className = '' }) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      className={`relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 ${className}`}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {/* Top Line */}
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 7.5, backgroundColor: '#EF4444' }
            : { rotate: 0, y: 0, backgroundColor: '#FFFFFF' }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-5 h-0.5 rounded-full block origin-center"
      />

      {/* Middle Line */}
      <motion.span
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1, backgroundColor: '#FFFFFF' }
        }
        transition={{ duration: 0.2 }}
        className="w-5 h-0.5 rounded-full block origin-center"
      />

      {/* Bottom Line */}
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -7.5, backgroundColor: '#EF4444' }
            : { rotate: 0, y: 0, backgroundColor: '#FFFFFF' }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-5 h-0.5 rounded-full block origin-center"
      />
    </motion.button>
  );
}
