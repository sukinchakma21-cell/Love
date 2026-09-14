import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const [vizBars, setVizBars] = useState<number[]>([40, 65, 80, 50, 75, 45, 90, 60]);

  // Handle first user interaction auto-play cue
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    const playing = romanticAudio.toggle();
    setIsPlaying(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      romanticAudio.setVolume(volume > 0 ? volume : 0.5);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  // Real-time Visualizer bars animation
  useEffect(() => {
    let phase = 0;
    const updateViz = () => {
      if (isPlaying) {
        const rawData = romanticAudio.getVisualizerData();
        const bars: number[] = [];
        for (let i = 0; i < 8; i++) {
          const val = rawData[i * 2] || 0;
          // combine frequency data with gentle organic sine waves
          const simulated = Math.sin(phase + i * 0.7) * 25 + 50;
          const combined = Math.min(100, Math.max(15, (val / 255) * 80 + simulated * 0.4));
          bars.push(combined);
        }
        phase += 0.15;
        setVizBars(bars);
      } else {
        setVizBars([20, 25, 20, 25, 20, 25, 20, 25]);
      }
      animFrameRef.current = requestAnimationFrame(updateViz);
    };

    animFrameRef.current = requestAnimationFrame(updateViz);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      id="romantic-music-player-container"
      className="fixed top-4 right-4 z-40 flex items-center gap-2"
    >
      <div
        id="romantic-music-player-card"
        className="glass-pill px-3.5 py-2 rounded-full shadow-lg shadow-rose-950/20 flex items-center gap-3 backdrop-blur-xl border border-rose-400/20 text-rose-100 transition-all duration-300 hover:border-rose-400/40"
      >
        {/* Play/Pause Button */}
        <button
          id="music-play-pause-btn"
          onClick={togglePlay}
          className="relative group p-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-md shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title={isPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-sans-clean bg-gray-900/90 text-rose-200 px-2 py-0.5 rounded border border-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isPlaying ? 'Pause' : 'Play Melody'}
          </span>
        </button>

        {/* Music Icon & Equalizer Soundwaves */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Music className={`w-4 h-4 text-rose-300 ${isPlaying ? 'animate-bounce' : 'opacity-70'}`} />
            {isPlaying && (
              <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 absolute -top-2 -right-1 animate-ping" />
            )}
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-serif-romantic tracking-wide text-rose-100 font-medium leading-none">
              Canon of Love
            </span>
            <span className="text-[10px] text-rose-300/70 font-sans-clean leading-tight">
              Acoustic Piano & Celeste
            </span>
          </div>

          {/* Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-4 w-12 px-1">
            {vizBars.map((height, idx) => (
              <span
                key={idx}
                className="w-1 bg-gradient-to-t from-rose-500 to-pink-300 rounded-full transition-all duration-100 ease-out"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Volume controls */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <button
            id="music-volume-mute-btn"
            onClick={toggleMute}
            className="p-1 rounded-full text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {showVolume && (
            <div className="absolute right-0 top-full mt-2 p-2 rounded-xl glass-card flex items-center gap-2 shadow-xl border border-rose-400/20 animate-fadeIn z-50">
              <input
                id="music-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-rose-500 cursor-pointer h-1.5 bg-rose-950/60 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
