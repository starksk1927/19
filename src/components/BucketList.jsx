import React, { useState } from 'react';
import { Compass, CheckCircle2, Circle, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticData } from '../data/content';

export default function BucketList() {
  const [items, setItems] = useState(romanticData.bucketList);

  const toggleItem = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);

    if (updated[index].done) {
      confetti({
        particleCount: 30,
        spread: 35,
        origin: { y: 0.7 },
        colors: ['#67e8f9', '#f472b6']
      });
    }
  };

  const completedCount = items.filter(i => i.done).length;

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Sacred Dreams</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Things We Will Do Together 🗺️💍
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Our shared bucket list as husband and wife. Tap any dream to mark our sacred promise!
        </p>
      </div>

      {/* Checklist Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <span className="text-sm font-medium text-slate-300">
            Promises Checked: <strong className="text-babyCyan-300">{completedCount}</strong> of {items.length}
          </span>
          <span className="text-xs font-serif text-pink-300 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>Lifetime of Adventures</span>
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.text}
              onClick={() => toggleItem(idx)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between select-none ${
                item.done
                  ? 'bg-gradient-to-r from-cyan-950/40 to-pink-950/40 border-babyCyan-400/50 text-white'
                  : 'glass-card hover:border-white/20 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-babyCyan-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span className={`text-sm sm:text-base ${item.done ? 'line-through text-slate-400 font-medium' : ''}`}>
                  {item.text}
                </span>
              </div>
              {item.done && (
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
