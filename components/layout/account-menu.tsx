"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookmarkIcon, LogOutIcon, UserIcon } from "@/components/ui/icons";
import { endSession } from "@/lib/use-session";

/**
 * A round profile picture: the traveller's photo if they have added one,
 * otherwise the first letter of their name on the logo's gradient.
 */
export function Avatar({
  name,
  photo,
  className = "size-9 text-sm",
}: {
  name: string;
  /** A data URL from the profile; see AvatarEditor. */
  photo?: string;
  className?: string;
}) {
  if (photo) {
    return (
      <span
        aria-hidden="true"
        className={`relative block shrink-0 overflow-hidden rounded-full bg-sand-200 ${className}`}
      >
        <Image src={photo} alt="" fill sizes="6rem" className="object-cover" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`brand-sweep flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white uppercase ${className}`}
    >
      {name.slice(0, 1)}
    </span>
  );
}

/** The navbar's profile picture once someone is logged in, and its menu. */
export function AccountMenu({
  name,
  photo,
  solid,
}: {
  name: string;
  photo?: string;
  /** Whether the header has its own background (vs. floating over the hero). */
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Close on a click outside the menu, or on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Account: ${name}`}
        title={name}
        className={`flex rounded-full p-0.5 ring-2 transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
          open
            ? "ring-sunset-500"
            : solid
              ? "ring-sand-200 hover:ring-brand-300"
              : "ring-white/60 hover:ring-white"
        }`}
      >
        <Avatar name={name} photo={photo} className="size-10 text-base" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-white p-2 shadow-xl shadow-sand-900/10 ring-1 ring-sand-900/10"
      >
        <div className="flex items-center gap-3 px-3 py-2.5">
          <Avatar name={name} photo={photo} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-sand-900">
              {name}
            </span>
            <span className="block text-xs text-sand-500">Signed in</span>
          </span>
        </div>

        <div className="my-1 h-px bg-sand-200" />

        <Link
          href="/account"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sand-700 transition-colors hover:bg-sand-100 hover:text-brand-700"
        >
          <UserIcon className="size-4" />
          Your account
        </Link>
        <Link
          href="/saved"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sand-700 transition-colors hover:bg-sand-100 hover:text-brand-700"
        >
          <BookmarkIcon className="size-4" />
          Saved places
        </Link>
        <button
          type="button"
          onClick={() => {
            endSession();
            setOpen(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-sand-700 transition-colors hover:bg-sunset-50 hover:text-sunset-700"
        >
          <LogOutIcon className="size-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
