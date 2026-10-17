import React, { useState } from 'react';
import { Heart, Sparkles, Mail, MailOpen, Lock, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticData } from '../data/content';
import { soundFX } from '../utils/soundFX';

export default function WaxLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      soundFX.harpSweep();
      setIsOpen(true);
      // Confetti burst on breaking the wax seal
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#67e8f9', '#f472b6', '#fed7e2', '#e0e7ff'],
      });
    }
  };

  const letter = romanticData.waxLetter;

  return (
    <section id="letter" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-roseGold-400/40 text-roseGold-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5 text-pink-400" />
          <span>Strictly For Kaviii's Eyes Only</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          The Wax-Sealed Love Letter 💌
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          A sealed letter from Hari to his wifee. Tap the wax seal to open!
        </p>
      </div>

      {/* Sealed Envelope State */}
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center">
          <div
            onClick={handleOpenLetter}
            className="group cursor-pointer relative w-full max-w-lg aspect-[16/11] rounded-3xl bg-gradient-to-tr from-amber-100 via-rose-100 to-amber-50 p-6 shadow-2xl border-4 border-amber-200/80 flex flex-col justify-between items-center transition-all duration-500 hover:scale-105 hover:shadow-pink-500/20"
          >
            {/* Envelope flap lines */}
            <div className="w-full flex justify-between items-center border-b border-amber-300/60 pb-3">
              <span className="text-xs font-serif font-bold text-amber-900 tracking-widest uppercase">
                Air Mail • Priority Love
              </span>
              <span className="text-xs font-mono text-amber-800">
                Oct 19 Special Edition
              </span>
            </div>

            {/* Center Wax Seal */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-red-900 shadow-2xl border-4 border-red-500/80 flex flex-col items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-serif font-bold text-base sm:text-lg tracking-widest drop-shadow-md">
                  H 🩵 K
                </span>
                <span className="text-[10px] text-rose-200 uppercase tracking-wider font-semibold">
                  Forever
                </span>
              </div>
              <span className="mt-3 px-3 py-1 rounded-full bg-amber-900/10 text-amber-950 font-serif font-bold text-xs tracking-wider animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                Tap seal to break & read
              </span>
            </div>

            {/* Recipient Address */}
            <div className="w-full text-right pt-2 border-t border-amber-300/60 font-cursive text-xl text-amber-950 font-bold">
              To: Kaviii (My Dearest Wifee) 🩵
            </div>
          </div>
        </div>
      ) : (
        /* Unfolded Letter State */
        <div className="animate-in fade-in zoom-in-95 duration-700 w-full max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-[#fffbf2] via-[#fef7ee] to-[#fcf1e3] text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-200/90 relative overflow-hidden">
            {/* Vintage watermark stamp */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-red-700 flex items-center justify-center text-red-900 font-bold font-serif text-sm rotate-12">
                HARI & KAVI
              </div>
            </div>

            {/* Letter Header */}
            <div className="border-b border-amber-200 pb-4 mb-6 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-950">
                {letter.salutation}
              </h3>
              <span className="text-xs font-mono text-amber-800">
                March 27, 2025 → Eternity
              </span>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-4 font-serif text-slate-800 text-sm sm:text-base leading-relaxed">
              {letter.paragraphs.map((para, index) => (
                <p key={index} className="indent-4 sm:indent-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col items-end">
              <span className="font-cursive text-3xl sm:text-4xl text-pink-700 font-bold">
                {letter.signature}
              </span>
              <p className="text-xs font-serif italic text-amber-800 mt-2">
                {letter.postscript}
              </p>
            </div>

            {/* Seal Re-close Option */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-amber-800 hover:text-amber-950 hover:bg-amber-100/80 transition-colors"
              >
                Fold and seal envelope again ✉️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
