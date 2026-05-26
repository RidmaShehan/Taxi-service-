"use client";

import { MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/types/site-settings";

type Props = { settings: SiteSettings };

export function WhatsappButton({ settings }: Props) {
  const whatsappUrl = `https://wa.me/${settings.whatsapp_phone}?text=Hi,%20I%20would%20like%20to%20book%20an%20airport%20taxi.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] transition-all hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
