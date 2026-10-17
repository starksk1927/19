import React, { useState } from 'react';
import PinLockScreen from './components/PinLockScreen';
import StarryBackground from './components/StarryBackground';
import CursorStardust from './components/CursorStardust';
import EntranceGate from './components/EntranceGate';
import Navbar from './components/Navbar';
import HeroCountdown from './components/HeroCountdown';
import ChildhoodMemories from './components/ChildhoodMemories';
import TimelineStory from './components/TimelineStory';
import PolaroidVault from './components/PolaroidVault';
import ThakaliCards from './components/ThakaliCards';
import LoveReasonGenerator from './components/LoveReasonGenerator';
import WaxLetter from './components/WaxLetter';
import HariSingingGift from './components/HariSingingGift';
import InteractiveCake from './components/InteractiveCake';
import VirtualLoveLock from './components/VirtualLoveLock';
import CoupleQuiz from './components/CoupleQuiz';
import BucketList from './components/BucketList';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import PhotoLightbox from './components/PhotoLightbox';
import { romanticData } from './data/content';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // STRICT PRIVACY PROTECTION:
  // If not authenticated with PIN 1019, render ONLY the PinLockScreen.
  // The entire main DOM, all photos, love letters, and names are NOT rendered or present in the HTML at all!
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen text-slate-100 bg-[#040714] overflow-x-hidden">
        <StarryBackground />
        <CursorStardust />
        <PinLockScreen onUnlock={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#040714] overflow-x-hidden selection:bg-pink-500 selection:text-white animate-in fade-in duration-700">
      {/* 1. Cinematic Entrance Curtain Gate */}
      {!hasEntered && (
        <EntranceGate onEnter={() => setHasEntered(true)} />
      )}

      {/* 2. Interactive Stardust Cursor Trail */}
      <CursorStardust />

      {/* 3. Dynamic Starry Canvas Background */}
      <StarryBackground />

      {/* 4. Floating Header Navigation */}
      <Navbar onLock={() => setIsAuthenticated(false)} />

      {/* 5. Main Narrative Chapters */}
      <main className="relative z-10">
        <HeroCountdown />
        <ChildhoodMemories />
        <TimelineStory />
        <PolaroidVault onOpenLightbox={(idx) => setLightboxIndex(idx)} />
        <ThakaliCards />
        <LoveReasonGenerator />
        <WaxLetter />
        <HariSingingGift />
        <InteractiveCake />
        <VirtualLoveLock />
        <CoupleQuiz />
        <BucketList />
        <Footer onLock={() => setIsAuthenticated(false)} />
      </main>

      {/* 6. Floating Ambient Music Player */}
      <MusicPlayer autoStart={hasEntered} />

      {/* 7. Fullscreen Cinematic Photo Lightbox */}
      <PhotoLightbox
        photos={romanticData.polaroids}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
