/**
 * Demo content for the marketing site. Swap these arrays for a CMS or API call
 * later — every consumer is a Server Component, so it can `await` here directly.
 */

/** Builds an Unsplash delivery URL. Host is allow-listed in `next.config.ts`. */
export const photo = (id: string, w: number) =>
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
  icon: "compass" | "shield" | "map" | "bookmark";
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "compass",
    title: "Checked on the ground",
    body: "Every site, stay and kitchen is visited before it goes on the map, then looked at again each season. If a place closes, it comes off.",
  },
  {
    icon: "shield",
    title: "Details that hold up at the gate",
    body: "Entry fees, opening hours, ticket rules and road conditions written as you will actually find them — not copied from a brochure.",
  },
  {
    icon: "map",
    title: "Maps that work offline",
    body: "Every province, corridor and site is mapped, so the route still opens when the signal drops somewhere past Sen Monorom.",
  },
  {
    icon: "bookmark",
    title: "Trusted local contacts",
    body: "Guides, boat owners and homestay families we have met in person, with numbers that get answered in Khmer or English.",
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
      "The listing warned that the Preah Vihear access road turns to mud after heavy rain and gave a number for a driver who does it anyway. Both turned out to be exactly right.",
    name: "Sophea Chan",
    trip: "Preah Vihear & Koh Ker, August 2026",
    rating: 5,
  },
  {
    quote:
      "We planned four provinces in ten days off this site alone. Ferry times to Koh Rong Sanloem were correct to the minute, which is not something I expected.",
    name: "Marta Nowak",
    trip: "Kampot to the islands, February 2026",
    rating: 5,
  },
  {
    quote:
      "Saved a dozen places before we flew, then had the whole Mondulkiri list offline when the signal went. The Bunong homestay was the best night of the trip.",
    name: "Daniel Okoye",
    trip: "Mondulkiri highlands, July 2026",
    rating: 5,
  },
];

export const aboutImage = {
  src: photo("1599283787923-51b965a58b05", 1200),
  alt: "Visitors walking the stone causeway towards Angkor Wat",
};

export const authImage = {
  src: photo("1566706546199-a93ba33ce9f7", 1400),
  alt: "The towers of Angkor Wat behind still water at first light",
};

export const ctaImage = {
  src: photo("1504639650150-bf773680d8c3", 1800),
  alt: "Temple towers and palms silhouetted against a Cambodian sky",
};

/* ------------------------------------------------------------------ *
 * Discover taxonomy
 *
 * The provinces and tourism regions are the real taxonomy. The specialty and
 * category vocabularies are still stand-ins — replace them once the official
 * Ministry of Tourism lists are available.
 * ------------------------------------------------------------------ */

export type TourismRegion = {
  slug: string;
  name: string;
  /** Placeholder card copy — rewrite with the official region descriptions. */
  blurb: string;
  /**
   * Cambodian stock photography from Unsplash. To use your own shots instead,
   * drop files into `public/regions/` and point at `/regions/<slug>.jpg`.
   */
  image: string;
  alt: string;
  icon:
    | "temple"
    | "compass"
    | "water"
    | "mountain"
    | "palm"
    | "moon"
    | "utensils"
    | "leaf"
    | "diamond";
};

