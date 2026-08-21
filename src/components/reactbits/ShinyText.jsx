import React from 'react';

export default function ShinyText({
  text,
  disabled = false,
  speed = 3.5,
  className = '',
}) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-white to-neutral-200 bg-[200%_auto] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 45%, rgba(255,230,200,1) 50%, rgba(255,255,255,0.7) 60%)',
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}
