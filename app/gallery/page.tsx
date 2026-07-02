import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PhotoGallery from "@/components/PhotoGallery";
import TrustBadgesRow from "@/components/TrustBadgesRow";
import CTASection from "@/components/CTASection";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Recent Work Gallery | Bridgepoint Maintenance",
  description:
    "Before and after photos from recent Bridgepoint Maintenance jobs across the GTA. Furnace replacements, panel upgrades, plumbing repairs, and HVAC retrofits.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Recent work"
        title="Real before-and-after work across the GTA."
        description="Recent jobs from across Bridgepoint's plumbing, HVAC, and electrical service area. Each job documented with before-and-after photos and a written scope of work."
        crumbs={[{ name: "Home", href: "/" }, { name: "Gallery" }]}
        image={IMAGES.edGalleryHero}
        imageAlt={IMAGES.edGalleryHeroAlt}
        size="compact"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            Call dispatch · {NAP.phone}
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Recent work"
            title="Furnaces, panels, plumbing, and HVAC retrofits."
            description="Each pair shows the existing condition and the completed Bridgepoint install. Photos taken on the job by the technician of record."
            align="center"
            className="mb-12"
          />
          <PhotoGallery />
        </div>
      </section>

      <section className="bg-steel-50 section-tight">
        <div className="container-bp">
          <TrustBadgesRow />
        </div>
      </section>

      <CTASection
        title={`Have a job for ${BRAND.shortName}?`}
        body="Request a flat-rate written quote. We document everything: license numbers, parts, and a 7-day follow-up on every install."
      />
    </>
  );
}
