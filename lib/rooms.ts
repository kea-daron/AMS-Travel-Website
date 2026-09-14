import { photo } from "@/lib/data";

/**
 * Room types for each stay, keyed `region/slug` like everything else.
 *
 * Several stays here stand for a group of similar properties ("Phnom Penh
 * Riverside Hotels"), so these are the room types typical of them — each
 * property differs. TODO: replace with real inventory from the API.
 */
export type Room = {
  slug: string;
  name: string;
  /** One line for the card. */
  summary: string;
  description: string;
  guests: number;
  /** When set, shown instead of "Up to N": "2 adults, 2 children". */
  adults?: number;
  children?: number;
  beds: string;
  /** Floor area in m², where it means something. */
  size?: number;
  view?: string;
  features: string[];
  /** What comes with the booking, e.g. breakfast or free cancellation. */
  perks?: string[];
  /** Photos, best first. Homestays fall back to the stay's own photo. */
  images: string[];
};

const p = (id: string) => photo(id, 1200);

const I = {
  teakRoom: p("1611892440504-42a792e24d32"),
  brightDoors: p("1582719478250-c89cae4dc85b"),
  colonial: p("1590490360182-c33d57733427"),
  double: p("1618773928121-c32242e63f39"),
  modern: p("1566665797739-1674de7a421a"),
  suite: p("1578683010236-d716f9a3f461"),
  lounge: p("1560448204-e02f11c3d0e2"),
  twinFan: p("1595576508898-0ad5c879a061"),
  cityRoom: p("1631049307264-da0ec9d70304"),
  simple: p("1522771739844-6a9f6d5f14af"),
  warmRoom: p("1540518614846-7eded433c457"),
  goldRoom: p("1587985064135-0366536eab42"),
  poolPalms: p("1520250497591-112f2f40a3f4"),
  infinity: p("1540541338287-41700207dee6"),
  deckPool: p("1584132967334-10e028bd69f7"),
  beachBungalow: p("1499793983690-e29da59ef1c2"),
  overwater: p("1602002418082-a4443e081dd1"),
  cabanas: p("1571003123894-1f0594d2b5d9"),
  seaResort: p("1561501900-3701fa6a0864"),
  tent: p("1504280390367-361c6d9f38f4"),
  campfire: p("1478131143081-80f7f84ca84d"),
  village: p("1653714802676-6a50c7ead70e"),
  paddy: p("1638402828376-5762cb098099"),
  riverTrees: p("1602604193553-28c132dac0a7"),
  treetops: p("1781797538552-c8a1957a3272"),
  forestBridge: p("1667371026139-57d7d81918de"),
  pineRoad: p("1599283415392-c1ad8110a147"),
};

/** Stay-wide photos — bathrooms, breakfast, pools, surroundings. */
const X = {
  tub: p("1507652313519-d4e9174996dd"),
  bathroom: p("1584622650111-993a426fbf0a"),
  bathroomWhite: p("1620626011761-996317b8d101"),
  bathroomGrey: p("1600566752355-35792bedcfea"),
  breakfastSpread: p("1504754524776-8f4f37790ca0"),
  breakfastEggs: p("1533089860892-a7c6f0a88666"),
  frenchToast: p("1484723091739-30a097e8f929"),
  seaTerrace: p("1559339352-11d035aa65de"),
  massage: p("1544161515-4ab6ce6db874"),
  poolNight: p("1542314831-068cd1dbfeeb"),
  beachResort: p("1566073771259-6a8506099945"),
  palmReflect: p("1596178065887-1198b6148b2b"),
  poolUmbrellas: p("1596436889106-be35e843f974"),
  poolSunset: p("1600011689032-8b628b8a8747"),
  courtyard: p("1455587734955-081b22074882"),
  rooftop: p("1445019980597-93fa8acb246c"),
  cityRiverNight: p("1652802725832-67d5be09e5e3"),
  kampotNight: p("1786954431605-f97ecd5ae5ae"),
  boatsMountains: p("1661487906939-aea1f059b84f"),
  islandAerial: p("1639192745319-e37cd8cd8374"),
  beachPalms: p("1657027538728-0d4db32d87da"),
  jetty: p("1582414004129-a955c6087f5e"),
  soup: p("1588566565463-180a5b2090d2"),
  marketStall: p("1787736366516-20788522776a"),
  boatWoman: p("1632496515914-da284239a1fd"),
  blueBoat: p("1715520019930-b677fdca474d"),
  riceAerial: p("1571579544731-ed0957f498da"),
  lakeDawn: p("1787764082464-f5ee394cc907"),
  ruins: p("1540525080980-b97c4be3c779"),
  brickTower: p("1651650191726-d81c3a84bb25"),
  waterfallForest: p("1621502134035-2316a3e14904"),
  forestWalkers: p("1667371026189-dfd5544cfdf9"),
  riverForest: p("1740724873371-0c05a17fa819"),
  plateau: p("1667371026114-f4ea09440d40"),
  dirtPath: p("1667118891614-b0820e960b7b"),
  mountainCloud: p("1575735003097-b786f5b0463b"),
  waterMountains: p("1722054078069-095e86f88829"),
};