export const tourismRegions: TourismRegion[] = [
  {
    slug: "ancient-capitals",
    name: "Ancient Capitals & Khmer Civilization Region",
    blurb:
      "Angkor, Sambor Prei Kuk and the royal capitals that came before them — temple complexes, inscriptions and the long arc of Khmer statecraft.",
    image: photo("1599283787923-51b965a58b05", 900),
    alt: "Visitors on the stone causeway leading to Angkor Wat",
    icon: "temple",
  },
  {
    slug: "northeastern-civilization",
    name: "Northeastern Civilization",
    blurb:
      "Highland provinces where indigenous communities, crater lakes and forest trails sit well off the temple trail.",
    image: photo("1667371026114-f4ea09440d40", 900),
    alt: "Forested hills and open sky over the Mondulkiri plateau",
    icon: "compass",
  },
  {
    slug: "mekong-tonle-sap",
    name: "Mekong & Tonle Sap Civilization",
    blurb:
      "Life shaped by water — floating villages, flooded forest, river dolphins and the lake that reverses its flow each year.",
    image: photo("1704103259506-6c0ca4d6dca4", 900),
    alt: "Stilted houses of a floating village on the Tonle Sap",
    icon: "water",
  },
  {
    slug: "mountain-waterfall",
    name: "Mountain & Waterfall Region",
    blurb:
      "Cardamom ridgelines, cool plateau air and the cascades that run hardest at the tail end of the rains.",
    image: photo("1656554848715-dc195c7484bb", 900),
    alt: "A waterfall dropping through dense Cambodian forest",
    icon: "mountain",
  },
  {
    slug: "coastal-island",
    name: "Coastal & Island Region",
    blurb:
      "The Gulf of Thailand coastline: fishing ports, mangrove estuaries and islands a short boat ride offshore.",
    image: photo("1616421310226-7453165b353e", 900),
    alt: "Palms leaning over an empty beach on Koh Rong",
    icon: "palm",
  },
  {
    slug: "urban-nightlife",
    name: "Urban Lifestyle & Nightlife",
    blurb:
      "City rhythms after dark — rooftop bars, riverside markets, live music and kitchens that stay open late.",
    image: photo("1711271314001-9654dc5d5e0a", 900),
    alt: "Phnom Penh towers lit up after dark",
    icon: "moon",
  },
  {
    slug: "khmer-culinary",
    name: "Khmer Culinary Region",
    blurb:
      "Where the eating is the itinerary: prahok and Kampot pepper, market breakfasts, home kitchens and producer visits.",
    image: photo("1787736366638-82155215ab11", 900),
    alt: "Diners gathered around a Cambodian street food cart",
    icon: "utensils",
  },
  {
    slug: "eco-community",
    name: "Eco-Community Tourism",
    blurb:
      "Homestays, community forests and locally run enterprises where the money from your trip stays in the village.",
    image: photo("1638402828376-5762cb098099", 900),
    alt: "Villagers walking a path across bright green paddy fields",
    icon: "leaf",
  },
  {
    slug: "luxury",
    name: "Luxury Tourism",
    blurb:
      "Boutique retreats, private guides and the slower, quieter version of every route above.",
    image: photo("1534009502677-4e5080efa8c6", 900),
    alt: "Poolside cabana and umbrellas at a tropical resort",
    icon: "diamond",
  },
];

export const regionSpecialties = [
  "Temples & heritage",
  "Beaches & islands",
  "Nature & wildlife",
  "Food & markets",
  "Culture & crafts",
  "Rivers & waterfalls",
  "Trekking & adventure",
  "Community ecotourism",
] as const;

export type Province = {
  slug: string;
  name: string;
  /** One real draw per province, used on the browse tiles. */
  highlight: string;
  /**
   * Cambodian stock photography. Alt text describes what the photo shows
   * rather than asserting it was taken in this province — several are
   * representative scenery, not province-specific. Swap for owned imagery.
   */
  image: string;
  alt: string;
};

