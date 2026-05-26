import { Hero } from "@/components/sections/hero";
import { SearchBar } from "@/components/sections/search-bar";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Stats } from "@/components/sections/stats";
import { PremiumFleet } from "@/components/sections/premium-fleet";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { getCars } from "@/lib/actions/cars";
import { getTestimonials } from "@/lib/actions/testimonials";
import { ensureSiteAvailable } from "@/lib/check-maintenance";

export default async function Home() {
  const settings = await ensureSiteAvailable();
  const [featuredCars, testimonials] = await Promise.all([
    getCars({ featured: true }),
    getTestimonials(3),
  ]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MarketingShell>
        <main>
          <Hero settings={settings} />
          <SearchBar />
          <TrustBadges />
          <Stats settings={settings} />
          <PremiumFleet cars={featuredCars} />
          <TestimonialsSection testimonials={testimonials} />
          <CTABanner settings={settings} />
        </main>
      </MarketingShell>
    </div>
  );
}
