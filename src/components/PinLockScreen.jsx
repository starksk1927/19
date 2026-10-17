import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Crown, Sparkles, Delete, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

// SHA-256 hash of secret PIN "1019"
const TARGET_PIN_HASH = "61ab550f4c85a975cd46f8606ede483d8ee720a76f627773de1bc1dd8ce5fb35";

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function PinLockScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // DevTools / Right-click deterrent
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }

      // Handle direct keyboard number entry
      if (/^[0-9]$/.test(e.key) && pin.length < 4) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pin]);

  const handleDigit = async (digit) => {
    if (pin.length >= 4 || isSuccess) return;
    soundFX.chime(600 + pin.length * 80);

    const newPin = pin + digit;
    setPin(newPin);
    setIsError(false);
    setErrorMessage("");

    if (newPin.length === 4) {
      const hashed = await sha256(newPin);
      if (hashed === TARGET_PIN_HASH) {
        setIsSuccess(true);
        soundFX.harpSweep();

        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#67e8f9', '#f472b6', '#fed7e2', '#ffd700']
        });

        setTimeout(() => {
          onUnlock();
        }, 900);
      } else {
        setIsError(true);
        setErrorMessage("Incorrect Passcode • Hint: The Queen's Birthday 🎂");
        soundFX.fireworkPop();
        setTimeout(() => {
          setPin("");
          setIsError(false);
        }, 900);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      soundFX.chime(450);
      setPin(prev => prev.slice(0, -1));
      setIsError(false);
    }
  };

  const handleClear = () => {
    soundFX.chime(400);
    setPin("");
    setIsError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#02050e] via-[#060c20] to-[#0f091a] text-slate-100 px-4 select-none">
      {/* Background ambient glowing orbs */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

      {/* Lock Screen Card */}
      <div
        className={`glass-card-glow max-w-sm w-full rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col items-center relative transition-transform duration-300 ${
          isError ? 'animate-bounce border-red-400/60' : ''
        }`}
      >
        {/* Crown & Lock Icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-purple-500 p-1 shadow-[0_0_30px_rgba(103,232,249,0.35)] animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              {isSuccess ? (
                <Unlock className="w-8 h-8 text-emerald-400 animate-bounce" />
              ) : (
                <Crown className="w-8 h-8 text-yellow-400" />
              )}
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-babyCyan-300 font-medium tracking-wider uppercase mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-babyCyan-400" />
          <span>Private Vault Locked</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white text-center">
          Kaviii's Birthday Realm 🩵
        </h2>

        <p className="mt-1 text-xs text-slate-400 text-center">
          Enter 4-digit secret key to unlock
        </p>

        {/* 4 PIN Indicator Dots */}
        <div className="flex items-center justify-center gap-4 my-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = idx < pin.length;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  isFilled
                    ? isSuccess
                      ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] scale-110'
                      : isError
                      ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]'
                      : 'bg-gradient-to-tr from-cyan-400 to-pink-400 shadow-[0_0_12px_rgba(103,232,249,0.7)] scale-110'
                    : 'border-2 border-white/20 bg-white/5'
                }`}
              />
            );
          })}
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-xs text-rose-400 font-medium mb-3 text-center animate-pulse">
            {errorMessage}
          </p>
        )}

        {/* Number Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(String(num))}
              className="w-full aspect-square rounded-2xl bg-white/5 hover:bg-white/15 active:bg-cyan-500/20 active:scale-95 border border-white/10 hover:border-babyCyan-400/40 text-lg font-bold text-slate-200 transition-all flex items-center justify-center shadow-md"
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleClear}
            className="w-full aspect-square rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-semibold text-slate-400 transition-all flex items-center justify-center"
          >
            Clear
          </button>

          <button
            onClick={() => handleDigit("0")}
            className="w-full aspect-square rounded-2xl bg-white/5 hover:bg-white/15 active:bg-cyan-500/20 active:scale-95 border border-white/10 hover:border-babyCyan-400/40 text-lg font-bold text-slate-200 transition-all flex items-center justify-center shadow-md"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="w-full aspect-square rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-slate-400 hover:text-rose-400 transition-all flex items-center justify-center"
            aria-label="Delete digit"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <span className="mt-6 text-[10px] text-slate-500 font-serif italic text-center">
          Private celebration strictly for Kaviii & Hari 🩵
        </span>
      </div>
    </div>
  );
}
