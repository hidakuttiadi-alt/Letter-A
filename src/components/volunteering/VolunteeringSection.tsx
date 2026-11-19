'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import VolunteerModal from './VolunteerModal';
import { Users, Sparkles, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function VolunteeringSection() {
  const { t, locale } = useLanguage();
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);

  return (
    <section id="volunteering" className="w-full py-24 bg-white text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.volunteering.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.volunteering.title}
          </h2>
          <p className="text-[1.0625rem] text-[#55474B] leading-relaxed">
            {t.volunteering.subtitle}
          </p>
        </div>

        {/* 5 Interactive Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.volunteering.teams.map((team, idx) => (
            <div
              key={team.id}
              className={`p-7 rounded-3xl bg-canvas-light border border-burgundy-100 hover:border-gold-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-burgundy-900 text-gold-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[0.6875rem] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {team.slotsLeft} Open Slots
                  </span>
                </div>

                <h3 className="font-extrabold text-[1.25rem] text-burgundy-950 mb-2 leading-snug group-hover:text-burgundy-700 transition-colors">
                  {team.title}
                </h3>

                <p className="text-[0.875rem] text-[#55474B] leading-relaxed mb-5">
                  {team.desc}
                </p>

                {/* Available Roles Pills */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 block">
                    Specialized Roles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {team.roles.map((r: string) => (
                      <span
                        key={r}
                        className="px-2.5 py-1 rounded-lg bg-white border border-burgundy-100 text-[0.75rem] font-medium text-burgundy-900"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-burgundy-100/70">
                <button
                  onClick={() => setSelectedTeam(team)}
                  className="w-full py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4 text-gold-300" />
                  <span>Join This Team</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Matcher Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-burgundy-950 via-heritage-obsidian to-burgundy-900 text-canvas-light border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-gold-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-[1.25rem] text-canvas-light">
                Not sure which team matches your skills?
              </h4>
              <p className="text-[0.875rem] text-canvas-light/75">
                Our volunteer coordinators will review your background and assign you to the most impactful centenary division.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTeam(t.volunteering.teams[0])}
            className="px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-extrabold text-[0.9375rem] shrink-0 shadow-lg transition-colors"
          >
            Find My Volunteer Role
          </button>
        </div>
      </div>

      {/* Volunteer Application Modal */}
      {selectedTeam && (
        <VolunteerModal
          initialTeam={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </section>
  );
}
