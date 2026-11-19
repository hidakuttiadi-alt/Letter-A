'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CampaignModal from './CampaignModal';
import StoryWallMarquee from './StoryWallMarquee';
import { BookOpen, Clock, MessageSquareQuote, Sparkles, HeartHandshake } from 'lucide-react';

export default function CampaignsSection() {
  const { t, locale } = useLanguage();
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

  const campaignIcons = [
    <BookOpen key="1" className="w-6 h-6 text-gold-400" />,
    <Clock key="2" className="w-6 h-6 text-gold-400" />,
    <MessageSquareQuote key="3" className="w-6 h-6 text-gold-400" />,
  ];

  return (
    <section id="campaigns" className="w-full py-24 bg-heritage-obsidian text-canvas-light relative overflow-hidden border-t border-gold-500/20">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-burgundy-950/40 via-heritage-obsidian to-heritage-obsidian pointer-events-none" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.campaigns.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-canvas-light tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.campaigns.title}
          </h2>
          <p className="text-[1.0625rem] text-canvas-light/75 leading-relaxed">
            {t.campaigns.subtitle}
          </p>
        </div>

        {/* 3 Interactive Campaign Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {t.campaigns.list.map((camp, idx) => (
            <div
              key={camp.id}
              className="p-8 rounded-3xl bg-heritage-dark/90 border border-gold-500/30 hover:border-gold-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-all pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-burgundy-900 border border-gold-400/40 flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                  {campaignIcons[idx % campaignIcons.length]}
                </div>

                <h3 className="font-extrabold text-[1.375rem] text-canvas-light mb-3 leading-snug group-hover:text-gold-200 transition-colors">
                  {camp.title}
                </h3>

                <p className="text-[0.875rem] text-canvas-light/80 leading-relaxed mb-6">
                  {camp.tagline}
                </p>

                {/* Live Progress Bar & Target */}
                <div className="mb-6">
                  <div className="flex justify-between items-center text-[0.8125rem] font-bold mb-2 tabular-nums">
                    <span className="text-gold-300">{camp.countLabel}</span>
                    <span className="text-gold-400">{camp.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full transition-all duration-500"
                      style={{ width: `${camp.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedCampaign(camp)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-heritage-obsidian font-extrabold text-[0.875rem] shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-heritage-obsidian" />
                  <span>{camp.cta}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Story Wall Heading & Counter-Scrolling Dual-Row Marquee */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center max-w-[680px] mx-auto mb-8">
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-gold-400 block mb-2">
              LIVING ARCHIVES & VOICES
            </span>
            <h3 className="font-extrabold text-[1.625rem] text-canvas-light mb-2">
              {t.campaigns.storyWallTitle}
            </h3>
            <p className="text-[0.875rem] text-canvas-light/70">
              {t.campaigns.storyWallSubtitle}
            </p>
          </div>

          <StoryWallMarquee />

          <div className="text-center mt-6">
            <button
              onClick={() => setSelectedCampaign(t.campaigns.list[2])}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-gold-300 border border-gold-500/30 text-[0.8125rem] font-semibold transition-colors"
            >
              + Submit Your Family’s Centenary Reflection
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Participation Modal */}
      {selectedCampaign && (
        <CampaignModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </section>
  );
}
