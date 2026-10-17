import React, { useState } from 'react';
import { Sparkles, Heart, Crown, Camera, Smile, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';
import { romanticData } from '../data/content';

export default function ChildhoodMemories({ onOpenImage }) {
  const [kissCount, setKissCount] = useState(1019);
  const [photoKisses, setPhotoKisses] = useState({ plaits: 0, mallipoo: 0 });
  const [activePhoto, setActivePhoto] = useState(null);

  const { childhood } = romanticData;

  const triggerKissShower = () => {
    soundFX.chime();
    setKissCount(prev => prev + 1);

    // Canvas confetti burst with pink, cyan and golden sparkles
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#67e8f9', '#fbcfe8', '#ffd1dc']
    });
  };

  const handlePhotoKiss = (id, e) => {
    e.stopPropagation();
    try {
      soundFX?.chime?.();
    } catch (err) {}
    setPhotoKisses(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#fda4af', '#f43f5e']
    });
  };

  return (
    <section id="childhood" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 animate-pulse">
          <span className="text-base">💋</span>
          <span>{childhood.tag}</span>
          <span className="text-base">🧸</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-cyan-200 tracking-tight leading-tight">
          {childhood.title}
        </h2>

        <p className="mt-4 text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
          "{childhood.subtitle}"
        </p>

        {/* Global Kiss Counter Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={triggerKissShower}
            id="childhood-kiss-btn"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-bold text-sm shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-lg group-hover:scale-125 transition-transform">💋</span>
            <span>Send Kisses to Little Kavi ({kissCount})</span>
            <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          </button>
          <span className="text-xs text-pink-300/80 italic">
            Tap to send sweet kisses to her childhood self! 🩵
          </span>
        </div>
      </div>

      {/* Childhood Photo Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-10">
        {childhood.photos.map((item, index) => {
          const kisses = photoKisses[item.id] || 0;

          return (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative glass-card-rose rounded-3xl p-5 sm:p-7 border border-pink-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] flex flex-col justify-between cursor-pointer"
            >
              {/* Top Card Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-semibold tracking-wide flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-yellow-300" />
                  {item.era}
                </span>

                <span className="text-xs font-mono text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-400/30">
                  <Camera className="w-3 h-3 text-cyan-400" />
                  Rare Memory #{index + 1}
                </span>
              </div>

              {/* Photo Frame with Vintage Rose Gold Border */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20 shadow-2xl group-hover:border-pink-300/60 transition-colors">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Kiss Badges Stamp */}
                {kisses > 0 && (
                  <div className="absolute top-4 right-4 bg-pink-600/90 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-pink-300/50 flex items-center gap-1 animate-bounce">
                    <span>💋</span>
                    <span>+{kisses} Kisses</span>
                  </div>
                )}

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-xs text-babyCyan-300 font-semibold tracking-wider uppercase block">
                    Kaviii's Childhood
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Caption & Emotional Story */}
              <div className="mt-5 space-y-2 text-left">
                <p className="text-sm sm:text-base text-pink-200 font-serif italic leading-relaxed">
                  "{item.caption}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {item.english}
                </p>
              </div>

              {/* Action Bar (Kiss stamp + Click to zoom) */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => handlePhotoKiss(item.id, e)}
                  title="Kiss this memory"
                  className="px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 border border-pink-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>💋</span>
                  <span>Give a Kiss ({kisses})</span>
                </button>

                <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-babyCyan-300 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  Tap to view full
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Forever Wifee Quote Banner */}
      <div className="mt-14 max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-8 text-center border border-pink-400/30 relative z-10 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-md">
          <Heart className="w-6 h-6 text-white fill-white" />
        </div>
        <p className="text-base sm:text-xl font-serif italic text-white leading-relaxed">
          "{childhood.quote}"
        </p>
        <span className="mt-3 block text-xs sm:text-sm text-babyCyan-300 font-medium">
          Always & Forever Yours, Hari 🩵
        </span>
      </div>

      {/* Fullscreen Photo Modal Preview */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full glass-card-rose rounded-3xl p-5 border border-pink-400/40 shadow-2xl flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Image Frame */}
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-white/20 mb-4 shadow-xl">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Modal Content */}
            <div className="w-full text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                  {activePhoto.era}
                </span>
                <span className="text-xs text-babyCyan-300 font-mono">
                  October 19 Special
                </span>
              </div>

              <h4 className="text-xl font-serif font-bold text-white">
                {activePhoto.title}
              </h4>
              <p className="text-sm font-serif italic text-pink-200">
                "{activePhoto.caption}"
              </p>
              <p className="text-xs text-slate-300 font-light">
                {activePhoto.english}
              </p>
            </div>

            {/* Modal Kiss Button */}
            <div className="mt-5 w-full flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={(e) => handlePhotoKiss(activePhoto.id, e)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>💋</span>
                <span>Send Kiss ({photoKisses[activePhoto.id] || 0})</span>
              </button>

              <button
                onClick={() => setActivePhoto(null)}
                className="px-4 py-2 rounded-full glass-card hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
