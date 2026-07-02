import { notFound } from "next/navigation";
import SiloPageRenderer from "@/components/SiloPageRenderer";
import { INDUSTRY_PAGES, getIndustryPage } from "@/lib/silo-industries";
import { IMAGES } from "@/lib/images";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const page = getIndustryPage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

const HERO_IMAGES: Record<string, string> = {
  "property-managers": IMAGES.edPropertyManagersHero,
  landlords: IMAGES.edPropertyManagersHero,
  "multi-family-buildings": IMAGES.edPropertyManagersHero,
  "commercial-property-owners": IMAGES.editorialHero,
  "residential-property-owners": IMAGES.editorialHero,
  "retail-and-office": IMAGES.editorialHero,
  "condominium-corporations": IMAGES.editorialHero,
  "institutional-asset-holders": IMAGES.editorialHero,
  "real-estate-investors": IMAGES.editorialHero,
  "trades-and-subcontractors": IMAGES.editorialHero,
};

export default function IndustrySiloPage({ params }: Params) {
  const page = getIndustryPage(params.slug);
  if (!page) notFound();

  return (
    <SiloPageRenderer
      page={page}
      siloRoot="/industries"
      siloLabel="Industries"
      heroImage={HERO_IMAGES[page.slug]}
    />
  );
}
