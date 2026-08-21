import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.45,
}) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 12,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-1.5 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
