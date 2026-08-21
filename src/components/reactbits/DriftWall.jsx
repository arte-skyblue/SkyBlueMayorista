import React from 'react';
import { Play } from 'lucide-react';

export default function DriftWall({ items = [], onItemClick }) {
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="relative w-full overflow-hidden py-4 space-y-6 [perspective:1200px]">
      {/* Gradient Mask Overlays for Smooth Fade Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-20" />

      {/* Row 1: Slow & Smooth Drift to the left WITHOUT hover pause */}
      <div className="flex w-max animate-drift-left-slow gap-4 sm:gap-6 will-change-transform">
        {duplicatedRow1.map((item, idx) => {
          const videoSrc = item.videoUrl || item.url;
          return (
            <div
              key={`r1-${idx}`}
              onClick={() => onItemClick && onItemClick(item)}
              className="w-[170px] sm:w-[220px] 2xl:w-[250px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shrink-0 relative group cursor-pointer shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:z-30 hover:border-primary/50"
            >
              <video
                src={videoSrc}
                muted
                loop
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/20" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[9px] font-sf-bold uppercase px-2 py-0.5 rounded-full bg-neutral-950/80 text-primary border border-primary/30 w-max block mb-1">
                  {item.brand || 'Oficial'}
                </span>
                <p className="text-xs font-sf-bold text-white line-clamp-1">
                  {item.title || 'Video B2B'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Slow & Smooth Drift to the right WITHOUT hover pause */}
      <div className="flex w-max animate-drift-right-slow gap-4 sm:gap-6 will-change-transform">
        {duplicatedRow2.map((item, idx) => {
          const videoSrc = item.videoUrl || item.url;
          return (
            <div
              key={`r2-${idx}`}
              onClick={() => onItemClick && onItemClick(item)}
              className="w-[170px] sm:w-[220px] 2xl:w-[250px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shrink-0 relative group cursor-pointer shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:z-30 hover:border-primary/50"
            >
              <video
                src={videoSrc}
                muted
                loop
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/20" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[9px] font-sf-bold uppercase px-2 py-0.5 rounded-full bg-neutral-950/80 text-primary border border-primary/30 w-max block mb-1">
                  {item.brand || 'Oficial'}
                </span>
                <p className="text-xs font-sf-bold text-white line-clamp-1">
                  {item.title || 'Video B2B'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
