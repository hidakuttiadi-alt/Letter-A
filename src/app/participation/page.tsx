import type { Metadata } from 'next';
import ParticipationHub from '@/components/participation/ParticipationHub';

export const metadata: Metadata = {
  title: 'My Participation Hub — Personal Centenary Passport | SamasthaLive',
  description:
    'Your verified personal centenary dashboard tracking event passes, live stream reminders, volunteer applications, and donation receipts.',
};

export default function ParticipationPage() {
  return (
    <div className="w-full pt-16">
      <ParticipationHub />
    </div>
  );
}
