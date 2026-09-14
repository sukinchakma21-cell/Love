import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarrySkyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars pool
    const starColors = [
      '#ffffff',
      '#ffe4e6', // rose tint
      '#fef08a', // warm golden tint
      '#e0e7ff', // celestial indigo tint
      '#fbcfe8', // soft pink tint
    ];

    let stars: Star[] = [];
    const initStars = () => {
      const starCount = Math.floor((width * height) / 3200);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          targetAlpha: Math.random() * 0.9 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 7,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 degrees
        alpha: 1,
        active: true,
      });
    };

    let lastShootingStarTime = Date.now();

    const render = () => {
      // Clear with deep midnight cosmic background
      ctx.clearRect(0, 0, width, height);

      // Deep sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040714');
      skyGrad.addColorStop(0.4, '#090d24');
      skyGrad.addColorStop(0.8, '#13112c');
      skyGrad.addColorStop(1, '#090818');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient celestial nebula dust glows
      const nebula1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        0,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      nebula1.addColorStop(0, 'rgba(159, 18, 57, 0.14)'); // rose / crimson glow
      nebula1.addColorStop(0.5, 'rgba(88, 28, 135, 0.08)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.6
      );
      nebula2.addColorStop(0, 'rgba(79, 70, 229, 0.12)'); // violet-blue
      nebula2.addColorStop(0.6, 'rgba(190, 24, 93, 0.06)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw Twinkling Stars
      for (const star of stars) {
        // Twinkle interpolation
        if (Math.abs(star.alpha - star.targetAlpha) < 0.05) {
          star.targetAlpha = Math.random() * 0.9 + 0.1;
        }
        star.alpha += (star.targetAlpha - star.alpha) * star.twinkleSpeed;

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 2;
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Check shooting star trigger (roughly every 4-7 seconds)
      const now = Date.now();
      if (now - lastShootingStarTime > 4500 && Math.random() < 0.03) {
        createShootingStar();
        lastShootingStarTime = now;
      }

      // Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        const endX = ss.x + Math.cos(ss.angle) * ss.length;
        const endY = ss.y + Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        grad.addColorStop(0.4, `rgba(253, 164, 175, ${ss.alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Sparkle head
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starry-night-canvas"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
