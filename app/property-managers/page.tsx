import Link from "next/link";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileText,
  ClipboardList,
  Building2,
  Clock,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FaqAccordion from "@/components/FaqAccordion";
import TradesWeCover from "@/components/TradesWeCover";
import EmergencyPromise from "@/components/EmergencyPromise";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Property Managers | Multi-Trade Maintenance Across Canada and the US",
  description:
    "Bridgepoint runs a single dispatch line for property managers across Canada and the US. Bulk dispatch, recurring maintenance, master-account billing, vendor compliance docs, and consolidated reporting.",
};

const PM_FEATURES = [
  {
    Icon: ClipboardList,
    title: "Bulk dispatch + recurring maintenance",
    body: "Single intake portal for reactive work orders, scheduled rounds, and seasonal contracts. Daily, weekly, or monthly scopes.",
  },
  {
    Icon: FileText,
    title: "Master-account billing",
    body: "One monthly statement across the whole portfolio. Cost-center tagging by property, by trade, by work-order type.",
  },
  {
    Icon: ShieldCheck,
    title: "Vendor compliance docs on demand",
    body: "WSIB clearance, COI with your address as additional insured, ESA, TSSA, and trade licenses available 24 hours.",
  },
  {
    Icon: Building2,
    title: "MSA-ready service agreements",
    body: "Standard MSA, SLA addendum, and rate cards available before kickoff. Custom red-lines welcome.",
  },
];

const ONBOARDING = [
  {
    step: "01",
    title: "Discovery call",
    body: "30-minute scoping call. We map your portfolio, current vendors, pain points, and reporting needs.",
  },
  {
    step: "02",
    title: "Portfolio audit",
    body: "On-site walk of the top 3-5 properties. We baseline equipment, recurring issues, and emergency hot spots.",
  },
  {
    step: "03",
    title: "Pricing + MSA",
    body: "Portfolio rate card, SLA addendum, and MSA delivered for review. Master-account billing setup.",
  },
  {
    step: "04",
    title: "Kickoff + dispatch",
    body: "Priority dispatch turned on. First-month review at day 30 and full portfolio QBR at day 90.",
  },
];

const PM_FAQ = [
  {
    q: "What property types do you cover under B2B contracts?",
    a: "Multifamily, condo, retail, office, mixed-use, light industrial, and institutional portfolios across Canada and the US. We size dispatch capacity to match the asset mix.",
  },
  {
    q: "Can we use our work-order software?",
    a: "Yes. We integrate with most major property-management work-order systems for intake, status updates, and consolidated reporting. Email-based intake also supported.",
  },
  {
    q: "How does master-account billing work?",
    a: "One invoice per month per portfolio with a per-property breakdown. Cost-center tags map to your accounting structure. Net-30 standard, custom terms negotiable.",
  },
  {
    q: "Do you carry the right insurance for our COI requirements?",
    a: "Yes. We carry general liability and auto coverage with limits typical for North American property-management contracts and add your entity as additional insured on request.",
  },
  {
    q: "What is the typical onboarding timeline?",
    a: "Two weeks from MSA signature to first dispatch on a small portfolio. Larger portfolios run a phased rollout 30-60 days.",
  },
  {
    q: "Do you handle after-hours emergencies for our tenants directly?",
    a: "Yes. Tenants call our 24/7 dispatch line. We triage, route the right trade, and notify your on-call PM. Tenant-direct dispatch keeps response time tight.",
  },
];

