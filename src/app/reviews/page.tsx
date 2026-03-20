"use client";

import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTABanner } from "@/components/sections/cta-banner";

const reviews = [
  {
    name: "Sarah Jenkins",
    date: "October 12, 2023",
    route: "Airport to Colombo Fort",
    text: "LankaRide made our arrival to Colombo completely stress-free. The driver was waiting with a clear sign, the car was spotless, and the AC was freezing cold—exactly what we needed!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Markus Schneider",
    date: "September 28, 2023",
    route: "Colombo to Cultural Triangle",
    text: "Booked a 3-day tour to Kandy and Sigiriya. Our driver, Nuwan, was more than just a driver—he was a fantastic guide who knew all the best local spots for food. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Elena Rodriguez",
    date: "November 5, 2023",
    route: "Airport to Cinnamon Grand",
    text: "Very professional service. I use them for all my business trips to Sri Lanka. They are always on time, which is the most important thing for me.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "David & Emma",
    date: "October 20, 2023",
    route: "Airport to Hikkaduwa",
    text: "Excellent communication via WhatsApp. Our flight was delayed by 3 hours but the driver was still there with a smile. The van was very spacious for all our surfboards.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Liam O'Connor",
    date: "August 15, 2023",
    route: "Negombo to Ella",
    text: "The safest I've felt in a car in Sri Lanka! Driving here can be hectic, but our driver was calm and very skilled. The price was also very fair compared to hotel taxis.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Aiko Tanaka",
    date: "July 22, 2023",
    route: "Airport to Galle Fort",
    text: "Superb experience! The booking process was so simple on the website. I received a confirmation almost immediately. 5 stars all the way!",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg"
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <MarketingHeader />
      
      <main className="pb-20">
        {/* Header */}
        <div className="bg-[#f4f9ff] pt-20 pb-24 border-b border-blue-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              What Our Travelers Say
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Real stories from people who explored the beauty of Sri Lanka with LankaRide. Your comfort and safety are our highest priorities.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-12">
          {/* Stats Bar */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-12 flex flex-wrap justify-between items-center gap-8 divide-x divide-slate-100">
            <div className="flex-1 text-center">
              <div className="flex justify-center text-amber-400 mb-2">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-2xl font-bold text-slate-900">4.9/5</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Average Rating</div>
            </div>
            <div className="flex-1 text-center pl-8">
              <div className="flex justify-center text-[#1e90ff] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div className="text-2xl font-bold text-slate-900">2,500+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Happy Travelers</div>
            </div>
            <div className="flex-1 text-center pl-8">
              <div className="flex justify-center text-[#1e90ff] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Recommendation</div>
            </div>
            <div className="flex-1 text-center pl-8">
              <div className="flex justify-center text-[#1e90ff] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="text-2xl font-bold text-slate-900">1,800+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Verified Reviews</div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <svg className="w-6 h-6 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed italic mb-8 flex-1">
                  "{review.text}"
                </p>

                <div className="bg-blue-50/50 rounded-lg p-3 mb-6 flex items-center gap-2 text-xs font-medium text-[#1e90ff]">
                  <MapPin className="w-3.5 h-3.5" />
                  {review.route}
                </div>
                
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-sm text-slate-900">{review.name}</div>
                    <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-sm font-medium text-slate-600 mb-16">
            Follow our journeys on Instagram <a href="#" className="text-[#1e90ff] hover:underline">@LankaRideTravels</a>
          </div>

        </div>
        
        {/* Reusing the exact CTA banner from the design */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1e90ff] rounded-[2rem] py-16 px-8 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to write your own travel story?
            </h2>
            <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of satisfied travelers and book your reliable Sri Lankan airport transfer or tour today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/booking"
                className="bg-white text-[#1e90ff] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Book Your Ride Now
              </Link>
              <Link
                href="/fleet"
                className="bg-[#1e90ff] border border-blue-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors"
              >
                Explore Our Fleet
              </Link>
            </div>
          </div>
        </div>

      </main>

      <MarketingFooter />
    </div>
  );
}
