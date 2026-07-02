import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: `Pricing And Service Plans | ${BRAND.shortName} Maintenance`,
  description:
    "Transparent property maintenance pricing across Canada and the United States. Pay per visit dispatch, scheduled monthly plans, and portfolio contracts for property managers and operators.",
  alternates: { canonical: "/pricing/" }
};

const TIERS = [
  {
    eyebrow: "On Demand",
    name: "Pay Per Visit",
    price: "From $129 per visit",
    cadence: "Standard dispatch fee, time and materials",
    description:
      "Single visit dispatch for plumbing, electrical, HVAC, drain, and general repairs. Written estimate before work begins on jobs over the standard dispatch threshold.",
    inclusions: [
      "Licensed and insured trades",
      "Written estimate above threshold",
      "Same day or next day dispatch",
      "90 day workmanship guarantee",
      "Documented invoice with photos"
    ],
    cta: { href: "/contact/", label: "Book A Visit" }
  },
  {
    eyebrow: "Scheduled",
    name: "Maintenance Plan",
    price: "From $349 per month",
    cadence: "Monthly subscription, single property",
    description:
      "Scheduled preventative maintenance for a single property. Quarterly inspections, priority dispatch, and discounted hourly rates on repairs that fall outside the plan.",
    inclusions: [
      "Quarterly preventative inspections",
      "Priority emergency dispatch",
      "Discounted hourly repair rates",
      "Annual building condition report",
      "Dedicated account contact"
    ],
    featured: true,
    cta: { href: "/contact/", label: "Set Up A Plan" }
  },
  {
    eyebrow: "Portfolio",
    name: "Property Manager Contract",
    price: "Custom by portfolio",
    cadence: "Annual contract, volume pricing",
    description:
      "Maintenance and contracting contract for property managers, REITs, and operators. Service level agreements, volume pricing, and consolidated invoicing across the portfolio.",
    inclusions: [
      "Documented service level agreement",
      "Portfolio wide consolidated billing",
      "Volume hourly and material rates",
      "Capex planning support",
      "Quarterly portfolio review"
    ],
    cta: { href: "/contact/", label: "Discuss A Contract" }
  }
];

const FAQ = [
  {
    q: "Are estimates free?",
    a: "Yes for jobs above the standard dispatch threshold. The dispatch visit covers diagnosis and a written estimate. The dispatch fee is credited against the work if the estimate is accepted."
  },
  {
    q: "Do you charge after hours rates?",
    a: "Emergency dispatch outside standard business hours uses an after hours rate, communicated before the technician is dispatched. Property manager contracts negotiate after hours coverage at signing."
  },
  {
    q: "What does the workmanship guarantee cover?",
    a: "Repairs are guaranteed for 90 days against the same fault returning. Manufacturer warranties on installed parts pass through to the property owner."
  },
  {
    q: "Do you serve both Canada and the United States?",
    a: `${BRAND.shortName} operates across continental Canada and the United States. US service is delivered through a vetted trade partner network under the same documented service standard.`
  },
  {
    q: "Can a portfolio contract include capex projects?",
    a: "Yes. Tenant fit outs, unit turnovers, and capital improvement work can be added to the portfolio contract on a project by project basis with separate scope and pricing."
  }
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing And Plans"
        title="Transparent Maintenance Pricing Across Canada And The US."
        description="Pay per visit dispatch, scheduled monthly plans, and portfolio contracts for property managers and operators. All work documented, photographed, and invoiced with the same line items every time."
        image={IMAGES.edAboutHero}
        imageAlt="Service technician dispatched to a property"
        crumbs={[{ name: "Pricing", href: "/pricing/" }]}
      />

      {/* TIERS */}
      <section className="section bg-white">
        <div className="container-bp">
          <div className="grid gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <article
                key={tier.name}
                className={
                  "flex flex-col border bg-white p-8 " +
                  (tier.featured
                    ? "border-primary ring-1 ring-primary/30 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)]"
                    : "border-slate-200")
                }
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {tier.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-slate-900">
                  {tier.name}
                </h2>
                <div className="mt-5 border-y border-slate-200 py-5">
                  <p className="font-display text-2xl font-semibold text-slate-900">
                    {tier.price}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                    {tier.cadence}
                  </p>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                      <span className="text-[14px] leading-snug text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Link
                    href={tier.cta.href}
                    className={
                      "inline-flex items-center gap-2 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] no-underline transition " +
                      (tier.featured
                        ? "bg-primary text-white hover:bg-primary-700"
                        : "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white")
                    }
                  >
                    {tier.cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL BAND */}
      <section className="bg-slate-900 text-white">
        <div className="container-bp py-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Need Dispatch Now?
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white">
              Live Dispatcher Twenty Four Hours A Day.
            </h3>
          </div>
          <a
            href={NAP.phoneTel}
            className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white no-underline hover:bg-primary-700"
          >
            <Phone className="h-4 w-4" /> {NAP.phone}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white border-y border-slate-200">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Questions"
            title="Pricing Questions Customers Ask Most."
          />
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {FAQ.map((item) => (
              <div key={item.q} className="grid gap-3 py-7 md:grid-cols-12">
                <h3 className="font-display text-lg font-semibold text-slate-900 md:col-span-5">
                  {item.q}
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-700 md:col-span-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want A Written Quote?"
        body={`${BRAND.shortName} returns a written quote within one business day. Single visits, monthly plans, or portfolio contracts.`}
      />
    </>
  );
}
