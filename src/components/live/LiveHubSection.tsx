'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation } from '@/context/ParticipationContext';
import {
  Radio,
  Clock,
  MapPin,
  Globe,
  Bell,
  Play,
  Volume2,
  Maximize2,
  ChevronDown,
  Navigation,
  Film,
  Sparkles,
} from 'lucide-react';

export default function LiveHubSection() {
  const { t, locale } = useLanguage();
  const { addReminder } = useParticipation();

  const [streamState, setStreamState] = useState<'live' | 'soon' | 'offline' | 'recorded'>('live');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVenueGuide, setShowVenueGuide] = useState(false);

  // Tabular Countdown Timer for Next Conclave
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSetReminder = () => {
    addReminder({
      title: t.liveHub.currentBroadcastTitle,
      speaker: t.liveHub.currentBroadcastSpeaker,
      venue: t.liveHub.currentBroadcastVenue,
      time: 'Next Conclave (Countdown Active)',
    });
  };

  return (
    <section id="live-hub" className="w-full py-24 bg-heritage-obsidian text-canvas-light relative overflow-hidden border-t border-gold-500/20">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-burgundy-950/60 via-heritage-obsidian to-heritage-obsidian pointer-events-none" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        {/* Section Header with Live Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{t.liveHub.sectionTag}</span>
            </div>
            <h2
              className={`font-extrabold text-canvas-light tracking-tight leading-[1.2] ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.liveHub.title}
            </h2>
            <p className="text-[1.0625rem] text-canvas-light/75 mt-2 max-w-[620px]">
              {t.liveHub.subtitle}
            </p>
          </div>

          {/* Interactive Stream Status State Switcher */}
          <div className="flex items-center p-1.5 rounded-2xl bg-heritage-dark border border-white/10 shadow-lg">
            {(
              [
                { id: 'live', label: t.liveHub.statusLive },
                { id: 'soon', label: t.liveHub.statusSoon },
                { id: 'offline', label: t.liveHub.statusOffline },
                { id: 'recorded', label: t.liveHub.statusRecorded },
              ] as const
            ).map((state) => (
              <button
                key={state.id}
                onClick={() => setStreamState(state.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[0.8125rem] font-bold transition-all ${
                  streamState === state.id
                    ? 'bg-burgundy-800 text-gold-300 border border-gold-400/40 shadow-md'
                    : 'text-canvas-light/60 hover:text-canvas-light'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Command Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: 3D Perspective Player Frame */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative aspect-video w-full rounded-3xl bg-black border-2 border-gold-500/30 overflow-hidden shadow-2xl group flex items-center justify-center">
              {/* Perspective Frame Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10 pointer-events-none" />

              {/* Broadcast Visual Simulator */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-burgundy-900/60 via-heritage-obsidian to-black flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-burgundy-800/80 border-2 border-gold-400/80 flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-gold-300 ml-1" />
                </div>
                <span className="text-[0.75rem] font-bold uppercase tracking-widest text-gold-400 mb-1">
                  {streamState === 'live'
                    ? 'HD Live Broadcast Transmission'
                    : streamState === 'soon'
                    ? 'Broadcast Commencing Shortly'
                    : streamState === 'offline'
                    ? 'Stream Transmission Offline'
                    : 'Archived Master Recording'}
                </span>
                <p className="text-[1.25rem] font-extrabold text-canvas-light max-w-[500px]">
                  {t.liveHub.currentBroadcastTitle}
                </p>
              </div>

              {/* Top Controls Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[0.75rem] font-bold">
                  {streamState === 'live' && (
                    <span className="flex items-center gap-1.5 text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      LIVE (142,500 Viewers)
                    </span>
                  )}
                  {streamState === 'soon' && <span className="text-amber-400">STARTING SOON</span>}
                  {streamState === 'offline' && <span className="text-gray-400">OFFLINE</span>}
                  {streamState === 'recorded' && <span className="text-gold-300">RECORDED 1080P</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-canvas-light border border-white/10"
                    aria-label="Toggle Volume"
                  >
                    <Volume2 className="w-4 h-4 text-gold-400" />
                  </button>
                  <button
                    onClick={() => alert('Full-screen streaming mode opened')}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-canvas-light border border-white/10"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              </div>

              {/* Bottom Stream Details Pill */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 text-[0.8125rem] text-canvas-light/90">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    {t.liveHub.currentBroadcastVenue}
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-gold-300/80">
                    <Globe className="w-3.5 h-3.5" />
                    {t.liveHub.currentBroadcastLang}
                  </span>
                </div>
                <button
                  onClick={handleSetReminder}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.75rem] shadow-md transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{t.liveHub.btnReminder}</span>
                </button>
              </div>
            </div>

            {/* Live Time-Stamped Announcements Dispatch Feed */}
            <div className="p-6 rounded-2xl bg-heritage-dark/90 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-gold-400" />
                  <h3 className="font-bold text-[0.9375rem] text-canvas-light">
                    {t.liveHub.announcementsTitle}
                  </h3>
                </div>
                <span className="text-[0.6875rem] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Stream Synced
                </span>
              </div>

              <div className="space-y-3">
                {t.liveHub.announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-3 text-[0.875rem]"
                  >
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[0.6875rem] font-bold uppercase bg-burgundy-900 text-gold-300 mr-2 border border-gold-500/20">
                        {item.tag}
                      </span>
                      <span className="text-canvas-light/90">{item.text}</span>
                    </div>
                    <span className="text-[0.75rem] text-gold-300/70 whitespace-nowrap tabular-nums">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tabular Live Countdown & Transit Guide */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Tabular Countdown Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-burgundy-950/80 to-heritage-dark border border-gold-500/30 shadow-xl">
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-gold-400 block mb-2">
                {t.liveHub.countdownLabel}
              </span>
              <h3 className="font-extrabold text-[1.125rem] text-canvas-light mb-6">
                Grand Centenary Academic Colloquium
              </h3>

              {/* 4 Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 text-center mb-6">
                <div className="p-3 rounded-xl bg-heritage-obsidian border border-gold-500/20">
                  <span className="block text-[1.75rem] font-black text-gold-300 tabular-nums">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[0.6875rem] text-canvas-light/60 uppercase font-bold">
                    {t.liveHub.days}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-heritage-obsidian border border-gold-500/20">
                  <span className="block text-[1.75rem] font-black text-gold-300 tabular-nums">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[0.6875rem] text-canvas-light/60 uppercase font-bold">
                    {t.liveHub.hours}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-heritage-obsidian border border-gold-500/20">
                  <span className="block text-[1.75rem] font-black text-gold-300 tabular-nums">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[0.6875rem] text-canvas-light/60 uppercase font-bold">
                    {t.liveHub.minutes}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-heritage-obsidian border border-gold-500/20">
                  <span className="block text-[1.75rem] font-black text-gold-300 tabular-nums">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[0.6875rem] text-canvas-light/60 uppercase font-bold">
                    {t.liveHub.seconds}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSetReminder}
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>{t.liveHub.btnReminder}</span>
              </button>
            </div>

            {/* Venue & Transit Guidance Drawer */}
            <div className="p-6 rounded-3xl bg-heritage-dark/80 border border-white/10 shadow-lg">
              <button
                onClick={() => setShowVenueGuide(!showVenueGuide)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-gold-400" />
                  <h4 className="font-bold text-[1rem] text-canvas-light">
                    {t.liveHub.venueGuidanceTitle}
                  </h4>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gold-400 transition-transform ${
                    showVenueGuide ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div className={`mt-4 text-[0.875rem] text-canvas-light/80 leading-relaxed ${
                showVenueGuide ? 'block' : 'hidden sm:block'
              }`}>
                <p className="mb-3">{t.liveHub.venueGuidanceText}</p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[0.75rem] text-gold-200">
                  <span className="font-bold">Helpline: </span>+91 495 272 1926 | Centenary Transit Desk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
