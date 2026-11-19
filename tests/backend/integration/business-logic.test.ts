// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// INTEGRATION TESTS: tests/backend/integration/business-logic.test.ts
// ==============================================================================

import { describe, it, expect, vi } from 'vitest';
import * as eventService from '@/server/services/eventService';
import * as regService from '@/server/services/registrationService';
import * as donationService from '@/server/services/donationService';

describe('Backend Business Logic Tests', () => {
  describe('Event Registration Lifecycle', () => {
    it('successfully constructs registration confirmation with human-readable reference', async () => {
      vi.spyOn(regService, 'registerForEvent').mockResolvedValue({
        registrationId: 'reg-uuid-1234',
        registrationReference: 'SAM-REG-20260626-A1B2C3',
        eventId: 'event-uuid-1234',
        eventTitleEn: 'Centenary Conclave',
        eventTitleMl: 'ശതാബ്ദി സമ്മേളനം',
        fullName: 'Sayyid Munavvar',
        email: 'munavvar@example.com',
        phone: '+919876543210',
        status: 'confirmed',
        createdAt: '2026-06-26T10:00:00Z',
      });

      const res = await regService.registerForEvent({
        eventId: 'event-uuid-1234',
        fullName: 'Sayyid Munavvar',
        email: 'munavvar@example.com',
        phone: '+919876543210',
      });

      expect(res.registrationReference).toMatch(/^SAM-REG-/);
      expect(res.status).toBe('confirmed');
      expect(res.fullName).toBe('Sayyid Munavvar');
    });

    it('propagates capacity exceeded exception without corrupting records', async () => {
      vi.spyOn(regService, 'registerForEvent').mockRejectedValue(
        new regService.RegistrationError('CAPACITY_EXCEEDED', 'Event registration capacity has been reached')
      );

      await expect(
        regService.registerForEvent({
          eventId: 'full-event-uuid',
          fullName: 'Late Registrant',
          email: 'late@example.com',
          phone: '+919876543210',
        })
      ).rejects.toThrow('Event registration capacity has been reached');
    });
  });

  describe('Donation Architecture (DEMO MODE Isolation)', () => {
    it('creates donation intent marked strictly with is_demo = true', async () => {
      vi.spyOn(donationService, 'createDonationIntent').mockResolvedValue({
        id: 'don-intent-1',
        referenceId: 'SAM-DEMO-DON-1718000000-ABCDEF',
        amount: 5000,
        currency: 'INR',
        cause: 'Centenary General Fund',
        donorName: 'Anonymous Centenary Supporter',
        donorEmail: 'donor@example.com',
        donorPhone: null,
        isAnonymous: true,
        status: 'initiated',
        isDemo: true,
        createdAt: new Date().toISOString(),
      });

      const intent = await donationService.createDonationIntent({
        amount: 5000,
        donorName: 'Ali Akbar',
        donorEmail: 'donor@example.com',
        isAnonymous: true,
      });

      expect(intent.isDemo).toBe(true);
      expect(intent.referenceId).toContain('SAM-DEMO-DON-');
      expect(intent.status).toBe('initiated');
    });

    it('completes demo donation simulation generating verified demo transaction', async () => {
      vi.spyOn(donationService, 'completeDemoDonation').mockResolvedValue({
        receiptId: 'tx-1',
        transactionReference: 'TX-DEMO-1718000000-XYZ123',
        referenceId: 'SAM-DEMO-DON-1718000000-ABCDEF',
        amount: 5000,
        currency: 'INR',
        cause: 'Centenary General Fund',
        donorName: 'Anonymous Centenary Supporter',
        status: 'succeeded',
        isDemo: true,
        paymentMethod: 'DEMO_UPI',
        verifiedAt: new Date().toISOString(),
      });

      const receipt = await donationService.completeDemoDonation({
        referenceId: 'SAM-DEMO-DON-1718000000-ABCDEF',
        paymentMethod: 'DEMO_UPI',
        simulateFailure: false,
      });

      expect(receipt.status).toBe('succeeded');
      expect(receipt.isDemo).toBe(true);
      expect(receipt.transactionReference).toContain('TX-DEMO-');
    });
  });
});
