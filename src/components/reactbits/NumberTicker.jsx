import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function NumberTicker({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatter,
}) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 25, stiffness: 200 });

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (ref.current) {
        if (formatter) {
          ref.current.textContent = formatter(latest);
        } else {
          const formatted = prefix + latest.toLocaleString('es-AR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
          ref.current.textContent = formatted;
        }
      }
    });
    return () => unsubscribe();
  }, [springVal, prefix, suffix, decimals, formatter]);

  return <span ref={ref} className={className} />;
}
