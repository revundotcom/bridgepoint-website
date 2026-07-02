# Bridgepoint Maintenance — Revun Level-Up Complete

**Date:** 2026-04-27
**Build:** Next.js 14 static export, 32/32 routes generated, build succeeded.
**Production alias:** https://bridge-point-maintenance.vercel.app
**Latest deployment:** https://bridge-point-maintenance-fkksxvcel-sams-projects-e51217e7.vercel.app
**Inspector:** https://vercel.com/sams-projects-e51217e7/bridge-point-maintenance/F6shXfS7HcdEgEXbKCccAH8RZoLX

---

## /technology page summary

New page at `/technology` (route count 31 → 32). Full sections:

1. **Hero** — "The operating system behind every Bridgepoint dispatch." with the techHero image, breadcrumb, dual CTAs (phone + dispatcher).
2. **Drop-in Revun copy block** — verbatim from the research file (`_revun-tech-research.md` § 14.A) with attribution to Revun for the 94% accuracy / 18-min dispatch / under-4-min emergency stats.
3. **Animated stat counters** — `<Stat>` component (already counts up via `useInView` + RAF easing) wired to four Revun-published numbers: 94% AI classification accuracy, 18-min median dispatch, 320+ vendor partners, 99.9% platform uptime. All four marked "per Revun".
4. **Feature grid (8 cards)** — exact Revun feature names with lucide icons:
   - AI Work Order Routing
   - Closest-Available Dispatch
   - Vendor Marketplace
   - Tech Leaderboard
   - Proof-of-Completion
   - Live Tech Tracking
   - Auto-Invoicing
   - Vendor Matching Score
