import Link from "next/link";
import { getCars } from "@/lib/actions/cars";
import { FleetGrid } from "@/components/admin/fleet-grid";

export default async function FleetAdminPage() {
  const cars = await getCars();

  const stats = {
    total: cars.length,
    available: cars.filter((c) => c.status === "available").length,
    inService: cars.filter((c) => c.status === "in_service").length,
    maintenance: cars.filter((c) => c.status === "maintenance").length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Fleet</h1>
          <p className="text-sm text-slate-500">Manage vehicle details, status, and pricing.</p>
        </div>
        <Link href="/admin/add-vehicle" className="px-4 py-2.5 rounded-lg bg-[#1e90ff] text-white text-sm font-semibold inline-flex items-center justify-center">
          Add Vehicle
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Vehicles", stats.total],
          ["Available", stats.available],
          ["In Service", stats.inService],
          ["Maintenance", stats.maintenance],
        ].map(([label, value]) => (
          <div key={label as string} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
        ))}
      </div>

      <FleetGrid cars={cars} />
    </div>
  );
}
