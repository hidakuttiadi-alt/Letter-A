import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ParticipationProvider } from '@/context/ParticipationContext';
import ToastNotification from '@/components/common/ToastNotification';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  display: 'swap',
  variable: '--font-malayalam',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="en" className={`${plusJakartaSans.variable} ${notoSansMalayalam.variable}`}>
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
