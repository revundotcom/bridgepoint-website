import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Open Positions | Bridgepoint Maintenance",
  description:
    "Current open trades positions at Bridgepoint Maintenance across Canada and the US. plumbing, electrical, HVAC, and general maintenance roles.",
};

const REQUIREMENTS = [
  "Valid state or provincial trade license (Red Seal, ESA Master Electrician, TSSA gas, plumbing. as applicable)",
  "WSIB clearance current",
  "Experience with commercial and/or multifamily properties",
  "Reliable transportation and ability to dispatch across the GTA",
  "Comfort with mobile work-order systems and digital reporting",
];

export default function PositionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Positions"
        title="Open positions across Canada and the US."
        description="Bridgepoint accepts applications across all trades, year-round."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
          { name: "Positions" },
        ]}
        image={IMAGES.toolsKit}
        imageAlt={IMAGES.toolsKitAlt}
        size="compact"
      />

      <section className="bg-white section">
        <div className="container-bp">
          <div className="rounded-3xl border border-accent/30 bg-accent/[0.04] p-8 md:p-10 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-3">
              Always hiring
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-4 text-balance">
              Accepting applications across all trades.
            </h2>
            <p className="text-base text-steel-500 mb-6 max-w-2xl leading-relaxed">
              We don't always have a posted opening. but we're continuously
              building our trades network. Submit your application and we'll
              contact you when a match opens. Send resume, references, and
              trade-license documentation to{" "}
              <a
                href={`mailto:${NAP.careersEmail}`}
                className="font-semibold text-navy hover:text-cyan-700"
              >
                {NAP.careersEmail}
              </a>
              .
            </p>
            <a href={`mailto:${NAP.careersEmail}`} className="btn-accent">
              <Mail className="h-4 w-4" />
              Apply today
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <SectionHeading
            eyebrow="What we look for"
            title="Five baseline qualifications."
            className="mb-8"
          />
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
          <p className="mt-8 text-xs text-steel-600">
            Live openings with full job descriptions will be posted as roles
            become available.
          </p>
        </div>
      </section>
    </>
  );
}