export const provinces: Province[] = [
  {
    slug: "banteay-meanchey",
    name: "Banteay Meanchey",
    highlight: "Banteay Chhmar temple and the Thai border crossing",
    image: photo("1540525080980-b97c4be3c779", 400),
    alt: "Timber propped against weathered temple ruins",
  },
  {
    slug: "battambang",
    name: "Battambang",
    highlight: "Bamboo train, bat caves and colonial shophouses",
    image: photo("1654524786721-9990d1d64cf1", 400),
    alt: "A yellow shophouse with blue shutters and a tiled roof",
  },
  {
    slug: "kampong-cham",
    name: "Kampong Cham",
    highlight: "The bamboo bridge and Wat Nokor",
    image: photo("1700155024603-771638efc72f", 400),
    alt: "Aerial view of a leafy Cambodian town",
  },
  {
    slug: "kampong-chhnang",
    name: "Kampong Chhnang",
    highlight: "Pottery villages and floating homes",
    image: photo("1632496515914-da284239a1fd", 400),
    alt: "A woman standing at the stern of a wooden boat",
  },
  {
    slug: "kampong-speu",
    name: "Kampong Speu",
    highlight: "Kirirom pine forest and palm sugar",
    image: photo("1653714802676-6a50c7ead70e", 400),
    alt: "A small village clearing surrounded by jungle",
  },
  {
    slug: "kampong-thom",
    name: "Kampong Thom",
    highlight: "Sambor Prei Kuk, older than Angkor",
    image: photo("1651650191726-d81c3a84bb25", 400),
    alt: "A brick temple tower overgrown with plants",
  },
  {
    slug: "kampot",
    name: "Kampot",
    highlight: "Pepper farms, river sunsets and Bokor hill",
    image: photo("1661487906939-aea1f059b84f", 400),
    alt: "Moored boats on a river with hills behind",
  },
  {
    slug: "kandal",
    name: "Kandal",
    highlight: "Silk Island and the Mekong ferries",
    image: photo("1720720580439-88d83c710415", 400),
    alt: "A man seated in a boat on a wide river",
  },
  {
    slug: "kep",
    name: "Kep",
    highlight: "The crab market and seaside villa ruins",
    image: photo("1595781723824-9213a40e3257", 400),
    alt: "A wooden pier running out over the sea",
  },
  {
    slug: "koh-kong",
    name: "Koh Kong",
    highlight: "Cardamom rainforest and mangrove estuaries",
    image: photo("1740724873371-0c05a17fa819", 400),
    alt: "A river winding through dense green forest",
  },
  {
    slug: "kratie",
    name: "Kratié",
    highlight: "Irrawaddy dolphins on the Mekong",
    image: photo("1715520019930-b677fdca474d", 400),
    alt: "A blue fishing boat on a broad calm river",
  },
  {
    slug: "mondulkiri",
    name: "Mondulkiri",
    highlight: "Bou Sra falls and elephant sanctuaries",
    image: photo("1667371026139-57d7d81918de", 400),
    alt: "A wooden footbridge crossing high forest",
  },
  {
    slug: "oddar-meanchey",
    name: "Oddar Meanchey",
    highlight: "Remote border temples and forest tracks",
    image: photo("1667118891614-b0820e960b7b", 400),
    alt: "A dirt path crossing open grassland",
  },
  {
    slug: "pailin",
    name: "Pailin",
    highlight: "Gem-mining hills below Wat Phnom Yat",
    image: photo("1575735003097-b786f5b0463b", 400),
    alt: "A forested mountain under heavy cloud",
  },
  {
    slug: "phnom-penh",
    name: "Phnom Penh",
    highlight: "Royal Palace, museums and the riverside",
    image: photo("1652802725832-67d5be09e5e3", 400),
    alt: "A lit city skyline along a river at night",
  },
  {
    slug: "preah-sihanouk",
    name: "Preah Sihanouk",
    highlight: "Gateway to Koh Rong and the islands",
    image: photo("1657027538728-0d4db32d87da", 400),
    alt: "Palms leaning over shallow turquoise water",
  },
  {
    slug: "preah-vihear",
    name: "Preah Vihear",
    highlight: "The clifftop temple and Koh Ker",
    image: photo("1541429464955-87bd98d6d8f8", 400),
    alt: "A carved dark stone guardian statue",
  },
  {
    slug: "prey-veng",
    name: "Prey Veng",
    highlight: "Ba Phnom and wide rice plains",
    image: photo("1571579544731-ed0957f498da", 400),
    alt: "Aerial view of flooded green rice fields",
  },
  {
    slug: "pursat",
    name: "Pursat",
    highlight: "Marble carving and the lake's western shore",
    image: photo("1623942201715-d89baec448cc", 400),
    alt: "Two people walking a path beside still water",
  },
  {
    slug: "ratanakiri",
    name: "Ratanakiri",
    highlight: "Yeak Laom crater lake and waterfalls",
    image: photo("1787764082464-f5ee394cc907", 400),
    alt: "A calm lake reflecting trees at dawn",
  },
  {
    slug: "siem-reap",
    name: "Siem Reap",
    highlight: "Angkor Archaeological Park and Tonle Sap",
    image: photo("1522582451902-3545817f6046", 400),
    alt: "A monk in orange robes in a temple corridor",
  },
  {
    slug: "stung-treng",
    name: "Stung Treng",
    highlight: "Mekong rapids and northern waterfalls",
    image: photo("1621502134035-2316a3e14904", 400),
    alt: "A waterfall dropping through thick forest",
  },
  {
    slug: "svay-rieng",
    name: "Svay Rieng",
    highlight: "Rice country on the Vietnamese border",
    image: photo("1729963639012-5a6a48690ed4", 400),
    alt: "A motorcycle parked on a red dirt country road",
  },
  {
    slug: "takeo",
    name: "Takéo",
    highlight: "Angkor Borei and the Phnom Da temples",
    image: photo("1608137567874-5fef0c5e6741", 400),
    alt: "A pale stone statue against a clouded sky",
  },
  {
    slug: "tbong-khmum",
    name: "Tbong Khmum",
    highlight: "Rubber plantations along the Mekong",
    image: photo("1654607309308-6037eaac4c17", 400),
    alt: "A truck on a road beside dense plantation forest",
  },
];

