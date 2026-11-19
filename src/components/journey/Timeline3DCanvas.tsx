'use client';

import React, { useEffect, useRef } from 'react';

interface Timeline3DCanvasProps {
  activeEraIndex: number;
}

export default function Timeline3DCanvas({ activeEraIndex }: Timeline3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth || 450);
    let height = (canvas.height = canvas.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pillars data for eras: 1926, 1951, 1989, 2026
    const pillarPositions = [
      { year: '1926', x: -120, z: 220, targetHeight: 90 },
      { year: '1951', x: -40, z: 160, targetHeight: 130 },
      { year: '1989', x: 40, z: 100, targetHeight: 180 },
      { year: '2026', x: 120, z: 40, targetHeight: 240 },
    ];

    let currentHeights = [0, 0, 0, 0];
    let time = 0;

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.72; // Horizon position
      const fov = 350;

      // Draw 3D Perspective Grid Floor
      ctx.strokeStyle = 'rgba(201, 162, 75, 0.12)';
      ctx.lineWidth = 1;

      // Longitudinal vanishing lines
      for (let x = -240; x <= 240; x += 40) {
        const pNear = { x: cx + x * 2.2, y: height };
        const pFar = { x: cx + x * 0.25, y: cy - 40 };
        ctx.beginPath();
        ctx.moveTo(pNear.x, pNear.y);
        ctx.lineTo(pFar.x, pFar.y);
        ctx.stroke();
      }

      // Latitudinal grid lines
      for (let z = 20; z <= 300; z += 35) {
        const scale = fov / (fov + z);
        const y = cy + (1 - scale) * (height - cy) * 1.5;
        const w = width * scale * 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - w / 2, y);
        ctx.lineTo(cx + w / 2, y);
        ctx.stroke();
      }

      // Animate and draw 4 vertical glowing pillars
      pillarPositions.forEach((pillar, i) => {
        const isActive = activeEraIndex === i;
        const target = isActive ? pillar.targetHeight + 30 : pillar.targetHeight;
        currentHeights[i] += (target - currentHeights[i]) * 0.08;

        const h = currentHeights[i];
        const scale = fov / (fov + pillar.z);
        const px = cx + pillar.x * scale * 1.6;
        const pyBottom = cy + (1 - scale) * (height - cy) * 1.4;
        const pyTop = pyBottom - h * scale;

        // Pillar Beam Gradient
        const grad = ctx.createLinearGradient(px, pyBottom, px, pyTop);
        if (isActive) {
          grad.addColorStop(0, 'rgba(107, 18, 43, 0.2)');
          grad.addColorStop(0.5, 'rgba(201, 162, 75, 0.85)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
        } else {
          grad.addColorStop(0, 'rgba(107, 18, 43, 0.1)');
          grad.addColorStop(1, 'rgba(201, 162, 75, 0.35)');
        }

        // Draw Pillar Cylinder / Bar
        const barWidth = (isActive ? 14 : 9) * scale;
        ctx.beginPath();
        ctx.moveTo(px - barWidth / 2, pyBottom);
        ctx.lineTo(px - barWidth / 2, pyTop);
        ctx.lineTo(px + barWidth / 2, pyTop);
        ctx.lineTo(px + barWidth / 2, pyBottom);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Glowing Top Orb
        const orbRadius = (isActive ? 7 : 4) * scale;
        const pulse = isActive ? Math.sin(time * 3) * 2 : 0;

        ctx.beginPath();
        ctx.arc(px, pyTop, orbRadius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#FFFFFF' : '#E5C16C';
        ctx.shadowColor = '#E5C16C';
        ctx.shadowBlur = isActive ? 16 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Vertical Laser Light Trail (if active)
        if (isActive) {
          ctx.beginPath();
          ctx.moveTo(px, pyTop);
          ctx.lineTo(px, 10);
          ctx.strokeStyle = 'rgba(229, 193, 108, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Year Label at Base
        ctx.font = `${isActive ? 'bold 0.75rem' : '0.625rem'} system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = isActive ? '#E5C16C' : 'rgba(250, 247, 242, 0.6)';
        ctx.fillText(pillar.year, px, pyBottom + 18);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [activeEraIndex]);

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-3xl"
        title="3D Perspective Floor Grid with Rising Centenary Light Pillars"
      />
    </div>
  );
}
