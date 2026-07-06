import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Mail, MapPin } from "lucide-react";

import { getAllRoleSlugs, getRoleBySlug, type Role } from "@/lib/careers";
import ApplyButton from "./ApplyButton";
import { BRAND, NAP } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { slug: string };
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const role = await getRoleBySlug(params.slug);
  if (!role) {
    return {
      title: "Role Not Found | Bridgepoint Maintenance",
      robots: { index: false, follow: false },
    };
  }
  const title = `${role.title} (${role.locationDisplay}) | Bridgepoint Maintenance Careers`;
  const description = `${role.title} (${role.type}) at Bridgepoint Maintenance in ${role.locationDisplay}. ${role.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/careers/${role.slug}` },
  };
}

export default async function CareerRolePage({ params }: RouteParams) {
  const role = await getRoleBySlug(params.slug);
  if (!role) notFound();

  const shareUrl = `${BRAND.url}/careers/${role.slug}`;
  const shareSubject = `${role.title} at Bridgepoint Maintenance`;

  return (
    <main className="bg-white">
      {/* Dark Hero Section */}
      <section className="bg-navy text-white relative overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-cross-navy"
        />
        <div className="container-bp relative z-10">
          {/* Back link */}
          <Link
            href="/careers#positions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-200 transition-colors hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            See All Open Positions
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8 min-w-0">
              <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-sans">
                {role.title}
              </h1>

              <dl className="mt-8 space-y-4 text-sm sm:text-base border-t border-white/10 pt-6">
                <MetaRow label="Employment Type">{role.type}</MetaRow>
                <MetaRow label="Location">{role.locationDisplay}</MetaRow>
                {role.compensation && (
                  <MetaRow label="Compensation">{role.compensation}</MetaRow>
                )}
              </dl>

              {/* Share and Apply actions */}
              <div className="mt-10 flex flex-wrap items-end gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-steel-300">
                    Share this position:
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <ShareIcon
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      label="Share on LinkedIn"
                    >
                      <LinkedInIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Share on Facebook"
                    >
                      <FacebookIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareSubject)}`}
                      label="Share on X"
                    >
                      <XIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareUrl)}`}
                      label="Share by email"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </ShareIcon>
                  </div>
                </div>

                <div>
                  <ApplyButton role={role.title} jobId={role.jobId} workType={role.workType} variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-bp">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Sidebar info block */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-navy leading-none mb-6">
                  Job
                  <br />
                  Overview
                </h2>

                <ul className="space-y-4 text-sm text-steel-600 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                    <span>{role.type}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                    <span>{role.locationDisplay}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-steel-50 p-5 border border-steel-100">
                <h3 className="text-sm font-bold text-navy mb-2 tracking-wider">Important Location Requirement:</h3>
                <div className="text-xs text-steel-600 space-y-3 leading-relaxed">
                  <p>
                    This is a remote position; however, candidates must be located in the same country, city, or region where the job is posted. The successful candidate must be available to attend a local office, meeting, training session, or company event if requested.
                  </p>
                  <p className="font-semibold text-navy">
                    Please only apply if you are based in the location listed on this job posting. Remote does not mean the position is open worldwide.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <article className="min-w-0">
              {role.htmlDescription ? (
                <div
                  className="job-desc text-steel-700 leading-relaxed text-sm space-y-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: role.htmlDescription }}
                />
              ) : (
                <div className="space-y-10">
                  {/* Summary */}
                  <Block title="Role Summary">
                    <p className="text-base leading-relaxed text-steel-600 font-sans">
                      {role.summary}
                    </p>
                  </Block>

                  {/* Responsibilities */}
                  <Block title="Key Responsibilities">
                    <BulletList items={role.responsibilities} />
                  </Block>

                  {/* Requirements */}
                  <Block title="Requirements & Qualifications">
                    <BulletList items={role.requiredSkills} />
                  </Block>

                  {/* Good to have */}
                  {role.goodToHaveSkills && role.goodToHaveSkills.length > 0 && (
                    <Block title="Preferred (Good to Have) Skills">
                      <BulletList items={role.goodToHaveSkills} />
                    </Block>
                  )}

                  {/* Education */}
                  {role.educationAndExperience && role.educationAndExperience.length > 0 && (
                    <Block title="Education & Experience">
                      <BulletList items={role.educationAndExperience} />
                    </Block>
                  )}

                  {/* Additional Information */}
                  {role.additionalInfo && (
                    <Block title="Additional Information">
                      <p className="text-sm leading-relaxed text-steel-600">
                        {role.additionalInfo}
                      </p>
                    </Block>
                  )}
                </div>
              )}

              {/* Action row at bottom */}
              <div className="mt-12 flex flex-wrap gap-4 border-t border-steel-100 pt-10">
                <ApplyButton role={role.title} jobId={role.jobId} workType={role.workType} variant="primary" />
                <Link
                  href="/careers#positions"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-steel-200 bg-white px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:border-steel-400 hover:bg-steel-50"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  See all open positions
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

// Sub-components
function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] items-baseline gap-x-4 sm:grid-cols-[12rem_1fr]">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-steel-300">
        {label}
      </dt>
      <dd className="font-semibold text-white">{children}</dd>
    </div>
  );
}

function ShareIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const isMailto = href.startsWith("mailto:");
  return (
    <a
      href={href}
      aria-label={label}
      {...(isMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/60 hover:bg-white/10"
    >
      {children}
    </a>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-display text-xl font-bold text-navy border-b-2 border-cyan/30 pb-2 mb-4 w-fit">
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-steel-600">
          <span
            aria-hidden="true"
            className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Brand SVG icons
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
