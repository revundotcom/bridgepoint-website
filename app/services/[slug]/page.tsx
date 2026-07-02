import { notFound } from "next/navigation";
import SiloPageRenderer from "@/components/SiloPageRenderer";
import { SERVICE_PAGES, getServicePage } from "@/lib/silo-services";
import { IMAGES } from "@/lib/images";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const page = getServicePage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

const HERO_IMAGES: Record<string, string> = {
  plumbing: IMAGES.edPlumbingHero,
  electrical: IMAGES.serviceElectrical,
  hvac: IMAGES.edHeatingHero,
  carpentry: IMAGES.serviceGeneral,
  "drywall-and-painting": IMAGES.serviceGeneral,
  "general-repairs": IMAGES.serviceGeneral,
  "preventative-maintenance": IMAGES.edServicesHero,
  "unit-turnovers": IMAGES.serviceGeneral,
  "commercial-contracting": IMAGES.serviceBuilding,
  "tenant-fit-outs": IMAGES.serviceBuilding,
  "facility-maintenance": IMAGES.serviceBuilding,
  "building-upkeep": IMAGES.serviceBuilding,
};

export default function ServicePage({ params }: Params) {
  const page = getServicePage(params.slug);
  if (!page) notFound();

  return (
    <SiloPageRenderer
      page={page}
      siloRoot="/services"
      siloLabel="Services"
      heroImage={HERO_IMAGES[page.slug] || IMAGES.edServicesHero}
    />
  );
}
