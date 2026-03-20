import Link from "next/link";

export function CTABanner() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#1e90ff] rounded-[2rem] py-16 px-8 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Book your private airport transfer or customized tour today and travel with the most trusted taxi service in Sri Lanka.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/booking"
              className="bg-white text-[#1e90ff] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Book Your Ride Now
            </Link>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1e90ff] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
