import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Headphones, Sparkles, Heart, Mic, Music, Disc3, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';
import { romanticData } from '../data/content';

export default function HariSingingGift() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [reaction, setReaction] = useState(null);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const { singingGift } = romanticData;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // Pause background music so Hari's voice is crystal clear
      window.dispatchEvent(new Event('pause-bg-music'));
      try {
        if (soundFX && typeof soundFX.metallicSnap === 'function') {
          soundFX.metallicSnap();
        } else if (soundFX && typeof soundFX.chime === 'function') {
          soundFX.chime();
        }
      } catch (e) {}
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback error:", err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercent * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipSeconds = (sec) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + sec));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return "0:00";
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const triggerReaction = (type, message) => {
    setReaction(message);
    if (type === 'tears') {
      soundFX.chime();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#67e8f9', '#f472b6', '#ffffff']
      });
    } else if (type === 'best') {
      soundFX.fireworkPop();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f472b6', '#67e8f9']
      });
    } else {
      soundFX.chime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af']
      });
    }
  };

  return (
    <section id="gift-song" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src={singingGift.audioSrc} preload="metadata" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-roseGold-400/50 text-roseGold-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 animate-pulse">
          <Mic className="w-3.5 h-3.5 text-pink-400" />
          <span>{singingGift.badge}</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-cyan-200 tracking-tight leading-tight">
          {singingGift.title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
          "{singingGift.subtitle}"
        </p>
      </div>

      {/* Headphone Advisory Alert (Prominent & Heartfelt) */}
      <div className="max-w-2xl mx-auto mb-10 p-5 rounded-2xl glass-card border border-pink-400/40 shadow-xl flex items-start gap-4 relative z-10 bg-slate-900/60 backdrop-blur-md">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/25 animate-bounce" style={{ animationDuration: '3s' }}>
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
              🎧 Earphone / Headphone Potu Kelu Papa!
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            {singingGift.disclaimer}
          </p>
        </div>
      </div>

      {/* Luxurious Vinyl Player Console */}
      <div className="max-w-2xl mx-auto glass-card-rose rounded-3xl p-6 sm:p-10 border border-pink-400/40 shadow-2xl relative z-10 flex flex-col items-center">
        {/* Vinyl Disc & Center Artwork */}
        <div className="relative mb-8 group">
          {/* Outer glowing halo */}
          <div className={`absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/30 to-cyan-500/30 blur-xl transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-30'}`} />

          {/* Vinyl Record */}
          <div className={`relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border-4 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            {/* Grooves */}
            <div className="absolute inset-4 rounded-full border border-slate-800/80 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-slate-700/50 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-slate-800/80 pointer-events-none" />

            {/* Center Label (Couple Photo) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-inner">
              <img
                src="/photos/couple_proud.jpg"
                alt="Hari & Kaviii"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Spindle hole */}
            <div className="absolute w-3.5 h-3.5 rounded-full bg-slate-950 border border-amber-200 shadow-md" />
          </div>

          {/* Floating Music Equalizer Indicator */}
          {isPlaying && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-pink-400/50 shadow-lg">
              <span className="w-1 bg-pink-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
              <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-5" style={{ animationDelay: '150ms' }} />
              <span className="w-1 bg-pink-300 rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
              <span className="w-1 bg-cyan-300 rounded-full animate-bounce h-4" style={{ animationDelay: '75ms' }} />
            </div>
          )}
        </div>

        {/* Song Title & Dedication */}
        <div className="text-center mb-6">
          <span className="text-xs text-babyCyan-300 font-mono uppercase tracking-widest block mb-1">
            Voice Note Gift • Dedicated to Kaviii
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center justify-center gap-2">
            <Music className="w-5 h-5 text-pink-400" />
            <span>{singingGift.songTitle}</span>
          </h3>
          <p className="text-xs text-pink-300 font-serif italic mt-1">
            Sung with love, affection & a little cold by Hari 🩵
          </p>
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="w-full space-y-2 mb-6">
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="relative h-2.5 bg-slate-800/90 rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-pink-500 via-rose-400 to-cyan-400 rounded-full transition-all duration-100"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls (Skip, Play/Pause, Mute) */}
        <div className="flex items-center justify-center gap-5 sm:gap-8 mb-6">
          {/* Skip -10s */}
          <button
            onClick={() => skipSeconds(-10)}
            className="p-2.5 rounded-full glass-card hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Rewind 10 seconds"
          >
            <span className="text-xs font-bold font-mono">-10s</span>
          </button>

          {/* Master Play/Pause Button */}
          <button
            onClick={togglePlay}
            id="play-singing-gift-btn"
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-cyan-400 p-0.5 shadow-[0_0_30px_rgba(244,114,182,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            title={isPlaying ? "Pause Song" : "Play Hari's Singing Gift"}
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white group-hover:bg-slate-900 transition-colors">
              {isPlaying ? (
                <Pause className="w-7 h-7 text-pink-300 fill-pink-300" />
              ) : (
                <Play className="w-7 h-7 text-babyCyan-300 fill-babyCyan-300 ml-1" />
              )}
            </div>
          </button>

          {/* Skip +10s */}
          <button
            onClick={() => skipSeconds(10)}
            className="p-2.5 rounded-full glass-card hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Forward 10 seconds"
          >
            <span className="text-xs font-bold font-mono">+10s</span>
          </button>
        </div>

        {/* Volume & Mute Controls */}
        <div className="flex items-center gap-3 w-full max-w-xs justify-center text-slate-400">
          <button onClick={toggleMute} className="hover:text-white transition-colors cursor-pointer" title="Mute/Unmute">
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 sm:w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
          />
        </div>
      </div>

      {/* Why "Magale"? Deep Emotional Tribute Card */}
      <div className="max-w-2xl mx-auto mt-10 rounded-3xl glass-card p-6 sm:p-8 border border-cyan-400/30 text-left relative z-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-babyCyan-300">
            <Heart className="w-5 h-5 fill-cyan-400" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              {singingGift.dedicationTitle}
            </h4>
            <span className="text-xs text-babyCyan-300">
              The Purest Meaning of Love
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-pink-200 font-serif italic leading-relaxed mb-3">
          "{singingGift.dedicationTanglish}"
        </p>

        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
          "{singingGift.dedicationEnglish}"
        </p>
      </div>

      {/* Interactive Reaction Buttons: "Did you like my singing? 🥺" */}
      <div className="max-w-2xl mx-auto mt-10 text-center relative z-10">
        <span className="text-xs text-slate-400 uppercase tracking-widest font-mono block mb-3">
          Tell Hari how his singing felt:
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => triggerReaction('tears', "Tears of joy! Kaviii loved her husband's voice so deeply 😭🩵")}
            className="px-4 py-2 rounded-full glass-card hover:glass-card-rose text-xs font-semibold text-pink-200 border border-pink-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>😭</span>
            <span>I Loved It So Much!</span>
          </button>

          <button
            onClick={() => triggerReaction('best', "Kaviii declared this as the Best Birthday Gift Ever! 🎁🩵")}
            className="px-4 py-2 rounded-full glass-card hover:glass-card-glow text-xs font-semibold text-cyan-200 border border-cyan-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🎁</span>
            <span>Best Birthday Gift Ever!</span>
          </button>

          <button
            onClick={() => triggerReaction('singer', "Kaviii's favorite singer in the whole universe is Hari! 🎙️✨")}
            className="px-4 py-2 rounded-full glass-card hover:bg-white/15 text-xs font-semibold text-white border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🎙️</span>
            <span>Play It On Repeat!</span>
          </button>
        </div>

        {/* Reaction feedback toast */}
        {reaction && (
          <div className="mt-4 inline-block px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/50 text-xs sm:text-sm text-pink-200 animate-in fade-in zoom-in-95 duration-300">
            {reaction}
          </div>
        )}
      </div>
    </section>
  );
}
