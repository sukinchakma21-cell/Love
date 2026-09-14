import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Heart } from 'lucide-react';

interface ProposalCountdownProps {
  targetDate?: string;
  label?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const ProposalCountdown: React.FC<ProposalCountdownProps> = ({
  targetDate = '2027-06-20',
  label = 'Counting Down to Our Wedding Day',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      // Parse target date (supporting YYYY-MM-DD or standard date strings)
      const targetTime = new Date(targetDate).getTime();
      const now = Date.now();
      const difference = targetTime - now;

      if (isNaN(targetTime)) {
        setTimeLeft(null);
        return;
      }

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div
      id="hero-wedding-countdown"
      className="inline-flex flex-col items-center my-4 px-4 sm:px-6 py-3 rounded-2xl bg-white/[0.04] border border-rose-400/20 backdrop-blur-md shadow-lg shadow-black/20"
    >
      {/* Label and Header */}
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-rose-300/80 font-sans-clean mb-2">
        <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
        <span className="font-medium">{label}</span>
        <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
      </div>

      {timeLeft.isPast ? (
        <div className="py-1 text-center">
          <p className="font-serif-romantic text-base text-amber-200 font-semibold flex items-center justify-center gap-2">
            <span>💍</span>
            <span>Our Forever Journey Has Begun!</span>
            <span>✨</span>
          </p>
        </div>
      ) : (
        /* 4-digit countdown row */
        <div className="flex items-center gap-2 sm:gap-3 select-none">
          {/* Days */}
          <div className="flex flex-col items-center px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 min-w-[50px] sm:min-w-[62px]">
            <span className="font-serif-romantic text-lg sm:text-2xl font-bold text-rose-100 leading-tight text-glow">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-rose-300/60 font-sans-clean font-medium">
              Days
            </span>
          </div>

          <span className="text-rose-400/60 font-serif text-lg -mt-3">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 min-w-[46px] sm:min-w-[56px]">
            <span className="font-serif-romantic text-lg sm:text-2xl font-bold text-rose-100 leading-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-rose-300/60 font-sans-clean font-medium">
              Hours
            </span>
          </div>

          <span className="text-rose-400/60 font-serif text-lg -mt-3">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 min-w-[46px] sm:min-w-[56px]">
            <span className="font-serif-romantic text-lg sm:text-2xl font-bold text-rose-100 leading-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-rose-300/60 font-sans-clean font-medium">
              Mins
            </span>
          </div>

          <span className="text-rose-400/60 font-serif text-lg -mt-3">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 min-w-[46px] sm:min-w-[56px]">
            <span className="font-serif-romantic text-lg sm:text-2xl font-bold text-amber-200 leading-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-rose-300/60 font-sans-clean font-medium">
              Secs
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
