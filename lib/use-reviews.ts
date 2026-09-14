"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Stay ratings and reviews.
 *
 * TODO: kept in this browser until the API exists — then load a stay's
 * reviews from the server and send `submit`/`remove` there. One review per
 * account per stay.
 */
export const CATEGORIES = ["Location", "Comfort", "Value", "Hosts"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Review = {
  /** The account's username — one review each. */
  user: string;
  displayName: string;
  /** 1–5. */
  overall: number;
  /** Optional 1–5 per category. */
  scores: Partial<Record<Category, number>>;
  text: string;
  /** When it was last written, in ms. */
  at: number;
};

const KEY = "ams-travel:reviews";
const EVENT = "ams-travel:reviews-change";
const EMPTY: Record<string, Review[]> = {};
const NONE: Review[] = [];

let cachedRaw: string | null = null;
let cachedAll: Record<string, Review[]> = EMPTY;

function readRaw() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getAll(): Record<string, Review[]> {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      cachedAll =
        parsed && typeof parsed === "object"
          ? (parsed as Record<string, Review[]>)
          : EMPTY;
    } catch {
      cachedAll = EMPTY;
    }
  }
  return cachedAll;
}

function write(next: Record<string, Review[]>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Average, count, 5→1 breakdown and per-category averages. */
export function summarise(reviews: Review[]) {
  const count = reviews.length;
  const average = count
    ? reviews.reduce((sum, review) => sum + review.overall, 0) / count
    : 0;
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.overall === stars).length,
  }));
  const categories = CATEGORIES.map((name) => {
    const scored = reviews
      .map((review) => review.scores[name])
      .filter((score): score is number => typeof score === "number");
    return {
      name,
      average: scored.length
        ? scored.reduce((sum, score) => sum + score, 0) / scored.length
        : null,
    };
  });
  return { count, average, breakdown, categories };
}

/** Every review this traveller has written, with the stay it belongs to. */
export function useMyReviews(username: string | null) {
  const all = useSyncExternalStore(subscribe, getAll, () => EMPTY);
  if (!username) return [];
  return Object.entries(all)
    .flatMap(([stayKey, list]) =>
      list.filter((review) => review.user === username).map((review) => ({ stayKey, review })),
    )
    .sort((a, b) => b.review.at - a.review.at);
}

/** How many reviews this traveller has written, across every stay. */
export function useReviewCount(username: string | null) {
  const all = useSyncExternalStore(subscribe, getAll, () => EMPTY);
  if (!username) return 0;
  return Object.values(all).reduce(
    (total, list) => total + list.filter((review) => review.user === username).length,
    0,
  );
}

/** One stay's reviews, newest first, plus the signed-in user's own. */
export function useReviews(stayKey: string, username: string | null) {
  const all = useSyncExternalStore(subscribe, getAll, () => EMPTY);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const reviews = all[stayKey] ?? NONE;
  const mine = username ? reviews.find((review) => review.user === username) : undefined;

  const submit = useCallback(
    (review: Omit<Review, "at">) => {
      const current = getAll();
      const others = (current[stayKey] ?? []).filter(
        (item) => item.user !== review.user,
      );
      write({ ...current, [stayKey]: [{ ...review, at: Date.now() }, ...others] });
    },
    [stayKey],
  );

  const remove = useCallback(() => {
    if (!username) return;
    const current = getAll();
    write({
      ...current,
      [stayKey]: (current[stayKey] ?? []).filter((item) => item.user !== username),
    });
  }, [stayKey, username]);

  const sorted = [...reviews].sort((a, b) => b.at - a.at);
  return { reviews: sorted, mine, submit, remove, ready };
}
