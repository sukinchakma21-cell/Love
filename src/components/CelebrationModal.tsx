import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gem, Share2, Check, Download, RotateCcw } from 'lucide-react';
import { ProposalConfig } from '../types';
import { romanticAudio } from '../utils/audioSynthesizer';

interface CelebrationModalProps {
  config: ProposalConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    // Play joyful wedding chimes flourish
    romanticAudio.playCelebrationChimes();

    // Trigger multi-stage confetti blasts
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;

    // Heart shapes and sparkling gold & ruby palette
    const colors = ['#f43f5e', '#fda4af', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff'];

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left fountain
      confetti({
        particleCount,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });

      // Right fountain
      confetti({
        particleCount,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      // Center sky burst
      if (Math.random() < 0.4) {
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors,
          shapes: ['circle'],
          scalar: 1.2,
        });
      }
    }, 350);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrintKeepsake = () => {
    window.print();
  };

  return (
    <div
      id="celebration-fullscreen-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fadeIn"
    >
      <div
        id="celebration-keepsake-card"
        className="glass-card relative max-w-xl w-full rounded-3xl p-8 sm:p-12 text-center border-2 border-rose-400/40 shadow-[0_0_80px_rgba(244,63,94,0.4)] my-8"
      >
        {/* Glowing Rings Ornament */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400/30 via-rose-500/20 to-pink-500/30 p-1 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-pulse">
              <div className="w-full h-full rounded-full bg-slate-950/80 flex items-center justify-center border border-amber-300/40">
                <Gem className="w-12 h-12 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 absolute -bottom-1 -left-1 animate-bounce" />
          </div>
        </div>

        {/* Celebration Title */}
        <p className="text-xs uppercase tracking-[0.3em] text-rose-300 font-sans-clean font-semibold">
          ✨ The Promise Of A Lifetime ✨
        </p>

        <h1
          id="she-said-yes-heading"
          className="text-4xl sm:text-6xl font-script text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 text-glow-gold mt-2 mb-4"
        >
          {config.partnerName ? `${config.partnerName} Said YES!` : 'She Said YES!'}
        </h1>

        <div className="flex items-center justify-center gap-3 my-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
          <span className="text-xl">💍</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* Romantic Keepsake Message */}
        <div className="my-6 px-6 py-5 rounded-2xl bg-white/[0.04] border border-amber-300/20">
          <p className="font-serif-romantic text-lg sm:text-xl text-rose-100 italic leading-relaxed">
            "Two souls, one destiny, and a lifetime of adventures waiting to unfold."
          </p>
          <p className="mt-4 font-sans-clean text-xs sm:text-sm text-rose-200/80 leading-relaxed">
            From this day forth, through every sunrise and under every starry sky,
            we will walk hand-in-hand together forever.
          </p>
        </div>

        {/* Keepsake Details */}
        <div className="grid grid-cols-2 gap-4 my-6 text-xs font-sans-clean bg-slate-950/40 p-4 rounded-xl border border-white/10">
          <div>
            <span className="text-rose-300/60 block">Celebrated On</span>
            <span className="text-rose-100 font-medium">
              {config.specialDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div>
            <span className="text-rose-300/60 block">Love Status</span>
            <span className="text-amber-300 font-medium flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" /> Forever & Always
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            id="print-keepsake-btn"
            onClick={handlePrintKeepsake}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-sans-clean text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Save / Print Keepsake</span>
          </button>

          <button
            id="celebration-close-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full glass-pill hover:bg-white/15 text-rose-200 font-sans-clean text-xs font-medium border border-white/20 transition-all cursor-pointer"
          >
            Back to Proposal View
          </button>
        </div>

        <p className="text-[11px] font-sans-clean text-rose-300/40 mt-6">
          May your journey together be as endless and dazzling as the night sky.
        </p>
      </div>
    </div>
  );
};
