"use client";

import { BookmarkIcon } from "@/components/ui/icons";
import { useSaved } from "@/lib/use-saved";

/** Bookmark toggle. `tone` follows the surface it sits on. */
export function SaveButton({
  slug,
  name,
  tone = "light",
}: {
  slug: string;
  name: string;
  tone?: "light" | "overlay";
}) {
  const { isSaved, toggle, ready } = useSaved();
  const saved = ready && isSaved(slug);

  const base =
    "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

  const skin =
    tone === "overlay"
      ? saved
        ? "bg-white text-brand-700"
        : "bg-sand-900/55 text-white backdrop-blur-sm hover:bg-sand-900/75"
      : saved
        ? "bg-brand-600 text-white"
        : "text-sand-400 hover:bg-sand-100 hover:text-sand-700";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      title={saved ? "Saved" : "Save"}
      className={`${base} ${skin}`}
    >
      <BookmarkIcon
        className="size-4.5"
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
