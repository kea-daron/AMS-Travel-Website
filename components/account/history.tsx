"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookmarkIcon,
  StarIcon,
} from "@/components/ui/icons";

export type HistoryItem = {
  id: string;
  kind: "saved" | "review";
  /** Undefined for places saved before dates were kept. */
  at?: number;
  name: string;
  place: string;
  href: string;
  image?: string;
  /** Reviews only. */
  rating?: number;
  note?: string;
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "saved", label: "Saved" },
  { id: "review", label: "Reviews" },
] as const;

/** "Today", "Yesterday", "3 days ago", then the date. */
function when(at?: number) {
  if (!at) return "Earlier";
  const days = Math.floor((Date.now() - at) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(at).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const PAGE = 6;

/** What this traveller has saved and reviewed, newest first. */
export function History({ items }: { items: HistoryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [limit, setLimit] = useState(PAGE);

  const count = (id: (typeof FILTERS)[number]["id"]) =>
    id === "all" ? items.length : items.filter((item) => item.kind === id).length;
  const shown = filter === "all" ? items : items.filter((item) => item.kind === filter);

  return (
    <section className="rounded-3xl border border-sand-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-sand-900">History</h2>
          <p className="mt-1 text-sm text-sand-500">
            Everything you have saved and reviewed, newest first.
          </p>
        </div>

        <div role="group" aria-label="Filter history" className="flex gap-1 rounded-full bg-sand-100 p-1">
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(item.id);
                  setLimit(PAGE);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  active ? "bg-white text-brand-700 shadow-sm" : "text-sand-500 hover:text-sand-800"
                }`}
              >
                {item.label}
                <span className={active ? "text-brand-400" : "text-sand-400"}>
                  {count(item.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-sand-50 px-4 py-8 text-center text-sm text-sand-500">
          {filter === "review"
            ? "No reviews yet. Rate a stay and it shows up here."
            : filter === "saved"
              ? "Nothing saved yet. Tap the bookmark on any destination."
              : "Nothing here yet — save a place or review a stay to start your history."}
        </p>
      ) : (
        <>
          <ol className="mt-6 space-y-3">
            {shown.slice(0, limit).map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-4 rounded-2xl border border-sand-200 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="3.5rem" className="object-cover" />
                    ) : null}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-bold uppercase tracking-wide ${
                          item.kind === "saved"
                            ? "bg-brand-50 text-brand-700"
                            : "bg-sunset-50 text-sunset-700"
                        }`}
                      >
                        {item.kind === "saved" ? (
                          <BookmarkIcon className="size-3" />
                        ) : (
                          <StarIcon className="size-3" />
                        )}
                        {item.kind === "saved" ? "Saved" : "Reviewed"}
                      </span>
                      <span className="text-xs text-sand-400">{when(item.at)}</span>
                    </span>

                    <span className="mt-1 block truncate font-display text-base font-semibold text-sand-900">
                      {item.name}
                    </span>
                    <span className="block truncate text-xs text-sand-500">{item.place}</span>

                    {item.kind === "review" ? (
                      <span className="mt-1.5 flex items-start gap-2">
                        <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-sand-700">
                          <StarIcon className="size-3 text-sunset-500" />
                          {item.rating?.toFixed(1)}
                        </span>
                        {item.note ? (
                          <span className="line-clamp-2 text-xs leading-relaxed text-sand-600">
                            “{item.note}”
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </span>

                  <ArrowRightIcon className="mt-1 size-4 shrink-0 text-sand-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </Link>
              </li>
            ))}
          </ol>

          {shown.length > limit ? (
            <button
              type="button"
              onClick={() => setLimit((value) => value + PAGE)}
              className="mt-5 w-full rounded-full border border-sand-300 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              Show more · {shown.length - limit} left
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
