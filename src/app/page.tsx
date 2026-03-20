import { Hero } from "@/components/sections/hero";
import { SearchBar } from "@/components/sections/search-bar";
import { TrustBadges } from "@/components/sections/trust-badges";
import { PremiumFleet } from "@/components/sections/premium-fleet";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MarketingHeader />
      
      <main>
        <Hero />
        <SearchBar />
        <TrustBadges />
        <PremiumFleet />
        <TestimonialsSection />
        <CTABanner />
      </main>

      <MarketingFooter />
    </div>
  );
}
