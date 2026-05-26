import { notFound } from "next/navigation";
import { getCarById } from "@/lib/actions/cars";
import { CarForm } from "@/components/admin/car-form";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Edit Vehicle</h1>
      <p className="text-sm text-slate-500 mb-8">{car.name}</p>
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
        <CarForm car={car} />
      </div>
    </div>
  );
}
