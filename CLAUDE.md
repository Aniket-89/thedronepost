# The Drone Post — CLAUDE.md

> India's Drone Media & Resource Platform — thedronepost.in

## Project Overview

The Drone Post is a drone and defense media platform serving two audiences:
1. **Drone enthusiasts/hobbyists** — technical explainers, how-to guides, component comparisons, tools
2. **Drone startups/companies** — industry news, company stories, media partnership opportunities

Current traction: 3,000+ LinkedIn followers, 10K–15K organic impressions/post, 30+ existing LinkedIn posts to convert into articles.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 (App Router) | Latest version |
| CMS | Sanity v3 | Headless CMS for articles |
| Hosting | Vercel (free tier) | thedronepost.in |
| Newsletter | Brevo (free tier) | Email capture + campaigns |
| Database | Supabase (free tier) | For Drone Directory (v2) |
| Styling | Tailwind CSS | Light-themed editorial design |
| Fonts | Outfit (headings) + DM Sans (body) | via next/font/google |
| Icons | Lucide React | Consistent icon set |

## Brand Identity

- **Name**: The Drone Post
- **Domain**: thedronepost.in
- **Personality**: Bold, technical, credible, premium — "The Verge but for drones"
- **Logo**: "The Drone Post" in Outfit Bold — white on dark, "Drone" in deep orange
- **Aesthetic**: Light-themed editorial with neo-brutalist accents — sharp corners, bold typography, deep orange accents, asymmetric layouts. Selective dark sections for contrast.

### Color Palette

```
--bg:              #FFFFFF    (primary background — light)
--surface:         #F5F5F5    (cards, elevated surfaces)
--border:          #E5E5E5    (card borders, dividers)
--bg-dark:         #0A0A0A    (navbar, hero, footer, directory teaser)
--accent:          #EA580C    (deep orange — CTAs, highlights, hover)
--text:            #111111    (primary body text)
--text-muted:      #6B7280    (secondary text, dates, read time)
--text-on-dark:    #FFFFFF    (text on dark sections)
--text-on-dark-muted: #9CA3AF (muted text on dark sections)
```

### Category Color Codes (consistent everywhere)

| Category | Color | Hex |
|----------|-------|-----|
| Defense | Red | `#DC2626` |
| Technology | Blue | `#2563EB` |
| News / Industry | Orange | `#EA580C` |
| Guide | Green | `#16A34A` |
| Company Story | Purple | `#9333EA` |
| Technical | Cyan | `#0891B2` |

### Design Rules

- Light theme is primary — white/off-white background for content sections
- Dark sections (navbar, hero, directory teaser, footer) create contrast rhythm
- Sharp square corners on all cards (zero border-radius) — neo-brutalist
- 1px #E5E5E5 borders on cards (light), thin orange bottom border on navbar
- Deep orange hover: accent line at top of cards + subtle lift
- Purposeful motion: staggered fade-in on scroll, hover transitions (CSS-only)
- Mobile-first responsive
- Dense content-rich layout like TechCrunch/The Verge — NOT a minimal landing page
- Full-screen overlay mobile nav with large Outfit Bold links

## Homepage Sections (in order)

1. **Navbar** — sticky dark, logo left ("Drone" in orange), links center, search + subscribe right
2. **Breaking Ticker** (optional) — scrolling orange headlines, toggleable from Sanity
3. **Hero** (dark) — asymmetric: large featured article left (60%), 3 stacked secondary articles right (40%), orange radial gradient bg
4. **Latest Stories** (light) — 3×2 grid (6 cards), "Load More" button
5. **Trending** (light) — 4 numbered articles (01-04 in orange), text-only, editorial
6. **Technical Deep Dives** (light) — 4 cards with topic icon, difficulty badge, orange hover border
7. **Company Spotlight** (off-white) — 2 wide cards, white bg, "Read Story" CTA
8. **Directory Teaser** (dark) — "Discover India's Drone Ecosystem", search bar, 4 category buttons
9. **UAV Tools** (light) — 3 tool cards, "Launch Tool" buttons
10. **Learn Drones** (light) — 6 guide cards (3 beginner + 3 advanced), difficulty badges
11. **Newsletter Band** (orange bg) — email capture, subscriber count, black subscribe button
12. **Services Strip** (light) — "Work With Us", 4 service icons, "Get In Touch" CTA
13. **Footer** (dark) — 4 columns, social icons, copyright

## Sanity CMS Schema

### Article
- `title` — string (required)
- `slug` — slug (auto from title)
- `category` — enum: News | Guide | Technical | Company Story | Defense | Technology | Industry
- `tags` — array of strings
- `difficulty` — enum: Beginner | Intermediate | Advanced (guides/technical only)
- `author` — reference → Author
- `publishedAt` — datetime
- `featuredImage` — image with alt text
- `body` — portable text (rich text + code blocks)
- `excerpt` — text (max 160 chars, for cards)
- `seoTitle` — string (falls back to title)
- `seoDescription` — text (falls back to excerpt)
- `featured` — boolean (hero section)
- `trending` — boolean (trending section)
- `readingTime` — number (auto-calculated)

### Author
- `name`, `slug`, `image`, `bio`, `role`

### Site Settings (singleton)
- `showBreakingTicker` — boolean
- `breakingHeadlines` — array of strings
- `subscriberCount` — number

## SEO Requirements

- Every page: `<title>`, `<meta description>`, OG tags, Twitter Card
- Articles: `generateMetadata` with dynamic Sanity data
- JSON-LD: Article schema on articles, WebSite + Organization on homepage
- `sitemap.xml` from Sanity articles, `robots.txt`
- Single h1 per page, alt text on all images, canonical URLs

## Code Conventions

- TypeScript throughout
- Server Components by default, `'use client'` only when needed
- `next/image` for all images, `next/font` for fonts
- Sanity queries in `/lib/sanity.queries.ts`
- Category colors in `/lib/constants.ts`
- Semantic HTML, minimal comments
- Small focused components

## Business Model

Revenue: sponsored content, paid directory listings (v2), consultancy/services, newsletter sponsorships (future).
The site must look premium and credible to attract B2B partnerships.

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
BREVO_API_KEY=
NEXT_PUBLIC_SITE_URL=https://thedronepost.in
```

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run start        # Production server
```

## Design Spec

Full design spec: `docs/superpowers/specs/2026-03-27-thedronepost-v1-design.md`
