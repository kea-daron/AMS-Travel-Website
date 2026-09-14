"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Digital stamps — a passport of the places a traveller has been to. One
 * stamp per place, collected on its page, and counted by the Adventure badge.
 *
 * TODO: kept in this browser until the API exists, like the saved list.
 */
const KEY = "ams-travel:stamps";
const EVENT = "ams-travel:stamps-change";
const EMPTY: Record<string, number> = {};

let cachedRaw: string | null = null;
let cachedStamps: Record<string, number> = EMPTY;

function readRaw() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getStamps(): Record<string, number> {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      cachedStamps =
        parsed && typeof parsed === "object" ? (parsed as Record<string, number>) : EMPTY;
    } catch {
      cachedStamps = EMPTY;
    }
  }
  return cachedStamps;
}

function write(next: Record<string, number>) {
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

export function useStamps() {
  const stamps = useSyncExternalStore(subscribe, getStamps, () => EMPTY);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const collect = useCallback((key: string) => {
    const current = getStamps();
    if (current[key]) return;
    write({ ...current, [key]: Date.now() });
  }, []);

  const remove = useCallback((key: string) => {
    const rest = { ...getStamps() };
    delete rest[key];
    write(rest);
  }, []);

  return { stamps, count: Object.keys(stamps).length, collect, remove, ready };
}
