'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Hero3DCanvas from './Hero3DCanvas';
import { Radio, Compass, HeartHandshake, UserPlus, Sparkles, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t, locale } = useLanguage();

  const scrollToExplore = () => {
    const el = document.getElementById('about') || document.getElementById('explore');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100vh] w-full flex items-center justify-center pt-28 pb-20 overflow-hidden bg-heritage-obsidian"
    >
      {/* Background Architectural Atmosphere & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-burgundy-950/70 via-heritage-obsidian to-heritage-obsidian z-0 pointer-events-none" />
      
      {/* Subtle Geometric Laser Gridlines in Gold */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,162,75,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,162,75,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3D Depth & Particle WebGL/Canvas Layer */}
      <Hero3DCanvas />

      {/* Center Hero Editorial Content */}
      <div className="relative z-10 w-[92%] max-w-[1200px] mx-auto text-center flex flex-col items-center">
        {/* Centenary Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-burgundy-900/80 border border-gold-400/40 text-gold-300 shadow-lg backdrop-blur-md mb-6 animate-pulse-subtle">
          <img
            src="/logo.png"
            alt="Samastha Centenary Logo"
            className="w-5 h-5 object-contain rounded-sm"
          />
          <span className="text-[0.8125rem] sm:text-[0.875rem] font-semibold tracking-wide">
            {t.hero.eyebrow}
          </span>
        </div>

        {/* Display H1 with Gold Highlight */}
        <h1
          className={`font-extrabold text-canvas-light tracking-tight leading-[1.12] mb-6 max-w-[1080px] ${
            locale === 'ml'
              ? 'text-[2.25rem] sm:text-[3rem] md:text-[3.75rem]'
              : 'text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem]'
          }`}
        >
          {locale === 'en' ? (
            <>
              A Century of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">Faith</span>.{' '}
              A Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">Together</span>.
            </>
          ) : (
            <>
              വിശ്വാസത്തിന്റെ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">നൂറാണ്ട്</span>.{' '}
              ഒരുമയുടെ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">പുതുഭാവി</span>.
            </>
          )}
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-canvas-light/80 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] max-w-[820px] leading-relaxed mb-10 font-normal">
          {t.hero.subtitle}
        </p>

        {/* 4 Above-the-Fold Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full max-w-[960px] mb-12">
          {/* 1. Watch Live -> /live */}
          <Link
            href="/live"
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-burgundy-700 to-burgundy-800 hover:from-burgundy-600 hover:to-burgundy-700 text-canvas-light font-bold text-[0.9375rem] border border-gold-400/40 shadow-lg hover:shadow-gold-500/20 hover:-translate-y-0.5 transition-all group"
          >
            <Radio className="w-4 h-4 text-red-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>{t.hero.watchLive}</span>
          </Link>

          {/* 2. Explore Centenary Journey -> /journey */}
          <Link
            href="/journey"
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-heritage-obsidian font-bold text-[0.9375rem] border border-gold-300 shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5 transition-all"
          >
            <Compass className="w-4 h-4 text-heritage-obsidian" />
            <span>{locale === 'en' ? 'Centenary Journey' : 'ചരിത്ര യാത്ര'}</span>
          </Link>

          {/* 3. Support the Mission -> /donate */}
          <Link
            href="/donate"
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-canvas-light font-semibold text-[0.9375rem] border border-white/20 hover:border-gold-400/50 backdrop-blur-md hover:-translate-y-0.5 transition-all"
          >
            <HeartHandshake className="w-4 h-4 text-gold-400" />
            <span>{t.hero.supportMission}</span>
          </Link>

          {/* 4. Become a Volunteer -> /volunteer */}
          <Link
            href="/volunteer"
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-burgundy-950/80 hover:bg-burgundy-900 text-gold-200 font-semibold text-[0.9375rem] border border-gold-500/30 hover:border-gold-400 hover:-translate-y-0.5 transition-all"
          >
            <UserPlus className="w-4 h-4 text-gold-400" />
            <span>{t.hero.becomeVolunteer}</span>
          </Link>
        </div>

        {/* Bottom Social Proof Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-[0.8125rem] text-gold-300/90 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold tabular-nums">{t.hero.activeParticipantsBadge}</span>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToExplore}
          className="mt-12 text-gold-400/60 hover:text-gold-300 transition-colors flex flex-col items-center gap-1 focus:outline-none"
          aria-label="Scroll to explore sections"
        >
          <span className="text-[0.6875rem] uppercase tracking-widest font-semibold">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
