'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation, EventPass } from '@/context/ParticipationContext';
import HolographicPass3D from '@/components/events/HolographicPass3D';
import {
  Award,
  Calendar,
  Bell,
  Heart,
  BookOpen,
  MessageSquare,
  Trash2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ParticipationHub() {
  const { t, locale } = useLanguage();
  const {
    eventPasses,
    reminders,
    volunteerApps,
    contributions,
    campaignPledges,
    stories,
    removeReminder,
    totalActionsCount,
  } = useParticipation();

  const [activeTab, setActiveTab] = useState<
    'events' | 'reminders' | 'volunteering' | 'contributions' | 'campaigns' | 'stories'
  >('events');

  const [inspectingPass, setInspectingPass] = useState<EventPass | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: 'events', label: t.myParticipation.tabEvents, count: eventPasses.length },
    { id: 'reminders', label: t.myParticipation.tabReminders, count: reminders.length },
    { id: 'volunteering', label: t.myParticipation.tabVolunteering, count: volunteerApps.length },
    { id: 'contributions', label: t.myParticipation.tabContributions, count: contributions.length },
    { id: 'campaigns', label: t.myParticipation.tabCampaigns, count: campaignPledges.length },
    { id: 'stories', label: t.myParticipation.tabStories, count: stories.length },
  ] as const;

  return (
    <section
      id="my-participation"
      className="w-full py-24 bg-canvas-light text-[#1F171A] border-t border-burgundy-100/60"
    >
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-gold-600" />
              <span>CENTENARY PERSONAL PASSPORT</span>
            </div>
            <h2
              className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] ${
                locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
              }`}
            >
              {t.myParticipation.title}
            </h2>
            <p className="text-[1.0625rem] text-[#55474B] mt-2 max-w-[620px]">
              {t.myParticipation.subtitle}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-burgundy-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-burgundy-900 text-gold-300 flex items-center justify-center font-black text-[1.25rem] tabular-nums">
              {totalActionsCount}
            </div>
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#7A696F] block">
                Total Activities Recorded
              </span>
              <span className="font-extrabold text-[0.9375rem] text-burgundy-950">
                {totalActionsCount > 0 ? 'Verified Participant' : 'Ready to Participate'}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Tabs Segmented Bar */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white border border-burgundy-200 mb-8 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.8125rem] font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-burgundy-800 text-gold-200 shadow-sm'
                  : 'text-burgundy-950 hover:bg-burgundy-50'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`w-5 h-5 rounded-full text-[0.6875rem] font-bold flex items-center justify-center ${
                    activeTab === tab.id
                      ? 'bg-gold-500 text-heritage-obsidian'
                      : 'bg-burgundy-100 text-burgundy-900'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-burgundy-100 shadow-sm min-h-[320px]">
          {/* TAB 1: EVENTS */}
          {activeTab === 'events' && (
            <div>
              {eventPasses.length === 0 ? (
                <EmptyState
                  title="No Event Passes Generated Yet"
                  desc="Register for any flagship seminar, academic summit, or peace conclave to generate your interactive 3D pass."
                  actionLabel={t.myParticipation.exploreEvents}
                  onAction={() => scrollTo('events')}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventPasses.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-6 rounded-2xl bg-canvas-light border border-burgundy-200 hover:border-gold-500 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 bg-burgundy-50 px-2.5 py-0.5 rounded border border-burgundy-100">
                            {pass.category}
                          </span>
                          <span className="text-[0.75rem] font-mono font-bold text-gold-700">
                            {pass.reference}
                          </span>
                        </div>

                        <h4 className="font-bold text-[1.125rem] text-burgundy-950 mb-2 leading-snug">
                          {pass.eventTitle}
                        </h4>

                        <p className="text-[0.8125rem] text-[#55474B] mb-4">
                          <strong>Attendee:</strong> {pass.fullName}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-burgundy-200/60">
                        <button
                          onClick={() => setInspectingPass(pass)}
                          className="w-full py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.8125rem] flex items-center justify-center gap-2 shadow"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                          <span>View 3D Holographic Pass</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REMINDERS */}
          {activeTab === 'reminders' && (
            <div>
              {reminders.length === 0 ? (
                <EmptyState
                  title="No Stream Reminders Active"
                  desc="Visit the Live Hub and click 'Set Reminder' on scheduled broadcasts or countdown sessions."
                  actionLabel="Go to Live Hub"
                  onAction={() => scrollTo('live-hub')}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reminders.map((rem) => (
                    <div
                      key={rem.id}
                      className="p-5 rounded-2xl bg-canvas-light border border-burgundy-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-burgundy-900 text-gold-300 flex items-center justify-center">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[0.9375rem] text-burgundy-950">
                            {rem.title}
                          </h4>
                          <span className="text-[0.75rem] text-[#6B5A60]">{rem.venue}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeReminder(rem.id)}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove Reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VOLUNTEERING */}
          {activeTab === 'volunteering' && (
            <div>
              {volunteerApps.length === 0 ? (
                <EmptyState
                  title="No Volunteer Registrations Yet"
                  desc="Choose your preferred team (Welcome, Logistics, Digital, Language, First Aid) and apply to join the Centenary Corps."
                  actionLabel={t.myParticipation.findRole}
                  onAction={() => scrollTo('volunteering')}
                />
              ) : (
                <div className="space-y-4">
                  {volunteerApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-2xl bg-canvas-light border border-burgundy-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[0.6875rem] font-bold">
                            {app.status}
                          </span>
                          <span className="text-[0.75rem] font-mono text-gold-700 font-bold">
                            {app.reference}
                          </span>
                        </div>
                        <h4 className="font-bold text-[1.125rem] text-burgundy-950">
                          {app.teamTitle} — {app.role}
                        </h4>
                        <p className="text-[0.8125rem] text-[#55474B] mt-1">
                          Volunteer: <strong>{app.fullName}</strong> ({app.district}) • {app.availability}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-burgundy-100 text-center shrink-0">
                        <span className="text-[0.6875rem] uppercase font-bold text-burgundy-800 block">
                          Service Status
                        </span>
                        <span className="text-[0.8125rem] font-bold text-emerald-600">
                          Badge Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTRIBUTIONS */}
          {activeTab === 'contributions' && (
            <div>
              {contributions.length === 0 ? (
                <EmptyState
                  title="No Contributions Made Yet"
                  desc="Support student scholarships, rural library books, or dialysis care through transparent simulated endowments."
                  actionLabel="Support a Mission"
                  onAction={() => scrollTo('donations')}
                />
              ) : (
                <div className="space-y-4">
                  {contributions.map((rcpt) => (
                    <div
                      key={rcpt.id}
                      className="p-6 rounded-2xl bg-canvas-light border border-burgundy-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 text-[0.6875rem] font-bold">
                            {rcpt.status}
                          </span>
                          <span className="text-[0.75rem] font-mono font-bold text-gold-700">
                            {rcpt.reference}
                          </span>
                        </div>
                        <h4 className="font-bold text-[1.125rem] text-burgundy-950">
                          {rcpt.causeTitle}
                        </h4>
                        <p className="text-[0.8125rem] text-[#55474B] mt-1">
                          Donor: <strong>{rcpt.donorName}</strong>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[1.5rem] font-black text-burgundy-900 block tabular-nums">
                          ₹{rcpt.amount.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => window.print()}
                          className="text-[0.75rem] font-bold text-gold-700 hover:text-gold-800 underline"
                        >
                          Print Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div>
              {campaignPledges.length === 0 ? (
                <EmptyState
                  title="No Campaign Pledges Recorded"
                  desc="Pledge books for rural schools or commit volunteer hours in our centenary community campaigns."
                  actionLabel={t.myParticipation.joinCampaign}
                  onAction={() => scrollTo('campaigns')}
                />
              ) : (
                <div className="space-y-3">
                  {campaignPledges.map((plg) => (
                    <div
                      key={plg.id}
                      className="p-5 rounded-2xl bg-canvas-light border border-burgundy-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 block mb-1">
                          {plg.campaignTitle}
                        </span>
                        <h4 className="font-bold text-[1rem] text-burgundy-950">
                          {plg.pledgeText}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[0.75rem] font-bold border border-emerald-200">
                        Pledged
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: STORIES */}
          {activeTab === 'stories' && (
            <div>
              {stories.length === 0 ? (
                <EmptyState
                  title="No Stories Submitted"
                  desc="Share your family's memories, elder's reflections, or past jubilee experiences to be featured on the Story Wall."
                  actionLabel="Share a Story"
                  onAction={() => scrollTo('campaigns')}
                />
              ) : (
                <div className="space-y-4">
                  {stories.map((sty) => (
                    <div
                      key={sty.id}
                      className="p-6 rounded-2xl bg-canvas-light border border-burgundy-200"
                    >
                      <span className="text-[0.75rem] font-bold text-gold-700 block mb-2">
                        {sty.year} • {sty.location}
                      </span>
                      <p className="text-[0.9375rem] italic text-burgundy-950 mb-3">
                        {sty.quote}
                      </p>
                      <span className="text-[0.8125rem] font-bold text-[#4A3B40]">
                        — {sty.author}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inspect Holographic Pass Modal */}
      {inspectingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-[92%] max-w-[560px] bg-heritage-dark border border-gold-500/40 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            <HolographicPass3D
              pass={inspectingPass}
              onClose={() => setInspectingPass(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function EmptyState({
  title,
  desc,
  actionLabel,
  onAction,
}: {
  title: string;
  desc: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="text-center py-12 px-4 max-w-[480px] mx-auto">
      <div className="w-14 h-14 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6 text-gold-600" />
      </div>
      <h4 className="font-extrabold text-[1.25rem] text-burgundy-950 mb-2">{title}</h4>
      <p className="text-[0.875rem] text-[#6B5A60] leading-relaxed mb-6">{desc}</p>
      <button
        onClick={onAction}
        className="px-6 py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem] shadow transition-all"
      >
        {actionLabel}
      </button>
    </div>
  );
}
