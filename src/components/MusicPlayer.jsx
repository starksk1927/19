import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';

export default function MusicPlayer({ autoStart }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [songName, setSongName] = useState("Kavi & Hari's Romantic Melody 🩵");
  const audioRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (autoStart && !isPlaying) {
      togglePlay();
    }
  }, [autoStart]);

  useEffect(() => {
    const handlePause = () => {
      stopRomanticSynth();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    };
    window.addEventListener('pause-bg-music', handlePause);
    return () => window.removeEventListener('pause-bg-music', handlePause);
  }, []);

  // Fallback romantic harmonic synthesizer using Web Audio API
  const startRomanticSynth = () => {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Pentatonic romantic notes in Hz: C4, D4, E4, G4, A4, C5, D5, E5
    const chordNotes = [
      [261.63, 329.63, 392.00], // C Maj
      [220.00, 261.63, 329.63], // A Min
      [174.61, 220.00, 261.63], // F Maj
      [196.00, 246.94, 293.66], // G Maj
    ];
    let chordIndex = 0;

    const playChord = () => {
      if (!ctx || ctx.state !== 'running') return;
      const notes = chordNotes[chordIndex % chordNotes.length];
      chordIndex++;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4);
      });
    };

    playChord();
    synthIntervalRef.current = setInterval(playChord, 3800);
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      // Try audio element first if mp3 exists
      if (audioRef.current && audioRef.current.src && !audioRef.current.error) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // fallback to synth
            startRomanticSynth();
            setIsPlaying(true);
          });
      } else {
        startRomanticSynth();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopRomanticSynth();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (audioCtxRef.current) {
      if (!isMuted) {
        audioCtxRef.current.suspend();
      } else {
        audioCtxRef.current.resume();
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      {/* Hidden native audio tag if user places music file in /public/music/song.mp3 */}
      <audio
        ref={audioRef}
        src="/music/song.mp3"
        loop
        preload="auto"
        onError={() => console.log("Note: local /music/song.mp3 not detected, running ambient romantic melody")}
      />

      <div className="glass-card-glow rounded-full p-2.5 px-4 flex items-center gap-3 shadow-2xl transition-all duration-300 hover:border-babyCyan-400">
        {/* Spinning Vinyl Record */}
        <div
          onClick={togglePlay}
          className={`relative cursor-pointer transition-transform duration-500 ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '4s' }}
          title={isPlaying ? "Pause music" : "Play romantic soundtrack"}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border-2 border-babyCyan-400/50 flex items-center justify-center shadow-lg">
            <Disc className="w-5 h-5 text-babyCyan-400" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-roseGold-400 border border-slate-900" />
          </div>
        </div>

        {/* Track info & Soundwave */}
        <div className="hidden sm:flex flex-col cursor-pointer" onClick={togglePlay}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-babyCyan-300">
              {isPlaying ? "Now Playing" : "Tap to Play"}
            </span>
            <Sparkles className="w-3 h-3 text-roseGold-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-300 max-w-[140px] truncate font-medium">
            {songName}
          </p>
        </div>

        {/* Dynamic soundwave bars */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-5 px-1">
            <div className="w-1 bg-babyCyan-400 rounded-full soundwave-bar" />
            <div className="w-1 bg-roseGold-400 rounded-full soundwave-bar" />
            <div className="w-1 bg-babyCyan-300 rounded-full soundwave-bar" />
            <div className="w-1 bg-pink-400 rounded-full soundwave-bar" />
            <div className="w-1 bg-cyan-200 rounded-full soundwave-bar" />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={togglePlay}
          id="music-play-btn"
          className="p-2 rounded-full bg-gradient-to-r from-babyCyan-500 to-pink-500 text-slate-950 font-bold hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-white" />
          ) : (
            <Music className="w-4 h-4 text-white" />
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
