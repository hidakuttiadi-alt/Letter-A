'use client';

import React from 'react';
import { useParticipation } from '@/context/ParticipationContext';
import { CheckCircle2, X } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage, clearToast } = useParticipation();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-heritage-obsidian/95 text-canvas-light border border-gold-500/40 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 max-w-[420px] w-[90%] sm:w-auto">
      <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
      <p className="text-[0.875rem] font-medium leading-snug flex-1">{toastMessage}</p>
      <button
        onClick={clearToast}
        aria-label="Dismiss toast"
        className="p-1 text-gold-300/70 hover:text-gold-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
