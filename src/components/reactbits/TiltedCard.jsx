import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
}) {
  const ref = useRef(null);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    rotateX.set(-yPct * maxTilt);
    rotateY.set(xPct * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
