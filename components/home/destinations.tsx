import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, StarIcon } from "@/components/ui/icons";
import { destinations } from "@/lib/data";
import type { Destination } from "@/lib/data";

export function Destinations() {
  return (
    <section id="destinations" className="page-x scroll-mt-24 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Where we go"
        title="Six places our travellers keep coming back to"
        description="Every destination below is run by a resident specialist, so the route changes with the seasons rather than with the brochure cycle."
        action={
          <Link
            href="#packages"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            All 92 destinations
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[17rem]">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </section>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const { featured } = destination;

  return (
    <Link
      href={`#packages`}
      className={`group relative isolate h-64 overflow-hidden rounded-3xl bg-sand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 lg:h-auto ${
        featured ? "sm:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <Image
        src={destination.image}
        alt={destination.alt}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 42rem, (min-width: 640px) 100vw, 100vw"
            : "(min-width: 1024px) 21rem, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-sand-900/90 via-sand-900/45 to-sand-900/5" />

      <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-sand-900 backdrop-blur-sm">
        <StarIcon className="size-3 text-sunset-500" />
        {destination.rating.toFixed(1)}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
          {destination.country}
        </p>
        <h3
          className={`mt-1.5 font-display font-semibold text-white ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {destination.city}
        </h3>

        {featured ? (
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
            {destination.blurb}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/20 pt-4">
          <span className="text-sm text-white/70">
            {destination.tours} tours
          </span>
          <span className="text-sm text-white/70">
            from{" "}
            <span className="font-display text-lg font-semibold text-white">
              &euro;{destination.fromPrice}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
