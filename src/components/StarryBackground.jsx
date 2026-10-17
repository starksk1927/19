import React, { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.4 ? '#67e8f9' : Math.random() > 0.5 ? '#f472b6' : '#ffffff',
    }));

    // Floating particles / hearts
    const hearts = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.15,
      char: Math.random() > 0.4 ? '🩵' : Math.random() > 0.5 ? '✨' : '🌸',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep celestial gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#040714');
      gradient.addColorStop(0.5, '#0a1128');
      gradient.addColorStop(1, '#130d24');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw glowing nebulae
      const radGrad = ctx.createRadialGradient(
        width * 0.2, height * 0.3, 20,
        width * 0.2, height * 0.3, width * 0.5
      );
      radGrad.addColorStop(0, 'rgba(34, 211, 238, 0.07)');
      radGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      const radGrad2 = ctx.createRadialGradient(
        width * 0.8, height * 0.7, 20,
        width * 0.8, height * 0.7, width * 0.5
      );
      radGrad2.addColorStop(0, 'rgba(244, 114, 182, 0.06)');
      radGrad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGrad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = star.size > 1 ? 8 : 2;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render floating hearts & emojis
      ctx.globalAlpha = 1;
      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.x += h.speedX;

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }

        ctx.font = `${h.size}px serif`;
        ctx.globalAlpha = h.opacity;
        ctx.fillText(h.char, h.x, h.y);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
