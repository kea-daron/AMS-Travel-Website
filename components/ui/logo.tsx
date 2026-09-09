import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark. `tone` follows the surface it sits on — the header flips it to
 * "light" while it is transparent over the hero.
 *
 * The badge artwork is a circle on a white square, so it is masked to a circle
 * rather than shown as-is.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
    >
      <span
        className={`relative block size-10 shrink-0 overflow-hidden rounded-full ring-1 transition-transform duration-300 group-hover:scale-105 ${
          isLight ? "ring-white/35" : "ring-sand-900/10"
        }`}
      >
        <Image
          src="/AMS-logo.jpg"
          alt=""
          width={80}
          height={80}
          priority
          className="size-full object-cover"
        />
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
          Discover Cambodia
        </span>
      </span>
    </Link>
  );
}
