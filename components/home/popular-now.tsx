import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ArrowRightIcon,
  BookmarkIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";
import { popularPicks } from "@/lib/data";
import type { PopularPick } from "@/lib/data";
import { getRegionDestination } from "@/lib/regions";

export function PopularNow() {
  return (
    <section id="popular" className="scroll-mt-24 bg-sand-100 py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="Trending"
          title="Popular Now"
          description="What travellers are saving most this week, across all twenty-five provinces. The list refreshes every Monday."
          action={
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-white hover:text-brand-700"
            >
              See the full list
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <ol className="mt-12 grid gap-3 lg:grid-cols-2 lg:gap-x-5">
          {popularPicks.map((pick, index) => (
            <li key={`${pick.region}/${pick.place}`}>
              <PopularRow pick={pick} rank={index + 1} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PopularRow({ pick, rank }: { pick: PopularPick; rank: number }) {
  const found = getRegionDestination(pick.region, pick.place);
  // Skip a pick whose destination has been renamed or removed.
  if (!found) return null;

  const { destination } = found;

  return (
    <Link
      href={`/regions/${pick.region}/${pick.place}`}
      className="group flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-sand-900/5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sand-900/5 hover:ring-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:gap-5 sm:p-4"
    >
      <span className="w-6 shrink-0 text-center font-display text-xl font-semibold text-sand-300 transition-colors group-hover:text-brand-500">
        {rank}
      </span>

      <span className="relative size-18 shrink-0 overflow-hidden rounded-xl bg-sand-200 sm:size-20">
        <Image
          src={destination.image}
          alt=""
          fill
          sizes="5rem"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
          {destination.province}
        </span>
        <span className="mt-1 block truncate font-display text-lg font-semibold text-sand-900">
          {destination.name}
        </span>

        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-sand-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-semibold text-brand-700">
            <TrendingUpIcon className="size-3.5" />
            {pick.trend}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookmarkIcon className="size-3.5 text-sand-400" />
            {pick.saves} saves
          </span>
          <span className="hidden truncate sm:inline">{destination.category}</span>
        </span>
      </span>

      <ArrowRightIcon className="size-4 shrink-0 text-sand-300 transition-all group-hover:translate-x-1 group-hover:text-brand-600" />
    </Link>
  );
}
