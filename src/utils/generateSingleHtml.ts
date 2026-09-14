import { ProposalConfig, TimelineEvent, GalleryPhoto } from '../types';

export function generateStandaloneHtml(
  config: ProposalConfig,
  events: TimelineEvent[],
  photos: GalleryPhoto[]
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.partnerName ? `${config.partnerName} - ` : ''}Will You Marry Me?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #050816;
      color: #fff1f2;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      position: relative;
    }
    .font-script { font-family: 'Great Vibes', cursive; }
    .font-serif { font-family: 'Playfair Display', Georgia, serif; }
    .font-editorial { font-family: 'Cormorant Garamond', Georgia, serif; }
    
    /* Rose-Gold Scroll Progress Bar */
    #scroll-progress-track {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.05);
      z-index: 1000;
      pointer-events: none;
    }
    #scroll-progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #f43f5e, #fb7185, #fbcfe8, #fcd34d);
      box-shadow: 0 0 10px rgba(251, 191, 36, 0.7), 0 0 16px rgba(244, 63, 94, 0.6);
      transition: width 0.08s ease-out;
    }

    /* Background Canvases */
    #starry-canvas, #petals-canvas, #celebration-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    #starry-canvas { z-index: 1; }
    #petals-canvas { z-index: 2; }
    #celebration-canvas { z-index: 50; display: none; }

    .content-wrapper {
      position: relative;
      z-index: 10;
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px 16px;
    }

    /* Glassmorphism */
    .glass-card {
      background: rgba(18, 22, 43, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 28px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(244, 63, 94, 0.12);
    }
    .glass-pill {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
    }

    /* Floating Music Bar */
    .music-bar {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 40;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
    }
    .music-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f43f5e, #db2777);
      border: none;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(244, 63, 94, 0.4);
      transition: transform 0.2s;
    }
    .music-btn:hover { transform: scale(1.08); }

    /* Proposal Centerpiece */
    .proposal-hero {
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 16px;
      text-align: center;
    }
    .proposal-card {
      max-width: 680px;
      width: 100%;
      padding: 48px 32px;
      position: relative;
    }
    .ring-icon-wrap {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(244, 63, 94, 0.15);
      border: 1px solid rgba(244, 114, 182, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 32px;
      animation: heartbeat 2.4s ease-in-out infinite;
    }
    .partner-title {
      font-size: 42px;
      line-height: 1.2;
      color: #fbcfe8;
      margin: 8px 0;
      text-shadow: 0 0 20px rgba(244, 114, 182, 0.5);
    }
    .love-letter {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
      font-size: 18px;
      line-height: 1.7;
      color: #ffe4e6;
    }
    .proposal-question {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      color: #fff;
      text-shadow: 0 0 30px rgba(244, 63, 94, 0.8), 0 0 50px rgba(251, 191, 36, 0.4);
      margin: 20px 0;
    }
    .btn-container {
      position: relative;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-top: 24px;
    }
    .btn-yes {
      padding: 16px 40px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #f43f5e, #ec4899);
      border: none;
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 35px rgba(244, 63, 94, 0.6);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-yes:hover {
      box-shadow: 0 0 50px rgba(244, 63, 94, 0.9);
      transform: scale(1.05);
    }
    .btn-no {
      padding: 12px 28px;
      border-radius: 9999px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(244, 114, 182, 0.3);
      color: #fda4af;
      font-size: 15px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease-out;
    }

    /* Hero Countdown */
    .hero-countdown {
      margin: 16px auto 20px;
      padding: 12px 20px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(251, 113, 133, 0.25);
      border-radius: 18px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    .countdown-header {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #fda4af;
      margin-bottom: 8px;
    }
    .countdown-digits {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .countdown-unit {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 6px 10px;
      min-width: 48px;
      text-align: center;
    }
    .countdown-num {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      font-weight: bold;
      color: #fff1f2;
      display: block;
      line-height: 1.1;
    }
    .countdown-lbl {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(253, 164, 175, 0.7);
      display: block;
    }

    /* Timeline */
    .timeline-section { padding: 60px 16px; }
    .section-title {
      text-align: center;
      font-size: 38px;
      margin-bottom: 36px;
      color: #fbcfe8;
      text-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
    }
    .timeline-wrap {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      border-left: 2px solid rgba(244, 63, 94, 0.3);
      padding-left: 24px;
    }
    .timeline-item {
      position: relative;
      margin-bottom: 36px;
      opacity: 0;
      transform: translateY(35px);
      transition: opacity 0.75s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.75s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .timeline-item.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .timeline-dot {
      position: absolute;
      left: -33px;
      top: 10px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #f43f5e;
      box-shadow: 0 0 10px #f43f5e;
    }
    .timeline-card {
      padding: 20px;
      border-radius: 18px;
    }
    .timeline-date {
      font-size: 12px;
      color: #fda4af;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .timeline-h3 {
      font-size: 20px;
      margin: 6px 0;
      color: #fff;
    }

    /* Gallery */
    .gallery-section { padding: 60px 16px; }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 30px;
    }
    .polaroid-card {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.75s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.75s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .polaroid-card.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .polaroid-card:hover { transform: scale(1.03); }
    .polaroid-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 12px;
    }
    .polaroid-caption {
      font-size: 24px;
      color: #fbcfe8;
      margin-top: 12px;
    }

    /* Celebration Overlay */
    #celebration-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(4, 7, 20, 0.9);
      backdrop-filter: blur(20px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    .celebration-box {
      max-width: 600px;
      padding: 48px 32px;
      border: 2px solid #fbcfe8;
      box-shadow: 0 0 60px rgba(244, 63, 94, 0.5);
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      14% { transform: scale(1.15); }
      28% { transform: scale(1); }
      42% { transform: scale(1.18); }
      70% { transform: scale(1); }
    }
    @media (max-width: 640px) {
      .proposal-question { font-size: 34px; }
      .partner-title { font-size: 32px; }
      .proposal-card { padding: 32px 20px; }
    }
  </style>
</head>
<body>
  <!-- Rose-Gold Scroll Progress Bar -->
  <div id="scroll-progress-track">
    <div id="scroll-progress-bar"></div>
  </div>

  <!-- Canvas Elements -->
  <canvas id="starry-canvas"></canvas>
  <canvas id="petals-canvas"></canvas>
  <canvas id="celebration-canvas"></canvas>

  <!-- Music Player Pill -->
  <div class="glass-pill music-bar">
    <button id="music-btn" class="music-btn" title="Toggle Music">▶</button>
    <div style="font-size: 12px;">
      <div style="color:#ffe4e6; font-weight:600;">Canon of Love</div>
      <div style="color:#fda4af; font-size:10px;">Romantic Piano</div>
    </div>
  </div>

  <div class="content-wrapper">
    <!-- Proposal Section -->
    <section class="proposal-hero">
      <div class="glass-card proposal-card">
        <div class="ring-icon-wrap">💍</div>
        <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #fda4af;">Forever In Love</p>
        <h2 class="font-script partner-title">${config.partnerName || 'My Beloved'}</h2>
        
        <div class="love-letter font-editorial">
          "${config.customLetter}"
          ${config.proposerName ? `<div style="text-align:right; margin-top:12px; font-family:'Great Vibes'; font-size:24px; color:#fda4af;">— ${config.proposerName}</div>` : ''}
        </div>

        ${config.showCountdown !== false && config.countdownDate ? `
        <div class="hero-countdown" id="hero-countdown">
          <div class="countdown-header">✨ ${config.countdownLabel || 'Counting Down to Our Wedding Day'} 💖</div>
          <div class="countdown-digits" id="countdown-digits">
            <div class="countdown-unit"><span class="countdown-num" id="cd-days">00</span><span class="countdown-lbl">Days</span></div>
            <span style="color:#fda4af; font-weight:bold;">:</span>
            <div class="countdown-unit"><span class="countdown-num" id="cd-hours">00</span><span class="countdown-lbl">Hours</span></div>
            <span style="color:#fda4af; font-weight:bold;">:</span>
            <div class="countdown-unit"><span class="countdown-num" id="cd-mins">00</span><span class="countdown-lbl">Mins</span></div>
            <span style="color:#fda4af; font-weight:bold;">:</span>
            <div class="countdown-unit"><span class="countdown-num" id="cd-secs" style="color:#fde047;">00</span><span class="countdown-lbl">Secs</span></div>
          </div>
        </div>
        ` : ''}

        <h1 class="proposal-question font-serif">${config.proposalQuestion}</h1>

        <div class="btn-container" id="btn-container">
          <button id="btn-yes" class="btn-yes">YES, Forever! 💖</button>
          <button id="btn-no" class="btn-no">No</button>
        </div>
      </div>
    </section>

    <!-- Love Story Timeline -->
    <section class="timeline-section">
      <h2 class="section-title font-serif">Chapters of Our Love</h2>
      <div class="timeline-wrap">
        ${events.map((ev) => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="glass-card timeline-card">
              <div class="timeline-date">${ev.date}</div>
              <h3 class="timeline-h3 font-serif">${ev.title}</h3>
              ${ev.location ? `<div style="font-size:12px; color:#fda4af; margin-bottom:6px;">📍 ${ev.location}</div>` : ''}
              <p class="font-editorial" style="font-style:italic; color:#fbcfe8;">${ev.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="gallery-section">
      <h2 class="section-title font-serif">Cherished Memories</h2>
      <div class="gallery-grid">
        ${photos.map((p) => `
          <div class="polaroid-card">
            <img class="polaroid-img" src="${p.url}" alt="${p.caption}" referrerpolicy="no-referrer" />
            <div class="polaroid-caption font-script">${p.caption}</div>
            <div style="font-size:11px; color:#fda4af; margin-top:4px;">${p.date}</div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>

  <!-- Celebration Modal -->
  <div id="celebration-overlay">
    <div class="glass-card celebration-box">
      <div style="font-size: 54px; margin-bottom: 10px;">💍 ✨</div>
      <h1 class="font-script" style="font-size: 56px; color:#fde68a; margin-bottom: 12px;">She Said YES!</h1>
      <p class="font-serif" style="font-size: 20px; color:#fff; font-style:italic; margin-bottom: 20px;">
        "Two hearts joined as one, destined for eternity."
      </p>
      <p style="color:#ffe4e6; font-size:14px; line-height:1.6; margin-bottom: 24px;">
        Our new chapter begins today. Thank you for making every day feel like pure magic.
      </p>
      <button onclick="document.getElementById('celebration-overlay').style.display='none'" class="btn-yes" style="font-size:16px; padding:12px 30px;">
        Back to Memories
      </button>
    </div>
  </div>

  <script>
    // --- 1. Starry Sky Canvas ---
    const starCanvas = document.getElementById('starry-canvas');
    const sCtx = starCanvas.getContext('2d');
    let sW = (starCanvas.width = window.innerWidth);
    let sH = (starCanvas.height = window.innerHeight);

    const stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * sW,
        y: Math.random() * sH,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }

    function renderStars() {
      sCtx.clearRect(0, 0, sW, sH);
      for (const s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
        sCtx.fillStyle = 'rgba(255, 255, 255, ' + Math.abs(s.alpha) + ')';
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sCtx.fill();
      }
      requestAnimationFrame(renderStars);
    }
    renderStars();

    // --- 2. Petals Canvas ---
    const pCanvas = document.getElementById('petals-canvas');
    const pCtx = pCanvas.getContext('2d');
    let pW = (pCanvas.width = window.innerWidth);
    let pH = (pCanvas.height = window.innerHeight);

    const petals = [];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#be123c'];
    for (let i = 0; i < 28; i++) {
      petals.push({
        x: Math.random() * pW,
        y: Math.random() * pH,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.8,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function renderPetals() {
      pCtx.clearRect(0, 0, pW, pH);
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.flip += p.flipSpeed;
        if (p.y > pH + 20) { p.y = -20; p.x = Math.random() * pW; }

        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.scale(1, Math.cos(p.flip));
        pCtx.fillStyle = p.color;
        pCtx.beginPath();
        pCtx.moveTo(0, -p.size);
        pCtx.bezierCurveTo(p.size, -p.size * 0.5, p.size, p.size * 0.5, 0, p.size);
        pCtx.bezierCurveTo(-p.size, p.size * 0.5, -p.size, -p.size * 0.5, 0, -p.size);
        pCtx.fill();
        pCtx.restore();
      }
      requestAnimationFrame(renderPetals);
    }
    renderPetals();

    window.addEventListener('resize', () => {
      sW = starCanvas.width = pW = pCanvas.width = window.innerWidth;
      sH = starCanvas.height = pH = pCanvas.height = window.innerHeight;
    });

    // --- 3. Web Audio Synthesizer ---
    let audioCtx = null;
    let isPlaying = false;
    let musicInterval = null;
    const chords = [
      [146.83, 220.00, 293.66, 369.99, 440.00], // D
      [110.00, 220.00, 277.18, 329.63, 440.00], // A
      [123.47, 246.94, 293.66, 369.99, 493.88], // Bm
      [98.00, 196.00, 246.94, 293.66, 392.00]   // G
    ];

    function playNote(freq) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.3);
    }

    const musicBtn = document.getElementById('music-btn');
    musicBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (isPlaying) {
        clearInterval(musicInterval);
        isPlaying = false;
        musicBtn.textContent = '▶';
      } else {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        isPlaying = true;
        musicBtn.textContent = '⏸';
        let chordIdx = 0;
        let noteStep = 0;
        musicInterval = setInterval(() => {
          const chord = chords[chordIdx];
          playNote(chord[noteStep % chord.length]);
          noteStep++;
          if (noteStep >= chord.length) {
            noteStep = 0;
            chordIdx = (chordIdx + 1) % chords.length;
          }
        }, 360);
      }
    });

    // --- 4. Moving No Button ---
    const btnNo = document.getElementById('btn-no');
    const container = document.getElementById('btn-container');
    const playfulTexts = [
      'No', 'Are you sure? 🥺', 'Wrong button silly! 💕',
      'Try the other one! 🌸', 'Catch me! ✨', 'You can\\'t say no! 🥰'
    ];
    let dodgeCount = 0;

    function dodgeNo() {
      dodgeCount++;
      btnNo.textContent = playfulTexts[Math.min(dodgeCount, playfulTexts.length - 1)];
      const rect = container.getBoundingClientRect();
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 150;
      btnNo.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
    btnNo.addEventListener('mouseenter', dodgeNo);
    btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeNo(); });
    btnNo.addEventListener('click', (e) => { e.preventDefault(); dodgeNo(); });

    // --- 5. Celebration Fireworks & Confetti ---
    const btnYes = document.getElementById('btn-yes');
    btnYes.addEventListener('click', () => {
      document.getElementById('celebration-overlay').style.display = 'flex';
      // play celebration chime
      if (audioCtx) {
        [440, 554, 659, 880].forEach((f, i) => {
          setTimeout(() => playNote(f), i * 120);
        });
      }
    });

    // --- 6. Rose-Gold Scroll Progress Bar ---
    const scrollBar = document.getElementById('scroll-progress-bar');
    function updateScrollProgress() {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0 && scrollBar) {
        const pct = (window.scrollY / scrollTotal) * 100;
        scrollBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      }
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // --- 7. Scroll-Triggered Fade-In-Up Animation ---
    const animatedElements = document.querySelectorAll('.timeline-item, .polaroid-card');
    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      animatedElements.forEach((el) => scrollObserver.observe(el));
    } else {
      animatedElements.forEach((el) => el.classList.add('is-visible'));
    }

    // --- 8. Countdown Timer ---
    const targetDateStr = "${config.countdownDate || '2027-06-20'}";
    function updateCountdown() {
      const targetTime = new Date(targetDateStr).getTime();
      const diff = targetTime - Date.now();
      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-mins');
      const sEl = document.getElementById('cd-secs');
      if (!dEl || isNaN(targetTime)) return;
      if (diff <= 0) {
        const digitsEl = document.getElementById('countdown-digits');
        if (digitsEl) digitsEl.innerHTML = '<span style="font-family:Playfair Display, serif; font-size:18px; color:#fde047;">💍 Our Forever Journey Has Begun! ✨</span>';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      dEl.textContent = String(days).padStart(2, '0');
      hEl.textContent = String(hours).padStart(2, '0');
      mEl.textContent = String(mins).padStart(2, '0');
      sEl.textContent = String(secs).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  </script>
</body>
</html>`;
}
