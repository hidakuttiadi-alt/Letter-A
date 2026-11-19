'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, Sparkles, MapPin } from 'lucide-react';

export default function StoryWallMarquee() {
  const { t } = useLanguage();

  const storiesRow1 = [...t.campaigns.stories, ...t.campaigns.stories];
  const storiesRow2 = [...t.campaigns.stories.slice().reverse(), ...t.campaigns.stories.slice().reverse()];

  return (
    <div className="w-full overflow-hidden space-y-4 py-6">
      {/* Row 1: Left to Right Marquee */}
      <div className="flex whitespace-nowrap animate-marquee-slow hover:[animation-play-state:paused]">
        {storiesRow1.map((item, idx) => (
          <div
            key={`r1-${idx}`}
            className="inline-block w-[340px] sm:w-[420px] p-6 rounded-2xl bg-heritage-dark border border-gold-500/20 text-canvas-light mx-3 shadow-lg whitespace-normal shrink-0"
          >
            <div className="flex items-center justify-between mb-3 text-[0.75rem]">
              <span className="font-bold text-gold-400 uppercase tracking-wider">
                {item.year}
              </span>
              <Quote className="w-4 h-4 text-gold-400/40" />
            </div>

            <p className="text-[0.875rem] text-canvas-light/90 italic leading-relaxed mb-4">
              {item.quote}
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[0.8125rem]">
              <span className="font-bold text-canvas-light">{item.author}</span>
              <span className="text-gold-300/70 text-[0.75rem] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-500" />
                {item.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Right to Left Marquee */}
      <div className="flex whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused]">
        {storiesRow2.map((item, idx) => (
          <div
            key={`r2-${idx}`}
            className="inline-block w-[340px] sm:w-[420px] p-6 rounded-2xl bg-heritage-obsidian border border-white/10 text-canvas-light mx-3 shadow-lg whitespace-normal shrink-0"
          >
            <div className="flex items-center justify-between mb-3 text-[0.75rem]">
              <span className="font-bold text-gold-400 uppercase tracking-wider">
                {item.year}
              </span>
              <Quote className="w-4 h-4 text-gold-400/40" />
            </div>

            <p className="text-[0.875rem] text-canvas-light/90 italic leading-relaxed mb-4">
              {item.quote}
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[0.8125rem]">
              <span className="font-bold text-canvas-light">{item.author}</span>
              <span className="text-gold-300/70 text-[0.75rem] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-500" />
                {item.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
