# SAMASTHA LIVE (1926–2026) BACKEND ARCHITECTURE

## 1. Executive Summary & Architectural Mission

**SAMASTHA LIVE** is the official digital centenary participation platform commemorating 100 years of Samastha Kerala Jamiyyathul Ulama (1926–2026). The platform coordinates live centenary events, delegate registration with concurrency-safe capacity management, community volunteer mobilization, public participation campaigns, verified historical timeline exploration, and a strictly isolated demonstration-mode donation infrastructure.

This backend was built by **Agent B** as an independent, modular, and frontend-ready architecture designed to seamlessly integrate with the Next.js App Router and React frontend developed by **Agent A**.

---

## 2. Core Architecture & Separation of Concerns

```
                           ┌────────────────────────────────────────┐
                           │      Agent A: Next.js Frontend        │
                           │     (React Server / Client UI)         │
                           └──────────────────┬─────────────────────┘
                                              │ HTTP / JSON (API v1)
                                              │ WebSocket (Supabase Realtime)
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              AGENT B: BACKEND INFRASTRUCTURE                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  API LAYER (Next.js App Router Handlers - /api/v1/)                                    │
│  ├── Input Validation: Zod schemas (strip unknown, strict types)                       │
│  ├── Abuse Mitigation: Sliding window in-memory rate limiter per IP                     │
│  ├── Identity & Session: App Router Cookies + Bearer Token Authorization               │
│  └── Response Normalizer: Unified JSON envelope ({ success, data, error, meta })       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  SERVICE LAYER (src/server/services/)                                                  │
│  ├── eventService: Lifecycle state (upcoming/live/completed) & publication separation │
│  ├── registrationService: Pessimistic locking & atomic capacity enforcement            │
│  ├── volunteerService: Multi-stage application review & opportunity management         │
│  ├── campaignService: Verified participation aggregates & pledge tracking             │
│  ├── donationService: DEMO MODE isolation (is_demo = true), client-forgery protection  │
│  ├── announcementService: Priority broadcasts & event/campaign cross-linking           │
│  ├── historyService: Chronological milestones (1926-2026) with verification gating     │
│  ├── activityService: Privacy-safe activity metrics cache projection                   │
│  └── auditService: Automated PII & secret redactor logging to immutable audit_logs     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  DATABASE LAYER (Supabase PostgreSQL 15+)                                              │
│  ├── Row Level Security (RLS): Enabled on 100% of public tables                        │
│  ├── Stored Procedures: register_for_event_atomic(), recalculate_activity_metrics()    │
│  ├── Triggers: Metric rollups, timestamps, profile & role auto-provisioning            │
│  └── Realtime: Selective publication on safe projections only (no PII broadcast)       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Database Engine**: PostgreSQL 15+ hosted on Supabase.
- **Data Access & Auth**: `@supabase/supabase-js` (v2.49+) and `@supabase/ssr` (v0.5+).
- **Validation Engine**: Zod (v3.24+).
- **Server Framework**: Next.js App Router Route Handlers (Edge & Node.js runtime compatible).
- **Type Safety**: End-to-end TypeScript 5.7+ contracts.
- **Testing Framework**: Vitest 2.1+ running automated unit, integration, and security suites.

---

## 4. Key Architectural Safeguards

### 4.1 Strict Concurrency-Safe Registrations
Public registrations can experience massive traffic spikes during centenary event releases. Relying on simple `SELECT count` then `INSERT` invites severe race conditions and overbooking. 
**Solution**:
1. Registrations invoke `public.register_for_event_atomic` in PostgreSQL.
2. The transaction acquires an explicit pessimistic lock on the event row:
   ```sql
   SELECT * INTO v_event FROM public.events WHERE id = p_event_id FOR UPDATE;
   ```
3. Checks if `NOW() <= registration_deadline`.
4. Checks confirmed registrations count against `registration_capacity`.
5. Enforces case-insensitive email uniqueness per event via a partial unique index.
6. Returns an atomic confirmation reference code (`SAM-REG-YYYYMMDD-XXXXXX`).

### 4.2 Donation Demo Isolation
The platform strictly mandates **DEMO MODE ONLY** until certified financial gateway keys are provisioned.
- Every intent and transaction contains `is_demo: true`.
- Reference identifiers are prefixed with `SAM-DEMO-DON-`.
- Transactions record simulated UPI/NetBanking status without ever connecting to external payment gateways.
- Client requests cannot forge payment verification without going through the server-side verification endpoint.

### 4.3 Realtime Privacy Wall
Supabase Realtime subscriptions are restricted to public projections:
- `events`
- `event_updates`
- `announcements`
- `campaigns`
- `activity_metrics_cache`

Participant contact information (`event_registrations`, `volunteer_applications`, `donation_intents`, `audit_logs`) are **strictly excluded** from the public Realtime publication.

---

## 5. Parallel-Agent Boundary Strategy

Agent A and Agent B operate in separate contexts within the same repository:
- **Agent A (Frontend)** owns: `src/components/`, `src/app/page.tsx`, `src/app/layout.tsx`, frontend styles, animations, design tokens.
- **Agent B (Backend)** owns: `src/server/`, `src/lib/supabase/`, `src/types/`, `src/app/api/`, `supabase/`, `tests/backend/`, `docs/backend/`.
- Integration is achieved purely through documented API contracts, shared TypeScript interfaces, and Supabase client helpers.
