import SiloHub from "@/components/SiloHub";
import { EMERGENCY_PAGES } from "@/lib/silo-emergency";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "24/7 Emergency Dispatch | Bridgepoint Maintenance",
  description:
    "Twenty four hour emergency dispatch across Canada and the US. Plumbing, electrical, HVAC, water damage, storm, sewer, boiler. Call 1-855-910-9090.",
};

export default function EmergencyHub() {
  return (
    <SiloHub
      pages={EMERGENCY_PAGES}
      siloRoot="/emergency"
      siloLabel="Emergency"
      eyebrow="24/7 emergency dispatch"
      heroTitle="One number when something has to be fixed now."
      heroDescription="Bridgepoint Maintenance runs twenty four hour emergency dispatch across plumbing, electrical, HVAC, water damage, storm damage, sewer, and boiler emergencies. Stocked trucks, licensed trades, and documentation that holds up if an insurance claim follows."
      heroImage={IMAGES.serviceEmergency}
      introTitle="Twelve emergency response lines."
      introDescription="Bridgepoint routes every emergency call through the same dispatch number. Tell us the issue. We route the right crew with the right truck and stay on the line until they arrive."
      emergency
    />
  );
}
