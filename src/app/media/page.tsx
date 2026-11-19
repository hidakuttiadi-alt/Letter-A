import type { Metadata } from 'next';
import MediaSection from '@/components/media/MediaSection';

export const metadata: Metadata = {
  title: 'Media Archive & @SamasthaGraph | SamasthaLive',
  description:
    'Watch official high-definition centenary documentaries, historic discourse recordings, and centenary hymns from @SamasthaGraph.',
};

export default function MediaPage() {
  return (
    <div className="w-full pt-16">
      <MediaSection />
    </div>
  );
}
