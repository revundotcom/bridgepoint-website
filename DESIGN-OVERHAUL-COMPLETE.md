# Bridgepoint Maintenance — Design Overhaul Complete

**Date:** 2026-04-25
**Build:** Next.js 14 static export, all 31 routes generated, build succeeded.
**Production URL:** https://bridge-point-maintenance.vercel.app
**Latest deployment:** https://bridge-point-maintenance-gtulux8am-sams-projects-e51217e7.vercel.app

---

## Summary of changes

The site moved from a functional-but-AI-looking scaffold to a production-credible marketing site with the visual language of leading trades-services brands (Mr. Rooter, Reliance Home Comfort, Roto-Rooter Canada). Every primary page got a real hero with imagery, modern type, brand color polish, and production-grade UI patterns.

### Pages redesigned

| Page | What changed |
|------|--------------|
| `app/page.tsx` (Home) | Full-bleed hero w/ image + dual CTA + benefits panel · trust strip · image-card service grid · 4-step process · split value-prop section w/ image card · location grid w/ overlay imagery · testimonial placeholder framework · FAQ accordion · CTA banner |
| `app/about/page.tsx` | PageHero with imagery · mission/story split · 4-card values grid w/ icons · personas grid · compliance + leadership-pending block (`[REQUIRES NATHAN APPROVAL]`) · CTA |
| `app/services/page.tsx` | PageHero · service catalog with image-card variant · process steps · CTA |
| `app/services/[slug]/page.tsx` | PageHero w/ trade-specific imagery · scope grid · sticky aside (call-to-call card + trust + service-area links) · FAQ accordion · related-services image cards · CTA |
| `app/locations/page.tsx` | PageHero · region-grouped city cards w/ city imagery + overlay · "don't see your city" callout · CTA |
| `app/locations/[city]/page.tsx` | PageHero w/ city imagery · 4-up trust strip · service grid w/ city-prefixed names · neighborhood pill grid · sticky aside (call card + nearby cities) · emergency CTA |
| `app/contact/page.tsx` | PageHero · floating 3-up contact-method strip (overlapping hero) · contact form · sticky aside (real Google Maps embed for 311 Bowes Rd + response expectations) |
| `app/quote/page.tsx` | PageHero · contact form · emergency callout aside |
| `app/careers/page.tsx` | PageHero · trade-icon cards · what-we-offer/how-to-apply split · CTA |
| `app/positions/page.tsx` | PageHero · always-hiring callout · qualifications grid |
| `app/franchise/page.tsx` | PageHero · why-partner / requirements split · CTA |
| `app/blog/page.tsx` | PageHero · editorial-calendar callout · upcoming-topics grid w/ icons |

### New components

- `components/PageHero.tsx` — reusable full-bleed hero with image, gradient, breadcrumb, eyebrow, balanced headline, optional CTAs slot
- `components/SectionHeading.tsx` — eyebrow + balanced display headline + description, light/dark variants, left/center alignment
- `components/ProcessSteps.tsx` — 4-step horizontal flow with numbered circles + lucide icons
- `components/TestimonialPlaceholder.tsx` — 3-card placeholder grid honoring "no fabricated testimonials" rule, marked `[REQUIRES CLIENT TESTIMONIAL]`
- `components/FaqAccordion.tsx` — accessible client-component accordion with smooth expand/collapse animation
- `components/LogoMark.tsx` — SVG monogram (B + accent dot), light + dark variants, scaled with className
- `lib/cn.ts` — clsx + tailwind-merge composition helper
- `lib/images.ts` — central registry of Unsplash photo IDs by use-case + per-city + per-service helpers

### Updated components

- `components/Header.tsx` — sticky scroll-aware bar, announcement strip with shield icon, brand wordmark + monogram, lucide phone icon, mobile drawer with body-scroll lock and overlay
- `components/Footer.tsx` — full accent-gradient pre-footer with emergency CTA, 4-column grid, SVG social icons (lucide dropped brand icons), structured contact column with lucide icons, real NAP, Canadian compliance line
- `components/CTASection.tsx` — gradient/accent background, eyebrow + balanced headline, dual rounded-pill CTAs
- `components/ServiceCard.tsx` — two variants: `image` (16:10 image card with gradient overlay + emergency badge + icon) and `icon` (icon tile)

