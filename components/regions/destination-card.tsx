"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/ui/icons";
import { SaveButton } from "@/components/saved/save-button";
import type { RegionDestination } from "@/lib/regions";

/**
 * The destination card used on region pages and, with a couple of overrides,
 * in the homepage "Recommended" section — so both look and behave the same.
 */
export function DestinationCard({
  destination,
  regionSlug,
  badge,
  rating,
  footnote,
}: {
  destination: RegionDestination;
  regionSlug: string;
  /** Replaces the "Featured" flag, e.g. "Most visited". */
  badge?: string;
  /** Shown when the destination itself carries no rating. */
  rating?: number;
  /** Small line under the blurb, e.g. a best-time-to-go window. */
  footnote?: string;
}) {
  const flag = badge ?? (destination.featured ? "Featured" : undefined);
  const score = destination.rating ?? rating;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5">
      <div className="relative aspect-[16/10] bg-sand-200">
        <Image
          src={destination.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="flex flex-wrap gap-1.5">
            {flag ? (
              <span className="rounded-full bg-sunset-600 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-white">
                {flag}
              </span>
            ) : null}
            {destination.unesco ? (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700 backdrop-blur-sm">
                UNESCO
              </span>
            ) : null}
          </span>

          <span className="relative z-10">
            <SaveButton
              slug={destination.slug}
              name={destination.name}
              tone="overlay"
            />
          </span>
        </div>

        {score ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-sand-900/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <StarIcon className="size-3 text-sunset-400" />
            {score.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg leading-snug font-semibold text-sand-900">
              {destination.name}
            </h3>
            {destination.nameKh ? (
              <p lang="km" className="mt-0.5 text-sm text-sand-500">
                {destination.nameKh}
              </p>
            ) : null}
          </div>
          {destination.verified ? (
            <span
              title="Verified by our team"
              className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-600"
            >
              <ShieldIcon className="size-3.5" />
              Verified
            </span>
          ) : null}
        </div>

        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-sand-500">
          <MapPinIcon className="size-3.5 text-sand-400" />
          {destination.province}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          <li className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {destination.category}
          </li>
          {Object.entries(destination.facets ?? {}).map(([facet, value]) => (
            <li
              key={facet}
              title={facet}
              className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-sand-600"
            >
              {value}
            </li>
          ))}
          {destination.tags?.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-sand-600"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-sand-600">
          {destination.blurb}
        </p>

        {footnote ? (
          <p className="mt-3 text-xs font-semibold text-sand-500">{footnote}</p>
        ) : null}

        <Link
          href={`/regions/${regionSlug}/${destination.slug}`}
          aria-label={`View details for ${destination.name}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          View details
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
