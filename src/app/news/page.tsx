import type { Metadata } from 'next';
import NewsSection from '@/components/news/NewsSection';

export const metadata: Metadata = {
  title: 'News & Official Dispatches | SamasthaLive',
  description:
    'Official centenary news, press releases, archival monographs, and Kerala Yathra 2026 highlights.',
};

export default function NewsPage() {
  return (
    <div className="w-full pt-16">
      <NewsSection />
    </div>
  );
}
