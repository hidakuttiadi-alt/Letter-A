'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation } from '@/context/ParticipationContext';
import {
  Menu,
  X,
  Globe,
  Award,
  Sparkles,
  HeartHandshake,
  Radio,
  Calendar,
  BookOpen,
  Film,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const { totalActionsCount } = useParticipation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        'home',
        'about',
        'scholarship',
        'live-hub',
        'news',
        'events',
        'donations',
        'volunteering',
        'campaigns',
        'media',
        'journey',
        'my-participation',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'live-hub', label: t.nav.liveHub },
    { id: 'news', label: t.nav.news },
    { id: 'events', label: t.nav.events },
    { id: 'campaigns', label: t.nav.campaigns },
    { id: 'media', label: t.nav.media },
    { id: 'journey', label: t.nav.journey },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-heritage-obsidian/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-heritage-obsidian/90 to-transparent py-4'
        }`}
      >
        <div className="w-[94%] max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Brand Logo & Centenary Emblem */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-burgundy-800 border border-gold-400 flex items-center justify-center shadow-md group-hover:border-gold-300 transition-colors">
              <span className="text-gold-300 font-bold text-[0.875rem] tracking-tighter">100</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-canvas-light font-bold text-[1.125rem] tracking-tight group-hover:text-gold-300 transition-colors">
                  {t.brand.name}
                </span>
                <span className="text-[0.6875rem] font-semibold uppercase px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  {t.brand.years}
                </span>
              </div>
              <span className="text-[0.6875rem] text-gold-200/80 hidden sm:inline-block leading-tight">
                {t.brand.tagline}
              </span>
            </div>
          </button>

          {/* Center Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-full text-[0.875rem] font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-gold-300 bg-burgundy-900/60 border border-gold-500/30'
                      : 'text-canvas-light/85 hover:text-gold-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Toggle, My Participation, Volunteer CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy-900/80 text-gold-300 border border-gold-500/30 hover:border-gold-400 transition-all text-[0.8125rem] font-semibold shadow-sm"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'മലയാളം' : 'English'}</span>
            </button>

            {/* My Participation Hub Shortcut */}
            <button
              onClick={() => scrollTo('my-participation')}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-canvas-light border border-white/15 text-[0.8125rem] font-medium transition-all"
            >
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden md:inline">{t.nav.myParticipation}</span>
              {totalActionsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-burgundy-700 text-gold-300 border border-gold-400 text-[0.6875rem] font-bold flex items-center justify-center">
                  {totalActionsCount}
                </span>
              )}
            </button>

            {/* Volunteer CTA */}
            <button
              onClick={() => scrollTo('volunteering')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-burgundy-800 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-600 text-gold-200 border border-gold-400/50 text-[0.8125rem] font-bold shadow-md hover:shadow-gold-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>{t.nav.volunteerCta}</span>
            </button>

            {/* Mobile Drawer Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-canvas-light hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <div className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[340px] bg-heritage-obsidian border-l border-gold-500/25 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-burgundy-800 border border-gold-400 flex items-center justify-center">
                    <span className="text-gold-300 font-bold text-[0.75rem]">100</span>
                  </div>
                  <span className="text-canvas-light font-bold text-[1rem]">
                    {t.brand.name}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-canvas-light/70 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher inside Drawer */}
              <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-burgundy-950/60 border border-gold-500/20">
                <span className="text-[0.8125rem] text-gold-200 font-medium">
                  {locale === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
                </span>
                <button
                  onClick={toggleLocale}
                  className="px-3 py-1 rounded-full bg-gold-500 text-heritage-obsidian font-bold text-[0.75rem]"
                >
                  {locale === 'en' ? 'മലയാളം' : 'EN'}
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-canvas-light hover:bg-white/5 hover:text-gold-300 transition-colors text-[0.9375rem] font-medium"
                  >
                    <span>{link.label}</span>
                    <span className="text-gold-500/40 text-[0.75rem]">→</span>
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('my-participation')}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-gold-300 bg-white/5 border border-gold-500/20 font-medium text-[0.9375rem] mt-2"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-400" />
                    {t.nav.myParticipation}
                  </span>
                  {totalActionsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-burgundy-700 text-gold-300 text-[0.6875rem] font-bold">
                      {totalActionsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => scrollTo('events')}
                className="w-full py-3 rounded-xl bg-gold-500 text-heritage-obsidian font-bold text-[0.9375rem] text-center shadow-lg hover:bg-gold-400 transition-colors"
              >
                {t.hero.registerEvents}
              </button>
              <button
                onClick={() => scrollTo('volunteering')}
                className="w-full py-2.5 rounded-xl bg-burgundy-800 text-gold-200 border border-gold-400/40 font-semibold text-[0.875rem] text-center hover:bg-burgundy-700 transition-colors"
              >
                {t.nav.volunteerCta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
