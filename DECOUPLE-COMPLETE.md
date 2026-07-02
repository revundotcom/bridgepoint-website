# DECOUPLE COMPLETE — Bridgepoint Maintenance

**Date:** 2026-04-28
**Directive:** Strip ALL cross-brand references. Bridgepoint Maintenance now appears as a standalone independent business — no public reference to Revun, Rothenbury Group, Northstone Holdings, MoveSmart, Single Property Management, Thornwell, Langford, or Nathan Levinson.

---

## Files modified

- `app/page.tsx` — removed entire "Built on Revun" technology section (lines ~117-206); cleaned unused icon imports (`ArrowUpRight`, `Wrench`, `Star`, `Brain`, `Route`, `ShieldCheck`).
- `app/about/page.tsx` — removed "Technology backbone" Revun section; removed "Parent organization / Rothenbury Group operating brand" aside.
- `app/services/[slug]/page.tsx` — removed `REVUN_CALLOUT` map and the entire "REVUN TECH CALLOUT" section block from every service detail page; removed `Brain` import.
- `components/Footer.tsx` — removed `SISTER_BRANDS` array (MoveSmart, Single Property Management, Northstone, Rothenbury, Thornwell, Langford, Revun); removed entire "Portfolio + Revun strip" section ("Part of the Rothenbury Group portfolio" + sister brands grid); removed "Powered by Revun" line in copyright row; removed `ArrowUpRight` import.
- `components/BookingWidget.tsx` — replaced "submission backend pending Revun integration" with generic "submission backend pending integration".
- `lib/constants.ts` — removed `parentOrganization: "Rothenbury Group"` from `BRAND`; removed `/technology` from `NAV_PRIMARY`.
- `lib/schema.ts` — removed redundant self-referential `parentOrganization` from LocalBusiness JSON-LD.

## Files deleted

- `app/technology/page.tsx` — entire `/technology` route directory removed (page was primarily a Revun feature showcase, not a Bridgepoint-owned platform page).

## Files NOT modified (Bridgepoint-only references; preserved as own identity)

- `app/contact/page.tsx`, `app/blog/page.tsx`, `app/careers/page.tsx`, `app/franchise/page.tsx`, `app/locations/**`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/quote/page.tsx`, `app/services/page.tsx`, `app/positions/page.tsx`, `app/accessibility/page.tsx`, `app/layout.tsx` — all "Bridgepoint" mentions are this brand's own identity, kept intact.
- `components/Header.tsx`, `components/EmergencyHero.tsx`, `components/CTASection.tsx`, etc. — clean.
- `lib/cities.ts`, `lib/services.ts` — only Bridgepoint self-references.
- Internal docs (`BUILD-SUMMARY.md`, `DESIGN-OVERHAUL-COMPLETE.md`, `DESIGN-RESEARCH.md`, `REVUN-LEVEL-UP-COMPLETE.md`) — left as-is per directive (internal-only).

> Cross-brand references stripped per 2026-04-28 directive (see `feedback_rothenbury_brand_isolation.md`).

## Build

```
✓ Compiled successfully
✓ Generating static pages (31/31)
```

All 31 routes still build (drops the `/technology` route from the original 32). No type errors, no missing imports.

## Deployment

- **Production:** https://bridge-point-maintenance.vercel.app
- **Inspector:** https://vercel.com/sams-projects-e51217e7/bridge-point-maintenance/GETUh54uRpUPX6Cvn55pyyU6SEYS
- **Deployment ID:** `dpl_GETUh54uRpUPX6Cvn55pyyU6SEYS`
- **Status:** READY

## Grep verification

```bash
$ grep -r "Revun\|Rothenbury\|Northstone\|Bridgepoint\|MoveSmart\|Thornwell\|Langford\|Single Property" app/ components/ lib/ 2>&1 | grep -v "node_modules\|\.next\|out/"
```

Output filtered for cross-brand only (Bridgepoint matches are this brand's own identity and intentionally preserved):

```bash
$ grep -rn "Revun\|Rothenbury\|Northstone\|MoveSmart\|Move Smart\|Thornwell\|Langford\|Single Property\|Single PM\|Nathan Levinson" app/ components/ lib/
(no output — clean)
```

✅ Zero references to any of the 9 prohibited cross-brand names anywhere in `app/`, `components/`, or `lib/`.
