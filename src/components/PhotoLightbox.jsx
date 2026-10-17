import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';
import { soundFX } from '../utils/soundFX';

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }) {
  if (currentIndex === null || !photos || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        soundFX.chime(500);
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight') {
        soundFX.chime(650);
        onNavigate((currentIndex + 1) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos, onClose, onNavigate]);

  const goPrev = (e) => {
    e.stopPropagation();
    soundFX.chime(500);
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    soundFX.chime(650);
    onNavigate((currentIndex + 1) % photos.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
    >
      {/* Top action bar */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full glass-card text-babyCyan-300 text-xs font-mono font-medium">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-xs text-slate-300 font-serif hidden sm:inline">
            {currentPhoto.title || "Special Memory"}
          </span>
        </div>

        <button
          onClick={onClose}
          id="lightbox-close-btn"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close photo"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev button */}
      <button
        onClick={goPrev}
        id="lightbox-prev-btn"
        className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={goNext}
        id="lightbox-next-btn"
        className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 z-20"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image & Caption Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 max-h-[70vh] flex items-center justify-center">
          <img
            src={currentPhoto.image || currentPhoto.photo}
            alt={currentPhoto.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Caption Card */}
        <div className="mt-4 p-4 rounded-2xl glass-card max-w-xl w-full text-center border border-white/15 shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h4 className="text-base sm:text-lg font-serif font-bold text-white">
              {currentPhoto.title}
            </h4>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/40" />
          </div>
          {currentPhoto.note && (
            <p className="font-cursive text-xl sm:text-2xl text-pink-300 font-bold">
              "{currentPhoto.note}"
            </p>
          )}
          {currentPhoto.date && (
            <span className="text-[11px] font-mono text-slate-400 block mt-1">
              {currentPhoto.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
