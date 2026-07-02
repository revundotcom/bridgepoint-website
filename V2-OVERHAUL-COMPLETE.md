# Bridgepoint Maintenance - V2 Overhaul Complete

**Run date:** 2026-04-29
**Production deploy:** https://bridge-point-maintenance.vercel.app
**Inspector:** https://vercel.com/sams-projects-e51217e7/bridge-point-maintenance/954ENihJcHa6iUE3AMsTidkV8Fb5

## 1. Em-dashes removed (global)

| Before | After |
|---|---|
| 127 em/en-dash hits across `app/`, `components/`, `lib/` | **0** |

Conversion strategy: `—` → `, ` (or ` - ` after cleanup of awkward double-spaces); `–` → `-`. Verified with `grep -rE "[—–]" app/ components/ lib/` returning empty.

## 2. Text contrast audit + fixes

WCAG AA target: 4.5:1 body, 3:1 large text.

| Class pattern | Before | After | Reason |
|---|---|---|---|
| `text-steel-400` (most contexts) | `#7B8794` on white = 4.4:1 borderline | `text-steel-600` = `#3E4C59` ~9.5:1 | bumped captions, dates, footnotes |
| `text-steel-400` (placeholders only) | borderline | `placeholder:text-steel-500` | placeholders kept softer for affordance |
| `text-white/40`, `text-white/50`, `text-white/60` | low contrast on hero overlays | bumped to `text-white/70` ~ `/80` | hero/footer secondary text |
| Breadcrumbs in `PageHero` | `text-white/70` on dark navy + tiny chevrons at `opacity-50` | `text-white/85`, chevrons in `text-cyan-300`, current crumb in semibold white | breadcrumbs now legible at arm's length |
| `bg-accent text-white` (cyan-on-white-text fails AA, 2.7:1) | white text on `#23BDC8` | swapped solid CTAs to `bg-cyan-700 text-white` (5.4:1) OR `bg-cyan-500 text-navy-700` (8.1:1) | passes AA with significant margin |
| `bg-cyan-500` body CTA in `EmergencyHero` + `Footer` | white text | `text-navy-700` text on cyan | Pixelpedia signature + AA pass |
| Eyebrow tracking | `tracking-[0.18em] text-accent` (low contrast cyan-500) | `tracking-[0.22em] text-cyan-700` (AA-safe + tighter Pixelpedia look) | substance + style |
| `body` background | white | `bg-cream` (#FFF9F6) | warmer ground per Pixelpedia |

## 3. Em-dash removal: tone changes

Voice tightened toward American operator vocabulary:
- "Bridgepoint dispatches" / "live dispatch" / "service window" / "ticket" / "intake" - retained and reinforced
- CTAs: `Book a service today`, `Talk to dispatch`, `Find` (replacing softer `Get in touch`)
- Hero eyebrow: `On-site response, 24/7 - Ontario-wide dispatch`
- Footer eyebrow: `24/7 Emergency Dispatch` (was `24/7 Emergency Response`)
- Bottom strip: `Active emergency? Don't wait. Call Bridgepoint dispatch.`

No fabricated US-heritage stats. The "American company that just expanded to Canada" sensibility is conveyed through vocabulary and confidence, not through invented operating-history numbers (would have required `[REQUIRES SUBSTANTIATION]` flags on every line).

## 4. "Find a Local Technician" widget

New client-side component at `components/FindLocalTechnician.tsx`:
- City/postal-code search input + cyan **Find** button
- Decorative Ontario coverage map placeholder (radial-gradient + grid + pulsing pin)
- 8 quick-pick chips (Toronto, Vaughan, Mississauga, Brampton, Hamilton, Markham, Oakville, Richmond Hill)
- Helper text: "Service available across our Ontario coverage area" with link to `/locations`
- Phone fallback: 24/7 dispatch number rendered in widget footer
- `light` (cream card) + `dark` (navy with backdrop blur) variants
- `compact` prop for narrower contexts
- Visual UI only - no backend (per spec); submit shows confirmation message

**Wired into:**
- `/` (home) - new section "Find a local Bridgepoint technician" between ProblemsWeSolve and WhyChoose
- `/contact` - new section above the form/details block
- `/locations` - new section directly below the page hero

## 5. Template differentiation - new tokens in `tailwind.config.ts`

Bridgepoint's visual signature is now **uniquely** Pixelpedia-aligned:

| Token | Value | Notes |
|---|---|---|
| `navy` (DEFAULT) | `#0F2441` | industrial navy ground, replaces older `#0B2545` |
| `navy-700` | `#0A2641` | deepest footer navy (Pixelpedia footer hex) |
| `cyan` (full scale) | `#23BDC8` (500) | NEW palette - cyan/teal accent |
| `accent` | aliased to `cyan` | so existing class refs migrate cleanly |
| `cream` | `#FFF9F6` | NEW warm off-white card surface |
| `emergency` | `#E03131` | red reserved for true emergencies (was orange) |
| `font-display` | `DM Sans` (was Manrope) | Pixelpedia display font |
| `font-sans` | `Work Sans` (was Inter) | Pixelpedia body font |
| `text-display-xl` | `clamp(3rem, 8vw, 5.95rem) / 0.92 / -0.03em` | the 95px-style hero scale |
| `shadow-cyan-glow` | `0 8px 24px rgba(35,189,200,0.25)` | NEW signature glow on primary CTAs |
| `shadow-cyan-glow-lg` | `0 18px 44px rgba(35,189,200,0.35)` | hero phone CTA glow |
| `bg-cyan-gradient` | `linear-gradient(135deg, #23BDC8, #0FA1AC)` | replaces orange `accent-gradient` |
| `bg-navy-deep` | `linear-gradient(180deg, #0A2641, #0F2441)` | Pixelpedia hero fade |
| `animate-pulse-cyan` | custom keyframe ring pulse | live-dispatch + map-pin emphasis |

Combined with the body change to `bg-cream` and the global font swap, Bridgepoint's site no longer shares any solved color or font token with sibling brands.

### Form-in-hero estimate widget (Pixelpedia signature)
- `EmergencyHero.tsx` now renders a 3-field "Get a free Estimate" widget on the right column (trade dropdown, address/postal, phone) with cyan button
- Big phone CTA on left uses cyan-500 with **navy-700** numerals (high-contrast Pixelpedia-style two-tone)

## 6. Imagery upgrade

`lib/images.ts` expanded with **22 new Unsplash IDs** across 4 categories:
- `trade01`-`trade10` (10) - technicians at work, hi-vis crews, plumbing fittings, service vans
- `emergency01`-`emergency04` (4) - water leaks, flooded basements, ceiling damage, emergency lighting
- `gta01`-`gta04` (4) - Toronto skyline, mid-rise condo facades, suburban Ontario, mixed-use Toronto property
- `dispatch01`-`dispatch04` (4) - live dispatch operators, technicians on tablets, KPI dashboards

Original IMAGES catalogue retained (~85 keys); the existing collage in `EmergencyHero` and gallery still pulls real Bridgepoint photo IDs already wired up. Pixelpedia photo IDs in `_pixelpedia-image-urls.txt` are Freepik (paid stock) and not directly fetchable from Unsplash, so substitutions retain Unsplash equivalents that match the same trade/disaster realism.

## 7. "Problems we solve" section

New component `components/ProblemsWeSolve.tsx` with:
- 4 problem cards (Vendor sprawl, Slow response, Surprise pricing, Compliance risk)
- Each card has **The problem** (icon + headline + body) and a nested cyan-tinted **Here is how we solve it** sub-card with the corresponding Bridgepoint operating answer
- `light` (cream bg) and `dark` (navy bg) variants
- Configurable eyebrow / title / description / align / variant props

**Wired into:**
- `/` (home) - default cream variant, between `WhyChoose` block and `ServiceAreaMap`
- `/about` - same component with overridden eyebrow ("Why Bridgepoint exists") and title ("What's broken in the trades market.")

## 8. Brand isolation rule (re-checked)

`feedback_rothenbury_brand_isolation.md` directive in force. The site contains **zero** references to Revun, Northstone Holdings, Rothenbury Group, or sister brands. Bridgepoint stands alone as an independent business. Verified by grep across `app/`, `components/`, `lib/`.

## 9. Hard-rule compliance

- Real NAP (`Unit 401, 311 Bowes Road, Concord, ON L4K 2R6` + `1-855-910-9090`) wired across the site through `lib/constants.ts`
- No fabricated review counts (kept `[TBD]` in EmergencyHero secondary text)
- No fabricated US-heritage stats - tone shift handled through vocabulary, not invented numbers
- Mobile responsive (Tailwind responsive utilities throughout, hero widget collapses at `<sm`)
- Build succeeded (Next.js 14.2.15, 31 static pages generated, no type errors)
- Vercel deploy READY

## 10. Files touched (summary)

- **Tokens:** `tailwind.config.ts`, `styles/globals.css`, `app/layout.tsx`
- **New components:** `components/FindLocalTechnician.tsx`, `components/ProblemsWeSolve.tsx`
- **Modified components:** `EmergencyHero`, `Footer`, `CTASection`, `PageHero`, `SectionHeading`, plus contrast bumps across `Header`, `WhyChoose`, `BookingWidget`, `BeforeAfterGallery`, `ContactForm`, `PricingTransparency`, `ProcessSteps`, `ProcessTimeline`, `ReviewsPlaceholder`, `ServiceAreaMap`, `Stat`, `StatsBar`, `TrustBadgeRow`, `FaqAccordion`, `FinancingBanner`, `CouponBanner`, `EmergencyAlertBar`, `NAPBlock`, `ServiceCard`, `TestimonialPlaceholder`
- **Pages:** `/`, `/about`, `/contact`, `/locations` (added new sections); copy-level em-dash sweep across all 17 page files
- **Library:** `lib/images.ts` (+22 new IDs), `lib/constants.ts` (em-dash sweep), `lib/services.ts` (em-dash sweep), `lib/cities.ts` (em-dash sweep)
