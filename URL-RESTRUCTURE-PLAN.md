# Bridgepoint URL Restructure — Paradigm Builders Geo-Hub Model

Sam's SEO philosophy: **exact-match keyword in URL, city as the hub, services as sub-pages of the city.**

## Current (WRONG)
- `/locations/ontario` — province page
- `/locations/ontario/toronto` — city page (too nested, no exact-match keyword)
- `/services/plumbing` — generic service page
- `/emergency/no-power` — generic emergency page

## New (RIGHT — Paradigm model)

### Geo hubs (city-first, exact match)
- `/toronto-on-maintenance-services` — city HUB (covers all services in Toronto)
- `/mississauga-on-maintenance-services`
- `/vaughan-on-maintenance-services`
- ... one per city in the live coverage list

### Service-in-city pages (exact match, city scoped)
- `/toronto-on-plumbing-services`
- `/toronto-on-electrical-services`
- `/toronto-on-hvac-services`
- `/toronto-on-carpentry-services`
- ... 10 services × N cities

### National service hubs (rolled up)
- `/plumbing-services` — national hub linking to all `/{city}-{state}-plumbing-services` variants
- `/electrical-services` — national hub
- ... one per service

### Country/region pages (top of geo silo)
- `/maintenance-services-canada` — country hub
- `/maintenance-services-united-states` — country hub
- `/maintenance-services-ontario` — province hub linking to all Ontario city hubs

### Supporting blogs (5 per city hub)
Each city hub needs 5 supporting blog posts linking up to the hub and across to service-in-city pages, plus external authority links.

Example for Toronto:
- `/blog/winter-maintenance-checklist-toronto`
- `/blog/emergency-plumbing-toronto-guide`
- `/blog/hvac-tune-up-cost-toronto`
- `/blog/landlord-maintenance-laws-ontario`
- `/blog/property-management-vendor-toronto`

## Internal linking flow

1. **City hub `/toronto-on-maintenance-services`** links to:
   - Every service-in-city: `/toronto-on-plumbing-services`, `/toronto-on-electrical-services`, etc.
   - Its 5 supporting blogs
   - Up to country/region hub `/maintenance-services-canada`

2. **Service-in-city `/toronto-on-plumbing-services`** links to:
   - Back UP to city hub `/toronto-on-maintenance-services`
   - Across to other services in same city (sibling links)
   - Up to national `/plumbing-services`
   - Relevant blogs

3. **Blogs** link to:
   - City hub
   - Most relevant service-in-city page
   - One sibling blog
   - External authority link (ON RTA, ESA, etc.)

## Implementation

- Use Next.js dynamic catch-all `[[...slug]]` OR named static routes for the top tier and dynamic `[city]` segments for service-in-city.
- 301 every old URL to its new home so no link equity is lost:
  - `/locations/ontario/toronto` → `/toronto-on-maintenance-services`
  - `/services/plumbing` → `/plumbing-services` (national hub)
  - `/services/plumbing` accessed by Toronto traffic stays the same (national hub OK as fallback)
- Update `sitemap.ts` to emit only the new URLs (the redirects handle legacy).
- H1 on every page = the exact match keyword in the URL.
- Update internal links sitewide to point to the new URLs.

## Cities in scope (Canada — Phase 1)

Ontario: toronto, mississauga, brampton, hamilton, ottawa, london, vaughan, markham, richmond-hill, oakville, burlington, kitchener, waterloo, cambridge, guelph, barrie, milton, oshawa, ajax, pickering, whitby, st-catharines, niagara-falls, kingston

BC, AB, QC, NS, MB, SK, NB, PE, NL — phase 2 (smaller city sets each)

## Cities in scope (US — Phase 1)

Top metros: new-york, los-angeles, chicago, houston, phoenix, philadelphia, san-antonio, san-diego, dallas, austin, jacksonville, fort-worth, columbus, charlotte, indianapolis, san-francisco, seattle, denver, boston, washington, nashville, miami, atlanta, tampa, orlando

## Services in scope (10 trades)

plumbing, electrical, hvac, carpentry, drywall-and-painting, general-repairs, preventative-maintenance, unit-turnovers, commercial-contracting, facility-maintenance

## Page count target

Phase 1 Canada (25 cities × 10 services + 25 city hubs + 1 national + 9 provinces) = 25 + 250 + 1 + 9 = **285 pages**
Phase 1 US (25 cities × 10 services + 25 city hubs + 1 national + 10 states) = 25 + 250 + 1 + 10 = **286 pages**
Plus 5 blogs × 50 cities = **250 blogs**

**Total Phase 1: ~821 pages**, all with exact-match keyword URLs.

## Same pattern applies to

- MoveSmart Rentals (city-first geo silo, same Paradigm model)
- Single PM (same)
- Bridgepoint (this doc)
- Langford Staffing (city-first staffing hubs)
- OES (city-first eviction service hubs)
- Revun (already keyword-clean, audit anyway)

This supersedes the alias-based plan that was in the BPM overhaul agent brief.
