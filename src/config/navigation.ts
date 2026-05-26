import { siteConfig } from "./site";

export const marketingNav = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/fleet", label: "Fleet" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/manage-drivers", label: "Drivers" },
  { href: "/admin/gallery-view", label: "Gallery" },
] as const;

export { siteConfig };
