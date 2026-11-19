# SAMASTHA LIVE (1926–2026) BACKEND SECURITY SPECIFICATION

## 1. Security Architecture & Threat Model

The **SAMASTHA LIVE** centenary backend employs defence-in-depth principles across all architectural layers.

```
                    ┌─────────────────────────┐
                    │      Public Traffic     │
                    └────────────┬────────────┘
                                 │
                   [1] Rate Limiter & IP Shield (Sliding Window)
                                 │
                   [2] Zod Strict Schema Sanitizer & Stripper
                                 │
                   [3] Authentication & Session Verifier
                                 │
                   [4] RBAC Permission Guard (Super Admin / Staff)
                                 │
                   [5] PostgreSQL Row Level Security (RLS)
                                 │
                   [6] Pessimistic Concurrency Locking (FOR UPDATE)
                                 │
                   [7] Tamper-Evident Immutable Audit Logger
```

---

## 2. Row Level Security (RLS) Policy Matrix

| Table | Anonymous Visitor | Authenticated Participant | Staff (`event_manager`, etc.) | Super Admin |
|---|---|---|---|---|
| `profiles` | Denied | Read/Update Own Profile | Read All Profiles | Read/Update All |
| `user_roles` | Denied | Read Own Roles | Read All Roles | Full Control |
| `event_categories` | Read All | Read All | Full Control | Full Control |
| `events` | Read `published` | Read `published` | Full Control | Full Control |
| `event_updates` | Read for `published` | Read for `published` | Full Control | Full Control |
| `event_registrations` | Denied | Read/Cancel Own | Full Control | Full Control |
| `volunteer_opportunities` | Read `open`/`paused` | Read `open`/`paused` | Full Control | Full Control |
| `volunteer_applications` | Denied | Read/Withdraw Own | Review & Update | Full Control |
| `volunteer_assignments` | Denied | Read Own Assignments | Full Control | Full Control |
| `campaigns` | Read `published` | Read `published` | Full Control | Full Control |
| `campaign_participants` | Denied | Read Own Participation | Full Control | Full Control |
| `donation_intents` | Denied | Denied | Read Only | Full Control |
| `donation_transactions` | Denied | Denied | Read Only | Full Control |
| `announcements` | Read `published` | Read `published` | Full Control | Full Control |
| `historical_milestones` | Read `verified` | Read `verified` | Full Control | Full Control |
| `site_settings` | Read Public | Read Public | Read Only | Full Control |
| `audit_logs` | Denied | Denied | Denied | Read Only (Immutable) |
| `activity_metrics_cache` | Read All | Read All | Read All | Read All |

---

## 3. Privilege Escalation Prevention

- The `user_roles` table strictly prohibits users from inserting or modifying their own roles.
- Role management requires `super_admin` authorization.
- The initial super administrator cannot be provisioned via public signup; it requires executing the secure `bootstrap_first_super_admin(email)` procedure, which permanently locks itself once an administrator exists in the system.

---

## 4. Bot Abuse & Rate Limiting

Sensitive endpoints (`/api/v1/registrations`, `/api/v1/volunteer-applications`, `/api/v1/donations/intents`, `/api/v1/campaigns/:id/join`) enforce an in-memory sliding window rate limiter:
- Window: 60,000 ms (1 minute)
- Threshold: 10–15 attempts per IP
- Exceeded response: HTTP 429 (`RATE_LIMIT_EXCEEDED`) with `retryAfterMs` header.

---

## 5. Automated PII & Secret Scrubbing

The audit logging subsystem (`recordAuditLog`) automatically redacts sensitive keys recursively before writing to `audit_logs`:
- Patterns matching `password`, `token`, `secret`, `authorization`, `service_role_key`, `cookie`, `jwt`, `api_key`, `private_key` are replaced with `[REDACTED]`.
- Payment amounts and donor names are recorded, but internal card or private cryptographic tokens are strictly discarded.
- `audit_logs` has NO `UPDATE` or `DELETE` RLS policies, creating an immutable tamper-evident record.
