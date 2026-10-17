import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, Star, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

const allReasons = [
  "The way your cheeks turn bright red like a sweet tomato 🍅 whenever I tease you or say 'I love you'.",
  "How you bravely proposed to me on March 24 right in the middle of your 12th board exams!",
  "Your infinite patience during the initial months when I didn't realize how precious you were.",
  "The magical look in your eyes when we look at each other, like the whole universe stops spinning.",
  "How cute you look in your Kerala Kasavu white & gold saree — an absolute traditional angel.",
  "Your sweet voice on the phone that instantly washes away all my stress after a tiring day.",
  "The way you gently rest your head on my shoulder during bus journeys.",
  "How you stand by me through every problem, never letting go of my hand.",
  "The adorable way you smile whenever you see food or your favorite snacks.",
  "Because you are my soulmate, my best friend, and my beloved wifee.",
  "How you forgive my flaws and inspire me every single day to be a better person for you.",
  "The proud feeling in my chest whenever I tell my friends or family about you.",
  "How you remember every little detail of our journey from Ponnu School C1 till today.",
  "The way you gently held that white flower — proving that nature itself learns elegance from you.",
  "How you care for me like a mother, tease me like a friend, and love me like a queen.",
  "Because no matter how big the storm is, your embrace is my safest home in this world.",
  "The laughter we share over silly inside jokes that only you and I will ever understand.",
  "How gorgeous you look when you wake up, completely natural and glowing.",
  "Because you chose me, believed in me, and fought for our love with all your pure heart.",
  "The greatest blessing of having you as my wifee and the queen of my heart and home.",
  "How you hold my fingers tightly when we walk, making me feel invincible.",
  "Your pure innocence that makes everyone around you smile and feel happy.",
  "Because living a lifetime with you will still feel too short — I need eternity with you, Kaviii."
];

export default function LoveReasonGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(1);
  const [seenSet, setSeenSet] = useState(new Set([0]));

  const getNextReason = () => {
    soundFX.chime(620);
    const nextIdx = (currentIndex + 1) % allReasons.length;
    setCurrentIndex(nextIdx);

    const nextSeen = new Set(seenSet);
    nextSeen.add(nextIdx);
    setSeenSet(nextSeen);
    setDiscoveredCount(nextSeen.size);

    if (nextSeen.size % 5 === 0) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#67e8f9', '#f472b6', '#fed7e2']
      });
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>The Love Oracle</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Infinite Reasons Why I Love You 💖
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Tap the button to discover every reason why you are my queen and why I flex you as my wifee!
        </p>
      </div>

      {/* Interactive Card */}
      <div className="glass-card-rose max-w-xl mx-auto rounded-3xl p-8 sm:p-10 border border-pink-400/40 shadow-2xl relative flex flex-col items-center justify-between min-h-[280px]">
        {/* Top Tracker */}
        <div className="flex items-center justify-between w-full border-b border-pink-300/20 pb-3 mb-6">
          <span className="text-xs font-mono text-pink-300 font-medium">
            Reason #{currentIndex + 1}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Discovered: <strong className="text-babyCyan-300">{discoveredCount}</strong> / {allReasons.length}
          </span>
        </div>

        {/* Reason Text */}
        <div className="my-auto py-4">
          <p className="font-serif text-lg sm:text-2xl text-white font-medium leading-relaxed italic transition-all duration-300">
            "{allReasons[currentIndex]}"
          </p>
        </div>

        {/* Tap Button */}
        <div className="mt-6 w-full pt-4 border-t border-pink-300/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-pink-300/80 font-serif italic">
            Forever flexing my Kavi 🩵
          </span>

          <button
            onClick={getNextReason}
            id="next-love-reason-btn"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-slate-950" />
            <span>Another Reason, Please! 💕</span>
          </button>
        </div>
      </div>
    </section>
  );
}
