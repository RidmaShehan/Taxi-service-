import type { SiteSettings } from "@/types/site-settings";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 1,
  site_name: "LankaRide",
  site_description:
    "Reliable airport transfers and island-wide tours with professional drivers.",
  meta_title: "Colombo Airport Taxi",
  meta_keywords:
    "airport taxi sri lanka, colombo airport transfer, private driver sri lanka, lankaride",
  meta_robots: "index, follow",
  canonical_url: null,
  og_title: "Colombo Airport Taxi | LankaRide",
  og_description:
    "Reliable airport transfers and island-wide tours with professional drivers in Sri Lanka.",
  og_image_url: null,
  logo_url: null,
  favicon_url: null,
  phone: "+94 77 123 4567",
  email: "hello@lankaride.com",
  whatsapp_phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "94771234567",
  address_street: "No. 124/A, Airport Road",
  address_locality: "Katunayake",
  address_region: "Western Province",
  postal_code: "11450",
  address_country: "Sri Lanka",
  address_display: "No. 124/A, Airport Road, Katunayake, Sri Lanka",
  contact_page_title: "Get in Touch for Your Next Journey",
  contact_page_subtitle:
    "Whether you are arriving at Bandaranaike International Airport or planning a scenic tour across Sri Lanka, our team is ready to assist you.",
  contact_hub_title: "Main Service Hub",
  map_embed_url: null,
  map_link_url: "https://maps.google.com/?q=Bandaranaike+International+Airport",
  hours_airport: "24 / 7",
  hours_office: "8:00 AM - 10:00 PM",
  hours_response: "~5 Minutes",
  hero_badge: "#1 Airport Taxi in Sri Lanka",
  hero_title: "Reliable Airport\nTaxi Service",
  hero_subtitle:
    "Experience comfort and punctuality. Premium private transport for tourists and professionals across Sri Lanka.",
  hero_image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070",
  hero_travelers_label: "2,500+ Happy Travelers",
  stat_1_value: "4.98",
  stat_1_label: "Average Rating",
  stat_2_value: "1,284",
  stat_2_label: "Happy Customers",
  stat_3_value: "98%",
  stat_3_label: "On-time Rate",
  stat_4_value: "12k+",
  stat_4_label: "Rides Completed",
  footer_description:
    "Premium private transport services across Sri Lanka. Reliable, safe, and professional drivers for all your travel needs.",
  cta_title: "Ready to Start Your Journey?",
  cta_subtitle:
    "Book your private airport transfer or customized tour today and travel with the most trusted taxi service in Sri Lanka.",
  facebook_url: null,
  twitter_url: null,
  instagram_url: null,
  maintenance_mode: false,
  maintenance_message:
    "We are performing scheduled maintenance. Please check back soon or contact us on WhatsApp.",
  updated_at: new Date().toISOString(),
};

export function formatAddress(settings: SiteSettings): string {
  if (settings.address_display?.trim()) return settings.address_display.trim();
  return [
    settings.address_street,
    settings.address_locality,
    settings.address_region,
    settings.postal_code,
    settings.address_country,
  ]
    .filter(Boolean)
    .join(", ");
}
