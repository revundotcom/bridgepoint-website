import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { LOCATION_PAGES } from "@/lib/silo-locations";
import { IMAGES } from "@/lib/images";

export const metadata = {
 title: "Service Areas | Bridgepoint Maintenance",
 description:
 "Bridgepoint Maintenance dispatches across Canada and the US. Greater Toronto first, with active US trade partner coverage in New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin.",
};

const CANADIAN_SLUGS = new Set([
 "toronto",
 "mississauga",
 "vaughan",
 "concord",
 "markham",
 "brampton",
 "richmond-hill",
 "ottawa",
 "hamilton",
 "etobicoke",
 "north-york",
 "scarborough",
]);

export default function ServiceAreasHub() {
 const canadianPages = LOCATION_PAGES.filter((p) => CANADIAN_SLUGS.has(p.slug));
 const usPages = LOCATION_PAGES.filter((p) => !CANADIAN_SLUGS.has(p.slug));

 return (
 <>
 <SchemaJsonLd
 id="ld-hub-service-areas"
 data={breadcrumbSchema([
 { name: "Home", url: BRAND.url },
 { name: "Service Areas", url: `${BRAND.url}/service-areas` },
 ])}
 />
 <PageHero
 eyebrow="Service areas"
 title="One dispatch desk across Canada and the US."
 description="Bridgepoint Maintenance runs property maintenance dispatch across Canada and the US. Greater Toronto is our densest market. Our US trade partner network covers New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin on the same single dispatch model."
 crumbs={[{ name: "Home", href: "/" }, { name: "Service Areas" }]}
 image={IMAGES.edLocationsHero}
 imageAlt="Bridgepoint Maintenance service area coverage across Canada and the US"
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 {NAP.phone}
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
 eyebrow="Canada"
 title="Canadian service areas."
 description="Greater Toronto Area first. Operating across Canada and the US. Dispatch routes daily across Toronto, Mississauga, Vaughan, Markham, Brampton, Richmond Hill, Etobicoke, North York, Scarborough, Hamilton, and Ottawa."
 className="mb-12"
 />
 <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
 {canadianPages.map((page) => (
 <AreaCard key={page.slug} slug={page.slug} name={page.name} tagline={page.tagline} eyebrow={page.eyebrow} />
 ))}
 </div>
 </div>
 </section>

 <section className="bg-navy-50 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="United States"
 title="US service areas."
 description="Bridgepoint dispatches across the US through a vetted trade partner network. State licensed trades. Same dispatch desk, same documentation standard, same accountability model used in Greater Toronto."
 className="mb-12"
 />
 <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
 {usPages.map((page) => (
 <AreaCard key={page.slug} slug={page.slug} name={page.name} tagline={page.tagline} eyebrow={page.eyebrow} />
 ))}
 </div>
 </div>
 </section>

 <CTASection />
 </>
 );
}

function AreaCard({
 slug,
 name,
 tagline,
 eyebrow,
}: {
 slug: string;
 name: string;
 tagline: string;
 eyebrow: string;
}) {
 return (
 <Link
 href={`/service-areas/${slug}`}
 className="group relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-6 shadow-soft transition-colors hover:border-cyan-500"
 >
 <div className="flex items-start justify-between gap-4">
 <div>
 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
 {eyebrow}
 </p>
 <h3 className="mt-2 font-display text-xl font-semibold text-navy">
 {name}
 </h3>
 <p className="mt-2 text-sm text-steel-600 leading-snug">
 {tagline}
 </p>
 </div>
 <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-steel-50 text-cyan-700 transition group-hover:bg-cyan-500 group-hover:text-white">
 <ArrowUpRight className="h-4 w-4" />
 </span>
 </div>
 </Link>
 );
}
