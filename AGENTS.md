# Tube2Blog - AI Coding Agent Guide

## Project Overview

Tube2Blog converts YouTube videos into SEO-optimized blog posts. Next.js 16 App Router, Supabase, Prisma v7, Tailwind v4, shadcn/ui.

## Tech Stack (must follow)

- **Framework**: Next.js 16 App Router (Turbopack for dev, --turbopack enabled by default)
- **Styling**: Tailwind CSS v4 + shadcn/ui (Nova preset). Design tokens in `globals.css`. Brand color: `#EA580C` (orange).
- **Database**: Supabase PostgreSQL via Prisma v7 ORM with `@prisma/adapter-pg`
- **Auth**: Supabase Auth (email OTP + Google/GitHub OAuth) via `@supabase/ssr`
- **AI**: Vercel AI SDK v7 + OpenCodeGo (OpenAI-compatible). Model: `deepseek-v4-flash`
- **Payment**: Creem with `@creem_io/nextjs` SDK
- **Validation**: Zod v4
- **Testing**: Vitest

## Key Files

- `src/lib/ai/provider.ts` — AI model provider. Use `getAIModel(tier)` everywhere.
- `src/lib/youtube/transcript.ts` — YouTube transcript extraction (with optional Upstash Redis cache)
- `src/lib/supabase/server.ts` — Server-side Supabase client (Server Actions use this)
- `src/lib/supabase/client.ts` — Browser-side Supabase client
- `src/lib/prisma.ts` — Prisma v7 client singleton
- `src/proxy.ts` — Route protection (Next.js 16 proxy, NOT middleware)
- `src/components/header.tsx` — Public navigation (sticky, hides on dashboard/admin)
- `src/app/globals.css` — All CSS variables and design tokens

## Architecture Rules

### Server Actions
- All form submissions use Server Actions in `src/actions/`
- Input/output validated with Zod schemas
- Auth state checked via `createClient()` from `@/lib/supabase/server`

### Pages
- Public pages export `metadata` from Next.js Metadata API
- Homepage title must include `- Tube2Blog` directly (template does NOT apply to `/`)
- Sub-pages title template `%s - Tube2Blog` auto-appends brand name
- Dashboard/admin pages set `robots: { index: false }`

### Database (Prisma v7)
- **DO NOT** put `datasource { url }` in schema.prisma — config is in `prisma.config.ts`
- PrismaClient requires `adapter` parameter (use `PrismaPg` from `@prisma/adapter-pg`)
- Generated client at `src/generated/prisma/` — excluded from git, generated via `postinstall`
- Build: `prisma generate` runs before `next build`

### Styling
- Use shadcn/ui components only. No custom CSS classes for spacing/colors.
- Brand colors: use `bg-brand`, `text-brand`, `ring-brand/50` (defined in globals.css)
- Custom shadow: `shadow-soft`

### Proxy (Next.js 16)
- File is `src/proxy.ts` (NOT `middleware.ts`)
- Export function is `proxy` (NOT `middleware`)
- Only matches protected routes: `/dashboard/:path*`, `/settings/:path*`, `/team/:path*`, `/admin/:path*`, `/checkout`

### SEO Requirements
- Every public page MUST export `metadata`
- Landing page MUST have FAQ Schema (JSON-LD)
- Blog posts MUST have Article Schema (JSON-LD)
- All images use `next/image` with descriptive alt text
- Canonical tags on all public pages

## Version

v0.1.1
