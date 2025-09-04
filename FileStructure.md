linkbird-clone/
│
├─ app/                                 # Next.js App Router pages
│  ├─ auth/                             # Authentication pages
│  │   ├─ login/page.tsx
│  │   ├─ register/page.tsx
│  │   └─ forgot-password/page.tsx
│  │
│  ├─ dashboard/page.tsx                # Main dashboard
│  ├─ leads/                            
│  │   ├─ page.tsx                      # Leads table view
│  │   └─ [id]/page.tsx                 # Lead detail side sheet
│  ├─ campaigns/                        
│  │   ├─ page.tsx                      # Campaigns table view
│  │   └─ [id]/page.tsx                 # Campaign detail modal/side sheet
│  └─ settings/page.tsx                 # Settings page
│
├─ lib/                                 # Backend utilities
│  ├─ db/                               # Database connections & schema
│  │   ├─ index.ts                       # Drizzle connection to PostgreSQL
│  │   └─ schema.ts                      # Tables: Campaigns, Leads
│  ├─ auth/                              # Auth utilities
│  │   ├─ betterAuth.ts                  # Better Auth setup
│  │   └─ middleware.ts                  # Protected route middleware
│  └─ api/                               # API fetch helpers
│      ├─ leads.ts
│      └─ campaigns.ts
│
├─ components/                           # Reusable UI components
│  ├─ layout/
│  │   ├─ Sidebar.tsx                     # Collapsible sidebar
│  │   └─ Header.tsx                      # Header with breadcrumbs
│  ├─ tables/
│  │   ├─ LeadsTable.tsx                  # Infinite scroll leads table
│  │   └─ CampaignsTable.tsx              # Campaigns table with progress bars
│  ├─ cards/
│  │   └─ SummaryCard.tsx                 # Metrics card
│  ├─ modals/
│  │   └─ LeadDetailSheet.tsx             # Side sheet modal for lead details
│  └─ ui/                                 # shadcn/ui components wrappers (buttons, inputs)
│
├─ stores/                               # Zustand stores for client state
│  ├─ sidebarStore.ts                     # Sidebar collapse state
│  ├─ leadsStore.ts                       # Selected lead, filters, search
│  └─ campaignsStore.ts                   # Selected campaign, filters
│
├─ hooks/                                # Custom React hooks
│  ├─ useInfiniteLeads.ts                 # TanStack Query infinite scroll
│  └─ useCampaignStats.ts                 # Campaign statistics fetch
│
├─ types/                                # TypeScript interfaces & types
│  ├─ lead.d.ts
│  ├─ campaign.d.ts
│  └─ user.d.ts
│
├─ styles/                               # Tailwind globals / custom styles
│  └─ globals.css
│
├─ public/                               # Static assets
│  └─ images/
│
├─ .env.local                             # Environment variables (DB, Auth secrets)
├─ next.config.js
├─ package.json
└─ README.md




# Linkbird.ai Platform UI Replication - Project Overview

## Authentication
- Use **Better Auth** for credentials + Google OAuth.
- Protected routes handled via `lib/auth/middleware.ts`.

## Database
- **Drizzle ORM + PostgreSQL**
- Tables for **Campaigns** and **Leads** (users handled by Better Auth).
- Use `lib/db/schema.ts` for table definitions.

## State Management
- **Zustand** → Sidebar state, selected lead/campaign, filters, modals.
- **TanStack Query** → Infinite scroll, caching, optimistic updates.

## Components
- **Tables**: `LeadsTable`, `CampaignsTable` with sorting, filtering, and progress bars.
- **Side sheets and modals**: `LeadDetailSheet`.
- **Summary cards**: `SummaryCard` for statistics.

## UI/UX
- **Tailwind CSS** + **shadcn/ui**.
- Match demo layout & colors.
- Responsive design, hover states, smooth transitions.

## Best Practices
- Keep **services/business logic** separate from components.
- Use **TypeScript types** for all data entities.
- Optimize queries and use **React.memo** / **useMemo** where appropriate.
