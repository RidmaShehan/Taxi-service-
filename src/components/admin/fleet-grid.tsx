"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car, Edit3, Trash2 } from "lucide-react";
import { deleteCar } from "@/lib/actions/cars";
import type { CarRow } from "@/types/database.types";

export function FleetGrid({ cars }: { cars: CarRow[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Remove this vehicle?")) return;
    await deleteCar(id);
    router.refresh();
  }

  if (cars.length === 0) {
    return (
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center text-slate-500">
        No vehicles yet. <Link href="/admin/add-vehicle" className="text-[#1e90ff] font-semibold">Add one</Link>.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cars.map((v) => (
          <div key={v.id} className="rounded-xl border border-slate-200 p-4">
            {v.image_url && (
              <div className="relative h-32 w-full overflow-hidden rounded-lg mb-3 bg-slate-100">
                <img src={v.image_url} alt={v.name} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1e90ff] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                v.status === "available" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {v.status.replace("_", " ")}
              </span>
            </div>
            <p className="font-bold text-slate-900">{v.name}</p>
            <p className="text-xs text-slate-500">{v.category} • {v.seats} Seats</p>
            <p className="text-sm font-semibold text-[#1e90ff] mt-2">${v.price_per_ride} / ride</p>
            <div className="flex gap-2 mt-4">
              <Link href={`/admin/fleet/${v.id}/edit`} className="flex-1 text-xs font-semibold rounded-lg border border-slate-200 py-2 inline-flex items-center justify-center gap-1">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </Link>
              <button onClick={() => handleDelete(v.id)} className="flex-1 text-xs font-semibold rounded-lg border border-rose-100 text-rose-600 py-2 inline-flex items-center justify-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
