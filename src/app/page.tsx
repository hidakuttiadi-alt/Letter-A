import type { Metadata } from 'next';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ScholarshipSection from '@/components/scholarship/ScholarshipSection';
import KpiSection from '@/components/kpi/KpiSection';
import LeadershipSection from '@/components/leadership/LeadershipSection';
import ImpactSection from '@/components/impact/ImpactSection';
import ExploreGrid from '@/components/home/ExploreGrid';

export const metadata: Metadata = {
  title: 'SamasthaLive (1926–2026) — A Century of Faith. A Future Together.',
  description:
    'Official Centenary participation platform for Samastha Kerala Jamiyyathul Ulama (1926–2026). Live stream broadcasts, volunteering, transparent donations, and archives.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ScholarshipSection />
      <KpiSection />
      <LeadershipSection />
      <ImpactSection />
      <ExploreGrid />
    </>
  );
}
