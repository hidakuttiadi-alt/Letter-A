'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Radio,
  HeartHandshake,
  Users,
  Compass,
  Film,
  Newspaper,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function ExploreGrid() {
  const { locale, t } = useLanguage();

  const exploreCards = [
    {
      title: locale === 'en' ? 'Live Hub & Broadcasts' : 'തത്സമയ വേദി',
      desc:
        locale === 'en'
          ? 'Live HD broadcasts, next session countdown timer, and real-time announcements.'
          : 'തത്സമയ സംപ്രേഷണം, അടുത്ത സെഷൻ കൗണ്ട്ഡൗൺ, തത്സമയ അറിയിപ്പുകൾ.',
      href: '/live',
      tag: locale === 'en' ? 'Real-Time Command' : 'തത്സമയം',
      icon: <Radio className="w-6 h-6 text-red-500" />,
      color: 'border-red-500/20 hover:border-red-500/60',
    },
    {
      title: locale === 'en' ? 'Support the Mission' : 'ദൗത്യത്തിന് പിന്തുണ',
      desc:
        locale === 'en'
          ? '100% transparent donations for higher education scholarships, books, and dialysis care.'
          : 'വിദ്യാഭ്യാസ സ്കോളർഷിപ്പുകൾ, പുസ്തക ശേഖരം, ഡയാലിസിസ് സഹായം എന്നിവയ്ക്കായുള്ള കാരുണ്യനിധി.',
      href: '/donate',
      tag: locale === 'en' ? 'Transparent Giving' : 'കാരുണ്യനിധി',
      icon: <HeartHandshake className="w-6 h-6 text-burgundy-700" />,
      color: 'border-burgundy-600/30 hover:border-burgundy-500',
    },
    {
      title: locale === 'en' ? 'Volunteer Service Corps' : 'സന്നദ്ധസേവനത്തിന് ചേരാം',
      desc:
        locale === 'en'
          ? 'Apply for 5 specialized volunteer divisions across 14 districts and GCC expatriate councils.'
          : 'സ്വാഗതം, ലോജിസ്റ്റിക്സ്, ഡിജിറ്റൽ, പരിഭാഷ, ശുചിത്വ സേനകളിൽ അണിചേരൂ.',
      href: '/volunteer',
      tag: locale === 'en' ? '25,000+ Strong' : 'വളണ്ടിയർ സേന',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      color: 'border-emerald-500/30 hover:border-emerald-500',
    },
    {
      title: locale === 'en' ? 'About Samastha (1926–2026)' : 'സമസ്തയെക്കുറിച്ച്',
      desc:
        locale === 'en'
          ? 'A century of authentic Sunni scholarship, 10,000+ madrasas, and leadership.'
          : 'അറിവിന്റെയും ഐക്യത്തിന്റെയും നൂറാണ്ട്, പണ്ഡിത നേതൃത്വം, വിദ്യാഭ്യാസ വിപ്ലവം.',
      href: '/#about',
      tag: locale === 'en' ? 'Foundation & Leadership' : 'പൈതൃകം',
      icon: <BookOpen className="w-6 h-6 text-gold-600" />,
      color: 'border-gold-500/30 hover:border-gold-500',
    },
    {
      title: locale === 'en' ? 'Our Journey & 3D Timeline' : 'നമ്മുടെ യാത്ര (1926–2026)',
      desc:
        locale === 'en'
          ? 'Explore verified eras with archival photos and rising 3D perspective light pillars.'
          : 'ചരിത്ര നാഴികക്കല്ലുകളും 3D പെർസ്പെക്റ്റീവ് പ്രകാശ സ്തംഭങ്ങളും കാണാം.',
      href: '/journey',
      tag: locale === 'en' ? 'Interactive 3D Timeline' : 'ചരിത്ര നാൾവഴികൾ',
      icon: <Compass className="w-6 h-6 text-gold-400" />,
      color: 'border-gold-500/30 hover:border-gold-400',
    },
    {
      title: locale === 'en' ? 'Community Campaigns' : 'ജനകീയ ക്യാമ്പയിനുകൾ',
      desc:
        locale === 'en'
          ? 'Pledge books, dedicate service hours, and view reflections on the Community Story Wall.'
          : 'പുസ്തക ക്യാമ്പയിൻ, സേവന മണിക്കൂറുകൾ, ശതാബ്ദി ഓർമ്മ മതിൽ.',
      href: '/campaigns',
      tag: locale === 'en' ? 'Books · Hours · Stories' : 'ക്യാമ്പയിനുകൾ',
      icon: <Sparkles className="w-6 h-6 text-gold-500" />,
      color: 'border-gold-500/30 hover:border-gold-400',
    },
    {
      title: locale === 'en' ? 'Media & Documentaries' : 'മാധ്യമം & യൂട്യൂബ്',
      desc:
        locale === 'en'
          ? 'Official centenary anthem, flagship documentaries, and discourse recordings from @SamasthaGraph.'
          : 'ശതാബ്ദി ഡോക്യുമെന്ററികൾ, ചരിത്ര പ്രഭാഷണങ്ങൾ, ഔദ്യോഗിക ഗാനങ്ങൾ.',
      href: '/media',
      tag: locale === 'en' ? '@SamasthaGraph HD' : 'വീഡിയോ ആർക്കൈവ്',
      icon: <Film className="w-6 h-6 text-red-600" />,
      color: 'border-red-600/30 hover:border-red-500',
    },
    {
      title: locale === 'en' ? 'News & Official Dispatches' : 'വാർത്തകളും വിശേഷങ്ങളും',
      desc:
        locale === 'en'
          ? 'Official press releases, commemorative monographs, and Kerala Yathra 2026 archive report.'
          : 'ഔദ്യോഗിക വാർത്തകൾ, സ്മാരക സ്റ്റാമ്പ് പ്രകാശനം, കേരള യാത്ര വിശേഷങ്ങൾ.',
      href: '/news',
      tag: locale === 'en' ? 'Press & Archives' : 'വാർത്തകൾ',
      icon: <Newspaper className="w-6 h-6 text-burgundy-800" />,
      color: 'border-burgundy-700/30 hover:border-burgundy-600',
    },
    {
      title: locale === 'en' ? 'My Participation Hub' : 'എന്റെ പങ്കാളിത്തം',
      desc:
        locale === 'en'
          ? 'Your personal centenary passport tracking passes, live stream reminders, receipts, and badges.'
          : 'നിങ്ങളുടെ പാസുകൾ, റിമൈൻഡറുകൾ, സംഭാവന രസീതുകൾ, വളണ്ടിയർ ബാഡ്ജുകൾ.',
      href: '/participation',
      tag: locale === 'en' ? 'Personal Hub' : 'ഡാഷ്‌ബോർഡ്',
      icon: <Award className="w-6 h-6 text-gold-500" />,
      color: 'border-gold-500/40 hover:border-gold-300',
    },
  ];

  return (
    <section id="explore" className="w-full py-24 bg-canvas-light text-[#1F171A]">
      <div className="w-[92%] max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 text-[0.75rem] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>CENTENARY PLATFORM DIRECTORY</span>
          </div>
          <h2
            className={`font-extrabold text-burgundy-950 tracking-tight leading-[1.2] mb-3 ${
              locale === 'ml' ? 'text-[2rem] sm:text-[2.35rem]' : 'text-[2.25rem] sm:text-[2.75rem]'
            }`}
          >
            {locale === 'en' ? 'Explore SamasthaLive' : 'ശതാബ്ദി വേദികളിലൂടെ ഒരു യാത്ര'}
          </h2>
          <p className="text-[1.0625rem] text-[#55474B] leading-relaxed">
            {locale === 'en'
              ? 'Navigate dedicated centenary hubs for live broadcasts, volunteering, transparent giving, and historic archives.'
              : 'തത്സമയ സംപ്രേഷണം, ചരിത്ര യാത്ര, വളണ്ടിയർ സേവനം, കാരുണ്യ പദ്ധതികൾ എന്നിവയുടെ പ്രധാന വേദികളിലേക്ക്.'}
          </p>
        </div>

        {/* Explore Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`p-7 rounded-3xl bg-white border ${card.color} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-canvas-light border border-burgundy-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-burgundy-50 text-burgundy-800 border border-burgundy-100">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-[1.25rem] text-burgundy-950 mb-2 group-hover:text-burgundy-700 transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-[0.875rem] text-[#55474B] leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-burgundy-100/70 flex items-center justify-between text-burgundy-800 group-hover:text-gold-600 transition-colors">
                <span className="text-[0.8125rem] font-bold">
                  {locale === 'en' ? 'Open Section' : 'പ്രവേശിക്കുക'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
