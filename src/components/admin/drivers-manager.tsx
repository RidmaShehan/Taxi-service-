"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { createDriver, deleteDriver } from "@/lib/actions/drivers";
import type { DriverRow } from "@/types/database.types";

export function DriversManager({ drivers }: { drivers: DriverRow[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await createDriver(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this driver?")) return;
    await deleteDriver(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Full name" required className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
            <input name="driver_code" placeholder="Driver code (e.g. DRV-201)" required className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="phone" placeholder="Phone" required className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
            <select name="status" defaultValue="available" className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
          <input name="rating" type="number" step="0.1" min={0} max={5} defaultValue={5} placeholder="Rating" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold disabled:opacity-50">
            {loading ? "Saving..." : "Save Driver"}
          </button>
        </form>
      )}

      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 md:p-6 overflow-x-auto">
        {drivers.length === 0 ? (
          <p className="text-sm text-slate-500">No drivers yet.</p>
        ) : (
          <table className="w-full min-w-[600px] text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-medium">Driver</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {drivers.map((d) => (
                <tr key={d.id}>
                  <td className="py-4">
                    <div className="font-bold text-slate-900">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.driver_code}</div>
                  </td>
                  <td className="py-4 text-slate-600">{d.phone}</td>
                  <td className="py-4">{d.rating}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase">
                      {d.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4">
                    <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
