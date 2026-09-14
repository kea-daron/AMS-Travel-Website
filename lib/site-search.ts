import { corridors, provinces, tourismRegions } from "@/lib/data";
import { coverageSlug, getRegionDestination, regionDetails } from "@/lib/regions";
import type { RegionDestination } from "@/lib/regions";

/**
 * Site-wide search: destinations (tagged as food, stays or places), regions,
 * provinces, corridors and timeline stories, ranked by where the words match.
 */
export type SearchType =
  | "place"
  | "food"
  | "stay"
  | "region"
  | "province"
  | "corridor"
  | "story";

export type SearchHit = {
  id: string;
  /** Destinations can be several at once — a homestay that serves food. */
  types: SearchType[];
  title: string;
  titleKh?: string;
  subtitle: string;
  /** Small label above the title: a category, "Region", "Corridor"… */
  label: string;
  href: string;
  image?: string;
  score: number;
};

const FOOD_CATEGORIES = new Set([
  "Street Food", "Traditional Food", "Seafood", "Fine Dining", "Michelin",
  "Coffee", "Cooking Class", "Sky Bar", "Night Market",
]);
const FOOD_TAGS = new Set([
  "Food", "Local Food", "Cafe", "Khmer Curry", "Num Banh Chok", "Fish Amok",
  "Palm Sugar", "Pepper Rice Wine",
]);
const STAY_CATEGORIES = new Set([
  "Luxury Hotel", "Homestay", "Eco Lodge", "Private Island", "Camping",
]);
const STAY_TAGS = new Set(["Homestay", "Luxury Resort"]);

/** Which kinds a destination counts as: food, a stay, both, or a place. */
export function kindsOf(item: RegionDestination): SearchType[] {
  const tags = item.tags ?? [];
  const types: SearchType[] = [];
  if (FOOD_CATEGORIES.has(item.category) || tags.some((tag) => FOOD_TAGS.has(tag))) {
    types.push("food");
  }
  if (STAY_CATEGORIES.has(item.category) || tags.some((tag) => STAY_TAGS.has(tag))) {
    types.push("stay");
  }
  if (types.length === 0) types.push("place");
  return types;
}

/**
 * General words that stand for a whole kind, so "eat" finds a noodle stall.
 * Only general ones: a specific word like "coffee" or "homestay" should match
 * the places that are actually that, not every food place or stay.
 */
const KIND_WORDS: Partial<Record<SearchType, string>> = {
  food: "food eat eating restaurant restaurants dining cuisine meal dish dishes drink drinks breakfast lunch dinner",
  stay: "stay stays hotel hotels sleep accommodation lodging overnight",
  region: "region regions",
  province: "province provinces",
  corridor: "corridor corridors route routes itinerary trip road",
  story: "history story stories timeline",
};

