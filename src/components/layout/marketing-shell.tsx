import { ensureSiteAvailable } from "@/lib/check-maintenance";
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
      <MarketingHeader settings={settings} />
      {children}
      <MarketingFooter settings={settings} />
      {showWhatsapp && <WhatsappButton settings={settings} />}
    </>
  );
}

export type { SiteSettings };