export default function PropertyManagersPage() {
  return (
    <>
      <PageHero
        eyebrow="Property managers"
        title="One maintenance line for your whole portfolio across Canada and the US."
        description="Bulk dispatch. Recurring maintenance. Master-account billing. Compliance docs on demand. Built for property managers running multifamily, condo, retail, office, and mixed-use portfolios."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Property managers" },
        ]}
        image={IMAGES.edPropertyManagersHero}
        imageAlt={IMAGES.edPropertyManagersHeroAlt}
        size="default"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#intake" className="btn-accent">
            Request a B2B intake call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={NAP.phoneTel} className="btn-ghost-light">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
        </div>
      </PageHero>

      {/* TRADES WE COVER */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Six trades, one partner"
            title="Every trade your portfolio needs."
            description="Plumbing, heating and cooling, electrical, drain and sewer, restoration, and handyman. all under one accountability line. No more vendor sprawl."
            align="center"
            className="mb-12"
          />
          <TradesWeCover />
        </div>
      </section>

      {/* PM FEATURES — editorial slab, monumental serial numbers, paired icon */}
      <section className="bg-steel-50 section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Built for portfolios"
            title="The B2B mechanics that matter."
            description="The pieces property managers ask about on the first call. all standard, all built into the Bridgepoint operating model."
            className="mb-12 max-w-2xl"
          />
          <ol className="divide-y divide-steel-100 border-y border-steel-100 bg-white">
            {PM_FEATURES.map(({ Icon, title, body }, idx) => (
              <li
                key={title}
                className="grid grid-cols-12 gap-6 px-5 py-10 md:px-8 md:py-12 transition-colors hover:bg-cream-100"
              >
                <div className="col-span-12 md:col-span-2 flex items-baseline gap-4">
                  <span className="font-display text-5xl md:text-6xl font-extrabold text-cyan-700 tabular-nums leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-1 hidden md:flex items-start">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-2xl md:text-[1.625rem] font-bold text-navy leading-tight tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-base text-steel-700 leading-relaxed max-w-2xl">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EMERGENCY PROMISE */}
      <EmergencyPromise />

      {/* ONBOARDING */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Onboarding"
            title="From discovery call to first dispatch in 14 days."
            description="A repeatable onboarding playbook. small portfolios in 14 days, large portfolios over a 60-day phased rollout."
            align="center"
            className="mb-12"
          />
          <ol className="grid grid-cols-1 gap-px bg-steel-100 md:grid-cols-2 lg:grid-cols-4">
            {ONBOARDING.map(({ step, title, body }) => (
              <li
                key={step}
                className="relative bg-white p-7 transition-colors hover:bg-cream-100"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-7 bottom-7 w-[3px] bg-cyan-500 opacity-40"
                />
                <p className="font-display text-4xl font-extrabold text-cyan-700 tabular-nums leading-none">
                  {step}
                </p>
                <h3 className="mt-4 font-display text-base font-semibold text-navy leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-steel-600 leading-relaxed">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INTAKE FORM */}
      <section id="intake" className="bg-steel-50 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Request a B2B intake call"
              title="Tell us about the portfolio."
              description="A Bridgepoint operations lead will reach out within one business day to schedule a 30-minute discovery call."
            />
            <ul className="mt-6 space-y-3 text-sm text-steel-700">
              {[
                "30-minute discovery call",
                "Portfolio audit on top 3-5 properties",
                "Portfolio rate card + MSA",
                "Master-account billing + reporting setup",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3 text-sm text-steel-700">
              <Clock className="h-4 w-4 text-cyan-700" />
              <span>Reply within one business day. Mon-Fri 8am-6pm ET.</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <form
              action={`mailto:${NAP.email}`}
              method="post"
              encType="text/plain"
              className="rounded-2xl border border-steel-100 bg-white p-7 shadow-soft"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-steel-700 font-medium">Your name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-steel-700 font-medium">Company</span>
                  <input
                    type="text"
                    name="company"
                    required
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-steel-700 font-medium">Work email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-steel-700 font-medium">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="text-steel-700 font-medium">
                    Portfolio size
                  </span>
                  <select
                    name="portfolio"
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option>Under 10 properties</option>
                    <option>10-25 properties</option>
                    <option>25-50 properties</option>
                    <option>50-100 properties</option>
                    <option>100+ properties</option>
                  </select>
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-medium text-steel-700 mb-2">
                    Trades you need (check all)
                  </legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      "Plumbing",
                      "HVAC",
                      "Electrical",
                      "Drain & Sewer",
                      "Restoration",
                      "Handyman / GC",
                    ].map((t) => (
                      <label
                        key={t}
                        className="flex items-center gap-2 rounded-xl border border-steel-200 bg-white px-3 py-2 text-sm text-navy"
                      >
                        <input
                          type="checkbox"
                          name="trades"
                          value={t}
                          className="h-4 w-4 rounded border-steel-300 text-cyan-700 focus:ring-cyan-500/30"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm sm:col-span-2">
                  <span className="text-steel-700 font-medium">
                    Tell us about the portfolio
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Cities served, property types, current vendor pain points, target start date."
                    className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.7rem] text-steel-500 leading-relaxed">
                  By submitting you consent to a follow-up email or call from a
                  Bridgepoint operations lead. We never share your information.
                </p>
                <button type="submit" className="btn-accent">
                  Submit intake
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Frequently asked"
              title="Property manager FAQ."
              description="The questions we hear most often on the first discovery call."
            />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={PM_FAQ} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to consolidate your maintenance vendors?"
        body={`${BRAND.shortName} runs the dispatch line, the trades, the billing, and the reporting. Property managers across Canada and the US plug us in and ship vendor sprawl out the door.`}
      />
    </>
  );
}
