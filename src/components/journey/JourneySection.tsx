'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Timeline3DCanvas from './Timeline3DCanvas';
import { Milestone, Calendar, BookOpen, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function JourneySection() {
  const { t, locale } = useLanguage();
  const [activeEraIndex, setActiveEraIndex] = useState(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="journey" className="w-full py-24 bg-heritage-obsidian text-canvas-light relative overflow-hidden border-t border-gold-500/20">
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-burgundy-950/50 via-heritage-obsidian to-heritage-obsidian pointer-events-none" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-[760px] mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.journey.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-canvas-light tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.journey.title}
          </h2>
          <p className="text-[1.0625rem] text-canvas-light/75 leading-relaxed">
            {t.journey.subtitle}
          </p>
        </div>

        {/* Pinned Split Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Eras Cards & Historical Citations */}
          <div className="lg:col-span-7 space-y-6">
            {t.journey.eras.map((era, index) => {
              const isActive = activeEraIndex === index;
              return (
                <div
                  key={era.year}
                  onClick={() => setActiveEraIndex(index)}
                  className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-heritage-dark border-gold-400 shadow-2xl scale-[1.01]'
                      : 'bg-white/5 border-white/10 hover:border-gold-500/40 hover:bg-white/10'
                  }`}
                >
                  {/* Subtle active indicator beacon */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-400" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[1.5rem] font-black tracking-tight tabular-nums ${
                          isActive ? 'text-gold-300' : 'text-canvas-light/60'
                        }`}
                      >
                        {era.year}
                      </span>
                      <span className="text-[0.6875rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-burgundy-900/80 text-gold-300 border border-gold-500/20">
                        Historical Milestone
                      </span>
                    </div>

                    {isActive && (
                      <span className="text-[0.75rem] text-gold-300 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        Pillar Active in 3D
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-[1.25rem] text-canvas-light mb-3 leading-snug">
                    {era.title}
                  </h3>

                  <p className="text-[0.9375rem] text-canvas-light/85 leading-relaxed mb-4">
                    {era.desc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-4 text-[0.8125rem]">
                    <span className="font-bold text-gold-300 block mb-1">Impact Record:</span>
                    <span className="text-canvas-light/90">{era.milestone}</span>
                  </div>

                  <div className="flex items-center justify-between text-[0.75rem] text-gold-300/70 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      Verified Source: {era.source}
                    </span>
                    <span className="text-gold-400 font-bold">Era #{index + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pinned 3D Perspective Light Pillars Canvas */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
            <div className="w-full bg-heritage-dark/95 border border-gold-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>3D Centenary Perspective Pillars</span>
              </div>
              <p className="text-[0.8125rem] text-canvas-light/70 mb-4">
                Active Era:{' '}
                <strong className="text-gold-300">
                  {t.journey.eras[activeEraIndex].year} — {t.journey.eras[activeEraIndex].title}
                </strong>
              </p>

              <Timeline3DCanvas activeEraIndex={activeEraIndex} />

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                {t.journey.eras.map((e, idx) => (
                  <button
                    key={e.year}
                    onClick={() => setActiveEraIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-[0.75rem] font-bold transition-all ${
                      activeEraIndex === idx
                        ? 'bg-gold-500 text-heritage-obsidian shadow'
                        : 'bg-white/5 text-canvas-light/60 hover:text-white'
                    }`}
                  >
                    {e.year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-burgundy-950/80 border border-gold-500/30">
          <div>
            <h4 className="font-extrabold text-[1.25rem] text-canvas-light mb-1">
              Be Part of the Centenary Chapter
            </h4>
            <p className="text-[0.875rem] text-canvas-light/75">
              The next hundred years are written through our shared participation and commitment today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] shadow"
            >
              {t.journey.ctaEvent}
            </Link>
            <Link
              href="/volunteer"
              className="px-5 py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 border border-gold-400/40 font-semibold text-[0.875rem]"
            >
              {t.journey.ctaVolunteer}
            </Link>
            <Link
              href="/donate"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-canvas-light border border-white/20 font-semibold text-[0.875rem]"
            >
              {t.journey.ctaDonate}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
