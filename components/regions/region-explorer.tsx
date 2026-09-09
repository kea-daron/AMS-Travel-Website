"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowRightIcon,
  FilterIcon,
  MapPinIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/ui/icons";
import { SaveButton } from "@/components/saved/save-button";
import type { RegionDestination } from "@/lib/regions";

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

const ALL = "All Categories";
type View = "cards" | "map";

export function RegionExplorer({
  categories,
  filterTags,
  facets,
  destinations,
}: {
  categories: string[];
  filterTags: string[];
  facets?: string[];
  destinations: RegionDestination[];
}) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("cards");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [province, setProvince] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [facetValues, setFacetValues] = useState<Record<string, string>>({});

  // Filter vocabularies come from this region's own destinations.
  const provinceOptions = useMemo(
    () => [...new Set(destinations.map((item) => item.province))].sort(),
    [destinations],
  );
  // The region declares its own tag vocabulary; anything a destination carries
  // beyond it still shows on the card, it just is not offered as a filter.
  const tagOptions = facets ? [] : filterTags;

  /** Options for each facet, read off the destinations that carry it. */
  const facetOptions = useMemo(() => {
    if (!facets) return [];
    return facets.map((facet) => {
      const values = [
        ...new Set(
          destinations
            .map((item) => item.facets?.[facet])
            .filter((value): value is string => Boolean(value)),
        ),
      ];
      // Centuries sort by their number, everything else alphabetically.
      const numeric = values.every((value) => /^\d/.test(value));
      values.sort((a, b) =>
        numeric
          ? parseInt(a, 10) - parseInt(b, 10)
          : a.localeCompare(b),
      );
      return { facet, values };
    });
  }, [facets, destinations]);

  const activeCount =
    (province ? 1 : 0) +
    tags.length +
    flags.length +
    Object.values(facetValues).filter(Boolean).length;

  const toggleIn = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];

  const clearFilters = () => {
    setProvince(null);
    setTags([]);
    setFlags([]);
    setFacetValues({});
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return destinations.filter((item) => {
      const inCategory =
        category === ALL ||
        item.category === category ||
        item.tags?.includes(category);
      const matches =
        !needle ||
        item.name.toLowerCase().includes(needle) ||
        item.province.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(needle)) ||
        Object.values(item.facets ?? {}).some((value) =>
          value.toLowerCase().includes(needle),
        ) ||
        item.blurb.toLowerCase().includes(needle);
      const inProvince = !province || item.province === province;
      const hasTags =
        tags.length === 0 || tags.every((tag) => item.tags?.includes(tag));
      const hasFacets = Object.entries(facetValues).every(
        ([facet, value]) => !value || item.facets?.[facet] === value,
      );
      const hasFlags = flags.every((flag) =>
        flag === "Featured"
          ? item.featured
          : flag === "UNESCO"
            ? item.unesco
            : item.verified,
      );

      return (
        inCategory && matches && inProvince && hasTags && hasFlags && hasFacets
      );
    });
  }, [category, destinations, query, province, tags, flags, facetValues]);

  const pins = useMemo(
    () =>
      filtered
        .filter((item) => item.lat !== undefined && item.lng !== undefined)
        .map((item) => ({
          slug: item.slug,
          name: item.name,
          lat: item.lat as number,
          lng: item.lng as number,
        })),
    [filtered],
  );

  const center = useMemo<[number, number]>(() => {
    if (pins.length === 0) return [12.5657, 104.991];
    const lat = pins.reduce((sum, p) => sum + p.lat, 0) / pins.length;
    const lng = pins.reduce((sum, p) => sum + p.lng, 0) / pins.length;
    return [lat, lng];
  }, [pins]);

  const selected = filtered.find((item) => item.slug === selectedSlug);

  return (
    <section id="destinations" className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold text-sand-900 sm:text-3xl">
        Explore by Category
      </h2>

      <ul className="mt-5 flex flex-wrap gap-2">
        {[ALL, ...categories].map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                category === item
                  ? "btn-sweep"
                  : "border border-sand-300 bg-white text-sand-600 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-sand-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations"
            aria-label="Search destinations in this region"
            className="w-full rounded-xl border border-sand-300 bg-white py-2.5 pr-3 pl-10 text-sm text-sand-900 outline-none transition-colors placeholder:text-sand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          aria-controls="region-filters"
          className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
            filtersOpen || activeCount > 0
              ? "border-brand-400 bg-brand-50 text-brand-700"
              : "border-sand-300 bg-white text-sand-700 hover:border-brand-300 hover:text-brand-700"
          }`}
        >
          <FilterIcon className="size-4" />
          Filters
          {activeCount > 0 ? (
            <span className="btn-sweep inline-flex size-5 items-center justify-center rounded-full text-2xs font-bold">
              {activeCount}
            </span>
          ) : null}
        </button>
      </div>

      <div
        id="region-filters"
        hidden={!filtersOpen}
        className="mt-4 rounded-2xl border border-sand-200 bg-white p-5"
      >
        <FilterGroup label="Province">
          <Chip
            label="Any province"
            active={province === null}
            onClick={() => setProvince(null)}
          />
          {provinceOptions.map((item) => (
            <Chip
              key={item}
              label={item}
              active={province === item}
              onClick={() => setProvince(province === item ? null : item)}
            />
          ))}
        </FilterGroup>

        {facetOptions.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facetOptions.map(({ facet, values }) => (
              <label key={facet} className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                  {facet}
                </span>
                <select
                  value={facetValues[facet] ?? ""}
                  onChange={(event) =>
                    setFacetValues((current) => ({
                      ...current,
                      [facet]: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-3 py-2 text-sm font-medium text-sand-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">All</option>
                  {values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : null}

        {tagOptions.length > 0 ? (
          <FilterGroup label="Tags">
            {tagOptions.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                active={tags.includes(tag)}
                onClick={() => setTags(toggleIn(tags, tag))}
              />
            ))}
          </FilterGroup>
        ) : null}

        <FilterGroup label="Only show">
          {["Featured", "UNESCO", "Verified"].map((flag) => (
            <Chip
              key={flag}
              label={flag}
              active={flags.includes(flag)}
              onClick={() => setFlags(toggleIn(flags, flag))}
            />
          ))}
        </FilterGroup>

        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-sand-500 underline underline-offset-4 transition-colors hover:text-sunset-700"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-sand-600">
          {filtered.length}{" "}
          {filtered.length === 1 ? "Destination" : "Destinations"} Found
        </p>

        <div
          role="group"
          aria-label="View"
          className="inline-flex shrink-0 rounded-xl border border-sand-300 bg-white p-1"
        >
          {(["cards", "map"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              aria-pressed={view === item}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold capitalize transition-colors ${
                view === item
                  ? "bg-brand-50 text-brand-700"
                  : "text-sand-500 hover:text-sand-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === "cards" ? (
        filtered.length > 0 ? (
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.slug}>
                <DestinationCard destination={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-sand-300 bg-white px-6 py-12 text-center text-sm text-sand-500">
            Nothing in this region matches that yet.
          </p>
        )
      ) : (
        <div className="relative mt-5 h-[32rem] overflow-hidden rounded-3xl ring-1 ring-sand-900/10">
          <MapCanvas
            destinations={pins}
            selectedSlug={selectedSlug}
            onSelect={setSelectedSlug}
            center={center}
            zoom={8}
          />

          {selected ? (
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[1000] flex sm:inset-x-auto sm:left-4">
              <article className="pointer-events-auto w-full max-w-xs rounded-2xl bg-white p-4 shadow-2xl shadow-sand-900/20 ring-1 ring-sand-900/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                  {selected.province} · {selected.category}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-sand-900">
                  {selected.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-600">
                  {selected.blurb}
                </p>
              </article>
            </div>
          ) : null}

          {pins.length < filtered.length ? (
            <p className="absolute top-3 right-3 z-[1000] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-sand-600 shadow-sm backdrop-blur-sm">
              {filtered.length - pins.length} without coordinates
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

function DestinationCard({
  destination,
}: {
  destination: RegionDestination;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5">
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
            {destination.featured ? (
              <span className="rounded-full bg-sunset-600 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-white">
                Featured
              </span>
            ) : null}
            {destination.unesco ? (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700 backdrop-blur-sm">
                UNESCO
              </span>
            ) : null}
          </span>

          <SaveButton
            slug={destination.slug}
            name={destination.name}
            tone="overlay"
          />
        </div>

        {destination.rating ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-sand-900/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <StarIcon className="size-3 text-sunset-400" />
            {destination.rating.toFixed(1)}
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

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          View details
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        active
          ? "bg-brand-600 text-white"
          : "bg-sand-100 text-sand-600 hover:bg-sand-200"
      }`}
    >
      {label}
    </button>
  );
}
