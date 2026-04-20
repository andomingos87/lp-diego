# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Express + Vite HMR) on port 5000
npm run build      # Build for production (Vite frontend + esbuild server)
npm run start      # Run production build
npm run check      # TypeScript type checking
npm run db:push    # Push Drizzle schema changes to PostgreSQL
```

No test suite exists in this project.

## Architecture

This is a full-stack landing page for a Brazilian condominium services brand with lead capture. A single Express server (port 5000) serves both the API and the React SPA.

**Three layers:**
- `client/` — React 18 SPA built with Vite. Single page at `/` (`client/src/pages/Web.tsx`). Uses TanStack Query for API calls via the `apiRequest` helper in `client/src/lib/queryClient.ts`.
- `server/` — Express 5 API. Routes in `server/routes.ts`, data layer in `server/storage.ts` (DatabaseStorage class implementing IStorage). In development, Vite is mounted as middleware; in production, static files are served from `dist/public`.
- `shared/` — `shared/schema.ts` defines Drizzle ORM tables and Zod validation schemas used by both frontend and backend.

**Lead capture data flow:**
```
Web.tsx form → POST /api/leads → Zod validation → DatabaseStorage.insertLead() → PostgreSQL
```

**Database tables** (PostgreSQL via Drizzle ORM):
- `leads` — form submissions: name, phone, city_state, role (enum), revenue_range (enum), created_at
- `users` — auth skeleton (Passport.js wired up but not actively used)

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:
- `@/` → `client/src/`
- `@shared/` → `shared/`

## Design System

Brand tokens are CSS variables in `client/src/index.css` and extended in `tailwind.config.ts`:
- Colors: `brand-green`, `brand-green-light`, `brand-dark`, `brand-dark-deep`, `brand-gray`, `brand-gray-light`, `brand-text`, `brand-text-muted`
- Fonts: Outfit (headings), Inter (body), Poppins (labels/logo)

UI components are Radix UI primitives wrapped shadcn-style in `client/src/components/ui/`.

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required)
- `NODE_ENV` — `development` or `production`
- `PORT` — defaults to 5000
