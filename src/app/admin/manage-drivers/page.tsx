import { getDrivers } from "@/lib/actions/drivers";
import { DriversManager } from "@/components/admin/drivers-manager";

export default async function ManageDriversPage() {
  const drivers = await getDrivers();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Manage Drivers</h1>
      <p className="text-sm text-slate-500 mb-8">Control driver availability and performance.</p>
      <DriversManager drivers={drivers} />
    </div>
  );
}
