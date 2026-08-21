import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SplitText({
  text = '',
  className = '',
  topClassName = '',
  bottomClassName = '',
  maxMove = 30,
  falloff = 0.35,
  stagger = 0.02,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const getOffset = (index) => {
    if (hoverIndex === null) return 0;
    const distance = Math.abs(index - hoverIndex);
    return Math.max(0, maxMove * (1 - distance * falloff));
  };

  const letters = text.split('');

  return (
    <span className={`inline-flex items-center flex-wrap ${className}`}>
      {letters.map((char, index) => {
        const offset = getOffset(index);
        const displayChar = char === ' ' ? '\u00A0' : char;

        return (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * stagger, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-flex flex-col h-[1em] w-auto leading-none overflow-hidden cursor-default"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <motion.span
              animate={{ y: `-${offset}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`select-none ${topClassName}`}
            >
              {displayChar}
            </motion.span>
            <motion.span
              animate={{ y: `${offset}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`select-none absolute inset-0 ${bottomClassName}`}
            >
              {displayChar}
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
}
