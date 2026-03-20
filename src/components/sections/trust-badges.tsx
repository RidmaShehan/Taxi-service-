import { Clock, ShieldCheck, Tag } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">24/7 Availability</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[250px]">
              Any time, day or night. We're ready for your arrival or departure.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Safe & Licensed</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[250px]">
              Our drivers are fully vetted and our fleet is strictly maintained.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#1e90ff] mb-6">
              <Tag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Fixed Pricing</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[250px]">
              No hidden charges or surge pricing. Know your fare upfront.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
