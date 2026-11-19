import type { Metadata } from 'next';
import JourneySection from '@/components/journey/JourneySection';

export const metadata: Metadata = {
  title: 'Our Journey — 1926–2026 Historical Timeline | SamasthaLive',
  description:
    '100 years of living history: explore the defining milestones and 3D perspective light pillars that built Kerala’s largest educational movement.',
};

export default function JourneyPage() {
  return (
    <div className="w-full pt-16">
      <JourneySection />
    </div>
  );
}
