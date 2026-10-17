import React from 'react';
import { BookHeart, Sparkles, Heart, Calendar, Bus, MessageCircle, Gift, ShieldCheck } from 'lucide-react';
import { romanticData } from '../data/content';

const iconMap = {
  "school-bus": Bus,
  "insta-dm": MessageCircle,
  "the-proposal": Heart,
  "the-acceptance": Gift,
  "the-storms": ShieldCheck,
  "my-wife": Sparkles,
  "future-wife": Sparkles,
};

export default function TimelineStory() {
  return (
    <section id="story" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-babyCyan-400/30 text-babyCyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookHeart className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Love Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          From Ponnu School C1 to Forever 🩵
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Eppadi start aachu theriyuma? From the silent school bus to the deepest bond that will last a lifetime.
        </p>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative">
        {/* Center glowing line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/50 via-pink-500/50 to-cyan-500/50" />
        
        {/* Left glowing line for mobile */}
        <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/50 via-pink-500/50 to-cyan-500/50" />

        <div className="space-y-12 sm:space-y-16">
          {romanticData.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = iconMap[item.id] || Sparkles;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Milestone Node Icon */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-card-glow border border-babyCyan-400/60 flex items-center justify-center text-babyCyan-300 shadow-lg z-10 bg-slate-900">
                  <Icon className="w-5 h-5 text-babyCyan-400" />
                </div>

                {/* Milestone Card Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 px-0 md:px-8 w-full">
                  <div className="glass-card hover:border-babyCyan-400/40 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] group">
                    {/* Badge & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-pink-500/20 to-cyan-500/20 text-pink-300 border border-pink-400/30">
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-babyCyan-400" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white group-hover:text-babyCyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-400 block mt-0.5 mb-3">
                      {item.era}
                    </span>

                    {/* Milestone Photo */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-inner bg-slate-950">
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    </div>

                    {/* Narrative in Tanglish */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer for symmetrical alternate view on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
