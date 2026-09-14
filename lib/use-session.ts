"use client";

import { useSyncExternalStore } from "react";
import { addSaved } from "@/lib/use-saved";

/**
 * Who is signed in, held in this browser.
 *
 * TODO: this is a stand-in until there is an auth provider. `signIn` only
 * accepts the test account, and `signUp` only validates the form; neither has
 * a user record behind it. Replace this module with the provider's session,
 * keeping the `useSession` shape.
 */
export type SessionUser = { name: string; email?: string };

const KEY = "ams-travel:session";
const EVENT = "ams-travel:session-change";
/** A place a visitor tried to save, finished once they log in. */
const PENDING_KEY = "ams-travel:pending-save";
/** An old, abandoned attempt should not quietly save something later. */
const PENDING_TTL_MS = 30 * 60 * 1000;

let cachedRaw: string | null = null;
let cachedUser: SessionUser | null = null;

function readRaw() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): SessionUser | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      value &&
      typeof value === "object" &&
      typeof (value as SessionUser).name === "string" &&
      (value as SessionUser).name !== ""
    ) {
      return value as SessionUser;
    }
  } catch {}
  return null;
}

function getSnapshot() {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedUser = parse(raw);
  }
  return cachedUser;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function notify() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Remembers the place a visitor tapped Save on, and the page they tapped it
 * on, before sending them to log in with that page as the way back.
 */
export function rememberPendingSave(slug: string, returnTo: string) {
  try {
    window.sessionStorage.setItem(
      PENDING_KEY,
      JSON.stringify({ slug, returnTo, at: Date.now() }),
    );
  } catch {}
}

/**
 * The waiting save, if this login is the one it sent them to — same way back,
 * and recent. Anything else (logging in from the navbar later, say) drops it.
 */
function takePendingSave(returnTo: string | undefined): string | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    window.sessionStorage.removeItem(PENDING_KEY);
    if (!raw || !returnTo) return null;
    const pending = JSON.parse(raw) as {
      slug?: unknown;
      returnTo?: unknown;
      at?: unknown;
    };
    return typeof pending.slug === "string" &&
      pending.returnTo === returnTo &&
      typeof pending.at === "number" &&
      Date.now() - pending.at < PENDING_TTL_MS
      ? pending.slug
      : null;
  } catch {
    return null;
  }
}

/**
 * Starts a session. `returnTo` is where the login sends them next; a save that
 * was waiting on this login is finished.
 */
export function startSession(user: SessionUser, returnTo?: string) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  } catch {}
  notify();

  const pending = takePendingSave(returnTo);
  if (pending) addSaved(pending);
}

export function endSession() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
  notify();
}

/**
 * The server and the hydrating client both render signed out; `ready` marks
 * when the browser's real answer has arrived.
 */
export function useSession() {
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return { user, signedIn: user !== null, ready };
}
