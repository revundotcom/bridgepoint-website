import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Trades Network Partners | Bridgepoint Maintenance",
  description:
    "Join Bridgepoint Maintenance's trades network. Plumbing, electrical, HVAC, and general-trades partnership opportunities across Canada and the US.",
};

const REASONS = [
  {
    title: "Steady dispatch volume",
    body: "Property management portfolios, commercial accounts, and emergency-response work routed to your team.",
  },
  {
    title: "Centralized intake",
    body: "One dispatch line; you focus on the work, not the lead chase.",
  },
  {
    title: "Single billing relationship",
    body: "Predictable invoicing and payment cycles, consolidated to one partner.",
  },
  {
    title: "Compliance support",
    body: "Documentation templates, license tracking, and reporting infrastructure.",
  },
  {
    title: "Province-wide scale",
    body: "More opportunities as we grow into Tier 2 and Tier 3 markets across North America.",
  },
];

const REQUIREMENTS = [
  "Licensed trade business with active workers compensation or WSIB clearance",
  "Capacity for emergency-response dispatch (24/7 on-call rotation)",
  "Service area within or adjacent to a Bridgepoint market",
  "Experience with commercial, multifamily, or institutional clients",
  "Mobile work-order and reporting capability",
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Trades Network"
        title="Become a Bridgepoint trades network partner."
        description="Bridgepoint operates through a coordinated trades network across Canada and the US. We partner with licensed plumbing, electrical, HVAC, and general-trades operators to dispatch work across both countries."
        crumbs={[{ name: "Home", href: "/" }, { name: "Trades Network" }]}
        image={IMAGES.truck}
        imageAlt={IMAGES.truckAlt}
        size="compact"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            Talk to us about partnership
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={NAP.phoneTel} className="btn-ghost-light">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why partner with us"
              title="Less lead-chasing. More dispatched work."
            />
            <ul className="mt-8 space-y-5">
              {REASONS.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/10 text-cyan-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-navy">
                      {r.title}
                    </p>
                    <p className="text-sm text-steel-500 leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow="What we look for"
              title="Five baseline requirements."
            />
            <ul className="mt-8 space-y-3">
              {REQUIREMENTS.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 rounded-xl border border-steel-100 bg-steel-50/50 p-4 text-sm text-steel-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  {req}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Link href="/contact" className="btn-primary">
                Apply to partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to grow with Bridgepoint?"
        body="Send us your trade-business details and we'll schedule an intake call."
      />
    </>
  );
}
