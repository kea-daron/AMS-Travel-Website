"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * The editable part of an account. The username is the login, so it is not
 * in here and cannot be changed.
 *
 * TODO: kept in this browser, keyed by username, until the API exists — then
 * read it from the account and send `save` to the server instead.
 */
export type Profile = {
  displayName?: string;
  email?: string;
  phone?: string;
  homeProvince?: string;
  bio?: string;
  /** A small square JPEG as a data URL, made by AvatarEditor. */
  photo?: string;
};

const PREFIX = "ams-travel:profile:";
const EVENT = "ams-travel:profile-change";
const EMPTY: Profile = {};

// useSyncExternalStore needs a stable snapshot, so each parsed profile is
// cached until its stored string changes.
const cache = new Map<string, { raw: string | null; value: Profile }>();

function read(username: string): Profile {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PREFIX + username);
  } catch {}

  const hit = cache.get(username);
  if (hit && hit.raw === raw) return hit.value;

  let value: Profile = EMPTY;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const entries = Object.entries(parsed).filter(
          ([, field]) => typeof field === "string",
        );
        value = Object.fromEntries(entries) as Profile;
      }
    } catch {}
  }
  cache.set(username, { raw, value });
  return value;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The signed-in traveller's profile; `username` is null while logged out. */
export function useProfile(username: string | null) {
  const profile = useSyncExternalStore(
    subscribe,
    () => (username ? read(username) : EMPTY),
    () => EMPTY,
  );

  const save = useCallback(
    (next: Profile) => {
      if (!username) return;
      // Blank fields are dropped rather than stored as empty strings.
      const clean = Object.fromEntries(
        Object.entries(next)
          .map(([key, value]) => [key, value?.trim()])
          .filter(([, value]) => value),
      );
      try {
        window.localStorage.setItem(PREFIX + username, JSON.stringify(clean));
      } catch {}
      window.dispatchEvent(new CustomEvent(EVENT));
    },
    [username],
  );

  return { profile, save };
}
