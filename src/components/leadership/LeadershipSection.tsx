'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Quote, ChevronRight, X } from 'lucide-react';

export default function LeadershipSection() {
  const { t, locale } = useLanguage();
  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);

  // 3D Card Tilt Handler
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleResetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="leadership" className="w-full py-24 bg-heritage-obsidian text-canvas-light relative overflow-hidden border-t border-gold-500/20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-burgundy-900/30 via-heritage-obsidian to-heritage-obsidian pointer-events-none" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-[720px] mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.leadership.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-canvas-light tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.leadership.title}
          </h2>
          <p className="text-[1.0625rem] text-canvas-light/75 leading-relaxed">
            {t.leadership.subtitle}
          </p>
        </div>

        {/* 3 Tilting Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.leadership.leaders.map((leader, index) => (
            <div
              key={leader.id}
              onMouseMove={handleTilt}
              onMouseLeave={handleResetTilt}
              className="p-7 rounded-3xl bg-heritage-dark/90 border border-gold-500/30 hover:border-gold-400 shadow-xl transition-transform duration-200 ease-out flex flex-col justify-between relative group overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Subtle gold specular sheen */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-all pointer-events-none" />

              <div>
                {/* Emblem Portrait Avatar Frame */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-burgundy-900 to-burgundy-700 border-2 border-gold-400/60 p-1 flex items-center justify-center shadow-lg mb-6 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-xl bg-heritage-obsidian flex items-center justify-center text-gold-300 font-extrabold text-[1.125rem] tracking-wider">
                    {leader.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                  </div>
                </div>

                <span className="text-[0.75rem] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                  {leader.role.split(',')[0]}
                </span>

                <h3 className="font-extrabold text-[1.375rem] text-canvas-light mb-2 leading-snug group-hover:text-gold-200 transition-colors">
                  {leader.name}
                </h3>

                <p className="text-[0.8125rem] text-gold-200/70 mb-4 font-medium">
                  {leader.role}
                </p>

                {/* Quote Snippet */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-6 text-[0.8125rem] text-canvas-light/85 italic leading-relaxed relative">
                  <Quote className="w-4 h-4 text-gold-400/40 absolute top-2 right-2" />
                  {leader.quote}
                </div>
              </div>

              {/* View Full Bio Button */}
              <button
                onClick={() => setSelectedLeader(leader)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-gold-500 hover:text-heritage-obsidian text-gold-200 font-semibold text-[0.8125rem] flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Read Scholastic Biography</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Biography Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-[92%] max-w-[560px] bg-heritage-dark border border-gold-500/40 rounded-3xl p-8 relative shadow-2xl text-canvas-light">
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-canvas-light hover:text-gold-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-burgundy-900 border-2 border-gold-400 flex items-center justify-center text-gold-300 font-extrabold text-[1.125rem]">
                {selectedLeader.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h3 className="font-bold text-[1.375rem] text-canvas-light">{selectedLeader.name}</h3>
                <p className="text-[0.8125rem] text-gold-300">{selectedLeader.role}</p>
              </div>
            </div>

            <div className="space-y-4 text-[0.9375rem] leading-relaxed text-canvas-light/85">
              <p>{selectedLeader.bio}</p>
              <div className="p-4 rounded-xl bg-burgundy-950/70 border border-gold-500/30 text-gold-200 italic">
                {selectedLeader.quote}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2 rounded-xl bg-gold-500 text-heritage-obsidian font-bold text-[0.875rem] hover:bg-gold-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
