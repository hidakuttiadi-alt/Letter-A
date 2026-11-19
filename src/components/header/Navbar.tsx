'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation } from '@/context/ParticipationContext';

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const { totalActionsCount } = useParticipation();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky navbar bottom border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close "More" dropdown on outside click and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Primary 5 desktop navigation links
  const primaryNavLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/live', label: t.nav.liveHub },
    { href: '/events', label: t.nav.events },
    { href: '/news', label: t.nav.news },
  ];

  // Secondary links in "More" dropdown
  const moreLinks = [
    { href: '/campaigns', label: t.nav.campaigns },
    { href: '/media', label: t.nav.media },
    { href: '/journey', label: t.nav.journey },
    { href: '/donate', label: locale === 'en' ? 'Donate' : 'സംഭാവന' },
    { href: '/volunteer', label: locale === 'en' ? 'Volunteer' : 'സന്നദ്ധസേവനം' },
  ];

  // All links combined for mobile drawer
  const allNavLinks = [
    ...primaryNavLinks,
    ...moreLinks,
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isMoreActive = moreLinks.some((link) => isLinkActive(link.href));

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-heritage-obsidian/90 backdrop-blur-md ${
          scrolled
            ? 'border-b border-gold-500/20 shadow-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-[4.25rem] flex items-center justify-between">
          {/* Logo Area: Icon + SamasthaLive + optional xl badge */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-burgundy-900/80 border border-gold-400/80 p-0.5 flex items-center justify-center shadow-md group-hover:border-gold-300 transition-colors overflow-hidden shrink-0">
              <img
                src="/samastha-100.svg"
                alt="Samastha 100 Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-canvas-light font-bold text-[1.0625rem] md:text-[1.125rem] tracking-tight group-hover:text-gold-300 transition-colors whitespace-nowrap leading-normal">
                {t.brand.name}
              </span>
              <span className="hidden xl:inline text-[0.6875rem] font-semibold text-gold-400/90 border border-gold-500/30 px-2 py-0.5 rounded-full whitespace-nowrap bg-gold-500/10">
                1926–2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links: 5 Primary + "More" Dropdown */}
          <nav className="hidden lg:flex items-center gap-6">
            {primaryNavLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200 leading-normal ${
                    active
                      ? 'text-gold-300 font-semibold'
                      : 'text-canvas-light/85 hover:text-gold-200'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {active && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400" />
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown */}
            <div
              ref={moreDropdownRef}
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`relative flex items-center gap-1 py-1 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200 leading-normal focus:outline-none ${
                  isMoreActive || moreOpen
                    ? 'text-gold-300 font-semibold'
                    : 'text-canvas-light/85 hover:text-gold-200'
                }`}
              >
                <span className="whitespace-nowrap">
                  {locale === 'en' ? 'More' : 'കൂടുതൽ'}
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    moreOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {isMoreActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400" />
                )}
              </button>

              {/* Dropdown Menu */}
              {moreOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-heritage-obsidian/95 border border-gold-500/25 shadow-2xl backdrop-blur-md py-2 z-50 flex flex-col">
                  {moreLinks.map((item) => {
                    const active = isLinkActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`px-4 py-2 text-[0.8125rem] whitespace-nowrap font-medium transition-colors flex items-center justify-between leading-normal ${
                          active
                            ? 'text-gold-300 bg-burgundy-900/60 font-semibold'
                            : 'text-canvas-light/85 hover:text-gold-200 hover:bg-white/5'
                        }`}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls (Desktop): Language Pill, My Participation Icon, Volunteer CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle Pill: compact "മലയാളം / EN" */}
            <button
              type="button"
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy-900/60 hover:bg-burgundy-900 text-gold-300 border border-gold-500/30 hover:border-gold-400/60 transition-all text-[0.8125rem] font-medium whitespace-nowrap shadow-sm focus:outline-none"
              aria-label={locale === 'en' ? 'Switch to Malayalam' : 'Switch to English'}
              title={locale === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="whitespace-nowrap leading-normal">
                {locale === 'en' ? 'മലയാളം' : 'EN'}
              </span>
            </button>

            {/* My Participation Icon Button */}
            <Link
              href="/participation"
              className={`relative p-2 rounded-full border transition-all text-gold-300 hover:text-gold-200 focus:outline-none ${
                pathname === '/participation'
                  ? 'bg-burgundy-900 border-gold-400 text-gold-200 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-gold-500/40'
              }`}
              aria-label={t.nav.myParticipation}
              title={t.nav.myParticipation}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              {totalActionsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-burgundy-700 text-gold-300 border border-gold-400 text-[0.625rem] font-bold flex items-center justify-center leading-none">
                  {totalActionsCount}
                </span>
              )}
            </Link>

            {/* Single Primary CTA Button: Volunteer */}
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-burgundy-800 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-600 text-gold-200 hover:text-white border border-gold-400/50 hover:border-gold-400 text-[0.8125rem] font-semibold whitespace-nowrap shadow-md hover:shadow-gold-500/20 transition-all focus:outline-none leading-normal"
            >
              <span className="whitespace-nowrap leading-normal">
                {locale === 'en' ? 'Volunteer' : 'സന്നദ്ധസേവനം'}
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls (below lg): Language Toggle + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-burgundy-900/60 text-gold-300 border border-gold-500/30 text-[0.75rem] font-medium whitespace-nowrap leading-normal"
              aria-label={locale === 'en' ? 'Switch to Malayalam' : 'Switch to English'}
              title={locale === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="whitespace-nowrap leading-normal">
                {locale === 'en' ? 'മലയാളം' : 'EN'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-canvas-light hover:bg-white/10 border border-white/10 transition-colors focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-Down / Side Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-[84%] max-w-[360px] bg-heritage-obsidian border-l border-gold-500/25 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy-900/60 border border-gold-400/80 p-0.5 flex items-center justify-center shadow overflow-hidden shrink-0">
                    <img
                      src="/samastha-100.svg"
                      alt="Samastha 100 Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-canvas-light font-bold text-[1rem] whitespace-nowrap leading-normal">
                    {t.brand.name}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-canvas-light/70 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stacked Navigation Links with Large Tap Targets */}
              <div className="mt-4 flex flex-col gap-1">
                {allNavLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors text-[0.9375rem] font-medium whitespace-nowrap leading-relaxed ${
                        active
                          ? 'text-gold-300 bg-burgundy-900/60 border border-gold-500/30'
                          : 'text-canvas-light/90 hover:bg-white/5 hover:text-gold-200'
                      }`}
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      {active ? (
                        <span className="w-2 h-2 rounded-full bg-gold-400" />
                      ) : (
                        <span className="text-gold-500/40 text-[0.75rem]">→</span>
                      )}
                    </Link>
                  );
                })}

                {/* My Participation in mobile drawer */}
                <Link
                  href="/participation"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-[0.9375rem] whitespace-nowrap mt-2 border transition-colors leading-relaxed ${
                    pathname === '/participation'
                      ? 'text-gold-300 bg-burgundy-900/60 border-gold-500/30'
                      : 'text-gold-300 bg-white/5 border-gold-500/20 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <span>{t.nav.myParticipation}</span>
                  </span>
                  {totalActionsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-burgundy-700 text-gold-300 text-[0.6875rem] font-bold">
                      {totalActionsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Bottom Primary CTA: Volunteer */}
            <div className="pt-4 border-t border-white/10 mt-4 flex flex-col gap-2">
              <Link
                href="/volunteer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-burgundy-800 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-600 text-gold-200 hover:text-white border border-gold-400/50 font-bold text-[0.9375rem] text-center shadow-lg transition-all whitespace-nowrap leading-relaxed"
              >
                {locale === 'en' ? 'Volunteer' : 'സന്നദ്ധസേവനം'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
