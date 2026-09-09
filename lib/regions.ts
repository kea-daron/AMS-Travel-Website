import { photo } from "@/lib/data";

/**
 * Region detail content.
 *
 * Each region carries its own category vocabulary and its own tag set — a
 * temple region filters by Temples and Bridges, a coastal one by Islands and
 * Mangroves — so the filter bar is built per region rather than shared.
 *
 * The Ancient Capitals entry (text, Khmer names, ratings, timeline) mirrors the
 * published reference page. The other eight are composed from real places and
 * provinces; their descriptions are editorial and they carry no ratings yet.
 * Coordinates are approximate centre points, good enough to place a pin.
 */
export type RegionDestination = {
  slug: string;
  name: string;
  nameKh?: string;
  province: string;
  category: string;
  /** Extra labels shown beside the category, e.g. Homestay, Trail. */
  tags?: string[];
  /** Values for the region's faceted filters, keyed by facet name. */
  facets?: Record<string, string>;
  blurb: string;
  rating?: number;
  featured?: boolean;
  verified?: boolean;
  unesco?: boolean;
  lat?: number;
  lng?: number;
  image: string;
};

export type RegionEra = {
  order: number;
  years: string;
  period: string;
  name: string;
  altName?: string;
  nameKh?: string;
  body: string;
};

export type RegionDetail = {
  slug: string;
  name: string;
  nameKh?: string;
  vision: string;
  visionKh?: string;
  tagline: string;
  coreIdentity: string;
  coreIdentityKh?: string;
  /** Only regions with a chronological spine carry a timeline. */
  timelineTitle?: string;
  timelineIntro?: string;
  timeline?: RegionEra[];
  categories: string[];
  /** The region's own search filter / tag vocabulary. */
  filterTags: string[];
  /**
   * Facet names for regions whose filters are single-select dimensions with
   * values (Century, King, …) rather than plain on/off tags. Options are
   * derived from the destinations themselves.
   */
  facets?: string[];
  destinations: RegionDestination[];
};

const img = {
  angkorWat: photo("1566706546199-a93ba33ce9f7", 800),
  taProhm: photo("1526324585411-e24d5ba61edd", 800),
  ruins: photo("1540525080980-b97c4be3c779", 800),
  ruinsTrees: photo("1609949165382-2e442783c8d5", 800),
  causeway: photo("1599283787923-51b965a58b05", 800),
  brickTower: photo("1651650191726-d81c3a84bb25", 800),
  civic: photo("1549463601-da058868e20d", 800),
  statue: photo("1541429464955-87bd98d6d8f8", 800),
  monk: photo("1522582451902-3545817f6046", 800),
  paleStatue: photo("1608137567874-5fef0c5e6741", 800),
  cityDay: photo("1635167463041-00f6d9344cda", 800),
  cityRiverNight: photo("1652802725832-67d5be09e5e3", 800),
  cityNight: photo("1711271314001-9654dc5d5e0a", 800),
  floatingVillage: photo("1704103259506-6c0ca4d6dca4", 800),
  boatPeople: photo("1704103258899-78a73254775a", 800),
  boatWoman: photo("1632496515914-da284239a1fd", 800),
  blueBoat: photo("1715520019930-b677fdca474d", 800),
  riverTrees: photo("1602604193553-28c132dac0a7", 800),
  waterfallForest: photo("1621502134035-2316a3e14904", 800),
  waterfallRock: photo("1621063225827-1e6cb6c75b62", 800),
  waterfallDeep: photo("1621063223871-72880cf5eb51", 800),
  waterfallWide: photo("1656554848715-dc195c7484bb", 800),
  riverForest: photo("1740724873371-0c05a17fa819", 800),
  palmBeach: photo("1616421310226-7453165b353e", 800),
  islandAerial: photo("1639192745319-e37cd8cd8374", 800),
  boatsShallow: photo("1674017062593-8d4e8e5f5be7", 800),
  pier: photo("1595781723824-9213a40e3257", 800),
  shoreline: photo("1509781847595-a430dc27c7af", 800),
  beachPalms: photo("1657027538728-0d4db32d87da", 800),
  jetty: photo("1582414004129-a955c6087f5e", 800),
  kampotNight: photo("1786954431605-f97ecd5ae5ae", 800),
  boatsMountains: photo("1661487906939-aea1f059b84f", 800),
  bokor: photo("1677209806836-54e9879c0c25", 800),
  pineRoad: photo("1599283415392-c1ad8110a147", 800),
  mountainCloud: photo("1575735003097-b786f5b0463b", 800),
  waterMountains: photo("1722054078069-095e86f88829", 800),
  forestWalkers: photo("1667371026189-dfd5544cfdf9", 800),
  forestBridge: photo("1667371026139-57d7d81918de", 800),
  dirtPath: photo("1667118891614-b0820e960b7b", 800),
  plateau: photo("1667371026114-f4ea09440d40", 800),
  treetops: photo("1781797538552-c8a1957a3272", 800),
  lakeDawn: photo("1787764082464-f5ee394cc907", 800),
  paddy: photo("1638402828376-5762cb098099", 800),
  riceAerial: photo("1571579544731-ed0957f498da", 800),
  dirtRoad: photo("1729963639012-5a6a48690ed4", 800),
  clockTower: photo("1707038346336-ce6789bce61d", 800),
  shophouse: photo("1654524786721-9990d1d64cf1", 800),
  townAerial: photo("1700155024603-771638efc72f", 800),
  jungleVillage: photo("1653714802676-6a50c7ead70e", 800),
  marketStall: photo("1787736366516-20788522776a", 800),
  streetFood: photo("1787736366638-82155215ab11", 800),
  soup: photo("1588566565463-180a5b2090d2", 800),
  resortPool: photo("1534009502677-4e5080efa8c6", 800),
  poolPalms: photo("1520250497591-112f2f40a3f4", 800),
  pathWater: photo("1623942201715-d89baec448cc", 800),
};

