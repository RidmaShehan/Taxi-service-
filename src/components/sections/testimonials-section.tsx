import { Star } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "David Miller",
    location: "United Kingdom",
    rating: 5,
    text: "Best airport taxi service I've ever used. The driver was waiting with a clear sign and the car was spotless. Highly recommend LankaRide!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sophie Chen",
    location: "Singapore",
    rating: 5,
    text: "Safe, comfortable, and very polite driver. Our tour through the Hill Country was magical thanks to this stress-free transport.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Mark Weber",
    location: "Germany",
    rating: 5,
    text: "Excellent communication via WhatsApp. The fixed pricing is great for peace of mind. Will definitely book again next year!",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg"
  }
];

export function TestimonialsSection() {
  return (
    <div className="py-24 bg-[#f4f9ff]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">What Our Travelers Say</h2>
          <p className="text-slate-600 text-sm">
            Over 5,000 satisfied customers have trusted us for their Sri Lankan adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex text-amber-400 mb-6">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-[11px] font-medium text-slate-500">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/reviews" className="text-sm font-semibold text-slate-600 hover:text-[#1e90ff] flex items-center justify-center gap-2">
            Read More Reviews <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
