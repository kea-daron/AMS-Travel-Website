import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import type { Metadata } from "next";
import { ArrowRightIcon, CompassIcon, SearchIcon } from "@/components/ui/icons";
import { allHits, searchSite } from "@/lib/site-search";
import type { SearchHit, SearchType } from "@/lib/site-search";
import { INTERESTS, getInterest } from "@/lib/interests";

type Params = Promise<{
  q?: string | string[];
  type?: string | string[];
  interest?: string | string[];
}>;

const FILTERS: { id: "all" | SearchType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "place", label: "Places" },
  { id: "food", label: "Food & drink" },
  { id: "stay", label: "Stays" },
  { id: "region", label: "Regions" },
  { id: "province", label: "Provinces" },
  { id: "corridor", label: "Corridors" },
  { id: "story", label: "Stories" },
];

const TYPE_LABEL: Record<SearchType, string> = {
  place: "Place",
  food: "Food & drink",
  stay: "Stay",
  region: "Region",
  province: "Province",
  corridor: "Corridor",
  story: "Story",
};

const SUGGESTIONS = [
  "Temples",
  "Street food",
  "Homestay",
  "Waterfall",
  "Island",
  "Coffee",
  "Kampot",
  "Hotel",
];

/** More than this and the list stops being useful; narrow it instead. */
const LIMIT = 60;

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function hrefFor(q: string, type?: string, interest?: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (interest) params.set("interest", interest);
  if (type && type !== "all") params.set("type", type);
  return `/search?${params}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Params;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = first(params.q).trim();
  const interest = getInterest(first(params.interest));
  if (q) return { title: `Search: ${q}` };
  return { title: interest ? `${interest.name} in Cambodia` : "Search" };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const params = await searchParams;
  const q = first(params.q).trim().slice(0, 100);
  const requested = first(params.type);
  const type = FILTERS.some((filter) => filter.id === requested)
    ? (requested as "all" | SearchType)
    : "all";

  const interest = getInterest(first(params.interest));
  // An interest on its own browses everything in it; with a word, it narrows.
  const found = q ? searchSite(q) : interest ? allHits() : [];
  const hits = interest
    ? found.filter((hit) => hit.interests.includes(interest.id))
    : found;
  const count = (id: "all" | SearchType) =>
    id === "all" ? hits.length : hits.filter((hit) => hit.types.includes(id)).length;
  const shown =
    type === "all" ? hits : hits.filter((hit) => hit.types.includes(type));

  return (
    <div className="page-x pt-32 pb-20 lg:pt-40 lg:pb-28">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
        Search
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-sand-900 sm:text-5xl">
        {q ? (
          <>
            Results for <span className="text-brand-700">“{q}”</span>
            {interest ? <span className="text-sand-400"> in {interest.name}</span> : null}
          </>
        ) : interest ? (
          interest.name
        ) : (
          "Search all of Cambodia"
        )}
      </h1>
      {interest && !q ? (
        <p className="mt-3 max-w-2xl text-base text-sand-600">{interest.blurb}.</p>
      ) : null}

      <Form
        action="/search"
        className="mt-8 flex max-w-3xl flex-col gap-2 rounded-3xl bg-white p-2 shadow-lg shadow-sand-900/5 ring-1 ring-sand-200 sm:flex-row"
      >
        <label className="flex flex-1 items-center gap-3 px-3">
          <SearchIcon className="size-5 shrink-0 text-brand-600" />
          <span className="sr-only">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Temples, street food, homestays, Kampot…"
            className="w-full bg-transparent py-3 text-base text-sand-900 placeholder:text-sand-400 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="btn-sweep inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
        >
          <SearchIcon className="size-4.5" />
          Search
        </button>
      </Form>

      <nav aria-label="Interests" className="mt-6 flex flex-wrap gap-2">
        {INTERESTS.map((item) => {
          const active = interest?.id === item.id;
          return (
            <Link
              key={item.id}
              href={active ? hrefFor(q) : hrefFor(q, undefined, item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-700 text-white"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              {item.name}
              {active ? <span className="ml-1.5 text-white/70">×</span> : null}
            </Link>
          );
        })}
      </nav>

      {q || interest ? (
        <>
          {hits.length > 0 ? (
            <nav aria-label="Filter results" className="mt-8 flex flex-wrap gap-2">
              {FILTERS.filter((filter) => filter.id === "all" || count(filter.id) > 0).map(
                (filter) => {
                  const active = filter.id === type;
                  return (
                    <Link
                      key={filter.id}
                      href={hrefFor(q, filter.id, interest?.id)}
                      scroll={false}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "border-brand-700 bg-brand-700 text-white"
                          : "border-sand-200 bg-white text-sand-600 hover:border-brand-300 hover:text-brand-700"
                      }`}
                    >
                      {filter.label}
                      <span className={active ? "text-white/70" : "text-sand-400"}>
                        {count(filter.id)}
                      </span>
                    </Link>
                  );
                },
              )}
            </nav>
          ) : null}

          {shown.length > 0 ? (
            <>
              <p className="mt-6 text-sm text-sand-500">
                {shown.length > LIMIT
                  ? `Showing the best ${LIMIT} of ${shown.length} — add a word to narrow it down.`
                  : `${shown.length} ${shown.length === 1 ? "result" : "results"}`}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {shown.slice(0, LIMIT).map((hit) => (
                  <li key={hit.id}>
                    <ResultCard hit={hit} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-sand-300 bg-white px-6 py-14 text-center">
              <p className="font-display text-xl font-semibold text-sand-900">
                {q ? `Nothing matches “${q}” yet` : `Nothing in ${interest?.name} yet`}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-sand-600">
                Try a shorter or different word — a place, a province, a dish or
                a kind of stay.
              </p>
              <Suggestions />
            </div>
          )}
        </>
      ) : (
        <div className="mt-10">
          <p className="text-sm text-sand-600">
            Destinations, food, stays, regions, provinces, corridors and
            history — all in one search. Try one of these:
          </p>
          <Suggestions align="start" />
        </div>
      )}
    </div>
  );
}

function Suggestions({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <div
      className={`mt-5 flex flex-wrap gap-2 ${align === "center" ? "justify-center" : ""}`}
    >
      {SUGGESTIONS.map((word) => (
        <Link
          key={word}
          href={hrefFor(word)}
          className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
        >
          {word}
        </Link>
      ))}
    </div>
  );
}

function ResultCard({ hit }: { hit: SearchHit }) {
  return (
    <Link
      href={hit.href}
      className="group flex h-full items-center gap-4 rounded-2xl border border-sand-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-sand-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <span className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sand-100">
        {hit.image ? (
          <Image
            src={hit.image}
            alt=""
            fill
            sizes="5rem"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <CompassIcon className="size-7 text-brand-300" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-2xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {hit.label}
          </span>
          {hit.types
            .filter((type) => type !== "place")
            .map((type) => (
              <span
                key={type}
                className="shrink-0 rounded-full bg-sand-100 px-2 py-0.5 text-2xs font-semibold text-sand-600"
              >
                {TYPE_LABEL[type]}
              </span>
            ))}
        </span>
        <span className="mt-1 block truncate font-display text-base font-semibold text-sand-900">
          {hit.title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-sand-500">
          {hit.subtitle}
        </span>
      </span>

      <ArrowRightIcon className="size-4 shrink-0 text-sand-300 transition-all group-hover:translate-x-1 group-hover:text-brand-600" />
    </Link>
  );
}
