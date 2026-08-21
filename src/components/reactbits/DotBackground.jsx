import React from 'react';

export default function DotBackground({
  children,
  className = '',
  dotColor = 'rgba(224, 76, 50, 0.16)',
  bgColor = 'transparent',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: bgColor }}>
      {/* Precision Radial Mask for Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
