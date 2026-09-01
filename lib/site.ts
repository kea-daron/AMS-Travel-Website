export const site = {
  name: "AMS Travel",
  tagline: "Journeys worth the jet lag.",
  description:
    "AMS Travel designs small-group tours, island escapes and tailor-made itineraries to 90+ countries, planned end to end by people who have actually been there.",
  phone: "+1 (415) 555-0142",
  email: "hello@amstravel.com",
  address: "218 Harbour Lane, Suite 40, Amsterdam, NL",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Why us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
] as const;

export const footerNav = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "#why-us" },
      { label: "Our travel experts", href: "#why-us" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Travel journal", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Popular destinations", href: "#destinations" },
      { label: "Tour packages", href: "#packages" },
      { label: "Island escapes", href: "#packages" },
      { label: "Group tours", href: "#packages" },
      { label: "Gift cards", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "#contact" },
      { label: "Booking terms", href: "#" },
      { label: "Travel insurance", href: "#" },
      { label: "Visa guidance", href: "#" },
      { label: "Cancellation policy", href: "#" },
    ],
  },
] as const;
