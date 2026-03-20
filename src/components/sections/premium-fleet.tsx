import Link from "next/link";
import Image from "next/image";
import { Users, Luggage, Snowflake, Star } from "lucide-react";

const fleet = [
  {
    name: "Premium Sedan (Toyota Prius)",
    badge: "Most Popular",
    rating: "5.0",
    seats: 4,
    bags: 3,
    ac: true,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800",
  },
  {
    name: "Luxury Van (Toyota HiAce)",
    badge: "Ideal for Groups",
    rating: "4.9",
    seats: 10,
    bags: 10,
    ac: true,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
  },
];

export function PremiumFleet() {
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
          {fleet.map((car, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
              <div className="relative h-64 bg-slate-50 p-6 flex items-center justify-center">
                <div className="absolute top-4 left-4 bg-[#1e90ff] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  {car.badge}
                </div>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={250}
                  className="object-contain mix-blend-multiply drop-shadow-xl"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg text-slate-900">{car.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#1e90ff]">
                    <Star className="w-4 h-4 fill-current" />
                    {car.rating}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-xs font-medium text-slate-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {car.seats} Seats
                  </div>
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4" />
                    {car.bags} Bags
                  </div>
                  {car.ac && (
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4" />
                      A/C
                    </div>
                  )}
                </div>

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
