"use client";

import { Car, Edit3, Plus, Search, Trash2 } from "lucide-react";

export default function FleetAdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Fleet</h1>
          <p className="text-sm text-slate-500">Manage vehicle details, status, and pricing.</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#1e90ff] text-white text-sm font-semibold inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Vehicles", "18"],
          ["Available", "14"],
          ["In Service", "3"],
          ["Maintenance", "1"],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 md:p-6">
        <div className="relative mb-5 w-full md:max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm" placeholder="Search vehicle..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            ["Toyota Prius", "Sedan", "$35", "4 Seats", "Available"],
            ["Hiace KDH", "Van", "$90", "10 Seats", "Available"],
            ["Mercedes E-Class", "Premium", "$75", "3 Seats", "In Service"],
            ["Honda Vezel", "SUV", "$45", "4 Seats", "Available"],
          ].map((v) => (
            <div key={v[0]} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1e90ff] flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                  v[4] === "Available" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                }`}>
                  {v[4]}
                </span>
              </div>
              <p className="font-bold text-slate-900">{v[0]}</p>
              <p className="text-xs text-slate-500">{v[1]} • {v[3]}</p>
              <p className="text-sm font-semibold text-[#1e90ff] mt-2">{v[2]} / ride</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-xs font-semibold rounded-lg border border-slate-200 py-2 inline-flex items-center justify-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button className="flex-1 text-xs font-semibold rounded-lg border border-rose-100 text-rose-600 py-2 inline-flex items-center justify-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
