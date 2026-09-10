import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RegionExplorer } from "@/components/regions/region-explorer";
import { ArrowRightIcon, CompassIcon, MapPinIcon } from "@/components/ui/icons";
import { tourismRegions } from "@/lib/data";
import { getRegionDetail, regionDetails } from "@/lib/regions";

export function generateStaticParams() {
  return regionDetails.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const region = getRegionDetail((await params).slug);
  if (!region) return { title: "Region" };

  return {
    title: region.name,
    description: region.coreIdentity,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegionDetail(slug);
  if (!region) notFound();

  // The card artwork on the homepage doubles as this page's hero.
  const card = tourismRegions.find((item) => item.slug === slug);
  const provinces = new Set(region.destinations.map((d) => d.province));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-950">
        {card ? (
          <Image
            src={card.image}
            alt={card.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-b from-brand-950/85 via-brand-950/70 to-brand-950/90" />

        <div className="page-x relative pt-32 pb-14 lg:pt-40 lg:pb-20">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sunset-200 transition-colors hover:text-white"
          >
            <CompassIcon className="size-4" />
            Discover
          </Link>

          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {region.name}
          </h1>
          {region.nameKh ? (
            <p
              lang="km"
              className="mt-3 text-lg leading-relaxed text-white/70"
            >
              {region.nameKh}
            </p>
          ) : null}

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">
            {region.tagline}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {region.destinations.length}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">Destinations</dt>
            </div>
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {region.categories.length}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">Categories</dt>
            </div>
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {provinces.size}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">Provinces</dt>
            </div>
          </dl>
        </div>
      </section>

      <section className="page-x py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              About region
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-sand-900">
              {region.vision}
            </h2>
            {region.visionKh ? (
              <p lang="km" className="mt-2 text-base text-sand-500">
                {region.visionKh}
              </p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-sand-200 bg-white p-7 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-500">
              Core Identity
            </p>
            <p className="mt-3 text-lg leading-relaxed text-pretty text-sand-800">
              {region.coreIdentity}
            </p>
            {region.coreIdentityKh ? (
              <p
                lang="km"
                className="mt-4 border-t border-sand-200 pt-4 text-sm leading-loose text-sand-500"
              >
                {region.coreIdentityKh}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {region.coverage ? (
        <section className="bg-sand-100 py-16 lg:py-20">
          <div className="page-x">
            <h2 className="font-display text-2xl font-semibold text-sand-900 sm:text-3xl">
              {region.coverageTitle}
            </h2>
            {region.coverageIntro ? (
              <p className="mt-1.5 max-w-2xl text-sm text-sand-600">
                {region.coverageIntro}
              </p>
            ) : null}

            <ol className="mt-8">
              {region.coverage.map((era, index) => (
                <li key={era.order} className="flex gap-4 md:gap-6">
                  <div
                    aria-hidden="true"
                    className="flex w-9 shrink-0 flex-col items-center md:w-11"
                  >
                    <span className="btn-sweep flex size-9 items-center justify-center rounded-full text-xs font-bold shadow-sm md:size-11 md:text-sm">
                      {era.order}
                    </span>
                    {index < region.coverage!.length - 1 ? (
                      <span className="w-px flex-1 bg-sand-300" />
                    ) : null}
                  </div>

                  <div className="pb-9">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="font-semibold text-brand-700">
                        {era.kicker}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 font-medium text-sand-600 ring-1 ring-sand-200">
                        {era.badge}
                      </span>
                    </p>

                    <h3 className="mt-2 font-display text-xl font-semibold text-sand-900">
                      {era.name}
                      {era.altName ? (
                        <span className="text-sand-400"> · {era.altName}</span>
                      ) : null}
                    </h3>
                    {era.nameKh ? (
                      <p lang="km" className="mt-0.5 text-sm text-sand-500">
                        {era.nameKh}
                      </p>
                    ) : null}

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand-600">
                      {era.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="page-x py-16 lg:py-20">
        <RegionExplorer
          regionSlug={region.slug}
          categories={region.categories}
          filterTags={region.filterTags}
          facets={region.facets}
          destinations={region.destinations}
        />

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-sand-200 pt-8">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            All nine regions
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/map"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            <MapPinIcon className="size-4" />
            Open the full map
          </Link>
        </div>
      </section>
    </>
  );
}
