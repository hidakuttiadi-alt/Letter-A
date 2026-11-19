import type { Metadata } from 'next';
import DonationsSection from '@/components/donations/DonationsSection';

export const metadata: Metadata = {
  title: 'Support the Mission — Transparent Donations | SamasthaLive',
  description:
    '100% transparent community giving for higher education scholarships, village library books, and patient dialysis endowments.',
};

export default function DonatePage() {
  return (
    <div className="w-full pt-16">
      <DonationsSection />
    </div>
  );
}
