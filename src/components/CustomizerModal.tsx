import React, { useState } from 'react';
import { X, Sparkles, Heart, Check } from 'lucide-react';
import { ProposalConfig } from '../types';

interface CustomizerModalProps {
  config: ProposalConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: ProposalConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
}) => {
  const [partnerName, setPartnerName] = useState(config.partnerName);
  const [proposerName, setProposerName] = useState(config.proposerName);
  const [customLetter, setCustomLetter] = useState(config.customLetter);
  const [proposalQuestion, setProposalQuestion] = useState(config.proposalQuestion);
  const [specialDate, setSpecialDate] = useState(config.specialDate);
  const [countdownDate, setCountdownDate] = useState(config.countdownDate || '2027-06-20');
  const [countdownLabel, setCountdownLabel] = useState(config.countdownLabel || 'Counting Down to Our Wedding Day');
  const [showCountdown, setShowCountdown] = useState(config.showCountdown !== false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      partnerName,
      proposerName,
      customLetter,
      proposalQuestion,
      specialDate,
      countdownDate,
      countdownLabel,
      showCountdown,
    });
    onClose();
  };

  const presetLetters = [
    {
      title: 'Romantic & Poetic',
      text: 'From the quiet moments of laughter to our biggest adventures, every breath with you feels like coming home. You are my light, my peace, and my greatest dream come true.',
    },
    {
      title: 'Sweet & Playful',
      text: 'Life with you is my favorite adventure. You make ordinary days extraordinary, and I cannot imagine walking through this world with anyone else by my side.',
    },
    {
      title: 'Timeless & Deep',
      text: 'I loved you yesterday, I love you still, I always have, I always will. With you, my heart has found its eternal haven and my soul has found its match.',
    },
  ];

  return (
    <div
      id="customizer-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 relative border border-rose-400/30 shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-rose-300/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-serif-romantic font-semibold text-rose-100 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-400" />
          Personalize Proposal
        </h3>
        <p className="text-xs font-sans-clean text-rose-300/60 mb-6">
          Tailor every detail to make this proposal uniquely yours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans-clean text-rose-200/80 mb-1 font-medium">
                Partner's Name
              </label>
              <input
                type="text"
                required
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. My Beloved, Eleanor..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-sans-clean text-rose-200/80 mb-1 font-medium">
                Your Name
              </label>
              <input
                type="text"
                value={proposerName}
                onChange={(e) => setProposerName(e.target.value)}
                placeholder="e.g. Liam..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans-clean text-rose-200/80 mb-1 font-medium">
              Proposal Question
            </label>
            <input
              type="text"
              required
              value={proposalQuestion}
              onChange={(e) => setProposalQuestion(e.target.value)}
              placeholder="Will You Marry Me?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none font-serif-romantic"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-sans-clean text-rose-200/80 font-medium">
                Love Letter
              </label>
              <span className="text-[10px] text-rose-400/80">Presets available below</span>
            </div>
            <textarea
              required
              rows={4}
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none resize-none font-serif-editorial italic"
            />

            {/* Quick Letter Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {presetLetters.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomLetter(p.text)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-rose-500/20 text-rose-300 border border-white/10 transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans-clean text-rose-200/80 mb-1 font-medium">
              Special Date / Anniversary
            </label>
            <input
              type="text"
              value={specialDate}
              onChange={(e) => setSpecialDate(e.target.value)}
              placeholder="e.g. September 14, 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
            />
          </div>

          {/* Countdown Timer Settings */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-rose-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-sans-clean text-rose-100 font-medium flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Hero Countdown Timer</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCountdown}
                  onChange={(e) => setShowCountdown(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>

            {showCountdown && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-sans-clean text-rose-300/80 mb-1">
                    Countdown Title / Label
                  </label>
                  <input
                    type="text"
                    value={countdownLabel}
                    onChange={(e) => setCountdownLabel(e.target.value)}
                    placeholder="Counting Down to Our Wedding Day"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-xs focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans-clean text-rose-300/80 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={countdownDate}
                    onChange={(e) => setCountdownDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/70 border border-white/10 text-rose-100 text-xs focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans-clean text-rose-300/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-sans-clean font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