export const provinceCategories = [
  "Attraction Sites",
  "Stays",
  "Food",
  "Water",
  "Activities and Experiences",
  "Tourism Corridors",
] as const;

/**
 * Hand-picked places for the "Recommended" section. Place names, provinces and
 * best-time windows are real; the ratings and review counts are demo figures —
 * wire them to live review data before launch.
 */
export type RecommendedPlace = {
  slug: string;
  name: string;
  province: string;
  region: string;
  category: (typeof provinceCategories)[number];
  summary: string;
  highlights: string[];
  bestTime: string;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  alt: string;
};

export const recommendedPlaces: RecommendedPlace[] = [
  {
    slug: "angkor-archaeological-park",
    name: "Angkor Archaeological Park",
    province: "Siem Reap",
    region: "Ancient Capitals & Khmer Civilization Region",
    category: "Attraction Sites",
    summary:
      "Four hundred square kilometres of temple city — sunrise at Angkor Wat, the faces of the Bayon, and Ta Prohm still held together by tree roots.",
    highlights: ["UNESCO", "Sunrise", "Temple circuit"],
    bestTime: "Nov – Feb",
    rating: 4.9,
    reviews: 2140,
    badge: "Most visited",
    image: photo("1566706546199-a93ba33ce9f7", 1000),
    alt: "The towers of Angkor Wat reflected in the moat at dawn",
  },
  {
    slug: "kampong-phluk",
    name: "Kampong Phluk Floating Village",
    province: "Siem Reap",
    region: "Mekong & Tonle Sap Civilization",
    category: "Water",
    summary:
      "Houses on ten-metre stilts above the Tonle Sap, reached by boat through flooded mangrove forest that shifts with the season.",
    highlights: ["Boat trip", "Flooded forest", "Stilt houses"],
    bestTime: "Aug – Dec",
    rating: 4.6,
    reviews: 780,
    image: photo("1704103258899-78a73254775a", 1000),
    alt: "Visitors crossing the Tonle Sap by boat near a floating village",
  },
  {
    slug: "koh-rong-sanloem",
    name: "Koh Rong Sanloem",
    province: "Preah Sihanouk",
    region: "Coastal & Island Region",
    category: "Water",
    summary:
      "The quieter of the two big islands: Saracen Bay for the sand, Lazy Beach for sunset, and bioluminescent plankton after dark.",
    highlights: ["Islands", "Snorkelling", "Bioluminescence"],
    bestTime: "Nov – Apr",
    rating: 4.8,
    reviews: 1120,
    badge: "Traveller favourite",
    image: photo("1639192745319-e37cd8cd8374", 1000),
    alt: "Aerial view of a forested island ringed by clear shallow water",
  },
  {
    slug: "kampot-riverfront",
    name: "Kampot & the Pepper Farms",
    province: "Kampot",
    region: "Khmer Culinary Region",
    category: "Food",
    summary:
      "A slow river town of shophouses and pepper estates, with the abandoned hill station on Bokor mountain an hour above it.",
    highlights: ["Pepper estates", "River sunset", "Bokor hill"],
    bestTime: "Dec – Mar",
    rating: 4.7,
    reviews: 640,
    image: photo("1786954431605-f97ecd5ae5ae", 1000),
    alt: "Kampot riverfront buildings lit up under a violet evening sky",
  },
  {
    slug: "phnom-penh-riverside",
    name: "Phnom Penh Riverside",
    province: "Phnom Penh",
    region: "Urban Lifestyle & Nightlife",
    category: "Activities and Experiences",
    summary:
      "The Royal Palace and National Museum by day, then the Sisowath Quay strip — rooftop bars, night market stalls and late kitchens.",
    highlights: ["Royal Palace", "Night market", "Rooftops"],
    bestTime: "Nov – Feb",
    rating: 4.5,
    reviews: 1530,
    image: photo("1635167463041-00f6d9344cda", 1000),
    alt: "Phnom Penh skyline with a clock tower among tall buildings",
  },
  {
    slug: "bou-sra-mondulkiri",
    name: "Bou Sra Waterfall & Sen Monorom",
    province: "Mondulkiri",
    region: "Eco-Community Tourism",
    category: "Attraction Sites",
    summary:
      "A two-tier waterfall in the eastern highlands, paired with Bunong homestays and the ethical elephant projects around Sen Monorom.",
    highlights: ["Waterfall", "Elephant sanctuary", "Homestay"],
    bestTime: "Jul – Nov",
    rating: 4.7,
    reviews: 410,
    badge: "Off the trail",
    image: photo("1621063225827-1e6cb6c75b62", 1000),
    alt: "Water falling over dark rock ledges into forest below",
  },
];

