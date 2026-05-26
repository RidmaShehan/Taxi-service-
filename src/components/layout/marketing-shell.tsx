import { ensureSiteAvailable } from "@/lib/check-maintenance";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import type { SiteSettings } from "@/types/site-settings";

type Props = {
  children: React.ReactNode;
  showWhatsapp?: boolean;
};

export async function MarketingShell({ children, showWhatsapp = true }: Props) {
  const settings = await ensureSiteAvailable();

  return (
    <>
      <CookieConsent />
      <VisitorTracker />
      <MarketingHeader settings={settings} />
      {children}
      <MarketingFooter settings={settings} />
      {showWhatsapp && <WhatsappButton settings={settings} />}
    </>
  );
}

export type { SiteSettings };
