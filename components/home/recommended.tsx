import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
} from "@/components/ui/icons";
import { recommendedPlaces } from "@/lib/data";
import type { RecommendedPlace } from "@/lib/data";

export function Recommended() {
  return (
    <section id="recommended" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="Handpicked"
          title="Recommended"
          description="Six places we send first-time visitors — temples and floating villages, islands and pepper farms, the capital after dark and the eastern highlands."
          align="center"
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {recommendedPlaces.map((place) => (
            <PlaceCard key={place.slug} place={place} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-sand-500">
          Want more than six?{" "}
          <Link
            href="/explore"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            Explore all nine tourism regions
          </Link>{" "}
          across twenty-five provinces.
        </p>
      </div>
    </section>
  );
}

function PlaceCard({ place }: { place: RecommendedPlace }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-sand-50 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5">
      <div className="relative aspect-[16/11] overflow-hidden bg-sand-200">
        <Image
          src={place.image}
          alt={place.alt}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-sand-900/60 via-transparent to-transparent" />

        {place.badge ? (
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-brand-700 backdrop-blur-sm">
            {place.badge}
          </span>
        ) : null}

        <span className="absolute top-4 right-4 rounded-full bg-sand-900/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {place.category}
        </span>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          <MapPinIcon className="size-4" />
          {place.province}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          {place.region}
        </p>
        <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-sand-900">
          {place.name}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-sand-600">
          {place.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {place.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <Rating
          value={place.rating}
          count={place.reviews}
          className="mt-5 text-sand-600"
        />

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-sand-200 pt-5">
          <p>
            <span className="inline-flex items-center gap-1.5 text-xs text-sand-500">
              <CalendarIcon className="size-3.5 text-sand-400" />
              Best time to go
            </span>
            <span className="mt-0.5 block font-display text-lg font-semibold text-sand-900">
              {place.bestTime}
            </span>
          </p>

          <Link
            href="#"
            aria-label={`View ${place.name}`}
            className="inline-flex items-center gap-1.5 btn-sweep rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            View place
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
