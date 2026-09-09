"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CloseIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
} from "@/components/ui/icons";
import { mapDestinations } from "@/lib/data";
import { useSaved } from "@/lib/use-saved";

export function SavedList() {
  const { slugs, remove, clear, ready } = useSaved();

  // Keep the traveller's own order rather than the dataset's.
  const places = slugs
    .map((slug) => mapDestinations.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);

  if (!ready) {
    return (
      <p className="mt-10 text-sm text-sand-500">Loading your list…</p>
    );
  }

  if (places.length === 0) return <EmptyState />;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-sand-600">
          {places.length} {places.length === 1 ? "place" : "places"} saved to
          this browser.
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-semibold text-sand-500 underline underline-offset-4 transition-colors hover:text-sunset-700"
        >
          Clear all
        </button>
      </div>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <li key={place.slug}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5">
              <div className="relative aspect-[16/10] bg-sand-200">
                <Image
                  src={place.image}
                  alt={place.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => remove(place.slug)}
                  aria-label={`Remove ${place.name} from saved`}
                  className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-sand-900/55 text-white backdrop-blur-sm transition-colors hover:bg-sunset-600"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                  <MapPinIcon className="size-3.5" />
                  {place.province}
                </p>
                <h2 className="mt-1.5 font-display text-lg leading-snug font-semibold text-sand-900">
                  {place.name}
                </h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-sand-600">
                  {place.blurb}
                </p>

                <div className="mt-4 flex items-center gap-2 border-t border-sand-200 pt-4">
                  <Link
                    href={`/map?place=${place.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 btn-sweep rounded-xl px-3 py-2.5 text-sm font-semibold"
                  >
                    <MapIcon className="size-4" />
                    Show on map
                  </Link>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${place.name} in Google Maps`}
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-sand-300 text-sand-600 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <ExternalLinkIcon className="size-4" />
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-sand-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <BookmarkIcon className="size-7" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold text-sand-900">
        Nothing saved yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sand-600">
        Tap the bookmark on any destination and it lands here, ready for when
        you plan the route.
      </p>
      <Link
        href="/map"
        className="group mt-6 inline-flex items-center gap-2 btn-sweep rounded-full px-5 py-2.5 text-sm font-semibold"
      >
        Browse the map
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
