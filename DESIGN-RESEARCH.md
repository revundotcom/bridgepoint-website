# Bridgepoint Maintenance — Design Research

**Date:** 2026-04-25
**Vertical:** HVAC / plumbing / electrical / general contractor (Canadian focus)
**Goal:** Production-credible site that mirrors the design language of leading trades-services brands.

---

## Competitor sites studied

| # | Site | Why it matters |
|---|------|----------------|
| 1 | **Mr. Rooter Plumbing** (mrrooter.com) | Largest plumbing franchise in North America; reference for trust signals + service navigation |
| 2 | **Reliance Home Comfort** (reliancehomecomfort.com) | Canadian HVAC leader; mega-menu pattern, branch selector, 60-year credibility framing |
| 3 | **Roto-Rooter Canada** (rotorooter.ca) | Canadian emergency-focused branding, prominent phone CTA, established-since-1935 anchor |
| 4 | **Mike Diamond Plumbing** | "Smell good" brand differentiation, hero-image + quote-modal pattern |
| 5 | **ServiceMaster Restore** | Multi-vertical brand pattern with shared design language across service lines |

---

## Patterns observed

### Hero
- **Full-bleed image** of a service technician, branded van, or building exterior — never a flat color block.
- **Headline structure:** outcome + reassurance ("Keeping Canadians Comfortable with HVAC & Plumbing for over 60 years") OR emergency-anchored ("Here for you 24/7 — don't get stuck in an emergency").
- **Phone number prominent in header** as both display + tel: link.
- **Dual CTA:** primary "Book Online" / "Get a Quote", secondary "Call Now / Learn More."
- **Subtle overlay gradient** over hero photo to keep type legible.

### Trust bar
- Years-in-business badge ("Trusted Since 1935", "60+ Years")
- Rating callouts ("4.7+ stars on Google", "160,000+ Online Reviews")
- License/credential numbers visible (Technical Safety License #, ESA #)
- Brand partnerships (Rheem, Navien, Moen for plumbing; Lennox, Carrier for HVAC)

> **Bridgepoint adaptation:** No fabricated review counts or years. Use credential placeholders ("Licensed Ontario trades", "ESA / TSSA registered" with `[TBD]` license #s) and Rothenbury Group attribution flagged as `[REQUIRES NATHAN APPROVAL]`. No fake star counts.

### Services presentation
- **8-icon grid** with lucide-style line icons + short label (e.g., "Plumbing", "HVAC", "Electrical", "Emergency")
- **Image-card variant**: photo + service name + 1-line description + CTA arrow
- **Service detail pages**: hero image of the trade in action, scope bullets, FAQ accordion, related services sidebar

### Process / "How it works"
- **3-step or 4-step horizontal flow** with numbered circles
- Common pattern: 1) Call / Request → 2) Dispatch / Estimate → 3) Service / Repair → 4) Follow-up
- Bridgepoint version: 1) One call, 24/7 → 2) Trade-routed dispatch → 3) Licensed on-site work → 4) Documented and reported

### Social proof
- **Testimonial cards** with avatar circle, name, location, star rating, quote (~150 chars)
- 3-card row on desktop, swipeable on mobile
- Sometimes paired with logos of media features ("As seen in…")

> **Bridgepoint constraint:** No testimonial fabrication. Use a "What clients tell us" section structured as a placeholder grid with `[REQUIRES CLIENT TESTIMONIAL]` placeholders that visually fit so the framework is in place when real testimonials land.

### Locations / coverage
- **Map graphic** of service area (province / region) with city pins
- **City grid** of pill-style links → location-specific landing pages
- Each city page: local hero, neighborhood list, response-time note, services available

### CTA banner
- Contrasting color block (red/orange or accent color) full-bleed before the footer
- "Active emergency?" framing for trades verticals
- Phone number large + secondary "Request service" button

### Footer
- 4-column grid: Brand/About + Services + Locations + Contact/Hours
- NAP block with full address, phone, hours
- Social icon row
- Compliance / accessibility line at the bottom (CASL / AODA / PIPEDA in Canada)
- Copyright + legal entity + license numbers

---

## Color palette decision

No `figma-extracted.md` exists for Bridgepoint, so the brand book element 6 colors are still `[TBD]`. The brand book recommends "trade-services sites trust-test well with deep blue primary + high-contrast safety-orange emergency CTA."

