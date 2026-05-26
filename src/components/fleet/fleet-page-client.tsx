"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShieldCheck, Sparkles, UserCheck, Users, Luggage, Snowflake, Info } from "lucide-react";
import { DbImage, ImageFrame } from "@/components/ui/db-image";
import type { CarRow } from "@/types/database.types";

const filters = ["All", "Sedan", "SUV", "Van", "Premium"];

type Props = { cars: CarRow[] };

export function FleetPageClient({ cars }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? cars
      : cars.filter((c) => c.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <main className="pb-24 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <div className="text-[#1e90ff] text-xs font-bold tracking-widest uppercase mb-4">Premium Fleet</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Our Fleet</h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover our wide range of vehicles meticulously maintained to ensure your comfort and safety across Sri Lanka.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Safety First", text: "All vehicles undergo regular safety inspections." },
              { icon: Sparkles, title: "Regular Cleaning", text: "Sanitized interiors before every pickup." },
              { icon: UserCheck, title: "English Drivers", text: "Experienced chauffeurs with excellent communication." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-[#f4f9ff] rounded-2xl p-6 flex items-start gap-4 border border-blue-50">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1e90ff] shadow-sm flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap px-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === activeFilter ? "bg-[#1e90ff] text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Available Vehicles <span className="text-[#1e90ff]">({filtered.length})</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Info className="w-4 h-4" />
              All prices include driver and insurance
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No vehicles in this category yet. Check back soon or <Link href="/contact" className="text-[#1e90ff] font-semibold">contact us</Link>.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {filtered.map((vehicle) => (
                <div key={vehicle.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
                  <ImageFrame className="h-56">
                    <div className="absolute top-4 left-4 bg-[#1e90ff] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                      {vehicle.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg z-10 flex flex-col items-end">
                      <span className="text-[10px] text-slate-300 font-normal">Starting from</span>
                      ${vehicle.price_per_ride}
                    </div>
                    {vehicle.image_url ? (
                      <DbImage src={vehicle.image_url} alt={vehicle.name} fill />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl">🚗</div>
                    )}
                  </ImageFrame>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{vehicle.name}</h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                      {vehicle.description ?? "Comfortable and reliable transport."}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6 border-t border-b border-slate-100 py-4">
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-600">
                        <Users className="w-5 h-5 text-[#1e90ff]" />
                        <span className="text-xs font-medium">{vehicle.seats} Seats</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-600 border-l border-r border-slate-100">
                        <Luggage className="w-5 h-5 text-[#1e90ff]" />
                        <span className="text-xs font-medium">{vehicle.luggage} Bags</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-600">
                        <Snowflake className="w-5 h-5 text-[#1e90ff]" />
                        <span className="text-xs font-medium">Full A/C</span>
                      </div>
                    </div>

                    <Link
                      href="/booking"
                      className="block w-full text-center py-3.5 bg-[#1e90ff] hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-colors"
                    >
                      Book This Vehicle →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#f4f9ff] rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Need a Custom Travel Package?</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Planning a multi-day tour or need a vehicle for a corporate event? Our team can provide a tailored quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-[#1e90ff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold text-center transition-colors">
                  Contact Our Team
                </Link>
                <Link href="/reviews" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3.5 rounded-xl text-sm font-bold text-center transition-colors">
                  Read Our Reviews
                </Link>
              </div>
            </div>
            <div className="w-full md:w-5/12 h-64 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=1000"
                alt="Sri Lanka landscape"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
    </main>
  );
}
