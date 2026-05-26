"use client";

import { useRouter } from "next/navigation";
import { updateBookingStatus, deleteBooking } from "@/lib/actions/bookings";
import type { BookingRow } from "@/types/database.types";

export function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  const router = useRouter();

  async function handleStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
    await updateBookingStatus(id, status);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this booking?")) return;
    await deleteBooking(id);
    router.refresh();
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center text-slate-500">
        No bookings yet.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 md:p-6 overflow-x-auto">
      <table className="w-full min-w-[700px] text-sm text-left">
        <thead>
          <tr className="text-slate-500 border-b border-slate-100">
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Route</th>
            <th className="pb-3 font-medium">Date / Time</th>
            <th className="pb-3 font-medium">Passengers</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="py-4">
                <div className="font-bold text-slate-900">{b.name}</div>
                <div className="text-xs text-slate-500">{b.phone}</div>
              </td>
              <td className="py-4 text-slate-600 max-w-[200px]">
                <div className="truncate">{b.pickup_location}</div>
                <div className="truncate text-xs text-slate-400">→ {b.destination}</div>
              </td>
              <td className="py-4 text-slate-600">
                {new Date(b.date_time).toLocaleString()}
              </td>
              <td className="py-4">{b.passenger_count}</td>
              <td className="py-4">
                <select
                  value={b.status}
                  onChange={(e) => handleStatus(b.id, e.target.value as "pending" | "confirmed" | "cancelled")}
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-4">
                <button onClick={() => handleDelete(b.id)} className="text-xs text-red-600 font-semibold hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
