"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  SearchIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { destinations } from "@/lib/data";

const tabs = ["Tours", "Hotels", "Flights"] as const;

const fieldClass =
  "peer w-full bg-transparent text-sm font-medium text-sand-900 placeholder:text-sand-400 focus:outline-none";

export function SearchBar() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tours");
  const listId = useId();

  // No booking engine is wired up yet — send the traveller to the packages
  // section so the control still does something useful.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document
      .getElementById("packages")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="rounded-3xl bg-white/95 p-2 shadow-2xl shadow-brand-950/20 ring-1 ring-sand-900/5 backdrop-blur">
      <div
        role="tablist"
        aria-label="Search type"
        className="flex gap-1 px-2 pt-1.5 pb-3"
      >
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === item
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
        className="grid gap-px overflow-hidden rounded-2xl bg-sand-200 md:grid-cols-[1.4fr_1fr_1fr_auto]"
      >
        <label className="flex items-center gap-3 bg-white px-4 py-3.5">
          <MapPinIcon className="size-5 shrink-0 text-brand-600" />
          <span className="flex-1">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-500">
              Where to
            </span>
            <input
              type="text"
              name="destination"
              list={listId}
              placeholder="Bali, Venice, anywhere…"
              autoComplete="off"
              className={fieldClass}
            />
          </span>
        </label>
        <datalist id={listId}>
          {destinations.map((destination) => (
            <option
              key={destination.slug}
              value={`${destination.city}, ${destination.country}`}
            />
          ))}
        </datalist>

        <label className="flex items-center gap-3 bg-white px-4 py-3.5">
          <CalendarIcon className="size-5 shrink-0 text-brand-600" />
          <span className="flex-1">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-500">
              Departing
            </span>
            <input type="date" name="date" className={fieldClass} />
          </span>
        </label>

        <label className="flex items-center gap-3 bg-white px-4 py-3.5">
          <UsersIcon className="size-5 shrink-0 text-brand-600" />
          <span className="flex-1">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-500">
              Travellers
            </span>
            <select name="travellers" defaultValue="2" className={fieldClass}>
              <option value="1">1 traveller</option>
              <option value="2">2 travellers</option>
              <option value="3">3 travellers</option>
              <option value="4">4 travellers</option>
              <option value="5">5+ / group</option>
            </select>
          </span>
        </label>

        <div className="bg-white p-2">
          <button
            type="submit"
            className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <SearchIcon className="size-4.5" />
            Search {tab.toLowerCase()}
          </button>
        </div>
      </form>
    </div>
  );
}
