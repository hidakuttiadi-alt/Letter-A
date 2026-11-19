'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Radio, HeartHandshake } from 'lucide-react';

export default function ClosingBanner3D() {
  const { t, locale } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth || 800);
    let height = (canvas.height = canvas.clientHeight || 360);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Iridescent Rotating Discs
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

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw 3 nested rotating iridescent gold-glass elliptical discs
      const discRadii = [
        { rx: width * 0.38, ry: height * 0.42, tilt: 0.25, speed: 1.0, color: '#C9A24B' },
        { rx: width * 0.26, ry: height * 0.32, tilt: -0.35, speed: 1.4, color: '#E5C16C' },
        { rx: width * 0.16, ry: height * 0.20, tilt: 0.5, speed: 1.9, color: '#FAF7F2' },
      ];

      discRadii.forEach((disc, i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.2 * (i % 2 === 0 ? 1 : -1) + disc.tilt);

        // Specular stroke
        ctx.beginPath();
        ctx.ellipse(0, 0, disc.rx, disc.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = disc.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.25 + Math.sin(time + i) * 0.1;
        ctx.shadowColor = 'rgba(201, 162, 75, 0.4)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Iridescent reflection node orbiting on the rim
        const orbAngle = time * disc.speed;
        const ox = Math.cos(orbAngle) * disc.rx;
        const oy = Math.sin(orbAngle) * disc.ry;

        ctx.beginPath();
        ctx.arc(ox, oy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#E5C16C';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.9;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full py-20 bg-heritage-obsidian text-canvas-light overflow-hidden border-t border-gold-500/20">
      {/* Background Kinetic Marquee Behind 3D Discs */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <div className="flex whitespace-nowrap animate-marquee-slow font-black text-[6rem] sm:text-[9rem] tracking-tighter text-gold-300">
          <span>SAMASTHA 100 • 1926–2026 • സമസ്ത 100 • നൂറാണ്ടിന്റെ ഒരുമ • </span>
          <span>SAMASTHA 100 • 1926–2026 • സമസ്ത 100 • നൂറാണ്ടിന്റെ ഒരുമ • </span>
        </div>
      </div>

      {/* 3D Iridescent Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Center Call to Action Card */}
      <div className="relative z-10 w-[92%] max-w-[840px] mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-burgundy-900/80 border border-gold-400/40 text-gold-300 text-[0.8125rem] font-bold uppercase tracking-wider mb-4 shadow">
          <img
            src="/logo.png"
            alt="Samastha Centenary Logo"
            className="w-5 h-5 object-contain rounded-sm"
          />
          <span>A CENTURY CELEBRATED TOGETHER</span>
        </div>

        <h3
          className={`font-black text-canvas-light tracking-tight leading-tight mb-4 ${
            locale === 'ml' ? 'text-[2.25rem] sm:text-[3rem]' : 'text-[2.5rem] sm:text-[3.25rem]'
          }`}
        >
          {locale === 'en'
            ? 'Honor 100 Years of Faith. Shape the Next Hundred.'
            : 'വിശ്വാസത്തിന്റെ നൂറാണ്ട് അനുസ്മരിക്കാം. അടുത്ത നൂറ്റാണ്ടിന് തുടക്കം കുറിക്കാം.'}
        </h3>

        <p className="text-[1.0625rem] text-canvas-light/80 max-w-[640px] leading-relaxed mb-8">
          {locale === 'en'
            ? 'Join our live streams, explore our historic journey, contribute to educational trusts, or step forward as a centenary volunteer.'
            : 'തത്സമയ സംപ്രേഷണങ്ങൾ കാണാം, ചരിത്ര യാത്ര അറിയാം, സ്കോളർഷിപ്പ് ഫണ്ടുകളിലേക്ക് സംഭാവന നൽകാം.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/live"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-extrabold text-[0.9375rem] shadow-xl hover:shadow-gold-500/20 transition-all"
          >
            <Radio className="w-4 h-4 text-heritage-obsidian" />
            <span>{t.hero.watchLive}</span>
          </Link>
          <Link
            href="/volunteer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 border border-gold-400/40 font-bold text-[0.9375rem] shadow-lg transition-all"
          >
            <HeartHandshake className="w-4 h-4 text-gold-300" />
            <span>{t.hero.becomeVolunteer}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
