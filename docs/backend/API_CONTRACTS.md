# SAMASTHA LIVE (1926–2026) API CONTRACT SPECIFICATION

All endpoints are versioned under the base prefix:
`/api/v1/`

---

## 1. Unified Response Envelope

### Success Response (HTTP 200 / 201)
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### Error Response (HTTP 4xx / 5xx)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "fieldErrors": {
        "email": ["Valid email address required"]
      }
    }
  }
}
```

---

## 2. API Endpoint Inventory

| Method | Path | Auth | Roles | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/events` | Public | Anon / Auth | List published events with category filters & pagination |
| `GET` | `/api/v1/events/:id` | Public | Anon / Auth | Get event details by UUID or slug |
| `GET` | `/api/v1/events/:id/updates` | Public | Anon / Auth | Get published live updates for an event |
| `POST` | `/api/v1/admin/events` | Required | `event_manager`, `admin`, `super_admin` | Create new centenary event |
| `PATCH`| `/api/v1/admin/events/:id` | Required | `event_manager`, `admin`, `super_admin` | Update event parameters or schedule |
| `POST` | `/api/v1/admin/events/:id/publish` | Required | `event_manager`, `admin`, `super_admin` | Transition draft event to published |
| `POST` | `/api/v1/admin/events/:id/updates` | Required | `event_manager`, `admin`, `super_admin` | Broadcast live update for an event |
| `POST` | `/api/v1/registrations` | Public / Rate-limited | Anon / Auth | Concurrency-safe event registration |
| `GET` | `/api/v1/me/registrations` | Required | `participant` / Any Auth | View personal event registration passes |
| `GET` | `/api/v1/admin/registrations` | Required | `event_manager`, `admin` | Search and export registration lists |
| `PATCH`| `/api/v1/admin/registrations/:id` | Required | `event_manager`, `admin` | Update registration status (confirmed/cancelled/rejected) |
| `GET` | `/api/v1/volunteer-opportunities` | Public | Anon / Auth | List open volunteer roles |
| `POST` | `/api/v1/volunteer-applications` | Public / Rate-limited | Anon / Auth | Submit volunteer application |
| `GET` | `/api/v1/me/volunteer-applications`| Required | `participant` / Any Auth | View personal volunteer submissions |
| `GET` | `/api/v1/admin/volunteer-applications`| Required | `volunteer_manager`, `admin` | Review volunteer applications |
| `PATCH`| `/api/v1/admin/volunteer-applications/:id` | Required | `volunteer_manager`, `admin` | Approve, reject, or comment on application |
| `GET` | `/api/v1/campaigns` | Public | Anon / Auth | List active centenary campaigns |
| `GET` | `/api/v1/campaigns/:id` | Public | Anon / Auth | Get campaign details by UUID or slug |
| `POST` | `/api/v1/campaigns/:id/join` | Public / Rate-limited | Anon / Auth | Join campaign and submit centenary pledge |
| `GET` | `/api/v1/me/campaigns` | Required | `participant` / Any Auth | View joined campaigns and pledges |
| `POST` | `/api/v1/admin/campaigns` | Required | `content_manager`, `admin` | Create centenary participation campaign |
| `POST` | `/api/v1/donations/intents` | Public / Rate-limited | Anon / Auth | Create donation intent (DEMO MODE) |
| `POST` | `/api/v1/donations/demo/complete` | Public / Verified | Anon / Auth | Complete demo payment simulation |
| `GET` | `/api/v1/admin/donations` | Required | `admin`, `super_admin` | Financial reporting & demo transaction logs |
| `GET` | `/api/v1/announcements` | Public | Anon / Auth | List published news and urgent bulletins |
| `POST` | `/api/v1/admin/announcements` | Required | `content_manager`, `admin` | Create public announcement |
| `PATCH`| `/api/v1/admin/announcements/:id` | Required | `content_manager`, `admin` | Update announcement priority or content |
| `GET` | `/api/v1/history` | Public | Anon / Auth | Verified centenary milestones (1926-2026) |
| `GET` | `/api/v1/history/:id` | Public | Anon / Auth | Milestone detail by UUID |
| `POST` | `/api/v1/admin/history` | Required | `content_manager`, `admin` | Add historical milestone |
| `PATCH`| `/api/v1/admin/history/:id` | Required | `content_manager`, `admin` | Edit historical milestone record |
| `GET` | `/api/v1/activity/summary` | Public (Cached) | Anon / Auth | Privacy-safe aggregate platform counts |
| `GET` | `/api/v1/activity/live` | Public | Anon / Auth | Real-time stream of latest centenary activity |
| `GET` | `/api/v1/admin/dashboard` | Required | `admin`, `super_admin` | Consolidated admin dashboard summary |
| `GET` | `/api/v1/admin/audit-logs` | Required | `admin`, `super_admin` | Tamper-evident admin audit history |
| `POST` | `/api/v1/admin/bootstrap` | Controlled | Unauthenticated (First Run Only) | Initialize initial super administrator |

