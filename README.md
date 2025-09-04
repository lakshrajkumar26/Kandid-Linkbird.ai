
Current
lib/
├─ db/
│  ├─ index.ts           # Drizzle connection
│  └─ schema.ts          # Table definitions (Leads, Campaigns)
├─ auth/
│  ├─ betterAuth.ts      # Better Auth setup
│  └─ middleware.ts      # Protected route middleware
services/
├─ leadsService.ts       # CRUD operations for leads
├─ campaignsService.ts   # CRUD operations for campaigns
pages/api/ (optional legacy) OR app/api/
├─ leads/
│  └─ route.ts           # Handles HTTP methods
├─ campaigns/
│  └─ route.ts





# API Routes & Controllers Overview

This document describes the API routes and their corresponding controllers for the Kandid Full Stack Assignment (Next.js App Router).

---

## 1. Authentication Routes

Using **Better Auth**, most routes are handled automatically, but you will need:

- `/api/auth/[...betterauth]/route.ts` → Main Better Auth handler
- `/api/auth/register` → Custom registration (manual email/password signup)
- **(Optional)** `/api/auth/logout` → To handle custom logout if needed

### Controllers
No separate controllers needed; Better Auth handles the logic.

---

## 2. Campaigns Routes

- `/api/campaigns`
  - `GET` → List all campaigns (with filters & sorting)
  - `POST` → Create new campaign

- `/api/campaigns/[id]`
  - `GET` → Get a single campaign
  - `PATCH` → Update campaign (name, status, etc.)
  - `DELETE` → Delete campaign

### Controllers (`/lib/services/campaignService.ts`)
- `getCampaigns()`
- `getCampaignById()`
- `createCampaign()`
- `updateCampaign()`
- `deleteCampaign()`

---

## 3. Leads Routes

- `/api/leads`
  - `GET` → List all leads (with infinite scroll, filters, search)
  - `POST` → Create new lead

- `/api/leads/[id]`
  - `GET` → Lead details (for side sheet)
  - `PATCH` → Update status (Pending → Contacted → Responded → Converted)
  - `DELETE` → Delete lead

### Controllers (`/lib/services/leadService.ts`)
- `getLeads()`
- `getLeadById()`
- `createLead()`
- `updateLead()`
- `deleteLead()`

---

## 4. Optional: Settings or User Profile

- `/api/user` → Fetch current user
- `/api/user/update` → Update profile

---

## Total API Routes (Backend)

- **Authentication**: ~2–3 routes (Better Auth + register)
- **Campaigns**: 2 main routes (`/campaigns`, `/campaigns/[id]`)
- **Leads**: 2 main routes (`/leads`, `/leads/[id]`)
- **(Optional)** User routes: 1–2

**Total: ~6–7 routes (all in `/app/api/`).**

---

## Controller Layer Best Practices

Next.js App Router does not enforce a strict controller structure like Express.

- Keep routes in `/app/api/.../route.ts` (handle `GET`, `POST`, `PATCH`, `DELETE`).
- Place reusable logic in `/lib/services/`.

Example:
```
src/
  lib/
    services/
      campaignService.ts
      leadService.ts
      authService.ts
```






