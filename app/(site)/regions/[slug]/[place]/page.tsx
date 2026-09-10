import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceMap } from "@/components/regions/place-map";
import { SaveButton } from "@/components/saved/save-button";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/ui/icons";
import {
  distanceKm,
  getRegionDestination,
  regionDetails,
} from "@/lib/regions";
import type { RegionDestination } from "@/lib/regions";

export function generateStaticParams() {
  return regionDetails.flatMap((region) =>
    region.destinations.map((destination) => ({
      slug: region.slug,
      place: destination.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; place: string }>;
}): Promise<Metadata> {
  const { slug, place } = await params;
  const found = getRegionDestination(slug, place);
  if (!found) return { title: "Destination" };

  return {
    title: `${found.destination.name} — ${found.destination.province}`,
    description: found.destination.detail ?? found.destination.blurb,
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string; place: string }>;
}) {
  const { slug, place } = await params;
  const found = getRegionDestination(slug, place);
  if (!found) notFound();

  const { region, destination } = found;
  const hasPin = destination.lat !== undefined && destination.lng !== undefined;

  // Closest three places in the same region, by great-circle distance.
  const nearby = hasPin
    ? region.destinations
        .filter(
          (item) =>
            item.slug !== destination.slug &&
            item.lat !== undefined &&
            item.lng !== undefined,
        )
        .map((item) => ({
          item,
          km: distanceKm(
            { lat: destination.lat!, lng: destination.lng! },
            { lat: item.lat!, lng: item.lng! },
          ),
        }))
        .sort((a, b) => a.km - b.km)
        .slice(0, 3)
    : [];

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-brand-950">
        <Image
          src={destination.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-950/80 via-brand-950/60 to-brand-950/95" />

        <div className="page-x relative pt-32 pb-12 lg:pt-40 lg:pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              <li>
                <Link href="/explore" className="hover:text-white">
                  Explore
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/regions/${region.slug}`} className="hover:text-white">
                  {region.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {destination.featured ? (
              <span className="rounded-full bg-sunset-600 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white">
                Featured
              </span>
            ) : null}
            {destination.unesco ? (
              <span className="rounded-full bg-white/95 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700">
                UNESCO
              </span>
            ) : null}
            {destination.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25">
                <ShieldIcon className="size-3" />
                Verified
              </span>
            ) : null}
            {destination.rating ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/25">
                <StarIcon className="size-3 text-sunset-400" />
                {destination.rating.toFixed(1)}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {destination.name}
          </h1>
          {destination.nameKh ? (
            <p lang="km" className="mt-2 text-lg text-white/70">
              {destination.nameKh}
            </p>
          ) : null}

          <p className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
            <MapPinIcon className="size-4" />
            {destination.province}
            <span aria-hidden="true" className="text-white/40">
              ·
            </span>
            {destination.category}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SaveButton
              slug={destination.slug}
              name={destination.name}
              tone="overlay"
            />
            {hasPin ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                <MapIcon className="size-4" />
                Open in Google Maps
                <ExternalLinkIcon className="size-3.5 opacity-70" />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <div className="page-x py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <p className="font-display text-xl leading-relaxed text-pretty text-sand-800 sm:text-2xl">
              {destination.blurb}
            </p>

            {destination.detail ? (
              <p className="mt-6 text-base leading-relaxed text-pretty text-sand-600">
                {destination.detail}
              </p>
            ) : null}

            <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
              At a glance
            </h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <Fact label="Region">
                <Link
                  href={`/regions/${region.slug}`}
                  className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                >
                  {region.name}
                </Link>
              </Fact>
              <Fact label="Province">{destination.province}</Fact>
              <Fact label="Category">{destination.category}</Fact>
              {hasPin ? (
                <Fact label="Coordinates">
                  {destination.lat!.toFixed(4)}, {destination.lng!.toFixed(4)}
                </Fact>
              ) : null}
              {Object.entries(destination.facets ?? {}).map(
                ([facet, value]) => (
                  <Fact key={facet} label={facet}>
                    {value}
                  </Fact>
                ),
              )}
            </dl>

            {destination.tags && destination.tags.length > 0 ? (
              <>
                <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
                  Tags
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {destination.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-sand-100 px-3 py-1.5 text-sm font-medium text-sand-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-sand-200 bg-white">
              <div className="relative h-72">
                {hasPin ? (
                  <PlaceMap
                    slug={destination.slug}
                    name={destination.name}
                    lat={destination.lat!}
                    lng={destination.lng!}
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-sand-100 px-6 text-center text-sm text-sand-500">
                    No coordinates yet — this entry covers a route or an area
                    rather than a single point.
                  </div>
                )}
              </div>

              <div className="border-t border-sand-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                  Location
                </p>
                <p className="mt-1.5 text-sm text-sand-700">
                  {destination.province}, Cambodia
                </p>

                <Link
                  href={`/map${hasPin ? `?place=${destination.slug}` : ""}`}
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                >
                  See it on the full map
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {nearby.length > 0 ? (
          <section className="mt-16 border-t border-sand-200 pt-12">
            <h2 className="font-display text-2xl font-semibold text-sand-900">
              Nearby in this region
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {nearby.map(({ item, km }) => (
                <li key={item.slug}>
                  <NearbyCard
                    regionSlug={region.slug}
                    destination={item}
                    km={km}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-14 flex flex-wrap gap-4 border-t border-sand-200 pt-8">
          <Link
            href={`/regions/${region.slug}#destinations`}
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            All {region.destinations.length} in {region.name}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-sand-200 pt-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-sand-800">{children}</dd>
    </div>
  );
}

function NearbyCard({
  regionSlug,
  destination,
  km,
}: {
  regionSlug: string;
  destination: RegionDestination;
  km: number;
}) {
  return (
    <Link
      href={`/regions/${regionSlug}/${destination.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-sand-900/5"
    >
      <span className="relative block aspect-[16/10] bg-sand-200">
        <Image
          src={destination.image}
          alt=""
          fill
          sizes="(min-width: 640px) 20rem, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-sand-900/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {km < 1 ? "under 1 km" : `${Math.round(km)} km away`}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
          {destination.category}
        </span>
        <span className="mt-1 font-display text-base leading-snug font-semibold text-sand-900">
          {destination.name}
        </span>
        <span className="mt-1 text-xs text-sand-500">
          {destination.province}
        </span>
      </span>
    </Link>
  );
}
