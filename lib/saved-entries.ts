/** One savable place, as the Saved and Account pages need to show it. */
export type SavedPlace = {
  key: string;
  name: string;
  province: string;
  blurb: string;
  image: string;
  alt: string;
  /** Its destination page, or its spot on the map for map-only places. */
  href: string;
  onMap: boolean;
  /** Set for region destinations; map-only places belong to no region. */
  region?: string;
  lat?: number;
  lng?: number;
};

/**
 * Resolves saved keys to places, newest first. The map and the region pages
 * list some places separately, so a place saved from both appears once —
 * holding every key it was saved under, so removing it clears them all.
 */
export function groupSaved(keys: string[], all: SavedPlace[]) {
  const byPlace = new Map<string, { place: SavedPlace; keys: string[] }>();
  for (const key of keys) {
    const place = all.find((item) => item.key === key);
    if (!place) continue;
    const id = `${place.name}|${place.province}`;
    const entry = byPlace.get(id);
    if (entry) {
      entry.keys.push(key);
      // Prefer the entry that knows its region.
      if (!entry.place.region && place.region) entry.place = place;
    } else {
      byPlace.set(id, { place, keys: [key] });
    }
  }
  return [...byPlace.values()];
}
