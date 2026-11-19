'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Plexus3DCanvas from './Plexus3DCanvas';
import { BookOpen, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  const { t, locale } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative w-full py-20 bg-canvas-light text-[#1F171A] overflow-hidden">
      {/* Kinetic Marquee Band */}
      <div className="w-full bg-burgundy-950 text-gold-300 py-3.5 overflow-hidden border-y border-gold-500/30 mb-16 shadow-inner">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {[...t.marqueeValues, ...t.marqueeValues, ...t.marqueeValues].map((val, idx) => (
            <div key={idx} className="flex items-center mx-6 gap-5">
              <span className="text-[0.875rem] font-bold tracking-widest uppercase text-gold-200">
                {val}
              </span>
              <span className="w-2 h-2 rounded-full bg-gold-400/60" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-[2px] bg-gold-600" />
          <span className="text-[0.75rem] font-bold uppercase tracking-widest text-burgundy-800">
            {t.about.sectionTag}
          </span>
        </div>

        {/* 2-Column Split: Left 3D Plexus Mesh / Right Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Wireframe Plexus */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-heritage-obsidian rounded-3xl p-6 border border-gold-500/25 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-[0.6875rem] font-semibold border border-gold-400/30">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>Interactive 3D Mesh</span>
              </div>
              <Plexus3DCanvas />
              <p className="text-[0.75rem] text-gold-200/70 text-center mt-2 leading-relaxed font-medium">
                {t.about.wireframeCaption}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2
              className={`font-extrabold text-burgundy-900 tracking-tight leading-[1.2] mb-4 ${
                locale === 'ml' ? 'text-[1.875rem] sm:text-[2.25rem]' : 'text-[2rem] sm:text-[2.5rem]'
              }`}
            >
              {t.about.title}
            </h2>

            <p className="text-[1.125rem] text-burgundy-700 font-semibold mb-6">
              {t.about.subtitle}
            </p>

            <div className="space-y-4 text-[1rem] leading-relaxed text-[#4A3B40]">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* Core Values Pillars Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-8">
              <div className="p-3.5 rounded-xl bg-white border border-burgundy-100 shadow-sm flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-burgundy-800 shrink-0" />
                <span className="text-[0.875rem] font-bold text-burgundy-950">10,000+ Madrasas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-burgundy-100 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-burgundy-800 shrink-0" />
                <span className="text-[0.875rem] font-bold text-burgundy-950">Centenary Trust</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-burgundy-100 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
                <Compass className="w-5 h-5 text-burgundy-800 shrink-0" />
                <span className="text-[0.875rem] font-bold text-burgundy-950">Global Diaspora</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/journey"
                className="px-6 py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.9375rem] shadow-md hover:shadow-lg transition-all"
              >
                {t.about.exploreJourney}
              </Link>
              <button
                onClick={() => scrollTo('scholarship')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-burgundy-50 text-burgundy-900 border border-burgundy-800/20 font-semibold text-[0.9375rem] transition-colors"
              >
                {t.about.discoverInitiatives}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
