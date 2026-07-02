import { notFound } from "next/navigation";
import SiloPageRenderer from "@/components/SiloPageRenderer";
import { EMERGENCY_PAGES, getEmergencyPage } from "@/lib/silo-emergency";
import { IMAGES } from "@/lib/images";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return EMERGENCY_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const page = getEmergencyPage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

const HERO_IMAGES: Record<string, string> = {
  plumbing: IMAGES.servicePlumbing,
  electrical: IMAGES.serviceElectrical,
  hvac: IMAGES.serviceHvac,
  "water-damage": IMAGES.edWaterDamageHero,
  "burst-pipes": IMAGES.plumbingPipes,
  "no-heat": IMAGES.edHeatingHero,
  "no-cooling": IMAGES.edCoolingHero,
  "no-power": IMAGES.noPowerHero,
  "roof-damage": IMAGES.editorialHero,
  "storm-damage": IMAGES.editorialHero,
  "sewer-backups": IMAGES.edDrainHero,
  "boiler-failure": IMAGES.hvacFurnace,
};

export default function EmergencySiloPage({ params }: Params) {
  const page = getEmergencyPage(params.slug);
  if (!page) notFound();

  return (
    <SiloPageRenderer
      page={page}
      siloRoot="/emergency"
      siloLabel="Emergency"
      heroImage={HERO_IMAGES[page.slug]}
      emergency
    />
  );
}
