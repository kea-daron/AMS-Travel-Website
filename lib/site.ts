export const site = {
  name: "AMS Travel",
  tagline: "Discover Cambodia's hidden gems.",
  description:
    "Cambodia by tourism region, interest, province, and curated corridor — with verified destination details and trusted local contacts.",
  phone: "+1 (415) 555-0142",
  email: "hello@amstravel.com",
  address: "218 Harbour Lane, Suite 40, Amsterdam, NL",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Map", href: "/map" },
  { label: "Saved", href: "/saved" },
] as const;

export const languages = [
  { code: "en", short: "EN", label: "English" },
  { code: "km", short: "ខ្មែរ", label: "Khmer" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const footerNav = [
  {
    title: "Regions",
    links: [
      { label: "Ancient Capitals & Khmer Civilization", href: "/explore" },
      { label: "Northeastern Civilization", href: "/explore" },
      { label: "Mekong & Tonle Sap Civilization", href: "/explore" },
      { label: "Mountain & Waterfall Region", href: "/explore" },
    ],
  },
  {
    title: "Interests",
    links: [
      { label: "Ancient Cities", href: "/explore/interests" },
      { label: "Temples", href: "/explore/interests" },
      { label: "Archaeological Sites", href: "/explore/interests" },
      { label: "Museums", href: "/explore/interests" },
    ],
  },
  {
    title: "Corridors",
    links: [
      { label: "Khmer Civilization", href: "/explore/corridors" },
      { label: "Mekong Civilization", href: "/explore/corridors" },
      { label: "Coastal Discovery", href: "/explore/corridors" },
      { label: "Mountain Adventure", href: "/explore/corridors" },
    ],
  },
] as const;
