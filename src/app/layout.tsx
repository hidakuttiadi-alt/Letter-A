import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ParticipationProvider } from '@/context/ParticipationContext';
import ToastNotification from '@/components/common/ToastNotification';

export const metadata: Metadata = {
  title: 'SamasthaLive (1926–2026) — A Century of Faith. A Future Together.',
  description:
    'Official Centenary participation platform for Samastha Kerala Jamiyyathul Ulama (1926–2026). Live stream broadcasts, event registration, 3D passes, volunteering, transparent donations, and archives.',
  keywords: [
    'Samastha 100',
    'Samastha Kerala Jamiyyathul Ulama',
    'Centenary 2026',
    'SamasthaLive',
    'സമസ്ത 100',
    'ശതാബ്ദി',
    'Kozhikode',
    'Kerala Yathra',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas-light text-[#1F171A] selection:bg-burgundy-800 selection:text-gold-300">
        <LanguageProvider>
          <ParticipationProvider>
            {children}
            <ToastNotification />
          </ParticipationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
