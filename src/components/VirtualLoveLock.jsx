import React, { useState } from 'react';
import { Lock, Unlock, Key, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

export default function VirtualLoveLock() {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (!isLocked) {
      soundFX.lockClick();
      setIsLocked(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#f59e0b', '#67e8f9', '#f472b6']
      });
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Key className="w-3.5 h-3.5 text-yellow-400" />
          <span>Eternal Vow Lock</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Our Eternal Love Lock 🔐💍
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          In ancient tradition, lovers lock their names together and throw the key into the sea so nothing on earth can separate them.
        </p>
      </div>

      {/* 3D Padlock Interface */}
      <div className="glass-card-glow max-w-md mx-auto rounded-3xl p-8 sm:p-10 border border-amber-400/40 shadow-2xl relative flex flex-col items-center">
        {/* Shackle */}
        <div className="relative flex justify-center -mb-2 z-0">
          <div
            className={`w-28 h-28 rounded-t-full border-8 border-amber-300 transition-all duration-700 ${
              isLocked
                ? 'translate-y-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                : '-translate-y-4 -rotate-12 border-amber-200'
            }`}
          />
        </div>

        {/* Lock Body */}
        <div className="relative z-10 w-52 h-44 rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 p-4 shadow-2xl border-2 border-amber-200 flex flex-col items-center justify-between text-slate-950">
          {/* Engraving */}
          <div className="text-center w-full pt-2">
            <span className="text-[10px] tracking-widest font-mono uppercase font-bold text-amber-950/70 block">
              Official Love Covenant
            </span>
            <h4 className="font-serif font-bold text-lg text-amber-950 drop-shadow-sm mt-0.5">
              Hari 🩵 Kaviii
            </h4>
            <span className="text-[11px] font-mono font-semibold text-amber-900">
              March 27, 2025 → ∞
            </span>
          </div>

          {/* Keyhole */}
          <div className="flex flex-col items-center">
            {isLocked ? (
              <div className="w-8 h-8 rounded-full bg-amber-950 flex items-center justify-center shadow-inner">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              </div>
            ) : (
              <div className="w-4 h-7 bg-amber-950 rounded-full shadow-inner" />
            )}
          </div>

          {/* Bottom status */}
          <div className="pb-1 text-[10px] font-serif font-bold uppercase tracking-wider text-amber-950">
            {isLocked ? "SEALED FOR ETERNITY" : "AWAITING LOCK"}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {!isLocked ? (
            <button
              onClick={handleLock}
              id="turn-key-lock-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Key className="w-5 h-5" />
              <span>Turn Key & Lock Forever 🔐</span>
            </button>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>The Key has been thrown into the stars! 🌌</span>
              </div>
              <p className="text-xs sm:text-sm text-pink-200 font-light max-w-xs leading-relaxed italic">
                "Our bond is permanently locked. No storm, no distance, no time can ever break what we share. I love you, my wifee."
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