---

## 3. Detailed Request & Response Examples

### 3.1 Event Registration (`POST /api/v1/registrations`)
**Request Body**:
```json
{
  "eventId": "e1111111-1111-1111-1111-111111111111",
  "fullName": "Sayyid Ahmad",
  "email": "ahmad@example.com",
  "phone": "+919876543210",
  "institution": "Darul Huda University",
  "notes": "Delegate attending morning symposium"
}
```

**Response (HTTP 201 Created)**:
```json
{
  "success": true,
  "data": {
    "registrationId": "a2b3c4d5-0000-0000-0000-000000000000",
    "registrationReference": "SAM-REG-20260626-9B4D2F",
    "eventId": "e1111111-1111-1111-1111-111111111111",
    "eventTitleEn": "Samastha Centenary Inaugural Symposium",
    "eventTitleMl": "സമസ്ത ശതാബ്ദി പ്രാരംഭ സിമ്പോസിയം",
    "fullName": "Sayyid Ahmad",
    "email": "ahmad@example.com",
    "phone": "+919876543210",
    "status": "confirmed",
    "createdAt": "2026-06-26T10:30:00.000Z"
  },
  "error": null
}
```

---

### 3.2 Public Activity Metrics (`GET /api/v1/activity/summary`)
**Response (HTTP 200 OK)**:
```json
{
  "success": true,
  "data": {
    "publishedEventsCount": 14,
    "liveEventsCount": 1,
    "upcomingEventsCount": 12,
    "confirmedRegistrationsCount": 8420,
    "activeVolunteersCount": 650,
    "activeCampaignsCount": 3,
    "totalCampaignParticipantsCount": 42100,
    "lastUpdatedAt": "2026-06-26T10:29:45.000Z"
  },
  "error": null
}
```

---

### 3.3 Create Donation Intent (`POST /api/v1/donations/intents`)
**Request Body**:
```json
{
  "amount": 2500,
  "currency": "INR",
  "cause": "Centenary Heritage Reading Initiative",
  "donorName": "Mohammed Ali",
  "donorEmail": "ali@example.com",
  "isAnonymous": false
}
```

**Response (HTTP 201 Created)**:
```json
{
  "success": true,
  "data": {
    "id": "don-1111-2222-3333",
    "referenceId": "SAM-DEMO-DON-1718000000-A1B2C3",
    "amount": 2500,
    "currency": "INR",
    "cause": "Centenary Heritage Reading Initiative",
    "donorName": "Mohammed Ali",
    "donorEmail": "ali@example.com",
    "donorPhone": null,
    "isAnonymous": false,
    "status": "initiated",
    "isDemo": true,
    "createdAt": "2026-06-26T10:35:00.000Z"
  },
  "error": null
}
```
