# SAMASTHA LIVE (1926–2026) REALTIME ARCHITECTURE

## 1. Overview & Privacy Boundary

**SAMASTHA LIVE** leverages Supabase Realtime to push live centenary updates directly to connected browser clients over WebSockets without polling.

### The Realtime Privacy Wall
To protect participant personal data and comply with strict data protection guidelines:
1. **Public Safe Broadcasts**: Only sanitized, non-PII tables are published to `supabase_realtime`:
   - `events`
   - `event_updates`
   - `announcements`
   - `campaigns`
   - `activity_metrics_cache`
2. **Private Data Isolation**:
   - `event_registrations`, `volunteer_applications`, `donation_intents`, `donation_transactions`, and `audit_logs` are **strictly excluded** from public Realtime publications.
   - Aggregate numbers (such as confirmed registration counts) are computed and broadcast via the `activity_metrics_cache` projection.

---

## 2. Channel Registry

| Channel Name | Target Table | Event | Description |
|---|---|---|---|
| `public:activity-metrics` | `activity_metrics_cache` | `*` | Platform-wide counters (registrations, volunteers, campaigns) |
| `public:announcements` | `announcements` | `INSERT` | Breaking news and urgent centenary bulletins |
| `public:events` | `events` | `*` | Event lifecycle changes (upcoming -> live -> completed) |
| `public:event-updates:<eventId>` | `event_updates` | `INSERT` | Live ongoing session updates for specific event |
| `admin:registrations:<eventId>` | Private Server Stream | Authenticated | Live delegate check-ins for venue staff |
| `admin:volunteers` | Private Server Stream | Authenticated | Live volunteer review notifications |

---

## 3. Client Subscription Examples

### 3.1 Subscribing to Live Activity Metrics
```ts
import { createClient } from '@/lib/supabase/browser';

const supabase = createClient();

const channel = supabase
  .channel('public:activity-metrics')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'activity_metrics_cache',
      filter: 'id=eq.global_metrics',
    },
    (payload) => {
      console.log('Updated Metrics:', payload.new);
    }
  )
  .subscribe();

// To unsubscribe on unmount:
supabase.removeChannel(channel);
```

### 3.2 Subscribing to Breaking Announcements
```ts
const channel = supabase
  .channel('public:announcements')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'announcements',
      filter: 'publication_status=eq.published',
    },
    (payload) => {
      console.log('New Announcement:', payload.new);
    }
  )
  .subscribe();
```

---

## 4. Reconnection & Reliability

- Supabase Realtime automatically handles network dropouts and re-establishes the WebSocket connection with exponential backoff.
- The client should perform a initial REST fetch upon mounting or re-connecting to reconcile any updates missed during offline periods.
- Always invoke `supabase.removeChannel(channel)` in React `useEffect` cleanup return functions to prevent memory leaks and zombie WebSocket listeners.
