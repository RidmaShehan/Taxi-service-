"use client";

import { Calendar, Clock3, Filter, Search, MoreVertical } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bookings</h1>
          <p className="text-sm text-slate-500">Track, confirm, and manage all booking requests.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700">
            Export CSV
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-[#1e90ff] text-sm font-semibold text-white">
            Create Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          ["Today", "24"],
          ["Pending", "8"],
          ["Confirmed", "13"],
          ["Cancelled", "3"],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-5">
          <div className="relative w-full md:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2.5 text-sm focus:outline-none"
              placeholder="Search by customer or booking ID"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date Range
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="pb-3 font-medium">Booking</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Route</th>
                <th className="pb-3 font-medium">Pickup</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                ["BK-2101", "James Miller", "CMB -> Galle Fort", "Today, 14:30", "Confirmed"],
                ["BK-2102", "Sophie Chen", "Negombo -> Sigiriya", "Today, 18:00", "Pending"],
                ["BK-2103", "Aiko Tanaka", "CMB -> Colombo 03", "Tomorrow, 08:15", "Confirmed"],
                ["BK-2104", "David Emma", "Kandy -> Ella", "Tomorrow, 11:00", "Cancelled"],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="py-4 font-semibold text-slate-900">{row[0]}</td>
                  <td className="py-4 text-slate-700">{row[1]}</td>
                  <td className="py-4 text-slate-600">{row[2]}</td>
                  <td className="py-4 text-slate-600">
                    <span className="inline-flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" />{row[3]}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      row[4] === "Confirmed"
                        ? "bg-emerald-50 text-emerald-600"
                        : row[4] === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                    }`}>
                      {row[4]}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400"><MoreVertical className="w-4 h-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
