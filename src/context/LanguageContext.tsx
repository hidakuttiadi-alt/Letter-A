'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { content, Locale, ContentDictionary } from '@/data/content';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: ContentDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('samastha_locale') as Locale | null;
    if (saved === 'en' || saved === 'ml') {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      if (saved === 'ml') {
        document.body.classList.add('lang-ml');
      } else {
        document.body.classList.remove('lang-ml');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('samastha_locale', newLocale);
      document.documentElement.lang = newLocale;
      if (newLocale === 'ml') {
        document.body.classList.add('lang-ml');
      } else {
        document.body.classList.remove('lang-ml');
      }
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ml' : 'en');
  };

  const t = content[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
