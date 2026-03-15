# Soluções Condominiais — Landing Page

## Overview
A responsive landing page for a Brazilian condominium services brand ("Soluções Condominiais") that captures leads via an integrated form. Originally imported from Figma, rebuilt with semantic HTML, responsive layout, and a working lead capture backend.

## Architecture
- **Frontend**: React + Vite + TailwindCSS (SPA at `/`)
- **Backend**: Express.js API (`POST /api/leads`, `GET /api/leads`)
- **Database**: PostgreSQL via Drizzle ORM
- **Styling**: TailwindCSS with custom brand tokens

## Key Files
| File | Purpose |
|------|---------|
| `client/src/pages/Web.tsx` | Main landing page component with lead capture form |
| `client/src/index.css` | CSS variables (brand tokens, shadcn theme) |
| `tailwind.config.ts` | Tailwind config with brand colors, fonts |
| `client/index.html` | HTML shell with Google Fonts, meta tags |
| `shared/schema.ts` | Drizzle schema for `leads` table + Zod validation |
| `server/routes.ts` | API routes for lead capture |
| `server/storage.ts` | DatabaseStorage class (PostgreSQL) |

## Design System
- **Brand green**: `--brand-green: 113 100% 40%` (HSL)
- **Fonts**: Outfit (headings), Inter (body), Poppins (labels/logo)
- **Tailwind aliases**: `brand-green`, `brand-dark`, `brand-gray`, `brand-text` + variants
- **Min font sizes**: labels 12px (`text-xs`), body 14px (`text-sm`)

## Database
- `leads` table: id (serial PK), name, phone, city_state, role (enum), revenue_range (enum), created_at
- Role values: "Síndico profissional" | "Administrador" | "Síndico morador"
- Revenue range values: "Até R$ 20.000" | "Até R$ 50.000" | "Acima de R$ 50.000 até R$ 100.000"

## Running
- `npm run dev` starts Express + Vite on port 5000
- `npm run db:push` syncs Drizzle schema to PostgreSQL