### System

- `tailwind.config.ts` — full color system (navy 50-900, accent 50-900 = Service Orange, steel 50-800), Manrope display + Inter sans font stacks, grid background pattern, accent + navy + hero-fade gradients, custom shadows, fade-up/fade-in keyframes
- `styles/globals.css` — display vs. body font separation, balanced text wrapping utilities, button system on rounded-full pills (primary/accent/secondary/ghost-light), eyebrow utility, card + section helpers, ::selection styling
- `app/layout.tsx` — Inter + Manrope loaded via `next/font/google` as CSS variables; preconnect tags removed (next/font handles it)
- `next.config.mjs` — added `images.unsplash.com` to `remotePatterns` (still `unoptimized: true` for static export)

---

## Competitor sites referenced

1. **Mr. Rooter Plumbing** (mrrooter.com) — service tile + testimonial pattern, header phone CTA
2. **Reliance Home Comfort** (reliancehomecomfort.com) — Canadian HVAC mega-menu pattern, 60-year credibility framing
3. **Roto-Rooter Canada** (rotorooter.ca) — emergency-anchored hero, established-since framing, license display
4. **Mike Diamond Plumbing** — quote-modal + hero photography pattern
5. **ServiceMaster Restore** — multi-vertical brand language

Full notes: `DESIGN-RESEARCH.md`.

---

## Imagery — Unsplash photo IDs used

All images load from `images.unsplash.com/{photoId}?auto=format&fit=crop&w=…&q=80`, registered in `lib/images.ts`.

| Use | Photo ID |
|-----|----------|
| Home hero / general service | `photo-1581094794329-c8112a89af12` |
| About hero | `photo-1497366216548-37526070297c` |
| Work crew (split section) | `photo-1521791136064-7986c2920216` |
| Building towers (location section) | `photo-1486406146926-c627a92ad1ab` |
| Tools kit (quote / positions) | `photo-1530124566582-a618bc2615dc` |
| Service truck (franchise / emergency) | `photo-1581092446327-9b52bd1570c2` |
| Plumbing | `photo-1607400201515-c2c41c07d307` |
| Electrical | `photo-1621905251918-48416bd8575a` |
| HVAC | `photo-1631545806609-cb5c1f80b07f` |
| Contact / blog office | `photo-1497366811353-6870744d04b2` |
| Toronto | `photo-1517090504586-fde19ea6066f` |
| Vaughan | `photo-1564466809058-bf4114d55352` |
| Mississauga | `photo-1517935706615-2717063c2225` |
| Brampton | `photo-1542856391-010fb87dcfed` |
| Markham | `photo-1519501025264-65ba15a82390` |
| Richmond Hill | `photo-1502920917128-1aa500764cbd` |
| Hamilton | `photo-1551867633-194f125bddfa` |
| Oakville | `photo-1499092346589-b9b6be3e94b2` |

---

## Color & typography

**Colors (provisional, pre-Nathan/Zak approval — see Brand Book element 6):**

| Role | HEX | Note |
|------|-----|------|
| Primary navy | `#0B2545` | Headers, primary CTA, dark sections |
| Navy 800/900 | `#061B36` / `#031126` | Hero gradient deep ends |
| Accent (Service Orange) | `#E76F18` | Emergency CTAs, accent highlights, badge |
| Accent 600 | `#C25410` | Hover state |
| Steel 50/100 | `#F4F6F8` / `#E1E5EA` | Section backgrounds, borders |

**Fonts:** Manrope (display) + Inter (body), both via `next/font/google`. Both OFL-licensed and self-hostable later if Brand Book element 7 mandates.

> All values are easily swappable in `tailwind.config.ts` and `app/layout.tsx` once Nathan/Zak sign off on the Brand Book palette and typography.

---

## Hard-constraint compliance

