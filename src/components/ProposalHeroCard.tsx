import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Gem, ArrowDown, Edit3 } from 'lucide-react';
import { ProposalConfig } from '../types';

interface ProposalHeroCardProps {
  config: ProposalConfig;
  onAcceptProposal: () => void;
  onOpenCustomizer: () => void;
}

export const ProposalHeroCard: React.FC<ProposalHeroCardProps> = ({
  config,
  onAcceptProposal,
  onOpenCustomizer,
}) => {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const playfulNoTexts = [
    'No',
    'Are you sure? 🥺',
    'Wrong button silly! 💕',
    'Try the other one! 🌸',
    'Catch me if you can! ✨',
    'You can\'t say no! 🥰',
    'Look how shiny YES is! 💍',
    'Destiny says Yes! ✨',
    'Nice try sweetheart! 💖',
    'I know you love me! 😘',
  ];

  const dodgeNoButton = () => {
    setNoAttempts((prev) => prev + 1);
    setYesScale((prev) => Math.min(1.4, prev + 0.05));

    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = noBtnRef.current ? noBtnRef.current.offsetWidth : 100;
    const btnHeight = noBtnRef.current ? noBtnRef.current.offsetHeight : 45;

    // Viewport bounds safe padding
    const maxX = Math.min(window.innerWidth - btnWidth - 40, containerRect.right - btnWidth);
    const minX = Math.max(20, containerRect.left);
    const maxY = Math.min(window.innerHeight - btnHeight - 40, containerRect.bottom + 80);
    const minY = Math.max(80, containerRect.top - 60);

    // Pick random target position within safe range
    const targetX = Math.random() * (maxX - minX) + minX - containerRect.left;
    const targetY = Math.random() * (maxY - minY) + minY - containerRect.top;

    setNoPosition({ x: targetX, y: targetY });
  };

  const handleNoPointerEnter = (e: React.PointerEvent) => {
    e.preventDefault();
    dodgeNoButton();
  };

  const handleNoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    dodgeNoButton();
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dodgeNoButton();
  };

  const currentNoText = playfulNoTexts[Math.min(noAttempts, playfulNoTexts.length - 1)];

  return (
    <div
      id="proposal-hero-section"
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 z-20"
    >
      {/* Decorative Floating Sparkle Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centerpiece Glassmorphism Card */}
      <div
        ref={containerRef}
        id="proposal-main-glass-card"
        className="glass-card relative w-full max-w-2xl rounded-3xl p-8 sm:p-12 text-center overflow-visible border border-white/15 shadow-2xl transition-all duration-500"
      >
        {/* Subtle quick customize trigger button */}
        <button
          id="quick-customize-btn"
          onClick={onOpenCustomizer}
          className="absolute top-4 right-4 p-2 rounded-full text-rose-300/70 hover:text-rose-100 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-sans-clean cursor-pointer"
          title="Personalize Names & Message"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Personalize</span>
        </button>

        {/* Floating Ring Emblem / Sparkle Header */}
        <div className="flex justify-center mb-4">
          <div className="relative p-4 rounded-full bg-gradient-to-b from-rose-500/20 to-pink-500/10 border border-rose-400/30 heart-beat shadow-lg shadow-rose-900/30">
            <Gem className="w-10 h-10 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.8)]" />
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Partner Name in Romantic Script */}
        <div className="mb-2">
          <p className="text-sm uppercase tracking-widest text-rose-300/80 font-sans-clean font-medium">
            A message from the depths of my heart
          </p>
          <h2
            id="partner-name-display"
            className="text-3xl sm:text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 mt-2 py-1 drop-shadow-md"
          >
            {config.partnerName || 'My Beloved'}
          </h2>
        </div>

        {/* Heartfelt Romantic Love Letter */}
        <div className="relative my-6 px-4 sm:px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="absolute -top-3 left-6 px-2 bg-[#0d1127] text-rose-400 text-xs font-serif-romantic italic">
            Forever Yours
          </div>
          <p
            id="proposal-custom-letter"
            className="text-base sm:text-lg font-serif-editorial italic text-rose-100/90 leading-relaxed font-normal whitespace-pre-line"
          >
            "{config.customLetter}"
          </p>
          {config.proposerName && (
            <p className="mt-3 text-right font-script text-2xl text-rose-300">
              — With endless devotion, {config.proposerName}
            </p>
          )}
        </div>

        {/* The Golden Question: "Will You Marry Me?" */}
        <div className="my-8">
          <h1
            id="will-you-marry-me-heading"
            className="text-4xl sm:text-6xl font-serif-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 text-glow tracking-tight leading-tight"
          >
            {config.proposalQuestion}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400/60" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400/60" />
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div
          id="proposal-buttons-area"
          className="relative min-h-[90px] flex items-center justify-center gap-6 mt-6 select-none"
        >
          {/* YES Button */}
          <button
            id="proposal-yes-btn"
            onClick={onAcceptProposal}
            style={{ transform: `scale(${yesScale})` }}
            className="group relative px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:via-pink-400 hover:to-rose-500 text-white font-serif-romantic text-xl font-bold shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_50px_rgba(244,63,94,0.9)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-3 z-30"
          >
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
            <span>YES, Forever!</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />
          </button>

          {/* Moving NO Button */}
          <button
            ref={noBtnRef}
            id="proposal-no-btn"
            onPointerEnter={handleNoPointerEnter}
            onTouchStart={handleNoTouchStart}
            onClick={handleNoClick}
            style={
              noPosition
                ? {
                    position: 'absolute',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }
                : {}
            }
            className="px-6 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-rose-200/80 hover:text-white font-sans-clean text-sm font-medium border border-rose-500/20 backdrop-blur-md shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer z-30"
          >
            {currentNoText}
          </button>
        </div>

        {/* Hints or romantic quote */}
        <p className="mt-8 text-xs font-sans-clean text-rose-300/50 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Every love story is beautiful, but ours is my absolute favorite.</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        </p>
      </div>

      {/* Down arrow scroll hint to explore the timeline & photos */}
      <a
        id="scroll-to-story-hint"
        href="#love-story-timeline-section"
        className="mt-12 flex flex-col items-center gap-2 text-rose-300/60 hover:text-rose-200 transition-colors group cursor-pointer"
      >
        <span className="text-xs font-sans-clean tracking-widest uppercase">
          Explore Our Love Story & Memories
        </span>
        <div className="p-2 rounded-full glass-pill group-hover:border-rose-400/40 group-hover:translate-y-1 transition-all">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </a>
    </div>
  );
};
