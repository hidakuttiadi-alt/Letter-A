'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Users, Shield, Globe2, Sparkles, Building, BookOpen } from 'lucide-react';

export default function KpiSection() {
  const { t, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const statIcons = [
    <Users key="1" className="w-5 h-5 text-gold-400" />,
    <Shield key="2" className="w-5 h-5 text-gold-400" />,
    <Building key="3" className="w-5 h-5 text-gold-400" />,
    <Globe2 key="4" className="w-5 h-5 text-gold-400" />,
    <BookOpen key="5" className="w-5 h-5 text-gold-400" />,
    <Sparkles key="6" className="w-5 h-5 text-gold-400" />,
  ];

  return (
    <section
      id="highlights"
      className="w-full py-24 bg-heritage-obsidian text-canvas-light relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-burgundy-950/40 via-heritage-obsidian to-heritage-obsidian pointer-events-none" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Footnote */}
          <div className="lg:col-span-5">
            <div className="inline-block px-3 py-1 rounded-full bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider mb-4">
              CENTENARY DEMOGRAPHIC FOOTPRINT
            </div>

            <h2
              className={`font-extrabold text-canvas-light tracking-tight leading-[1.2] mb-4 ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.kpi.title}
            </h2>

            <p className="text-[1.0625rem] text-canvas-light/75 leading-relaxed mb-8">
              {t.kpi.subtitle}
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[0.8125rem] text-gold-300/80 leading-relaxed backdrop-blur-sm">
              <span className="font-semibold text-gold-300">Audited Source: </span>
              {t.kpi.footnote}
            </div>
          </div>

          {/* Right Column: Interactive Pointer-Illuminated KPI Grid */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 relative rounded-3xl p-2"
          >
            {/* Dynamic Cursor Spotlight Beam */}
            <div
              className="absolute pointer-events-none transition-opacity duration-300 rounded-3xl"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 75, 0.18), transparent 70%)`,
              }}
            />

            {t.kpi.stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="p-6 rounded-2xl bg-heritage-dark/80 border border-white/10 hover:border-gold-500/50 hover:bg-burgundy-950/40 backdrop-blur-md transition-all duration-300 shadow-lg relative group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-gold-400/90 px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                    {stat.org.split(' ')[0]}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 text-gold-400 group-hover:scale-110 transition-transform">
                    {statIcons[idx % statIcons.length]}
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-[2rem] sm:text-[2.25rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 tabular-nums tracking-tight">
                    {stat.count}
                  </div>
                  <div className="text-[0.9375rem] font-bold text-canvas-light mt-0.5">
                    {stat.label}
                  </div>
                </div>

                <p className="text-[0.75rem] text-canvas-light/60 border-t border-white/10 pt-2.5 mt-2">
                  {stat.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
