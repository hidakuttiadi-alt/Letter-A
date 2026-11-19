import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ParticipationProvider } from '@/context/ParticipationContext';
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';
import ToastNotification from '@/components/common/ToastNotification';

const anekMalayalam = localFont({
  src: [
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/Anek_Malayalam/static/AnekMalayalam-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-malayalam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SamasthaLive (1926–2026) — A Century of Faith. A Future Together.',
  description:
    'Official Centenary participation platform for Samastha Kerala Jamiyyathul Ulama (1926–2026). Live stream broadcasts, event registration, 3D passes, volunteering, transparent donations, and archives.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${anekMalayalam.variable} bg-canvas-light text-[#1F171A] selection:bg-burgundy-800 selection:text-gold-300 min-h-[100vh] flex flex-col justify-between`}>
        <LanguageProvider>
          <ParticipationProvider>
            <Navbar />
            <main className="w-full flex-grow">
              {children}
            </main>
            <Footer />
            <ToastNotification />
          </ParticipationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
