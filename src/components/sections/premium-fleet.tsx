import Link from "next/link";
import { Users, Luggage, Snowflake, Star } from "lucide-react";
import { DbImage } from "@/components/ui/db-image";
import type { CarRow } from "@/types/database.types";

type Props = { cars: CarRow[] };

export function PremiumFleet({ cars }: Props) {
  if (cars.length === 0) {
    return (
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Premium Fleet</h2>
          <p className="text-sm">Fleet information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Our Premium Fleet</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Choose from our range of meticulously maintained vehicles, all equipped with modern amenities for a refreshing journey.
            </p>
          </div>
          <Link href="/fleet" className="text-sm font-semibold text-slate-600 hover:text-[#1e90ff] flex items-center gap-2 whitespace-nowrap">
            View All Vehicles <span>→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
              <div className="relative h-64 bg-slate-50 p-6 flex items-center justify-center">
                {car.featured && (
                  <div className="absolute top-4 left-4 bg-[#1e90ff] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                    Featured
                  </div>
                )}
                {car.image_url ? (
                  <DbImage
                    src={car.image_url}
                    alt={car.name}
                    width={400}
                    height={250}
                    className="object-contain mix-blend-multiply drop-shadow-xl"
                  />
                ) : (
                  <div className="text-4xl">🚗</div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg text-slate-900">{car.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#1e90ff]">
                    <Star className="w-4 h-4 fill-current" />
                    {car.category}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-medium text-slate-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {car.seats} Seats
                  </div>
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4" />
                    {car.luggage} Bags
                  </div>
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-4 h-4" />
                    A/C
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#1e90ff] mb-4">From ${car.price_per_ride} / ride</p>

                <div className="mt-auto">
                  <Link
                    href="/booking"
                    className="block w-full text-center bg-[#1e90ff] hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Book This Car
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
