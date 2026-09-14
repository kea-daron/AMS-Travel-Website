import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PlaceMap } from "@/components/regions/place-map";
import { TrackBrowse } from "@/components/account/track-browse";
import { StampButton } from "@/components/stays/stamp-button";
import { SaveButton } from "@/components/saved/save-button";
import { ShareButton } from "@/components/share/share-button";
import { RatingCard, StayRatingBadge } from "@/components/stays/stay-reviews";
import {
  ArrowRightIcon,
  BedIcon,
  CheckIcon,
  CompassIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
  ShieldIcon,
  UsersIcon,
  UtensilsIcon,
  WalletIcon,
} from "@/components/ui/icons";
import { amenityIcon } from "@/components/stays/amenity-icons";
import { getRooms, guestLabel } from "@/lib/rooms";
import type { Room } from "@/lib/rooms";
import type { RegionDestination, RegionDetail } from "@/lib/regions";
import { aroundStay, similarStays } from "@/lib/stays";
import type { NearbyPlace, StayProfile } from "@/lib/stays";

/** The destination page for somewhere you sleep. */
export function StayDetail({
  region,
  stay,
  profile,
}: {
  region: RegionDetail;
  stay: RegionDestination;
  profile: StayProfile;
}) {
  const hasPin = stay.lat !== undefined && stay.lng !== undefined;
  const path = `/regions/${region.slug}/${stay.slug}`;
  const around = aroundStay(stay);
  const roomList = getRooms(`${region.slug}/${stay.slug}`);
  const similar = similarStays(stay);

  return (
    <article>
      <TrackBrowse id={`${region.slug}/${stay.slug}`} />
      {/* Hero: the photo carries the page, details sit at the bottom of it. */}
      <header className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-brand-950 lg:min-h-[40rem]">
        <Image
          src={stay.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-950/95 via-brand-950/45 to-brand-950/40" />

        <div className="page-x relative w-full pt-32 pb-24 lg:pb-28">
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

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700">
              <BedIcon className="size-3.5" />
              {profile.type}
            </span>
            {stay.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25">
                <ShieldIcon className="size-3" />
                Verified
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {stay.name}
          </h1>
          {stay.nameKh ? (
            <p lang="km" className="mt-2 text-lg text-white/70">
              {stay.nameKh}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4" />
              {stay.province}, Cambodia
            </span>
            <span aria-hidden="true" className="text-white/40">
              ·
            </span>
            <StayRatingBadge stayKey={`${region.slug}/${stay.slug}`} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {hasPin ? (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${stay.lat},${stay.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                <MapIcon className="size-4" />
                Get directions
                <ExternalLinkIcon className="size-3.5 opacity-70" />
              </a>
            ) : null}
            <ShareButton path={path} name={stay.name} text={stay.blurb} tone="overlay" />
            <SaveButton
              slug={`${region.slug}/${stay.slug}`}
              name={stay.name}
              tone="overlay"
            />
            <StampButton
              placeKey={`${region.slug}/${stay.slug}`}
              name={stay.name}
              tone="overlay"
            />
          </div>
        </div>
      </header>

      {/* Key facts, lifted over the bottom of the hero. */}
      <div className="page-x relative -mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-sand-200 shadow-xl shadow-brand-950/10 ring-1 ring-sand-200 lg:grid-cols-4">
          <KeyFact icon={BedIcon} label="Type of stay">
            {profile.type}
          </KeyFact>
          <KeyFact icon={WalletIcon} label="Price level">
            <span aria-label={`${profile.price} of 4, ${profile.priceLabel}`}>
              <span className="text-sand-900">{"$".repeat(profile.price)}</span>
              <span className="text-sand-300">{"$".repeat(4 - profile.price)}</span>
            </span>{" "}
            <span className="font-medium text-sand-500">{profile.priceLabel}</span>
          </KeyFact>
          <KeyFact icon={UsersIcon} label="Best for">
            {profile.bestFor}
          </KeyFact>
          <KeyFact icon={MapPinIcon} label="Where">
            {stay.province}
          </KeyFact>
        </dl>
      </div>

      <div className="page-x py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Where it is, with the address and a way out to Google. */}
        <section className="overflow-hidden rounded-3xl border border-sand-200 bg-white">
          <div className="relative h-80 lg:h-[28rem]">
            {hasPin ? (
              <PlaceMap
                slug={stay.slug}
                name={stay.name}
                lat={stay.lat!}
                lng={stay.lng!}
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-sand-100 px-6 text-center text-sm text-sand-500">
                No map location yet.
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-sand-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
                Location
              </h2>
              <p className="mt-1 text-sm text-sand-700">
                {stay.province}, Cambodia
              </p>
            </div>
            {hasPin ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${stay.lat},${stay.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Open in Google Maps
                <ExternalLinkIcon className="size-3.5" />
              </a>
            ) : null}
          </div>
        </section>

          <div className="space-y-6">
            {stay.facilities && stay.facilities.length > 0 ? (
              <section className="rounded-3xl border border-sand-200 bg-white p-6">
                <h2 className="font-display text-xl font-semibold text-sand-900">
                  Popular facilities
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {stay.facilities.map((facility) => {
                    const Icon = amenityIcon(facility);
                    return (
                      <li key={facility} className="flex items-center gap-3 text-sm text-sand-700">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                          <Icon className="size-[1.125rem]" />
                        </span>
                        {facility}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            <RatingCard
              stayKey={`${region.slug}/${stay.slug}`}
              stayName={stay.name}
              path={path}
            />
          </div>
        </div>

        {roomList.length > 0 ? (
          <section id="rooms" className="mt-16 scroll-mt-28 border-t border-sand-200 pt-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-sand-900">
                  Rooms
                </h2>
                <p className="mt-1.5 text-sm text-sand-600">
                  {roomList.length} {roomList.length === 1 ? "type" : "types"} of
                  room — tap one for photos and what&apos;s inside.
                </p>
              </div>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roomList.map((room) => (
                <li key={room.slug}>
                  <RoomCard href={`${path}/rooms/${room.slug}`} room={room} />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-sand-500">
              Typical rooms at this kind of stay — every property is a little
              different, so confirm the details when you book.
            </p>
          </section>
        ) : null}

        {around.food.length > 0 || around.sights.length > 0 ? (
          <section className="mt-16 border-t border-sand-200 pt-12">
            <h2 className="font-display text-2xl font-semibold text-sand-900">
              Nearby Attractions
            </h2>
            <p className="mt-1.5 text-sm text-sand-600">
              The closest places to eat and things to do, by straight-line
              distance.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {around.food.length > 0 ? (
                <NearbyList icon={UtensilsIcon} title="Places to eat" places={around.food} />
              ) : null}
              {around.sights.length > 0 ? (
                <NearbyList icon={CompassIcon} title="Things to do" places={around.sights} />
              ) : null}
            </div>
          </section>
        ) : null}

        {similar.length > 0 ? (
          <section className="mt-16 border-t border-sand-200 pt-12">
            <h2 className="font-display text-2xl font-semibold text-sand-900">
              More stays like this
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map(({ regionSlug, destination }) => (
                <li key={`${regionSlug}/${destination.slug}`}>
                  <Link
                    href={`/regions/${regionSlug}/${destination.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5"
                  >
                    <span className="relative block aspect-[16/10] bg-sand-200">
                      <Image
                        src={destination.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700">
                        <BedIcon className="size-3.5" />
                        {profile.type}
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-sand-500">
                        <MapPinIcon className="size-3.5 text-sand-400" />
                        {destination.province}
                      </span>
                      <span className="mt-1.5 font-display text-lg leading-snug font-semibold text-sand-900">
                        {destination.name}
                      </span>
                      <span className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-sand-600">
                        {destination.blurb}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                        View stay
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function KeyFact({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof BedIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 bg-white p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-500">
          {label}
        </dt>
        <dd className="mt-1 text-sm font-semibold text-sand-900">{children}</dd>
      </div>
    </div>
  );
}

function NearbyList({
  icon: Icon,
  title,
  places,
}: {
  icon: typeof BedIcon;
  title: string;
  places: NearbyPlace[];
}) {
  return (
    <div>
      <h3 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-sand-500">
        <Icon className="size-4 text-brand-600" />
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {places.map(({ regionSlug, destination, km }) => (
          <li key={`${regionSlug}/${destination.slug}`}>
            <Link
              href={`/regions/${regionSlug}/${destination.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md hover:shadow-sand-900/5"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                <Image src={destination.image} alt="" fill sizes="4rem" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-2xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                  {destination.category}
                </span>
                <span className="mt-0.5 block truncate font-display text-base font-semibold text-sand-900">
                  {destination.name}
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-sand-600">
                {km < 1 ? "Under 1 km" : `${Math.round(km)} km`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoomCard({ href, room }: { href: string; room: Room }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-sand-200">
        <Image
          src={room.images[0]}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {room.images.length > 1 ? (
          <span className="absolute right-3 bottom-3 rounded-full bg-sand-900/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {room.images.length} photos
          </span>
        ) : null}
        {room.view ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-brand-700">
            {room.view}
          </span>
        ) : null}
      </span>

      <span className="flex flex-1 flex-col p-5">
        <span className="font-display text-lg leading-snug font-semibold text-sand-900">
          {room.name}
        </span>
        <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sand-600">
          {room.summary}
        </span>

        <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-sand-600">
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="size-4 text-sand-400" />
            {guestLabel(room)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedIcon className="size-4 text-sand-400" />
            {room.beds}
          </span>
          {room.size ? (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="text-sand-400">⤢</span>
              {room.size} m²
            </span>
          ) : null}
        </span>

        {room.perks && room.perks.length > 0 ? (
          <span className="mt-3 flex flex-col gap-1">
            {room.perks.map((perk) => (
              <span key={perk} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                <CheckIcon className="size-3.5" />
                {perk}
              </span>
            ))}
          </span>
        ) : null}

        <span className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
          {room.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-sand-600"
            >
              {feature}
            </span>
          ))}
          {room.features.length > 3 ? (
            <span className="rounded-full px-1 py-1 text-xs font-medium text-sand-400">
              +{room.features.length - 3} more
            </span>
          ) : null}
        </span>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          View room
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