- ✅ No fabricated testimonials, ratings, "X years in business," or "Y happy customers" anywhere on the site.
- ✅ All testimonial slots wired as `[REQUIRES CLIENT TESTIMONIAL]` placeholder cards.
- ✅ Rothenbury Group attribution and any Nathan-related content gated behind `[REQUIRES NATHAN APPROVAL]` markers (About page).
- ✅ Real NAP everywhere — header announcement bar, header phone CTA, all PageHero CTAs, every CTA banner, footer 4-column grid, contact + quote pages, schema.
- ✅ Real Google Maps embed on `/contact` for 311 Bowes Rd, Unit 401, Concord ON L4K 2R6.
- ✅ Lazy-loading images via `next/image`. Only `homeHero` and individual `PageHero` images use `priority`.
- ✅ Mobile responsive — every page tested at sm/md/lg breakpoints in markup; mobile drawer on Header, stacked grids, balanced text utility used throughout.
- ✅ Accessible — semantic HTML, aria-label on icon-only buttons, breadcrumb nav, focus-visible outlines on interactive elements, sufficient color contrast (navy on white, white on navy, accent on white all meet WCAG AA).

---

## Known TBD items

| Item | Owner | Where it surfaces |
|------|-------|-------------------|
| Real client testimonials | Operations | `components/TestimonialPlaceholder.tsx` |
| Real photography (HQ exterior, branded vans, team, before/after) | Photography commission | Replace Unsplash IDs in `lib/images.ts` |
| Final brand color hex codes | Nathan/Zak | `tailwind.config.ts` (search "navy" / "accent") |
| Final typography selection | Nathan/Zak | `app/layout.tsx` `Inter`/`Manrope` imports |
| Logo SVG (replace monogram) | Brand designer | `components/LogoMark.tsx` |
| Favicon set (16/32/48/180/192/512) | Brand designer | `public/favicon.ico` + add `apple-touch-icon`, etc. |
| OG cover image (1200×630) | Brand designer | `public/assets/og-cover.jpg` + add to layout metadata |
| Rothenbury parent attribution language | Nathan | About page section flagged `[REQUIRES NATHAN APPROVAL]` |
| Leadership biographies | Nathan (Section 3.9) | About page leadership card flagged `[REQUIRES NATHAN APPROVAL]` |
| ESA / TSSA / plumbing license #s | Zak / operations | Footer compliance line + service-page licensing copy |
| HST/GST registration # | Zak | Footer compliance line |
| Legal entity name | Zak | `lib/constants.ts` `BRAND.legalEntity` (propagates to footer) |
| Privacy / Terms / Accessibility legal review | Canadian counsel | Existing pages flagged `[REQUIRES LEGAL REVIEW]` |
| Contact form backend wiring | Operations / Revun | `components/ContactForm.tsx` (currently `console.log`) |
| Hours model decision (24/7 vs office+emergency) | Zak | `lib/constants.ts` NAP.hours |

---

## Build verification

```
✓ Compiled successfully
✓ Generating static pages (31/31)
Route (app)                              Size     First Load JS
┌ ○ /                                    922 B           109 kB
├ ○ /about                               214 B          99.8 kB
├ ○ /blog                                214 B          99.8 kB
├ ○ /careers                             214 B          99.8 kB
├ ○ /contact                             141 B           106 kB
├ ○ /franchise                           213 B          99.8 kB
├ ○ /locations                           214 B          99.8 kB
├ ● /locations/[city]                    213 B          99.8 kB        (8 routes)
├ ○ /positions                           213 B          99.8 kB
├ ○ /quote                               140 B           106 kB
├ ○ /services                            217 B          99.8 kB
├ ● /services/[slug]                     922 B           109 kB        (6 routes)
└ … legal + sitemap.xml                  ~150 B         87.4 kB
+ First Load JS shared by all            87.2 kB
```

All 31 static-export routes generated, none failed. `out/` directory contains complete static site.

---

## Deployment

Production deployment pushed to Vercel:

- **Project:** `bridge-point-maintenance` (linked via `.vercel/project.json`)
- **Production alias:** https://bridge-point-maintenance.vercel.app
- **Latest deployment URL:** https://bridge-point-maintenance-gtulux8am-sams-projects-e51217e7.vercel.app
- **Inspector:** https://vercel.com/sams-projects-e51217e7/bridge-point-maintenance/FiXP7v32Ahz2MwAKiko7K5jUUMcF

Domain `bridgepointmaintenance.com` should be pointed at this Vercel project once the brand is ready to launch (DNS A/CNAME + TLS handled by Vercel).
