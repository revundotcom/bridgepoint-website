import { notFound } from "next/navigation";
import SiloPageRenderer from "@/components/SiloPageRenderer";
import { RESOURCE_PAGES, getResourcePage } from "@/lib/silo-resources";
import { IMAGES } from "@/lib/images";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return RESOURCE_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const page = getResourcePage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default function ResourceSiloPage({ params }: Params) {
  const page = getResourcePage(params.slug);
  if (!page) notFound();

  return (
    <SiloPageRenderer
      page={page}
      siloRoot="/resources"
      siloLabel="Resources"
      heroImage={IMAGES.edHelpHero}
    />
  );
}
