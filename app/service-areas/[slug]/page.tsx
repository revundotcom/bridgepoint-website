import { notFound } from "next/navigation";
import SiloPageRenderer from "@/components/SiloPageRenderer";
import { LOCATION_PAGES, getLocationPage } from "@/lib/silo-locations";
import { IMAGES } from "@/lib/images";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return LOCATION_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const page = getLocationPage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default function ServiceAreaPage({ params }: Params) {
  const page = getLocationPage(params.slug);
  if (!page) notFound();

  return (
    <SiloPageRenderer
      page={page}
      siloRoot="/service-areas"
      siloLabel="Service Areas"
      heroImage={IMAGES.edLocationsHero}
    />
  );
}
