import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, ArrowDown, Crown } from 'lucide-react';
import { romanticData } from '../data/content';

export default function HeroCountdown() {
  const [nicknameIndex, setNicknameIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: false });

  // Rotate nicknames every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNicknameIndex((prev) => (prev + 1) % romanticData.names.nicknames.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Calculate live countdown to October 19
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let targetDate = new Date(`${targetYear}-10-19T00:00:00`);

      if (now.getTime() > targetDate.getTime() + 86400000) {
        // If Oct 19 passed this year, count to next year
        targetYear += 1;
        targetDate = new Date(`${targetYear}-10-19T00:00:00`);
      }

      const diff = targetDate.getTime() - now.getTime();

      // If today is Oct 19
      const isTodayOct19 = now.getMonth() === 9 && now.getDate() === 19;

      if (diff <= 0 || isTodayOct19) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-cyan-500/15 via-pink-500/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Royal / Crown Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-babyCyan-400/30 text-babyCyan-300 text-xs sm:text-sm font-medium mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
        <Crown className="w-4 h-4 text-yellow-400" />
        <span>Happy Birthday To My Dearest Wifee 🩵</span>
      </div>

      {/* Hero Headings */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-pink-200 tracking-tight leading-tight max-w-4xl">
        Kaviii, My Forever Home
      </h1>

      {/* Dynamic Nickname Pill */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-slate-400 text-sm sm:text-base">For my dearest</span>
        <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-400/40 text-pink-300 font-bold text-sm sm:text-lg tracking-wide shadow-sm min-w-[140px] text-center transition-all duration-300">
          {romanticData.names.nicknames[nicknameIndex]}
        </span>
      </div>

      {/* Emotional Tanglish & English Subquote */}
      <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
        "{romanticData.hero.quote}"
      </p>
      <p className="mt-1 text-xs sm:text-sm text-pink-300 font-serif italic">
        "{romanticData.hero.subquote}"
      </p>

      {/* Featured Couple & Queen Portraits */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full">
        {/* Cinema Gaze Card */}
        <div className="group relative rounded-2xl overflow-hidden glass-card-glow p-2 transition-all duration-500 hover:scale-[1.02]">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <img
              src="/photos/hero_gaze.jpg"
              alt="Hari and Kaviii"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-xs text-babyCyan-300 font-medium">Soulmate Gaze 🩵</span>
              <p className="text-sm font-semibold text-white">Kannodu Kaan Paarkum Pozhuthu...</p>
            </div>
          </div>
        </div>

        {/* The Queen in Saree */}
        <div className="group relative rounded-2xl overflow-hidden glass-card-rose p-2 transition-all duration-500 hover:scale-[1.02]">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <img
              src="/photos/hero_queen.jpg"
              alt="Kaviii Birthday Queen"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-xs text-pink-300 font-medium">The Birthday Queen 👑</span>
              <p className="text-sm font-semibold text-white">My Gorgeous Wifee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Timer to October 19 */}
      <div className="mt-10 max-w-xl w-full glass-card-glow rounded-3xl p-5 sm:p-6 border border-cyan-400/30">
        <div className="flex items-center justify-center gap-2 mb-4 text-babyCyan-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-babyCyan-400" />
          <span>October 19 Birthday Countdown</span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>

        {timeLeft.isBirthday ? (
          <div className="py-4 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-pink-300 animate-pulse">
              🎉 Happy Birthday My Queen, Kaviii! 🎂🩵
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Today is your special day! May all your dreams come true!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.minutes, label: "Mins" },
              { val: timeLeft.seconds, label: "Secs" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-slate-950/60 rounded-2xl p-2.5 sm:p-4 border border-white/5 flex flex-col items-center justify-center shadow-inner"
              >
                <span className="text-2xl sm:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-slate-400 italic">
          "Waiting eagerly to celebrate your day with endless love & cuddles."
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#story"
          id="hero-story-btn"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-babyCyan-500 to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Explore Our Story</span>
          <ArrowDown className="w-4 h-4" />
        </a>
        <a
          href="#letter"
          id="hero-letter-btn"
          className="px-6 py-3 rounded-full glass-card hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/20 hover:border-pink-400/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30" />
          <span>Read My Letter</span>
        </a>
      </div>
    </section>
  );
}
