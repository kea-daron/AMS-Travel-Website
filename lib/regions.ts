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
  /** Long-form copy for the detail page; falls back to `blurb` when absent. */
  detail?: string;
  rating?: number;
  featured?: boolean;
  verified?: boolean;
  unesco?: boolean;
  lat?: number;
  lng?: number;
  image: string;
};

export type RegionCoverageItem = {
  order: number;
  /** Leading detail — a date range for a timeline, a province for a people. */
  kicker: string;
  /** Pill beside the kicker — an era, a language family, and so on. */
  badge: string;
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
  /** An ordered spine for the region — a timeline, a list of peoples, … */
  coverageTitle?: string;
  coverageIntro?: string;
  coverage?: RegionCoverageItem[];
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
    coverageTitle: "Historical Coverage",
    coverageIntro:
      "The succession of royal capitals this region is built around — read it top to bottom.",
    coverage: [
      {
        order: 1,
        kicker: "c. 600 – 700 CE",
        badge: "Pre-Angkor Period",
        name: "Ishanapura",
        altName: "Sambor Prei Kuk",
        nameKh: "ឦសានបុរី",
        body: "Capital of Chenla under Isanavarman I, and the first place Khmer temple architecture settled into a form of its own.",
      },
      {
        order: 2,
        kicker: "802 – c. 835 CE",
        badge: "Angkor Period",
        name: "Mahendraparvata",
        altName: "Phnom Kulen",
        nameKh: "មហេន្ទ្របវ៌ត",
        body: "The mountain city where Jayavarman II declared himself universal monarch in 802, the act that begins the Angkorian era.",
      },
      {
        order: 3,
        kicker: "c. 835 – 889 CE",
        badge: "Angkor Period",
        name: "Hariharalaya",
        altName: "Roluos",
        nameKh: "ហរិហរាល័យ",
        body: "The plain below the mountain, where Indravarman I built the first state temple and the first great reservoir.",
      },
      {
        order: 4,
        kicker: "889 – c. 1431 CE",
        badge: "Angkor Period",
        name: "Yasodharapura",
        altName: "Angkor",
        nameKh: "យសោធរបុរី",
        body: "Five centuries of capital on one site — Angkor Wat, Angkor Thom, and the largest pre-industrial city in the world.",
      },
      {
        order: 5,
        kicker: "928 – 944 CE",
        badge: "Angkor Period",
        name: "Lingapura",
        altName: "Koh Ker",
        nameKh: "លិង្គបុរី",
        body: "Jayavarman IV moved the court a hundred kilometres north-east and raised a seven-tier pyramid. It lasted sixteen years.",
      },
      {
        order: 6,
        kicker: "1528 – 1594 CE",
        badge: "Post-Angkor Period",
        name: "Longvek",
        nameKh: "លង្វែក",
        body: "The walled river capital of Ang Chan I, at the centre of Cambodia's maritime trade with China and the Malay world.",
      },
      {
        order: 7,
        kicker: "1618 – 1866 CE",
        badge: "Post-Angkor Period",
        name: "Oudong",
        nameKh: "ឧដុង្គ",
        body: "Two and a half centuries of capital on a low ridge, crowned by the stupas of the kings buried there.",
      },
      {
        order: 8,
        kicker: "1866 CE – present",
        badge: "Post-Angkor Period",
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
        blurb: "A capital for only twenty years, and a seven-tier pyramid to prove it.", detail: "Built for Suryavarman II in the first half of the twelfth century as a state temple and, unusually, dedicated to Vishnu rather than Shiva. It is oriented west, which is why sunrise is watched from in front of it rather than behind. The outer gallery carries around 600 metres of continuous bas-relief — the Churning of the Sea of Milk on the east wing is the one most people come back for. The temple was never fully abandoned after Angkor's fall, which is why it survived in better condition than most of the city around it.",
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
    nameKh: "តំបន់អរិយធម៌ឦសាន",
    vision: "Meet the Highlands on Their Own Terms",
    tagline: "Crater lakes, forest and indigenous country east of the Mekong.",
    coreIdentity:
      "The upland provinces where Bunong, Tampuan, Jarai, Kreung and Brao communities keep their own languages, calendars and forests — the part of Cambodia the temple trail never reaches, reached instead by red roads, longtail boats and the two rivers that drain it.",
    coverageTitle: "Peoples of the Northeast",
    coverageIntro:
      "The highlands are not one culture but several. These are the communities whose land, language and forest this region is built around.",
    coverage: [
      { order: 1, kicker: "Mondulkiri", badge: "Bahnaric · Austroasiatic", name: "Bunong", nameKh: "ព្នង", body: "The largest highland community in the country, and the reason Mondulkiri's forest, elephants and rotational farmland are still held collectively." },
      { order: 2, kicker: "Ratanakiri", badge: "Bahnaric · Austroasiatic", name: "Tampuan", nameKh: "ទំពួន", body: "The villages around Banlung, and the community that owns and protects the Yeak Laom crater lake." },
      { order: 3, kicker: "Ratanakiri", badge: "Chamic · Austronesian", name: "Jarai", nameKh: "ចារាយ", body: "Austronesian speakers along the Sesan and the Vietnamese border, related in language to the Cham of the lowlands." },
      { order: 4, kicker: "Ratanakiri", badge: "Bahnaric · Austroasiatic", name: "Kreung", nameKh: "គ្រឹង", body: "Known for the layout of their villages around a communal house, and for burial grounds carved with figures of the dead." },
      { order: 5, kicker: "Ratanakiri", badge: "Bahnaric · Austroasiatic", name: "Brao", nameKh: "ព្រៅ", body: "River people of the upper Sesan around Ta Veng, whose territory runs across into southern Laos." },
      { order: 6, kicker: "Ratanakiri", badge: "Bahnaric · Austroasiatic", name: "Kavet", nameKh: "កាវែត", body: "The far north-east, in and around what is now Virachey National Park — among the most remote settlements in Cambodia." },
      { order: 7, kicker: "Ratanakiri", badge: "Bahnaric · Austroasiatic", name: "Kachok", nameKh: "កាចក់", body: "A small community east of Banlung, farming the basalt uplands between the Sesan and the Srepok." },
      { order: 8, kicker: "Mondulkiri · Kratié", badge: "Bahnaric · Austroasiatic", name: "Stieng", nameKh: "ស្ទៀង", body: "The south-western edge of the highlands, where the plateau drops towards the Mekong plain." },
    ],
    categories: ["Indigenous Culture", "Volcano Lake", "Forest", "Wildlife", "Waterfall", "Sacred Mountain", "Adventure", "Coffee"],
    filterTags: ["Tribe", "Forest", "Elephant", "Camping", "Birding", "Sesan", "Srepok"],
    destinations: [
      { slug: "yeak-laom", name: "Yeak Laom Crater Lake", nameKh: "យក្សឡោម", province: "Ratanakiri", category: "Volcano Lake", tags: ["Tribe", "Forest"], blurb: "A near-perfect volcanic crater held by the Tampuan community, clear enough to swim all year.", verified: true, featured: true, lat: 13.7333, lng: 107.0167, image: img.lakeDawn },
      { slug: "bou-sra", name: "Bou Sra Waterfall", nameKh: "ប៊ូស្រា", province: "Mondulkiri", category: "Waterfall", tags: ["Forest"], blurb: "Two tiers dropping into Bunong forest, loudest at the end of the rains.", detail: "Two tiers, roughly ten and twenty-five metres, dropping through Bunong forest near the Vietnamese border. A path and a small suspension bridge reach the lower fall, and the volume changes completely with the season — thunderous from September into November, and a fraction of that by March. The land around it is Bunong, and the entry fee goes to the community that holds it.", verified: true, featured: true, lat: 12.5333, lng: 107.3667, image: img.waterfallRock },
      { slug: "sen-monorom", name: "Sen Monorom & Bunong Villages", nameKh: "សែនមនោរម្យ", province: "Mondulkiri", category: "Indigenous Culture", tags: ["Tribe", "Camping"], blurb: "The highland town and the villages around it, where Bunong is still the first language.", verified: true, lat: 12.45, lng: 107.1833, image: img.plateau },
      { slug: "virachey", name: "Virachey National Park", nameKh: "វីរជ័យ", province: "Ratanakiri", category: "Forest", tags: ["Camping", "Birding", "Sesan"], blurb: "Multi-day ranger-led treks into one of the least-visited protected areas in the country.", verified: true, featured: true, lat: 14.05, lng: 107.05, image: img.forestWalkers },
      { slug: "katieng-waterfalls", name: "Katieng & Kachanh Waterfalls", province: "Ratanakiri", category: "Waterfall", tags: ["Forest"], blurb: "Two short rides out of Banlung, both with a path behind the curtain of water.", verified: true, lat: 13.7167, lng: 106.95, image: img.waterfallDeep },
      { slug: "ou-sean-lair", name: "Ou Sean Lair Waterfall", province: "Ratanakiri", category: "Waterfall", tags: ["Forest", "Camping"], blurb: "A seven-tier fall on a rubber-estate road east of Banlung, quiet on a weekday.", verified: true, lat: 13.7833, lng: 107.0667, image: img.waterfallForest },
      { slug: "dak-dam", name: "Dak Dam Waterfall", province: "Mondulkiri", category: "Waterfall", tags: ["Forest", "Tribe"], blurb: "A short walk through Bunong farmland to a fall most visitors never reach.", verified: true, lat: 12.4167, lng: 107.25, image: img.waterfallDeep },
      { slug: "banlung-market", name: "Banlung Market", nameKh: "បានលុង", province: "Ratanakiri", category: "Indigenous Culture", tags: ["Tribe"], blurb: "Highland produce, backstrap weaving and the red dust the province is known for.", verified: true, lat: 13.7394, lng: 106.9873, image: img.marketStall },
      { slug: "kachon-village", name: "Kachon Kreung Village", province: "Ratanakiri", category: "Indigenous Culture", tags: ["Tribe", "Sesan"], blurb: "A Kreung village on the Sesan, with carved cemetery figures in the forest behind it.", verified: true, lat: 13.8167, lng: 107.05, image: img.jungleVillage },
      { slug: "andoung-meas", name: "Andoung Meas Jarai Villages", nameKh: "អណ្ដូងមាស", province: "Ratanakiri", category: "Indigenous Culture", tags: ["Tribe", "Sesan"], blurb: "Jarai settlements upriver towards the border, reached by boat from Voen Sai.", verified: true, lat: 13.9333, lng: 107.2333, image: img.dirtPath },
      { slug: "ratanakiri-coffee", name: "Ratanakiri Coffee Farms", province: "Ratanakiri", category: "Coffee", tags: ["Forest", "Tribe"], blurb: "Robusta and arabica grown on basalt soil, roasted and poured in Banlung.", verified: true, lat: 13.7, lng: 107.0, image: img.jungleVillage },
      { slug: "mondulkiri-coffee", name: "Mondulkiri Coffee Plantations", province: "Mondulkiri", category: "Coffee", tags: ["Forest", "Tribe"], blurb: "Smallholder plots around Sen Monorom and Bou Sra, many of them Bunong-run.", verified: true, lat: 12.4833, lng: 107.2, image: img.treetops },
      { slug: "elephant-valley", name: "Elephant Valley Project", province: "Mondulkiri", category: "Wildlife", tags: ["Elephant", "Forest"], blurb: "Retired working elephants observed in forest rather than ridden, run with Bunong mahouts.", verified: true, featured: true, lat: 12.4, lng: 107.15, image: img.forestBridge },
      { slug: "phnom-prich", name: "Phnom Prich Wildlife Sanctuary", province: "Mondulkiri", category: "Wildlife", tags: ["Birding", "Forest", "Srepok"], blurb: "Dry forest and grassland holding gaur, banteng and some of the last wild cattle herds.", verified: true, lat: 12.6, lng: 106.8, image: img.treetops },
      { slug: "seima", name: "Keo Seima Wildlife Sanctuary", province: "Mondulkiri", category: "Wildlife", tags: ["Birding", "Forest"], blurb: "Evergreen forest holding black-shanked douc and yellow-cheeked gibbon, with dawn gibbon treks from Andoung Kraloeng.", verified: true, lat: 12.2, lng: 106.9, image: img.forestWalkers },
      { slug: "lumphat", name: "Lumphat Wildlife Sanctuary", nameKh: "លំផាត់", province: "Ratanakiri", category: "Forest", tags: ["Birding", "Srepok", "Camping"], blurb: "Dry dipterocarp forest along the Srepok, and some of the best vulture watching left in the country.", verified: true, lat: 13.5, lng: 106.9833, image: img.dirtPath },
      { slug: "sesan-srepok", name: "Sesan & Srepok Rivers", nameKh: "សេសាន និង ស្រែពក", province: "Stung Treng", category: "Adventure", tags: ["Sesan", "Srepok", "Camping"], blurb: "The two highland rivers that carry the northeast down to the Mekong, run by longtail and kayak.", verified: true, lat: 13.5259, lng: 105.9683, image: img.blueBoat },
      { slug: "ta-veng", name: "Ta Veng & the Upper Sesan", nameKh: "តាវែង", province: "Ratanakiri", category: "Adventure", tags: ["Sesan", "Tribe", "Camping"], blurb: "The put-in for Brao river villages and the northern gate into Virachey.", verified: true, lat: 14.0333, lng: 107.05, image: img.blueBoat },
      { slug: "phnom-doh-kromom", name: "Phnom Doh Kromom", province: "Ratanakiri", category: "Sacred Mountain", tags: ["Forest"], blurb: "A hilltop pagoda above Banlung, and the province's standing sunset spot.", verified: true, lat: 13.75, lng: 106.9667, image: img.mountainCloud },
      { slug: "phnom-nam-lyr", name: "Phnom Nam Lyr", province: "Mondulkiri", category: "Sacred Mountain", tags: ["Forest", "Camping"], blurb: "A forested massif on the Vietnamese border, held sacred locally and rarely climbed.", verified: true, lat: 12.3333, lng: 107.3667, image: img.mountainCloud },
    ],
  },
  {
    slug: "mekong-tonle-sap",
    name: "Mekong & Tonle Sap Civilization",
    nameKh: "តំបន់អរិយធម៌មេគង្គ និងទន្លេសាប",
    vision: "Life Written by the Water",
    tagline: "The lake that reverses, and the river that feeds it.",
    coreIdentity:
      "A whole culture built on a flood pulse. Once a year the Tonle Sap river turns and runs backwards, the lake swells to five times its size, and everything that lives on it — villages, forests, fishing grounds, the calendar itself — moves with the water and then moves back.",
    coverageTitle: "The Water Year",
    coverageIntro:
      "This region is organised by a single annual cycle rather than by history. Read it top to bottom and you have the year.",
    coverage: [
      { order: 1, kicker: "December – April", badge: "Low Water", name: "The lake at its smallest", nameKh: "រដូវប្រាំង", body: "Around 2,500 km² and barely a metre deep. Boats need channels dug for them, and the villages follow the shoreline out across the mud." },
      { order: 2, kicker: "May – June", badge: "First Rains", name: "The monsoon arrives", body: "The upstream Mekong begins to rise, fed by snowmelt off the Tibetan plateau and the first of the south-west monsoon." },
      { order: 3, kicker: "Late May – June", badge: "The Reversal", name: "The river turns back", nameKh: "ទន្លេសាបបញ្ច្រាស", body: "The Mekong pushes harder than the lake can drain, and the Tonle Sap river reverses to run north — one of the few rivers on earth that changes direction each year." },
      { order: 4, kicker: "July – September", badge: "Rising", name: "The flooded forest goes under", body: "Water spreads into the ring of freshwater swamp forest around the lake, which becomes the nursery for most of the fish in the system." },
      { order: 5, kicker: "September – October", badge: "Peak Flood", name: "The lake at its largest", body: "Up to five times its dry-season area and as much as nine metres deep, spilling across five provinces." },
      { order: 6, kicker: "October – November", badge: "The Return", name: "The river turns south again", nameKh: "បុណ្យអុំទូក", body: "The flow reverses back towards the Mekong, and the country marks it with Bon Om Touk — three days of longboat racing on the full moon." },
      { order: 7, kicker: "October – March", badge: "Fishing Season", name: "The fish come out with the water", body: "The dai fishery strings stationary nets across the Tonle Sap river to meet the migration draining out of the lake." },
      { order: 8, kicker: "Since 1997", badge: "Biosphere Reserve", name: "Protected, on paper", body: "UNESCO listed the lake as a Biosphere Reserve with three core areas — Prek Toal, Boeung Tonle Chhmar and Stung Sen." },
    ],
    categories: ["Floating Village", "Fishing", "Bird Sanctuary", "River Island", "Rice", "Community", "Boat Trip", "Sunset"],
    filterTags: ["Boat", "Bird", "Fishing", "Lotus", "Rice", "Island", "Wetland", "Festival"],
    destinations: [
      { slug: "kampong-phluk", name: "Kampong Phluk", nameKh: "កំពង់ភ្លុក", province: "Siem Reap", category: "Floating Village", tags: ["Boat", "Wetland"], blurb: "Houses on ten-metre stilts, reached by boat through flooded mangrove.", detail: "Three villages of stilt houses standing six to ten metres above the dry-season ground, which puts the floors just above the water at peak flood. In the wet months you arrive by motorboat and transfer to a rowing boat to go through the flooded forest; in the dry months the same route is a road, and the stilts are the whole point of the visit. Going with the village boat cooperative rather than a tour launch keeps the fare in Kampong Phluk.", verified: true, featured: true, lat: 13.1833, lng: 103.9833, image: img.floatingVillage },
      { slug: "kampong-khleang", name: "Kampong Khleang", nameKh: "កំពង់ឃ្លាំង", province: "Siem Reap", category: "Floating Village", tags: ["Boat", "Fishing"], blurb: "The largest lakeside settlement, and far quieter than the villages nearer town.", verified: true, featured: true, lat: 13.1167, lng: 104.1167, image: img.boatPeople },
      { slug: "chnok-tru", name: "Chnok Tru", nameKh: "ឆ្នុកទ្រូ", province: "Kampong Chhnang", category: "Floating Village", tags: ["Boat", "Fishing"], blurb: "A whole town afloat at the southern end of the lake — shops, school and petrol station all on pontoons.", verified: true, lat: 12.4167, lng: 104.4667, image: img.boatWoman },
      { slug: "me-chrey", name: "Me Chrey", province: "Siem Reap", category: "Floating Village", tags: ["Boat", "Lotus"], blurb: "The smallest of the Siem Reap villages, ringed by lotus in the months after the flood.", verified: true, lat: 13.1667, lng: 103.7333, image: img.pathWater },
      { slug: "chong-kneas", name: "Chong Kneas", nameKh: "ជុងឃ្នៀស", province: "Siem Reap", category: "Boat Trip", tags: ["Boat", "Fishing"], blurb: "The closest landing to Siem Reap and the start of the boat crossing to Battambang.", verified: true, lat: 13.2333, lng: 103.8333, image: img.boatsShallow },
      { slug: "battambang-boat", name: "Battambang – Siem Reap Boat", province: "Battambang", category: "Boat Trip", tags: ["Boat", "Wetland", "Fishing"], blurb: "Eight hours down the Sangker and across the lake, the best way to read the whole system in a day.", verified: true, lat: 13.1, lng: 103.4, image: img.blueBoat },
      { slug: "kampi-dolphins", name: "Kampi Dolphin Pool", nameKh: "កំពី", province: "Kratié", category: "Boat Trip", tags: ["Boat"], blurb: "One of the last deep pools holding Irrawaddy dolphins on the Mekong.", verified: true, featured: true, lat: 12.5667, lng: 106.0333, image: img.blueBoat },
      { slug: "prek-toal", name: "Prek Toal Bird Sanctuary", nameKh: "ព្រែកទាល់", province: "Battambang", category: "Bird Sanctuary", tags: ["Bird", "Wetland", "Boat"], blurb: "The most important waterbird colony in South-East Asia, best at first light.", verified: true, featured: true, lat: 13.15, lng: 103.6333, image: img.riverTrees },
      { slug: "ang-trapeang-thmor", name: "Ang Trapeang Thmor", nameKh: "អាងត្រពាំងថ្ម", province: "Banteay Meanchey", category: "Bird Sanctuary", tags: ["Bird", "Wetland"], blurb: "A Khmer Rouge-era reservoir turned reserve, and the country's most reliable sarus crane site.", verified: true, lat: 13.8, lng: 103.3, image: img.riceAerial },
      { slug: "boeung-tonle-chhmar", name: "Boeung Tonle Chhmar", nameKh: "បឹងទន្លេឆ្មារ", province: "Kampong Thom", category: "Bird Sanctuary", tags: ["Bird", "Wetland", "Boat"], blurb: "A Ramsar site and biosphere core area on the north shore, with flooded forest still intact.", verified: true, lat: 12.8167, lng: 104.1667, image: img.riverForest },
      { slug: "koh-trong", name: "Koh Trong", nameKh: "កោះទ្រង់", province: "Kratié", category: "River Island", tags: ["Island", "Rice"], blurb: "A sandbank island opposite Kratié, circled in an hour by bicycle.", verified: true, lat: 12.4667, lng: 106.0167, image: img.pathWater },
      { slug: "koh-dach", name: "Koh Dach (Silk Island)", nameKh: "កោះដាច់", province: "Kandal", category: "River Island", tags: ["Island", "Boat"], blurb: "Silk looms under stilt houses, a short ferry from the edge of Phnom Penh.", verified: true, lat: 11.6333, lng: 104.95, image: img.paddy },
      { slug: "koh-paen", name: "Koh Paen & the Bamboo Bridge", nameKh: "កោះប៉ែន", province: "Kampong Cham", category: "River Island", tags: ["Island", "Rice"], blurb: "A bamboo bridge rebuilt by hand every dry season, and washed away by every flood.", verified: true, lat: 11.9667, lng: 105.4667, image: img.pathWater },
      { slug: "koh-sotin", name: "Koh Sotin", nameKh: "កោះសូទិន", province: "Kampong Cham", category: "River Island", tags: ["Island", "Rice", "Boat"], blurb: "Sandbars, tobacco fields and a ferry crossing that has not changed much in decades.", verified: true, lat: 11.8667, lng: 105.5, image: img.riceAerial },
      { slug: "kandal-rice-plains", name: "Kandal Rice Plains", province: "Kandal", category: "Rice", tags: ["Rice", "Lotus"], blurb: "Paddy and lotus ponds on the floodplain either side of the capital.", verified: true, lat: 11.4833, lng: 104.9333, image: img.riceAerial },
      { slug: "stung-sen-floodplain", name: "Stung Sen Floodplain", province: "Kampong Thom", category: "Rice", tags: ["Rice", "Wetland"], blurb: "Deepwater rice that grows with the flood, on the river feeding the lake's northern core area.", verified: true, lat: 12.6833, lng: 104.9, image: img.paddy },
      { slug: "kampong-chhnang-pottery", name: "Kampong Chhnang Pottery Villages", nameKh: "កំពង់ឆ្នាំង", province: "Kampong Chhnang", category: "Community", tags: ["Fishing", "Boat"], blurb: "The province is named for its cooking pots, still coil-built by hand and fired in the open.", verified: true, lat: 12.25, lng: 104.6667, image: img.marketStall },
      { slug: "water-festival", name: "Bon Om Touk (Water Festival)", nameKh: "បុណ្យអុំទូក", province: "Phnom Penh", category: "Community", tags: ["Festival", "Boat"], blurb: "Longboat racing on the river each November, when the Tonle Sap turns back around.", verified: true, featured: true, lat: 11.57, lng: 104.93, image: img.cityRiverNight },
      { slug: "dai-fishery", name: "The Dai Fishery", province: "Kandal", category: "Fishing", tags: ["Fishing", "Boat", "Wetland"], blurb: "Rows of stationary bag nets strung across the Tonle Sap river to meet the migration out of the lake.", verified: true, lat: 11.6667, lng: 104.9167, image: img.boatWoman },
      { slug: "stung-treng-ramsar", name: "Stung Treng Ramsar Site", province: "Stung Treng", category: "Fishing", tags: ["Wetland", "Fishing", "Boat"], blurb: "Braided channels and seasonally flooded forest running north to the Lao border.", verified: true, lat: 13.7, lng: 105.95, image: img.riverForest },
      { slug: "tonle-sap-sunset", name: "Tonle Sap Sunset Boats", nameKh: "ទន្លេសាប", province: "Siem Reap", category: "Sunset", tags: ["Boat", "Lotus"], blurb: "The lake edge at the end of the day, when the fishing fleet goes out.", verified: true, lat: 13.2, lng: 103.85, image: img.boatsShallow },
      { slug: "wat-hanchey", name: "Wat Hanchey", nameKh: "វត្តហាន់ជ័យ", province: "Kampong Cham", category: "Sunset", tags: ["Boat"], blurb: "A pre-Angkorian brick sanctuary on a bluff, with the Mekong laid out below it at dusk.", verified: true, lat: 12.1167, lng: 105.4667, image: img.brickTower },
      { slug: "phnom-sambok", name: "Phnom Sambok", nameKh: "ភ្នំសំបុក", province: "Kratié", category: "Sunset", tags: ["Boat"], blurb: "A two-tier hilltop pagoda north of Kratié, reached by a staircase through the trees.", verified: true, lat: 12.5333, lng: 106.0167, image: img.monk },
    ],
  },
  {
    slug: "mountain-waterfall",
    name: "Mountain & Waterfall Region",
    nameKh: "តំបន់ភ្នំ និងទឹកធ្លាក់",
    vision: "Cool Air and Falling Water",
    tagline: "Cardamom ridgelines, plateau pine and the falls after the rains.",
    coreIdentity:
      "The high ground of the south-west and the water that comes off it — rainforest massifs holding the largest intact forest in mainland South-East Asia, a French hill station in the cloud, limestone caves with shrines inside them, and cascades that only truly run for half the year.",
    coverageTitle: "The Ranges",
    coverageIntro:
      "Cambodia is mostly floodplain. This region is the exception — the uplands that ring it, and the water that comes off them.",
    coverage: [
      { order: 1, kicker: "Koh Kong · Pursat", badge: "1,717 m · Phnom Samkos", name: "Cardamom Mountains", nameKh: "ជួរភ្នំក្រវាញ", body: "The largest intact rainforest in mainland South-East Asia, still holding elephant, gaur and clouded leopard, and still being surveyed." },
      { order: 2, kicker: "Kampong Speu", badge: "1,813 m · Highest point", name: "Phnom Aural", nameKh: "ភ្នំឧរ៉ាល់", body: "The summit of the country, on the eastern edge of the Cardamom massif — a hard two-day climb through leech forest." },
      { order: 3, kicker: "Kampot · Koh Kong", badge: "1,080 m · Plateau", name: "Elephant Mountains", nameKh: "ជួរភ្នំដំរី", body: "The Damrei range running down to the Gulf, topped by the Bokor plateau and the hill station the French abandoned twice." },
      { order: 4, kicker: "Kampong Speu", badge: "~700 m · Pine plateau", name: "Kirirom", nameKh: "គិរីរម្យ", body: "A pine-covered shelf high enough to be cold at night, and the closest highland to Phnom Penh." },
      { order: 5, kicker: "Preah Vihear · Oddar Meanchey", badge: "Escarpment", name: "Dangrek Mountains", nameKh: "ជួរភ្នំដងរែក", body: "The cliff line marking the Thai border, with Preah Vihear temple laid along the top of it at 525 m." },
      { order: 6, kicker: "Siem Reap", badge: "487 m · Sandstone plateau", name: "Phnom Kulen", nameKh: "ភ្នំគូលែន", body: "The quarry that built Angkor and the mountain where the empire was declared, with the falls and riverbed carvings on top." },
      { order: 7, kicker: "Battambang · Kampot", badge: "Karst", name: "The Limestone Outcrops", body: "Isolated karst hills standing out of the paddy, hollow with caves that have held shrines for more than a thousand years." },
    ],
    categories: ["Mountain", "National Park", "Waterfall", "Cave", "Trekking", "Camping", "Cycling", "Viewpoint", "Photography"],
    filterTags: ["Hiking", "Sunrise", "Sunset", "Camping", "Trail", "Peak", "Landscape"],
    destinations: [
      { slug: "cardamoms", name: "Central Cardamom Mountains", nameKh: "ជួរភ្នំក្រវាញ", province: "Koh Kong", category: "Mountain", tags: ["Trail", "Landscape"], blurb: "The largest rainforest left in mainland South-East Asia, and still being surveyed.", verified: true, featured: true, lat: 11.9, lng: 103.3, image: img.riverForest },
      { slug: "phnom-samkos", name: "Phnom Samkos", nameKh: "ភ្នំសំកុស", province: "Pursat", category: "Mountain", tags: ["Peak", "Hiking", "Landscape"], blurb: "The second summit of the country at 1,717 m, inside a wildlife sanctuary of the same name.", verified: true, lat: 12.2833, lng: 103.0333, image: img.mountainCloud },
      { slug: "phnom-kulen-mountain", name: "Phnom Kulen", nameKh: "ភ្នំគូលែន", province: "Siem Reap", category: "Mountain", tags: ["Trail", "Landscape"], blurb: "The sandstone plateau Angkor was quarried from, with a riverbed of carved lingas near the top.", verified: true, lat: 13.5833, lng: 104.05, image: img.waterfallWide },
      { slug: "bokor", name: "Bokor National Park", nameKh: "បូកគោ", province: "Kampot", category: "National Park", tags: ["Landscape", "Sunset"], blurb: "An abandoned hill station on a plateau that makes its own weather.", verified: true, featured: true, lat: 10.6333, lng: 104.0167, image: img.bokor },
      { slug: "botum-sakor", name: "Botum Sakor National Park", nameKh: "បុទុមសាគរ", province: "Koh Kong", category: "National Park", tags: ["Trail", "Landscape"], blurb: "A peninsula of mangrove, melaleuca and lowland forest between the Cardamoms and the sea.", verified: true, lat: 11.05, lng: 103.4, image: img.riverForest },
      { slug: "tatai", name: "Tatai Waterfall", nameKh: "តាតៃ", province: "Koh Kong", category: "Waterfall", tags: ["Trail"], blurb: "A wide, low fall reached by boat up the Tatai river, swimmable outside the wet season.", verified: true, lat: 11.5333, lng: 103.1, image: img.waterfallForest },
      { slug: "popokvil", name: "Popokvil Falls", nameKh: "ពពកវិល", province: "Kampot", category: "Waterfall", tags: ["Hiking"], blurb: "Two drops on the Bokor plateau, thunderous in September and dry by March.", verified: true, lat: 10.65, lng: 104.0333, image: img.waterfallDeep },
      { slug: "kulen-falls", name: "Phnom Kulen Waterfalls", province: "Siem Reap", category: "Waterfall", tags: ["Hiking", "Trail"], blurb: "The falls on the sacred mountain, busy at weekends and empty on a weekday morning.", verified: true, lat: 13.5833, lng: 104.05, image: img.waterfallWide },
      { slug: "kbal-chhay", name: "Kbal Chhay Waterfall", nameKh: "ក្បាលឆាយ", province: "Preah Sihanouk", category: "Waterfall", tags: ["Hiking"], blurb: "Three streams over sandstone shelves, half an hour inland from the coast.", verified: true, lat: 10.7333, lng: 103.5667, image: img.waterfallDeep },
      { slug: "chambok", name: "Chambok Waterfall", nameKh: "ចំបក់", province: "Kampong Speu", category: "Waterfall", tags: ["Hiking", "Trail"], blurb: "A forty-metre fall at the end of a community-run trail on the edge of Kirirom.", verified: true, lat: 11.35, lng: 104.1167, image: img.waterfallForest },
      { slug: "phnom-chhngok", name: "Phnom Chhngok Cave Temple", nameKh: "ភ្នំឆ្ងោក", province: "Kampot", category: "Cave", tags: ["Hiking"], blurb: "A seventh-century brick shrine standing inside a limestone cave, reached by ladder.", verified: true, lat: 10.7, lng: 104.25, image: img.brickTower },
      { slug: "kampong-trach", name: "Kampong Trach Caves", nameKh: "កំពង់ត្រាច", province: "Kampot", category: "Cave", tags: ["Hiking", "Landscape"], blurb: "A collapsed karst hill you walk into, opening onto a sinkhole garden in the middle.", verified: true, lat: 10.5333, lng: 104.4667, image: img.mountainCloud },
      { slug: "phnom-sorsia", name: "Phnom Sorsia", province: "Kampot", category: "Cave", tags: ["Hiking"], blurb: "Two caves in one outcrop — one full of bats, one lit through a hole in the roof.", verified: true, lat: 10.5833, lng: 104.3667, image: img.dirtPath },
      { slug: "phnom-aural", name: "Phnom Aural", nameKh: "ភ្នំឧរ៉ាល់", province: "Kampong Speu", category: "Trekking", tags: ["Peak", "Hiking", "Camping"], blurb: "The highest peak in Cambodia at 1,813 m, a hard two-day climb with a guide.", verified: true, featured: true, lat: 12.0333, lng: 104.1667, image: img.mountainCloud },
      { slug: "kbal-spean", name: "Kbal Spean", nameKh: "ក្បាលស្ពាន", province: "Siem Reap", category: "Trekking", tags: ["Hiking", "Trail"], blurb: "A forty-minute climb through forest to a riverbed carved with a thousand lingas.", verified: true, lat: 13.6667, lng: 103.95, image: img.forestWalkers },
      { slug: "areng-valley", name: "Areng Valley", nameKh: "អារ៉ែង", province: "Koh Kong", category: "Trekking", tags: ["Trail", "Camping", "Landscape"], blurb: "A valley the community kept from being dammed, now walked rather than flooded.", verified: true, lat: 11.5, lng: 103.3, image: img.forestBridge },
      { slug: "kirirom", name: "Kirirom National Park", nameKh: "គិរីរម្យ", province: "Kampong Speu", category: "Camping", tags: ["Camping", "Trail", "Landscape"], blurb: "Pine forest cool enough to need a jacket, two hours from Phnom Penh.", verified: true, featured: true, lat: 11.3167, lng: 104.05, image: img.pineRoad },
      { slug: "osoam", name: "Osoam Cardamom Community", province: "Pursat", category: "Camping", tags: ["Camping", "Trail"], blurb: "A village centre deep in the range, and the usual base for multi-day walks into it.", verified: true, lat: 12.05, lng: 103.2, image: img.jungleVillage },
      { slug: "chi-phat", name: "Chi Phat", province: "Koh Kong", category: "Cycling", tags: ["Trail", "Camping"], blurb: "A former logging village turned trekking base, with mountain-bike routes cut by the community.", verified: true, lat: 11.3167, lng: 103.4667, image: img.jungleVillage },
      { slug: "kampot-kep-loop", name: "Kampot – Kep Countryside Loop", province: "Kampot", category: "Cycling", tags: ["Trail", "Landscape"], blurb: "Forty flat kilometres between pepper farms, salt pans and the karst outcrops.", verified: true, lat: 10.55, lng: 104.28, image: img.dirtRoad },
      { slug: "phnom-sampeau", name: "Phnom Sampeau", nameKh: "ភ្នំសំពៅ", province: "Battambang", category: "Viewpoint", tags: ["Sunset", "Landscape"], blurb: "The bat cave empties in a ribbon at dusk, watched from the road below.", verified: true, featured: true, lat: 13.0333, lng: 103.1333, image: img.townAerial },
      { slug: "phnom-banan", name: "Phnom Banan", nameKh: "ភ្នំបាណន់", province: "Battambang", category: "Viewpoint", tags: ["Sunset", "Hiking", "Landscape"], blurb: "358 steps to a five-towered hilltop temple, with the Sangker plain behind it.", verified: true, lat: 12.9833, lng: 103.2333, image: img.ruinsTrees },
      { slug: "dangrek-escarpment", name: "Dangrek Escarpment", nameKh: "ជួរភ្នំដងរែក", province: "Preah Vihear", category: "Viewpoint", tags: ["Landscape", "Peak"], blurb: "The cliff edge below Preah Vihear temple, with the plain running out 500 m underneath.", verified: true, lat: 14.3931, lng: 104.68, image: img.ruinsTrees },
      { slug: "phnom-bok", name: "Phnom Bok", nameKh: "ភ្នំបូក", province: "Siem Reap", category: "Photography", tags: ["Sunrise", "Peak", "Landscape"], blurb: "Six hundred steps to a ninth-century hilltop temple, and the plain at first light.", verified: true, lat: 13.4667, lng: 104.05, image: img.causeway },
      { slug: "bokor-cloud-line", name: "The Bokor Cloud Line", province: "Kampot", category: "Photography", tags: ["Landscape", "Sunset"], blurb: "The altitude where the plateau's own weather forms, and the reason the hill station was built.", verified: true, lat: 10.6167, lng: 104.05, image: img.waterMountains },
    ],
  },
  {
    slug: "coastal-island",
    name: "Coastal & Island Region",
    nameKh: "តំបន់ឆ្នេរ និងកោះ",
    vision: "The Gulf, Island by Island",
    tagline: "Fishing ports, mangrove estuaries and a boat ride offshore.",
    coreIdentity:
      "Around 443 km of Gulf coastline and some sixty islands off it — from resort bays with a ferry every hour to islands running on one generator, held together by the mangrove systems that feed the whole fishery.",
    coverageTitle: "The Coast, West to East",
    coverageIntro:
      "Four provinces and four island groups, in the order you would travel them from the Thai border down to the Vietnamese one.",
    coverage: [
      { order: 1, kicker: "Koh Kong", badge: "Mangrove coast", name: "The Border Corner", nameKh: "កោះកុង", body: "Estuaries and standing mangrove where the Cardamoms come down to the sea, plus the country's largest island offshore." },
      { order: 2, kicker: "Koh Kong", badge: "Fishing islands", name: "Koh Sdach Archipelago", nameKh: "កោះស្តេច", body: "A working cluster of small islands off Botum Sakor, still more fishing village than resort." },
      { order: 3, kicker: "Preah Sihanouk", badge: "Port & beaches", name: "Sihanoukville", body: "The deep-water port, the mainland beaches either side of it, and every ferry to the islands." },
      { order: 4, kicker: "Preah Sihanouk", badge: "Koh Rong · 78 km²", name: "Koh Rong Archipelago", nameKh: "កោះរុង", body: "The main island group — Koh Rong, Koh Rong Sanloem, Koh Ta Kiev and Koh Russei, half an hour to two hours out." },
      { order: 5, kicker: "Preah Sihanouk", badge: "Deep water", name: "The Outer Islands", body: "Koh Tang and Koh Prins, four hours offshore, with the clearest water and the only wreck diving in Cambodian waters." },
      { order: 6, kicker: "Kampot", badge: "Estuary & salt", name: "The Kampot Estuary", nameKh: "កំពត", body: "No real beach here — a river mouth, salt pans worked by hand, and the Bokor range standing behind it all." },
      { order: 7, kicker: "Kep", badge: "Smallest province", name: "Kep", nameKh: "កែប", body: "A single bay, a crab market on stilts, and the ruins of the villas the coast was built around in the 1960s." },
      { order: 8, kicker: "Kep", badge: "Seagrass & reef", name: "Kep Archipelago", nameKh: "កោះទន្សាយ", body: "Thirteen islands with the country's best surviving seagrass beds, and the marine reserve rebuilding them." },
    ],
    categories: ["Beach", "Island", "Coral", "Diving", "Seafood", "Mangrove", "Cruise", "Snorkeling"],
    filterTags: ["Beach", "Island", "Luxury Resort", "Diving", "Kayak"],
    destinations: [
      { slug: "koh-rong-sanloem", name: "Koh Rong Sanloem", nameKh: "កោះរុងសន្លឹម", province: "Preah Sihanouk", category: "Island", tags: ["Beach", "Island"], blurb: "Saracen Bay for the sand, Lazy Beach for the sunset, plankton after dark.", detail: "The quieter of the two big islands, and effectively three separate places: Saracen Bay on the east with most of the accommodation, Lazy Beach over the ridge facing the sunset, and M'Pai Bay in the north with the island's small village. Walking between them takes twenty to forty minutes on forest paths. The bioluminescent plankton is real and best on a dark, moonless night away from the bay lights.", verified: true, featured: true, lat: 10.6058, lng: 103.3167, image: img.islandAerial },
      { slug: "koh-rong", name: "Koh Rong", nameKh: "កោះរុង", province: "Preah Sihanouk", category: "Island", tags: ["Beach", "Island"], blurb: "The bigger, louder sister island, with jungle trails to empty beaches on the far side.", verified: true, featured: true, lat: 10.7167, lng: 103.25, image: img.palmBeach },
      { slug: "koh-ta-kiev", name: "Koh Ta Kiev", nameKh: "កោះតាកៀវ", province: "Preah Sihanouk", category: "Island", tags: ["Island", "Kayak"], blurb: "Near-shore and barely developed — hammocks, generators and no road.", verified: true, lat: 10.5333, lng: 103.6, image: img.beachPalms },
      { slug: "koh-thmei", name: "Koh Thmei", nameKh: "កោះថ្មី", province: "Preah Sihanouk", category: "Island", tags: ["Island", "Kayak"], blurb: "Inside Ream National Park, with mangrove channels instead of nightlife and birds instead of bars.", verified: true, lat: 10.5167, lng: 103.7833, image: img.riverForest },
      { slug: "koh-tonsay", name: "Koh Tonsay (Rabbit Island)", nameKh: "កោះទន្សាយ", province: "Kep", category: "Island", tags: ["Island", "Beach"], blurb: "Twenty minutes off Kep, with a single beach and a row of wooden bungalows.", verified: true, lat: 10.4333, lng: 104.3833, image: img.boatsShallow },
      { slug: "koh-sdach", name: "Koh Sdach Archipelago", nameKh: "កោះស្តេច", province: "Koh Kong", category: "Island", tags: ["Island", "Diving"], blurb: "A working fishing cluster off Botum Sakor, with reef between the islands and few visitors.", verified: true, lat: 11.2333, lng: 102.9667, image: img.pier },
      { slug: "koh-kong-island", name: "Koh Kong Island", nameKh: "កោះកុង", province: "Koh Kong", category: "Beach", tags: ["Island", "Beach"], blurb: "Seven beaches on the country's largest island, an hour by boat and rarely busy.", verified: true, lat: 11.3333, lng: 102.9333, image: img.pier },
      { slug: "otres", name: "Otres Beach", nameKh: "អូត្រេស", province: "Preah Sihanouk", category: "Beach", tags: ["Beach"], blurb: "The long quiet strip south of Sihanoukville, best in the late afternoon.", verified: true, lat: 10.5833, lng: 103.5167, image: img.shoreline },
      { slug: "long-set", name: "Long Set (4K) Beach", province: "Preah Sihanouk", category: "Beach", tags: ["Beach", "Island"], blurb: "Four kilometres of sand on Koh Rong's east coast, walkable from the pier in an hour.", verified: true, lat: 10.7, lng: 103.2833, image: img.palmBeach },
      { slug: "lazy-beach", name: "Lazy Beach", province: "Preah Sihanouk", category: "Beach", tags: ["Beach", "Island", "Luxury Resort"], blurb: "The west-facing bay on Sanloem, reached over the ridge and pointed at the sunset.", verified: true, lat: 10.6, lng: 103.3, image: img.shoreline },
      { slug: "koh-seh", name: "Koh Seh Marine Reserve", nameKh: "កោះសេះ", province: "Kep", category: "Coral", tags: ["Diving", "Island"], blurb: "A conservation base rebuilding seagrass and reef in the Kep archipelago.", verified: true, lat: 10.35, lng: 104.35, image: img.boatsShallow },
      { slug: "kep-seagrass", name: "Kep Seagrass Beds", province: "Kep", category: "Coral", tags: ["Diving", "Kayak"], blurb: "The largest seagrass meadows left on the coast, and the nursery behind the crab you eat ashore.", verified: true, lat: 10.4, lng: 104.35, image: img.boatsShallow },
      { slug: "koh-tang", name: "Koh Tang Dive Sites", nameKh: "កោះតាង", province: "Preah Sihanouk", category: "Diving", tags: ["Diving", "Island"], blurb: "The clearest water in Cambodian waters, four hours offshore on a liveaboard.", verified: true, featured: true, lat: 10.2833, lng: 103.1, image: img.islandAerial },
      { slug: "koh-prins", name: "Koh Prins Wrecks", province: "Preah Sihanouk", category: "Diving", tags: ["Diving", "Island"], blurb: "Two wrecks in open water off the outer islands, the only wreck diving on this coast.", verified: true, lat: 10.35, lng: 103.0, image: img.waterMountains },
      { slug: "sanloem-reefs", name: "Sanloem Reef Snorkeling", province: "Preah Sihanouk", category: "Snorkeling", tags: ["Diving", "Beach", "Island"], blurb: "Shallow coral off the north of the island, swimmable straight from the sand.", verified: true, lat: 10.62, lng: 103.31, image: img.boatsShallow },
      { slug: "koh-russei", name: "Koh Russei (Bamboo Island)", nameKh: "កោះឬស្សី", province: "Preah Sihanouk", category: "Snorkeling", tags: ["Island", "Beach", "Kayak"], blurb: "A small island close in, with reef at both ends and a shallow crossing between them.", verified: true, lat: 10.5667, lng: 103.3833, image: img.beachPalms },
      { slug: "kep-beach", name: "Kep & the Crab Market", nameKh: "កែប", province: "Kep", category: "Seafood", tags: ["Beach"], blurb: "Crab straight off the boats, cooked with green Kampot pepper.", verified: true, featured: true, lat: 10.4833, lng: 104.3167, image: img.jetty },
      { slug: "psar-leu-seafood", name: "Psar Leu Seafood Market", nameKh: "ផ្សារលើ", province: "Preah Sihanouk", category: "Seafood", tags: ["Beach"], blurb: "The port's own market, where the day's catch lands before it reaches any restaurant.", verified: true, lat: 10.6333, lng: 103.5167, image: img.marketStall },
      { slug: "kampot-fish-market", name: "Kampot Fish Market", province: "Kampot", category: "Seafood", tags: ["Kayak"], blurb: "A restored deco market hall on the quay, busiest when the estuary boats come in.", verified: true, lat: 10.6, lng: 104.1833, image: img.kampotNight },
      { slug: "peam-krasop", name: "Peam Krasop Mangroves", nameKh: "ពាមក្រសោប", province: "Koh Kong", category: "Mangrove", tags: ["Kayak"], blurb: "A kilometre of boardwalk through standing mangrove, with a tower at the end.", verified: true, featured: true, lat: 11.5833, lng: 102.9333, image: img.riverForest },
      { slug: "ream", name: "Ream National Park", nameKh: "រាម", province: "Preah Sihanouk", category: "Mangrove", tags: ["Kayak", "Beach"], blurb: "Mangrove channels, dry forest and two beaches, half an hour from the airport.", verified: true, lat: 10.5333, lng: 103.75, image: img.riverForest },
      { slug: "kampot-estuary", name: "Kampot Estuary & Salt Fields", province: "Kampot", category: "Mangrove", tags: ["Kayak"], blurb: "Salt pans worked by hand between the river mouth and the sea, flooded and dried by season.", verified: true, lat: 10.5833, lng: 104.2167, image: img.boatsMountains },
      { slug: "gulf-cruises", name: "Gulf Sunset Cruises", province: "Preah Sihanouk", category: "Cruise", tags: ["Island", "Luxury Resort"], blurb: "Evening sailings out through the archipelago, most leaving from Otres.", verified: true, lat: 10.59, lng: 103.5, image: img.shoreline },
      { slug: "kampot-river-cruise", name: "Kampot River Cruises", province: "Kampot", category: "Cruise", tags: ["Kayak"], blurb: "Slow boats up the Praek Tuek Chhu at dusk, with fireflies in the mangrove after dark.", verified: true, lat: 10.61, lng: 104.181, image: img.kampotNight },
    ],
  },
  {
    slug: "urban-nightlife",
    name: "Urban Lifestyle & Nightlife",
    nameKh: "តំបន់រស់នៅទីក្រុង និងជីវិតរាត្រី",
    vision: "The Cities After Dark",
    tagline: "Rooftops, night markets and kitchens that stay open late.",
    coreIdentity:
      "What the towns do once the heat drops — riverside promenades that fill at six, night markets, live music in converted shophouses, art schools founded by returning refugees, and a bar scene that runs from plastic stools on the pavement to the top of the newest tower.",
    coverageTitle: "The Cities After Dark",
    coverageIntro:
      "Six towns, each with its own evening. What follows is what the night actually looks like in each of them.",
    coverage: [
      { order: 1, kicker: "Phnom Penh", badge: "The capital", name: "Four rivers, all hours", nameKh: "ភ្នំពេញ", body: "The riverside fills an hour before dark, the rooftops open above it, and the food lanes off Street 308 keep going long after both." },
      { order: 2, kicker: "Siem Reap", badge: "Temple town", name: "Pub Street and everything behind it", nameKh: "សៀមរាប", body: "The loudest strip in the country, with the boutique lanes of Kandal Village and the circus tent a few blocks away." },
      { order: 3, kicker: "Battambang", badge: "Art town", name: "Circus and shophouses", nameKh: "បាត់ដំបង", body: "The best-preserved colonial streets in Cambodia, and the arts school that trained most of the country's performers." },
      { order: 4, kicker: "Kampot", badge: "River town", name: "Slow evenings on the water", nameKh: "កំពត", body: "Sunset boats, a music school reviving pre-war Khmer repertoire, and bars that close when the last person leaves." },
      { order: 5, kicker: "Preah Sihanouk", badge: "The port", name: "The coast after dark", nameKh: "ក្រុងព្រះសីហនុ", body: "A working deep-water port, a night market beside it, and the beach bars strung out along Otres." },
      { order: 6, kicker: "Kep", badge: "Bay town", name: "Dinner and nothing else", nameKh: "កែប", body: "The quietest of the six on purpose — the crab market at dusk is the whole evening, and that is the appeal." },
    ],
    categories: ["City Walk", "Night Market", "Coffee", "Sky Bar", "Shopping", "Art Gallery", "Street Food"],
    filterTags: ["Cafe", "Night Life", "Shopping", "Music", "Food", "Architecture"],
    destinations: [
      { slug: "sisowath-quay", name: "Sisowath Quay", nameKh: "មហាវិថីស៊ីសុវត្ថិ", province: "Phnom Penh", category: "City Walk", tags: ["Architecture", "Food"], blurb: "The two-kilometre promenade along the Tonle Sap, at its best an hour before dark.", verified: true, featured: true, lat: 11.57, lng: 104.93, image: img.cityRiverNight },
      { slug: "wat-phnom-walk", name: "Wat Phnom & the Colonial Quarter", nameKh: "វត្តភ្នំ", province: "Phnom Penh", category: "City Walk", tags: ["Architecture"], blurb: "The hill the capital is named after, and the post office square and villas around it.", verified: true, lat: 11.5764, lng: 104.9214, image: img.civic },
      { slug: "siem-reap-riverside", name: "Siem Reap Riverside", province: "Siem Reap", category: "City Walk", tags: ["Architecture", "Cafe"], blurb: "The lit riverbank between the old market and Wat Bo, quiet two streets from Pub Street.", verified: true, lat: 13.3567, lng: 103.8583, image: img.townAerial },
      { slug: "battambang-heritage-walk", name: "Battambang Heritage Walk", province: "Battambang", category: "City Walk", tags: ["Architecture"], blurb: "Shophouse rows, a governor's residence and the best-kept French streets in the country.", verified: true, lat: 13.0957, lng: 103.2022, image: img.shophouse },
      { slug: "kampot-riverside", name: "Kampot Riverside", province: "Kampot", category: "City Walk", tags: ["Night Life", "Cafe"], blurb: "Sunset boats and a strip of low-key bars along the Praek Tuek Chhu.", verified: true, featured: true, lat: 10.61, lng: 104.181, image: img.kampotNight },
      { slug: "pp-night-market", name: "Phnom Penh Night Market", province: "Phnom Penh", category: "Night Market", tags: ["Food", "Shopping"], blurb: "Weekend stalls by the river where everyone eats sitting on mats.", verified: true, lat: 11.575, lng: 104.925, image: img.streetFood },
      { slug: "angkor-night-market", name: "Angkor Night Market", province: "Siem Reap", category: "Night Market", tags: ["Shopping"], blurb: "The original of the town's night markets, still the best for silk and silver.", verified: true, lat: 13.35, lng: 103.85, image: img.marketStall },
      { slug: "sihanoukville-night-market", name: "Sihanoukville Night Market", province: "Preah Sihanouk", category: "Night Market", tags: ["Food", "Shopping"], blurb: "Grilled seafood and skewers a block back from the port, busiest around nine.", verified: true, lat: 10.6333, lng: 103.5167, image: img.streetFood },
      { slug: "street-240", name: "Street 240", province: "Phnom Penh", category: "Coffee", tags: ["Cafe", "Shopping", "Architecture"], blurb: "Cafés and small boutiques along the shophouse row behind the Royal Palace.", verified: true, featured: true, lat: 11.5605, lng: 104.9245, image: img.shophouse },
      { slug: "battambang-cafes", name: "Battambang Café Row", province: "Battambang", category: "Coffee", tags: ["Cafe", "Architecture"], blurb: "Third-wave roasters in shophouses, several of them training baristas as social enterprises.", verified: true, lat: 13.0972, lng: 103.2, image: img.shophouse },
      { slug: "kampot-cafes", name: "Kampot Café Scene", province: "Kampot", category: "Coffee", tags: ["Cafe", "Music"], blurb: "Riverside and old-town cafés, including a deaf-run arts café that has been here for years.", verified: true, lat: 10.6053, lng: 104.1811, image: img.soup },
      { slug: "pp-rooftops", name: "Phnom Penh Rooftop Bars", province: "Phnom Penh", category: "Sky Bar", tags: ["Night Life", "Music"], blurb: "The view over the four rivers from the top of the city's newer towers.", verified: true, featured: true, lat: 11.5564, lng: 104.9282, image: img.cityNight },
      { slug: "siem-reap-rooftops", name: "Siem Reap Rooftops", province: "Siem Reap", category: "Sky Bar", tags: ["Night Life"], blurb: "Pool decks and terraces above the hotel strip, with the temples dark on the horizon.", verified: true, lat: 13.3611, lng: 103.8597, image: img.cityNight },
      { slug: "russian-market", name: "Russian & Central Markets", nameKh: "ផ្សារទួលទំពូង", province: "Phnom Penh", category: "Shopping", tags: ["Shopping", "Architecture"], blurb: "The 1937 art-deco dome, and the tighter, hotter aisles of Toul Tom Poung.", verified: true, lat: 11.5533, lng: 104.9203, image: img.marketStall },
      { slug: "psar-chas", name: "Psar Chas (Old Market)", nameKh: "ផ្សារចាស់", province: "Siem Reap", category: "Shopping", tags: ["Shopping", "Food"], blurb: "The market the tourist quarter grew around, still selling to locals in the mornings.", verified: true, lat: 13.3536, lng: 103.8564, image: img.marketStall },
      { slug: "kandal-village", name: "Kandal Village", province: "Siem Reap", category: "Shopping", tags: ["Shopping", "Cafe"], blurb: "Two streets of designer studios, concept stores and coffee, west of the old market.", verified: true, lat: 13.3583, lng: 103.8528, image: img.shophouse },
      { slug: "psar-nath", name: "Psar Nath", nameKh: "ផ្សារណាត់", province: "Battambang", category: "Shopping", tags: ["Shopping", "Architecture"], blurb: "The yellow deco market hall on the riverfront, and the town's actual centre.", verified: true, lat: 13.0947, lng: 103.2033, image: img.marketStall },
      { slug: "battambang-arts", name: "Battambang Art Scene", province: "Battambang", category: "Art Gallery", tags: ["Architecture", "Music"], blurb: "Independent gallery spaces in colonial shophouses, showing work from the arts school up the road.", verified: true, featured: true, lat: 13.0957, lng: 103.2022, image: img.shophouse },
      { slug: "phare-ponleu-selpak", name: "Phare Ponleu Selpak", province: "Battambang", category: "Art Gallery", tags: ["Music", "Architecture"], blurb: "The arts school founded by returning refugees in 1994, and the circus that came out of it.", verified: true, lat: 13.1167, lng: 103.1833, image: img.townAerial },
      { slug: "phare-circus", name: "Phare, The Cambodian Circus", province: "Siem Reap", category: "Art Gallery", tags: ["Music"], blurb: "Nightly performances under a big top, staged by graduates of the Battambang school.", verified: true, lat: 13.3486, lng: 103.8464, image: img.marketStall },
      { slug: "java-creative", name: "Java Creative Café", province: "Phnom Penh", category: "Art Gallery", tags: ["Cafe", "Architecture"], blurb: "One of the capital's longest-running independent gallery and café spaces.", verified: true, lat: 11.5561, lng: 104.9281, image: img.soup },
      { slug: "bassac-lane", name: "Bassac Lane", province: "Phnom Penh", category: "Street Food", tags: ["Night Life", "Food", "Music"], blurb: "A run of tiny owner-run bars and kitchens off Street 308.", verified: true, featured: true, lat: 11.55, lng: 104.925, image: img.streetFood },
      { slug: "pp-street-food", name: "Phnom Penh Food Lanes", province: "Phnom Penh", category: "Street Food", tags: ["Food", "Night Life"], blurb: "Grilled skewers, num pang and iced coffee from carts that appear at dusk.", verified: true, lat: 11.5605, lng: 104.9245, image: img.streetFood },
      { slug: "pub-street", name: "Pub Street", province: "Siem Reap", category: "Street Food", tags: ["Night Life", "Music", "Food"], blurb: "Loud, cheap and unavoidable — with quieter lanes one block either side.", verified: true, lat: 13.355, lng: 103.855, image: img.marketStall },
      { slug: "kep-evening", name: "Kep Crab Market at Dusk", province: "Kep", category: "Street Food", tags: ["Food"], blurb: "The whole evening in one place: crab, pepper, and the boats coming in behind you.", verified: true, lat: 10.4833, lng: 104.3167, image: img.jetty },
    ],
  },
  {
    slug: "khmer-culinary",
    name: "Khmer Culinary Region",
    nameKh: "តំបន់មុខម្ហូបខ្មែរ",
    vision: "Eat Your Way Across the Country",
    tagline: "Prahok and pepper, market breakfasts and producer visits.",
    coreIdentity:
      "Cambodian food where it is actually made — the pepper terraces and palm-sugar kilns that hold the country's only protected-origin products, the fermenting jars of prahok that underpin nearly every savoury dish, and the provincial cooking that never travelled to the capital.",
    coverageTitle: "The Khmer Table",
    coverageIntro:
      "Six ingredients and dishes explain most of what you will be served. Learn these and the rest of the menu makes sense.",
    coverage: [
      { order: 1, kicker: "Nationwide", badge: "The base", name: "Rice", nameKh: "បាយ", body: "The word for rice and the word for a meal are the same. Deepwater varieties grow with the flood; rainfed paddy fills the rest of the country." },
      { order: 2, kicker: "Tonle Sap", badge: "The backbone", name: "Prahok", nameKh: "ប្រហុក", body: "Fermented fish paste, made in the open each December from the migration out of the lake. It is under almost every savoury dish here." },
      { order: 3, kicker: "Nationwide", badge: "Spice paste", name: "Kroeung", nameKh: "គ្រឿង", body: "Lemongrass, galangal, turmeric, kaffir lime and garlic pounded to a paste — the starting point for curries, soups and amok alike." },
      { order: 4, kicker: "Nationwide", badge: "The dish", name: "Fish Amok", nameKh: "អាម៉ុក", body: "Freshwater fish folded through kroeung and coconut, then steamed in banana leaf until it sets like a custard." },
      { order: 5, kicker: "Nationwide", badge: "Breakfast", name: "Num Banh Chok", nameKh: "នំបញ្ចុក", body: "Fermented rice noodles under a green fish gravy, sold from shoulder baskets and gone by eight in the morning." },
      { order: 6, kicker: "Nationwide", badge: "National dish", name: "Samlor Korko", nameKh: "សម្លរកកូរ", body: "A thick stew of whatever the garden has, bound with toasted ground rice — the dish most Cambodians name first." },
      { order: 7, kicker: "Kampot · Kep", badge: "Protected origin", name: "Kampot Pepper", nameKh: "ម្រេចកំពត", body: "One of the country's first two geographical indications, and the reason Kep crab tastes the way it does." },
      { order: 8, kicker: "Kampong Speu", badge: "Protected origin", name: "Palm Sugar", nameKh: "ស្ករត្នោត", body: "The other founding GI — sap tapped from sugar palms at dawn and boiled down by the roadside all morning." },
    ],
    categories: ["Traditional Food", "Michelin", "Street Food", "Fine Dining", "Cooking Class", "Farm"],
    filterTags: ["Khmer Curry", "Fish Amok", "Num Banh Chok", "Pepper Rice Wine", "Palm Sugar"],
    destinations: [
      { slug: "kep-crab", name: "Kep Crab Market", nameKh: "កែប", province: "Kep", category: "Traditional Food", tags: ["Khmer Curry"], blurb: "Blue swimmer crab, green pepper, and a queue that moves fast.", verified: true, featured: true, lat: 10.4833, lng: 104.3167, image: img.jetty },
      { slug: "prahok-kampong-thom", name: "Prahok Season, Kampong Thom", nameKh: "ប្រហុក", province: "Kampong Thom", category: "Traditional Food", tags: ["Khmer Curry"], blurb: "Fish paste made in the open each December, and the smell that comes with it.", verified: true, lat: 12.7111, lng: 104.8889, image: img.boatWoman },
      { slug: "num-banh-chok", name: "Num Banh Chok Mornings", nameKh: "នំបញ្ចុក", province: "Siem Reap", category: "Traditional Food", tags: ["Num Banh Chok"], blurb: "Rice noodles under green fish gravy, sold from baskets before eight in the morning.", verified: true, featured: true, lat: 13.3622, lng: 103.86, image: img.soup },
      { slug: "kien-svay", name: "Kien Svay Riverside Picnics", nameKh: "កៀនស្វាយ", province: "Kandal", category: "Traditional Food", tags: ["Khmer Curry", "Palm Sugar"], blurb: "Stilted platforms over the Mekong where families eat grilled fish and sticky rice all afternoon.", verified: true, lat: 11.5333, lng: 105.0333, image: img.pathWater },
      { slug: "kralan", name: "Kralan Roadside Stalls", nameKh: "ក្រឡាន", province: "Kampong Cham", category: "Traditional Food", tags: ["Palm Sugar"], blurb: "Sticky rice, coconut and beans grilled inside a bamboo tube and split open at the roadside.", verified: true, lat: 11.9833, lng: 105.4667, image: img.streetFood },
      { slug: "central-market", name: "Psar Thmei Food Stalls", nameKh: "ផ្សារធំថ្មី", province: "Phnom Penh", category: "Street Food", tags: ["Num Banh Chok"], blurb: "The 1937 art-deco dome, and the best kuy teav counters are around its edges.", verified: true, lat: 11.5697, lng: 104.921, image: img.marketStall },
      { slug: "bai-sach-chrouk", name: "Bai Sach Chrouk Mornings", nameKh: "បាយសាច់ជ្រូក", province: "Phnom Penh", category: "Street Food", tags: ["Khmer Curry"], blurb: "Grilled pork over broken rice with pickles and a bowl of broth — the standing national breakfast.", verified: true, lat: 11.5564, lng: 104.9282, image: img.streetFood },
      { slug: "road-60", name: "Road 60 Night Market", province: "Siem Reap", category: "Street Food", tags: ["Khmer Curry"], blurb: "Where the town actually eats after dark — grills, fairground rides and not a tourist menu in sight.", verified: true, lat: 13.3833, lng: 103.8667, image: img.streetFood },
      { slug: "skun", name: "Skun Market", nameKh: "ស្គន់", province: "Kampong Cham", category: "Street Food", tags: [], blurb: "The famous fried tarantula stop on the road east — and much better sticky rice.", verified: true, lat: 11.8167, lng: 105.0333, image: img.marketStall },
      { slug: "russian-market-food", name: "Russian Market Food Hall", province: "Phnom Penh", category: "Street Food", tags: ["Num Banh Chok", "Khmer Curry"], blurb: "A dozen stalls wedged into the middle of the market, cooking from seven in the morning.", verified: true, lat: 11.5533, lng: 104.9203, image: img.marketStall },
      { slug: "pp-fine-dining", name: "Modern Khmer Fine Dining", province: "Phnom Penh", category: "Fine Dining", tags: ["Fish Amok", "Khmer Curry"], blurb: "Tasting menus rebuilding Khmer dishes from the provinces, several run as training restaurants.", verified: true, featured: true, lat: 11.5564, lng: 104.9282, image: img.soup },
      { slug: "siem-reap-fine-dining", name: "Siem Reap Fine Dining", province: "Siem Reap", category: "Fine Dining", tags: ["Fish Amok"], blurb: "Kitchens sourcing from the lake and the farms around town, a few streets off the strip.", verified: true, lat: 13.3583, lng: 103.8528, image: img.soup },
      { slug: "guide-listed-pp", name: "Guide-listed Kitchens, Phnom Penh", province: "Phnom Penh", category: "Michelin", tags: ["Fish Amok"], blurb: "The capital's rooms that appear in international restaurant guides.", verified: true, lat: 11.56, lng: 104.928, image: img.soup },
      { slug: "guide-listed-sr", name: "Guide-listed Kitchens, Siem Reap", province: "Siem Reap", category: "Michelin", tags: ["Khmer Curry"], blurb: "Temple-town kitchens carrying international guide listings, most of them small.", verified: true, lat: 13.3567, lng: 103.8583, image: img.soup },
      { slug: "siem-reap-cooking", name: "Siem Reap Cooking Schools", province: "Siem Reap", category: "Cooking Class", tags: ["Fish Amok", "Khmer Curry"], blurb: "Market shop, then amok and prahok ktis in a half-day, in a dozen kitchens around town.", verified: true, featured: true, lat: 13.3622, lng: 103.86, image: img.soup },
      { slug: "pp-cooking", name: "Phnom Penh Cooking Classes", province: "Phnom Penh", category: "Cooking Class", tags: ["Khmer Curry", "Num Banh Chok"], blurb: "Half-days that start in Psar Thmei and end with samlor korko on the table.", verified: true, lat: 11.5697, lng: 104.921, image: img.marketStall },
      { slug: "battambang-cooking", name: "Battambang Farm Kitchens", province: "Battambang", category: "Cooking Class", tags: ["Palm Sugar", "Khmer Curry"], blurb: "Cooking in the rice belt, with the vegetables picked in the garden you are standing in.", verified: true, lat: 13.05, lng: 103.25, image: img.riceAerial },
      { slug: "kampot-pepper", name: "Kampot Pepper Farms", nameKh: "ម្រេចកំពត", province: "Kampot", category: "Farm", tags: ["Pepper Rice Wine"], blurb: "Protected-origin pepper terraces you can walk, taste and buy at the source.", detail: "Pepper has been grown on these slopes since at least the thirteenth century, and the Kampot designation is one of Cambodia's first two protected geographical indications. Most farms are small, trellised plots you can walk through, and the tasting is worth doing properly — black, red and white are the same berry picked and processed differently, and the difference between them is obvious side by side.", verified: true, featured: true, lat: 10.65, lng: 104.25, image: img.boatsMountains },
      { slug: "palm-sugar", name: "Palm Sugar Kilns", nameKh: "ស្ករត្នោត", province: "Kampong Speu", category: "Farm", tags: ["Palm Sugar"], blurb: "Sugar palms tapped at dawn and boiled down by the roadside all morning.", verified: true, lat: 11.45, lng: 104.5167, image: img.paddy },
      { slug: "battambang-rice", name: "Battambang Rice Country", province: "Battambang", category: "Farm", tags: ["Palm Sugar"], blurb: "The country's rice bowl, with bamboo sticky rice grilled along the roads out of town.", verified: true, lat: 13.0957, lng: 103.2022, image: img.riceAerial },
      { slug: "rice-wine", name: "Rice Wine & Craft Distilleries", province: "Siem Reap", category: "Farm", tags: ["Pepper Rice Wine"], blurb: "Village sraa sor and the small distilleries infusing it with pepper, ginger and palm sugar.", verified: true, lat: 13.3567, lng: 103.8583, image: img.jungleVillage },
      { slug: "siem-reap-farms", name: "Siem Reap Organic Farms", province: "Siem Reap", category: "Farm", tags: ["Khmer Curry"], blurb: "Market gardens outside town supplying the restaurants, most open for a morning visit.", verified: true, lat: 13.3167, lng: 103.9, image: img.paddy },
    ],
  },
  {
    slug: "eco-community",
    name: "Eco-Community Tourism",
    nameKh: "ទេសចរណ៍ធម្មជាតិ និងសហគមន៍",
    vision: "Travel That Stays in the Village",
    tagline: "Homestays, community forests and locally run enterprises.",
    coreIdentity:
      "Community-based ecotourism, where the enterprise is owned by the village rather than sold to it — homestays taken in rotation, guiding and ranger work replacing logging income, and a share of every booking going into a fund the community spends itself.",
    coverageTitle: "How Community Tourism Works",
    coverageIntro:
      "Nearly every site in this region runs on the same six-part model. It is worth understanding before you book, because it is what your money is actually buying.",
    coverage: [
      { order: 1, kicker: "Ownership", badge: "Village committee", name: "The community runs it", body: "An elected committee sets prices, handles bookings and decides how income is divided — not an operator in Phnom Penh." },
      { order: 2, kicker: "Rotation", badge: "Member households", name: "Guests take turns", body: "Homestays receive visitors on a roster, so the income spreads across the village instead of concentrating in three houses." },
      { order: 3, kicker: "Employment", badge: "Guides & rangers", name: "The people who knew the forest", body: "Guiding, boat handling and patrol work goes to the households who previously logged, snared or fished it — the ones who know it best." },
      { order: 4, kicker: "Revenue", badge: "Community fund", name: "A share of every booking", body: "A fixed cut of each stay goes to a village fund, typically spent on the school, the water supply or the road." },
      { order: 5, kicker: "Protection", badge: "CPA · Community forestry", name: "The land agreement", body: "Most sites sit on a Community Protected Area or community forest, held under agreement with the Ministry of Environment." },
      { order: 6, kicker: "The trade-off", badge: "What it replaces", name: "Logging, snaring, clearing", body: "The model only holds while tourism pays better than the alternatives. Visiting in the low season is worth more than visiting in the high one." },
    ],
    categories: ["Homestay", "Village", "Craft", "Agriculture", "Eco Lodge", "Bird Watching", "Local Guide"],
    filterTags: ["Homestay", "Community", "Cycling", "Farm", "Local Food", "Fishing"],
    destinations: [
      { slug: "banteay-chhmar-homestay", name: "Banteay Chhmar Homestay", nameKh: "បន្ទាយឆ្មារ", province: "Banteay Meanchey", category: "Homestay", tags: ["Homestay", "Community", "Local Food"], blurb: "Sleep in the village beside a Jayavarman VII temple city, with dinner cooked at the house.", verified: true, featured: true, lat: 14.0333, lng: 103.0833, image: img.monk },
      { slug: "koh-trong-homestay", name: "Koh Trong Homestays", nameKh: "កោះទ្រង់", province: "Kratié", category: "Homestay", tags: ["Homestay", "Cycling", "Farm"], blurb: "Family houses on a Mekong sandbank island, reached by the little ferry from Kratié.", verified: true, lat: 12.4667, lng: 106.0167, image: img.pathWater },
      { slug: "chambok-cbet", name: "Chambok CBET", nameKh: "ចំបក់", province: "Kampong Speu", category: "Homestay", tags: ["Homestay", "Community", "Cycling"], blurb: "One of the country's oldest community projects, with ox-cart rides, a waterfall trail and thirty host families.", verified: true, featured: true, lat: 11.35, lng: 104.1167, image: img.waterfallForest },
      { slug: "sambor-prei-kuk-homestay", name: "Sambor Prei Kuk Homestays", nameKh: "សំបូរព្រៃគុក", province: "Kampong Thom", category: "Homestay", tags: ["Homestay", "Community", "Local Food"], blurb: "Village stays beside the pre-Angkorian brick towers, with guiding by people who grew up among them.", verified: true, lat: 12.8722, lng: 105.04, image: img.brickTower },
      { slug: "areng-valley", name: "Areng Valley", nameKh: "អារ៉ែង", province: "Koh Kong", category: "Village", tags: ["Community", "Homestay"], blurb: "A valley the community kept from being dammed, now open for stays and river trips.", verified: true, lat: 11.5, lng: 103.3, image: img.riverForest },
      { slug: "kampong-phluk-cbet", name: "Kampong Phluk Boat Cooperative", nameKh: "កំពង់ភ្លុក", province: "Siem Reap", category: "Village", tags: ["Fishing", "Community", "Local Food"], blurb: "Village-run rowing boats into the flooded forest, rather than the big tour launches.", verified: true, lat: 13.1833, lng: 103.9833, image: img.floatingVillage },
      { slug: "trapeang-sangkae", name: "Trapeang Sangkae", nameKh: "ត្រពាំងសង្កែ", province: "Kampot", category: "Village", tags: ["Fishing", "Community"], blurb: "A fishing community that replanted its own mangrove, and now guides boats through it.", verified: true, lat: 10.6, lng: 104.2333, image: img.riverForest },
      { slug: "silk-cooperatives", name: "Silk Weaving Cooperatives", province: "Takéo", category: "Craft", tags: ["Community", "Farm"], blurb: "Golden-silk weaving villages where the whole chain, worm to cloth, is on one street.", verified: true, lat: 10.9833, lng: 104.7833, image: img.paddy },
      { slug: "mekong-blue", name: "Mekong Blue Silk Centre", province: "Stung Treng", category: "Craft", tags: ["Community"], blurb: "A women's development centre weaving raw silk on the far northern Mekong.", verified: true, lat: 13.5259, lng: 105.9683, image: img.marketStall },
      { slug: "andong-russey", name: "Andong Russey Pottery Village", nameKh: "អណ្ដូងឫស្សី", province: "Kampong Chhnang", category: "Craft", tags: ["Community", "Local Food"], blurb: "Coil-built cooking pots turned by hand and fired in the open, in the province named after them.", verified: true, lat: 12.2333, lng: 104.6167, image: img.marketStall },
      { slug: "artisans-angkor", name: "Angkor Craft Workshops", province: "Siem Reap", category: "Craft", tags: ["Community"], blurb: "Silk, stone and lacquer workshops training apprentices from the villages around town.", verified: true, lat: 13.3536, lng: 103.8564, image: img.shophouse },
      { slug: "community-farms", name: "Community Rice Farms", province: "Battambang", category: "Agriculture", tags: ["Farm", "Community", "Cycling"], blurb: "Farm stays in the rice belt, with the day's work starting well before the heat.", verified: true, lat: 13.05, lng: 103.25, image: img.riceAerial },
      { slug: "pepper-smallholders", name: "Pepper Smallholder Cooperatives", province: "Kampot", category: "Agriculture", tags: ["Farm", "Community"], blurb: "Family plots inside the protected-origin zone, selling under a shared cooperative label.", verified: true, lat: 10.65, lng: 104.25, image: img.boatsMountains },
      { slug: "palm-sugar-coops", name: "Palm Sugar Cooperatives", province: "Kampong Speu", category: "Agriculture", tags: ["Farm", "Community", "Local Food"], blurb: "Tapping families organised under the geographical indication, boiling sap the same morning it is cut.", verified: true, lat: 11.45, lng: 104.5167, image: img.paddy },
      { slug: "evp", name: "Elephant Valley Project", province: "Mondulkiri", category: "Eco Lodge", tags: ["Community"], blurb: "Retired elephants in forest, with Bunong mahouts employed to walk with them.", verified: true, featured: true, lat: 12.4, lng: 107.15, image: img.forestBridge },
      { slug: "osoam", name: "Osoam Cardamom Community Centre", province: "Pursat", category: "Eco Lodge", tags: ["Community", "Homestay"], blurb: "A village centre deep in the Cardamoms, and the usual base for multi-day walks into the range.", verified: true, lat: 12.05, lng: 103.2, image: img.jungleVillage },
      { slug: "andoung-kraloeng", name: "Andoung Kraloeng Gibbon Camp", province: "Mondulkiri", category: "Eco Lodge", tags: ["Community", "Homestay"], blurb: "A Bunong-run forest camp in Keo Seima, and dawn treks to habituated yellow-cheeked gibbons.", verified: true, lat: 12.2, lng: 106.9, image: img.forestWalkers },
      { slug: "prek-toal-cbet", name: "Prek Toal Community", nameKh: "ព្រែកទាល់", province: "Battambang", category: "Bird Watching", tags: ["Community", "Fishing"], blurb: "Former egg collectors now guard the colony and guide the boats into it.", verified: true, featured: true, lat: 13.15, lng: 103.6333, image: img.riverTrees },
      { slug: "tmatboey", name: "Tmatboey Ibis Site", nameKh: "ត្មាតបើយ", province: "Preah Vihear", category: "Bird Watching", tags: ["Community", "Homestay"], blurb: "A village in Kulen Promtep that protects nesting giant and white-shouldered ibis, and is paid per sighting.", detail: "A village of a few hundred families inside Kulen Promtep Wildlife Sanctuary, and the best place in the world to see giant ibis — a bird down to a few hundred pairs, almost all of them in northern Cambodia. The arrangement is direct: the community protects the nests, and visitors pay a conservation contribution on top of the stay, with a bonus paid to the village when a bird is seen. Best from December to May, when the water is down.", verified: true, featured: true, lat: 13.9333, lng: 104.9167, image: img.dirtPath },
      { slug: "ang-trapeang-thmor-cbet", name: "Ang Trapeang Thmor", province: "Banteay Meanchey", category: "Bird Watching", tags: ["Community", "Farm"], blurb: "Sarus cranes on a Khmer Rouge-era reservoir, watched from the village that farms around it.", verified: true, lat: 13.8, lng: 103.3, image: img.riceAerial },
      { slug: "boeung-prek-lapouv", name: "Boeung Prek Lapouv", province: "Takéo", category: "Bird Watching", tags: ["Community", "Farm"], blurb: "Grassland on the Vietnamese border holding the country's other sarus crane flock in the dry months.", verified: true, lat: 10.7333, lng: 104.9667, image: img.paddy },
      { slug: "chi-phat-cbet", name: "Chi Phat CBET", nameKh: "ជីផាត", province: "Koh Kong", category: "Local Guide", tags: ["Homestay", "Community", "Cycling"], blurb: "The country's best-known community ecotourism project, run by former loggers and poachers.", verified: true, featured: true, lat: 11.3167, lng: 103.4667, image: img.jungleVillage },
      { slug: "yeak-laom-cbet", name: "Yeak Laom Community", nameKh: "យក្សឡោម", province: "Ratanakiri", category: "Local Guide", tags: ["Community", "Local Food"], blurb: "The Tampuan committee that owns and manages the crater lake, and guides around it.", verified: true, lat: 13.7333, lng: 107.0167, image: img.lakeDawn },
      { slug: "ta-veng-cbet", name: "Ta Veng River Guides", province: "Ratanakiri", category: "Local Guide", tags: ["Community", "Fishing", "Homestay"], blurb: "Brao boatmen running the upper Sesan and the northern approach into Virachey.", verified: true, lat: 14.0333, lng: 107.05, image: img.blueBoat },
    ],
  },
  {
    slug: "luxury",
    name: "Luxury Tourism",
    nameKh: "ទេសចរណ៍ប្រណីត",
    vision: "The Slower, Quieter Version",
    tagline: "Boutique retreats, private guides and time to do less.",
    coreIdentity:
      "The same country at a different pace. What the premium actually buys here is rarely marble — it is access before the coaches arrive, a guide who reads the inscriptions rather than reciting them, and the distance between an island jetty and anyone else.",
    coverageTitle: "The Luxury Map",
    coverageIntro:
      "High-end infrastructure is concentrated in six places. This is what the top end looks like in each of them.",
    coverage: [
      { order: 1, kicker: "Siem Reap", badge: "Temples & boutique", name: "The temple town", nameKh: "សៀមរាប", body: "The deepest concentration of boutique and five-star properties in the country, plus the guides, courses and helicopters that come with them." },
      { order: 2, kicker: "Preah Sihanouk", badge: "Private islands", name: "The Koh Rong archipelago", nameKh: "កោះរុង", body: "Whole-island properties reached by private launch, where the nearest other guests are a headland away." },
      { order: 3, kicker: "Phnom Penh", badge: "City & river", name: "The capital", nameKh: "ភ្នំពេញ", body: "Riverside hotels, the country's most ambitious kitchens, and the departure point for every Mekong cabin cruise." },
      { order: 4, kicker: "Kampot · Kep", badge: "Riverside & bay", name: "The southern retreats", nameKh: "កំពត", body: "Small properties with the Bokor range behind them and the crab market down the road — quiet rather than grand." },
      { order: 5, kicker: "Koh Kong", badge: "Tented camps", name: "The Cardamoms", body: "Tented camps on the Tatai river whose rates fund the ranger patrols working the forest around them." },
      { order: 6, kicker: "Kandal · Kratié", badge: "River cruising", name: "The Mekong", body: "Cabin cruises running between the capital, the Tonle Sap and the delta below the Vietnamese border." },
    ],
    categories: ["Luxury Hotel", "Private Island", "Golf", "Helicopter", "Yacht", "Private Guide", "Fine Dining", "Spa", "VIP Tour"],
    filterTags: ["Luxury", "5 Stars", "Private", "Exclusive", "Helicopter", "Golf Spa"],
    destinations: [
      { slug: "siem-reap-boutique", name: "Siem Reap Boutique Stays", province: "Siem Reap", category: "Luxury Hotel", tags: ["Luxury", "5 Stars"], blurb: "Small properties in the lanes off Wat Bo, most under thirty rooms and built around a courtyard.", verified: true, featured: true, lat: 13.3563, lng: 103.8622, image: img.resortPool },
      { slug: "pp-riverside-hotels", name: "Phnom Penh Riverside Hotels", province: "Phnom Penh", category: "Luxury Hotel", tags: ["Luxury", "5 Stars"], blurb: "Colonial-era and contemporary rooms looking over the four-rivers junction.", verified: true, lat: 11.5683, lng: 104.9308, image: img.cityRiverNight },
      { slug: "kep-villas", name: "Kep Hillside Villas", province: "Kep", category: "Luxury Hotel", tags: ["Private", "Luxury"], blurb: "Villas on the slope above the bay, with the crab market ten minutes below.", verified: true, lat: 10.4833, lng: 104.3, image: img.jetty },
      { slug: "kampot-retreats", name: "Kampot Riverside Retreats", province: "Kampot", category: "Luxury Hotel", tags: ["Luxury", "Private"], blurb: "Low-key riverside properties with the Bokor range standing behind them.", verified: true, lat: 10.6, lng: 104.16, image: img.kampotNight },
      { slug: "private-islands", name: "Private Island Retreats", province: "Preah Sihanouk", category: "Private Island", tags: ["Exclusive", "Private", "Luxury"], blurb: "Whole-island properties in the Koh Rong archipelago, reached by private launch.", verified: true, featured: true, lat: 10.6667, lng: 103.25, image: img.poolPalms },
      { slug: "inner-island-villas", name: "Inner Island Villas", province: "Preah Sihanouk", category: "Private Island", tags: ["Private", "Luxury", "Exclusive"], blurb: "Beachfront villas on the closer islands, thirty minutes out rather than two hours.", verified: true, lat: 10.5667, lng: 103.3833, image: img.islandAerial },
      { slug: "angkor-golf", name: "Siem Reap Golf Courses", province: "Siem Reap", category: "Golf", tags: ["Golf Spa", "Luxury"], blurb: "Championship courses a few minutes from the temples, playable year round.", verified: true, lat: 13.3833, lng: 103.8167, image: img.poolPalms },
      { slug: "pp-golf", name: "Phnom Penh Golf Courses", province: "Phnom Penh", category: "Golf", tags: ["Golf Spa", "Luxury"], blurb: "Full-length courses on the city's northern and western edges, an easy morning from town.", verified: true, lat: 11.6167, lng: 104.8667, image: img.paddy },
      { slug: "angkor-helicopter", name: "Helicopter Tours over Angkor", province: "Siem Reap", category: "Helicopter", tags: ["Helicopter", "Private", "Exclusive"], blurb: "Angkor from the air, the only way to read the full plan of the city at once.", verified: true, featured: true, lat: 13.4125, lng: 103.867, image: img.angkorWat },
      { slug: "coastal-transfers", name: "Island & Coastal Air Transfers", province: "Preah Sihanouk", category: "Helicopter", tags: ["Helicopter", "Private"], blurb: "Charter flights and helicopter hops that turn a six-hour road transfer into forty minutes.", verified: true, lat: 10.6167, lng: 103.5167, image: img.shoreline },
      { slug: "gulf-charters", name: "Gulf Yacht Charters", province: "Preah Sihanouk", category: "Yacht", tags: ["Private", "Exclusive", "Luxury"], blurb: "Crewed day and overnight charters out through the archipelago to the outer islands.", verified: true, lat: 10.59, lng: 103.5, image: img.waterMountains },
      { slug: "mekong-cruises", name: "Mekong River Cruises", province: "Kandal", category: "Yacht", tags: ["Luxury", "Private"], blurb: "Cabin cruises between Phnom Penh, the Tonle Sap and the delta below the border.", verified: true, lat: 11.6, lng: 104.95, image: img.blueBoat },
      { slug: "angkor-private-guiding", name: "Angkor Private Guiding", province: "Siem Reap", category: "Private Guide", tags: ["Private", "Exclusive"], blurb: "Licensed guides who work from the inscriptions, on your schedule rather than a coach's.", verified: true, featured: true, lat: 13.4125, lng: 103.867, image: img.causeway },
      { slug: "cardamom-naturalists", name: "Cardamom Naturalist Guiding", province: "Koh Kong", category: "Private Guide", tags: ["Private", "Exclusive"], blurb: "Private guiding with the biologists and rangers who survey the range.", verified: true, lat: 11.5333, lng: 103.1, image: img.forestWalkers },
      { slug: "pp-museum-guiding", name: "Phnom Penh Museum Guiding", province: "Phnom Penh", category: "Private Guide", tags: ["Private"], blurb: "Curator-led mornings in the National Museum, before the tour groups reach it.", verified: true, lat: 11.5652, lng: 104.929, image: img.statue },
      { slug: "pp-fine-dining", name: "Phnom Penh Fine Dining", province: "Phnom Penh", category: "Fine Dining", tags: ["Luxury", "Exclusive"], blurb: "Modern Khmer tasting menus, several of them run as training restaurants.", verified: true, lat: 11.5564, lng: 104.9282, image: img.soup },
      { slug: "siem-reap-fine-dining", name: "Siem Reap Fine Dining", province: "Siem Reap", category: "Fine Dining", tags: ["Luxury", "5 Stars"], blurb: "Kitchens sourcing from the lake and the farms around town, a few streets off the strip.", verified: true, lat: 13.3583, lng: 103.8528, image: img.soup },
      { slug: "siem-reap-spas", name: "Siem Reap Spa Retreats", province: "Siem Reap", category: "Spa", tags: ["Golf Spa", "Luxury", "5 Stars"], blurb: "Hotel spas built around Khmer massage and herbal compress, most open to non-residents.", verified: true, lat: 13.3563, lng: 103.8622, image: img.resortPool },
      { slug: "cardamom-lodges", name: "Cardamom Rainforest Lodges", province: "Koh Kong", category: "Spa", tags: ["Exclusive", "Luxury"], blurb: "Tented camps on the Tatai river that fund the ranger patrols around them.", verified: true, featured: true, lat: 11.5333, lng: 103.1, image: img.riverForest },
      { slug: "kampot-wellness", name: "Kampot Wellness Retreats", province: "Kampot", category: "Spa", tags: ["Luxury", "Private"], blurb: "Yoga and treatment weeks on the river, usually booked by the week rather than the night.", verified: true, lat: 10.6, lng: 104.16, image: img.boatsMountains },
      { slug: "vip-angkor", name: "VIP Angkor Access", province: "Siem Reap", category: "VIP Tour", tags: ["Exclusive", "Private", "5 Stars"], blurb: "Early-access arrangements, private transport and a guide who plans around the light.", verified: true, featured: true, lat: 13.4413, lng: 103.859, image: img.statue },
      { slug: "northern-temples-expedition", name: "Northern Temples Expedition", province: "Preah Vihear", category: "VIP Tour", tags: ["Exclusive", "Private"], blurb: "Preah Vihear, Koh Ker and Preah Khan of Kompong Svay in one private run, with the transport it takes.", verified: true, lat: 14.3931, lng: 104.68, image: img.ruinsTrees },
    ],
  },
];

export function getRegionDetail(slug: string) {
  return regionDetails.find((region) => region.slug === slug);
}

export function getRegionDestination(regionSlug: string, placeSlug: string) {
  const region = getRegionDetail(regionSlug);
  const destination = region?.destinations.find(
    (item) => item.slug === placeSlug,
  );
  return region && destination ? { region, destination } : undefined;
}

/** Great-circle distance in km, used to rank nearby places. */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
