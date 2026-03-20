export const siteConfig = {
  name: "LankaRide",
  description: "Reliable airport transfers and island-wide tours with professional drivers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lankaride.com",
  locale: "en-LK",
  keywords: [
    "airport taxi sri lanka",
    "colombo airport transfer",
    "private driver sri lanka",
    "lankaride",
  ],
  whatsappPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "94771234567",
  email: "hello@lankaride.com",
  phone: "+94 77 123 4567",
  address: {
    streetAddress: "Colombo",
    addressLocality: "Colombo",
    addressRegion: "Western Province",
    postalCode: "00100",
    addressCountry: "LK",
  },
} as const;
