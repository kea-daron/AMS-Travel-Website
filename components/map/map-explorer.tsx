"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  CloseIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { SaveButton } from "@/components/saved/save-button";
import { corridors, mapDestinations, provinceCategories } from "@/lib/data";
import { corridorRoutes } from "@/lib/corridor-routes";
import type { Corridor, MapDestination } from "@/lib/data";

// Leaflet touches `window` on import, so the canvas is client-only.
const MapCanvas = dynamic(
  () => import("@/components/map/map-canvas").then((m) => m.MapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center bg-sand-100 text-sm text-sand-500">
        Loading map…
      </div>
    ),
  },
);

const ALL = "All";
const CORRIDORS = "Tourism Corridors";
const filters = [ALL, ...provinceCategories] as const;

export function MapExplorer() {
  // Deep links: /map?place=angkor-wat from Saved, /map?corridor=… from search.
  const search = useSearchParams();
  const requested = search.get("place");
  const requestedCorridor = search.get("corridor");
  const validCorridor =
    requestedCorridor && corridors.some((item) => item.slug === requestedCorridor)
      ? requestedCorridor
      : null;

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    requested && mapDestinations.some((item) => item.slug === requested)
      ? requested
      : null,
  );
  const [filter, setFilter] = useState<(typeof filters)[number]>(
    validCorridor ? CORRIDORS : ALL,
  );
  const [query, setQuery] = useState("");
  const [corridorSlug, setCorridorSlug] = useState<string | null>(validCorridor);

  // A useState initialiser only runs on the first mount, so arriving at
  // /map?corridor=… from a page that already had the map mounted, or switching
  // between two corridors, would otherwise be ignored. This is React's
  // documented "adjust state during render" pattern rather than an effect.
  const [lastCorridorParam, setLastCorridorParam] = useState(validCorridor);
  if (validCorridor !== lastCorridorParam) {
    setLastCorridorParam(validCorridor);
    setCorridorSlug(validCorridor);
    if (validCorridor) setFilter(CORRIDORS);
  }

  // The corridors chip switches the panel from places to routes.
  const corridorMode = filter === CORRIDORS;
  const corridor = corridors.find((item) => item.slug === corridorSlug);

  const destinations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return mapDestinations.filter((destination) => {
      const matchesFilter =
        filter === ALL || destination.category === filter;
      const matchesQuery =
        !needle ||
        destination.name.toLowerCase().includes(needle) ||
        destination.province.toLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const selected = mapDestinations.find((item) => item.slug === selectedSlug);

  const corridorPins = useMemo(
    () =>
      corridor
        ? corridor.stops.map((stop, index) => ({
            slug: `${corridor.slug}-${index}`,
            name: stop.name,
            lat: stop.lat,
            lng: stop.lng,
            label: String(index + 1),
          }))
        : [],
    [corridor],
  );

  const corridorLegs = corridor ? corridorRoutes[corridor.slug] : undefined;

  return (
    <div className="grid h-[calc(100vh-5rem)] grid-rows-[auto_1fr] lg:grid-cols-[24rem_1fr] lg:grid-rows-1">
      <aside className="flex min-h-0 flex-col border-b border-sand-200 bg-white lg:border-r lg:border-b-0">
        <div className="border-b border-sand-200 p-5">
          <h1 className="font-display text-2xl font-semibold text-sand-900">
            Map
          </h1>
          <p className="mt-1 text-sm text-sand-600">
            {corridorMode
              ? `${corridors.length} tourism corridors`
              : `${destinations.length} of ${mapDestinations.length} destinations`}
          </p>

          <div className={`relative mt-4 ${corridorMode ? "hidden" : ""}`}>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-sand-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a place or province"
              aria-label="Search destinations"
              className="w-full rounded-xl border border-sand-300 bg-white py-2.5 pr-3 pl-10 text-sm text-sand-900 outline-none transition-colors placeholder:text-sand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {filters.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                    filter === item
                      ? "bg-brand-600 text-white"
                      : "bg-sand-100 text-sand-600 hover:bg-sand-200"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {corridorMode ? (
          <ul className="min-h-0 flex-1 overflow-y-auto p-3">
            {corridors.map((item) => (
              <li key={item.slug}>
                <CorridorRow
                  corridor={item}
                  active={item.slug === corridorSlug}
                  onSelect={(slug) =>
                    setCorridorSlug(slug === corridorSlug ? null : slug)
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
        <ul className="min-h-0 flex-1 overflow-y-auto p-3">
          {destinations.map((destination) => (
            <li key={destination.slug}>
              <ListRow
                destination={destination}
                active={destination.slug === selectedSlug}
                onSelect={setSelectedSlug}
              />
            </li>
          ))}

          {destinations.length === 0 ? (
            <li className="px-2 py-8 text-center text-sm text-sand-500">
              Nothing matches that search yet.
            </li>
          ) : null}
        </ul>
        )}
      </aside>

      <div className="relative min-h-[26rem]">
        <MapCanvas
          destinations={corridorMode ? corridorPins : destinations}
          selectedSlug={corridorMode ? null : selectedSlug}
          onSelect={corridorMode ? () => {} : setSelectedSlug}
          legs={corridorLegs}
        />

        {corridorMode ? (
          corridor ? (
            <CorridorCard
              corridor={corridor}
              onClose={() => setCorridorSlug(null)}
            />
          ) : null
        ) : selected ? (
          <DetailCard
            destination={selected}
            onClose={() => setSelectedSlug(null)}
          />
        ) : null}
      </div>
    </div>
  );
}

function ListRow({
  destination,
  active,
  onSelect,
}: {
  destination: MapDestination;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <span
      className={`flex w-full items-center gap-3 rounded-2xl p-2 transition-colors ${
        active ? "bg-brand-50 ring-1 ring-brand-300" : "hover:bg-sand-100"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(destination.slug)}
        aria-current={active ? "true" : undefined}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
        <Image
          src={destination.image}
          alt={destination.alt}
          fill
          sizes="3.5rem"
          className="object-cover"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-sand-900">
          {destination.name}
        </span>
        <span className="mt-0.5 flex items-center gap-1 truncate text-xs text-sand-500">
          <MapPinIcon className="size-3 shrink-0 text-sand-400" />
          {destination.province} · {destination.category}
        </span>
      </span>
      </button>

      <SaveButton slug={destination.slug} name={destination.name} />
    </span>
  );
}

function DetailCard({
  destination,
  onClose,
}: {
  destination: MapDestination;
  onClose: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[1000] flex justify-center sm:inset-x-auto sm:left-4 sm:justify-start">
      <article className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl shadow-sand-900/20 ring-1 ring-sand-900/10">
        <div className="relative aspect-[16/9] bg-sand-200">
          <Image
            src={destination.image}
            alt={destination.alt}
            fill
            sizes="24rem"
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <SaveButton
              slug={destination.slug}
              name={destination.name}
              tone="overlay"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="flex size-9 items-center justify-center rounded-full bg-sand-900/55 text-white backdrop-blur-sm transition-colors hover:bg-sand-900/75"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {destination.province} · {destination.category}
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold text-sand-900">
            {destination.name}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-sand-600">
            {destination.blurb}
          </p>
          <p className="mt-3 text-xs text-sand-400">
            {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 btn-sweep rounded-xl px-4 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <MapIcon className="size-4" />
            Open in Google Maps
            <ExternalLinkIcon className="size-3.5 opacity-70" />
          </a>
        </div>
      </article>
    </div>
  );
}

function CorridorRow({
  corridor,
  active,
  onSelect,
}: {
  corridor: Corridor;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(corridor.slug)}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors ${
        active ? "bg-brand-50 ring-1 ring-brand-300" : "hover:bg-sand-100"
      }`}
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
        <Image
          src={corridor.image}
          alt={corridor.alt}
          fill
          sizes="3.5rem"
          className="object-cover"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-sand-900">
          {corridor.name}
        </span>
        {corridor.nameKh ? (
          <span lang="km" className="block truncate text-xs text-sand-500">
            {corridor.nameKh}
          </span>
        ) : null}
        <span className="mt-0.5 block truncate text-xs text-sand-500">
          {corridor.stops.length} stops · {corridor.days}
        </span>
      </span>
    </button>
  );
}

function CorridorCard({
  corridor,
  onClose,
}: {
  corridor: Corridor;
  onClose: () => void;
}) {
  const legs = corridorRoutes[corridor.slug] ?? [];
  const roadKm = legs
    .filter((leg) => leg.mode === "road")
    .reduce((sum, leg) => sum + leg.km, 0);
  const crossings = legs.filter((leg) => leg.mode === "direct").length;

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[1000] flex justify-center sm:inset-x-auto sm:left-4 sm:justify-start">
      <article className="pointer-events-auto w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl shadow-sand-900/20 ring-1 ring-sand-900/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
              Tourism corridor · {corridor.days}
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold text-sand-900">
              {corridor.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close corridor"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-700"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <ol className="mt-3 space-y-1.5">
          {corridor.stops.map((stop, index) => (
            <li
              key={stop.name}
              className="flex items-center gap-2.5 text-sm text-sand-700"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-2xs font-bold text-white">
                {index + 1}
              </span>
              <span className="font-medium">{stop.name}</span>
              {stop.nameKh ? (
                <span lang="km" className="truncate text-xs text-sand-400">
                  {stop.nameKh}
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-3 border-t border-sand-200 pt-3 text-xs text-sand-500">
          {roadKm > 0 ? (
            <>
              Roughly {Math.round(roadKm)} km by road.
              {crossings > 0
                ? ` ${crossings} leg${crossings > 1 ? "s" : ""} shown dashed
                   ${corridor.slug === "coastal-discovery" ? "cross water" : "have no drivable road"}.`
                : ""}
            </>
          ) : (
            "Distances follow the road network where one exists."
          )}
          {corridor.linear === false
            ? " These are production areas rather than one itinerary."
            : ""}
        </p>
      </article>
    </div>
  );
}
