import type { Metadata } from 'next';
import VolunteeringSection from '@/components/volunteering/VolunteeringSection';

export const metadata: Metadata = {
  title: 'Volunteer Service Corps — Give Your Time a Purpose | SamasthaLive',
  description:
    'Join over 25,000 registered volunteers ensuring hospitality, logistics, digital broadcasting, translation, and community care.',
};

export default function VolunteerPage() {
  return (
    <div className="w-full pt-16">
      <VolunteeringSection />
    </div>
  );
}
