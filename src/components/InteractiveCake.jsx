import React, { useState } from 'react';
import { Sparkles, Cake as CakeIcon, Flame, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

export default function InteractiveCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const triggerFireworks = () => {
    soundFX.fireworkPop();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#67e8f9', '#f472b6', '#ffffff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#22d3ee', '#f43f5e', '#fed7e2']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleBlowCandles = () => {
    if (candlesLit) {
      setCandlesLit(false);
      setWishMade(true);
      triggerFireworks();
    }
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="cake" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <CakeIcon className="w-3.5 h-3.5 text-yellow-400" />
          <span>October 19 Virtual Celebration</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Make a Birthday Wish, Kavi 🎂✨
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Close your eyes, make the deepest wish in your heart, and blow out the candles!
        </p>
      </div>

      {/* The 3D CSS Birthday Cake Container */}
      <div className="glass-card-glow rounded-3xl p-8 sm:p-12 max-w-lg mx-auto border border-pink-400/30 relative shadow-2xl flex flex-col items-center">
        {/* Cake Structure */}
        <div className="relative flex flex-col items-center pt-8 pb-4">
          {/* Candles row */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-1">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {/* Flame */}
                {candlesLit ? (
                  <div className="flame-animation w-4 h-6 rounded-full bg-gradient-to-t from-yellow-500 via-amber-300 to-white shadow-[0_0_15px_rgba(251,191,36,0.9)] cursor-pointer" />
                ) : (
                  <div className="w-1.5 h-4 bg-slate-500/40 rounded-full animate-pulse" />
                )}
                {/* Wick */}
                <div className="w-0.5 h-2 bg-slate-700" />
                {/* Candle Stick */}
                <div className="w-3.5 h-10 rounded-sm bg-gradient-to-b from-pink-300 via-cyan-200 to-pink-400 border border-white/40 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Layer */}
          <div className="w-40 sm:w-48 h-14 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 shadow-md border-2 border-white/60 flex items-center justify-around px-2 relative z-10">
            <span className="text-sm">🍓</span>
            <span className="text-xs font-serif font-bold text-pink-900 tracking-wider">KAVIII</span>
            <span className="text-sm">🍓</span>
          </div>

          {/* Frosting dripping detail */}
          <div className="w-36 h-2 bg-white/80 rounded-full -mt-1 z-20 shadow-sm" />

          {/* Bottom Layer */}
          <div className="w-56 sm:w-64 h-20 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 shadow-xl border-2 border-white/60 flex items-center justify-center relative -mt-1">
            <span className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-widest drop-shadow-sm">
              HAPPY BIRTHDAY 🩵
            </span>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-64 sm:w-72 h-4 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-300 shadow-2xl mt-1 border border-slate-400" />
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              id="blow-candles-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Wind className="w-5 h-5" />
              <span>Tap to Blow the Candles 💨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-6 py-2.5 rounded-full glass-card hover:bg-white/10 text-pink-300 font-semibold text-xs sm:text-sm border border-pink-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>

        {/* Wish Revealed Card */}
        {wishMade && (
          <div className="mt-8 w-full p-6 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/50 animate-in fade-in zoom-in-95 duration-500 text-center">
            <h4 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Wish Sent to The Heavens! 🩵</span>
            </h4>
            <p className="mt-2 text-sm text-pink-200 leading-relaxed font-light">
              "Kaviii, un manasula irukura ellā aasaigalaiyum, kanavugalaiyum niraivethuradhuku Hari eppovum un koodave irupan dii. Happy Birthday my angel & my wifee!"
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