/**
 * The "Popular Now" leaderboard. Places and provinces are real; `saves` and
 * `trend` are demo figures — replace them with live save/view counts once the
 * Saved feature is storing data.
 */
export type PopularPlace = {
  slug: string;
  name: string;
  province: string;
  category: (typeof provinceCategories)[number];
  saves: string;
  trend: string;
  image: string;
  alt: string;
};

export const popularNow: PopularPlace[] = [
  {
    slug: "ta-prohm",
    name: "Ta Prohm",
    province: "Siem Reap",
    category: "Attraction Sites",
    saves: "3.1k",
    trend: "+42%",
    image: photo("1526324585411-e24d5ba61edd", 400),
    alt: "Temple stonework gripped by the roots of a giant fig tree",
  },
  {
    slug: "preah-vihear-temple",
    name: "Preah Vihear Temple",
    province: "Preah Vihear",
    category: "Attraction Sites",
    saves: "2.4k",
    trend: "+31%",
    image: photo("1609949165382-2e442783c8d5", 400),
    alt: "Weathered Khmer ruins standing among green trees",
  },
  {
    slug: "kep-crab-market",
    name: "Kep Crab Market",
    province: "Kep",
    category: "Food",
    saves: "1.9k",
    trend: "+27%",
    image: photo("1582414004129-a955c6087f5e", 400),
    alt: "Wooden jetty reaching out over calm coastal water",
  },
  {
    slug: "kratie-dolphins",
    name: "Kratié River Dolphins",
    province: "Kratié",
    category: "Water",
    saves: "1.6k",
    trend: "+22%",
    image: photo("1602604193553-28c132dac0a7", 400),
    alt: "Green trees lining a wide slow stretch of the Mekong",
  },
  {
    slug: "battambang",
    name: "Battambang Riverside",
    province: "Battambang",
    category: "Activities and Experiences",
    saves: "1.2k",
    trend: "+18%",
    image: photo("1707038346336-ce6789bce61d", 400),
    alt: "Clock tower beside the river in a Cambodian provincial town",
  },
  {
    slug: "kirirom",
    name: "Kirirom National Park",
    province: "Kampong Speu",
    category: "Tourism Corridors",
    saves: "940",
    trend: "+15%",
    image: photo("1599283415392-c1ad8110a147", 400),
    alt: "Empty road running between tall pines under a blue sky",
  },
];

/**
 * Browsable interests. Each one is a lens over the same places — the counts
 * come later, once places are stored rather than hard-coded.
 */
export type Interest = {
  slug: string;
  name: string;
  blurb: string;
  /** Cambodian stock photography; alt describes the photo, not the location. */
  image: string;
  alt: string;
  icon:
    | "city"
    | "temple"
    | "columns"
    | "museum"
    | "palm"
    | "water"
    | "utensils"
    | "leaf";
};

