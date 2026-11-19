'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  GraduationCap,
  BookMarked,
  Heart,
  Scale,
  Handshake,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

export default function ScholarshipSection() {
  const { t, locale } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const icons = [
    <BookMarked key="1" className="w-6 h-6 text-burgundy-700" />,
    <GraduationCap key="2" className="w-6 h-6 text-burgundy-700" />,
    <Heart key="3" className="w-6 h-6 text-burgundy-700" />,
    <Scale key="4" className="w-6 h-6 text-burgundy-700" />,
    <Handshake key="5" className="w-6 h-6 text-burgundy-700" />,
    <Lightbulb key="6" className="w-6 h-6 text-burgundy-700" />,
  ];

  return (
    <section id="scholarship" className="w-full py-24 bg-white text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Left Intro Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-4">
              {t.scholarship.sectionTag}
            </div>

            <h2
              className={`font-extrabold text-burgundy-900 tracking-tight leading-[1.2] mb-5 ${
                locale === 'ml' ? 'text-[1.875rem] sm:text-[2.25rem]' : 'text-[2rem] sm:text-[2.5rem]'
              }`}
            >
              {t.scholarship.title}
            </h2>

            <div className="p-4 rounded-2xl bg-canvas-light border-l-4 border-gold-500 mb-6 shadow-sm">
              <p className="text-[0.9375rem] italic text-burgundy-950 font-medium leading-relaxed">
                {t.scholarship.statement}
              </p>
            </div>

            <p className="text-[0.875rem] text-[#55474B] leading-relaxed mb-8">
              {t.scholarship.closingInvitation}
            </p>

            {/* 3 Left Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/journey"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 text-[0.875rem] font-bold transition-all shadow-sm"
              >
                <span>{t.scholarship.ctaHistory}</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </Link>
              <Link
                href="/donate"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-burgundy-50 text-burgundy-900 border border-burgundy-200 text-[0.875rem] font-semibold transition-all"
              >
                <span>{t.scholarship.ctaEducation}</span>
                <ArrowRight className="w-4 h-4 text-burgundy-700" />
              </Link>
              <Link
                href="/volunteer"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-canvas-light hover:bg-gold-50 text-gold-700 border border-gold-400/40 text-[0.875rem] font-semibold transition-all"
              >
                <span>{t.scholarship.ctaVolunteer}</span>
                <ArrowRight className="w-4 h-4 text-gold-600" />
              </Link>
            </div>
          </div>

          {/* Right Bento Grid of 6 Hover-Illuminating Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.scholarship.cards.map((card, index) => (
              <div
                key={card.id}
                className="group p-6 rounded-2xl bg-canvas-light border border-burgundy-900/10 hover:border-gold-500 hover:bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Hover Radial Illumination Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/25 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-burgundy-50 border border-burgundy-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
                      {icons[index % icons.length]}
                    </div>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-burgundy-100/60 text-burgundy-800">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-burgundy-950 text-[1.125rem] mb-2 group-hover:text-burgundy-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-[0.875rem] text-[#55474B] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-burgundy-100/60 flex items-center gap-1.5 text-gold-600 group-hover:text-gold-500 text-[0.8125rem] font-bold">
                  <span>Centenary Legacy Pillar #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
