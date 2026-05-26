import { getCars } from "@/lib/actions/cars";
import { getTestimonials } from "@/lib/actions/testimonials";
import { PublicBookingForm } from "@/components/booking/public-booking-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { ensureSiteAvailable } from "@/lib/check-maintenance";

export default async function BookingPage() {
  const settings = await ensureSiteAvailable();
  const [cars, testimonials] = await Promise.all([
    getCars({ excludeMaintenance: true }),
    getTestimonials(1),
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <MarketingShell>
        <PublicBookingForm
          cars={cars}
          settings={settings}
          sidebarTestimonial={testimonials[0] ?? null}
        />
      </MarketingShell>
    </div>
  );
}
