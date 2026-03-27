# The Drone Post — V1 Design Spec

> India's Drone Media & Resource Platform — thedronepost.in

## Aesthetic Direction

**Light-themed editorial with neo-brutalist accents** — clean, authoritative, modern. Dense content-rich media homepage like TechCrunch or The Verge. Sharp square corners, bold typography, deep orange accents, asymmetric hero layout. Selective dark sections (navbar, hero, directory teaser, footer) create contrast rhythm. The homepage must feel alive, authoritative, and full of stories at all times.

## Typography

- **Headings**: Outfit — clean modern geometric sans, bold and confident
- **Body**: DM Sans — readable geometric sans
- Both loaded via `next/font/google`

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FFFFFF` | Primary background (light) |
| `--surface` | `#F5F5F5` | Cards, elevated surfaces |
| `--border` | `#E5E5E5` | Card borders, dividers |
| `--bg-dark` | `#0A0A0A` | Navbar, hero, footer, directory teaser |
| `--accent` | `#EA580C` | Deep orange — CTAs, highlights, hover |
| `--text` | `#111111` | Primary body text |
| `--text-muted` | `#6B7280` | Secondary text, dates, read time |
| `--text-on-dark` | `#FFFFFF` | Text on dark sections |
| `--text-on-dark-muted` | `#9CA3AF` | Muted text on dark sections |

### Category Color Codes

| Category | Color | Hex |
|----------|-------|-----|
| Defense | Red | `#DC2626` |
| Technology | Blue | `#2563EB` |
| Industry / News | Orange | `#EA580C` |
| Guide | Green | `#16A34A` |
| Company Story | Purple | `#9333EA` |
| Technical | Cyan | `#0891B2` |

These colors are used consistently for category tags across every article card, listing, and article page.

## Card Style

- 1px `#E5E5E5` border, sharp square corners (zero border-radius)
- `#F5F5F5` background on light sections
- On hover: deep orange accent line appears at top + subtle lift (translateY -2px)
- All article cards show minimum: image, category tag (color-coded), headline, read time

## Motion

Purposeful, not excessive:
- Staggered fade-in on scroll for sections (CSS `animation-delay` with `IntersectionObserver`)
- Deep orange accent line reveal on card hover (width transition)
- Smooth color transitions on hover states (150ms ease)
- No heavy animation libraries — CSS-only

## Mobile

- Single column layout throughout
- Navbar collapses to hamburger menu icon
- Full-screen overlay nav: `#0A0A0A` background, large stacked Outfit Bold links, deep orange hover state, "Subscribe" CTA at bottom
- Touch-friendly tap targets (min 44px)

---

## Homepage Sections

### 1. Navbar (sticky, dark)

