'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Clock,
  ExternalLink,
  Share2,
  BookOpen,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function NewsSection() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [readingStory, setReadingStory] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: t.news.filterAll },
    { id: 'centenary', label: t.news.filterCentenary },
    { id: 'kerala-yathra', label: t.news.filterKeralaYathra },
    { id: 'education', label: t.news.filterEducation },
    { id: 'community', label: t.news.filterCommunity },
  ];

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: 'Samastha Centenary Official News Dispatch',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('News link copied to clipboard!');
    }
  };

  const filteredItems =
    activeCategory === 'all'
      ? t.news.items
      : t.news.items.filter((item) => {
          if (activeCategory === 'centenary') return item.category.toLowerCase().includes('centenary') || item.category.includes('ശതാബ്ദി');
          if (activeCategory === 'education') return item.category.toLowerCase().includes('education') || item.category.includes('വിദ്യാഭ്യാസം');
          if (activeCategory === 'community') return item.category.toLowerCase().includes('community') || item.category.includes('സാമൂഹ്യ');
          return true;
        });

  return (
    <section id="news" className="w-full py-24 bg-canvas-light text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
              {t.news.sectionTag}
            </div>
            <h2
              className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.news.title}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[0.8125rem] font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-burgundy-800 text-gold-200 shadow-md'
                    : 'bg-white hover:bg-burgundy-50 text-burgundy-900 border border-burgundy-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Historic Archive Story: Kerala Yathra 2026 */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-burgundy-950 via-heritage-obsidian to-burgundy-900 text-canvas-light border border-gold-500/40 shadow-2xl relative overflow-hidden">
          {/* Subtle gold radiance */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-[880px]">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-gold-500 text-heritage-obsidian font-extrabold text-[0.6875rem] uppercase tracking-wider shadow">
                {t.news.featuredBadge}
              </span>
              <span className="text-[0.8125rem] text-gold-300 font-semibold tabular-nums">
                {t.news.featuredDate}
              </span>
              <span className="text-[0.8125rem] text-canvas-light/60">•</span>
              <span className="text-[0.8125rem] text-gold-200/80">
                {t.news.featuredOrganiser}
              </span>
            </div>

            <h3 className="text-[1.75rem] sm:text-[2.25rem] font-black text-canvas-light leading-snug mb-3">
              {t.news.featuredTitle}
            </h3>

            <p className="text-[1rem] font-semibold text-gold-300 mb-4">
              {t.news.featuredLeader}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-gold-500/20 text-gold-200/90 italic text-[0.9375rem] mb-6">
              {t.news.featuredQuote}
            </div>

            <p className="text-[0.9375rem] text-canvas-light/80 leading-relaxed mb-6">
              {t.news.featuredDesc}
            </p>

            <div className="text-[0.75rem] text-gold-300/70 mb-8 border-t border-white/10 pt-4">
              {t.news.sourceAttribution}
            </div>

            {/* Featured Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  setReadingStory({
                    title: t.news.featuredTitle,
                    content: `${t.news.featuredDesc}\n\n${t.news.featuredQuote}\n\n${t.news.sourceAttribution}`,
                  })
                }
                className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] transition-colors shadow-lg"
              >
                {t.news.readStory}
              </button>
              <a
                href="https://en.wikipedia.org/wiki/Samastha_Kerala_Jem-iyyathul_Ulama"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-canvas-light font-semibold text-[0.875rem] border border-white/20 transition-colors"
              >
                <span>{t.news.wikiBackground}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleShare(t.news.featuredTitle)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gold-300 border border-gold-500/20 text-[0.875rem] font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.news.shareStory}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtered Dispatches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-burgundy-100 hover:border-gold-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[0.75rem] text-[#6B5A60] mb-3">
                  <span className="font-bold uppercase tracking-wider text-burgundy-800 bg-burgundy-50 px-2.5 py-0.5 rounded-full border border-burgundy-100">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-600" />
                    {item.readTime}
                  </span>
                </div>

                <span className="text-[0.75rem] text-gold-700 font-semibold mb-2 block tabular-nums">
                  {item.date}
                </span>

                <h4 className="font-bold text-[1.125rem] text-burgundy-950 mb-3 group-hover:text-burgundy-700 transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-[0.875rem] text-[#55474B] leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-burgundy-100/60 flex items-center justify-between">
                <button
                  onClick={() =>
                    setReadingStory({
                      title: item.title,
                      content: item.desc,
                    })
                  }
                  className="text-burgundy-800 hover:text-gold-600 font-bold text-[0.8125rem] flex items-center gap-1 transition-colors"
                >
                  <span>{t.news.readStory}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleShare(item.title)}
                  className="p-1 text-[#6B5A60] hover:text-burgundy-800 transition-colors"
                  aria-label="Share story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      {readingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-[92%] max-w-[620px] bg-white border border-burgundy-200 rounded-3xl p-8 relative shadow-2xl text-[#1F171A]">
            <button
              onClick={() => setReadingStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-50 text-burgundy-800 hover:bg-burgundy-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[0.75rem] font-bold uppercase tracking-wider text-gold-600 mb-2 block">
              Official Press Release
            </span>

            <h3 className="font-extrabold text-[1.375rem] text-burgundy-950 mb-4 leading-snug">
              {readingStory.title}
            </h3>

            <div className="p-4 rounded-xl bg-canvas-light border border-burgundy-100 text-[0.9375rem] text-[#332528] leading-relaxed whitespace-pre-line max-h-[360px] overflow-y-auto mb-6">
              {readingStory.content}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-burgundy-100">
              <button
                onClick={() => handleShare(readingStory.title)}
                className="flex items-center gap-2 text-[0.875rem] text-burgundy-800 font-bold"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.news.shareStory}</span>
              </button>
              <button
                onClick={() => setReadingStory(null)}
                className="px-6 py-2 rounded-xl bg-burgundy-800 text-gold-200 font-bold text-[0.875rem]"
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
