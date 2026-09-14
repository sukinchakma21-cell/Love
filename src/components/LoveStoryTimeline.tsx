import React, { useState } from 'react';
import { Heart, Coffee, Sparkles, Compass, Moon, Camera, Gem, Calendar, Plus, Trash2 } from 'lucide-react';
import { TimelineEvent } from '../types';

interface LoveStoryTimelineProps {
  events: TimelineEvent[];
  onAddEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const LoveStoryTimeline: React.FC<LoveStoryTimelineProps> = ({
  events,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState<TimelineEvent['icon']>('heart');

  const getIcon = (iconType: TimelineEvent['icon']) => {
    switch (iconType) {
      case 'coffee':
        return <Coffee className="w-4 h-4 text-amber-300" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-emerald-300" />;
      case 'moon':
        return <Moon className="w-4 h-4 text-indigo-300" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-sky-300" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-yellow-300" />;
      case 'ring':
        return <Gem className="w-4 h-4 text-rose-300" />;
      case 'heart':
      default:
        return <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />;
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    onAddEvent({
      id: `custom-${Date.now()}`,
      title: newTitle,
      date: newDate || 'A Special Day',
      location: newLocation,
      description: newDesc,
      icon: newIcon,
    });

    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <section
      id="love-story-timeline-section"
      className="relative max-w-4xl mx-auto px-4 py-20 z-20"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-rose-300 text-xs font-sans-clean mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Our Journey Together</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-rose-200 text-glow">
          Chapters of Our Love
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif-editorial italic text-rose-200/70 max-w-lg mx-auto">
          Every step, every smile, and every gentle whisper that brought us to this magical moment.
        </p>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative">
        {/* Glowing Center Line */}
        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500/10 via-rose-500/50 to-pink-500/20" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {events.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={`timeline-item-${item.id}`}
                className={`relative flex items-center ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row pl-12 sm:pl-0 group`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-rose-400/80 shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>

                {/* Content Card (Desktop: 45% width; Mobile: full width) */}
                <div
                  className={`w-full sm:w-[46%] ${
                    isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'
                  }`}
                >
                  <div className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 relative">
                    {/* Delete button for customized events */}
                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={() => onDeleteEvent(item.id)}
                        className="absolute top-3 right-3 text-rose-300/40 hover:text-rose-300 transition-colors p-1"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Date badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-sans-clean font-medium mb-2 ${
                        isEven ? 'sm:ml-auto' : ''
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xl font-serif-romantic font-semibold text-rose-100 group-hover:text-pink-200 transition-colors">
                      {item.title}
                    </h3>

                    {item.location && (
                      <p className="text-xs text-rose-300/60 font-sans-clean mt-0.5 mb-2">
                        📍 {item.location}
                      </p>
                    )}

                    <p className="text-sm font-serif-editorial text-rose-200/80 italic leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Milestone Toggle */}
      <div className="mt-14 text-center">
        {!showAddForm ? (
          <button
            id="add-milestone-toggle-btn"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:border-rose-400/50 text-rose-200 text-xs font-sans-clean transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            <span>Add Another Cherished Memory</span>
          </button>
        ) : (
          <form
            onSubmit={handleCreate}
            className="glass-card max-w-lg mx-auto rounded-2xl p-6 text-left border border-rose-400/30 shadow-xl"
          >
            <h4 className="text-lg font-serif-romantic font-semibold text-rose-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              New Milestone
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stargazing at the Beach"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 14, 2024"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Malibu Pier"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                  Heartfelt Note
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="What made this moment unforgettable?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                  Icon
                </label>
                <div className="flex gap-2">
                  {(['heart', 'sparkles', 'coffee', 'compass', 'camera', 'moon'] as TimelineEvent['icon'][]).map((ic) => (
                    <button
                      type="button"
                      key={ic}
                      onClick={() => setNewIcon(ic)}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        newIcon === ic
                          ? 'bg-rose-500/30 border-rose-400 text-white'
                          : 'bg-slate-900/40 border-white/10 text-rose-300/60'
                      }`}
                    >
                      {getIcon(ic)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-sans-clean text-rose-300/70 hover:text-rose-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-xs font-sans-clean font-medium shadow-md cursor-pointer"
                >
                  Save Milestone
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
