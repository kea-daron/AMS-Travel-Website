"use client";

import { useRouter } from "next/navigation";
import { StampIcon } from "@/components/ui/icons";
import { loginHref } from "@/lib/login-redirect";
import { useSession } from "@/lib/use-session";
import { useStamps } from "@/lib/use-stamps";

/**
 * Collects a digital stamp for a place. Like saving, it needs an account, so
 * a visitor is sent to log in and brought back here.
 */
export function StampButton({
  placeKey,
  name,
  tone = "light",
}: {
  placeKey: string;
  name: string;
  tone?: "light" | "overlay";
}) {
  const router = useRouter();
  const { signedIn } = useSession();
  const { stamps, collect, remove, ready } = useStamps();
  const stamped = ready && signedIn && Boolean(stamps[placeKey]);

  const skin =
    tone === "overlay"
      ? stamped
        ? "bg-white text-brand-700"
        : "bg-sand-900/55 text-white backdrop-blur-sm hover:bg-sand-900/75"
      : stamped
        ? "border-brand-300 bg-brand-50 text-brand-700"
        : "border-sand-300 text-sand-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700";

  return (
    <button
      type="button"
      onClick={() => {
        if (!signedIn) {
          const here = `${window.location.pathname}${window.location.search}`;
          router.push(loginHref(here));
          return;
        }
        if (stamped) remove(placeKey);
        else collect(placeKey);
      }}
      aria-pressed={signedIn ? stamped : undefined}
      title={
        !signedIn
          ? "Log in to collect stamps"
          : stamped
            ? `Remove your stamp for ${name}`
            : `Collect a stamp for ${name}`
      }
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
        tone === "overlay" ? "" : "border"
      } ${skin}`}
    >
      <StampIcon className="size-4" />
      {stamped ? "Stamped" : "Collect stamp"}
    </button>
  );
}
