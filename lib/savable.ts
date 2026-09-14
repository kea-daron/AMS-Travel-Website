import { mapDestinations } from "@/lib/data";
import { regionDetails } from "@/lib/regions";
import type { SavedPlace } from "@/lib/saved-entries";

/**
 * Everything a traveller can save, keyed the way SaveButton stores it: region
 * destinations as `region/slug`, map places by their own slug.
 */
export function savablePlaces(): SavedPlace[] {
  const fromRegions = regionDetails.flatMap((region) =>
    region.destinations.map((item) => ({
      key: `${region.slug}/${item.slug}`,
      name: item.name,
      province: item.province,
      blurb: item.blurb,
      image: item.image,
      alt: "",
      href: `/regions/${region.slug}/${item.slug}`,
      onMap: false,
      region: region.slug,
      lat: item.lat,
      lng: item.lng,
    })),
  );
  const fromMap = mapDestinations.map((item) => ({
    key: item.slug,
    name: item.name,
    province: item.province,
    blurb: item.blurb,
    image: item.image,
    alt: item.alt,
    href: `/map?place=${item.slug}`,
    onMap: true,
    lat: item.lat,
    lng: item.lng,
  }));
  return [...fromRegions, ...fromMap];
}
