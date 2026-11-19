'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Globe, ArrowUp, Shield } from 'lucide-react';

export default function Footer() {
  const { t, locale, toggleLocale } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#11060B] text-canvas-light border-t border-gold-500/20 pt-16 pb-12">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Heritage Quote */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-xl bg-burgundy-900/60 border border-gold-400/80 p-0.5 flex items-center justify-center group-hover:border-gold-300 shadow overflow-hidden shrink-0 transition-colors">
                <img
                  src="/logo.png"
                  alt="Samastha Centenary Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="font-extrabold text-[1.25rem] text-canvas-light tracking-tight block group-hover:text-gold-300 transition-colors">
                  {t.brand.name}
                </span>
                <span className="text-[0.6875rem] text-gold-400 font-mono tracking-wider uppercase">
                  {t.brand.years} • {t.brand.emblemText}
                </span>
              </div>
            </Link>

            <p className="text-[0.9375rem] text-canvas-light/80 italic leading-relaxed mb-6 max-w-[420px]">
              {t.footer.heritageQuote}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-gold-300 text-[0.8125rem] border border-gold-500/30 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{locale === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[0.9375rem] text-gold-300 uppercase tracking-wider mb-4">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-[0.875rem] text-canvas-light/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.liveHub}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.hero.supportMission}
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.volunteerCta}
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  className="hover:text-gold-300 transition-colors block"
                >
                  {t.nav.journey}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Secretariat Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-[0.9375rem] text-gold-300 uppercase tracking-wider mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-[0.875rem] text-canvas-light/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>{t.footer.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-mono">{t.footer.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{t.footer.contactEmail}</span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-[0.75rem] text-gold-200/80">
              <div className="flex items-center gap-1.5 font-bold text-gold-300 mb-1">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>Accessibility & Standards</span>
              </div>
              {t.footer.accessibilityStatement}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.75rem] text-canvas-light/60">
          <div>
            <p>{t.footer.rights}</p>
            <p className="text-gold-400/80 font-medium mt-0.5">{t.footer.designedFor}</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gold-300 text-[0.75rem] border border-white/10 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
