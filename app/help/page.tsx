import Link from "next/link";
import { Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { HELP_ARTICLES } from "@/lib/help-articles";

export const metadata = {
  title: "Help Library | Common Plumbing, HVAC & Electrical Problems",
  description:
    "Bridgepoint's help library: plain-English answers to the most common plumbing, HVAC, electrical, and emergency questions homeowners ask.",
};

export default function HelpIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Help library"
        title="Common problems we see, in plain English."
        description="Short, practical answers to the questions we hear most often on the dispatch line. Written by Bridgepoint's licensed plumbers, electricians, and HVAC techs."
        crumbs={[{ name: "Home", href: "/" }, { name: "Help" }]}
        image={IMAGES.edHelpHero}
        imageAlt={IMAGES.edHelpHeroAlt}
        size="compact"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            Call dispatch
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Field guides"
            title="Browse by topic."
            description="Each article is short on purpose. We tell you what we look for, what you can check yourself, and when to call dispatch."
            align="center"
            className="mb-12"
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HELP_ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/help/${a.slug}`}
                  className="group flex h-full flex-col rounded-md border border-steel-100 bg-white p-7 shadow-soft transition-colors hover:border-cyan-500"
                >
                  <span className="inline-flex items-center self-start gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cyan-800 mb-4">
                    {a.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-navy leading-snug mb-2 group-hover:text-cyan-700 transition">
                    {a.title}
                  </h3>
                  <p className="text-sm text-steel-600 leading-relaxed mb-5 flex-1">
                    {a.intro}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-cyan-700">
                    Read the field guide
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={`Still stuck? Talk to ${BRAND.shortName} dispatch.`}
        body="Our dispatchers triage common issues in under three minutes. Tell us the address, the trade, and a one-line description, and we will route the right tech."
      />
    </>
  );
}
