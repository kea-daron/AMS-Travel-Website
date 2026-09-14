import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { CoverageMap } from "@/components/regions/coverage-map";
import {
  ArrowRightIcon,
  CompassIcon,
  ExternalLinkIcon,
  LinkIcon,
  MapIcon,
  MapPinIcon,
  ShieldIcon,
} from "@/components/ui/icons";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { RatingCard } from "@/components/stays/stay-reviews";
import {
  coverageSlug,
  getCoverageStory,
  getRegionDestination,
  regionDetails,
} from "@/lib/regions";

/** One page per timeline step that has a full story written for it. */
export function generateStaticParams() {
  return regionDetails.flatMap((region) =>
    (region.coverage ?? [])
      .filter((item) => item.detail)
      .map((item) => ({ slug: region.slug, story: coverageSlug(item) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; story: string }>;
}): Promise<Metadata> {
  const { slug, story } = await params;
  const found = getCoverageStory(slug, story);
  if (!found) return { title: "Story" };

  const { item, region } = found;
  return {
    title: `${item.name}${item.altName ? ` (${item.altName})` : ""} — ${region.name}`,
    description: item.body,
  };
}

export default async function CoverageStoryPage({
  params,
}: {
  params: Promise<{ slug: string; story: string }>;
}) {
  const { slug, story } = await params;
  const found = getCoverageStory(slug, story);
  if (!found) notFound();

  const { region, item, index, steps } = found;
  const title = region.coverageTitle ?? "Timeline";

  // Places to see this step today, skipping any since renamed or removed.
  const places = (item.visit ?? []).flatMap((key) => {
    const [regionSlug, placeSlug] = key.split("/");
    const hit = getRegionDestination(regionSlug, placeSlug);
    return hit ? [{ key, ...hit }] : [];
  });
  const cover = places[0]?.destination.image;

  // Neighbours that have pages of their own.
  const withPages = steps.filter((step) => step.detail);
  const position = withPages.indexOf(item);
  const previous = withPages[position - 1];
  const next = withPages[position + 1];

  const pins = steps
    .filter((step) => step.lat !== undefined && step.lng !== undefined)
    .map((step) => ({
      slug: coverageSlug(step),
      name: `${step.order}. ${step.name}`,
      label: String(step.order),
      lat: step.lat!,
      lng: step.lng!,
    }));
  const hasPin = item.lat !== undefined && item.lng !== undefined;

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-brand-950">
        {cover ? (
          <>
            <Image
              src={cover}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-brand-950/85 via-brand-950/65 to-brand-950/95" />
          </>
        ) : (
          <div className="brand-sweep absolute inset-0 opacity-80" />
        )}

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
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/regions/${region.slug}#coverage`}
                  className="hover:text-white"
                >
                  {title}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="btn-sweep flex size-8 items-center justify-center rounded-full text-xs font-bold">
              {item.order}
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/25">
              {item.kicker}
            </span>
            <span className="rounded-full bg-white/95 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700">
              {item.badge}
            </span>
            {item.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25">
                <ShieldIcon className="size-3" />
                Verified
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {item.name}
            {item.altName ? (
              <span className="text-white/55"> · {item.altName}</span>
            ) : null}
          </h1>
          {item.nameKh ? (
            <p lang="km" className="mt-2 text-lg text-white/70">
              {item.nameKh}
            </p>
          ) : null}

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">
            {item.body}
          </p>

          {item.location ? (
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/75">
              <MapPinIcon className="size-4" />
              {item.location}
            </p>
          ) : null}

          <p className="mt-6 text-sm text-white/60">
            Step {index + 1} of {steps.length} in {title}
          </p>
        </div>
      </header>

      <div className="page-x py-14 lg:py-20">
        {item.gallery && item.gallery.length > 0 ? (
          <div className="mb-12">
            <PhotoGallery images={item.gallery} title={item.name} />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="min-w-0">
            {item.quote ? (
              <blockquote className="border-l-4 border-brand-300 pl-5 font-display text-xl leading-relaxed text-balance text-brand-800 sm:text-2xl">
                “{item.quote}”
              </blockquote>
            ) : null}

            {(item.categories?.length ?? 0) + (item.interests?.length ?? 0) > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.categories?.map((name) => (
                  <li key={`category-${name}`}>
                    <Link
                      href={`/regions/${region.slug}#destinations`}
                      className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
                {item.interests?.map((name) => (
                  <li key={`interest-${name}`}>
                    <Link
                      href="/explore/interests"
                      className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 px-3 py-1.5 text-xs font-medium text-sand-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <CompassIcon className="size-3.5 text-sand-400" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 space-y-5">
              {item.detail!.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={
                    i === 0
                      ? "font-display text-xl leading-relaxed text-pretty text-sand-800 sm:text-2xl"
                      : "text-base leading-relaxed text-pretty text-sand-600"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
              At a glance
            </h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <Fact label="When">{item.kicker}</Fact>
              <Fact label="Period">{item.badge}</Fact>
              {item.altName ? <Fact label="Known today as">{item.altName}</Fact> : null}
              {item.nameKh ? (
                <Fact label="In Khmer">
                  <span lang="km">{item.nameKh}</span>
                </Fact>
              ) : null}
              <Fact label="Region">
                <Link
                  href={`/regions/${region.slug}`}
                  className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                >
                  {region.name}
                </Link>
              </Fact>
              {item.location ? <Fact label="Where it is">{item.location}</Fact> : null}
              {hasPin ? (
                <Fact label="Coordinates">
                  {item.lat!.toFixed(4)}, {item.lng!.toFixed(4)}
                </Fact>
              ) : null}
            </dl>

            {item.sources && item.sources.length > 0 ? (
              <>
                <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
                  Sources
                </h2>
                <ul className="mt-4 space-y-2">
                  {item.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                      >
                        <LinkIcon className="size-4 text-sand-400 group-hover:text-brand-600" />
                        {source.label}
                        <ExternalLinkIcon className="size-3.5 opacity-70" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {places.length > 0 ? (
              <>
                <h2 className="mt-12 font-display text-xl font-semibold text-sand-900">
                  See it today
                </h2>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {places.map(({ key, destination }) => (
                    <li key={key}>
                      <Link
                        href={`/regions/${key}`}
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
                        </span>
                        <span className="flex flex-1 flex-col p-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                            {destination.category}
                          </span>
                          <span className="mt-1 font-display text-base leading-snug font-semibold text-sand-900">
                            {destination.name}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs text-sand-500">
                            <MapPinIcon className="size-3.5 text-sand-400" />
                            {destination.province}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                            View destination
                            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-sand-200 bg-white">
              <div className="relative h-80">
                {pins.length > 0 ? (
                  <CoverageMap
                    regionSlug={region.slug}
                    pins={pins}
                    current={story}
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-sand-100 px-6 text-center text-sm text-sand-500">
                    No map for this timeline yet.
                  </div>
                )}
              </div>

              <div className="border-t border-sand-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                  On the map
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-700">
                  Step {item.order} is in red. The numbers are the other steps
                  of {title} — tap one to read its story.
                </p>

                {hasPin ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sweep mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    <MapIcon className="size-4" />
                    Open in Google Maps
                    <ExternalLinkIcon className="size-3.5 opacity-70" />
                  </a>
                ) : null}
              </div>
            </div>

            <RatingCard
              stayKey={`story:${region.slug}/${story}`}
              stayName={item.name}
              path={`/regions/${region.slug}/stories/${story}`}
            />
          </aside>
        </div>

        {/* Walk the timeline without going back to the region page. */}
        <nav
          aria-label={title}
          className="mt-16 grid gap-4 border-t border-sand-200 pt-10 sm:grid-cols-2"
        >
          {previous ? (
            <StepLink
              href={`/regions/${region.slug}/stories/${coverageSlug(previous)}`}
              direction="Previous"
            >
              {previous.order}. {previous.name}
            </StepLink>
          ) : (
            <span />
          )}
          {next ? (
            <StepLink
              href={`/regions/${region.slug}/stories/${coverageSlug(next)}`}
              direction="Next"
              alignEnd
            >
              {next.order}. {next.name}
            </StepLink>
          ) : null}
        </nav>

        <div className="mt-8">
          <Link
            href={`/regions/${region.slug}#coverage`}
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            Back to {title}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-sand-200 pt-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-sand-800">{children}</dd>
    </div>
  );
}

function StepLink({
  href,
  direction,
  alignEnd,
  children,
}: {
  href: string;
  direction: "Previous" | "Next";
  alignEnd?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-sand-900/5 ${
        alignEnd ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
        {direction === "Previous" ? (
          <ArrowRightIcon className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
        ) : null}
        {direction}
        {direction === "Next" ? (
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </span>
      <span className="mt-1.5 font-display text-lg font-semibold text-sand-900 group-hover:text-brand-700">
        {children}
      </span>
    </Link>
  );
}
