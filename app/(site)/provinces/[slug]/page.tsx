import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DestinationCard } from "@/components/regions/destination-card";
import { ProvinceMap } from "@/components/provinces/province-map";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { provinces } from "@/lib/data";
import { getProvinceDestinations } from "@/lib/regions";

export function generateStaticParams() {
  return provinces.map((province) => ({ slug: province.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const province = provinces.find((item) => item.slug === slug);
  if (!province) return { title: "Province" };

  return {
    title: `${province.name} Province`,
    description: `${province.highlight}. Everything we have verified in ${province.name}.`,
  };
}

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const province = provinces.find((item) => item.slug === slug);
  if (!province) notFound();

  const groups = getProvinceDestinations(province.name);
  const all = groups.flatMap((group) => group.destinations);
  const categories = new Set(all.map((item) => item.category));

  const pins = all
    .filter((item) => item.lat !== undefined && item.lng !== undefined)
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      lat: item.lat as number,
      lng: item.lng as number,
    }));

  return (
    <>
      <header className="relative isolate overflow-hidden bg-brand-950">
        <Image
          src={province.image}
          alt={province.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-950/80 via-brand-950/65 to-brand-950/95" />

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
                <Link href="/explore/provinces" className="hover:text-white">
                  Provinces
                </Link>
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 font-display text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {province.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">
            {province.highlight}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {all.length}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">Destinations</dt>
            </div>
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {groups.length}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">
                {groups.length === 1 ? "Region" : "Regions"}
              </dt>
            </div>
            <div>
              <dd className="font-display text-3xl font-semibold text-white">
                {categories.size}
              </dd>
              <dt className="mt-0.5 text-sm text-white/60">Categories</dt>
            </div>
          </dl>
        </div>
      </header>

      <div className="page-x py-14 lg:py-20">
        {all.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-sand-300 bg-white px-6 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <MapPinIcon className="size-7" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold text-sand-900">
              Nothing verified here yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-sand-600">
              {province.name} is on the map, but we have not published a
              verified destination in it so far. {province.highlight} is what
              the province is known for — it is next on the list.
            </p>
            <Link
              href="/explore/provinces"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              Browse the other provinces
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <>
            {pins.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl font-semibold text-sand-900">
                  On the map
                </h2>
                <p className="mt-1.5 text-sm text-sand-600">
                  {pins.length} of {all.length} pinned in {province.name}.
                </p>
                <div className="mt-5 h-[26rem] overflow-hidden rounded-3xl ring-1 ring-sand-900/10">
                  <ProvinceMap pins={pins} />
                </div>
              </section>
            ) : null}

            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-sand-900">
                {all.length} {all.length === 1 ? "destination" : "destinations"}{" "}
                in {province.name}
              </h2>
              <p className="mt-1.5 text-sm text-sand-600">
                Grouped by the tourism region each one belongs to.
              </p>

              {groups.map((group) => (
                <div key={group.region.slug} className="mt-10">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-sand-900">
                      {group.region.name}
                    </h3>
                    <Link
                      href={`/regions/${group.region.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                    >
                      All of this region
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.destinations.map((destination) => (
                      <li key={destination.slug}>
                        <DestinationCard
                          destination={destination}
                          regionSlug={group.region.slug}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </>
        )}

        <div className="mt-14 flex flex-wrap gap-4 border-t border-sand-200 pt-8">
          <Link
            href="/explore/provinces"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            All 25 provinces
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
}
