/**
 * Badges, earned from what a traveller actually does on the site: the pages
 * they browse, the reviews they write, and how much of the country they cover.
 */
export type BadgeId = "browser" | "reviewer" | "adventure";

export const TIERS = ["Silver", "Gold", "Platinum"] as const;
export type Tier = (typeof TIERS)[number];

/** One rung of a badge's ladder. */
export type Step = { tier: Tier; at: number; label: string };

export type Badge = {
  id: BadgeId;
  name: string;
  /** What earns it, in one line. */
  earn: string;
  /** How it is counted, for the badge's detail panel. */
  how: string;
  /** Where the traveller is now, e.g. "12 pages browsed". */
  progressLabel: string;
  value: number;
  /** Null until the first tier is reached. */
  tier: Tier | null;
  steps: Step[];
  /** The tier being worked towards, and what it takes. */
  next?: { tier: Tier; needed: number; at: number };
  /** 0–1 towards the next tier, or 1 at the top tier. */
  fraction: number;
  /** "3 more regions", for the status line. */
  remainingLabel: string;
};

const DEFINITIONS: Record<
  BadgeId,
  {
    name: string;
    earn: string;
    how: string;
    unit: [string, string];
    remaining: [string, string];
    steps: [number, number, number];
    verb: string;
  }
> = {
  browser: {
    name: "Browser Badge",
    earn: "Browse places across the site",
    how: "Opening a destination, stay or room page counts as one browse. The same page within half an hour counts once.",
    unit: ["page browsed", "pages browsed"],
    remaining: ["page", "pages"],
    steps: [300, 800, 1000],
    verb: "browse",
  },
  reviewer: {
    name: "Reviewer Badge",
    earn: "Review the stays you visit",
    how: "One review per stay counts, whether you write a comment or only give stars.",
    unit: ["review written", "reviews written"],
    remaining: ["review", "reviews"],
    steps: [50, 400, 1000],
    verb: "review",
  },
  adventure: {
    name: "Adventure Badge",
    earn: "Collect digital stamps where you go",
    how: "Every destination and stay has a Collect stamp button on its page. One stamp per place, and you can remove one if you tap it by mistake.",
    unit: ["digital stamp", "digital stamps"],
    remaining: ["stamp", "stamps"],
    steps: [50, 200, 1000],
    verb: "Digital Stamp",
  },
};

function build(id: BadgeId, value: number): Badge {
  const { name, earn, how, unit, remaining, steps: thresholds } = DEFINITIONS[id];

  const steps: Step[] = thresholds.map((at, i) => ({
    tier: TIERS[i],
    at,
    label: `${at.toLocaleString()}+ ${DEFINITIONS[id].verb}`,
  }));

  const reached = thresholds.filter((at) => value >= at).length;
  const tier = reached > 0 ? TIERS[reached - 1] : null;
  const nextAt = thresholds[reached];
  const from = reached > 0 ? thresholds[reached - 1] : 0;
  const fraction =
    nextAt === undefined ? 1 : Math.min(1, Math.max(0, (value - from) / (nextAt - from)));
  const needed = nextAt === undefined ? 0 : nextAt - value;

  return {
    id,
    name,
    earn,
    how,
    value,
    tier,
    steps,
    progressLabel: `${value.toLocaleString()} ${value === 1 ? unit[0] : unit[1]}`,
    next: nextAt === undefined ? undefined : { tier: TIERS[reached], needed, at: nextAt },
    remainingLabel: `${needed.toLocaleString()} more ${needed === 1 ? remaining[0] : remaining[1]}`,
    fraction,
  };
}

export function buildBadges(counts: {
  browsed: number;
  reviews: number;
  stamps: number;
}): Badge[] {
  return [
    build("browser", counts.browsed),
    build("reviewer", counts.reviews),
    build("adventure", counts.stamps),
  ];
}

/** The badge to lead with: the highest tier, then the closest to the next one. */
export function topBadge(badges: Badge[]) {
  return [...badges].sort((a, b) => {
    const rank = (badge: Badge) => (badge.tier ? TIERS.indexOf(badge.tier) + 1 : 0);
    return rank(b) - rank(a) || b.fraction - a.fraction;
  })[0];
}

/** Ranks come from tiers earned across every badge: 9 points in all. */
const RANKS = [
  { name: "Newcomer", from: 0 },
  { name: "Explorer", from: 1 },
  { name: "Adventurer", from: 3 },
  { name: "Pathfinder", from: 5 },
  { name: "Trailblazer", from: 7 },
  { name: "Legend", from: 9 },
] as const;

export const MAX_POINTS = TIERS.length * 3;

export type Rank = {
  name: string;
  /** Tier points earned, out of nine. */
  points: number;
  /** How many badges have reached a tier. */
  earned: number;
  next?: { name: string; needed: number };
  /** 0–1 towards the next rank. */
  fraction: number;
};

export function overallRank(badges: Badge[]): Rank {
  const points = badges.reduce(
    (total, badge) => total + (badge.tier ? TIERS.indexOf(badge.tier) + 1 : 0),
    0,
  );
  const index = RANKS.filter((rank) => points >= rank.from).length - 1;
  const current = RANKS[index];
  const next = RANKS[index + 1];

  return {
    name: current.name,
    points,
    earned: badges.filter((badge) => badge.tier).length,
    next: next ? { name: next.name, needed: next.from - points } : undefined,
    fraction: next
      ? Math.min(1, Math.max(0, (points - current.from) / (next.from - current.from)))
      : 1,
  };
}
