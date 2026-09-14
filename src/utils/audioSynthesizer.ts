// Romantic Web Audio API Music Synthesizer & Melody Player
// Plays a warm, soothing ambient romantic piano / music-box arpeggio progression

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private volume: number = 0.65;
  private currentStep: number = 0;

  // D Major / Romantic chord progression (Canon inspired: D - A - Bm - F#m - G - D - Em - A)
  private readonly chords: number[][] = [
    // D major: D3, F#3, A3, D4, F#4, A4
    [146.83, 185.00, 220.00, 293.66, 369.99, 440.00, 587.33],
    // A major: A2, E3, A3, C#4, E4, A4
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00, 554.37],
    // B minor: B2, F#3, B3, D4, F#4, B4
    [123.47, 185.00, 246.94, 293.66, 369.99, 493.88, 587.33],
    // F# minor: F#2, C#3, F#3, A3, C#4, F#4
    [92.50, 138.59, 185.00, 220.00, 277.18, 369.99, 440.00],
    // G major: G2, D3, G3, B3, D4, G4
    [98.00, 146.83, 196.00, 246.94, 293.66, 392.00, 493.88],
    // D major / F#: D3, A3, D4, F#4, A4
    [146.83, 220.00, 293.66, 369.99, 440.00, 587.33],
    // G major / Em: E2, B2, E3, G3, B3, E4, G4
    [82.41, 123.47, 164.81, 196.00, 246.94, 329.63, 392.00],
    // A7: A2, E3, G3, C#4, E4, A4
    [110.00, 164.81, 196.00, 277.18, 329.63, 440.00, 554.37],
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic tone with gentle attack, warm resonance and smooth decay
  private playWarmTone(freq: number, startTime: number, duration: number, peakGain: number = 0.25) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator for rich, warm acoustic Rhodes / Music Box feel
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // Subtle detune chorus

    // Lowpass filter for warm velvety romantic acoustic quality
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 3.5, 3000), startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.2, 400), startTime + duration);

    // Envelope
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(peakGain * 0.4, startTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    let chordIndex = 0;
    let arpeggioStep = 0;
    const stepInterval = 420; // ms per note

    const scheduleNextNotes = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chord = this.chords[chordIndex];
      const now = this.ctx.currentTime;

      // Arpeggiate through the chord tones
      const noteFreq = chord[arpeggioStep % chord.length];
      const duration = 1.4; // ringing sustain
      const isBass = arpeggioStep === 0;

      this.playWarmTone(
        noteFreq,
        now,
        duration,
        isBass ? 0.35 : 0.18 + Math.random() * 0.08
      );

      // Occasionally add a delicate high sparkle chime
      if (Math.random() > 0.65 && chord.length > 4) {
        const chimeFreq = chord[chord.length - 1] * 1.5;
        this.playWarmTone(chimeFreq, now + 0.15, 0.8, 0.08);
      }

      arpeggioStep++;
      if (arpeggioStep >= 6) {
        arpeggioStep = 0;
        chordIndex = (chordIndex + 1) % this.chords.length;
      }

      this.timerId = window.setTimeout(scheduleNextNotes, stepInterval);
    };

    scheduleNextNotes();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  // Celebratory flourish when "Yes!" is pressed
  public playCelebrationChimes() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Ascending celebratory joyful wedding bells / chime arpeggio
    const celebrationNotes = [
      293.66, 369.99, 440.00, 587.33, 739.99, 880.00, 1174.66, 1479.98
    ];

    celebrationNotes.forEach((freq, idx) => {
      this.playWarmTone(freq, now + idx * 0.09, 2.2, 0.3);
    });

    // Warm chord backdrop
    const chord = [293.66, 369.99, 440.00, 587.33];
    chord.forEach((freq) => {
      this.playWarmTone(freq, now + 0.8, 3.5, 0.25);
    });
  }

  public getVisualizerData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const romanticAudio = new RomanticAudioEngine();
