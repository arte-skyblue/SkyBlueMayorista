import React from 'react';
import { BRANDS } from '../../data/mockData';

export default function BrandMarquee() {
  const logos = [
    { name: 'XTI España', file: '/logos/Xti.svg', tag: 'María Becerra' },
    { name: 'Refresh Casual', file: '/logos/Refresh.svg', tag: 'Streetwear' },
    { name: 'Petite Jolie Brasil', file: '/logos/Petite.svg', tag: 'J-Lastic®' },
    { name: 'Giulia Domna', file: '/logos/Giulia Domna - Texto.svg', tag: 'Cuero Legítimo' },
    { name: 'SkyBlue Mayorista', file: '/logos/SkyBlue.svg', tag: 'Distribuidor B2B' },
  ];

  return (
    <div className="w-full py-6 bg-slate-950 border-y border-slate-800/80 overflow-hidden relative">
      {/* Side Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      {/* Infinite Marquee Track */}
      <div className="animate-marquee flex items-center gap-12 sm:gap-20">
        {[...logos, ...logos, ...logos].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
          >
            <img
              src={item.file}
              alt={item.name}
              className="h-7 sm:h-9 w-auto object-contain filter invert brightness-200 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
            />
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-black uppercase text-sky-300 tracking-wider">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