**Provisional palette (clearly marked as pre-approval — easy to swap in `tailwind.config.ts` once Nathan/Zak sign off):**

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| Primary | Bridgepoint Navy | `#0B2545` | Headers, primary buttons, dark sections |
| Primary deep | Navy Deep | `#061B36` | Hero gradient terminus |
| Primary light | Sky Anchor | `#13315C` | Hover/secondary navy |
| Accent / emergency | Service Orange | `#E76F18` | Emergency CTAs, accent highlights |
| Accent deep | Service Orange Deep | `#C25410` | Emergency hover |
| Neutral dark | Charcoal | `#1F2933` | Body text |
| Neutral mid | Slate | `#52606D` | Secondary text |
| Neutral light | Mist | `#F4F6F8` | Section backgrounds |
| Neutral border | Border | `#E1E5EA` | Card borders, dividers |
| Success | Trade Green | `#1B7E5A` | Compliance / verified states |

Rationale: Deep navy reads "established / institutional" — important because Bridgepoint markets to property managers and commercial owners, not retail homeowners. Orange (warmer than red) is high-visibility emergency without screaming "alarm." Both clear WCAG AA contrast on white.

---

## Typography decision

Brand book element 7 recommends Inter, Poppins, or DM Sans — open-source, Google Fonts, OFL.

**Selection:** **Manrope** (display / headings) + **Inter** (body).

- **Manrope** for H1–H3 — modern, slightly geometric, gives institutional feel without being cold. Used by Vercel, Linear, plenty of B2B SaaS — appropriate for a property-services firm.
- **Inter** for body — utility, excellent on-screen rendering, matches what's already wired in the layout.
- Both Google Fonts, both OFL, both self-hostable later via `next/font` if Brand Book mandates.

---

## Imagery strategy

Use Unsplash via `images.unsplash.com` with stable photo IDs (preferable over `source.unsplash.com` which can return inconsistent images). All embedded via `next/image`.

**Photo IDs / keywords used in v1:**

| Page | Keyword | Photo ID |
|------|---------|----------|
| Home hero | Service technician working | `photo-1581094794329-c8112a89af12` (HVAC tech) |
| Home services | Toronto skyline at twilight | `photo-1517090504586-fde19ea6066f` |
| About hero | Boardroom / corporate building | `photo-1497366216548-37526070297c` |
| Services/Plumbing | Pipes / plumbing work | `photo-1607400201515-c2c41c07d307` |
| Services/Electrical | Electrician / panel | `photo-1621905251918-48416bd8575a` |
| Services/HVAC | HVAC technician | `photo-1631545806609-cb5c1f80b07f` |
| Services/General | Tools / handyman | `photo-1581094794329-c8112a89af12` |
| Services/Emergency | Emergency response truck | `photo-1581092446327-9b52bd1570c2` |
| Services/Building | Commercial building | `photo-1486406146926-c627a92ad1ab` |
| Locations | Toronto skyline | `photo-1517090504586-fde19ea6066f` |
| Contact | Office / map | `photo-1486406146926-c627a92ad1ab` |

For city pages, parameterize the keyword by city (Toronto / Vaughan / Mississauga skyline keywords).

URL pattern: `https://images.unsplash.com/{photoId}?auto=format&fit=crop&w=1920&q=80`

---

## Components to add

| Component | Why |
|-----------|-----|
| `Hero` (variants: home, page) | Reusable hero pattern across all pages |
| `ServiceGrid` | Icon-grid + image-card variants |
| `ProcessSteps` | Numbered horizontal flow |
| `StatBar` | 4-up stat callout strip |
| `TestimonialPlaceholder` | Card grid with `[REQUIRES CLIENT TESTIMONIAL]` |
| `FaqAccordion` | Expandable FAQ with smooth animation |
| `LogoMark` | SVG monogram placeholder for brand |
| `PhoneCTA` | Sticky mobile bar + reusable inline |

---

## Hard constraints applied

- **No fabricated testimonials, ratings, "X years in business," "Y happy customers."**
- **Rothenbury Group attribution** hidden behind `[REQUIRES NATHAN APPROVAL]` toggle (already wired in current `lib/constants.ts` — but no public-facing copy will display the attribution in v1 design overhaul).
- **Real NAP everywhere** — header, footer, contact, schema (already in `lib/constants.ts`, just needs to surface in new layouts).
- **License/credential placeholders** show as `[TBD — pending licensing confirmation from operations]` so legal review can fill in before launch.
- **Real Google Maps embed** for the Concord HQ address on `/contact`.
