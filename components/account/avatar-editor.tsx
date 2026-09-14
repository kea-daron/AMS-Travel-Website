"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Avatar } from "@/components/layout/account-menu";
import { CameraIcon, TrashIcon } from "@/components/ui/icons";

/** Big enough for the largest avatar on a 2× screen, small enough to store. */
const SIZE = 256;
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Crops the picked image to its centre square and scales it down, so a
 * multi-megabyte phone photo becomes a ~20 KB JPEG. Transparent areas turn
 * white rather than black.
 */
async function toAvatar(file: File) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No canvas");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, SIZE, SIZE);
  context.imageSmoothingQuality = "high";
  context.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    SIZE,
    SIZE,
  );
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.85);
}

/**
 * The profile picture on the Account page, editable in place: tap it to add a
 * photo, or — once there is one — to change or remove it.
 */
export function AvatarEditor({
  name,
  photo,
  onChange,
}: {
  name: string;
  photo?: string;
  /** Called with the new photo, or with undefined to remove it. */
  onChange: (photo: string | undefined) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Close the change/remove menu on a click outside it, or on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function pick() {
    setMenuOpen(false);
    setError("");
    input.current?.click();
  }

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Let the same file be picked again after a failed attempt.
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image. Try a JPG or PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is over 10 MB. Try a smaller one.");
      return;
    }

    setBusy(true);
    try {
      onChange(await toAvatar(file));
      setError("");
    } catch {
      setError("We couldn't read that image. Try a JPG or PNG.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div ref={root} className="relative inline-block">
      <button
        type="button"
        onClick={() => (photo ? setMenuOpen((open) => !open) : pick())}
        disabled={busy}
        aria-label={photo ? "Change or remove profile photo" : "Add a profile photo"}
        aria-expanded={photo ? menuOpen : undefined}
        title={photo ? "Change photo" : "Add a photo"}
        className="group relative flex rounded-full bg-white p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <Avatar name={name} photo={photo} className="size-24 text-4xl" />

        {/* A hover veil over the picture itself… */}
        <span
          aria-hidden="true"
          className="absolute inset-1.5 flex items-center justify-center rounded-full bg-sand-900/45 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {busy ? (
            <span className="text-xs font-semibold">Saving…</span>
          ) : (
            <CameraIcon className="size-7" />
          )}
        </span>

        {/* …and a badge that stays, for touch screens with no hover. */}
        <span
          aria-hidden="true"
          className="absolute right-1 bottom-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-brand-700 text-white shadow-md transition-transform group-hover:scale-110"
        >
          <CameraIcon className="size-4" />
        </span>
      </button>

      <input
        ref={input}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {menuOpen ? (
        <div className="absolute top-full left-0 z-10 mt-2 w-48 rounded-2xl bg-white p-1.5 shadow-xl shadow-sand-900/10 ring-1 ring-sand-900/10">
          <button
            type="button"
            onClick={pick}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-sand-700 transition-colors hover:bg-sand-100 hover:text-brand-700"
          >
            <CameraIcon className="size-4" />
            Change photo
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onChange(undefined);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-sand-700 transition-colors hover:bg-sunset-50 hover:text-sunset-700"
          >
            <TrashIcon className="size-4" />
            Remove photo
          </button>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-2 max-w-60 text-xs text-sunset-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