5. **Integrations grid** — 18 cards, each pinned to a category: QuickBooks, Xero, Sage Intacct, NetSuite, Stripe, Plaid, Equifax, TransUnion, Persona, DocuSign, Twilio, SendGrid, Salesforce, HubSpot, Slack, Microsoft Teams, Google Workspace, Zapier.
6. **Trust badges** — SOC 2 Type II, ISO 27001, 99.9% uptime, hash-chained audit log (4 cards on a navy section over the techOpsCenter image).
7. **Three-pillar architecture** — One ledger / One portal / One audit trail panel.
8. **Technology FAQ** — 8 questions on the FaqAccordion component.
9. **"Powered by Revun" CTA banner** — "Visit Revun" external link with `target="_blank"` and `rel="noopener noreferrer"`, plus a Bridgepoint dispatch CTA.
10. **Schema** — `softwareApplication` JSON-LD referencing Revun (with publisher org, offer, aggregateRating using Revun's 4.7 stat) plus a breadcrumb LD-JSON for `/technology`.

---

## Revun feature names actually featured (verbatim across the site)

- **AI Work Order Routing** — /technology hero, /technology feature grid, /services/plumbing callout, /services/emergency-repairs callout, home Tech section
- **Closest-Available Dispatch** — /technology hero, /technology feature grid, /services/electrical callout, home Tech section
- **Vendor Marketplace** — /technology feature grid, /services/building-services callout
- **Tech Leaderboard** — /technology feature grid
- **Proof-of-Completion** — /technology feature grid, drop-in copy block, home Tech section, About backbone section
- **Live Tech Tracking** — /technology feature grid, /services/hvac callout
- **Auto-Invoicing** — /technology feature grid, /services/hvac callout
- **Vendor Matching Score** — /technology feature grid, home Tech section
- **Hash-chained Audit Log** — /technology trust badges, home Tech section, About backbone section, /services/emergency-repairs callout
- **Multi-Entity Consolidation** — /services/building-services callout
- **Three-Pillar Architecture (One ledger. One portal. One audit trail.)** — /technology dedicated section, footer portfolio strip

All Revun-published stats are attributed as "per Revun" or "according to Revun" — no fabrication.

---

## Updates to existing pages

| Page | Change |
|------|--------|
| `app/page.tsx` (Home) | New "Built on Revun" section between the service grid and Service Area Map — eyebrow, headline featuring AI Work Order Routing + Closest-Available Dispatch, paragraph with 94% / 18-min / <4-min stats (attributed), 4-feature checklist, dual CTA (See the platform → /technology, Visit Revun → revun.com), techDashboard image overlay |
| `app/about/page.tsx` | New "Technology backbone" section between Values and Who-We-Serve — image card + "Bridgepoint runs on Revun" headline + paragraph + dual CTA (Explore the platform → /technology, Visit Revun → revun.com) |
| `app/services/[slug]/page.tsx` | New per-service Revun callout band between Overview and FAQ. Each of the 6 services has a tailored callout mapping to a specific Revun feature (see `REVUN_CALLOUT` map in the file) |
| `components/Footer.tsx` | New Portfolio strip above the regulatory band: "Part of the Rothenbury Group portfolio" line + Revun inline link + technology page link + 7 sister brand external links (MoveSmart Rentals, Single Property Management, Northstone Holdings, Rothenbury Group, Thornwell Media, Langford Staffing, Revun) — all `target="_blank"` `rel="noopener noreferrer"`. Bottom legal line gains "Powered by Revun" attribution |
| `lib/constants.ts` | NAV_PRIMARY adds `Technology` entry between Service Areas and About so the new page is reachable from the header |
| `lib/images.ts` | Added 18 new image registrations: 10 tech/dashboard imagery (techHero, techDashboard, techDispatch, techMobileApp, techData, techCode, techRouting, techWorkOrder, techOpsCenter, techLaptopField), 6 city/neighborhood variety (Scarborough, North York, Etobicoke, Downtown, Waterloo, Kingston), 4 extra service shots (servicePlumbingB/serviceElectricalB/serviceHvacB/serviceEmergencyB) |

---

## Sister-brand cross-links added

Footer Portfolio strip on every page links externally to:

1. https://movesmartrentals.com — MoveSmart Rentals
2. https://singlepropertymanagement.com — Single Property Management
3. https://northstoneholdings.com — Northstone Holdings
4. https://rothenburygroup.com — Rothenbury Group
5. https://thornwellmedia.com — Thornwell Media
6. https://langfordstaffing.com — Langford Staffing
7. https://revun.com — Revun (the technology backbone)

Plus an inline Revun link in the Portfolio paragraph copy and a "Powered by Revun" attribution in the bottom legal line.

---

## Stats now animating

`<StatsBar>` (home, hero-adjacent) was already wired to the `<Stat>` component which animates from 0 to final value over 1.4s with cubic ease-out, gated on `useInView`. Confirmed still in place after the build.

The new `/technology` stats bar uses the same `<Stat>` component for all four metrics (94% / 18 min / 320+ / 99.9%) — including a `decimals={1}` setting on the 99.9% counter so the animated value renders correctly.

Stats animating site-wide:
- Home → `StatsBar.tsx` (4 metrics)
- /technology → 4 Revun metrics
- Locations city pages already use `StatsBar` indirectly via the same component pattern

---

## Hard rules — compliance check

- ✅ Revun feature names used verbatim ("AI Work Order Routing", "Closest-Available Dispatch", "Hash-chained Audit Log", "Multi-Entity Consolidation", "Vendor Matching Score", "Tech Leaderboard", "Proof-of-Completion", etc.)
- ✅ Every Revun-published stat marked "per Revun" or "according to Revun" or "(Revun-reported)" — including 94% AI accuracy, 18-min dispatch, <4-min emergency, 99.9% uptime, 320+ vendor partners, 2.4M training tickets
- ✅ No fabricated brand-specific stats — Bridgepoint claims no proprietary numbers; all performance metrics attributed to Revun
- ✅ `[REQUIRES NATHAN APPROVAL]` markers on About page leadership + Rothenbury parent organization blocks remain untouched
- ✅ No existing pages or content deleted — all changes are additive (new page + new sections + new Footer strip + nav entry)
- ✅ All external Revun + sister-brand links use `target="_blank" rel="noopener noreferrer"`

---

## Build verification

```
✓ Compiled successfully
✓ Generating static pages (32/32)

Route (app)                              Size     First Load JS
┌ ○ /                                    8.6 kB          157 kB
├ ○ /about                               214 B          99.9 kB
├ ○ /services                            217 B          99.9 kB
├ ● /services/[slug]                     948 B           109 kB        (6 routes)
├ ○ /technology                          1.36 kB         150 kB    ← NEW
└ … (legal + sitemap + locations + contact + quote)
+ First Load JS shared by all            87.3 kB
```

All 32 routes generated, none failed. `/technology` page weighs 1.36 kB / 150 kB First Load JS (animated counters + lucide icons).

---

## Deployment

Production deployment:
- **Project:** `bridge-point-maintenance`
- **Production alias:** https://bridge-point-maintenance.vercel.app
- **Latest deployment URL:** https://bridge-point-maintenance-fkksxvcel-sams-projects-e51217e7.vercel.app
- **Inspector:** https://vercel.com/sams-projects-e51217e7/bridge-point-maintenance/F6shXfS7HcdEgEXbKCccAH8RZoLX
- **New /technology URL:** https://bridge-point-maintenance.vercel.app/technology