/** Photos shared by every room at a stay, added after each room's own. */
const STAY_PHOTOS: Record<string, string[]> = {
  "luxury/siem-reap-boutique": [X.tub, X.palmReflect, X.breakfastSpread, X.massage, X.courtyard],
  "luxury/pp-riverside-hotels": [X.bathroom, X.rooftop, X.breakfastEggs, X.poolNight, X.cityRiverNight],
  "luxury/kep-villas": [X.bathroomWhite, I.infinity, X.seaTerrace, X.poolSunset, X.breakfastSpread],
  "luxury/kampot-retreats": [X.bathroomGrey, X.boatsMountains, X.kampotNight, X.frenchToast, I.deckPool],
  "luxury/private-islands": [X.tub, X.islandAerial, X.beachResort, X.massage, X.seaTerrace],
  "luxury/inner-island-villas": [X.bathroomWhite, X.beachPalms, X.jetty, X.poolUmbrellas, X.breakfastEggs],
  "eco-community/banteay-chhmar-homestay": [X.soup, X.ruins, X.marketStall, X.riceAerial],
  "eco-community/koh-trong-homestay": [X.soup, I.riverTrees, X.blueBoat, X.boatWoman],
  "eco-community/chambok-cbet": [X.soup, X.waterfallForest, X.riceAerial, X.forestWalkers],
  "eco-community/sambor-prei-kuk-homestay": [X.soup, X.brickTower, X.marketStall, X.lakeDawn],
  "eco-community/evp": [X.forestWalkers, X.riverForest, X.waterfallForest, X.plateau, X.soup],
  "eco-community/osoam": [X.riverForest, X.forestWalkers, X.mountainCloud, X.soup],
  "eco-community/andoung-kraloeng": [X.forestWalkers, X.riverForest, X.dirtPath, X.soup],
  "mountain-waterfall/kirirom": [X.mountainCloud, X.waterMountains, X.plateau, I.forestBridge],
  "mountain-waterfall/osoam": [X.riverForest, X.mountainCloud, X.forestWalkers, X.dirtPath],
};

/** The two rooms every community homestay offers, in its own words. */
function homestayRooms(place: string, meals: string): Room[] {
  return [
    {
      slug: "family-house-room",
      name: "Room in a family house",
      summary: `A private corner of a village house in ${place}, with dinner at the family table.`,
      description: `You sleep in the host family’s house — usually upstairs in a wooden house on stilts, on a thick mattress under a mosquito net. ${meals} Bathrooms are simple and often shared, with a scoop bath or cold shower.`,
      guests: 2,
      beds: "Floor mattress with mosquito net",
      view: "Village",
      features: ["Mosquito net", "Fan", "Shared bathroom", "Home-cooked meals"],
      images: [I.village, I.paddy],
    },
    {
      slug: "group-stay",
      name: "Group stay",
      summary: "Two or three neighbouring houses for a family or small group.",
      description: `For groups the community spreads guests across neighbouring houses, so everyone still eats together. ${meals} The community office arranges the houses, meals and any guide.`,
      guests: 6,
      beds: "Mattresses with mosquito nets",
      view: "Village",
      features: ["Mosquito nets", "Fan", "Shared bathroom", "Home-cooked meals", "Local guide"],
      images: [I.paddy, I.village],
    },
  ];
}

