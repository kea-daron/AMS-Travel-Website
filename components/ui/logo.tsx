import Link from "next/link";
import { PlaneIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Wordmark. `tone` follows the surface it sits on — the header flips it to
 * "light" while it is transparent over the hero.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
    >
      <span
        className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
          isLight
            ? "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm"
            : "bg-brand-600 text-white"
        }`}
      >
        <PlaneIcon className="size-5 -rotate-12 transition-transform duration-300 group-hover:rotate-0" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold tracking-tight ${
            isLight ? "text-white" : "text-sand-900"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] ${
            isLight ? "text-white/70" : "text-sand-500"
          }`}
        >
          Tours &amp; Escapes
        </span>
      </span>
    </Link>
  );
}
