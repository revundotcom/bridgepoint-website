# Bridgepoint Maintenance — Website

Static-export Next.js 14 + Tailwind CSS marketing site for `bridgepointmaintenance.com`.

## Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS
- `output: "export"` — static HTML, deployable to any static host (Vercel, Netlify, S3 + CloudFront, GitHub Pages)
- No runtime backend, no DB, no API routes

## Local development

```bash
cd website
npm install
npm run dev
# open http://localhost:3000
```

## Build & static export

```bash
npm run build
# Static HTML output → ./out/
```

## Deployment

### Vercel
```bash
cd website
vercel deploy
```

### Netlify
Push the repo and set build command `npm run build`, publish directory `out`.

### Generic static hosting
Upload contents of `./out/` to any static host. Configure rewrites for trailing slashes per host conventions.

## Project structure

```
website/
├── app/                    # Next.js App Router pages
├── components/             # Shared React components
├── lib/                    # Single source of truth for NAP, services, cities, schema
├── styles/                 # globals.css (Tailwind base)
├── public/                 # Static assets (favicon, robots.txt)
├── next.config.mjs         # Static export config
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Single source of truth — `lib/constants.ts`

All NAP (Name, Address, Phone), brand strings, and social URLs live in `lib/constants.ts`. Update there to propagate everywhere.

---

## CRITICAL — TBD fields requiring human input before launch

These items are placeholder or `[TBD]` in the codebase and **must be resolved before the site goes live**. Sources of truth: `master-data-sheet.md`, `brand-book-skeleton.md`, `footer-and-signature.md`, `schema-markup.json`.

### Brand identity assets (Designer + Zak/Nathan approval)
- [ ] Final logo SVG/PNG at all sizes — drop into `/public/assets/` and reference from `lib/schema.ts`
- [ ] Favicon at sizes 16, 32, 48, 180 (Apple Touch), 192, 512 — drop into `/public/`
- [ ] Open Graph cover image (1200x630) — `/public/assets/og-cover.jpg`, reference in `app/layout.tsx`
- [ ] Final brand color palette hex codes (Brand Book element 6) — replace `tailwind.config.ts` `navy`, `emergency`, `steel` shades if needed
- [ ] Final typography selection (Brand Book element 7) — currently using Inter via Google Fonts

### Legal & compliance (Zak)
- [ ] Legal entity name (currently `[Legal Entity Name — TBD from Zak]` in `lib/constants.ts`)
- [ ] HST/GST registration number (footer)
- [ ] ESA / TSSA / plumbing trade license numbers (footer + service pages)
- [ ] Privacy Policy — `[REQUIRES LEGAL REVIEW]` watermark in `app/privacy/page.tsx`
- [ ] Terms of Service — `[REQUIRES LEGAL REVIEW]` watermark in `app/terms/page.tsx`
- [ ] Accessibility statement — `[REQUIRES LEGAL REVIEW]` watermark in `app/accessibility/page.tsx`

### Nathan-approval-required content (Section 3.9 — uncapped liability carve-out)
- [ ] Rothenbury Group attribution language — used in `app/about/page.tsx` and `lib/schema.ts` (parentOrganization). Strip if Nathan does not approve.
- [ ] Any leadership biographies — placeholder block in `app/about/page.tsx`. Add only with written Nathan approval.

### Schema markup
- [ ] Replace approximate Concord coordinates `(43.8167, -79.5333)` with precise lat/lng of 311 Bowes Rd Unit 401 in `lib/constants.ts`
- [ ] Replace placeholder logo URL in `lib/schema.ts` once final logo is uploaded
- [ ] Verify all `sameAs` social URLs in `lib/constants.ts` resolve to live verified accounts before pushing schema

### Operational
- [ ] Wire up contact form — currently logs to console. Hook to GHL / SynthFlow / email backend per Section 3.13.
- [ ] Map embed on `/contact` — replace placeholder with Google Maps iframe or static image
- [ ] Hours-model decision (24/7 vs office-hours-with-emergency banner) — confirm with Zak; update `lib/constants.ts` `NAP.hours` and schema if changing.

### Pre-launch QA (Section 3.3(d) launch gate)
- [ ] HTTPS / TLS valid at production domain
- [ ] GA4 + GTM + GSC + Bing Webmaster connected under `tech@revun.com`
- [ ] Submit sitemap to GSC + Bing Webmaster
- [ ] Validate JSON-LD at https://validator.schema.org/ and Google Rich Results Test
- [ ] Test contact form end-to-end with destination email confirmed
- [ ] Mobile responsive QA (3 breakpoints + 1 real device per Section 3.14(o))
- [ ] Core Web Vitals green on home + 2 key templates per Section 3.14(p)
- [ ] OG tags validated per page

---

## Hard constraints honored in this build

- **No fabricated claims.** No fake reviews, ratings, case studies, or "X years of experience" lines.
- **No Nathan personal-brand content.** Sections that would mention Nathan are flagged in code with TODO comments.
- **No backend wiring.** Contact form posts via JS only and shows a success state — no actual email/CRM submission.
- **No external API keys.** No `.env` references in code.
- **NAP exact-match.** `lib/constants.ts` is the single source; pulls from confirmed `_nap-confirmed-2026-04-24.md`.