- **Left**: Logo — "The Drone Post" in Outfit Bold, white text with "Drone" in deep orange #EA580C
- **Center**: Links in white — News, Guides, Technical, Companies, Tools, Directory, Services
- **Right**: Search icon + "Subscribe" button (deep orange #EA580C bg, white text)
- Sticky on scroll, `#0A0A0A` background, thin deep orange bottom border (1px)
- Mobile: hamburger icon replaces center links + search

### 2. Breaking News Ticker (optional)

- Thin scrolling bar just below navbar
- Latest headlines scrolling horizontally (CSS animation, `@keyframes`)
- Deep orange text on dark background
- Can be toggled on/off from Sanity (boolean field on site settings singleton)

### 3. Hero Section (dark)

Asymmetric layout on dark `#0A0A0A` background with subtle radial orange-to-dark gradient + faint dot grid overlay.

- **Left (~60%)**: 1 large featured story
  - Big featured image
  - Category tag (color-coded)
  - Large Outfit Bold headline in white
  - Excerpt (2-3 lines) in `#9CA3AF`
  - Author name + read time
  - The featured article is marked via a `featured` boolean in Sanity

- **Right (~40%)**: 3 smaller secondary stories stacked vertically
  - Image thumbnail (small)
  - Category tag
  - Headline in white
  - Read time

- Full width, dark background

### 4. Latest Stories Grid (light)

- White background
- Section title: "Latest Stories" in Outfit Bold `#111111`
- 6 article cards in a 3×2 grid on `#F5F5F5` with 1px `#E5E5E5` borders
- Each card: featured image, category tag (color-coded), headline in Outfit, excerpt in DM Sans, author avatar + name, date, read time
- Deep orange "Load More" button at bottom (client-side pagination — fetches next 6 from Sanity)
- Mobile: single column, 6 cards stacked

### 5. Trending This Week (light)

- White background
- Section title: "Trending" in Outfit Bold
- 4 articles in a horizontal row
- Numbered `01` `02` `03` `04` on the left in large deep orange Outfit Bold
- No images — text only, clean editorial style
- Headline + category tag + read time
- Thin bottom borders separating each item
- Curated manually via a `trending` boolean in Sanity
- Mobile: stacked vertically, numbers still prominent

### 6. Technical Explainers (light)

- White background
- Section title: "Technical Deep Dives" in Outfit Bold
- 4 cards in a row on `#F5F5F5` with 1px `#E5E5E5` borders
- Each card: topic icon, title in Outfit, difficulty badge (Beginner=green, Intermediate=orange, Advanced=red), read time
- Deep orange border on hover
- Filtered from Sanity: category === "Technical"
- Mobile: 2×2 grid or horizontal scroll

### 7. Company Spotlight (off-white)

- Background `#F5F5F5` to separate from surrounding white sections
- Section title: "Company Spotlight" in Outfit Bold
- 2 wide cards side by side on white `#FFFFFF` with 1px `#E5E5E5` borders
- Each card: company logo area (image from Sanity), company name, story headline, excerpt, "Read Story" deep orange CTA
- Filtered from Sanity: category === "Company Story", latest 2
- Mobile: stacked vertically

### 8. India Drone Directory Teaser (dark)

- Full width band, dark `#0A0A0A` background with subtle CSS grid pattern
- Centered headline "Discover India's Drone Ecosystem" in Outfit Bold white
- Subline in `#9CA3AF`: "Manufacturers, component suppliers, software providers and service companies — all in one place"
- Large centered search bar with white background
- 4 category buttons below in outline style: Manufacturers, Components, Software, Services
- Deep orange "List Your Company" CTA button
- Non-functional in V1 — links to /directory coming-soon page

### 9. UAV Tools (light)

- White background
- Section title: "UAV Tools" in Outfit Bold
- 3 tool cards in a row on `#F5F5F5` with 1px borders
- Each: icon, tool name in Outfit, one-line description in DM Sans, deep orange "Launch Tool" button
- Tools: Flight Time Calculator (V1, functional), Payload Calculator (V2, coming soon), Battery Comparison (V2, coming soon)
- Mobile: stacked vertically

### 10. Guides — "Learn Drones" (light)

- White background
- Section title: "Learn Drones" in Outfit Bold
- Row 1: 3 beginner guide cards (green badges)
- Row 2: 3 advanced/technical guide cards (red badges)
- Each card on `#F5F5F5`: featured image, difficulty badge, title in Outfit, read time
- Filtered from Sanity: category === "Guide", split by `difficulty` field
- Mobile: single column

### 11. Newsletter Band (deep orange)

- Full width, deep orange `#EA580C` background
- White text
- Headline in Outfit Bold: "Stay Ahead of the Drone Industry"
- Subline: "Weekly news, guides and industry insights — straight to your inbox"
- White-bordered email input + black "Subscribe" button
- "Join 3,000+ subscribers" text below input
- API: POST to `/api/newsletter` → Brevo API

### 12. Services Strip (light)

- White background, thin top border
- Title: "Work With Us" in Outfit Bold
- 4 service items in a row: Media Partnerships, Consultancy, CAD Design, Custom Software
- Each: icon + name + one-line description
- Deep orange "Get In Touch" CTA at the end (links to /services)
- Mobile: 2×2 grid

### 13. Footer (dark)

- Dark `#0A0A0A` background
- 4 columns in white text: About, Content, Tools, Services
- Logo "The Drone Post" in Outfit Bold + tagline in `#9CA3AF`: "India's Drone Media & Resource Platform"
- Social icons: LinkedIn, Instagram, YouTube, Twitter
- Bottom bar in `#6B7280`: `© 2025 The Drone Post · Built in India · Privacy Policy · Contact`

---

## Sanity CMS Schema

### Article

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Required |
| `slug` | slug | Auto from title |
| `category` | string (enum) | News, Guide, Technical, Company Story, Defense, Technology, Industry |
| `tags` | array of strings | Free-form tags |
| `difficulty` | string (enum) | Beginner, Intermediate, Advanced — for guides/technical only |
| `author` | reference → Author | Required |
| `publishedAt` | datetime | Required |
| `featuredImage` | image | With alt text, required |
| `body` | portable text | Rich text with code blocks, images, embeds |
| `excerpt` | text | Manual excerpt for cards (max 160 chars) |
| `seoTitle` | string | Falls back to title |
| `seoDescription` | text | Falls back to excerpt |
| `featured` | boolean | Marks article for hero section |
| `trending` | boolean | Marks article for trending section |
| `readingTime` | number | Auto-calculated from body word count |

### Author

| Field | Type |
|-------|------|
| `name` | string |
| `slug` | slug |
| `image` | image |
| `bio` | text |
| `role` | string |

### Site Settings (singleton)

| Field | Type | Notes |
|-------|------|-------|
| `showBreakingTicker` | boolean | Toggle ticker on/off |
| `breakingHeadlines` | array of strings | Ticker content |
| `subscriberCount` | number | For newsletter band display |

---

## Pages (V1)

### Articles Listing (`/articles`)
- Filter tabs: All, News, Guides, Technical, Company Stories
- Article cards in grid (same style as homepage Latest Stories)
- Pagination or infinite scroll
- SEO: dynamic metadata per filter

### Article Page (`/articles/[slug]`)
- Clean readable layout, max-width 720px content column
- Featured image (full width above or hero)
- Category tag + date + read time + author (with avatar)
- Portable text body (rendered from Sanity)
- Social share buttons (LinkedIn, Twitter, WhatsApp, Copy Link)
- Related articles (3 cards, same category)
- JSON-LD structured data (Article schema)
- Dynamic OG metadata from Sanity fields

### Flight Time Calculator (`/tools/flight-time-calculator`)
- Inputs: battery capacity (mAh), voltage (V), average current draw (A), hover vs forward flight ratio (slider)
- Output: estimated flight time in minutes (with visual gauge)
- Formula: `(capacity / 1000 * voltage) / (current * ratio_factor) * 60`
- Clean UI, real-time calculation as inputs change
- Mobile friendly

### Services (`/services`)
- 4 sections: Media & Brand Partnerships, Drone Consultancy, CAD Design Services, Custom Software Development
- Each: description, what's included, inquiry form (name, email, company, message)
- Form submits to email via API route

### Newsletter (`/newsletter`)
- Dedicated signup page with more detail
- Same Brevo integration as the band

### Directory Coming Soon (`/directory`)
- Simple teaser page with email capture for launch notification

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity v3 |
| Hosting | Vercel (free tier) |
| Newsletter | Brevo (free tier) |
| Styling | Tailwind CSS |
| Fonts | Outfit + DM Sans (next/font) |
| Icons | Lucide React |
| Database | Supabase (V2 — directory) |

---

## SEO

- Every page: `<title>`, `<meta description>`, Open Graph, Twitter Card
- Articles: `generateMetadata` with dynamic title/description/image from Sanity
- Article pages: JSON-LD Article schema
- Homepage: JSON-LD WebSite + Organization schema
- `sitemap.xml` generated from Sanity articles
- `robots.txt` allowing all crawlers
- Proper heading hierarchy (single h1 per page)
- Alt text on all images
- Canonical URLs

---

## Project Structure

```
thedronepost/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Homepage
│   ├── articles/
│   │   ├── page.tsx                  # Listing with filters
│   │   └── [slug]/page.tsx           # Article page
│   ├── tools/
│   │   ├── page.tsx
│   │   └── flight-time-calculator/page.tsx
│   ├── services/page.tsx
│   ├── newsletter/page.tsx
│   ├── directory/page.tsx            # Coming soon
│   └── api/newsletter/route.ts       # Brevo API
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Footer.tsx
│   │   └── BreakingTicker.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── LatestStories.tsx
│   │   ├── TrendingSection.tsx
│   │   ├── TechnicalDives.tsx
│   │   ├── CompanySpotlight.tsx
│   │   ├── DirectoryTeaser.tsx
│   │   ├── UAVTools.tsx
│   │   ├── GuidesSection.tsx
│   │   ├── NewsletterBand.tsx
│   │   └── ServicesStrip.tsx
│   ├── articles/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleGrid.tsx
│   │   ├── ArticleFilters.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── RelatedArticles.tsx
│   │   └── PortableTextRenderer.tsx
│   ├── tools/
│   │   └── FlightTimeCalculator.tsx
│   ├── services/
│   │   ├── ServiceSection.tsx
│   │   └── InquiryForm.tsx
│   └── shared/
│       ├── CategoryBadge.tsx
│       ├── DifficultyBadge.tsx
│       ├── NewsletterForm.tsx
│       ├── SectionHeader.tsx
│       ├── ScrollReveal.tsx
│       └── Button.tsx
├── sanity/
│   ├── schemas/
│   │   ├── article.ts
│   │   ├── author.ts
│   │   └── siteSettings.ts
│   ├── lib/client.ts
│   └── sanity.config.ts
├── lib/
│   ├── sanity.queries.ts
│   ├── sanity.image.ts
│   ├── utils.ts
│   └── constants.ts
├── public/images/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
BREVO_API_KEY=
NEXT_PUBLIC_SITE_URL=https://thedronepost.in
```