const ROOMS: Record<string, Room[]> = {
  "luxury/siem-reap-boutique": [
    {
      slug: "courtyard-room",
      name: "Courtyard Room",
      summary: "Opens onto the planted courtyard, a few steps from the pool.",
      description: "The standard room at most of the small hotels off Wat Bo: teak furniture, silk throws and a door straight onto the courtyard. Quiet by day, and a short tuk-tuk ride from Pub Street at night.",
      guests: 2,
      beds: "1 king or 2 twin beds",
      size: 28,
      view: "Garden courtyard",
      features: ["Air-conditioning", "Free Wi-Fi", "Private bathroom", "Rain shower", "Minibar", "Safe"],
      images: [I.teakRoom, I.brightDoors],
    },
    {
      slug: "pool-access-room",
      name: "Pool Access Room",
      summary: "A private terrace that steps down into the pool.",
      description: "Ground-floor rooms with their own terrace on the pool — the ones to ask for if you want a swim between the morning temples and the afternoon ones.",
      guests: 2,
      beds: "1 king bed",
      size: 32,
      view: "Pool",
      features: ["Air-conditioning", "Free Wi-Fi", "Private terrace", "Rain shower", "Minibar", "Bathtub"],
      images: [I.poolPalms, I.double],
    },
    {
      slug: "wat-bo-suite",
      name: "Wat Bo Suite",
      summary: "A separate sitting room and a balcony over the lane.",
      description: "The largest rooms, with a sitting area apart from the bedroom and a balcony looking over the trees of the Wat Bo quarter. Room for a third person on the sofa bed.",
      guests: 3,
      beds: "1 king bed + sofa bed",
      size: 48,
      view: "Garden",
      features: ["Separate living area", "Balcony", "Bathtub", "Minibar", "Air-conditioning", "Free Wi-Fi"],
      images: [I.suite, I.lounge],
    },
  ],
  "luxury/pp-riverside-hotels": [
    {
      slug: "superior-city-room",
      name: "Superior City Room",
      summary: "The simplest room, facing the city side.",
      description: "A comfortable, well-kept room on the city side of the building — quieter than the river side on festival nights, and the best value on Sisowath Quay.",
      guests: 4,
      adults: 2,
      children: 2,
      beds: "1 king bed",
      size: 20,
      view: "City view, mountain view",
      features: ["Free Internet", "Air-conditioning"],
      perks: ["Included breakfast", "Free cancellation"],
      images: [I.cityRoom, I.modern],
    },
    {
      slug: "deluxe-river-view",
      name: "Deluxe River View",
      summary: "Windows onto the Tonle Sap and the boats going by.",
      description: "Colonial-era proportions — high ceilings and tall shutters — with the river filling the windows. Watch the boats and the sunset over the four-rivers junction from the balcony.",
      guests: 2,
      beds: "1 king bed",
      size: 34,
      view: "Tonle Sap river",
      features: ["Air-conditioning", "Free Wi-Fi", "Balcony", "Bathtub", "Minibar"],
      images: [I.colonial, I.double],
    },
    {
      slug: "riverside-suite",
      name: "Riverside Suite",
      summary: "A corner suite over the four-rivers junction.",
      description: "Corner suites with a separate living room and windows on two sides, looking over the point where the Mekong, the Tonle Sap and the Bassac meet. Sleeps a family of four.",
      guests: 4,
      beds: "1 king bed + sofa bed",
      size: 60,
      view: "Four-rivers junction",
      features: ["Separate living area", "Balcony", "Bathtub", "Minibar", "Air-conditioning", "Free Wi-Fi"],
      images: [I.lounge, I.suite],
    },
  ],
  "luxury/kep-villas": [
    {
      slug: "garden-villa",
      name: "Garden Villa",
      summary: "A standalone villa among the frangipani on the hillside.",
      description: "Each villa stands on its own in the garden, with a terrace for breakfast and an outdoor shower. Ten minutes’ walk down to the crab market.",
      guests: 2,
      beds: "1 king bed",
      size: 40,
      view: "Garden",
      features: ["Private terrace", "Outdoor shower", "Air-conditioning", "Free Wi-Fi", "Minibar"],
      images: [I.warmRoom, I.poolPalms],
    },
    {
      slug: "sea-view-villa",
      name: "Sea View Villa",
      summary: "Higher up the slope, looking out over the bay.",
      description: "The villas higher on the hill, with the Gulf of Thailand and Rabbit Island across the terrace. Sunset is the main event.",
      guests: 2,
      beds: "1 king bed",
      size: 45,
      view: "Gulf of Thailand",
      features: ["Private terrace", "Bathtub", "Air-conditioning", "Free Wi-Fi", "Minibar"],
      images: [I.infinity, I.brightDoors],
    },
    {
      slug: "family-villa",
      name: "Family Villa",
      summary: "Two bedrooms and a kitchenette for a longer stay.",
      description: "A two-bedroom villa with a small kitchen, good for families or friends staying a few nights and eating crab in town.",
      guests: 4,
      beds: "1 king + 2 single beds",
      size: 70,
      view: "Garden",
      features: ["Two bedrooms", "Kitchenette", "Private terrace", "Air-conditioning", "Free Wi-Fi"],
      images: [I.twinFan, I.lounge],
    },
  ],
  "luxury/kampot-retreats": [
    {
      slug: "riverside-bungalow",
      name: "Riverside Bungalow",
      summary: "A wooden bungalow on the bank, with a hammock facing the river.",
      description: "Timber bungalows along the Kampot River with the Bokor range behind. Kayak from the jetty in the morning, swing in the hammock when the heat sets in.",
      guests: 2,
      beds: "1 queen bed",
      size: 30,
      view: "Kampot River",
      features: ["Private terrace", "Hammock", "Fan & air-conditioning", "Free Wi-Fi", "Hot shower"],
      images: [I.teakRoom, I.poolPalms],
    },
    {
      slug: "garden-room",
      name: "Garden Room",
      summary: "A quiet room in the garden, set back from the water.",
      description: "Simple, comfortable rooms in the garden behind the river bungalows — the budget choice, with the same pool and river deck.",
      guests: 2,
      beds: "1 double or 2 twin beds",
      size: 24,
      view: "Garden",
      features: ["Air-conditioning", "Free Wi-Fi", "Private bathroom", "Hot shower"],
      images: [I.simple, I.goldRoom],
    },
    {
      slug: "family-bungalow",
      name: "Family Bungalow",
      summary: "Room for four, with the mountains across the river.",
      description: "Larger bungalows with a double and two singles, a deep terrace and a view across the water to Bokor.",
      guests: 4,
      beds: "1 double + 2 single beds",
      size: 42,
      view: "Bokor mountains",
      features: ["Private terrace", "Hammock", "Air-conditioning", "Free Wi-Fi"],
      images: [I.twinFan, I.deckPool],
    },
  ],
  "luxury/private-islands": [
    {
      slug: "beach-villa",
      name: "Beach Villa",
      summary: "Step off the terrace onto the sand.",
      description: "Villas set just behind the tree line, with the beach a few steps from the terrace and the reef a short swim out. Snorkel gear waits in the villa.",
      guests: 2,
      beds: "1 king bed",
      size: 80,
      view: "Beachfront",
      features: ["Private terrace", "Outdoor shower", "Air-conditioning", "Minibar", "Snorkelling gear"],
      images: [I.beachBungalow, I.overwater],
    },
    {
      slug: "jungle-villa",
      name: "Jungle Villa",
      summary: "Up in the trees, with a plunge pool and a view of the sea.",
      description: "Villas on the forested slope, reached by boardwalk, each with a plunge pool and the sea through the canopy.",
      guests: 2,
      beds: "1 king bed",
      size: 70,
      view: "Forest & sea",
      features: ["Plunge pool", "Private terrace", "Air-conditioning", "Bathtub", "Minibar"],
      images: [I.cabanas, I.suite],
    },
    {
      slug: "two-bedroom-villa",
      name: "Two-Bedroom Villa",
      summary: "For families or two couples travelling together.",
      description: "Two king bedrooms either side of a shared living room, with a pool and a long terrace on the beach.",
      guests: 4,
      beds: "2 king beds",
      size: 140,
      view: "Beachfront",
      features: ["Two bedrooms", "Plunge pool", "Private terrace", "Air-conditioning", "Minibar"],
      images: [I.deckPool, I.lounge],
    },
  ],
  "luxury/inner-island-villas": [
    {
      slug: "beachfront-villa",
      name: "Beachfront Villa",
      summary: "On the sand, thirty minutes from the mainland.",
      description: "Beachfront villas on the closer islands — the same sea and sand as the far ones, a much shorter boat ride.",
      guests: 2,
      beds: "1 king bed",
      size: 55,
      view: "Beachfront",
      features: ["Private terrace", "Outdoor shower", "Air-conditioning", "Free Wi-Fi"],
      images: [I.beachBungalow, I.seaResort],
    },
    {
      slug: "garden-bungalow",
      name: "Garden Bungalow",
      summary: "A shaded bungalow a minute back from the beach.",
      description: "Bungalows in the garden behind the beach — cooler in the afternoon, and room for a child on the extra bed.",
      guests: 3,
      beds: "1 king + 1 single bed",
      size: 40,
      view: "Garden",
      features: ["Private terrace", "Fan & air-conditioning", "Hot shower", "Free Wi-Fi"],
      images: [I.teakRoom, I.cabanas],
    },
  ],
  "eco-community/banteay-chhmar-homestay": homestayRooms(
    "Banteay Chhmar",
    "Dinner is cooked at the house, and breakfast before you walk to the temple.",
  ),
  "eco-community/koh-trong-homestay": homestayRooms(
    "Koh Trong",
    "Meals come from the island’s own gardens and the river.",
  ),
  "eco-community/chambok-cbet": homestayRooms(
    "Chambok",
    "Meals are cooked by the host family or the community kitchen.",
  ),
  "eco-community/sambor-prei-kuk-homestay": homestayRooms(
    "Sambor Prei Kuk",
    "Dinner is cooked at the house, a short walk from the brick towers.",
  ),
  "eco-community/evp": [
    {
      slug: "forest-bungalow",
      name: "Forest Bungalow",
      summary: "A wooden bungalow in the trees above the river.",
      description: "Simple wooden bungalows in the forest, with solar power, a mosquito net and a veranda. Meals are shared at the main lodge after the day with the elephants.",
      guests: 2,
      beds: "1 double bed with mosquito net",
      view: "Forest",
      features: ["Mosquito net", "Fan", "Solar power", "Meals included", "Shared bathroom"],
      images: [I.treetops, I.forestBridge],
    },
    {
      slug: "family-bungalow",
      name: "Family Bungalow",
      summary: "Room for four, same forest and the same simple comforts.",
      description: "A larger bungalow with a double and bunk beds, for families joining the elephant programme together.",
      guests: 4,
      beds: "1 double + 2 bunk beds",
      view: "Forest",
      features: ["Mosquito nets", "Fan", "Solar power", "Meals included"],
      images: [I.forestBridge, I.treetops],
    },
  ],
  "eco-community/osoam": [
    {
      slug: "community-lodge-room",
      name: "Community Lodge Room",
      summary: "A private room at the community centre, the base for treks.",
      description: "Plain rooms in the community-run centre at Osoam, where treks into the Cardamoms start and finish. Meals are cooked by the village.",
      guests: 2,
      beds: "Mattress with mosquito net",
      view: "Village",
      features: ["Mosquito net", "Fan", "Shared bathroom", "Home-cooked meals", "Local guide"],
      images: [I.village, I.riverTrees],
    },
    {
      slug: "group-room",
      name: "Group Room",
      summary: "A shared room for trekking groups.",
      description: "One large room with mattresses for a group heading out on a multi-day walk together.",
      guests: 6,
      beds: "Mattresses with mosquito nets",
      view: "Village",
      features: ["Mosquito nets", "Shared bathroom", "Home-cooked meals", "Guided treks"],
      images: [I.riverTrees, I.village],
    },
  ],
  "eco-community/andoung-kraloeng": [
    {
      slug: "forest-tent",
      name: "Forest Camp Tent",
      summary: "A tent at the Bunong camp, close to the gibbons.",
      description: "Tents with mattresses at the Bunong-run camp in Keo Seima, so you are already in the forest for the pre-dawn walk to the gibbons. Meals are cooked over the fire.",
      guests: 2,
      beds: "2 mattresses",
      view: "Forest",
      features: ["Tents provided", "Mosquito net", "Meals included", "Shared bathroom", "Guided treks"],
      images: [I.tent, I.campfire],
    },
  ],
  "mountain-waterfall/kirirom": [
    {
      slug: "tent-pitch",
      name: "Tent Pitch",
      summary: "A pitch in the pines — bring a tent or hire one.",
      description: "Camping in the pine forest on the plateau, cool enough at night for a jacket. Hire a tent locally or bring your own.",
      guests: 2,
      beds: "Tent (bring or hire)",
      view: "Pine forest",
      features: ["Camping ground", "Walking trails", "Parking"],
      images: [I.tent, I.pineRoad],
    },
    {
      slug: "group-camp",
      name: "Group Camp",
      summary: "Space for several tents and a fire.",
      description: "A larger pitch for groups, with space for several tents around a campfire.",
      guests: 8,
      beds: "Tents (bring or hire)",
      view: "Pine forest",
      features: ["Camping ground", "Campfire", "Walking trails", "Parking"],
      images: [I.campfire, I.pineRoad],
    },
  ],
  "mountain-waterfall/osoam": [
    {
      slug: "village-room",
      name: "Village Room",
      summary: "A room in the village before or after the trek.",
      description: "A simple room in the village for the nights either side of a trek into the range.",
      guests: 2,
      beds: "Mattress with mosquito net",
      view: "Village",
      features: ["Mosquito net", "Shared bathroom", "Home-cooked meals"],
      images: [I.village, I.riverTrees],
    },
    {
      slug: "trek-tent",
      name: "Trek Tent",
      summary: "The tent the guide pitches on multi-day walks.",
      description: "On overnight treks the guide carries and pitches the tents; you sleep by the river or on a ridge.",
      guests: 2,
      beds: "Tent with mats",
      view: "Cardamom forest",
      features: ["Tents provided", "Guided treks", "Home-cooked meals"],
      images: [I.tent, I.campfire],
    },
  ],
};

/** Each room's own photos first, then the stay's, without repeats. */
export const rooms: Record<string, Room[]> = Object.fromEntries(
  Object.entries(ROOMS).map(([key, list]) => [
    key,
    list.map((room) => ({
      ...room,
      images: [...new Set([...room.images, ...(STAY_PHOTOS[key] ?? [])])],
    })),
  ]),
);

/** "2 adults, 2 children" when the split is known, otherwise "Up to 4". */
export function guestLabel(room: Room) {
  if (room.adults === undefined) return `Up to ${room.guests}`;
  const adults = `${room.adults} ${room.adults === 1 ? "adult" : "adults"}`;
  if (!room.children) return adults;
  return `${adults}, ${room.children} ${room.children === 1 ? "child" : "children"}`;
}

export function getRooms(stayKey: string) {
  return rooms[stayKey] ?? [];
}

export function getRoom(stayKey: string, roomSlug: string) {
  return getRooms(stayKey).find((room) => room.slug === roomSlug);
}
