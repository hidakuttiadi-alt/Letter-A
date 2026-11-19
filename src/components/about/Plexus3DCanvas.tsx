'use client';

import React, { useEffect, useRef } from 'react';

export default function Plexus3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth || 400);
    let height = (canvas.height = canvas.clientHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Icosahedron / Geodesic Sphere Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];

    // Normalize and scale
    const radius = Math.min(width, height) * 0.32;
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return {
        x: (x / len) * radius,
        y: (y / len) * radius,
        z: (z / len) * radius,
      };
    });

    // Edges connecting vertices with distance threshold
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.2) {
          edges.push([i, j]);
        }
      }
    }

    let rotX = 0.3;
    let rotY = 0.4;
    let rotZ = 0.1;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    let pulseTime = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      if (!isDragging) {
        rotY += 0.007;
        rotX += 0.004;
      }
      pulseTime += 0.03;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Rotate vertices
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = vertices.map((v) => {
        // Y-axis rotation
        let x1 = v.x * cosY + v.z * sinY;
        let y1 = v.y;
        let z1 = -v.x * sinY + v.z * cosY;

        // X-axis rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const fov = 350;
        const scale = fov / (fov + z2 + radius * 1.5);
        return {
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Draw Edges with subtle glowing gold stroke
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, (avgZ + radius) / (radius * 2) * 0.55);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = '#C9A24B';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      // Draw Nodes with pulsing gold halo
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const pulse = Math.sin(pulseTime + i) * 1.2;
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2) * 0.9);

        // Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, (4 + pulse) * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#E5C16C';
        ctx.globalAlpha = alpha * 0.45;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FAF7F2';
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Center floating Typography "1926 — 2026"
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillStyle = '#E5C16C';
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = 'rgba(201, 162, 75, 0.6)';
      ctx.shadowBlur = 8;
      ctx.fillText('1926 — 2026', cx, cy - 8);
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = '#FAF7F2';
      ctx.globalAlpha = 0.75;
      ctx.fillText('SAMASTHA 100', cx, cy + 12);
      ctx.restore();

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl"
        title="Interactive 3D Centenary Geometric Plexus — Click & Drag to Rotate"
      />
    </div>
  );
}
