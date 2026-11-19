import type { Metadata } from 'next';
import LiveHubSection from '@/components/live/LiveHubSection';

export const metadata: Metadata = {
  title: 'Live Hub — Experience the Centenary Celebrations | SamasthaLive',
  description:
    'Watch live broadcasts, explore scheduled sessions, track the next conclave countdown, and view real-time centenary announcements.',
};

export default function LivePage() {
  return (
    <div className="w-full pt-16">
      <LiveHubSection />
    </div>
  );
}
