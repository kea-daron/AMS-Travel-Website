/**
 * The six interests on the homepage search. Each gathers the destination
 * categories that belong to it; a place can sit in more than one (a floating
 * village is both an attraction and on the water).
 */
export type InterestId =
  | "attractions"
  | "stays"
  | "food"
  | "water"
  | "activities"
  | "corridors";

export const INTERESTS: {
  id: InterestId;
  name: string;
  blurb: string;
  categories: string[];
}[] = [
  {
    id: "attractions",
    name: "Attraction Sites",
    blurb: "Temples, ancient cities, museums and the places you come to see",
    categories: [
      "Temples", "Archaeological Sites", "Ancient Cities", "Ancient Roads",
      "Bridges", "Hospitals", "Museums", "Art Gallery", "City Walk",
      "Sacred Mountain", "Viewpoint", "Village", "Craft", "Indigenous Culture",
      "Floating Village", "Cave", "Sunset", "Shopping", "Night Market",
      "Community",
    ],
  },
  {
    id: "stays",
    name: "Stays",
    blurb: "Hotels, villas, homestays, eco lodges and camping",
    categories: ["Luxury Hotel", "Private Island", "Homestay", "Eco Lodge", "Camping"],
  },
  {
    id: "food",
    name: "Food",
    blurb: "Street food, markets, Khmer kitchens, coffee and fine dining",
    categories: [
      "Street Food", "Traditional Food", "Seafood", "Fine Dining", "Michelin",
      "Coffee", "Cooking Class", "Sky Bar", "Night Market", "Farm", "Rice",
      "Agriculture",
    ],
  },
  {
    id: "water",
    name: "Water",
    blurb: "Islands, beaches, waterfalls, rivers, diving and boat trips",
    categories: [
      "Island", "Private Island", "Beach", "Coral", "Diving", "Snorkeling",
      "Mangrove", "Cruise", "Yacht", "Boat Trip", "River Island", "Fishing",
      "Waterfall", "Volcano Lake", "Bird Sanctuary", "Floating Village",
    ],
  },
  {
    id: "activities",
    name: "Activities & Experiences",
    blurb: "Trekking, cycling, wildlife, spa days, guides and tours",
    categories: [
      "Trekking", "Cycling", "Adventure", "Camping", "Golf", "Helicopter",
      "Spa", "VIP Tour", "Private Guide", "Local Guide", "Cooking Class",
      "Photography", "Bird Watching", "Wildlife", "Forest", "Mountain",
      "National Park",
    ],
  },
  {
    id: "corridors",
    name: "Tourism Corridors",
    blurb: "The five routes that string provinces together",
    categories: [],
  },
];

const BY_CATEGORY = new Map<string, InterestId[]>();
for (const interest of INTERESTS) {
  for (const category of interest.categories) {
    BY_CATEGORY.set(category, [...(BY_CATEGORY.get(category) ?? []), interest.id]);
  }
}

/** Which interests a destination category belongs to. */
export function interestsFor(category: string): InterestId[] {
  return BY_CATEGORY.get(category) ?? [];
}

export function getInterest(id: string) {
  return INTERESTS.find((interest) => interest.id === id);
}
