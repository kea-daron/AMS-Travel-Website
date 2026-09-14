"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "ams-travel:saved";
/** When each place was saved, for the history list. Kept alongside the list. */
const TIMES_KEY = "ams-travel:saved-at";
/** Fired on this tab; the native `storage` event only reaches other tabs. */
const EVENT = "ams-travel:saved-change";

const EMPTY: string[] = [];

// useSyncExternalStore needs a referentially stable snapshot, so the parsed
// list is cached until the raw string actually changes.
let cachedRaw: string | null = null;
let cachedList: string[] = EMPTY;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    // Private browsing or storage disabled.
    return null;
  }
}

function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedList = parse(raw);
  }
  return cachedList;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readTimes(): Record<string, number> {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(TIMES_KEY) ?? "{}",
    );
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, number>)
      : {};
  } catch {
    return {};
  }
}

/** Notes the moment a place was saved; forgets it when it is removed. */
function stamp(added: string[], removed: string[]) {
  try {
    const times = readTimes();
    for (const slug of added) times[slug] = Date.now();
    for (const slug of removed) delete times[slug];
    window.localStorage.setItem(TIMES_KEY, JSON.stringify(times));
  } catch {
    // Best effort: the list still works without the dates.
  }
}

function write(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Best-effort: nothing to do if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Adds a place outside React — used to finish a save that waited on login. */
export function addSaved(slug: string) {
  const current = parse(readRaw());
  if (current.includes(slug)) return;
  stamp([slug], []);
  write([slug, ...current]);
}

/**
 * Saved places, held in localStorage.
 *
 * The server and the hydrating client both see an empty list, then React swaps
 * in the real one — `ready` marks that moment so callers can hold off on
 * rendering an empty state that is about to fill.
 *
 * TODO: move this to the account once auth exists, so a list follows the
 * traveller between devices instead of living in one browser.
 */
/** When each saved place was added; missing for anything saved before dates were kept. */
export function useSavedTimes() {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(TIMES_KEY);
      } catch {
        return null;
      }
    },
    () => null,
  );
  return raw ? readTimes() : {};
}

export function useSaved() {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((slug: string) => {
    const next = [...parse(readRaw())];
    const index = next.indexOf(slug);
    if (index === -1) {
      next.unshift(slug);
      stamp([slug], []);
    } else {
      next.splice(index, 1);
      stamp([], [slug]);
    }
    write(next);
  }, []);

  const remove = useCallback((slug: string) => {
    stamp([], [slug]);
    write(parse(readRaw()).filter((item) => item !== slug));
  }, []);

  const clear = useCallback(() => {
    stamp([], parse(readRaw()));
    write([]);
  }, []);

  const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, isSaved, toggle, remove, clear, ready };
}
