import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1e90ff] text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
            #1 Airport Taxi in Sri Lanka
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
            Reliable Airport<br />Taxi Service
          </h1>

          <p className="text-slate-600 text-lg max-w-md leading-relaxed">
            Experience comfort and punctuality. Premium private transport for tourists and professionals across Sri Lanka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/booking"
              className="bg-[#1e90ff] hover:bg-blue-600 transition-colors text-white px-8 py-3.5 rounded-lg text-sm font-medium text-center"
            >
              Book Now
            </Link>
            
            <Link
              href="/fleet"
              className="border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 px-8 py-3.5 rounded-lg text-sm font-medium text-center"
            >
              Explore Fleet
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber-400 mb-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-medium text-slate-600">
                <span className="font-bold text-slate-900">2,500+</span> Happy Travelers
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070" 
              alt="Premium Airport Taxi" 
              width={800}
              height={500}
              className="w-full object-cover aspect-[4/3]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
