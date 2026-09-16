import React, { useEffect, useRef } from 'react';

/**
 * Draws a beautifully proportioned, crisp vector heart on a 2D canvas
 */
function drawHeart(ctx, x, y, size, color, alpha, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;

  const s = size / 20; // scale normalization factor
  ctx.beginPath();
  // Perfect symmetrical heart path
  ctx.moveTo(0, -5 * s);
  ctx.bezierCurveTo(-5 * s, -13 * s, -13 * s, -6 * s, -13 * s, 1 * s);
  ctx.bezierCurveTo(-13 * s, 7 * s, -6 * s, 13 * s, 0, 17 * s);
  ctx.bezierCurveTo(6 * s, 13 * s, 13 * s, 7 * s, 13 * s, 1 * s);
  ctx.bezierCurveTo(13 * s, -6 * s, 5 * s, -13 * s, 0, -5 * s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function HeartConfetti({ triggerKey, duration = 3500 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!triggerKey) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Dainty white hearts
    const WHITE_COLOR = '#ffffff';

    // Generous count of small, delicate falling white hearts
    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const startX = Math.random() * width;
      const startY = -15 - Math.random() * 100;

      // Small, delicate sizes
      const size = 9 + Math.random() * 9; // 9px to 18px
      const speedY = 1.3 + Math.random() * 2.2; // Slower downward speed
      const speedX = (Math.random() - 0.5) * 2.4; // Gentle drift

      particles.push({
        x: startX,
        y: startY,
        size,
        color: WHITE_COLOR,
        vx: speedX,
        vy: speedY,
        gravity: 0.045 + Math.random() * 0.045, // Softer gravity
        drag: 0.992,
        rotation: (Math.random() - 0.5) * 0.8,
        vRot: (Math.random() - 0.5) * 0.025, // Slower rotation
        swaySpeed: 0.85 + Math.random() * 1.0, // Slower sway
        swayAmplitude: 0.6 + Math.random() * 1.4,
        swayOffset: Math.random() * Math.PI * 2,
        alpha: 0.45 + Math.random() * 0.20, // Lower, softer opacity (0.45 - 0.65)
        fadeSpeed: 0.0035 + Math.random() * 0.003, // Slower, smoother fade out
        age: 0,
      });
    }

    let animationId;
    const startTime = performance.now();

    const render = (now) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age++;

        // Physics
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;

        // Gentle horizontal sway
        p.x += p.vx + Math.sin(p.age * 0.03 * p.swaySpeed + p.swayOffset) * p.swayAmplitude;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Fade gracefully - delayed by 0.3s for longer smooth motion
        if (elapsed > 1800) {
          p.alpha -= p.fadeSpeed;
        }

        if (p.alpha > 0.01 && p.y < height + 40) {
          aliveCount++;
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        }
      }

      if (aliveCount > 0 && elapsed < duration) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [triggerKey, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
