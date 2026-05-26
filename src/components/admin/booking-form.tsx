"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/lib/actions/bookings";
import type { CarRow } from "@/types/database.types";

type Props = { cars: CarRow[] };

export function BookingForm({ cars }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    formData.set("date_time", new Date(`${date}T${time}`).toISOString());
    formData.delete("date");
    formData.delete("time");

    const result = await createBooking(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push("/admin/bookings");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
          <input name="name" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
          <input name="phone" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
        <input name="email" type="email" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pickup</label>
        <input name="pickup_location" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Destination</label>
        <input name="destination" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
          <input name="date" type="date" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Time</label>
          <input name="time" type="time" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Passengers</label>
          <input name="passenger_count" type="number" min={1} defaultValue={1} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Vehicle</label>
          <select name="car_id" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
            <option value="">Select vehicle</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Special requests</label>
        <textarea name="message" rows={2} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#1e90ff] text-white rounded-lg text-sm font-semibold disabled:opacity-50">
        {loading ? "Saving..." : "Create Booking"}
      </button>
    </form>
  );
}
