# SAMASTHA LIVE (1926–2026) FRONTEND INTEGRATION GUIDE
## Dedicated Guide for Agent A (Frontend Design & Development)

Welcome Agent A. The backend for **SAMASTHA LIVE** is fully operational, normalized, tested, and ready for frontend integration.

You do NOT need to inspect backend internal implementation details. Follow this document to wire your React UI components directly to the backend APIs and Supabase Realtime channels.

---

## 1. Quick Integration Checklist

1. Copy `.env.example` to `.env.local` and configure your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
2. Import TypeScript types directly from `@/types/api`:
   ```ts
   import type {
     EventDto,
     RegistrationConfirmationDto,
     ActivitySummaryDto,
     ApiResponse
   } from '@/types/api';
   ```
3. Use standard fetch calls to `/api/v1/...` for data mutations and queries.
4. Use `@/lib/supabase/browser` for Realtime live updates in client components.

---

## 2. Shared TypeScript Types

All shared interfaces are located in:
`src/types/api.ts`

Key interfaces:
- `EventDto` (with `titleEn`, `titleMl`, `descriptionEn`, `descriptionMl`, `category`, `registeredCount`, `remainingCapacity`)
- `EventRegistrationDto` & `CreateRegistrationRequest` & `RegistrationConfirmationDto`
- `VolunteerOpportunityDto` & `VolunteerApplicationDto`
- `CampaignDto` & `CampaignParticipantDto`
- `DonationIntentDto` & `DonationReceiptDto`
- `AnnouncementDto`
- `HistoricalMilestoneDto` (1926–2026 milestones)
- `ActivitySummaryDto` (real-time platform counts)

---

## 3. Bilingual Handling (English & Malayalam)

Every entity provides both English (`_en`) and Malayalam (`_ml`) fields. Your UI language selector can switch fields cleanly without querying different endpoints:

```tsx
interface Props {
  event: EventDto;
  locale: 'en' | 'ml';
}

export function EventCard({ event, locale }: Props) {
  const title = locale === 'ml' ? event.titleMl : event.titleEn;
  const description = locale === 'ml' ? event.descriptionMl : event.descriptionEn;
  const location = locale === 'ml' ? event.locationNameMl : event.locationNameEn;

  return (
    <article className="event-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{location}</span>
    </article>
  );
}
```

---

## 4. Submitting Event Registrations

When a user submits the centenary registration form:

```tsx
async function handleRegister(formData: {
  eventId: string;
  fullName: string;
  phone: string;
  email: string;
  institution?: string;
}) {
  const res = await fetch('/api/v1/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const json: ApiResponse<RegistrationConfirmationDto> = await res.json();

  if (!json.success) {
    if (json.error.code === 'CAPACITY_EXCEEDED') {
      alert('Registration full: Capacity has been reached for this session.');
    } else if (json.error.code === 'CONFLICT') {
      alert('This email is already registered for this event.');
    } else if (json.error.code === 'RATE_LIMIT_EXCEEDED') {
      alert('Too many attempts. Please wait a minute and try again.');
    } else {
      alert(json.error.message);
    }
    return;
  }

  // Registration successful: Display confirmation pass to participant
  const pass = json.data;
  console.log('Confirmation Reference:', pass.registrationReference);
}
```

---

## 5. Live Activity Metrics & Realtime Subscriptions

To render live centenary counts on your home/hero page (e.g. Registered Delegates, Volunteers, Campaigns):

### 5.1 Initial Load via REST API
```tsx
const res = await fetch('/api/v1/activity/summary');
const { data }: ApiResponse<ActivitySummaryDto> = await res.json();
```

### 5.2 Realtime Updates in React Client Component
```tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';
import { subscribeToActivityMetrics } from '@/server/realtime/subscriptions';
import type { ActivitySummaryDto } from '@/types/api';

export function CentenaryMetricsCounter({ initialMetrics }: { initialMetrics: ActivitySummaryDto }) {
  const [metrics, setMetrics] = useState<ActivitySummaryDto>(initialMetrics);

  useEffect(() => {
    const supabase = createClient();
    const channel = subscribeToActivityMetrics(supabase, (newMetrics) => {
      setMetrics({
        publishedEventsCount: newMetrics.published_events_count,
        liveEventsCount: newMetrics.live_events_count,
        upcomingEventsCount: newMetrics.upcoming_events_count,
        confirmedRegistrationsCount: newMetrics.confirmed_registrations_count,
        activeVolunteersCount: newMetrics.active_volunteers_count,
        activeCampaignsCount: newMetrics.active_campaigns_count,
        totalCampaignParticipantsCount: newMetrics.total_campaign_participants_count,
        lastUpdatedAt: newMetrics.updated_at,
      });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="metrics-grid">
      <div>Delegates: {metrics.confirmedRegistrationsCount.toLocaleString()}</div>
      <div>Active Volunteers: {metrics.activeVolunteersCount.toLocaleString()}</div>
      <div>Pledges: {metrics.totalCampaignParticipantsCount.toLocaleString()}</div>
    </div>
  );
}
```

---

## 6. Donations (DEMO MODE)

The donation system is currently running in **DEMO MODE**.
To simulate a donation in your UI:
1. `POST /api/v1/donations/intents` with `{ amount, cause, donorName, donorEmail, isAnonymous }`.
2. Receive `{ referenceId }`.
3. Call `POST /api/v1/donations/demo/complete` with `{ referenceId, paymentMethod: 'DEMO_UPI' }`.
4. Display the returned `DonationReceiptDto` containing `transactionReference` and verified timestamp.

---

## 7. Error Handling Standard

Always verify `json.success` on API responses. When `success === false`, `json.error` contains:
- `code`: Machine-readable error identifier (e.g. `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `CAPACITY_EXCEEDED`, `RATE_LIMIT_EXCEEDED`).
- `message`: User-friendly error message.
- `details`: Detailed Zod field validation errors where applicable.
