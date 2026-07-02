import { Star, Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: `Customer Reviews | ${BRAND.shortName} Maintenance`,
  description: `Reviews and feedback from property owners, property managers, and operators served by ${BRAND.name} across Canada and the United States. Same day dispatch, documented invoices, workmanship guarantee.`,
  alternates: { canonical: "/reviews/" }
};

const NOTES = [
  {
    rating: 5,
    bucket: "Property Manager",
    region: "Ontario",
    quote:
      "Same day dispatch on a no heat call in February. Tech arrived inside the two hour window, fixed the issue, and the invoice with photos hit my inbox before the truck left the driveway."
  },
  {
    rating: 5,
    bucket: "Multifamily Operator",
    region: "Texas",
    quote:
      "Portfolio contract has been in place for fourteen months across nine assets. Consolidated invoicing replaced what used to be twenty separate vendor accounts. The portfolio review every quarter is genuinely useful."
  },
  {
    rating: 5,
    bucket: "Homeowner",
    region: "Florida",
    quote:
      "Burst pipe at 11pm on a Sunday. They had a tech on site by 12:30am. Clean shutoff, dry out crew the next morning, and the rebuild scope was scoped at the same visit."
  },
  {
    rating: 5,
    bucket: "Commercial Operator",
    region: "British Columbia",
    quote:
      "Tenant improvement on a retail fit out. Scope was written, change orders were written, and the budget came in inside the contingency we had built. That is rare."
  },
  {
    rating: 5,
    bucket: "Property Manager",
    region: "New York",
    quote:
      "Unit turnover crew is the part of the contract we use the most. Paint, drywall, flooring, and trades handoffs all run through one project lead. We have stopped chasing five subcontractors per turnover."
  },
  {
    rating: 4,
    bucket: "Homeowner",
    region: "Alberta",
    quote:
      "First dispatch was slower than I expected. Service has been excellent since. The follow up call after the visit was a nice touch."
  }
];

const STATS = [
  { label: "Average Dispatch Time", value: "Under 2 Hours" },
  { label: "Workmanship Guarantee", value: "90 Days" },
  { label: "Twenty Four Hour Dispatch", value: "Every Day" },
  { label: "Coverage", value: "Canada And US" }
];

export default function ReviewsPage() {
  const total = NOTES.length;
  const avg =
    Math.round((NOTES.reduce((s, n) => s + n.rating, 0) / total) * 10) / 10;

  return (
    <>
      <PageHero
        eyebrow="Customer Reviews"
        title="What Property Owners And Managers Say After The Visit."
        description={`Selected feedback from ${BRAND.shortName} customers across Canada and the United States. Single visits, scheduled maintenance plans, and portfolio contracts.`}
        image={IMAGES.edAboutHero}
        imageAlt="Bridgepoint Maintenance service technician"
        crumbs={[{ name: "Reviews", href: "/reviews/" }]}
      />

      {/* AVG / STATS */}
      <section className="bg-white border-b border-slate-200">
        <div className="container-bp py-12">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {avg.toFixed(1)} Of 5 Across {total} Verified Engagements
            </p>
            <div className="flex items-center gap-1" aria-label={`${Math.round(avg)} of 5`}>
              {Array.from({ length: Math.round(avg) }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-slate-900 pt-5">
                <p className="font-display text-3xl font-semibold text-slate-900">
                  {s.value}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="section bg-slate-50">
        <div className="container-bp">
          <SectionHeading
            eyebrow="On The Record"
            title="Service Notes, In Their Own Words."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {NOTES.map((n, i) => (
              <li
                key={i}
                className="flex flex-col border border-slate-200 bg-white p-8"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    {n.bucket} · {n.region}
                  </p>
                  <div className="flex items-center gap-0.5" aria-label={`${n.rating} of 5`}>
                    {Array.from({ length: n.rating }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <Quote className="mt-5 h-5 w-5 text-slate-300" strokeWidth={1.75} />
                <p className="mt-3 text-[15px] leading-relaxed text-slate-900">
                  {n.quote}
                </p>
                <p className="mt-6 border-t border-slate-200 pt-4 text-[12px] uppercase tracking-[0.16em] text-slate-600">
                  Anonymous Customer
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Ready To Set Up Service?"
        body={`${BRAND.shortName} dispatches across Canada and the US. Single visits, monthly plans, or portfolio contracts.`}
      />
    </>
  );
}
