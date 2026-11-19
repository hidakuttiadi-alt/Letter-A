import Navbar from '@/components/header/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ScholarshipSection from '@/components/scholarship/ScholarshipSection';
import KpiSection from '@/components/kpi/KpiSection';
import LeadershipSection from '@/components/leadership/LeadershipSection';
import ImpactSection from '@/components/impact/ImpactSection';
import LiveHubSection from '@/components/live/LiveHubSection';
import NewsSection from '@/components/news/NewsSection';
import EventsSection from '@/components/events/EventsSection';
import DonationsSection from '@/components/donations/DonationsSection';
import VolunteeringSection from '@/components/volunteering/VolunteeringSection';
import CampaignsSection from '@/components/campaigns/CampaignsSection';
import MediaSection from '@/components/media/MediaSection';
import JourneySection from '@/components/journey/JourneySection';
import ParticipationHub from '@/components/participation/ParticipationHub';
import ClosingBanner3D from '@/components/footer/ClosingBanner3D';
import Footer from '@/components/footer/Footer';

export default function HomePage() {
  return (
    <main className="w-full min-h-[100vh] bg-canvas-light text-[#1F171A]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ScholarshipSection />
      <KpiSection />
      <LeadershipSection />
      <ImpactSection />
      <LiveHubSection />
      <NewsSection />
      <EventsSection />
      <DonationsSection />
      <VolunteeringSection />
      <CampaignsSection />
      <MediaSection />
      <JourneySection />
      <ParticipationHub />
      <ClosingBanner3D />
      <Footer />
    </main>
  );
}
