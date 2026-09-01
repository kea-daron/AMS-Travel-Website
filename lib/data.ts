/**
 * Demo content for the marketing site. Swap these arrays for a CMS or API call
 * later — every consumer is a Server Component, so it can `await` here directly.
 */

/** Builds an Unsplash delivery URL. Host is allow-listed in `next.config.ts`. */
const photo = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const heroImage = {
  src: photo("1507525428034-b723cf961d3e", 2000),
  alt: "Pastel sunrise breaking over a quiet tropical shoreline",
};

export type Destination = {
  slug: string;
  city: string;
  country: string;
  blurb: string;
  tours: number;
  fromPrice: number;
  rating: number;
  image: string;
  alt: string;
  /** Featured cards span two columns on large screens. */
  featured?: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    blurb: "Reef-fringed bays, rice terraces and a boat waiting at sunrise.",
    tours: 24,
    fromPrice: 890,
    rating: 4.9,
    image: photo("1506929562872-bb421503ef21", 1200),
    alt: "Aerial view of wooden boats moored on a turquoise bay in Bali",
    featured: true,
  },
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    blurb: "Long lunches, small museums, the Seine at blue hour.",
    tours: 18,
    fromPrice: 640,
    rating: 4.8,
    image: photo("1502602898657-3e91760cbb34", 900),
    alt: "The Eiffel Tower above the Seine at dusk",
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "UAE",
    blurb: "Desert dunes at dawn, skyline dinners after dark.",
    tours: 15,
    fromPrice: 720,
    rating: 4.7,
    image: photo("1512453979798-5ea266f8880c", 900),
    alt: "Dubai skyline and highway interchange in golden haze",
  },
  {
    slug: "venice",
    city: "Venice",
    country: "Italy",
    blurb: "Back canals, cicchetti bars and the Rialto before the crowds.",
    tours: 12,
    fromPrice: 580,
    rating: 4.8,
    image: photo("1523906834658-6e24ef2386f9", 900),
    alt: "Gondolas on the Grand Canal in front of the Rialto Bridge",
  },
  {
    slug: "chiang-mai",
    city: "Chiang Mai",
    country: "Thailand",
    blurb: "Temple mornings, night markets and jungle waterfalls.",
    tours: 21,
    fromPrice: 510,
    rating: 4.9,
    image: photo("1528181304800-259b08848526", 900),
    alt: "Golden temple spires of Wat Chedi Luang in Chiang Mai",
  },
  {
    slug: "khumbu",
    city: "Khumbu Valley",
    country: "Nepal",
    blurb: "Teahouse trails under the biggest skyline on Earth.",
    tours: 9,
    fromPrice: 1240,
    rating: 5,
    image: photo("1544735716-392fe2489ffa", 900),
    alt: "Hilltop stupa with snow-covered Himalayan peaks behind",
  },
];

export type Package = {
  slug: string;
  title: string;
  location: string;
  summary: string;
  days: number;
  nights: number;
  groupSize: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  badge?: string;
  highlights: string[];
  image: string;
  alt: string;
};

export const packages: Package[] = [
  {
    slug: "ligurian-coast",
    title: "Ligurian Coast & Cinque Terre",
    location: "Italy",
    summary:
      "Five cliff-side villages on foot, by ferry and by the slow train, with a base in Manarola.",
    days: 8,
    nights: 7,
    groupSize: "Max 12",
    rating: 4.9,
    reviews: 214,
    price: 1890,
    oldPrice: 2150,
    badge: "Best seller",
    highlights: ["Coastal walk", "Boat day", "Wine tasting"],
    image: photo("1516483638261-f4dbaf036963", 1000),
    alt: "Pastel houses of Manarola stacked above the Ligurian sea",
  },
  {
    slug: "krabi-retreat",
    title: "Krabi Island Retreat",
    location: "Thailand",
    summary:
      "A slow week between limestone cliffs and the pool, with long-tail boats to the quieter islands.",
    days: 6,
    nights: 5,
    groupSize: "Private",
    rating: 4.8,
    reviews: 168,
    price: 1140,
    badge: "Family friendly",
    highlights: ["Beach resort", "Island hopping", "Spa day"],
    image: photo("1520250497591-112f2f40a3f4", 1000),
    alt: "Resort pool framed by palms and limestone cliffs in Krabi",
  },
  {
    slug: "dolomites-lakes",
    title: "Dolomites Lakes & Passes",
    location: "Italy",
    summary:
      "Rowboats on Lago di Braies at first light, then hut-to-hut hiking over the high passes.",
    days: 7,
    nights: 6,
    groupSize: "Max 10",
    rating: 5,
    reviews: 96,
    price: 1620,
    badge: "New for 2026",
    highlights: ["Alpine huts", "Sunrise row", "Via ferrata"],
    image: photo("1476514525535-07fb3b4ae5f1", 1000),
    alt: "Wooden rowboat on an emerald alpine lake below the Dolomites",
  },
];

export const stats = [
  { value: "92", suffix: "+", label: "Countries covered" },
  { value: "48", suffix: "K", label: "Travellers hosted" },
  { value: "4.9", suffix: "/5", label: "Average review score" },
  { value: "17", suffix: "yrs", label: "Planning trips" },
] as const;

export type Feature = {
  icon: "compass" | "shield" | "wallet" | "support";
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "compass",
    title: "Itineraries from people who went",
    body: "Every route is walked by one of our specialists before it goes on sale. If a hotel slips, we drop it.",
  },
  {
    icon: "wallet",
    title: "One price, nothing hidden",
    body: "Flights, transfers, permits and local taxes are quoted up front. No resort fees appearing at check-in.",
  },
  {
    icon: "shield",
    title: "Flexible to 30 days out",
    body: "Move your dates or swap travellers free of charge up to 30 days before departure, on any package.",
  },
  {
    icon: "support",
    title: "A real person, any time zone",
    body: "One named trip manager from booking to landing, plus a 24/7 line that a human actually answers.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  trip: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our flight into Naples was cancelled at midnight. By the time we landed the next morning the transfer, the hotel and the boat day had all been moved. We did nothing.",
    name: "Priya Raghunathan",
    trip: "Ligurian Coast, May 2026",
    rating: 5,
  },
  {
    quote:
      "Twelve people, seven days, zero queueing. The guides clearly knew every restaurant owner between Riomaggiore and Monterosso, which is the whole point of booking a trip like this.",
    name: "Tomas Lindqvist",
    trip: "Cinque Terre, April 2026",
    rating: 5,
  },
  {
    quote:
      "We travel with two under-ten kids and normally spend the holiday managing logistics. This was the first time we just showed up. The Krabi week was worth every euro.",
    name: "Chidi & Amara Okonkwo",
    trip: "Krabi Retreat, February 2026",
    rating: 5,
  },
];

export const aboutImage = {
  src: photo("1469854523086-cc02fe5d8800", 1200),
  alt: "Yellow camper van on an empty desert highway",
};

export const ctaImage = {
  src: photo("1499856871958-5b9627545d1a", 1800),
  alt: "Lamp-lit bridge over the Seine at twilight",
};
