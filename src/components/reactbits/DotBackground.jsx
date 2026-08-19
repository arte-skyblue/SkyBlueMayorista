import React from 'react';

export default function DotBackground({
  children,
  className = '',
  dotColor = 'rgba(14, 165, 233, 0.15)', // sky-500 tint
  bgColor = 'transparent',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: bgColor }}>
      {/* Background Dot Pattern with Radial Fade */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {children}
    </div>
  );
}
