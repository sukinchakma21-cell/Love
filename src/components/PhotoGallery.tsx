import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Heart, Plus, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onAddPhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customCaption, setCustomCaption] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    onAddPhoto({
      id: `photo-${Date.now()}`,
      url: previewUrl,
      caption: customCaption || 'A moment frozen in time',
      date: customDate || 'Today',
      location: customLocation,
      rotation: (Math.random() * 8) - 4,
    });

    setPreviewUrl('');
    setCustomCaption('');
    setCustomDate('');
    setCustomLocation('');
    setShowUploadModal(false);
  };

  return (
    <section
      id="photo-gallery-section"
      className="relative max-w-6xl mx-auto px-4 py-20 z-20"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-rose-300 text-xs font-sans-clean mb-3">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Captured Moments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-rose-200 text-glow">
          Our Favorite Memories
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif-editorial italic text-rose-200/70 max-w-md mx-auto">
          Every snapshot holds a heartbeat, a secret joke, and an everlasting promise.
        </p>

        {/* Add photo button */}
        <div className="mt-6">
          <button
            id="add-custom-photo-btn"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:border-rose-400/60 text-rose-200 text-xs font-sans-clean transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            <span>Add Our Own Photo</span>
          </button>
        </div>
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            id={`gallery-card-${photo.id}`}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.65,
              delay: (index % 3) * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              transform: `rotate(${photo.rotation || 0}deg)`,
            }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-30"
          >
            {/* Polaroid frame card */}
            <div className="bg-slate-900/80 p-4 pb-6 rounded-2xl border border-white/15 shadow-xl shadow-black/40 hover:shadow-2xl hover:border-rose-400/40 backdrop-blur-md">
              {/* Photo Image with referrerPolicy */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                  <span className="text-xs text-white/90 font-sans-clean flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> View Memory
                  </span>
                </div>
              </div>

              {/* Handwritten style Polaroid caption */}
              <div className="mt-4 px-1 text-center">
                <p className="font-script text-2xl text-rose-100 tracking-wide leading-tight group-hover:text-pink-200">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] font-sans-clean text-rose-300/60 mt-2 px-1">
                  <span>{photo.date}</span>
                  {photo.location && <span>📍 {photo.location}</span>}
                </div>
              </div>
            </div>

            {/* Cute Decorative Tape on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/20 backdrop-blur-sm -rotate-2 rounded-sm border-t border-b border-white/30 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="glass-card max-w-2xl w-full rounded-3xl p-6 relative border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-rose-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-black/40">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-5 text-center">
              <h3 className="text-3xl font-script text-pink-200">
                {selectedPhoto.caption}
              </h3>
              <div className="flex items-center justify-center gap-4 text-xs font-sans-clean text-rose-300/70 mt-2">
                <span>📅 {selectedPhoto.date}</span>
                {selectedPhoto.location && <span>📍 {selectedPhoto.location}</span>}
              </div>

              {selectedPhoto.id.startsWith('photo-') && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      onDeletePhoto(selectedPhoto.id);
                      setSelectedPhoto(null);
                    }}
                    className="text-xs text-rose-400/70 hover:text-rose-400 font-sans-clean"
                  >
                    Remove this photo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Photo Modal */}
      {showUploadModal && (
        <div
          id="upload-photo-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="glass-card max-w-md w-full rounded-3xl p-6 relative border border-rose-400/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-rose-300/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif-romantic font-semibold text-rose-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Upload Couple Photo
            </h3>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              {/* Image Input Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rose-400/30 hover:border-rose-400/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-900/40"
              >
                {previewUrl ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden max-h-48 mx-auto">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="py-4">
                    <ImageIcon className="w-10 h-10 text-rose-400/60 mx-auto mb-2" />
                    <p className="text-xs font-sans-clean text-rose-200">
                      Click to select a photo from your device
                    </p>
                    <p className="text-[10px] text-rose-300/50 mt-1">
                      PNG, JPG, or WebP
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                  Sweet Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset at Paris 💖"
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
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
                    placeholder="e.g. June 2023"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans-clean text-rose-200/70 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Florence, Italy"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-sans-clean text-rose-300/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!previewUrl}
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 disabled:opacity-40 text-white text-xs font-sans-clean font-medium shadow-lg shadow-rose-600/30 cursor-pointer"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
