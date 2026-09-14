import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Sliders, FileCode, Gem } from 'lucide-react';
import { StarrySkyCanvas } from './components/StarrySkyCanvas';
import { FloatingPetalsAndHearts } from './components/FloatingPetalsAndHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { ProposalHeroCard } from './components/ProposalHeroCard';
import { LoveStoryTimeline } from './components/LoveStoryTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { CelebrationModal } from './components/CelebrationModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import {
  initialProposalConfig,
  initialTimelineEvents,
  initialGalleryPhotos,
} from './data/defaultProposalData';
import { ProposalConfig, TimelineEvent, GalleryPhoto } from './types';

export default function App() {
  const [config, setConfig] = useState<ProposalConfig>(() => {
    const saved = localStorage.getItem('proposal_config');
    return saved ? JSON.parse(saved) : initialProposalConfig;
  });

  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('proposal_events');
    return saved ? JSON.parse(saved) : initialTimelineEvents;
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('proposal_photos');
    return saved ? JSON.parse(saved) : initialGalleryPhotos;
  });

  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress through the page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('proposal_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('proposal_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('proposal_photos', JSON.stringify(photos));
  }, [photos]);

  const handleAddTimelineEvent = (newEvent: TimelineEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDeleteTimelineEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddPhoto = (newPhoto: GalleryPhoto) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-500/30 selection:text-rose-200">
      {/* Rose-Gold Scroll Progress Bar at very top of screen */}
      <div
        id="scroll-progress-bar-track"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-white/[0.04] backdrop-blur-[1px]"
      >
        <div
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 via-rose-300 to-amber-200 transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.7), 0 0 18px rgba(244, 63, 94, 0.6)',
          }}
        />
      </div>

      {/* 1. Animated Starry Night Background (Canvas) */}
      <StarrySkyCanvas />

      {/* 2. Floating Rose Petals and Hearts (Canvas) */}
      <FloatingPetalsAndHearts />

      {/* 3. Top Navigation & Action Controls */}
      <header
        id="app-top-nav"
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between pointer-events-none"
      >
        {/* Logo / Romantic Brand */}
        <div className="glass-pill px-3.5 py-1.5 flex items-center gap-2 pointer-events-auto border border-white/10 shadow-lg">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="font-serif-romantic text-sm font-semibold text-rose-100 tracking-wide">
            Forever & Always
          </span>
        </div>

        {/* Right side utility buttons */}
        <div className="flex items-center gap-2 pointer-events-auto pr-36 sm:pr-48">
          <button
            id="open-customizer-nav-btn"
            onClick={() => setIsCustomizerOpen(true)}
            className="glass-pill px-3 py-1.5 text-xs text-rose-200 hover:text-white flex items-center gap-1.5 border border-white/15 hover:border-rose-400/40 transition-all cursor-pointer shadow-md"
            title="Personalize Names & Proposal"
          >
            <Sliders className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            id="open-export-html-btn"
            onClick={() => setIsExportModalOpen(true)}
            className="glass-pill px-3 py-1.5 text-xs text-rose-200 hover:text-white flex items-center gap-1.5 border border-white/15 hover:border-rose-400/40 transition-all cursor-pointer shadow-md bg-rose-500/10"
            title="Download Single HTML File"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Single HTML</span>
          </button>
        </div>
      </header>

      {/* 4. Background Romantic Music Player */}
      <MusicPlayer />

      {/* 5. Main Content Flow */}
      <main className="relative z-20">
        {/* Proposal Centerpiece Card */}
        <ProposalHeroCard
          config={config}
          onAcceptProposal={() => setIsCelebrationOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Love Story Timeline */}
        <LoveStoryTimeline
          events={events}
          onAddEvent={handleAddTimelineEvent}
          onDeleteEvent={handleDeleteTimelineEvent}
        />

        {/* Photo Gallery Section */}
        <PhotoGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
        />

        {/* Bottom Romantic Footer */}
        <footer className="relative py-16 text-center text-rose-200/50 text-xs font-sans-clean z-20 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-10 bg-rose-500/20" />
            <Heart className="w-4 h-4 text-rose-400/60 fill-rose-400/40" />
            <span className="h-px w-10 bg-rose-500/20" />
          </div>
          <p className="font-serif-romantic text-base text-rose-200/80 mb-1">
            "I have found the one whom my soul loves."
          </p>
          <p className="text-[11px] text-rose-300/40">
            Crafted with eternal devotion • Forever starts with a single question
          </p>

          <div className="mt-4 flex justify-center gap-4 text-[11px]">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-rose-300/60 hover:text-rose-200 underline cursor-pointer"
            >
              Edit Proposal Details
            </button>
            <span>•</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-rose-300/60 hover:text-rose-200 underline cursor-pointer"
            >
              Export Standalone HTML File
            </button>
          </div>
        </footer>
      </main>

      {/* 6. Celebration Modal & Confetti Blast */}
      <CelebrationModal
        config={config}
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
      />

      {/* 7. Proposal Customizer Modal */}
      <CustomizerModal
        config={config}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSave={(newCfg) => setConfig(newCfg)}
      />

      {/* 8. Export Single HTML File Modal */}
      <ExportHtmlModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
        events={events}
        photos={photos}
      />
    </div>
  );
}
