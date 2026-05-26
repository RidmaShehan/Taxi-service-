import { MarketingShell } from "@/components/layout/marketing-shell";
import { ContactContent } from "@/app/contact/contact-content";
import { ensureSiteAvailable } from "@/lib/check-maintenance";

export default async function ContactPage() {
  const settings = await ensureSiteAvailable();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <MarketingShell>
        <ContactContent settings={settings} />
      </MarketingShell>
    </div>
  );
}
