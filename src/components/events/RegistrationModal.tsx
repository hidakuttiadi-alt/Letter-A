'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation, EventPass } from '@/context/ParticipationContext';
import HolographicPass3D from './HolographicPass3D';
import { X, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  event: any;
  onClose: () => void;
}

export default function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const { t } = useLanguage();
  const { addEventPass } = useParticipation();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    institution: '',
    category: 'General Attendee',
    accessibility: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<EventPass | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    try {
      // Attempt backend API registration
      const response = await fetch('/api/v1/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution || undefined,
          notes: formData.accessibility || undefined,
        }),
      });

      // Whether API returned success or local fallback, generate instant 3D pass
      const pass = addEventPass({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution,
        category: formData.category,
        accessibility: formData.accessibility,
      });

      setGeneratedPass(pass);
    } catch (err) {
      console.warn('API error, falling back to local pass creation', err);
      const pass = addEventPass({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution,
        category: formData.category,
        accessibility: formData.accessibility,
      });
      setGeneratedPass(pass);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-[92%] max-w-[580px] bg-white border border-burgundy-200 rounded-3xl p-6 sm:p-8 relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-50 text-burgundy-800 hover:bg-burgundy-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {generatedPass ? (
          <div>
            <div className="text-center mb-6">
              <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow">
                <CheckCircle className="w-7 h-7" />
              </span>
              <h3 className="font-extrabold text-[1.5rem] text-burgundy-950 mb-1">
                Registration Confirmed!
              </h3>
              <p className="text-[0.875rem] text-[#55474B]">
                Your pass has been securely saved to <strong>My Participation</strong>.
              </p>
            </div>

            <HolographicPass3D pass={generatedPass} onClose={onClose} />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-100 inline-block mb-2">
                Event Registration
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950 leading-snug">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-[0.8125rem] text-[#6B5A60] mt-2">
                <span className="flex items-center gap-1 font-semibold text-burgundy-800">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  {event.venue}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  {t.events.formName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Muhammad Rasheed"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.events.formPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98470 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem]"
                  />
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.events.formEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.events.formInstitution}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Farook College / Markaz"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem]"
                  />
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                    {t.events.formCategory}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem] bg-white"
                  >
                    <option value="General Attendee">General Attendee / പൊതുജന പ്രതിനിധി</option>
                    <option value="Student Delegate">Student Delegate / വിദ്യാർത്ഥി</option>
                    <option value="Scholar / Academician">Scholar / Academician / പണ്ഡിതൻ</option>
                    <option value="Media Delegate">Media Delegate / മാധ്യമപ്രവർത്തകൻ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  {t.events.formAccessibility}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wheelchair ramp, front seating, audio aid"
                  value={formData.accessibility}
                  onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.875rem]"
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
                    {isSubmitting ? 'Generating 3D Pass...' : t.events.formSubmit}
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
