'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation, VolunteerApplicationRecord } from '@/context/ParticipationContext';
import { X, CheckCircle, Sparkles, UserCheck, Shield } from 'lucide-react';

interface VolunteerModalProps {
  initialTeam?: any;
  onClose: () => void;
}

export default function VolunteerModal({ initialTeam, onClose }: VolunteerModalProps) {
  const { t } = useLanguage();
  const { addVolunteerApp } = useParticipation();

  const [teamId, setTeamId] = useState(initialTeam ? initialTeam.id : t.volunteering.teams[0].id);
  const [role, setRole] = useState(
    initialTeam ? initialTeam.roles[0] : t.volunteering.teams[0].roles[0]
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Kozhikode');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('Full Time (Centenary Week)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredRecord, setRegisteredRecord] = useState<VolunteerApplicationRecord | null>(null);

  const currentTeam =
    t.volunteering.teams.find((tm) => tm.id === teamId) || t.volunteering.teams[0];

  const districts = [
    'Kozhikode',
    'Malappuram',
    'Wayanad',
    'Kannur',
    'Kasaragod',
    'Palakkad',
    'Thrissur',
    'Ernakulam',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Pathanamthitta',
    'Kollam',
    'Thiruvananthapuram',
    'GCC / Expatriate',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);

    try {
      // Backend API call
      await fetch('/api/v1/volunteer-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: currentTeam.id,
          fullName,
          email,
          phone,
          district,
          skills: skills ? [skills] : ['General Volunteer'],
          availability,
        }),
      });

      const record = addVolunteerApp({
        teamId: currentTeam.id,
        teamTitle: currentTeam.title,
        role,
        fullName,
        email,
        phone,
        district,
        skills,
        availability,
      });

      setRegisteredRecord(record);
    } catch (err) {
      console.warn('Volunteer API fallback', err);
      const record = addVolunteerApp({
        teamId: currentTeam.id,
        teamTitle: currentTeam.title,
        role,
        fullName,
        email,
        phone,
        district,
        skills,
        availability,
      });
      setRegisteredRecord(record);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-[92%] max-w-[580px] bg-white border border-burgundy-200 rounded-3xl p-6 sm:p-8 relative shadow-2xl my-8 text-[#1F171A]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-50 text-burgundy-800 hover:bg-burgundy-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {registeredRecord ? (
          <div className="text-center">
            <span className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow">
              <CheckCircle className="w-8 h-8" />
            </span>

            <h3 className="font-extrabold text-[1.5rem] text-burgundy-950 mb-1">
              {t.volunteering.confirmationTitle}
            </h3>
            <p className="text-[0.875rem] text-[#55474B] mb-6">
              Welcome to the <strong>Samastha Centenary Service Corps</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-canvas-light border-2 border-gold-400 text-left mb-6 shadow-md">
              <div className="flex justify-between items-center border-b border-burgundy-200/60 pb-3 mb-3">
                <span className="text-[0.75rem] font-bold uppercase tracking-wider text-burgundy-800">
                  Volunteer Service Badge
                </span>
                <span className="font-mono font-bold text-gold-700 text-[0.8125rem]">
                  {registeredRecord.reference}
                </span>
              </div>

              <div className="space-y-2 text-[0.8125rem] text-[#332528]">
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Volunteer:</span>
                  <span className="font-bold">{registeredRecord.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Assigned Team:</span>
                  <span className="font-semibold text-burgundy-950">{registeredRecord.teamTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Role:</span>
                  <span className="font-bold text-gold-700">{registeredRecord.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">District:</span>
                  <span>{registeredRecord.district}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem] shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-100 inline-block mb-2">
                Centenary Volunteer Application
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950 leading-snug">
                {t.volunteering.formTitle}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Select Team *
                  </label>
                  <select
                    value={teamId}
                    onChange={(e) => {
                      setTeamId(e.target.value);
                      const tm = t.volunteering.teams.find((item) => item.id === e.target.value);
                      if (tm) setRole(tm.roles[0]);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    {t.volunteering.teams.map((tm) => (
                      <option key={tm.id} value={tm.id}>
                        {tm.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.volunteering.formRole}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    {currentTeam.roles.map((r: string) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shafeeq Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98460 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  />
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="volunteer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.volunteering.formDistrict}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.volunteering.formAvailability}
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] bg-white focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  >
                    <option value="Full Time (Centenary Week)">Full Time (Centenary Week)</option>
                    <option value="Weekends Only">Weekends Only</option>
                    <option value="Flexible Shift (4-6 Hours)">Flexible Shift (4-6 Hours)</option>
                    <option value="Remote / Digital Contribution">Remote / Digital Contribution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  {t.volunteering.formSkills}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Photography, First Aid, Translation, Sound Engineering"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.9375rem] shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>
                    {isSubmitting ? 'Registering Application...' : t.volunteering.formSubmit}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
