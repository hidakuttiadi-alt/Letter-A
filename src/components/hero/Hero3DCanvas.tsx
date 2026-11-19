'use client';

import React, { useEffect, useRef } from 'react';

export default function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating 3D Centenary Numeral & Particle nodes
    interface Particle {
      x: number;
      y: number;
      z: number;
      radius: number;
      baseColor: string;
      vx: number;
      vy: number;
      vz: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(65, Math.floor(width / 25));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 800 + 100,
        radius: Math.random() * 2 + 1.2,
        baseColor: i % 3 === 0 ? '#C9A24B' : i % 3 === 1 ? '#E5C16C' : '#FAF7F2',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.6,
      });
    }

    // 3D Centenary Floating Typography Nodes
    const floatingBadges = [
      { text: '1926', xOffset: -width * 0.28, yOffset: -height * 0.18, z: 450, scale: 1 },
      { text: '100', xOffset: 0, yOffset: -height * 0.26, z: 320, scale: 1.4 },
      { text: '2026', xOffset: width * 0.28, yOffset: -height * 0.18, z: 450, scale: 1 },
    ];

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep Volumetric overhead Gold light ray
      const grad = ctx.createRadialGradient(
        width / 2 + (mouseX - width / 2) * 0.1,
        height * 0.15 + (mouseY - height / 2) * 0.05,
        10,
        width / 2,
        height * 0.5,
        width * 0.7
      );
      grad.addColorStop(0, 'rgba(201, 162, 75, 0.16)');
      grad.addColorStop(0.4, 'rgba(107, 18, 43, 0.12)');
      grad.addColorStop(1, 'rgba(22, 9, 14, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Draw particle constellation with depth
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z <= 10) p.z = 800;
        if (p.z > 800) p.z = 10;

        const parallaxX = (mouseX - cx) * 0.08 * (1 - p.z / 900);
        const parallaxY = (mouseY - cy) * 0.08 * (1 - p.z / 900);

        const scale = fov / (fov + p.z);
        const sx = cx + (p.x + parallaxX) * scale;
        const sy = cy + (p.y + parallaxY) * scale;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const alpha = Math.min(1, Math.max(0.1, (1 - p.z / 800) * 0.8));
          ctx.beginPath();
          ctx.arc(sx, sy, p.radius * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const scale2 = fov / (fov + p2.z);
              const sx2 = cx + (p2.x + parallaxX) * scale2;
              const sy2 = cy + (p2.y + parallaxY) * scale2;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(sx2, sy2);
              ctx.strokeStyle = '#C9A24B';
              ctx.globalAlpha = (1 - dist / 110) * 0.22 * alpha;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Render Floating 3D Centenary Depth Badges (1926, 100, 2026)
      for (const badge of floatingBadges) {
        const floatY = Math.sin(time + badge.z * 0.01) * 8;
        const parallaxX = (mouseX - cx) * 0.04;
        const parallaxY = (mouseY - cy) * 0.04;

        const scale = fov / (fov + badge.z);
        const sx = cx + (badge.xOffset + parallaxX) * scale;
        const sy = cy + (badge.yOffset + parallaxY + floatY) * scale;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(scale * badge.scale, scale * badge.scale);

        // Glass badge backdrop
        ctx.beginPath();
        ctx.roundRect(-42, -18, 84, 36, 18);
        ctx.fillStyle = 'rgba(107, 18, 43, 0.45)';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 162, 75, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glowing Typography
        ctx.font = 'bold 0.9375rem system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#E5C16C';
        ctx.globalAlpha = 0.95;
        ctx.fillText(badge.text, 0, 1);
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