export const interests: Interest[] = [
  {
    slug: "ancient-cities",
    name: "Ancient Cities",
    blurb:
      "Angkor, Sambor Prei Kuk, Koh Ker and Longvek — the capitals Khmer kings built, moved and abandoned.",
    image: photo("1609949165382-2e442783c8d5", 600),
    alt: "Weathered Khmer ruins standing among green trees",
    icon: "city",
  },
  {
    slug: "temples",
    name: "Temples",
    blurb:
      "From the great sandstone complexes to the working pagoda at the end of a village road.",
    image: photo("1526324585411-e24d5ba61edd", 600),
    alt: "Temple stonework held in the roots of a fig tree",
    icon: "temple",
  },
  {
    slug: "archaeological-sites",
    name: "Archaeological Sites",
    blurb:
      "Excavations, inscriptions, baray waterworks and the pre-Angkorian brick towers still being catalogued.",
    image: photo("1540525080980-b97c4be3c779", 600),
    alt: "Timber propped against partly excavated ruins",
    icon: "columns",
  },
  {
    slug: "museums",
    name: "Museums",
    blurb:
      "The National Museum, provincial collections and the memorial sites that hold the recent past.",
    image: photo("1549463601-da058868e20d", 600),
    alt: "A colonnaded civic building under bright cloud",
    icon: "museum",
  },
  {
    slug: "beaches-islands",
    name: "Beaches & Islands",
    blurb:
      "The Gulf coast and everything a boat ride offshore, from busy bays to one-bar islands.",
    image: photo("1674017062593-8d4e8e5f5be7", 600),
    alt: "Small boats moored in clear shallow water",
    icon: "palm",
  },
  {
    slug: "rivers-waterfalls",
    name: "Rivers & Waterfalls",
    blurb:
      "The Mekong and Tonle Sap, the northern rapids, and the falls that run hardest after the rains.",
    image: photo("1621063223871-72880cf5eb51", 600),
    alt: "A waterfall spilling through thick forest",
    icon: "water",
  },
  {
    slug: "food-markets",
    name: "Food & Markets",
    blurb:
      "Morning markets, pepper and palm sugar producers, riverside grills and the country's regional dishes.",
    image: photo("1787736366516-20788522776a", 600),
    alt: "A busy street market stall under an orange sign",
    icon: "utensils",
  },
  {
    slug: "nature-wildlife",
    name: "Nature & Wildlife",
    blurb:
      "Cardamom rainforest, flooded forest, dolphin pools and the community-run conservation projects.",
    image: photo("1781797538552-c8a1957a3272", 600),
    alt: "Green treetops above a distant village at twilight",
    icon: "leaf",
  },
];

/**
 * Curated multi-province routes. Provinces and rough distances are real; the
 * suggested durations are editorial guidance, not booked itineraries.
 */
export type Corridor = {
  slug: string;
  name: string;
  summary: string;
  provinces: string[];
  days: string;
  image: string;
  alt: string;
};

export const corridors: Corridor[] = [
  {
    slug: "khmer-civilization-trail",
    name: "Khmer Civilization Trail",
    summary:
      "The temple route in chronological order — pre-Angkorian brick towers, the Angkor capitals, then the northern outposts on the escarpment.",
    provinces: ["Siem Reap", "Kampong Thom", "Preah Vihear", "Banteay Meanchey"],
    days: "7 – 10 days",
    image: photo("1566706546199-a93ba33ce9f7", 1000),
    alt: "The five towers of Angkor Wat behind the reflecting moat",
  },
  {
    slug: "coastal-paradise-route",
    name: "Coastal Paradise Route",
    summary:
      "West to east along the Gulf: island ferries, the pepper estates behind Kampot, and crab straight off the boats in Kep.",
    provinces: ["Koh Kong", "Preah Sihanouk", "Kampot", "Kep"],
    days: "6 – 9 days",
    image: photo("1509781847595-a430dc27c7af", 1000),
    alt: "Long empty shoreline meeting shallow clear water",
  },
  {
    slug: "cardamom-peaks-explorer",
    name: "Cardamom & Peaks Explorer",
    summary:
      "Into the largest rainforest left in mainland Southeast Asia, then up to the pine plateau at Kirirom and the old hill station on Bokor.",
    provinces: ["Koh Kong", "Pursat", "Kampong Speu"],
    days: "5 – 8 days",
    image: photo("1722054078069-095e86f88829", 1000),
    alt: "Still water below forested mountains under heavy cloud",
  },
  {
    slug: "northeast-highland-loop",
    name: "Northeast Highland Loop",
    summary:
      "Up the Mekong to the dolphin pools, then east into Bunong and Tampuan country for crater lakes, waterfalls and highland homestays.",
    provinces: ["Kratié", "Stung Treng", "Ratanakiri", "Mondulkiri"],
    days: "8 – 12 days",
    image: photo("1667371026189-dfd5544cfdf9", 1000),
    alt: "Walkers on a forest path in the eastern highlands",
  },
];

