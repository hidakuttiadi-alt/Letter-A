'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Play, Clock, ExternalLink, Sparkles, X, Video } from 'lucide-react';

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function MediaSection() {
  const { t, locale } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState<any | null>(null);

  const openExternalChannel = () => {
    window.open('https://www.youtube.com/@SamasthaGraph', '_blank', 'noreferrer');
  };

  return (
    <section id="media" className="w-full py-24 bg-canvas-light text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
              {t.media.sectionTag}
            </div>
            <h2
              className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.media.title}
            </h2>
            <p className="text-[1.0625rem] text-[#55474B] mt-2 max-w-[620px]">
              {t.media.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openExternalChannel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[0.875rem] shadow transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>{t.media.btnSubscribe}</span>
            </button>
          </div>
        </div>

        {/* Featured Video Spotlight */}
        <div className="mb-12 p-8 rounded-3xl bg-heritage-obsidian text-canvas-light border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video Player Mockup */}
            <div className="lg:col-span-7">
              <div
                onClick={() =>
                  setPlayingVideo({
                    title: t.media.featuredVideoTitle,
                    desc: t.media.featuredVideoDesc,
                  })
                }
                className="relative aspect-video w-full rounded-2xl bg-black border border-gold-500/40 overflow-hidden cursor-pointer group shadow-xl flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center z-20 group-hover:scale-110 shadow-2xl transition-transform">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-[0.8125rem] text-gold-300 font-semibold flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-black/60 border border-white/20 text-white text-[0.75rem]">
                    45:00
                  </span>
                  <span>Centenary Master Documentary</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Story Information */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-burgundy-900 border border-gold-500/30 text-gold-300 text-[0.6875rem] font-bold uppercase tracking-wider">
                  Featured Presentation
                </span>
                <span className="text-[0.75rem] text-gold-400 font-semibold">{t.media.channelHandle}</span>
              </div>

              <h3 className="font-black text-[1.5rem] sm:text-[1.75rem] text-canvas-light mb-4 leading-snug">
                {t.media.featuredVideoTitle}
              </h3>

              <p className="text-[0.9375rem] text-canvas-light/80 leading-relaxed mb-6">
                {t.media.featuredVideoDesc}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setPlayingVideo({
                      title: t.media.featuredVideoTitle,
                      desc: t.media.featuredVideoDesc,
                    })
                  }
                  className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] flex items-center gap-2 shadow transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Documentary</span>
                </button>
                <button
                  onClick={openExternalChannel}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-canvas-light font-semibold text-[0.875rem] border border-white/15 flex items-center gap-2 transition-colors"
                >
                  <span>{t.media.btnChannel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Grid of Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.media.videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setPlayingVideo(vid)}
              className="p-5 rounded-2xl bg-white border border-burgundy-100 hover:border-gold-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-video w-full rounded-xl bg-heritage-obsidian mb-4 overflow-hidden flex items-center justify-center border border-burgundy-100">
                  <div className="w-10 h-10 rounded-full bg-burgundy-900 text-gold-300 flex items-center justify-center group-hover:scale-110 shadow transition-transform">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[0.6875rem] font-mono tabular-nums">
                    {vid.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[0.6875rem] mb-2">
                  <span className="font-bold text-burgundy-800 uppercase px-2 py-0.5 rounded bg-burgundy-50 border border-burgundy-100">
                    {vid.badge}
                  </span>
                  <span className="text-[#7A696F]">{vid.date}</span>
                </div>

                <h4 className="font-bold text-[0.9375rem] text-burgundy-950 group-hover:text-burgundy-700 transition-colors leading-snug">
                  {vid.title}
                </h4>
              </div>

              <div className="pt-3 mt-4 border-t border-burgundy-100/60 flex items-center justify-between text-[0.75rem] font-semibold text-gold-700">
                <span>Play in Player</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Playback Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-[92%] max-w-[800px] bg-heritage-dark border border-gold-500/40 rounded-3xl p-6 sm:p-8 relative shadow-2xl text-canvas-light">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-canvas-light hover:text-gold-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-[1.25rem] text-canvas-light mb-4 pr-10 leading-snug">
              {playingVideo.title}
            </h3>

            {/* Simulated 1080p Web Video Player */}
            <div className="aspect-video w-full rounded-2xl bg-black border border-white/20 mb-5 relative flex items-center justify-center overflow-hidden">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-burgundy-800 border-2 border-gold-400 flex items-center justify-center mx-auto mb-3 shadow">
                  <Play className="w-7 h-7 text-gold-300 ml-1" />
                </div>
                <p className="text-[0.875rem] text-gold-300 font-semibold mb-1">
                  Playing Stream from @SamasthaGraph
                </p>
                <p className="text-[0.75rem] text-canvas-light/60">
                  High-definition 1080p audio-visual transmission loaded
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[0.8125rem]">
              <span className="text-gold-400 font-semibold">Official Samastha 100 Media Archive</span>
              <button
                onClick={openExternalChannel}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>Open in YouTube</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
