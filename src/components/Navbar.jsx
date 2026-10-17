import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles, Gift, Camera, BookHeart, Cake, Lock } from 'lucide-react';

export default function Navbar({ onLock }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Childhood 💋", href: "#childhood", icon: Heart },
    { label: "Our Story", href: "#story", icon: BookHeart },
    { label: "Polaroids", href: "#polaroids", icon: Camera },
    { label: "Tomato Thakali 🍅", href: "#thakali", icon: Sparkles },
    { label: "Love Letter", href: "#letter", icon: Heart },
    { label: "Hari's Song 🎙️", href: "#gift-song", icon: Sparkles },
    { label: "Birthday Cake", href: "#cake", icon: Cake },
    { label: "Couple Quiz", href: "#quiz", icon: Gift },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-40 px-3 sm:px-6 max-w-6xl mx-auto">
      <nav className="glass-card rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/10 shadow-xl backdrop-blur-xl">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer"
          id="nav-brand"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform">
            🩵
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-serif font-bold tracking-wide text-slate-100 flex items-center gap-1.5">
              Hari & Kaviii
            </span>
            <span className="text-[10px] text-babyCyan-300 font-medium tracking-wider uppercase">
              To My Dearest Wifee
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <item.icon className="w-3.5 h-3.5 text-babyCyan-400" />
              {item.label}
            </a>
          ))}
        </div>

        {/* Birthday Badge & Lock Vault Button */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="#cake"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-pink-200 hover:scale-105 transition-transform flex items-center gap-1"
          >
            <span>Oct 19</span>
            <Sparkles className="w-3 h-3 text-pink-300 animate-spin" style={{ animationDuration: '6s' }} />
          </a>

          {onLock && (
            <button
              onClick={onLock}
              title="Lock Private Vault"
              id="nav-lock-btn"
              className="p-1.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors border border-white/10"
              aria-label="Lock Vault"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          id="nav-mobile-toggle"
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 glass-card-glow rounded-2xl p-4 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 flex items-center gap-2.5 transition-colors"
              >
                <item.icon className="w-4 h-4 text-babyCyan-400" />
                {item.label}
              </a>
            ))}
            <a
              href="#cake"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-babyCyan-500 to-pink-500 text-slate-950 font-bold"
            >
              🎂 October 19 Celebration
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
