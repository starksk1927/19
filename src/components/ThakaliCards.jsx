import React, { useState } from 'react';
import { Sparkles, Heart, Crown, Shield, Flame } from 'lucide-react';
import { romanticData } from '../data/content';

export default function ThakaliCards() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section id="thakali" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-red-400/40 text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>🍅 My Favorite Nickname</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Why You Are My Tomato Thakali & Dearest Wifee 🍅🩵
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          "Unna maari oru ponnu enaku kedaichadhuku naan eppovum garvama flex pannuven dii!"
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {romanticData.thakaliReasons.map((reason, index) => (
          <div
            key={reason.title}
            onClick={() => setSelectedCard(selectedCard === index ? null : index)}
            className="cursor-pointer glass-card hover:glass-card-rose rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] border border-white/10 relative overflow-hidden group shadow-lg"
          >
            {/* Soft background glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-colors" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                {reason.emoji}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                Reason #{index + 1}
              </span>
            </div>

            <h3 className="text-lg font-bold font-serif text-white group-hover:text-pink-300 transition-colors mb-2">
              {reason.title}
            </h3>

            {/* Tanglish narrative */}
            <p className="text-sm text-pink-200/90 font-medium leading-relaxed mb-3">
              "{reason.tanglish}"
            </p>

            {/* English translation */}
            <p className="text-xs text-slate-400 leading-relaxed italic border-t border-white/10 pt-3">
              {reason.english}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
