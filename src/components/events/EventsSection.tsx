'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import RegistrationModal from './RegistrationModal';
import { Calendar, Clock, MapPin, Globe, Users, ArrowRight } from 'lucide-react';

export default function EventsSection() {
  const { t, locale } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'online' | 'in-person'>('all');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const filteredEvents =
    filterType === 'all'
      ? t.events.items
      : t.events.items.filter((ev) => ev.type === filterType);

  return (
    <section id="events" className="w-full py-24 bg-white text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Header and Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
              {t.events.sectionTag}
            </div>
            <h2
              className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.events.title}
            </h2>
            <p className="text-[1.0625rem] text-[#55474B] mt-2 max-w-[620px]">
              {t.events.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-canvas-light border border-burgundy-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-[0.8125rem] font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-burgundy-800 text-gold-200 shadow-sm'
                  : 'text-burgundy-900 hover:text-burgundy-700'
              }`}
            >
              {t.events.filterAll}
            </button>
            <button
              onClick={() => setFilterType('in-person')}
              className={`px-4 py-2 rounded-xl text-[0.8125rem] font-bold transition-all ${
                filterType === 'in-person'
                  ? 'bg-burgundy-800 text-gold-200 shadow-sm'
                  : 'text-burgundy-900 hover:text-burgundy-700'
              }`}
            >
              {t.events.filterInPerson}
            </button>
            <button
              onClick={() => setFilterType('online')}
              className={`px-4 py-2 rounded-xl text-[0.8125rem] font-bold transition-all ${
                filterType === 'online'
                  ? 'bg-burgundy-800 text-gold-200 shadow-sm'
                  : 'text-burgundy-900 hover:text-burgundy-700'
              }`}
            >
              {t.events.filterOnline}
            </button>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-7 rounded-3xl bg-canvas-light border border-burgundy-100 hover:border-gold-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-wider ${
                      ev.type === 'in-person'
                        ? 'bg-burgundy-900 text-gold-200'
                        : 'bg-emerald-900 text-emerald-200'
                    }`}
                  >
                    {ev.type === 'in-person' ? 'On-Ground Pavilion' : 'Virtual Webcast'}
                  </span>
                  <span className="text-[0.75rem] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {ev.capacity}
                  </span>
                </div>

                <h3 className="font-extrabold text-[1.25rem] text-burgundy-950 mb-3 group-hover:text-burgundy-700 transition-colors leading-snug">
                  {ev.title}
                </h3>

                <div className="space-y-2 text-[0.8125rem] text-[#55474B] mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-burgundy-800 shrink-0" />
                    <span className="font-semibold text-burgundy-900">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-burgundy-800 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{ev.language}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-burgundy-100/70">
                <button
                  onClick={() => setSelectedEvent(ev)}
                  className="w-full py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem] flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md"
                >
                  <span>{t.events.registerNow}</span>
                  <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration & Holographic Pass Modal */}
      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
