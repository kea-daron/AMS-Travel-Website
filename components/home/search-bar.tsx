"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  CompassIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
} from "@/components/ui/icons";
import {
  provinceCategories,
  provinces,
  regionSpecialties,
  tourismRegions,
} from "@/lib/data";

const modes = ["By Tourism regions", "By Provinces"] as const;

type Mode = (typeof modes)[number];

const fieldClass =
  "peer w-full bg-transparent text-sm font-medium text-sand-900 placeholder:text-sand-400 focus:outline-none";

const labelClass =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-500";

export function SearchBar() {
  const [mode, setMode] = useState<Mode>("By Tourism regions");

  // No discovery API is wired up yet — send the traveller to the regions
  // section so the control still does something useful.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document
      .getElementById("regions")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const byRegion = mode === "By Tourism regions";

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
        {byRegion ? (
          <>
            <label className="flex items-center gap-3 bg-white px-4 py-3.5">
              <CompassIcon className="size-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className={labelClass}>Region</span>
                <select name="region" defaultValue="" className={fieldClass}>
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
