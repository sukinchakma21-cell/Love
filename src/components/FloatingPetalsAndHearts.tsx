import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  shadowColor: string;
}

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  swayAmp: number;
  swaySpeed: number;
  time: number;
  color: string;
  scale: number;
}

export const FloatingPetalsAndHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heartsPoolRef = useRef<FloatingHeart[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Rose petals palette
    const petalColors = [
      { fill: '#e11d48', shadow: 'rgba(225, 29, 72, 0.4)' }, // Crimson rose
      { fill: '#be123c', shadow: 'rgba(190, 18, 60, 0.4)' }, // Deep velvet rose
      { fill: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.35)' }, // Rose pink
      { fill: '#fb7185', shadow: 'rgba(251, 113, 133, 0.3)' }, // Soft blush
      { fill: '#fda4af', shadow: 'rgba(253, 164, 175, 0.25)' }, // Petal pink
    ];

    // Initialize Rose Petals
    const petals: Petal[] = [];
    const petalCount = Math.min(32, Math.max(16, Math.floor(width / 50)));

    for (let i = 0; i < petalCount; i++) {
      const pColor = petalColors[Math.floor(Math.random() * petalColors.length)];
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.0 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        color: pColor.fill,
        shadowColor: pColor.shadow,
      });
    }

    // Initialize Upward Floating Hearts
    const hearts: FloatingHeart[] = [];
    const heartCount = Math.min(22, Math.max(12, Math.floor(width / 70)));
    const heartColors = [
      'rgba(244, 63, 94, 0.55)',
      'rgba(251, 113, 133, 0.65)',
      'rgba(244, 114, 182, 0.55)',
      'rgba(253, 164, 175, 0.7)',
      'rgba(225, 29, 72, 0.5)',
    ];

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        swayAmp: Math.random() * 25 + 10,
        swaySpeed: Math.random() * 0.02 + 0.01,
        time: Math.random() * 100,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        scale: 1,
      });
    }
    heartsPoolRef.current = hearts;

    // Draw an organic curved rose petal
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.cos(p.flip)); // realistic 3D tumbling effect

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.shadowColor;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      // Natural teardrop / curved rose petal curve
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    // Draw a romantic heart
    const drawHeart = (h: FloatingHeart) => {
      ctx.save();
      const currentX = h.x + Math.sin(h.time * h.swaySpeed) * h.swayAmp;
      ctx.translate(currentX, h.y);
      ctx.scale(h.scale, h.scale);
      ctx.fillStyle = h.color;
      ctx.shadowColor = h.color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = h.alpha;

      const s = h.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.4);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.3, 0, s * 1.4);
      ctx.bezierCurveTo(s * 1.5, s * 0.3, s, -s * 0.5, 0, s * 0.4);
      ctx.fill();

      ctx.restore();
    };

    // Click to spawn floating hearts
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      for (let i = 0; i < 6; i++) {
        hearts.push({
          x: clientX + (Math.random() * 40 - 20),
          y: clientY + (Math.random() * 40 - 20),
          size: Math.random() * 16 + 12,
          speedY: Math.random() * 1.8 + 1.2,
          speedX: (Math.random() - 0.5) * 1.2,
          alpha: 0.9,
          swayAmp: Math.random() * 30 + 10,
          swaySpeed: Math.random() * 0.04 + 0.02,
          time: Math.random() * 50,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          scale: 1,
        });
      }
    };

    window.addEventListener('click', handlePointerDown);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw petals
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.flip) * 0.5;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawPetal(p);
      }

      // Update and draw hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y -= h.speedY;
        h.x += h.speedX;
        h.time += 1;

        // Fade out slightly as it reaches near top if extra spawned
        if (h.y < -30) {
          if (hearts.length > heartCount) {
            hearts.splice(i, 1);
            continue;
          } else {
            h.y = height + 30;
            h.x = Math.random() * width;
            h.alpha = Math.random() * 0.6 + 0.2;
          }
        }

        drawHeart(h);
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="floating-petals-hearts-canvas"
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