function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Splits a query into words; Khmer script is kept whole. */
function words(query: string) {
  return normalise(query)
    .split(/[\s,.;:!?/()\-–—&+"']+/)
    .filter((word) => word.length > 0);
}

/** "temples" also matches "temple", "stays" matches "stay". */
function variants(word: string) {
  return word.length > 3 && word.endsWith("s") ? [word, word.slice(0, -1)] : [word];
}

type Entry = Omit<SearchHit, "score"> & {
  /** Weighted text: the title counts most, then labels, then the rest. */
  fields: { title: string; label: string; body: string };
  /** Breaks ties in favour of headline places. */
  boost?: number;
};

function entries(): Entry[] {
  const list: Entry[] = [];

  for (const region of regionDetails) {
    for (const item of region.destinations) {
      const tags = item.tags ?? [];
      const types = kindsOf(item);

      list.push({
        id: `place:${region.slug}/${item.slug}`,
        types,
        title: item.name,
        titleKh: item.nameKh,
        subtitle: `${item.province} · ${region.name}`,
        label: item.category,
        href: `/regions/${region.slug}/${item.slug}`,
        image: item.image,
        boost: (item.featured ? 1 : 0) + (item.unesco ? 1 : 0),
        fields: {
          title: `${item.name} ${item.nameKh ?? ""}`,
          label: [item.category, ...tags, ...types.map((type) => KIND_WORDS[type] ?? "")].join(" "),
          body: [item.province, region.name, item.blurb, item.detail ?? "", ...Object.values(item.facets ?? {})].join(" "),
        },
      });
    }

    for (const step of region.coverage ?? []) {
      if (!step.detail) continue;
      const cover = step.visit?.[0]?.split("/");
      list.push({
        id: `story:${region.slug}/${coverageSlug(step)}`,
        types: ["story"],
        title: step.altName ? `${step.name} · ${step.altName}` : step.name,
        titleKh: step.nameKh,
        subtitle: `${step.kicker} · ${region.coverageTitle ?? region.name}`,
        label: step.badge,
        href: `/regions/${region.slug}/stories/${coverageSlug(step)}`,
        image: cover ? getRegionDestination(cover[0], cover[1])?.destination.image : undefined,
        fields: {
          title: `${step.name} ${step.altName ?? ""} ${step.nameKh ?? ""}`,
          label: `${step.badge} ${step.kicker} ${KIND_WORDS.story}`,
          body: [step.body, ...step.detail].join(" "),
        },
      });
    }
  }

  for (const region of tourismRegions) {
    list.push({
      id: `region:${region.slug}`,
      types: ["region"],
      title: region.name,
      subtitle: region.blurb,
      label: "Tourism region",
      href: `/regions/${region.slug}`,
      image: region.image,
      fields: { title: region.name, label: KIND_WORDS.region!, body: region.blurb },
    });
  }

  for (const province of provinces) {
    list.push({
      id: `province:${province.slug}`,
      types: ["province"],
      title: province.name,
      subtitle: province.highlight,
      label: "Province",
      href: `/provinces/${province.slug}`,
      image: province.image,
      fields: { title: province.name, label: KIND_WORDS.province!, body: province.highlight },
    });
  }

  for (const corridor of corridors) {
    list.push({
      id: `corridor:${corridor.slug}`,
      types: ["corridor"],
      title: corridor.name,
      titleKh: corridor.nameKh,
      subtitle: corridor.stops.map((stop) => stop.name).join(" → "),
      label: `Corridor · ${corridor.days}`,
      href: `/map?corridor=${corridor.slug}`,
      image: corridor.image,
      fields: {
        title: `${corridor.name} ${corridor.nameKh ?? ""}`,
        label: KIND_WORDS.corridor!,
        body: [corridor.summary, ...corridor.stops.flatMap((stop) => [stop.name, stop.province])].join(" "),
      },
    });
  }

  return list;
}

// Built once per server process; the data is static.
let index: (Entry & { norm: Entry["fields"] })[] | undefined;

function getIndex() {
  index ??= entries().map((entry) => ({
    ...entry,
    norm: {
      title: normalise(entry.fields.title),
      label: normalise(entry.fields.label),
      body: normalise(entry.fields.body),
    },
  }));
  return index;
}

/**
 * Every hit for the query, best first. All words must match somewhere; a word
 * in the title scores more than one in a label, which scores more than one in
 * the description.
 */
export function searchSite(query: string): SearchHit[] {
  const terms = words(query);
  if (terms.length === 0) return [];
  const phrase = normalise(query).trim();

  const hits: SearchHit[] = [];
  for (const entry of getIndex()) {
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      const forms = variants(term);
      const has = (text: string) => forms.some((form) => text.includes(form));
      if (has(entry.norm.title)) score += 3;
      else if (has(entry.norm.label)) score += 2;
      else if (has(entry.norm.body)) score += 1;
      else {
        matchedAll = false;
        break;
      }
    }
    if (!matchedAll) continue;

    score += entry.boost ?? 0;
    if (entry.norm.title === phrase) score += 6;
    else if (entry.norm.title.startsWith(phrase)) score += 4;
    else if (entry.norm.title.includes(phrase)) score += 2;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fields, norm, boost, ...hit } = entry;
    hits.push({ ...hit, score });
  }

  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
