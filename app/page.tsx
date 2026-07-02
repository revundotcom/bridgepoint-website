import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import BentoServices from "@/components/BentoServices";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import EmergencyHero from "@/components/EmergencyHero";
import StatsBar from "@/components/StatsBar";
import TrustBadgesRow from "@/components/TrustBadgesRow";
import ServiceAreaList from "@/components/ServiceAreaList";
import WhyCallUs from "@/components/WhyCallUs";
import ReviewsPlaceholder from "@/components/ReviewsPlaceholder";
import { IMAGES } from "@/lib/images";
import { BRAND, NAP } from "@/lib/constants";

export const metadata = {
  title: `${BRAND.name} | Property Maintenance Canada + US`,
  description:
    "24/7 property maintenance across Canada and the US. Licensed plumbing, HVAC, electrical, drain, and building repairs. Call 1-855-910-9090.",
};

const HOME_FAQ = [
  {
    q: "How fast does Bridgepoint respond to emergencies?",
    a: "Bridgepoint runs 24/7 dispatch across Canada and the US. Most metro requests get a technician on site within standard response windows. Call 1-855-910-9090 for an immediate ETA based on the trade and your address.",
  },
  {
    q: "Do you charge a dispatch fee?",
    a: "We quote the dispatch fee transparently before sending a technician. When you proceed with the recommended repair, the dispatch fee is credited toward the work, making the visit effectively $0 for jobs we complete same-day.",
  },
  {
    q: "Are your trades licensed in Ontario?",
    a: "Yes. Bridgepoint dispatches Ontario-licensed plumbing, electrical (ESA), and gas/HVAC (TSSA) trades. Licensed, bonded, and insured. Specific license numbers are documented on each work order and available on request.",
  },
  {
    q: "Where do you operate?",
    a: "Bridgepoint operates across Canada and the US. Canadian metros include Toronto, Vaughan, Mississauga, Brampton, Markham, Richmond Hill, Hamilton, Oakville, Burlington, Milton, Pickering, Ajax, the Golden Horseshoe, Ottawa, Vancouver, Montreal, and Calgary. US metros include New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin.",
  },
  {
    q: "What's your workmanship guarantee?",
    a: "Repairs are covered by the Bridgepoint workmanship warranty. Manufacturer warranties pass through on parts. We follow up within 7 days on every job to make sure the fix held.",
  },
  {
    q: "Can you take over an existing maintenance vendor portfolio?",
    a: "Yes. We onboard portfolios with a property survey, vendor handoff plan, and phased rollout of preventative maintenance contracts. Property managers get one dispatch line, one billing relationship, and consolidated reporting.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Sticky scroll-tracked progress bar (homepage only) */}
      <ScrollProgress />

      {/* 1. HERO with phone CTA + estimate form */}
      <EmergencyHero />

      {/* 2. TRUST BADGES (BBB / NATE / ESA / TSSA / WSIB / HRAI / IICRC / ENERGY STAR) */}
      <section className="relative bg-cream -mt-12 md:-mt-16 z-20 pb-2">
        <div className="container-bp">
          <TrustBadgesRow />
        </div>
      </section>

      {/* 3. STATS BAR */}
      <StatsBar />

      {/* 4. SERVICES GRID */}
      <section className="relative bg-white section overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] dot-grid-cyan opacity-30"
        />
        <div className="container-bp relative">
          <div className="flex flex-col items-start gap-6 mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our services"
              title="Plumbing, heating, cooling, electrical, drain & sewer."
              description="Licensed Ontario trades. Most repairs scoped, quoted, and completed in the same visit. Trucks stocked with high-runner parts."
            />
            <Link
              href="/services"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-cyan-800"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <BentoServices />
        </div>
      </section>

      <SectionDivider variant="dotgrid" from="white" to="steel" />

      {/* 5. SERVICE AREA — editorial slab: full-bleed photo + city list */}
      <section className="bg-steel-50 section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="North American coverage"
            title="Cities we dispatch to every day."
            description="Bridgepoint trucks run across Canadian and US metros. Same dispatch standard everywhere we operate."
            className="mb-12 max-w-2xl"
          />
          <ServiceAreaList />
        </div>
      </section>

      <SectionDivider variant="dotgrid" from="steel" to="white" />

      {/* 6. WHY CUSTOMERS CALL US — editorial slab, photo + numbered points */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Why customers call Bridgepoint"
            title="Licensed, on time, and priced upfront."
            description="What you get on every call: a real human dispatcher, a flat-rate quote before work begins, and an Ontario-licensed Master tech on the truck."
            className="mb-14 max-w-2xl"
          />
          <WhyCallUs />
        </div>
      </section>

      {/* 6b. PHOTOGRAPHIC BREAK — editorial documentary frames, sharp corners, restrained labels */}
      <section className="relative bg-white pb-20 md:pb-24">
        <div className="container-bp">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              {
                src: IMAGES.editorialBasement,
                alt: IMAGES.editorialBasementAlt,
                label: "Plumbing",
              },
              {
                src: IMAGES.editorialRooftop,
                alt: IMAGES.editorialRooftopAlt,
                label: "HVAC",
              },
              {
                src: IMAGES.editorialDoor,
                alt: IMAGES.editorialDoorAlt,
                label: "On-site",
              },
              {
                src: IMAGES.brandFleetRow,
                alt: IMAGES.brandFleetRowAlt,
                label: "Fleet",
              },
            ].map((p) => (
              <figure
                key={p.label}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Bridgepoint, on call
                  </p>
                  <p className="mt-0.5 font-display text-base md:text-lg font-semibold text-white tracking-tight">
                    {p.label}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="dotgrid" from="white" to="steel" />

      {/* 7. CUSTOMER REVIEWS */}
      <section className="bg-steel-50 section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Customer reviews"
            title="What homeowners and property managers say."
            description="Reviews from active Bridgepoint customers across the Greater Toronto Area. Names withheld at customer request."
            align="center"
            className="mb-12"
          />
          <ReviewsPlaceholder />
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Frequently asked"
              title="Answers before you call."
              description="The questions homeowners and property managers ask most often."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                Call dispatch
              </a>
              <Link href="/contact" className="btn-secondary">
                Request service
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={HOME_FAQ} />
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <CTASection
        title="Need a tech today? Call now."
        body="Talk to a Bridgepoint dispatcher about an emergency, scheduled repair, or a maintenance contract. One call, every trade, across the GTA and Ontario."
      />
    </>
  );
}
