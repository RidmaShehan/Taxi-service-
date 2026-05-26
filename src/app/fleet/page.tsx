import { getCars } from "@/lib/actions/cars";
import { FleetPageClient } from "@/components/fleet/fleet-page-client";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { ensureSiteAvailable } from "@/lib/check-maintenance";

export default async function FleetPage() {
  await ensureSiteAvailable();
  const cars = await getCars({ excludeMaintenance: true });

  return (
    <div className="min-h-screen bg-white">
      <MarketingShell>
        <FleetPageClient cars={cars} />
      </MarketingShell>
    </div>
  );
}
