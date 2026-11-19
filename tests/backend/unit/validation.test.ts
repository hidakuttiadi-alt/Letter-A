// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// UNIT TEST: tests/backend/unit/validation.test.ts
// ==============================================================================

import { describe, it, expect } from 'vitest';
import {
  createEventSchema,
  registerForEventSchema,
  applyVolunteerSchema,
  createCampaignSchema,
  joinCampaignSchema,
  createDonationIntentSchema,
  completeDemoDonationSchema,
} from '@/server/validation/schemas';

describe('Validation Schemas Unit Tests', () => {
  describe('Event Validation', () => {
    it('accepts valid event payload', () => {
      const valid = {
        slug: 'centenary-national-seminar',
        titleEn: 'Centenary National Seminar',
        titleMl: 'ശതാബ്ദി ദേശീയ സെമിനാർ',
        descriptionEn: 'An academic seminar commemorating 100 years of Samastha.',
        descriptionMl: 'സമസ്തയുടെ 100 വർഷത്തെ അടയാളപ്പെടുത്തുന്ന അക്കാദമിക് സെമിനാർ.',
        startTime: '2026-06-26T09:00:00Z',
        endTime: '2026-06-26T17:00:00Z',
        locationNameEn: 'Calicut Town Hall',
        locationNameMl: 'കോഴിക്കോട് ടൗൺ ഹാൾ',
        registrationEnabled: true,
        registrationCapacity: 500,
        publicationStatus: 'published',
        lifecycleStatus: 'upcoming',
      };
      const res = createEventSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('rejects event if endTime is before startTime', () => {
      const invalid = {
        slug: 'invalid-time-event',
        titleEn: 'Invalid Time Event',
        titleMl: 'സമയം തെറ്റായ ഇവന്റ്',
        descriptionEn: 'Valid description text.',
        descriptionMl: 'ശരിയായ വിവരണം.',
        startTime: '2026-06-26T18:00:00Z',
        endTime: '2026-06-26T09:00:00Z', // before start
        locationNameEn: 'Venue',
        locationNameMl: 'വേദി',
      };
      const res = createEventSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.issues[0].message).toContain('End time must be after or equal to start time');
      }
    });

    it('rejects invalid slug format', () => {
      const invalid = {
        slug: 'Invalid Slug with Spaces!',
        titleEn: 'Invalid Slug',
        titleMl: 'സ്ലഗ് തെറ്റ്',
        descriptionEn: 'Valid description text.',
        descriptionMl: 'ശരിയായ വിവരണം.',
        startTime: '2026-06-26T09:00:00Z',
        endTime: '2026-06-26T17:00:00Z',
        locationNameEn: 'Venue',
        locationNameMl: 'വേദി',
      };
      const res = createEventSchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });
  });

  describe('Event Registration Validation', () => {
    it('accepts valid registration input', () => {
      const valid = {
        eventId: '11111111-1111-1111-1111-111111111111',
        fullName: 'Ahmad Faisal',
        phone: '+919876543210',
        email: 'faisal@example.com',
        institution: 'Darul Huda Islamic University',
        notes: 'Attending morning session',
      };
      const res = registerForEventSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('rejects invalid email and malformed phone', () => {
      const invalid = {
        eventId: '11111111-1111-1111-1111-111111111111',
        fullName: 'A',
        phone: '123', // invalid phone
        email: 'not-an-email',
      };
      const res = registerForEventSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        const fieldErrors = res.error.flatten().fieldErrors;
        expect(fieldErrors.email).toBeDefined();
        expect(fieldErrors.phone).toBeDefined();
        expect(fieldErrors.fullName).toBeDefined();
      }
    });
  });

  describe('Volunteer Application Validation', () => {
    it('accepts valid volunteer application', () => {
      const valid = {
        opportunityId: '22222222-2222-2222-2222-222222222222',
        fullName: 'Mohammed Rashid',
        email: 'rashid@example.com',
        phone: '+919847123456',
        age: 24,
        occupation: 'Software Engineer',
        institution: 'Farook College',
        qualifications: 'B.Tech',
        skills: ['IT Support', 'Malayalam Translation'],
        availability: 'All 3 days of Grand Conclave',
      };
      const res = applyVolunteerSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('rejects volunteer application under 13 years old', () => {
      const invalid = {
        opportunityId: '22222222-2222-2222-2222-222222222222',
        fullName: 'Child Applicant',
        email: 'child@example.com',
        phone: '+919847123456',
        age: 10,
        availability: 'Weekends',
      };
      const res = applyVolunteerSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.flatten().fieldErrors.age).toBeDefined();
      }
    });
  });

  describe('Donation Intent Validation (DEMO MODE)', () => {
    it('accepts valid donation intent', () => {
      const valid = {
        amount: 1000,
        currency: 'INR',
        cause: 'Centenary Education Pavilion',
        donorName: 'Anonymous Wellwisher',
        donorEmail: 'donor@example.com',
        donorPhone: '+919876500000',
        isAnonymous: true,
      };
      const res = createDonationIntentSchema.safeParse(valid);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.amount).toBe(1000);
        expect(res.data.isAnonymous).toBe(true);
      }
    });

    it('rejects zero or negative donation amounts', () => {
      const invalidZero = {
        amount: 0,
        donorName: 'Test',
        donorEmail: 'test@example.com',
      };
      const invalidNegative = {
        amount: -500,
        donorName: 'Test',
        donorEmail: 'test@example.com',
      };
      expect(createDonationIntentSchema.safeParse(invalidZero).success).toBe(false);
      expect(createDonationIntentSchema.safeParse(invalidNegative).success).toBe(false);
    });

    it('validates demo donation completion payload', () => {
      const valid = {
        referenceId: 'SAM-DEMO-DON-123456',
        paymentMethod: 'DEMO_UPI',
        simulateFailure: false,
      };
      const res = completeDemoDonationSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });
  });

  describe('Campaign Validation', () => {
    it('accepts valid campaign join request', () => {
      const valid = {
        fullName: 'Zainab Begum',
        email: 'zainab@example.com',
        phone: '+919846001122',
        district: 'Malappuram',
        pledgeText: 'Pledged to plant 10 trees on behalf of Samastha Centenary',
      };
      const res = joinCampaignSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });
  });
});
