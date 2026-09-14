import { ProposalConfig, TimelineEvent, GalleryPhoto } from '../types';

export const initialProposalConfig: ProposalConfig = {
  partnerName: 'My Beloved Eleanor',
  proposerName: 'Julian',
  customLetter:
    'From the quiet laughter we share over morning coffee to our midnight walks under starlit skies, every moment with you feels like poetry. You are my home, my peace, and my greatest adventure. Today, with the stars as our witnesses, I want to ask you the simplest yet most sacred question of my entire life...',
  proposalQuestion: 'Will You Marry Me?',
  specialDate: 'September 14, 2026',
};

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1',
    date: 'October 12, 2021',
    title: 'The Day Our Eyes First Met',
    location: 'Little Owl Coffee Roasters',
    description:
      'A crisp autumn morning. You dropped your book, I rushed to help, and when our hands brushed, the entire busy world went silent. I still remember the exact gentle warmth in your smile.',
    icon: 'coffee',
  },
  {
    id: 'tl-2',
    date: 'November 03, 2021',
    title: 'Our First Official Date',
    location: 'Conservatory of Flowers',
    description:
      'We strolled beneath the giant palms and orchids. What was supposed to be a one-hour tea turned into a six-hour conversation that neither of us wanted to end.',
    icon: 'heart',
  },
  {
    id: 'tl-3',
    date: 'July 18, 2022',
    title: 'The Coastline Road Trip',
    location: 'Big Sur, California',
    description:
      'Windows down, ocean breeze in our hair, singing our favorite ballads off-key while watching the Pacific ocean turn into molten gold at twilight.',
    icon: 'compass',
  },
  {
    id: 'tl-4',
    date: 'January 01, 2023',
    title: 'Under the Midnight Starlight',
    location: 'Cabin in Lake Tahoe',
    description:
      'Wrapped together in a heavy wool blanket, watching snow fall gently outside while sharing our deepest hopes and dreams. That was the night I knew I wanted every tomorrow with you.',
    icon: 'moon',
  },
  {
    id: 'tl-5',
    date: 'Today',
    title: 'A Promise of Forever',
    location: 'Here, in this magical moment',
    description:
      'Surrounded by a universe of stars, holding all the memories we have built and looking forward to an eternity of hand-in-hand love.',
    icon: 'ring',
  },
];

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'p-1',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Our Sunset Stroll',
    date: 'Summer 2022',
    location: 'Malibu Shoreline',
    rotation: -3,
  },
  {
    id: 'p-2',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    caption: 'Uncontrollable Laughter',
    date: 'Autumn 2022',
    location: 'Central Park',
    rotation: 2,
  },
  {
    id: 'p-3',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    caption: 'Dancing Under Fairy Lights',
    date: 'Spring 2023',
    location: 'Rooftop Garden',
    rotation: -2,
  },
  {
    id: 'p-4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'That Unforgettable Smile',
    date: 'Winter 2023',
    location: 'Lakefront Walk',
    rotation: 3,
  },
  {
    id: 'p-5',
    url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden Hour Adventures',
    date: 'Summer 2024',
    location: 'Amalfi Coast',
    rotation: -1,
  },
  {
    id: 'p-6',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    caption: 'Pure Serenity With You',
    date: 'Spring 2025',
    location: 'Mountain Vista',
    rotation: 2,
  },
];
