import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { HELP_ARTICLES } from "@/lib/help-articles";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return HELP_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params) {
  const article = HELP_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Bridgepoint Help`,
    description: article.intro,
  };
}

export default function HelpArticlePage({ params }: Params) {
  const article = HELP_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Help", href: "/help" },
          { name: article.shortTitle },
        ]}
        image={IMAGES.brandTechToolbox}
        imageAlt={IMAGES.brandTechToolboxAlt}
        size="compact"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            Talk to dispatch
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8 prose-bp">
            {article.sections.map((s) => (
              <section key={s.heading} className="mb-10">
                <h2 className="font-display text-2xl font-bold text-navy mb-3 leading-tight">
                  {s.heading}
                </h2>
                <p className="text-steel-700 leading-relaxed">{s.body}</p>
              </section>
            ))}

            <section className="mt-12 rounded-3xl border border-cyan-500/30 bg-cyan-50 p-7">
              <p className="eyebrow text-cyan-800 mb-2">Bridgepoint follow-up</p>
              <h3 className="font-display text-xl font-bold text-navy mb-2">
                Need eyes on this from a licensed tech?
              </h3>
              <p className="text-sm text-steel-700 leading-relaxed mb-5">
                Our dispatchers triage your address in under three minutes and
                route the right trade with a written ETA on the first call.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={NAP.phoneTel} className="btn-accent">
                  <Phone className="h-4 w-4" />
                  {NAP.phone}
                </a>
                {article.serviceLink && (
                  <Link
                    href={article.serviceLink.href}
                    className="btn-secondary"
                  >
                    {article.serviceLink.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </section>
          </article>

          <aside className="lg:col-span-4 space-y-5">
            <div className="card">
              <p className="eyebrow text-cyan-800 mb-3">What we check on every call</p>
              <ul className="space-y-2.5 text-sm text-steel-700">
                {[
                  "License numbers documented on every work order",
                  "Flat-rate quote presented before any work begins",
                  "Photos uploaded to your job file",
                  "Workmanship warranty + 7-day follow-up",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {article.related.length > 0 && (
              <div className="card">
                <p className="eyebrow text-cyan-800 mb-3">Related field guides</p>
                <ul className="space-y-3 text-sm">
                  {article.related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/help/${r.slug}`}
                        className="flex items-start justify-between gap-2 text-navy hover:text-cyan-700 leading-snug"
                      >
                        <span>{r.label}</span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 flex-none" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="bg-steel-50 section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="More common problems"
            title="Browse the rest of the help library."
            align="center"
            className="mb-10"
          />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HELP_ARTICLES.filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className="group block h-full rounded-2xl border border-steel-100 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-cyan-800 mb-3">
                      {a.category}
                    </span>
                    <h3 className="font-display text-base font-semibold text-navy leading-snug group-hover:text-cyan-700 transition">
                      {a.title}
                    </h3>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={`${BRAND.shortName} answers the phone 24/7.`}
        body="Whatever the problem, our dispatchers will scope it, quote it, and route the right trade. Talk to us."
      />
    </>
  );
}