/**
 * Destinations plotted on the map page.
 *
 * Coordinates are approximate centre points good enough to place a pin and
 * zoom to it — they are not survey-grade, and a few (national parks, island
 * bays, town riversides) stand for an area rather than a single address.
 */
export type MapDestination = {
  slug: string;
  name: string;
  province: string;
  category: (typeof provinceCategories)[number];
  blurb: string;
  lat: number;
  lng: number;
  image: string;
  alt: string;
};

export const mapDestinations: MapDestination[] = [
  {
    slug: "angkor-wat",
    name: "Angkor Wat",
    province: "Siem Reap",
    category: "Attraction Sites",
    blurb: "The largest religious monument on earth, best reached before dawn.",
    lat: 13.4125,
    lng: 103.867,
    image: photo("1566706546199-a93ba33ce9f7", 400),
    alt: "The towers of Angkor Wat behind the moat",
  },
  {
    slug: "ta-prohm",
    name: "Ta Prohm",
    province: "Siem Reap",
    category: "Attraction Sites",
    blurb: "The temple left to the fig trees, roots folded through the stone.",
    lat: 13.4348,
    lng: 103.889,
    image: photo("1526324585411-e24d5ba61edd", 400),
    alt: "Tree roots gripping temple stonework",
  },
  {
    slug: "banteay-srei",
    name: "Banteay Srei",
    province: "Siem Reap",
    category: "Attraction Sites",
    blurb: "Pink sandstone carved finer than anywhere else in the Angkor group.",
    lat: 13.5989,
    lng: 103.9633,
    image: photo("1540525080980-b97c4be3c779", 400),
    alt: "Carved sandstone ruins among greenery",
  },
  {
    slug: "kampong-phluk",
    name: "Kampong Phluk",
    province: "Siem Reap",
    category: "Water",
    blurb: "Stilted village over the Tonle Sap, reached through flooded forest.",
    lat: 13.1833,
    lng: 103.9833,
    image: photo("1704103259506-6c0ca4d6dca4", 400),
    alt: "Houses on stilts above a river",
  },
  {
    slug: "sambor-prei-kuk",
    name: "Sambor Prei Kuk",
    province: "Kampong Thom",
    category: "Attraction Sites",
    blurb: "Pre-Angkorian brick towers in the forest, older than Angkor itself.",
    lat: 12.8722,
    lng: 105.04,
    image: photo("1651650191726-d81c3a84bb25", 400),
    alt: "A brick temple tower overgrown with plants",
  },
  {
    slug: "preah-vihear-temple",
    name: "Preah Vihear Temple",
    province: "Preah Vihear",
    category: "Attraction Sites",
    blurb: "A temple strung along a clifftop with the plain 500m below.",
    lat: 14.3931,
    lng: 104.68,
    image: photo("1609949165382-2e442783c8d5", 400),
    alt: "Weathered Khmer ruins among trees",
  },
  {
    slug: "koh-ker",
    name: "Koh Ker",
    province: "Preah Vihear",
    category: "Attraction Sites",
    blurb: "A brief tenth-century capital built around a seven-tier pyramid.",
    lat: 13.7833,
    lng: 104.5333,
    image: photo("1599283787923-51b965a58b05", 400),
    alt: "A stone causeway leading to a temple",
  },
  {
    slug: "banteay-chhmar",
    name: "Banteay Chhmar",
    province: "Banteay Meanchey",
    category: "Attraction Sites",
    blurb: "A vast, barely restored temple with face towers and few visitors.",
    lat: 14.0333,
    lng: 103.0833,
    image: photo("1549463601-da058868e20d", 400),
    alt: "A weathered stone building under bright cloud",
  },
  {
    slug: "battambang",
    name: "Battambang",
    province: "Battambang",
    category: "Activities and Experiences",
    blurb: "Shophouse streets, the bamboo train and bats pouring off Phnom Sampeau.",
    lat: 13.0957,
    lng: 103.2022,
    image: photo("1707038346336-ce6789bce61d", 400),
    alt: "A clock tower beside a river",
  },
  {
    slug: "phnom-penh",
    name: "Phnom Penh Riverside",
    province: "Phnom Penh",
    category: "Activities and Experiences",
    blurb: "Royal Palace and National Museum by day, Sisowath Quay after dark.",
    lat: 11.564,
    lng: 104.931,
    image: photo("1635167463041-00f6d9344cda", 400),
    alt: "City towers and a clock tower",
  },
  {
    slug: "koh-rong-sanloem",
    name: "Koh Rong Sanloem",
    province: "Preah Sihanouk",
    category: "Water",
    blurb: "Saracen Bay for the sand, Lazy Beach for the sunset.",
    lat: 10.6058,
    lng: 103.3167,
    image: photo("1639192745319-e37cd8cd8374", 400),
    alt: "A forested island ringed by clear water",
  },
  {
    slug: "kampot",
    name: "Kampot",
    province: "Kampot",
    category: "Food",
    blurb: "A river town of shophouses, with the pepper estates just behind it.",
    lat: 10.61,
    lng: 104.181,
    image: photo("1786954431605-f97ecd5ae5ae", 400),
    alt: "A riverfront town lit up at dusk",
  },
  {
    slug: "bokor-hill-station",
    name: "Bokor Hill Station",
    province: "Kampot",
    category: "Attraction Sites",
    blurb: "An abandoned French hill station in the cloud above Kampot.",
    lat: 10.6333,
    lng: 104.0167,
    image: photo("1677209806836-54e9879c0c25", 400),
    alt: "A large building on a green hillside",
  },
  {
    slug: "kep",
    name: "Kep Crab Market",
    province: "Kep",
    category: "Food",
    blurb: "Crab straight off the boats, cooked with Kampot green pepper.",
    lat: 10.4833,
    lng: 104.3167,
    image: photo("1582414004129-a955c6087f5e", 400),
    alt: "A wooden jetty over calm sea",
  },
  {
    slug: "kirirom",
    name: "Kirirom National Park",
    province: "Kampong Speu",
    category: "Tourism Corridors",
    blurb: "Pine forest on a plateau, cool enough to need a jacket at night.",
    lat: 11.3167,
    lng: 104.05,
    image: photo("1599283415392-c1ad8110a147", 400),
    alt: "A road running between tall pines",
  },
  {
    slug: "koh-kong",
    name: "Koh Kong & the Cardamoms",
    province: "Koh Kong",
    category: "Attraction Sites",
    blurb: "Mangrove estuaries at the edge of the largest rainforest left here.",
    lat: 11.6153,
    lng: 102.9838,
    image: photo("1740724873371-0c05a17fa819", 400),
    alt: "A river winding through dense forest",
  },
  {
    slug: "kratie-dolphins",
    name: "Kampi Dolphin Pool",
    province: "Kratié",
    category: "Water",
    blurb: "One of the last deep pools holding Irrawaddy dolphins on the Mekong.",
    lat: 12.5667,
    lng: 106.0333,
    image: photo("1602604193553-28c132dac0a7", 400),
    alt: "Trees along a wide slow river",
  },
  {
    slug: "stung-treng",
    name: "Stung Treng Rapids",
    province: "Stung Treng",
    category: "Water",
    blurb: "Braided Mekong channels and waterfalls up towards the Lao border.",
    lat: 13.5259,
    lng: 105.9683,
    image: photo("1621502134035-2316a3e14904", 400),
    alt: "A waterfall dropping through forest",
  },
  {
    slug: "yeak-laom",
    name: "Yeak Laom Crater Lake",
    province: "Ratanakiri",
    category: "Water",
    blurb: "A near-perfect volcanic crater filled with clear, swimmable water.",
    lat: 13.7333,
    lng: 107.0167,
    image: photo("1787764082464-f5ee394cc907", 400),
    alt: "A calm lake reflecting trees at dawn",
  },
  {
    slug: "bou-sra",
    name: "Bou Sra Waterfall",
    province: "Mondulkiri",
    category: "Attraction Sites",
    blurb: "A two-tier fall in Bunong country, loudest at the end of the rains.",
    lat: 12.5333,
    lng: 107.3667,
    image: photo("1621063225827-1e6cb6c75b62", 400),
    alt: "Water falling over dark rock ledges",
  },
];
