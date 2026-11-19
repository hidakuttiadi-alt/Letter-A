'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DonationModal from './DonationModal';
import { Heart, ShieldCheck, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function DonationsSection() {
  const { t, locale } = useLanguage();
  const [selectedCause, setSelectedCause] = useState<any | null>(null);

  return (
    <section id="donations" className="w-full py-24 bg-canvas-light text-[#1F171A] border-t border-burgundy-100/60">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            {t.donations.sectionTag}
          </div>
          <h2
            className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {t.donations.title}
          </h2>
          <p className="text-[1.0625rem] text-[#55474B] leading-relaxed">
            {t.donations.subtitle}
          </p>
        </div>

        {/* 4 Cause Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.donations.causes.map((cause) => (
            <div
              key={cause.id}
              className="p-6 rounded-3xl bg-white border border-burgundy-100 hover:border-gold-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-burgundy-50 border border-burgundy-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Heart className="w-6 h-6 text-burgundy-800" />
                </div>

                <h3 className="font-extrabold text-[1.125rem] text-burgundy-950 mb-2 leading-snug group-hover:text-burgundy-700 transition-colors">
                  {cause.title}
                </h3>

                <p className="text-[0.8125rem] text-[#55474B] leading-relaxed mb-5">
                  {cause.desc}
                </p>

                <div className="p-3 rounded-xl bg-canvas-light text-[0.75rem] text-burgundy-950 font-medium mb-5">
                  <span className="font-bold text-burgundy-800">Beneficiaries: </span>
                  {cause.beneficiaries}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-[0.75rem] font-bold mb-1.5 tabular-nums">
                    <span className="text-burgundy-900">{cause.raised}</span>
                    <span className="text-gold-700">{cause.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-burgundy-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-burgundy-800 to-gold-500 rounded-full transition-all duration-500"
                      style={{ width: `${cause.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[0.6875rem] text-[#7A696F] mt-1">
                    <span>Raised</span>
                    <span>Target: {cause.target}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-burgundy-100/70">
                <button
                  onClick={() => setSelectedCause(cause)}
                  className="w-full py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.8125rem] flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                  <span>{t.donations.btnDonate}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Banner */}
        <div className="p-6 rounded-2xl bg-burgundy-950 text-canvas-light border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <h4 className="font-bold text-[1rem] text-gold-200">100% Certified Direct Deployment</h4>
              <p className="text-[0.8125rem] text-canvas-light/75">
                Every contribution is audited through registered centenary public trusts with zero administrative deductions.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCause(t.donations.causes[0])}
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] shrink-0 transition-colors shadow"
          >
            Contribute Now
          </button>
        </div>
      </div>

      {/* Donation Stepped Modal */}
      {selectedCause && (
        <DonationModal
          initialCause={selectedCause}
          onClose={() => setSelectedCause(null)}
        />
      )}
    </section>
  );
}