export const regionDetails: RegionDetail[] = [
  {
    slug: "ancient-capitals",
    name: "Ancient Capitals & Khmer Civilization",
    nameKh: "តំបន់អតីតរាជធានី និងអរិយធម៌ខ្មែរ",
    vision: "Discover the Rise of Khmer Civilization",
    visionKh: "ស្វែងយល់ពីការរុងរឿងនៃអរិយធម៌ខ្មែរ",
    tagline:
      "The center of Khmer civilization — from Mahendraparvata to Chaktomuk.",
    coreIdentity:
      "The historical heart of Khmer civilization — the line you can walk from one royal capital to the next, and with it the evolution of religion, architecture, public infrastructure, and cultural heritage from Chenla to the modern kingdom.",
    coreIdentityKh:
      "ជាបេះដូងប្រវត្តិសាស្ត្រនៃអរិយធម៌ខ្មែរ — ជាខ្សែដែលអ្នកអាចដើរតាមពីរាជធានីមួយទៅរាជធានីមួយទៀត និងតាមនោះឃើញការវិវឌ្ឍនៃសាសនា ស្ថាបត្យកម្ម ហេដ្ឋារចនាសម្ព័ន្ធសាធារណៈ និងបេតិកភណ្ឌវប្បធម៌ ចាប់ពីសម័យចេនឡារហូតដល់រាជាណាចក្របច្ចុប្បន្ន។",
    timelineTitle: "Historical Coverage",
    timelineIntro:
      "The succession of royal capitals this region is built around — read it top to bottom.",
    timeline: [
      {
        order: 1,
        years: "c. 600 – 700 CE",
        period: "Pre-Angkor Period",
        name: "Ishanapura",
        altName: "Sambor Prei Kuk",
        nameKh: "ឦសានបុរី",
        body: "Capital of Chenla under Isanavarman I, and the first place Khmer temple architecture settled into a form of its own.",
      },
      {
        order: 2,
        years: "802 – c. 835 CE",
        period: "Angkor Period",
        name: "Mahendraparvata",
        altName: "Phnom Kulen",
        nameKh: "មហេន្ទ្របវ៌ត",
        body: "The mountain city where Jayavarman II declared himself universal monarch in 802, the act that begins the Angkorian era.",
      },
      {
        order: 3,
        years: "c. 835 – 889 CE",
        period: "Angkor Period",
        name: "Hariharalaya",
        altName: "Roluos",
        nameKh: "ហរិហរាល័យ",
        body: "The plain below the mountain, where Indravarman I built the first state temple and the first great reservoir.",
      },
      {
        order: 4,
        years: "889 – c. 1431 CE",
        period: "Angkor Period",
        name: "Yasodharapura",
        altName: "Angkor",
        nameKh: "យសោធរបុរី",
        body: "Five centuries of capital on one site — Angkor Wat, Angkor Thom, and the largest pre-industrial city in the world.",
      },
      {
        order: 5,
        years: "928 – 944 CE",
        period: "Angkor Period",
        name: "Lingapura",
        altName: "Koh Ker",
        nameKh: "លិង្គបុរី",
        body: "Jayavarman IV moved the court a hundred kilometres north-east and raised a seven-tier pyramid. It lasted sixteen years.",
      },
      {
        order: 6,
        years: "1528 – 1594 CE",
        period: "Post-Angkor Period",
        name: "Longvek",
        nameKh: "លង្វែក",
        body: "The walled river capital of Ang Chan I, at the centre of Cambodia's maritime trade with China and the Malay world.",
      },
      {
        order: 7,
        years: "1618 – 1866 CE",
        period: "Post-Angkor Period",
        name: "Oudong",
        nameKh: "ឧដុង្គ",
        body: "Two and a half centuries of capital on a low ridge, crowned by the stupas of the kings buried there.",
      },
      {
        order: 8,
        years: "1866 CE – present",
        period: "Post-Angkor Period",
        name: "Chaktomuk",
        altName: "Phnom Penh",
        nameKh: "ចតុមុខ",
        body: "The capital returns to the four-rivers junction it first held in 1434. Norodom I builds the Royal Palace here in 1866.",
      },
    ],
    categories: [
      "Ancient Cities",
      "Temples",
      "Archaeological Sites",
      "Ancient Roads",
      "Bridges",
      "Hospitals",
      "Museums",
    ],
    filterTags: [
      "Century",
      "King",
      "Architecture Style",
      "UNESCO",
      "Religion",
      "Historical Period",
    ],
    facets: [
      "Century",
      "King",
      "Architecture Style",
      "UNESCO",
      "Religion",
      "Historical Period",
    ],
    destinations: [
      {
        slug: "angkor-wat",
        name: "Angkor Wat",
        nameKh: "អង្គរវត្ត",
        province: "Siem Reap",
        facets: { "Century": "12th Century", "King": "Suryavarman II", "Architecture Style": "Angkor Wat", "UNESCO": "World Heritage", "Religion": "Hindu", "Historical Period": "Angkor Period" },
        category: "Temples",
        blurb:
          "The world's largest religious monument and Cambodia's national symbol.",
        rating: 4.9,
        featured: true,
        verified: true,
        unesco: true,
        lat: 13.4125,
        lng: 103.867,
        image: img.angkorWat,
      },
      {
        slug: "bayon-temple",
        name: "Bayon Temple",
        nameKh: "ប្រាសាទបាយ័ន",
        province: "Siem Reap",
        facets: { "Century": "13th Century", "King": "Jayavarman VII", "Architecture Style": "Bayon", "UNESCO": "World Heritage", "Religion": "Buddhist", "Historical Period": "Angkor Period" },
        category: "Temples",
        blurb:
          "Two hundred serene stone faces at the exact center of Angkor Thom.",
        rating: 4.8,
        featured: true,
        verified: true,
        unesco: true,
        lat: 13.4413,
        lng: 103.859,
        image: img.statue,
      },
      {
        slug: "ta-prohm",
        name: "Ta Prohm",
        nameKh: "ប្រាសាទតាព្រហ្ម",
        province: "Siem Reap",
        facets: { "Century": "12th Century", "King": "Jayavarman VII", "Architecture Style": "Bayon", "UNESCO": "World Heritage", "Religion": "Buddhist", "Historical Period": "Angkor Period" },
        category: "Archaeological Sites",
        blurb:
          "A monastery left in the grip of silk-cotton roots, deliberately unrestored.",
        rating: 4.8,
        featured: true,
        verified: true,
        unesco: true,
        lat: 13.4348,
        lng: 103.889,
        image: img.taProhm,
      },
      {
        slug: "banteay-srei",
        name: "Banteay Srei",
        nameKh: "ប្រាសាទបន្ទាយស្រី",
        province: "Siem Reap",
        facets: { "Century": "10th Century", "King": "Rajendravarman II", "Architecture Style": "Banteay Srei", "UNESCO": "World Heritage", "Religion": "Hindu", "Historical Period": "Angkor Period" },
        category: "Temples",
        blurb:
          "Pink sandstone cut so finely the carvings still read a thousand years on.",
        rating: 4.7,
        verified: true,
        unesco: true,
        lat: 13.5989,
        lng: 103.9633,
        image: img.ruins,
      },
      {
        slug: "koh-ker",
        name: "Koh Ker",
        nameKh: "កោះកេរ្តិ៍",
        province: "Preah Vihear",
        facets: { "Century": "10th Century", "King": "Jayavarman IV", "Architecture Style": "Koh Ker", "UNESCO": "World Heritage", "Religion": "Hindu", "Historical Period": "Angkor Period" },
        category: "Archaeological Sites",
        blurb: "A capital for only twenty years, and a seven-tier pyramid to prove it.",
        rating: 4.6,
        verified: true,
        unesco: true,
        lat: 13.7833,
        lng: 104.5333,
        image: img.causeway,
      },
      {
        slug: "sambor-prei-kuk",
        name: "Sambor Prei Kuk",
        nameKh: "សំបូរព្រៃគុក",
        province: "Kampong Thom",
        facets: { "Century": "7th Century", "King": "Isanavarman I", "Architecture Style": "Pre-Angkorian", "UNESCO": "World Heritage", "Religion": "Hindu", "Historical Period": "Pre-Angkor Period" },
        category: "Archaeological Sites",
        blurb:
          "Pre-Angkorian brick towers of Ishanapura, older than Angkor by three centuries.",
        rating: 4.6,
        verified: true,
        unesco: true,
        lat: 12.8722,
        lng: 105.04,
        image: img.brickTower,
      },
      {
        slug: "royal-palace",
        name: "Royal Palace",
        nameKh: "ព្រះបរមរាជវាំង",
        province: "Phnom Penh",
        facets: { "Century": "19th Century", "King": "Norodom I", "Architecture Style": "Khmer Revival", "Religion": "Buddhist", "Historical Period": "Post-Angkor Period" },
        category: "Ancient Cities",
        blurb: "The working residence of the monarchy, and the Silver Pagoda beside it.",
        rating: 4.7,
        verified: true,
        lat: 11.564,
        lng: 104.931,
        image: img.cityDay,
      },
      {
        slug: "national-museum",
        name: "National Museum",
        nameKh: "សារមន្ទីរជាតិ",
        province: "Phnom Penh",
        facets: { "Century": "20th Century", "King": "Sisowath", "Architecture Style": "Khmer Revival", "Historical Period": "Post-Angkor Period" },
        category: "Museums",
        blurb:
          "The largest collection of Khmer sculpture, held in a terracotta pavilion.",
        rating: 4.7,
        verified: true,
        lat: 11.5652,
        lng: 104.929,
        image: img.civic,
      },
      {
        slug: "preah-vihear-temple",
        name: "Preah Vihear Temple",
        nameKh: "ប្រាសាទព្រះវិហារ",
        province: "Preah Vihear",
        facets: { "Century": "11th Century", "King": "Suryavarman I", "Architecture Style": "Khleang", "UNESCO": "World Heritage", "Religion": "Hindu", "Historical Period": "Angkor Period" },
        category: "Temples",
        blurb:
          "A temple laid along an 800-metre axis on the cliff edge of the Dangrek range.",
        rating: 4.8,
        featured: true,
        verified: true,
        unesco: true,
        lat: 14.3931,
        lng: 104.68,
        image: img.ruinsTrees,
      },
      {
        slug: "spean-praptos",
        name: "Spean Praptos",
        nameKh: "ស្ពានព្រះប្ដោស",
        province: "Siem Reap",
        facets: { "Century": "12th Century", "King": "Jayavarman VII", "Architecture Style": "Bayon", "Historical Period": "Angkor Period" },
        category: "Bridges",
        blurb:
          "The longest surviving Angkorian corbel-arch bridge, still carrying traffic after eight hundred years.",
        rating: 4.4,
        verified: true,
        lat: 13.2833,
        lng: 104.2333,
        image: img.pathWater,
      },
      {
        slug: "angkorian-royal-road",
        name: "Angkorian Royal Road",
        nameKh: "ផ្លូវរាជបុរាណអង្គរ",
        province: "Preah Vihear",
        facets: { "Century": "12th Century", "King": "Jayavarman VII", "Historical Period": "Angkor Period" },
        category: "Ancient Roads",
        blurb:
          "The 225 km highway east from Angkor to Bakan, with its bridges, fire houses, and hospital chapels.",
        rating: 4.3,
        verified: true,
        image: img.dirtRoad,
      },
      {
        slug: "preah-khan-kompong-svay",
        name: "Preah Khan of Kompong Svay",
        nameKh: "ប្រាសាទព្រះខ័នកំពង់ស្វាយ",
        province: "Preah Vihear",
        facets: { "Century": "12th Century", "King": "Jayavarman VII", "Architecture Style": "Bayon", "Religion": "Buddhist", "Historical Period": "Angkor Period" },
        category: "Hospitals",
        blurb:
          "The largest temple enclosure the Khmer empire ever walled, with one of its best-preserved hospital chapels.",
        rating: 4.5,
        verified: true,
        lat: 13.4167,
        lng: 104.9167,
        image: img.paleStatue,
      },
      {
        slug: "phnom-kulen",
        name: "Phnom Kulen",
        nameKh: "ភ្នំគូលែន",
        province: "Siem Reap",
        facets: { "Century": "9th Century", "King": "Jayavarman II", "Architecture Style": "Kulen", "Religion": "Hindu", "Historical Period": "Angkor Period" },
        category: "Archaeological Sites",
        tags: ["Waterfalls", "Hiking", "Trail", "Landscape"],
        blurb: "The sacred mountain where the Khmer Empire was declared in 802 CE.",
        rating: 4.6,
        verified: true,
        lat: 13.5833,
        lng: 104.05,
        image: img.waterfallWide,
      },
      {
        slug: "banteay-chhmar",
        name: "Banteay Chhmar",
        nameKh: "បន្ទាយឆ្មារ",
        province: "Banteay Meanchey",
        facets: { "Century": "12th Century", "King": "Jayavarman VII", "Architecture Style": "Bayon", "UNESCO": "Tentative List", "Religion": "Buddhist", "Historical Period": "Angkor Period" },
        category: "Archaeological Sites",
        tags: ["Homestay", "Community", "Local Food"],
        blurb:
          "A vast Jayavarman VII temple city in the north-west, with a community homestay inside the village beside it.",
        verified: true,
        lat: 14.0333,
        lng: 103.0833,
        image: img.monk,
      },
    ],
  },
  {
    slug: "northeastern-civilization",
    name: "Northeastern Civilization",
    vision: "Meet the Highlands on Their Own Terms",
    tagline: "Crater lakes, forest and indigenous country east of the Mekong.",
    coreIdentity:
      "The upland provinces where Bunong, Tampuan, Jarai and Kreung communities have their own languages, calendars and forests — a part of Cambodia the temple trail never reaches.",
    categories: ["Indigenous Culture", "Volcano Lake", "Forest", "Wildlife", "Waterfall", "Sacred Mountain", "Adventure", "Coffee"],
    filterTags: ["Tribe", "Forest", "Elephant", "Camping", "Birding", "Sesan", "Srepok"],
    destinations: [
      { slug: "yeak-laom", name: "Yeak Laom Crater Lake", province: "Ratanakiri", category: "Volcano Lake", tags: ["Tribe", "Forest"], blurb: "A near-perfect volcanic crater held by the Tampuan community, clear enough to swim all year.", verified: true, featured: true, lat: 13.7333, lng: 107.0167, image: img.lakeDawn },
      { slug: "bou-sra", name: "Bou Sra Waterfall", province: "Mondulkiri", category: "Waterfall", tags: ["Forest"], blurb: "Two tiers dropping into Bunong forest, loudest at the end of the rains.", verified: true, featured: true, lat: 12.5333, lng: 107.3667, image: img.waterfallRock },
      { slug: "sen-monorom", name: "Sen Monorom & Bunong Villages", province: "Mondulkiri", category: "Indigenous Culture", tags: ["Tribe", "Camping"], blurb: "The highland town and the villages around it, where Bunong is still the first language.", verified: true, lat: 12.45, lng: 107.1833, image: img.plateau },
      { slug: "virachey", name: "Virachey National Park", province: "Ratanakiri", category: "Forest", tags: ["Camping", "Birding", "Sesan"], blurb: "Multi-day ranger-led treks into one of the least-visited protected areas in the country.", verified: true, lat: 14.05, lng: 107.05, image: img.forestWalkers },
      { slug: "katieng-waterfalls", name: "Katieng & Kachanh Waterfalls", province: "Ratanakiri", category: "Waterfall", tags: ["Forest"], blurb: "Two short rides out of Banlung, both with a path behind the curtain of water.", verified: true, lat: 13.7167, lng: 106.95, image: img.waterfallDeep },
      { slug: "banlung-market", name: "Banlung Market", province: "Ratanakiri", category: "Indigenous Culture", tags: ["Tribe"], blurb: "Highland produce, backstrap weaving and the red dust the province is known for.", verified: true, lat: 13.7394, lng: 106.9873, image: img.marketStall },
      { slug: "ratanakiri-coffee", name: "Ratanakiri Coffee Farms", province: "Ratanakiri", category: "Coffee", tags: ["Forest", "Tribe"], blurb: "Robusta and arabica grown on basalt soil, roasted and poured in Banlung.", verified: true, lat: 13.7, lng: 107.0, image: img.jungleVillage },
      { slug: "elephant-valley", name: "Elephant Valley Project", province: "Mondulkiri", category: "Wildlife", tags: ["Elephant", "Forest"], blurb: "Retired working elephants observed in forest rather than ridden, run with Bunong mahouts.", verified: true, lat: 12.4, lng: 107.15, image: img.forestBridge },
      { slug: "phnom-prich", name: "Phnom Prich Wildlife Sanctuary", province: "Mondulkiri", category: "Wildlife", tags: ["Birding", "Forest", "Srepok"], blurb: "Dry forest and grassland holding gaur, banteng and some of the last wild cattle herds.", verified: true, lat: 12.6, lng: 106.8, image: img.treetops },
      { slug: "sesan-srepok", name: "Sesan & Srepok Rivers", province: "Stung Treng", category: "Adventure", tags: ["Sesan", "Srepok", "Camping"], blurb: "The two highland rivers that carry the northeast down to the Mekong, run by longtail and kayak.", verified: true, lat: 13.5259, lng: 105.9683, image: img.blueBoat },
      { slug: "phnom-doh-kromom", name: "Phnom Doh Kromom", province: "Ratanakiri", category: "Sacred Mountain", tags: ["Forest"], blurb: "A hilltop pagoda above Banlung, and the province's standing sunset spot.", verified: true, lat: 13.75, lng: 106.9667, image: img.mountainCloud },
    ],
  },
  {
    slug: "mekong-tonle-sap",
    name: "Mekong & Tonle Sap Civilization",
    vision: "Life Written by the Water",
    tagline: "The lake that reverses, and the river that feeds it.",
    coreIdentity:
      "A whole culture built on a flood pulse — villages that float, forests that spend half the year underwater, and fishing grounds that move with the season.",
    categories: ["Floating Village", "Fishing", "Bird Sanctuary", "River Island", "Rice", "Community", "Boat Trip", "Sunset"],
    filterTags: ["Boat", "Bird", "Fishing", "Lotus", "Rice", "Island", "Wetland", "Festival"],
    destinations: [
      { slug: "kampong-phluk", name: "Kampong Phluk", province: "Siem Reap", category: "Floating Village", tags: ["Boat", "Wetland"], blurb: "Houses on ten-metre stilts, reached by boat through flooded mangrove.", verified: true, featured: true, lat: 13.1833, lng: 103.9833, image: img.floatingVillage },
      { slug: "kampong-khleang", name: "Kampong Khleang", province: "Siem Reap", category: "Floating Village", tags: ["Boat", "Fishing"], blurb: "The largest lakeside settlement, and far quieter than the villages nearer town.", verified: true, lat: 13.1167, lng: 104.1167, image: img.boatPeople },
      { slug: "chong-kneas", name: "Chong Kneas", province: "Siem Reap", category: "Boat Trip", tags: ["Boat", "Fishing"], blurb: "The closest landing to Siem Reap and the start of the boat crossing to Battambang.", verified: true, lat: 13.2333, lng: 103.8333, image: img.boatWoman },
      { slug: "prek-toal", name: "Prek Toal Bird Sanctuary", province: "Battambang", category: "Bird Sanctuary", tags: ["Bird", "Wetland", "Boat"], blurb: "The most important waterbird colony in South-East Asia, best at first light.", verified: true, featured: true, lat: 13.15, lng: 103.6333, image: img.riverTrees },
      { slug: "kampi-dolphins", name: "Kampi Dolphin Pool", province: "Kratié", category: "Boat Trip", tags: ["Boat"], blurb: "One of the last deep pools holding Irrawaddy dolphins on the Mekong.", verified: true, lat: 12.5667, lng: 106.0333, image: img.blueBoat },
      { slug: "koh-trong", name: "Koh Trong", province: "Kratié", category: "River Island", tags: ["Island", "Rice"], blurb: "A sandbank island opposite Kratié, circled in an hour by bicycle.", verified: true, lat: 12.4667, lng: 106.0167, image: img.pathWater },
      { slug: "koh-dach", name: "Koh Dach (Silk Island)", province: "Kandal", category: "River Island", tags: ["Island", "Boat"], blurb: "Silk looms under stilt houses, a short ferry from the edge of Phnom Penh.", verified: true, lat: 11.6333, lng: 104.95, image: img.paddy },
      { slug: "stung-treng-ramsar", name: "Stung Treng Ramsar Site", province: "Stung Treng", category: "Fishing", tags: ["Wetland", "Fishing", "Boat"], blurb: "Braided channels and seasonally flooded forest running north to the Lao border.", verified: true, lat: 13.7, lng: 105.95, image: img.riverForest },
      { slug: "kandal-rice-plains", name: "Kandal Rice Plains", province: "Kandal", category: "Rice", tags: ["Rice", "Lotus"], blurb: "Paddy and lotus ponds on the floodplain either side of the capital.", verified: true, lat: 11.4833, lng: 104.9333, image: img.riceAerial },
      { slug: "water-festival", name: "Bon Om Touk (Water Festival)", province: "Phnom Penh", category: "Community", tags: ["Festival", "Boat"], blurb: "Longboat racing on the river each November, when the Tonle Sap turns back around.", verified: true, lat: 11.57, lng: 104.93, image: img.cityRiverNight },
      { slug: "tonle-sap-sunset", name: "Tonle Sap Sunset Boats", province: "Siem Reap", category: "Sunset", tags: ["Boat", "Lotus"], blurb: "The lake edge at the end of the day, when the fishing fleet goes out.", verified: true, lat: 13.2, lng: 103.85, image: img.boatsShallow },
    ],
  },
  {
    slug: "mountain-waterfall",
    name: "Mountain & Waterfall Region",
    vision: "Cool Air and Falling Water",
    tagline: "Cardamom ridgelines, plateau pine and the falls after the rains.",
    coreIdentity:
      "The high ground of the south-west and the water that comes off it — rainforest massifs, a French hill station in the cloud, and cascades that only truly run for half the year.",
    categories: ["Mountain", "National Park", "Waterfall", "Cave", "Trekking", "Camping", "Cycling", "Viewpoint", "Photography"],
    filterTags: ["Hiking", "Sunrise", "Sunset", "Camping", "Trail", "Peak", "Landscape"],
    destinations: [
      { slug: "bokor", name: "Bokor National Park", province: "Kampot", category: "National Park", tags: ["Landscape", "Sunset"], blurb: "An abandoned hill station on a plateau that makes its own weather.", verified: true, featured: true, lat: 10.6333, lng: 104.0167, image: img.bokor },
      { slug: "kirirom", name: "Kirirom National Park", province: "Kampong Speu", category: "Camping", tags: ["Camping", "Trail", "Landscape"], blurb: "Pine forest cool enough to need a jacket, two hours from Phnom Penh.", verified: true, lat: 11.3167, lng: 104.05, image: img.pineRoad },
      { slug: "cardamoms", name: "Central Cardamom Mountains", province: "Koh Kong", category: "Mountain", tags: ["Trail", "Landscape"], blurb: "The largest rainforest left in mainland South-East Asia, and still being surveyed.", verified: true, featured: true, lat: 11.9, lng: 103.3, image: img.riverForest },
      { slug: "tatai", name: "Tatai Waterfall", province: "Koh Kong", category: "Waterfall", tags: ["Trail"], blurb: "A wide, low fall reached by boat up the Tatai river, swimmable outside the wet season.", verified: true, lat: 11.5333, lng: 103.1, image: img.waterfallForest },
      { slug: "popokvil", name: "Popokvil Falls", province: "Kampot", category: "Waterfall", tags: ["Hiking"], blurb: "Two drops on the Bokor plateau, thunderous in September and dry by March.", verified: true, lat: 10.65, lng: 104.0333, image: img.waterfallDeep },
      { slug: "phnom-aural", name: "Phnom Aural", province: "Kampong Speu", category: "Trekking", tags: ["Peak", "Hiking", "Camping"], blurb: "The highest peak in Cambodia at 1,813m, a hard two-day climb with a guide.", verified: true, lat: 12.0333, lng: 104.1667, image: img.mountainCloud },
      { slug: "chi-phat", name: "Chi Phat", province: "Koh Kong", category: "Cycling", tags: ["Trail", "Camping"], blurb: "A former logging village turned trekking base, run by the community that lives there.", verified: true, lat: 11.3167, lng: 103.4667, image: img.jungleVillage },
      { slug: "kulen-falls", name: "Phnom Kulen Waterfalls", province: "Siem Reap", category: "Waterfall", tags: ["Hiking", "Trail"], blurb: "The falls on the sacred mountain, busy at weekends and empty on a weekday morning.", verified: true, lat: 13.5833, lng: 104.05, image: img.waterfallWide },
      { slug: "phnom-chhngok", name: "Phnom Chhngok Cave Temple", province: "Kampot", category: "Cave", tags: ["Hiking"], blurb: "A seventh-century brick shrine standing inside a limestone cave, reached by ladder.", verified: true, lat: 10.7, lng: 104.25, image: img.brickTower },
      { slug: "phnom-sampeau", name: "Phnom Sampeau", province: "Battambang", category: "Viewpoint", tags: ["Sunset", "Landscape"], blurb: "The bat cave empties in a ribbon at dusk, watched from the road below.", verified: true, lat: 13.0333, lng: 103.1333, image: img.townAerial },
      { slug: "phnom-bok", name: "Phnom Bok", province: "Siem Reap", category: "Photography", tags: ["Sunrise", "Peak", "Landscape"], blurb: "Six hundred steps to a ninth-century hilltop temple, and the plain at first light.", verified: true, lat: 13.4667, lng: 104.05, image: img.ruinsTrees },
    ],
  },
  {
    slug: "coastal-island",
    name: "Coastal & Island Region",
    vision: "The Gulf, Island by Island",
    tagline: "Fishing ports, mangrove estuaries and a boat ride offshore.",
    coreIdentity:
      "Cambodia's 440 km of Gulf coastline and the islands off it — from resort bays to islands with one generator, plus the mangrove systems that hold the whole coast together.",
    categories: ["Beach", "Island", "Coral", "Diving", "Seafood", "Mangrove", "Cruise", "Snorkeling"],
    filterTags: ["Beach", "Island", "Luxury Resort", "Diving", "Kayak"],
    destinations: [
      { slug: "koh-rong-sanloem", name: "Koh Rong Sanloem", province: "Preah Sihanouk", category: "Island", tags: ["Beach", "Island"], blurb: "Saracen Bay for the sand, Lazy Beach for the sunset, plankton after dark.", verified: true, featured: true, lat: 10.6058, lng: 103.3167, image: img.islandAerial },
      { slug: "koh-rong", name: "Koh Rong", province: "Preah Sihanouk", category: "Island", tags: ["Beach", "Island"], blurb: "The bigger, louder sister island, with jungle trails to empty beaches on the far side.", verified: true, lat: 10.7167, lng: 103.25, image: img.palmBeach },
      { slug: "koh-ta-kiev", name: "Koh Ta Kiev", province: "Preah Sihanouk", category: "Island", tags: ["Island", "Kayak"], blurb: "Near-shore and barely developed — hammocks, generators and no road.", verified: true, lat: 10.5333, lng: 103.6, image: img.beachPalms },
      { slug: "otres", name: "Otres Beach", province: "Preah Sihanouk", category: "Beach", tags: ["Beach"], blurb: "The long quiet strip south of Sihanoukville, best in the late afternoon.", verified: true, lat: 10.5833, lng: 103.5167, image: img.shoreline },
      { slug: "kep-beach", name: "Kep & the Crab Market", province: "Kep", category: "Seafood", tags: ["Beach"], blurb: "Crab straight off the boats, cooked with green Kampot pepper.", verified: true, featured: true, lat: 10.4833, lng: 104.3167, image: img.jetty },
      { slug: "koh-tonsay", name: "Koh Tonsay (Rabbit Island)", province: "Kep", category: "Island", tags: ["Island", "Beach"], blurb: "Twenty minutes off Kep, with a single beach and a row of wooden bungalows.", verified: true, lat: 10.4333, lng: 104.3833, image: img.boatsShallow },
      { slug: "peam-krasop", name: "Peam Krasop Mangroves", province: "Koh Kong", category: "Mangrove", tags: ["Kayak"], blurb: "A kilometre of boardwalk through standing mangrove, with a tower at the end.", verified: true, lat: 11.5833, lng: 102.9333, image: img.riverForest },
      { slug: "koh-kong-island", name: "Koh Kong Island", province: "Koh Kong", category: "Beach", tags: ["Island", "Beach"], blurb: "Seven beaches on the country's largest island, an hour by boat and rarely busy.", verified: true, lat: 11.3333, lng: 102.9333, image: img.pier },
      { slug: "koh-seh", name: "Koh Seh Marine Reserve", province: "Kep", category: "Coral", tags: ["Diving", "Island"], blurb: "A conservation base rebuilding seagrass and reef in the Kep archipelago.", verified: true, lat: 10.35, lng: 104.35, image: img.boatsShallow },
      { slug: "koh-tang", name: "Koh Tang Dive Sites", province: "Preah Sihanouk", category: "Diving", tags: ["Diving", "Island"], blurb: "The clearest water in Cambodian waters, four hours offshore on a liveaboard.", verified: true, lat: 10.2833, lng: 103.1, image: img.islandAerial },
      { slug: "sanloem-reefs", name: "Sanloem Reef Snorkeling", province: "Preah Sihanouk", category: "Snorkeling", tags: ["Diving", "Beach", "Island"], blurb: "Shallow coral off the north of the island, swimmable straight from the sand.", verified: true, lat: 10.62, lng: 103.31, image: img.boatsShallow },
      { slug: "gulf-cruises", name: "Gulf Sunset Cruises", province: "Preah Sihanouk", category: "Cruise", tags: ["Island", "Luxury Resort"], blurb: "Evening sailings out through the archipelago, most leaving from Otres.", verified: true, lat: 10.59, lng: 103.5, image: img.shoreline },
    ],
  },
  {
    slug: "urban-nightlife",
    name: "Urban Lifestyle & Nightlife",
    vision: "The Cities After Dark",
    tagline: "Rooftops, night markets and kitchens that stay open late.",
    coreIdentity:
      "What the towns do once the heat drops — riverside promenades, night markets, live music in converted shophouses, and a bar scene that runs from plastic stools to rooftops.",
    categories: ["City Walk", "Night Market", "Coffee", "Sky Bar", "Shopping", "Art Gallery", "Street Food"],
    filterTags: ["Cafe", "Night Life", "Shopping", "Music", "Food", "Architecture"],
    destinations: [
      { slug: "sisowath-quay", name: "Sisowath Quay", province: "Phnom Penh", category: "City Walk", tags: ["Architecture", "Food"], blurb: "The two-kilometre promenade along the Tonle Sap, at its best an hour before dark.", verified: true, featured: true, lat: 11.57, lng: 104.93, image: img.cityRiverNight },
      { slug: "pp-rooftops", name: "Phnom Penh Rooftop Bars", province: "Phnom Penh", category: "Sky Bar", tags: ["Night Life", "Music"], blurb: "The view over the four rivers from the top of the city's newer towers.", verified: true, featured: true, lat: 11.5564, lng: 104.9282, image: img.cityNight },
      { slug: "pp-night-market", name: "Phnom Penh Night Market", province: "Phnom Penh", category: "Night Market", tags: ["Food", "Shopping"], blurb: "Weekend stalls by the river where everyone eats sitting on mats.", verified: true, lat: 11.575, lng: 104.925, image: img.streetFood },
      { slug: "bassac-lane", name: "Bassac Lane", province: "Phnom Penh", category: "Street Food", tags: ["Night Life", "Food", "Music"], blurb: "A run of tiny owner-run bars and kitchens off Street 308.", verified: true, lat: 11.55, lng: 104.925, image: img.streetFood },
      { slug: "street-240", name: "Street 240", province: "Phnom Penh", category: "Coffee", tags: ["Cafe", "Shopping", "Architecture"], blurb: "Cafés and small boutiques along the shophouse row behind the Royal Palace.", verified: true, lat: 11.5605, lng: 104.9245, image: img.shophouse },
      { slug: "russian-market", name: "Russian & Central Markets", province: "Phnom Penh", category: "Shopping", tags: ["Shopping", "Architecture"], blurb: "The 1937 art-deco dome, and the tighter, hotter aisles of Toul Tom Poung.", verified: true, lat: 11.5533, lng: 104.9203, image: img.marketStall },
      { slug: "pub-street", name: "Pub Street", province: "Siem Reap", category: "Street Food", tags: ["Night Life", "Music", "Food"], blurb: "Loud, cheap and unavoidable — with quieter lanes one block either side.", verified: true, lat: 13.355, lng: 103.855, image: img.marketStall },
      { slug: "angkor-night-market", name: "Angkor Night Market", province: "Siem Reap", category: "Night Market", tags: ["Shopping"], blurb: "The original of the town's night markets, still the best for silk and silver.", verified: true, lat: 13.35, lng: 103.85, image: img.marketStall },
      { slug: "kampot-riverside", name: "Kampot Riverside", province: "Kampot", category: "City Walk", tags: ["Night Life", "Cafe"], blurb: "Sunset boats and a strip of low-key bars along the Praek Tuek Chhu.", verified: true, lat: 10.61, lng: 104.181, image: img.kampotNight },
      { slug: "battambang-arts", name: "Battambang Art Scene", province: "Battambang", category: "Art Gallery", tags: ["Architecture", "Music"], blurb: "Gallery spaces in colonial shophouses, and the Phare circus school that started here.", verified: true, lat: 13.0957, lng: 103.2022, image: img.shophouse },
    ],
  },
  {
    slug: "khmer-culinary",
    name: "Khmer Culinary Region",
    vision: "Eat Your Way Across the Country",
    tagline: "Prahok and pepper, market breakfasts and producer visits.",
    coreIdentity:
      "Cambodian food where it is actually made — the pepper terraces, the palm-sugar kilns, the fermenting jars of prahok, and the provincial dishes that never travelled to the capital.",
    categories: ["Traditional Food", "Michelin", "Street Food", "Fine Dining", "Cooking Class", "Farm"],
    filterTags: ["Khmer Curry", "Fish Amok", "Num Banh Chok", "Pepper Rice Wine", "Palm Sugar"],
    destinations: [
      { slug: "kampot-pepper", name: "Kampot Pepper Farms", province: "Kampot", category: "Farm", tags: ["Pepper Rice Wine"], blurb: "Protected-origin pepper terraces you can walk, taste and buy at the source.", verified: true, featured: true, lat: 10.65, lng: 104.25, image: img.boatsMountains },
      { slug: "central-market", name: "Psar Thmei (Central Market)", province: "Phnom Penh", category: "Street Food", tags: ["Num Banh Chok"], blurb: "The 1937 art-deco dome, and the best kuy teav counters are around its edges.", verified: true, lat: 11.5697, lng: 104.921, image: img.marketStall },
      { slug: "kep-crab", name: "Kep Crab Market", province: "Kep", category: "Traditional Food", tags: ["Khmer Curry"], blurb: "Blue swimmer crab, green pepper, and a queue that moves fast.", verified: true, featured: true, lat: 10.4833, lng: 104.3167, image: img.jetty },
      { slug: "palm-sugar", name: "Palm Sugar Kilns", province: "Kampong Speu", category: "Farm", tags: ["Palm Sugar"], blurb: "Sugar palms tapped at dawn and boiled down by the roadside all morning.", verified: true, lat: 11.45, lng: 104.5167, image: img.paddy },
      { slug: "siem-reap-cooking", name: "Siem Reap Cooking Schools", province: "Siem Reap", category: "Cooking Class", tags: ["Fish Amok", "Khmer Curry"], blurb: "Market shop, then amok and prahok ktis in a half-day, in a dozen kitchens around town.", verified: true, lat: 13.3622, lng: 103.86, image: img.soup },
      { slug: "skun", name: "Skun Market", province: "Kampong Cham", category: "Street Food", tags: [], blurb: "The famous fried tarantula stop on the road east — and much better sticky rice.", verified: true, lat: 11.8167, lng: 105.0333, image: img.streetFood },
      { slug: "battambang-rice", name: "Battambang Rice Country", province: "Battambang", category: "Farm", tags: ["Palm Sugar"], blurb: "The country's rice bowl, with bamboo sticky rice grilled along the roads out of town.", verified: true, lat: 13.0957, lng: 103.2022, image: img.riceAerial },
      { slug: "prahok-kampong-thom", name: "Prahok Season, Kampong Thom", province: "Kampong Thom", category: "Traditional Food", tags: ["Khmer Curry"], blurb: "Fish paste made in the open each December, and the smell that comes with it.", verified: true, lat: 12.7111, lng: 104.8889, image: img.boatWoman },
      { slug: "num-banh-chok", name: "Num Banh Chok Mornings", province: "Siem Reap", category: "Traditional Food", tags: ["Num Banh Chok"], blurb: "Rice noodles under green fish gravy, sold from baskets before eight in the morning.", verified: true, lat: 13.3622, lng: 103.86, image: img.soup },
      { slug: "pp-fine-dining", name: "Modern Khmer Fine Dining", province: "Phnom Penh", category: "Fine Dining", tags: ["Fish Amok", "Khmer Curry"], blurb: "Tasting menus rebuilding Khmer dishes from the provinces, several run as training restaurants.", verified: true, lat: 11.5564, lng: 104.9282, image: img.soup },
      { slug: "guide-listed", name: "Guide-listed Kitchens", province: "Phnom Penh", category: "Michelin", tags: ["Fish Amok"], blurb: "The capital's rooms that appear in international restaurant guides.", verified: true, lat: 11.56, lng: 104.928, image: img.soup },
    ],
  },
  {
    slug: "eco-community",
    name: "Eco-Community Tourism",
    vision: "Travel That Stays in the Village",
    tagline: "Homestays, community forests and locally run enterprises.",
    coreIdentity:
      "Community-based tourism where the enterprise is owned locally — village homestays, ranger and guide work replacing logging income, and conservation projects you can actually stay at.",
    categories: ["Homestay", "Village", "Craft", "Agriculture", "Eco Lodge", "Bird Watching", "Local Guide"],
    filterTags: ["Homestay", "Community", "Cycling", "Farm", "Local Food", "Fishing"],
    destinations: [
      { slug: "chi-phat-cbet", name: "Chi Phat CBET", province: "Koh Kong", category: "Local Guide", tags: ["Homestay", "Community"], blurb: "The country's best-known community ecotourism project, run by former loggers.", verified: true, featured: true, lat: 11.3167, lng: 103.4667, image: img.jungleVillage },
      { slug: "banteay-chhmar-homestay", name: "Banteay Chhmar Homestay", province: "Banteay Meanchey", category: "Homestay", tags: ["Homestay", "Community", "Local Food"], blurb: "Sleep in the village beside a Jayavarman VII temple city, with dinner cooked at the house.", verified: true, featured: true, lat: 14.0333, lng: 103.0833, image: img.monk },
      { slug: "prek-toal-cbet", name: "Prek Toal Community", province: "Battambang", category: "Bird Watching", tags: ["Community", "Fishing"], blurb: "Former egg collectors now guard the colony and guide the boats into it.", verified: true, lat: 13.15, lng: 103.6333, image: img.riverTrees },
      { slug: "areng-valley", name: "Areng Valley", province: "Koh Kong", category: "Village", tags: ["Community", "Homestay"], blurb: "A valley the community kept from being dammed, now open for stays and river trips.", verified: true, lat: 11.5, lng: 103.3, image: img.riverForest },
      { slug: "evp", name: "Elephant Valley Project", province: "Mondulkiri", category: "Eco Lodge", tags: ["Community"], blurb: "Retired elephants in forest, with Bunong mahouts employed to walk with them.", verified: true, lat: 12.4, lng: 107.15, image: img.forestBridge },
      { slug: "koh-trong-homestay", name: "Koh Trong Homestays", province: "Kratié", category: "Homestay", tags: ["Homestay", "Cycling", "Farm"], blurb: "Family houses on a Mekong sandbank island, reached by the little ferry from Kratié.", verified: true, lat: 12.4667, lng: 106.0167, image: img.pathWater },
      { slug: "silk-cooperatives", name: "Silk Weaving Cooperatives", province: "Takéo", category: "Craft", tags: ["Community"], blurb: "Golden-silk weaving villages where the whole chain, worm to cloth, is on one street.", verified: true, lat: 10.9833, lng: 104.7833, image: img.paddy },
      { slug: "kampong-phluk-cbet", name: "Kampong Phluk Boat Cooperative", province: "Siem Reap", category: "Village", tags: ["Fishing", "Community", "Local Food"], blurb: "Village-run rowing boats into the flooded forest, rather than the big tour launches.", verified: true, lat: 13.1833, lng: 103.9833, image: img.floatingVillage },
      { slug: "community-farms", name: "Community Rice Farms", province: "Battambang", category: "Agriculture", tags: ["Farm", "Community", "Cycling"], blurb: "Farm stays in the rice belt, with the day's work starting well before the heat.", verified: true, lat: 13.05, lng: 103.25, image: img.riceAerial },
    ],
  },
  {
    slug: "luxury",
    name: "Luxury Tourism",
    vision: "The Slower, Quieter Version",
    tagline: "Boutique retreats, private guides and time to do less.",
    coreIdentity:
      "The same country at a different pace — small boutique properties, private guiding by people who read the inscriptions, and the space to see Angkor at dawn without the crowd.",
    categories: ["Luxury Hotel", "Private Island", "Golf", "Helicopter", "Yacht", "Private Guide", "Fine Dining", "Spa", "VIP Tour"],
    filterTags: ["Luxury", "5 Stars", "Private", "Exclusive", "Helicopter", "Golf Spa"],
    destinations: [
      { slug: "siem-reap-boutique", name: "Siem Reap Boutique Stays", province: "Siem Reap", category: "Luxury Hotel", tags: ["Luxury", "5 Stars"], blurb: "Small properties in the lanes off Wat Bo, most under thirty rooms.", verified: true, featured: true, lat: 13.3563, lng: 103.8622, image: img.resortPool },
      { slug: "private-islands", name: "Private Island Retreats", province: "Preah Sihanouk", category: "Private Island", tags: ["Exclusive", "Private", "Luxury"], blurb: "Whole-island properties in the Koh Rong archipelago, reached by private launch.", verified: true, featured: true, lat: 10.6667, lng: 103.25, image: img.poolPalms },
      { slug: "angkor-private-guiding", name: "Angkor Private Guiding", province: "Siem Reap", category: "Private Guide", tags: ["Private", "Exclusive"], blurb: "Licensed guides who work from the inscriptions, on your schedule rather than a coach's.", verified: true, lat: 13.4125, lng: 103.867, image: img.angkorWat },
      { slug: "mekong-cruises", name: "Mekong River Cruises", province: "Kandal", category: "Yacht", tags: ["Luxury", "Private"], blurb: "Cabin cruises between Phnom Penh, the Tonle Sap and the delta below the border.", verified: true, lat: 11.6, lng: 104.95, image: img.blueBoat },
      { slug: "kampot-retreats", name: "Kampot Riverside Retreats", province: "Kampot", category: "Spa", tags: ["Luxury", "Private"], blurb: "Low-key riverside properties with the Bokor range behind them.", verified: true, lat: 10.6, lng: 104.16, image: img.boatsMountains },
      { slug: "pp-fine-dining", name: "Phnom Penh Fine Dining", province: "Phnom Penh", category: "Fine Dining", tags: ["Luxury", "Exclusive"], blurb: "Modern Khmer tasting menus, several of them run as training restaurants.", verified: true, lat: 11.5564, lng: 104.9282, image: img.soup },
      { slug: "kep-villas", name: "Kep Hillside Villas", province: "Kep", category: "Luxury Hotel", tags: ["Private", "Luxury"], blurb: "Villas on the slope above the bay, with the crab market ten minutes below.", verified: true, lat: 10.4833, lng: 104.3, image: img.jetty },
      { slug: "cardamom-lodges", name: "Cardamom Rainforest Lodges", province: "Koh Kong", category: "Spa", tags: ["Exclusive", "Luxury"], blurb: "Tented camps on the Tatai river that fund the ranger patrols around them.", verified: true, lat: 11.5333, lng: 103.1, image: img.riverForest },
      { slug: "angkor-golf", name: "Siem Reap Golf Courses", province: "Siem Reap", category: "Golf", tags: ["Golf Spa", "Luxury"], blurb: "Championship courses a few minutes from the temples, playable year round.", verified: true, lat: 13.3833, lng: 103.8167, image: img.poolPalms },
      { slug: "angkor-helicopter", name: "Helicopter & Light Aircraft Tours", province: "Siem Reap", category: "Helicopter", tags: ["Helicopter", "Private", "Exclusive"], blurb: "Angkor from the air, the only way to read the full plan of the city at once.", verified: true, lat: 13.4125, lng: 103.867, image: img.angkorWat },
      { slug: "vip-angkor", name: "VIP Angkor Access", province: "Siem Reap", category: "VIP Tour", tags: ["Exclusive", "Private", "5 Stars"], blurb: "Early-access arrangements, private transport and a guide who plans around the light.", verified: true, lat: 13.4413, lng: 103.859, image: img.statue },
    ],
  },
];

export function getRegionDetail(slug: string) {
  return regionDetails.find((region) => region.slug === slug);
}
