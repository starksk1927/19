import React, { useState } from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticData } from '../data/content';

export default function Footer() {
  const [loveCount, setLoveCount] = useState(1019);

  const handleSendLove = () => {
    setLoveCount(prev => prev + 1);
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.9 },
      colors: ['#67e8f9', '#f472b6', '#fed7e2']
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/10 text-center">
      {/* Proud Couple Photo Showcase */}
      <div className="max-w-xs mx-auto mb-8 relative group">
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-card-glow p-2 transition-transform duration-500 group-hover:scale-105 shadow-2xl">
          <img
            src="/photos/couple_proud.jpg"
            alt="Hari and Kaviii"
            className="w-full h-full object-cover object-center rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-center">
            <span className="text-xs text-babyCyan-300 font-serif font-bold">Forever Proud of You 🩵</span>
            <span className="text-[11px] text-pink-300">My Dearest Wifee</span>
          </div>
        </div>
      </div>

      {/* Closing Words */}
      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
        Thank You For Everything, Kaviii 🩵
      </h3>
      <p className="text-sm sm:text-base text-pink-300 font-serif italic max-w-xl mx-auto mb-6">
        "Enoda life la vanthadhuku romba thanks da. Unna maari oru ponnu kedaika naan eppovum flex pannipan dii!"
      </p>

      {/* Interactive Love Button */}
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <button
          onClick={handleSendLove}
          id="footer-love-btn"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:scale-110 active:scale-95 transition-transform flex items-center gap-2"
        >
          <Heart className="w-5 h-5 fill-white" />
          <span>Tap to Send Love ({loveCount})</span>
        </button>
        <span className="text-[11px] text-slate-400 italic">
          Every tap sends a whisper of love to the stars for Kaviii
        </span>
      </div>

      {/* Back to top & Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>Crafted with infinite love by Hari for Kaviii</span>
          <span>🩵</span>
        </div>
        <button
          onClick={scrollToTop}
          className="hover:text-slate-300 flex items-center gap-1 transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
