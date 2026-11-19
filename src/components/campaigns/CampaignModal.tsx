'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation } from '@/context/ParticipationContext';
import { X, CheckCircle, Sparkles, BookOpen, Clock, HeartHandshake } from 'lucide-react';

interface CampaignModalProps {
  campaign: any;
  onClose: () => void;
}

export default function CampaignModal({ campaign, onClose }: CampaignModalProps) {
  const { t } = useLanguage();
  const { addCampaignPledge, addStory } = useParticipation();

  const isBookCampaign = campaign.id === 'cmp-1';
  const isTimeCampaign = campaign.id === 'cmp-2';
  const isStoryCampaign = campaign.id === 'cmp-3';

  // Form states
  const [pledgerName, setPledgerName] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Kozhikode');
  const [pledgeValue, setPledgeValue] = useState(isBookCampaign ? '5 Books' : '2 Hours');
  const [storyQuote, setStoryQuote] = useState('');
  const [storyYear, setStoryYear] = useState('1980s / 1990s');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgerName) return;

    if (isStoryCampaign) {
      if (!consentAgreed || !storyQuote) return;
      addStory({
        author: pledgerName,
        location: district,
        quote: `“${storyQuote}”`,
        year: storyYear,
      });
    } else {
      addCampaignPledge({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        pledgeText: `${pledgeValue} pledged by ${pledgerName} (${district})`,
        pledgerName,
      });
    }

    setIsDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-[92%] max-w-[540px] bg-white border border-burgundy-200 rounded-3xl p-6 sm:p-8 relative shadow-2xl my-8 text-[#1F171A]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-50 text-burgundy-800 hover:bg-burgundy-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-4">
            <span className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow">
              <CheckCircle className="w-8 h-8" />
            </span>

            <h3 className="font-extrabold text-[1.5rem] text-burgundy-950 mb-2">
              {isStoryCampaign ? 'Story Submitted & Published!' : 'Pledge Recorded!'}
            </h3>

            <p className="text-[0.875rem] text-[#55474B] mb-6">
              Thank you, <strong>{pledgerName}</strong>. Your participation has been recorded in the centenary ledger and added to your <strong>My Participation</strong> hub.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-100 inline-block mb-2">
                Centenary Campaign
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950 leading-snug">
                {campaign.title}
              </h3>
              <p className="text-[0.8125rem] text-[#6B5A60] mt-1">{campaign.tagline}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Kutty"
                  value={pledgerName}
                  onChange={(e) => setPledgerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    District / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Malappuram / Dubai"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  />
                </div>

                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  />
                </div>
              </div>

              {/* Campaign Specific Fields */}
              {isBookCampaign && (
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Number of Books Pledged
                  </label>
                  <select
                    value={pledgeValue}
                    onChange={(e) => setPledgeValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    <option value="2 Books">2 Books (Student Basic Kit)</option>
                    <option value="5 Books">5 Books (Reference Set)</option>
                    <option value="10 Books">10 Books (Classroom Bundle)</option>
                    <option value="25 Books">25 Books (Mini Library Kit)</option>
                  </select>
                </div>
              )}

              {isTimeCampaign && (
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Volunteer Hours Pledged
                  </label>
                  <select
                    value={pledgeValue}
                    onChange={(e) => setPledgeValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    <option value="1 Hour">1 Hour (Civic / Care Visit)</option>
                    <option value="2 Hours">2 Hours (Madrasa / Tutoring Help)</option>
                    <option value="5 Hours">5 Hours (Event Logistics Shift)</option>
                    <option value="10 Hours">10 Hours (Full Day Volunteer Corps)</option>
                  </select>
                </div>
              )}

              {isStoryCampaign && (
                <>
                  <div>
                    <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                      Era / Year of Memory
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1976 Golden Jubilee / 1990s Markaz Conference"
                      value={storyYear}
                      onChange={(e) => setStoryYear(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                      Your Centenary Memory or Reflection *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share a short inspiring memory or lesson learned from Samastha elders, scholars, or conferences..."
                      value={storyQuote}
                      onChange={(e) => setStoryQuote(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consentBox"
                      required
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-burgundy-800 rounded border-burgundy-300 focus:ring-burgundy-800"
                    />
                    <label htmlFor="consentBox" className="text-[0.8125rem] text-[#443539] leading-snug cursor-pointer">
                      {t.campaigns.consentText}
                    </label>
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isStoryCampaign && !consentAgreed}
                  className="w-full py-3.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.9375rem] shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>Confirm Participation</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
