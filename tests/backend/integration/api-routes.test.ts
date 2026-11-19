// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// INTEGRATION TESTS: tests/backend/integration/api-routes.test.ts
// ==============================================================================

import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getEventsRoute } from '@/app/api/v1/events/route';
import { GET as getActivitySummaryRoute } from '@/app/api/v1/activity/summary/route';
import { POST as postDonationIntentRoute } from '@/app/api/v1/donations/intents/route';
import { POST as postBootstrapRoute } from '@/app/api/v1/admin/bootstrap/route';
import * as eventService from '@/server/services/eventService';
import * as activityService from '@/server/services/activityService';
import * as donationService from '@/server/services/donationService';
import * as adminModule from '@/lib/supabase/admin';

describe('App Router Route Handlers Integration Tests', () => {
  it('GET /api/v1/events returns standardized success envelope', async () => {
    vi.spyOn(eventService, 'listEvents').mockResolvedValue({
      events: [
        {
          id: 'ev-1',
          slug: 'centenary-meet',
          titleEn: 'Centenary Meet',
          titleMl: 'ശതാബ്ദി സംഗമം',
          descriptionEn: 'Desc EN',
          descriptionMl: 'Desc ML',
          startTime: '2026-06-26T09:00:00Z',
          endTime: '2026-06-26T17:00:00Z',
          locationNameEn: 'Calicut',
          locationNameMl: 'കോഴിക്കോട്',
          locationAddress: null,
          locationMapUrl: null,
          category: null,
          bannerUrl: null,
          registrationEnabled: true,
          registrationCapacity: 1000,
          registrationDeadline: null,
          publicationStatus: 'published',
          lifecycleStatus: 'upcoming',
          isFeatured: true,
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-01T00:00:00Z',
        },
      ],
      meta: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    });

    const req = new NextRequest('http://localhost:3000/api/v1/events');
    const res = await getEventsRoute(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.length).toBe(1);
    expect(json.data[0].slug).toBe('centenary-meet');
    expect(json.meta.total).toBe(1);
  });

  it('GET /api/v1/activity/summary returns privacy-safe aggregate metrics', async () => {
    vi.spyOn(activityService, 'getActivitySummary').mockResolvedValue({
      publishedEventsCount: 12,
      liveEventsCount: 2,
      upcomingEventsCount: 10,
      confirmedRegistrationsCount: 4500,
      activeVolunteersCount: 320,
      activeCampaignsCount: 4,
      totalCampaignParticipantsCount: 18500,
      lastUpdatedAt: '2026-06-26T12:00:00Z',
    });

    const res = await getActivitySummaryRoute();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.confirmedRegistrationsCount).toBe(4500);
    expect(json.data.totalCampaignParticipantsCount).toBe(18500);
  });

  it('POST /api/v1/donations/intents creates demo intent', async () => {
    vi.spyOn(donationService, 'createDonationIntent').mockResolvedValue({
      id: 'intent-uuid-1',
      referenceId: 'SAM-DEMO-DON-123456',
      amount: 2500,
      currency: 'INR',
      cause: 'Centenary Fund',
      donorName: 'Ahmad',
      donorEmail: 'ahmad@example.com',
      donorPhone: null,
      isAnonymous: false,
      status: 'initiated',
      isDemo: true,
      createdAt: '2026-06-26T12:00:00Z',
    });

    const req = new NextRequest('http://localhost:3000/api/v1/donations/intents', {
      method: 'POST',
      body: JSON.stringify({
        amount: 2500,
        cause: 'Centenary Fund',
        donorName: 'Ahmad',
        donorEmail: 'ahmad@example.com',
      }),
    });

    const res = await postDonationIntentRoute(req);
    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.referenceId).toBe('SAM-DEMO-DON-123456');
    expect(json.data.isDemo).toBe(true);
  });

  it('POST /api/v1/admin/bootstrap fails gracefully when super admin already exists', async () => {
    const mockAdmin = {
      rpc: () => Promise.resolve({
        data: null,
        error: { message: 'SUPER_ADMIN_ALREADY_EXISTS: Cannot use bootstrap once an administrator exists.' },
      }),
    };
    vi.spyOn(adminModule, 'getAdminClient').mockReturnValue(mockAdmin as any);

    const req = new NextRequest('http://localhost:3000/api/v1/admin/bootstrap', {
      method: 'POST',
      body: JSON.stringify({ email: 'takeover@example.com' }),
    });

    const res = await postBootstrapRoute(req);
    expect(res.status).toBe(403);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('FORBIDDEN');
    expect(json.error.message).toContain('super administrator already exists');
  });
});
