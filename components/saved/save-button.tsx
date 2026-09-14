"use client";

import { useRouter } from "next/navigation";
import { BookmarkIcon } from "@/components/ui/icons";
import { useSaved } from "@/lib/use-saved";
import { rememberPendingSave, useSession } from "@/lib/use-session";
import { loginHref } from "@/lib/login-redirect";

/**
 * Bookmark toggle. Saving needs an account, so a visitor is sent to log in and
 * brought back here afterwards, with this place already saved. `tone` follows
 * the surface it sits on.
 */
export function SaveButton({
  slug,
  name,
  tone = "light",
}: {
  /** The key the place is saved under. */
  slug: string;
  name: string;
  tone?: "light" | "overlay";
}) {
  const router = useRouter();
  const { isSaved, toggle, ready } = useSaved();
  const { signedIn } = useSession();
  const saved = ready && signedIn && isSaved(slug);

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

  const label = !signedIn
    ? `Log in to save ${name}`
    : saved
      ? `Remove ${name} from saved`
      : `Save ${name}`;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        if (!signedIn) {
          // Read at click time, so no page needs a Suspense boundary for it.
          const here = `${window.location.pathname}${window.location.search}`;
          rememberPendingSave(slug, here);
          router.push(loginHref(here));
          return;
        }
        toggle(slug);
      }}
      aria-pressed={signedIn ? saved : undefined}
      aria-label={label}
      title={!signedIn ? "Log in to save" : saved ? "Saved" : "Save"}
      className={`${base} ${skin}`}
    >
      <BookmarkIcon
        className="size-4.5"
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
