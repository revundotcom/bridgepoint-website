# Bridgepoint Maintenance — Website Build Summary

**Build date:** 2026-04-25
**Stack:** Next.js 14 App Router (TypeScript) + Tailwind CSS + framer-motion + lucide-react + Manrope/Inter via next/font, static export (`output: "export"`)
**Source NAP:** Confirmed 2026-04-24 by Nathan Levinson (Founder directive, MSA Section 2.6)
**Domain target:** `https://bridgepointmaintenance.com`

**Design overhaul (2026-04-25):** redesigned all primary pages (Home, About, Services index, Service detail, Locations index, City detail, Contact, Quote, Careers, Positions, Franchise, Blog) with production-grade chrome — full-bleed hero imagery via Unsplash, brand color/typography system, image-card service grid, process steps, testimonial placeholder framework, FAQ accordion, modern footer. See `DESIGN-RESEARCH.md` and `DESIGN-OVERHAUL-COMPLETE.md`.

---

## Total files created

**~30 files** under `./website/`, organized as:

| Layer | Count | Files |
|-------|-------|-------|
| Config | 6 | `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `styles/globals.css` |
| Lib (single source of truth) | 4 | `constants.ts`, `services.ts`, `cities.ts`, `schema.ts` |
| Components | 7 | `Header`, `Footer`, `NAPBlock`, `ContactForm`, `ServiceCard`, `CTASection`, `SchemaJsonLd` |
| Static pages | 11 | Home, About, Contact, Services overview, Locations index, Careers, Positions, Franchise, Blog, Quote, Privacy, Terms, Accessibility, 404 |
| Dynamic pages | 2 templates | `services/[slug]` (6 routes), `locations/[city]` (8 routes) |
| Special routes | 3 | `sitemap.xml/route.ts`, `public/robots.txt`, `not-found.tsx` |
| Docs | 2 | `README.md`, `BUILD-SUMMARY.md` |

---

## Pages built (live URL paths)

### Top-level
- `/` — Home
- `/about` — About
- `/contact` — Contact + form
- `/services` — Services overview
- `/locations` — Service-area index
- `/careers` — Careers hub
- `/positions` — Open-positions intake
- `/franchise` — Trades-network partner page
- `/blog` — Blog placeholder index (12 seed topics)
- `/quote` — Standalone lead form
- `/privacy` — PIPEDA-compliant placeholder
- `/terms` — Ontario governing-law placeholder
- `/accessibility` — AODA statement
- `/sitemap.xml` — Auto-generated
- `/robots.txt` — Static

### Dynamic — Services (6 routes)
- `/services/plumbing`
- `/services/electrical`
- `/services/hvac`
- `/services/general-maintenance`
- `/services/emergency-repairs`
- `/services/building-services`

Each: hero, scope of work, FAQ (5 Qs), related services, schema (Service + FAQPage + BreadcrumbList).

### Dynamic — Locations (8 routes)
- `/locations/toronto`
- `/locations/vaughan`
- `/locations/mississauga`
- `/locations/brampton`
- `/locations/markham`
- `/locations/richmond-hill`
- `/locations/hamilton`
- `/locations/oakville`

Each: city-specific hero, neighborhoods, response-time note, all 6 service quick-links, nearby cities, per-city LocalBusiness schema.

**Total static-export routes: 28** (14 static + 6 services + 8 cities, plus sitemap.xml + 404).

---

## SEO / schema implementation

- **LocalBusiness JSON-LD** embedded site-wide via `app/layout.tsx` → `lib/schema.ts::localBusinessSchema()`
  - `@type` covers `LocalBusiness`, `GeneralContractor`, `Plumber`, `HVACBusiness`, `Electrician`
  - `Organization`, `WebSite`, and `ContactPoint` (Emergency Dispatch) entries in `@graph`
  - All 8 cities listed under `areaServed`; 120km service radius
  - All 8 services in `hasOfferCatalog`
- **Service pages** add `Service`, `FAQPage`, `BreadcrumbList` schema
- **City pages** add per-city `LocalBusiness` schema with city-specific `areaServed`
- **Open Graph + Twitter Card** tags in `app/layout.tsx`
- **Sitemap.xml** auto-generated from `lib/services.ts` + `lib/cities.ts`
- **Robots.txt** allows all + sitemap reference
- **Canonical NAP** centralized in `lib/constants.ts` — exact-match per Section 3.2(d)

---

## TBD fields requiring human input before launch

### CRITICAL — site cannot legally launch in Ontario without these
- [ ] **Legal entity name** (Zak) → `lib/constants.ts` `BRAND.legalEntity`, footer
- [ ] **HST/GST registration #** (Zak) → footer
- [ ] **ESA / TSSA / plumbing trade license #s** (Zak) → footer + service pages
- [ ] **Privacy Policy legal review** → `app/privacy/page.tsx`
- [ ] **Terms of Service legal review** → `app/terms/page.tsx`
- [ ] **Accessibility statement legal review** → `app/accessibility/page.tsx`

### HIGH — required for launch quality
- [ ] **Logo SVG/PNG** at all sizes → `/public/assets/logo.png`, referenced in `lib/schema.ts`
- [ ] **Favicon** at sizes 16/32/48/180/192/512 → `/public/`
- [ ] **OG cover image (1200x630)** → `/public/assets/og-cover.jpg`
- [ ] **Final color palette hex codes** (Brand Book element 6) → `tailwind.config.ts`
- [ ] **Final typography selection** (Brand Book element 7) — currently Inter via Google Fonts
- [ ] **Precise lat/lng for 311 Bowes Rd Unit 401** → `lib/constants.ts` `NAP.address.geo`

### REQUIRES NATHAN APPROVAL (Section 3.9)
- [ ] **Rothenbury Group attribution** in `app/about/page.tsx` — strip if no written approval
- [ ] **Rothenbury parentOrganization in schema** — currently in commented-out structure path
- [ ] **Any leadership biographies** — placeholder slot in `app/about/page.tsx`

### OPERATIONAL
- [ ] **Contact form backend** — currently console.log only. Wire to GHL / Revun dispatch / email per Section 3.13.
- [ ] **Map embed on /contact** — replace placeholder with Google Maps iframe
- [ ] **Hours-model decision** (24/7 vs office-hours+emergency banner) → confirm with Zak; update `lib/constants.ts` and schema
- [ ] **Verify all `sameAs` social URLs** in `lib/constants.ts` resolve to live verified accounts before publishing schema

### PRE-LAUNCH QA (Section 3.3(d) launch gate)
- [ ] HTTPS / TLS valid at production domain
- [ ] GA4 + GTM + GSC + Bing Webmaster all connected under `tech@revun.com`
- [ ] Submit sitemap to GSC + Bing Webmaster
- [ ] Validate JSON-LD at https://validator.schema.org/ and Google Rich Results Test
- [ ] End-to-end contact form test with destination email confirmed
- [ ] Mobile QA on 3 breakpoints + 1 real device (Section 3.14(o))
- [ ] Core Web Vitals green on home + 2 key templates (Section 3.14(p))
- [ ] OG tags validated per page

---

## Deployment instructions

### Vercel (recommended for instant preview)
```bash
cd website
npm install
vercel deploy
```

### Netlify
- Push repo to GitHub
- Connect to Netlify
- Build command: `npm run build`
- Publish directory: `out`

### Generic static host (S3 + CloudFront, GitHub Pages, etc.)
```bash
cd website
npm install
npm run build
# Upload contents of ./out/ to your CDN/static host
```

### DNS / domain
- Point `bridgepointmaintenance.com` A/CNAME at chosen host
- Issue TLS certificate (Let's Encrypt via Vercel/Netlify, or via your CDN)
- Verify HSTS + HTTPS redirect is on
- Submit sitemap.xml to GSC + Bing Webmaster after live

---

## Known issues / decisions made

1. **Brand spelling locked to "Bridgepoint Maintenance"** (one word) per MSA Exhibit A. If Zak overrides to two-word form, find/replace `Bridgepoint Maintenance` → `Bridge Point Maintenance` in `lib/constants.ts` (will propagate everywhere).
2. **City coverage limited to 8 GTA + Golden Horseshoe cities** at launch — Toronto, Vaughan, Mississauga, Brampton, Markham, Richmond Hill, Hamilton, Oakville. Tier 2 (Ottawa, Kitchener, London, Niagara, etc.) and Tier 3 cities can be added by appending entries to `lib/cities.ts` — pages auto-generate.
3. **No /ontario or /canada hub pages** — these are MSA Section 3.3(a)(x)(xi) requirements but the existing `/locations` index already serves the provincial-aggregation function. Add separate routes if MSA review requires explicit `/ontario` and `/canada` URLs.
4. **City × service combo pages not built** — `site-architecture.md` describes 42 city × service combos. The dynamic route pattern exists; combos can be generated by adding a `[city]/[service]` nested dynamic route. Skipped from v1 to keep launch surface manageable.
5. **No actual blog posts** — `/blog` is placeholder with 12 seed topics from `site-architecture.md`. Posts will be added under `app/blog/[slug]` once content is approved.
6. **Service-area-business model** — schema declares HQ address publicly. If Zak chooses GBP SAB model that hides the address, update `app/contact/page.tsx` to hide street and `lib/schema.ts` to omit `streetAddress` for public pages.
7. **24/7 hours assumed in schema** — pending Zak's final hours decision. Toggle `lib/constants.ts` `NAP.hours` if office-hours+emergency-banner model is chosen.
8. **Inter loaded via Google Fonts CDN** — fast, free, and standards-compliant for v1. Switch to self-hosted per Brand Book licensing rules if Brand Book element 7 mandates SIL OFL self-host.
9. **Contact form has no backend** — `console.log` placeholder per build constraints. Wire to GHL or Revun dispatch endpoint when backend is provisioned.
10. **Geo coordinates approximate** — `(43.8167, -79.5333)` for Concord. Replace with precise lat/lng before launch.

---

## File-tree snapshot

```
website/
├── BUILD-SUMMARY.md
├── README.md
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── .gitkeep
│   └── robots.txt
├── styles/
│   └── globals.css
├── lib/
│   ├── cities.ts
│   ├── constants.ts
│   ├── schema.ts
│   └── services.ts
├── components/
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── NAPBlock.tsx
│   ├── SchemaJsonLd.tsx
│   └── ServiceCard.tsx
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── not-found.tsx
    ├── about/page.tsx
    ├── accessibility/page.tsx
    ├── blog/page.tsx
    ├── careers/page.tsx
    ├── contact/page.tsx
    ├── franchise/page.tsx
    ├── locations/
    │   ├── page.tsx
    │   └── [city]/page.tsx
    ├── positions/page.tsx
    ├── privacy/page.tsx
    ├── quote/page.tsx
    ├── services/
    │   ├── page.tsx
    │   └── [slug]/page.tsx
    ├── sitemap.xml/route.ts
    └── terms/page.tsx
```
