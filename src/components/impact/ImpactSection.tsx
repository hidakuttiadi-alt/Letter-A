'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GraduationCap, BookOpenCheck, Award, ArrowUpRight } from 'lucide-react';

export default function ImpactSection() {
  const { t, locale } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const icons = [
    <BookOpenCheck key="1" className="w-8 h-8 text-gold-400" />,
    <GraduationCap key="2" className="w-8 h-8 text-gold-400" />,
    <Award key="3" className="w-8 h-8 text-gold-400" />,
  ];

  return (
    <section id="impact" className="w-full py-24 bg-white text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.impact.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.impact.title}
          </h2>
          <p className="text-[1.0625rem] text-[#55474B] leading-relaxed">
            {t.impact.subtitle}
          </p>
        </div>

        {/* 3 Impact Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.impact.stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="p-8 rounded-3xl bg-canvas-light border border-burgundy-100 hover:border-gold-500/80 shadow-md hover:shadow-2xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle gold glow corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/25 transition-all pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-burgundy-900 flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                  {icons[idx % icons.length]}
                </div>

                <div className="text-[2.5rem] sm:text-[2.75rem] font-black text-burgundy-900 tracking-tight leading-none mb-2 tabular-nums">
                  {stat.count}
                </div>

                <h3 className="font-bold text-[1.1875rem] text-burgundy-950 mb-3">
                  {stat.label}
                </h3>

                <p className="text-[0.875rem] text-[#55474B] leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-burgundy-100/70 flex items-center justify-between text-burgundy-800 group-hover:text-gold-600 transition-colors">
                <span className="text-[0.75rem] font-bold uppercase tracking-wider">
                  Centenary Direct Beneficiary
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote and 3 Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-canvas-light border border-burgundy-100">
          <p className="text-[0.8125rem] text-[#6B5A60] italic">
            {t.impact.footnote}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('donations')}
              className="px-5 py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem] transition-all shadow-sm"
            >
              {t.impact.ctaSupport}
            </button>
            <button
              onClick={() => scrollTo('volunteering')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-burgundy-50 text-burgundy-900 border border-burgundy-200 font-semibold text-[0.875rem] transition-all"
            >
              {t.impact.ctaVolunteer}
            </button>
            <button
              onClick={() => scrollTo('campaigns')}
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] transition-all"
            >
              {t.impact.ctaCampaigns}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
