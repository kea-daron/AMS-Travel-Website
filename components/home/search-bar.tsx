"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CompassIcon,
  MapIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
} from "@/components/ui/icons";
import {
  corridors,
  provinceCategories,
  provinces,
  regionSpecialties,
  tourismRegions,
} from "@/lib/data";

const modes = ["By Tourism regions", "By Provinces", "By Corridors"] as const;

type Mode = (typeof modes)[number];

const fieldClass =
  "peer w-full bg-transparent text-sm font-medium text-sand-900 placeholder:text-sand-400 focus:outline-none";

const labelClass =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-500";

export function SearchBar() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("By Tourism regions");
  const [region, setRegion] = useState("");
  const [corridor, setCorridor] = useState("");

  const byRegion = mode === "By Tourism regions";
  const byCorridor = mode === "By Corridors";

  // The stop list narrows to the chosen corridor.
  const stops = corridors.find((item) => item.slug === corridor)?.stops ?? [];

  /** Sends the traveller to whichever page answers what they picked. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (byCorridor) {
      router.push(corridor ? `/map?corridor=${corridor}` : "/explore/corridors");
      return;
    }
    if (byRegion) {
      router.push(region ? `/regions/${region}` : "/explore");
      return;
    }
    router.push("/explore/provinces");
  }

  return (
    <div className="rounded-3xl bg-white/95 p-2 shadow-2xl shadow-brand-950/20 ring-1 ring-sand-900/5 backdrop-blur">
      <div
        role="tablist"
        aria-label="Discover by"
        className="flex gap-1 px-2 pt-1.5 pb-3"
      >
        {modes.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={mode === item}
            onClick={() => setMode(item)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === item
                ? "bg-brand-50 text-brand-700"
                : "text-sand-500 hover:text-sand-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-px overflow-hidden rounded-2xl bg-sand-200 md:grid-cols-[1fr_1fr_auto]"
      >
        {byCorridor ? (
          <>
            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <MapIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Corridor</span>
                <select
                  name="corridor"
                  value={corridor}
                  onChange={(event) => setCorridor(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">All five corridors</option>
                  {corridors.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <MapPinIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Stop</span>
                <select
                  name="stop"
                  defaultValue=""
                  disabled={stops.length === 0}
                  className={`${fieldClass} disabled:text-sand-400`}
                >
                  <option value="">
                    {stops.length === 0
                      ? "Pick a corridor first"
                      : "Any stop on the route"}
                  </option>
                  {stops.map((stop) => (
                    <option key={stop.name} value={stop.name}>
                      {stop.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </>
        ) : byRegion ? (
          <>
            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <CompassIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Region</span>
                <select
                  name="region"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">All regions</option>
                  {tourismRegions.map((region) => (
                    <option key={region.slug} value={region.slug}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <StarIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Region&apos;s specialty</span>
                <select name="specialty" defaultValue="" className={fieldClass}>
                  <option value="">Any specialty</option>
                  {regionSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </>
        ) : (
          <>
            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <MapPinIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Province</span>
                <select name="province" defaultValue="" className={fieldClass}>
                  <option value="">All 25 provinces</option>
                  {provinces.map((province) => (
                    <option key={province.slug} value={province.slug}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <CompassIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Filter by</span>
                <select name="category" defaultValue="" className={fieldClass}>
                  <option value="">Everything</option>
                  {provinceCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </>
        )}

        <div className="bg-white p-2">
          <button
            type="submit"
            className="flex h-full w-full items-center justify-center gap-2 btn-sweep rounded-xl px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <SearchIcon className="size-4.5" />
            Discover
          </button>
        </div>
      </form>
    </div>
  );
}
