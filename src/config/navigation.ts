import { siteConfig } from "./site";

export const marketingNav = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const adminNav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/cars", label: "Cars" },
  { href: "/dashboard/testimonials", label: "Testimonials" },
  { href: "/dashboard/reviews", label: "Reviews" },
] as const;
