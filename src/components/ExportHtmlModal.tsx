import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Sparkles } from 'lucide-react';
import { ProposalConfig, TimelineEvent, GalleryPhoto } from '../types';
import { generateStandaloneHtml } from '../utils/generateSingleHtml';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProposalConfig;
  events: TimelineEvent[];
  photos: GalleryPhoto[];
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  onClose,
  config,
  events,
  photos,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateStandaloneHtml(config, events, photos);

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'romantic_proposal.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="export-html-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 relative border border-rose-400/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-rose-300/60 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <FileCode className="w-5 h-5 text-rose-400" />
          <h3 className="text-2xl font-serif-romantic font-semibold text-rose-100">
            Export All-In-One HTML File
          </h3>
        </div>
        <p className="text-xs font-sans-clean text-rose-200/70 mb-6">
          Everything packed into a single, zero-dependency HTML file (HTML + CSS + JavaScript + Web Audio synthesizer + Canvases). You can double-click it to open on any device or send it as a romantic gift file!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-sans-clean text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download romantic_proposal.html</span>
          </button>

          <button
            onClick={handleCopy}
            className="py-3 px-5 rounded-xl glass-pill hover:bg-white/15 text-rose-200 font-sans-clean text-xs font-medium border border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Raw HTML Code</span>
              </>
            )}
          </button>
        </div>

        {/* Preview Code Snippet */}
        <div className="relative rounded-2xl bg-slate-950/80 p-4 border border-white/10 font-mono text-[11px] text-rose-200/80 max-h-48 overflow-y-auto">
          <pre>{htmlContent.slice(0, 1200)} ... [Complete standalone code]</pre>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-rose-300/50">
          <span>✓ Zero external script dependencies</span>
          <span>✓ Works 100% offline</span>
        </div>
      </div>
    </div>
  );
};
