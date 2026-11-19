import type { Metadata } from 'next';
import CampaignsSection from '@/components/campaigns/CampaignsSection';

export const metadata: Metadata = {
  title: 'Community Campaigns & Story Wall | SamasthaLive',
  description:
    'Celebrate the centenary through meaningful action: pledge rural student books, gift volunteer hours, and share family reflections.',
};

export default function CampaignsPage() {
  return (
    <div className="w-full pt-16">
      <CampaignsSection />
    </div>
  );
}
