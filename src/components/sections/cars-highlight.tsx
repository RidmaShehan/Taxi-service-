import Link from "next/link";
import { Car, Users, Luggage } from "lucide-react";

const featuredCars = [
  {
    name: "Toyota Prius",
    type: "Hybrid Sedan",
    seats: 4,
    luggage: 3,
    price: "From $45",
    image: "🚗",
  },
  {
    name: "Toyota Hiace",
    type: "Premium Van",
    seats: 8,
    luggage: 8,
    price: "From $75",
    image: "🚌",
  },
  {
    name: "Toyota Land Cruiser",
    type: "SUV",
    seats: 6,
    luggage: 6,
    price: "From $95",
    image: "🛻",
  },
];

export function CarsHighlight() {
  return (
    <section id="fleet" className="py-16 border-t border-slate-800">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="text-amber-400 text-sm font-medium tracking-[3px] mb-3">OUR FLEET</div>
          <h2 className="text-4xl font-semibold tracking-tight text-white">Reliable Vehicles</h2>
          <p className="mt-3 text-slate-400 max-w-md">
            Modern, well-maintained vehicles for every travel need
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCars.map((car, index) => (
            <div 
              key={index}
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-amber-500/30 transition-all hover:-translate-y-1"
            >
              <div className="text-7xl mb-8 transition-transform group-hover:scale-110">{car.image}</div>
              
              <div className="font-semibold text-2xl text-white mb-1">{car.name}</div>
              <div className="text-slate-400 mb-6">{car.type}</div>

              <div className="flex justify-between text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-slate-400" />
                  <span>{car.luggage} bags</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-500">STARTING AT</div>
                  <div className="text-2xl font-semibold text-white">{car.price}</div>
                </div>
                
                <Link 
                  href="/cars" 
                  className="text-xs border border-slate-700 hover:bg-slate-800 px-6 py-3 rounded-2xl text-slate-300 hover:text-white transition-colors"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/cars" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white group"
          >
            VIEW ALL VEHICLES 
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
