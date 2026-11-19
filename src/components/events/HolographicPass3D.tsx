'use client';

import React, { useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EventPass } from '@/context/ParticipationContext';
import { Download, Calendar, MapPin, CheckCircle, Sparkles, QrCode } from 'lucide-react';

interface HolographicPass3DProps {
  pass: EventPass;
  onClose?: () => void;
}

export default function HolographicPass3D({ pass, onClose }: HolographicPass3DProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Calculate dynamic specular glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.45 });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Samastha 100 Centenary//Event Pass//EN
BEGIN:VEVENT
SUMMARY:${pass.eventTitle}
DESCRIPTION:Samastha 100 Centenary Attendee Pass: ${pass.reference}
LOCATION:${pass.eventVenue}
DTSTART:20260314T040000Z
DTEND:20260314T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${pass.reference}-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPass = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[520px] mx-auto select-none">
      {/* 3D Tilting Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full rounded-3xl p-7 bg-gradient-to-br from-burgundy-950 via-heritage-obsidian to-burgundy-900 border-2 border-gold-400/80 shadow-2xl relative overflow-hidden transition-transform duration-150 ease-out cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Holographic Specular Sheen Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(229, 193, 108, 0.45) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Decorative Watermark & Gold Corner Laces */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-burgundy-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Pass Header */}
        <div className="flex items-start justify-between border-b border-gold-500/30 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-burgundy-900/90 border-2 border-gold-400 p-1 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
              <img
                src="/samastha-100.svg"
                alt="Samastha 100 Centenary Emblem"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-gold-400 block">
                {t.events.passTitle}
              </span>
              <h4 className="font-extrabold text-[1rem] text-canvas-light tracking-tight">
                {t.brand.years} • SAMASTHA 100
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[0.6875rem] font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              VERIFIED PASS
            </span>
            <span className="text-[0.75rem] font-mono text-gold-300/80 mt-1 font-bold">
              {pass.reference}
            </span>
          </div>
        </div>

        {/* Pass Body Content */}
        <div className="space-y-4 relative z-10">
          <div>
            <span className="text-[0.6875rem] uppercase font-semibold text-gold-300/70 block">
              Event Title
            </span>
            <h5 className="font-extrabold text-[1.125rem] text-canvas-light leading-snug">
              {pass.eventTitle}
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[0.8125rem]">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[0.6875rem] text-gold-300/70 uppercase block font-semibold">
                Attendee Name
              </span>
              <span className="font-bold text-canvas-light">{pass.fullName}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[0.6875rem] text-gold-300/70 uppercase block font-semibold">
                Category
              </span>
              <span className="font-bold text-gold-300">{pass.category}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[0.8125rem] flex items-center justify-between">
            <div>
              <span className="text-[0.6875rem] text-gold-300/70 uppercase block font-semibold">
                Venue Location
              </span>
              <span className="font-semibold text-canvas-light">{pass.eventVenue}</span>
            </div>
            <MapPin className="w-4 h-4 text-gold-400 shrink-0 ml-2" />
          </div>

          {/* Holographic QR Code Segment */}
          <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/30 flex items-center justify-between gap-4">
            <div className="flex-1 text-[0.75rem] text-canvas-light/80">
              <span className="font-bold text-gold-300 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Holographic Digital Verification
              </span>
              Present this interactive 3D pass or barcode scan at the centenary registration desk.
            </div>
            {/* High Craft SVG QR Code simulation */}
            <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full bg-burgundy-950 rounded flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gold-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Below Pass */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full">
        <button
          onClick={downloadPass}
          className="flex-1 w-[48%] sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] shadow-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>{t.events.passDownload}</span>
        </button>
        <button
          onClick={downloadICS}
          className="flex-1 w-[48%] sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 border border-gold-400/40 font-semibold text-[0.875rem] transition-colors"
        >
          <Calendar className="w-4 h-4 text-gold-300" />
          <span>{t.events.passCalendar}</span>
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-canvas-light font-semibold text-[0.875rem] border border-white/20 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
