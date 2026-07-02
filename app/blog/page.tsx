import Image from "next/image";
import { FileText, Sparkles, Calendar } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Maintenance Insights & Property Operator Blog | Bridgepoint",
  description:
    "Seasonal maintenance tips, emergency prep, and property operator insights from Bridgepoint Maintenance, across Canada and the US.",
};

type Topic = {
  title: string;
  blurb: string;
  img: string;
  alt: string;
  category: string;
  readTime: string;
};

const SEED_TOPICS: Topic[] = [
  {
    title: "Seasonal HVAC prep for cold weather markets",
    blurb:
      "What property managers should book between October and December to keep boilers, RTUs, and condensers running through cold snaps across Canada and the US.",
    img: IMAGES.blogSeasonal,
    alt: IMAGES.blogSeasonalAlt,
    category: "HVAC",
    readTime: "6 min read",
  },
  {
    title: "Emergency plumbing. What to do in the first 10 minutes.",
    blurb:
      "A burst valve at 6pm can cost $3,400 in damage by midnight. The shut-off, the documentation, and the dispatch call sequence.",
    img: IMAGES.servicePlumbing,
    alt: IMAGES.servicePlumbingAlt,
    category: "Emergency",
    readTime: "5 min read",
  },
  {
    title: "Commercial electrical maintenance checklist",
    blurb:
      "Quarterly walk-throughs property managers can run with their Bridgepoint account lead, plus the items that need a licensed electrician.",
    img: IMAGES.blogElectrical,
    alt: IMAGES.blogElectricalAlt,
    category: "Electrical",
    readTime: "8 min read",
  },
  {
    title: "Multi-family HVAC scheduling for landlords",
    blurb:
      "How to stagger filter changes, condenser cleans, and unit-level inspections across a 200-door multifamily portfolio without burning a weekend.",
    img: IMAGES.hvacRooftop,
    alt: IMAGES.hvacRooftopAlt,
    category: "HVAC",
    readTime: "7 min read",
  },
  {
    title: "Preventing frozen pipes in high-rises",
    blurb:
      "Insulation, heat trace, and the maintenance ticket cadence that keeps risers from splitting in a Toronto February.",
    img: IMAGES.blogPipes,
    alt: IMAGES.blogPipesAlt,
    category: "Plumbing",
    readTime: "5 min read",
  },
  {
    title: "24/7 maintenance response, what to demand from vendors",
    blurb:
      "If your vendor's after-hours line goes to voicemail, you do not have a maintenance vendor. The questions to ask before signing.",
    img: IMAGES.dispatch01,
    alt: IMAGES.dispatch01Alt,
    category: "Operations",
    readTime: "6 min read",
  },
  {
    title: "Plumbing permits in Toronto. What needs one, what does not.",
    blurb:
      "A plain-English breakdown of when Bridgepoint pulls a permit, when it is included in the quote, and how that affects timeline.",
    img: IMAGES.plumbingPipes,
    alt: IMAGES.plumbingPipesAlt,
    category: "Plumbing",
    readTime: "5 min read",
  },
  {
    title: "Emergency electrician vs routine service. Cost and timing.",
    blurb:
      "What separates an after-hours emergency truck roll from a scheduled visit, and how Bridgepoint quotes both up front.",
    img: IMAGES.serviceElectrical,
    alt: IMAGES.serviceElectricalAlt,
    category: "Electrical",
    readTime: "4 min read",
  },
  {
    title: "HVAC filters for commercial buildings",
    blurb:
      "MERV ratings, replacement cadence, and how to size the filter program to the building, not the catalog.",
    img: IMAGES.hvacDuctwork,
    alt: IMAGES.hvacDuctworkAlt,
    category: "HVAC",
    readTime: "5 min read",
  },
  {
    title: "Water heater replacement signs to watch for",
    blurb:
      "The four warning signs that a residential or commercial unit is about to fail, and the cost of waiting until it does.",
    img: IMAGES.plumbingWaterHeater,
    alt: IMAGES.plumbingWaterHeaterAlt,
    category: "Plumbing",
    readTime: "5 min read",
  },
  {
    title: "Why single-vendor maintenance saves property managers time",
    blurb:
      "The math on vendor sprawl. Hours saved on coordination, dollars saved on consolidated invoicing, and audit hours saved on documentation.",
    img: IMAGES.galleryDispatch,
    alt: IMAGES.galleryDispatchAlt,
    category: "Operations",
    readTime: "8 min read",
  },
  {
    title: "AODA accessibility and maintenance obligations",
    blurb:
      "A plain-English explainer of what property managers in Canada need to keep accessible under AODA, and how Bridgepoint documents it.",
    img: IMAGES.galleryConcordHq,
    alt: IMAGES.galleryConcordHqAlt,
    category: "Compliance",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Bridgepoint insights. Property maintenance, end to end."
        description="Seasonal maintenance tips, emergency prep, and property operator insights for property managers, commercial owners, and multifamily operators across Canada and the US."
        crumbs={[{ name: "Home", href: "/" }, { name: "Insights" }]}
        image={IMAGES.contactOffice}
        imageAlt="Office workspace with laptop and notes"
        size="compact"
      />

      <section className="bg-white section">
        <div className="container-bp">
          <div className="rounded-3xl border border-accent/30 bg-accent/[0.04] p-8 md:p-10 mb-12 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-cyan-700 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
                  Editorial calendar
                </p>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-navy text-balance">
                  The Bridgepoint insights blog launches with the website.
                </h2>
                <p className="mt-2 text-sm md:text-base text-steel-500 max-w-xl leading-relaxed">
                  Below are upcoming posts on the calendar. Posts roll out
                  weekly once the editorial cadence begins.
                </p>
              </div>
            </div>
          </div>

          <SectionHeading
            eyebrow="On the calendar"
            title="Upcoming Bridgepoint articles."
            className="mb-10"
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SEED_TOPICS.map((topic) => (
              <li
                key={topic.title}
                className="group overflow-hidden rounded-2xl border border-steel-100 bg-white shadow-soft transition hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={topic.img}
                    alt={topic.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-800 shadow-soft">
                    <FileText className="h-3 w-3" />
                    {topic.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-500 mb-2">
                    <Calendar className="h-3 w-3" />
                    {topic.readTime}
                  </p>
                  <h3 className="font-display text-base font-semibold text-navy-700 leading-tight mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-steel-500 leading-relaxed">
                    {topic.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
