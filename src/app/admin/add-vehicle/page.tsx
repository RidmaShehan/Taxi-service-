import { CarForm } from "@/components/admin/car-form";

export default function AddVehiclePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Add Vehicle</h1>
      <p className="text-sm text-slate-500 mb-8">Add a new vehicle to your fleet.</p>
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <CarForm />
      </div>
    </div>
  );
}
