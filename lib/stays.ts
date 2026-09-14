import { distanceKm, regionDetails } from "@/lib/regions";
import type { RegionDestination } from "@/lib/regions";
import { kindsOf } from "@/lib/site-search";

/**
 * Stay pages. A destination whose category is a kind of accommodation gets
 * the stay layout; its profile gives the kind of stay, a typical price level
 * and who it suits.
 */
export type StayProfile = {
  type: string;
  /** One to four, shown as $ signs. */
  price: 1 | 2 | 3 | 4;
  priceLabel: string;
  bestFor: string;
};

const PROFILES: Record<string, StayProfile> = {
  Homestay: {
    type: "Homestay",
    price: 1,
    priceLabel: "Budget",
    bestFor: "Village life over hotel comforts",
  },
  "Eco Lodge": {
    type: "Eco lodge",
    price: 2,
    priceLabel: "Mid-range",
    bestFor: "Wildlife, forest and slow travel",
  },
  "Luxury Hotel": {
    type: "Hotel & villas",
    price: 4,
    priceLabel: "Luxury",
    bestFor: "Comfort after long days out",
  },
  "Private Island": {
    type: "Island retreat",
    price: 4,
    priceLabel: "Luxury",
    bestFor: "Privacy, beaches and doing very little",
  },
  Camping: {
    type: "Camping",
    price: 1,
    priceLabel: "Budget",
    bestFor: "Hikers and small groups",
  },
};

export function stayProfile(item: RegionDestination) {
  return PROFILES[item.category];
}

export type NearbyPlace = {
  regionSlug: string;
  destination: RegionDestination;
  km: number;
};

/** Beyond this, "nearby" stops being true. */
const NEARBY_KM = 60;

/**
 * The closest places to eat and things to do around a stay, from every
 * region. A place listed in two regions appears once.
 */
export function aroundStay(stay: RegionDestination, limit = 3) {
  if (stay.lat === undefined || stay.lng === undefined) {
    return { food: [], sights: [] };
  }
  const origin = { lat: stay.lat, lng: stay.lng };

  const seen = new Set<string>([stay.name]);
  const all: (NearbyPlace & { kinds: string[] })[] = [];
  for (const region of regionDetails) {
    for (const item of region.destinations) {
      if (item.lat === undefined || item.lng === undefined || seen.has(item.name)) {
        continue;
      }
      seen.add(item.name);
      const km = distanceKm(origin, { lat: item.lat, lng: item.lng });
      if (km <= NEARBY_KM) {
        all.push({ regionSlug: region.slug, destination: item, km, kinds: kindsOf(item) });
      }
    }
  }
  all.sort((a, b) => a.km - b.km);

  return {
    food: all.filter((entry) => entry.kinds.includes("food") && !stayProfile(entry.destination)).slice(0, limit),
    sights: all.filter((entry) => entry.kinds.includes("place")).slice(0, limit),
  };
}

/** Other stays of the same kind, anywhere in the country. */
export function similarStays(stay: RegionDestination, limit = 3) {
  return regionDetails
    .flatMap((region) =>
      region.destinations
        .filter((item) => item.category === stay.category && item.name !== stay.name)
        .map((item) => ({ regionSlug: region.slug, destination: item })),
    )
    .slice(0, limit);
}
