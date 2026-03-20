"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, PhoneCall, Mail, Clock, MapPin, Globe, Zap, ChevronDown } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { useState } from "react";

const faqs = [
  {
    q: "How do I meet my driver at the airport?",
    a: "Your driver will wait at the arrival lobby with a name board clearly displaying your name. We track your flight number in real-time to ensure they are there even if your flight is delayed."
  },
  {
    q: "What is the cancellation policy?",
    a: "We offer free cancellation up to 12 hours before your scheduled pickup time."
  },
  {
    q: "Do you provide child seats?",
    a: "Yes, child seats are available upon request. Please mention this requirement when booking."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <MarketingHeader />
      
      <main className="pb-20">
        {/* Header */}
        <div className="bg-[#f4f9ff] pt-16 pb-24 border-b border-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-block border border-blue-200 text-[#1e90ff] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 bg-white">
                Contact Us
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Get in Touch for Your <span className="text-[#1e90ff]">Next Journey</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether you're arriving at Bandaranaike International Airport or planning a scenic tour across Sri Lanka, our team is ready to assist you. Experience reliable travel with professional drivers.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-12">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column - Contact Methods */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* WhatsApp Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#25D366] mb-6">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">WhatsApp Chat</h3>
                  <div className="text-xl font-bold text-slate-900 mb-3">+94 77 123 4567</div>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">Fastest way to book or ask questions. Our dispatch team is online 24/7.</p>
                  <a href="https://wa.me/94771234567" className="block w-full text-center bg-[#25D366] hover:bg-green-600 text-white py-3.5 rounded-xl text-sm font-bold transition-colors">
                    Chat on WhatsApp &gt;
                  </a>
                </div>

                {/* Direct Call Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1e90ff] mb-6">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Direct Call</h3>
                  <div className="text-xl font-bold text-slate-900 mb-3">+94 77 123 4567</div>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">Prefer to speak with us? Give us a call anytime for immediate assistance.</p>
                  <a href="tel:+94771234567" className="block w-full text-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-xl text-sm font-bold transition-colors">
                    Call Now &gt;
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1e90ff] mb-6">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Email Support</h3>
                  <div className="text-lg font-bold text-slate-900 mb-3">hello@lankaride.lk</div>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">For corporate bookings, long-term rentals, or detailed tour inquiries.</p>
                  <a href="mailto:hello@lankaride.lk" className="block w-full text-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-xl text-sm font-bold transition-colors">
                    Send an Email &gt;
                  </a>
                </div>

                {/* Operating Hours */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-8">
                    <Clock className="w-5 h-5 text-[#1e90ff]" />
                    <h3 className="font-bold text-slate-900">Operating Hours</h3>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                      <span className="text-slate-500">Airport Pickups</span>
                      <span className="font-bold text-slate-900">24 / 7</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                      <span className="text-slate-500">Office Support</span>
                      <span className="font-bold text-slate-900">8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Response Time</span>
                      <span className="font-bold text-slate-900">~5 Minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff]">
                    <span className="font-bold">?</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-center py-2 text-left"
                      >
                        <span className="font-bold text-slate-900 text-sm">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="pt-2 pb-4 text-sm text-slate-500 leading-relaxed pr-8">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Map & Booking */}
            <div className="lg:col-span-5 space-y-6">
              {/* Map Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
                <div className="h-64 bg-slate-200 relative">
                  {/* Placeholder for map image to match design */}
                  <Image 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" 
                    alt="Map" 
                    fill 
                    className="object-cover opacity-50 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-slate-900/10"></div>
                  <div className="absolute top-6 left-6 text-2xl font-bold text-white drop-shadow-md">Colombo</div>
                  
                  {/* Map Pin */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6 relative -mt-12 mx-6 bg-white rounded-2xl shadow-lg border border-slate-100 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e90ff] flex items-center justify-center text-white flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Main Service Hub</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        No. 124/A, Airport Road, Katunayake, Sri Lanka
                      </p>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">24/7 Service</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Airport Pickups</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                  <Globe className="w-6 h-6 text-[#1e90ff] mx-auto mb-3" />
                  <div className="text-xs font-bold text-slate-900">Island-wide Coverage</div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                  <Zap className="w-6 h-6 text-[#1e90ff] mx-auto mb-3" />
                  <div className="text-xs font-bold text-slate-900">Instant Confirmation</div>
                </div>
              </div>

              {/* Ready to Book */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-[#1e90ff] font-bold text-sm mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.19v6.72zm14 0v-6.72l-6 3.39v6.71l6-3.38z"/></svg>
                  Ready to Book?
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Don't wait! Secure your comfortable ride across the paradise island today.
                </p>
                <Link href="/booking" className="block w-full text-center bg-[#1e90ff] hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold transition-colors">
                  Go to Booking Page
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Black Banner */}
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="bg-slate-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Plan your custom tour with us</h3>
              <p className="text-slate-400 text-sm">Tailor-made itineraries for groups and solo travelers alike.</p>
            </div>
            <Link href="/contact" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
              Request a Quote
            </Link>
          </div>
        </div>

      </main>

      <MarketingFooter />
    </div>
  );
}
