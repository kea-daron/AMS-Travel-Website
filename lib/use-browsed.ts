"use client";

import { useSyncExternalStore } from "react";

/**
 * How many place pages this browser has opened — what the Browser badge
 * counts. The same page within half an hour counts once, so refreshing or
 * going back does not inflate it.
 *
 * TODO: move to the account once the API exists, so browsing follows the
 * traveller between devices.
 */
const KEY = "ams-travel:browsed";
const EVENT = "ams-travel:browsed-change";
const SEEN = "ams-travel:browsed-recent";
const REPEAT_MS = 30 * 60 * 1000;

function read() {
  try {
    return Number(window.localStorage.getItem(KEY)) || 0;
  } catch {
    return 0;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Counts one visit to `key`, unless the same page was counted recently. */
export function recordBrowse(key: string) {
  try {
    const recent: Record<string, number> = JSON.parse(
      window.sessionStorage.getItem(SEEN) ?? "{}",
    );
    const now = Date.now();
    if (recent[key] && now - recent[key] < REPEAT_MS) return;

    recent[key] = now;
    window.sessionStorage.setItem(SEEN, JSON.stringify(recent));
    window.localStorage.setItem(KEY, String(read() + 1));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    // Storage unavailable: browsing simply is not counted.
  }
}

export function useBrowseCount() {
  return useSyncExternalStore(subscribe, read, () => 0);
}
