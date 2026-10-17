import React, { useState } from 'react';
import { Sparkles, Heart, Crown, Headphones, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

export default function EntranceGate({ onEnter }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleOpen = () => {
    soundFX.harpSweep();
    setUnlocked(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#67e8f9', '#f472b6', '#fed7e2', '#ffd700']
    });

    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#030611] via-[#070e24] to-[#120a1f] text-slate-100 px-6 transition-all duration-1000 ${
        unlocked ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient glowing spheres */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      {/* Center Gift Box / Seal */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Crown & Heart Avatar */}
        <div className="relative mb-6 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-purple-500 p-1 shadow-[0_0_40px_rgba(103,232,249,0.3)] animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-400 mb-1" />
              <span className="text-xl">🩵</span>
            </div>
          </div>
        </div>

        {/* Cinematic Titles */}
        <span className="px-4 py-1.5 rounded-full glass-card text-babyCyan-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 border border-babyCyan-400/30">
          October 19 Exclusive
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-pink-200 tracking-tight leading-tight">
          To My Dearest Wifee, Kaviii
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light max-w-sm">
          "Unna maari oru ponnu kedaika naan eppovum flex pannuven dii... Welcome to our universe."
        </p>

        {/* Headphones Recommendation */}
        <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
          <Headphones className="w-3.5 h-3.5 text-babyCyan-400" />
          <span>Wear headphones & turn on volume for the soundtrack</span>
        </div>

        {/* Unlock Button */}
        <div className="mt-8">
          <button
            onClick={handleOpen}
            id="entrance-unlock-btn"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-babyCyan-500 via-pink-500 to-rose-400 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(244,114,182,0.4)] hover:shadow-[0_0_45px_rgba(103,232,249,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-180 transition-transform duration-500" />
            <span>Open My Birthday Surprise 🎁</span>
            <Heart className="w-5 h-5 text-slate-950 fill-slate-950" />
          </button>
        </div>

        <span className="mt-4 text-[11px] text-slate-500 font-serif italic">
          Designed with infinite love by Hari
        </span>
      </div>
    </div>
  );
}
