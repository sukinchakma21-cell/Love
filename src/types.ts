export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: 'heart' | 'sparkles' | 'coffee' | 'compass' | 'camera' | 'ring' | 'moon';
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
  rotation?: number; // degree for polaroid tilt
}

export interface ProposalConfig {
  partnerName: string;
  proposerName: string;
  customLetter: string;
  proposalQuestion: string;
  specialDate: string;
  countdownDate?: string;
  countdownLabel?: string;
  showCountdown?: boolean;
}
