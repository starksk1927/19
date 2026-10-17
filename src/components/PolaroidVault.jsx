import React, { useState } from 'react';
import { Camera, Sparkles, RotateCw, Heart, Maximize2 } from 'lucide-react';
import { romanticData } from '../data/content';
import { soundFX } from '../utils/soundFX';

export default function PolaroidVault({ onOpenLightbox }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id, e) => {
    e.stopPropagation();
    soundFX.harpSweep();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const polaroids = romanticData.polaroids;

  return (
    <section id="polaroids" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5 text-babyCyan-400" />
          <span>Interactive Memory Vault</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Captured in My Heart 📸
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Tap anywhere on a Polaroid to flip and read the secret note. Tap the zoom icon for full-screen view!
        </p>
      </div>

      {/* Grid of 3D Flippable Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {polaroids.map((card, idx) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="perspective-1000 cursor-pointer select-none group"
              onClick={(e) => toggleFlip(card.id, e)}
            >
              <div
                className={`relative w-full aspect-[4/5] rounded-3xl transition-transform duration-700 transform-style-3d shadow-2xl hover:scale-[1.02] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE: Polaroid styling */}
                <div className="absolute inset-0 backface-hidden bg-slate-900/90 border border-white/15 rounded-3xl p-4 flex flex-col justify-between shadow-xl group-hover:border-babyCyan-400/50 transition-colors">
                  {/* Photo area */}
                  <div className="relative aspect-[1/1] w-full rounded-2xl overflow-hidden bg-slate-950 group/img">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Top action icons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      {/* Zoom Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFX.chime(600);
                          onOpenLightbox && onOpenLightbox(idx);
                        }}
                        className="p-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white hover:text-babyCyan-300 hover:scale-110 transition-all shadow-md"
                        title="View Fullscreen"
                        aria-label="View Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Flip badge */}
                      <div className="px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-pink-300 flex items-center gap-1 font-medium">
                        <RotateCw className="w-3 h-3 text-babyCyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                        <span>Flip</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption on front */}
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-serif text-white tracking-wide">
                        {card.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block font-mono">
                        {card.date}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 fill-pink-400/20 text-pink-400" />
                    </div>
                  </div>
                </div>

                {/* BACK FACE: Handwritten Love Note */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 text-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-2xl border-2 border-pink-300/40">
                  <div className="flex items-center justify-between border-b border-pink-200/80 pb-2">
                    <span className="text-xs font-serif font-bold text-pink-700 tracking-wider">
                      Secret Note 🩵
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {card.date}
                    </span>
                  </div>

                  {/* Handwritten script text */}
                  <div className="my-auto py-2">
                    <p className="font-cursive text-2xl text-slate-900 leading-relaxed text-center font-bold">
                      "{card.note}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-pink-200/80 pt-2 text-xs">
                    <span className="text-pink-600 font-medium">With infinite love, Hari</span>
                    <span className="text-[10px] text-slate-500 italic">Tap to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
