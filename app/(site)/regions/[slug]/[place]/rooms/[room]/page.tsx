import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SaveButton } from "@/components/saved/save-button";
import { ShareButton } from "@/components/share/share-button";
import { amenityIcon } from "@/components/stays/amenity-icons";
import { ContactCard } from "@/components/stays/contact-card";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { TrackBrowse } from "@/components/account/track-browse";
import {
  ArrowRightIcon,
  BedIcon,
  CheckIcon,
  ExternalLinkIcon,
  EyeIcon,
  MapIcon,
  MapPinIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/ui/icons";
import { getRegionDestination } from "@/lib/regions";
import { getRoom, getRooms, guestLabel, rooms } from "@/lib/rooms";
import { stayProfile } from "@/lib/stays";
import { contactFor } from "@/lib/contacts";

type Params = Promise<{ slug: string; place: string; room: string }>;

export function generateStaticParams() {
  return Object.entries(rooms).flatMap(([key, list]) => {
    const [slug, place] = key.split("/");
    return list.map((room) => ({ slug, place, room: room.slug }));
  });
}

function load(slug: string, place: string, roomSlug: string) {
  const found = getRegionDestination(slug, place);
  const room = getRoom(`${slug}/${place}`, roomSlug);
  const profile = found ? stayProfile(found.destination) : undefined;
  return found && room && profile ? { ...found, room, profile } : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, place, room } = await params;
  const found = load(slug, place, room);
  if (!found) return { title: "Room" };
  return {
    title: `${found.room.name} — ${found.destination.name}`,
    description: found.room.summary,
  };
}

export default async function RoomPage({ params }: { params: Params }) {
  const { slug, place, room: roomSlug } = await params;
  const found = load(slug, place, roomSlug);
  if (!found) notFound();

  const { region, destination: stay, room, profile } = found;
  const stayPath = `/regions/${region.slug}/${stay.slug}`;
  const path = `${stayPath}/rooms/${room.slug}`;
  const others = getRooms(`${region.slug}/${stay.slug}`).filter((item) => item.slug !== room.slug);
  const hasPin = stay.lat !== undefined && stay.lng !== undefined;
  const { contact, sample } = contactFor(`${region.slug}/${stay.slug}`, profile.type);

  return (
    <article className="page-x pt-28 pb-20 lg:pt-32 lg:pb-28">
      <TrackBrowse id={path} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] text-sand-500">
          <li>
            <Link href={`/regions/${region.slug}`} className="hover:text-brand-700">
              {region.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={stayPath} className="hover:text-brand-700">
              {stay.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`${stayPath}#rooms`} className="hover:text-brand-700">
              Rooms
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-6">
        <PhotoGallery images={room.images} title={`${room.name} — ${stay.name}`} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            <BedIcon className="size-4" />
            {profile.type} ·{" "}
            <Link href={stayPath} className="hover:text-brand-800">
              {stay.name}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-sand-900 sm:text-5xl">
            {room.name}
          </h1>

          <dl className="mt-6 flex flex-wrap gap-2">
            <Chip icon={<UsersIcon className="size-4" />} label="Guests">
              {guestLabel(room)}
            </Chip>
            <Chip icon={<BedIcon className="size-4" />} label="Beds">
              {room.beds}
            </Chip>
            {room.size ? (
              <Chip icon={<span aria-hidden="true">⤢</span>} label="Size">
                {room.size} m²
              </Chip>
            ) : null}
            {room.view ? (
              <Chip icon={<EyeIcon className="size-4" />} label="View">
                {room.view}
              </Chip>
            ) : null}
          </dl>

          <p className="mt-8 font-display text-xl leading-relaxed text-pretty text-sand-800">
            {room.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-pretty text-sand-600">
            {room.description}
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
            In the room
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {room.features.map((feature) => {
              const Icon = amenityIcon(feature);
              return (
                <li key={feature} className="flex items-center gap-3 text-sm text-sand-700">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="size-5" />
                  </span>
                  {feature}
                </li>
              );
            })}
          </ul>

          {room.perks && room.perks.length > 0 ? (
            <>
              <h2 className="mt-10 font-display text-xl font-semibold text-sand-900">
                Included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {room.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm font-semibold text-sand-800">
                    <span className="flex size-6 items-center justify-center rounded-full bg-brand-600 text-white">
                      <CheckIcon className="size-4" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <p className="mt-8 rounded-2xl bg-sand-100 px-4 py-3 text-xs leading-relaxed text-sand-500">
            A typical {room.name.toLowerCase()} at this kind of stay — every
            property is a little different, so confirm the details when you book.
          </p>
        </div>

        <aside className="space-y-5">
          <ContactCard
            contact={contact}
            sample={sample}
            stayName={stay.name}
            roomName={room.name}
          />

          <div className="rounded-3xl border border-sand-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
              At {stay.name}
            </p>
            <p className="mt-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <WalletIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-sand-900">
                  <span aria-label={`${profile.price} of 4`}>
                    {"$".repeat(profile.price)}
                    <span className="text-sand-300">{"$".repeat(4 - profile.price)}</span>
                  </span>{" "}
                  <span className="font-medium text-sand-500">{profile.priceLabel}</span>
                </span>
                <span className="block text-xs text-sand-500">Price level for this stay</span>
              </span>
            </p>
            <p className="mt-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <MapPinIcon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-sand-900">
                {stay.province}, Cambodia
              </span>
            </p>

            <div className="mt-6 grid gap-2">
              {hasPin ? (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${stay.lat},${stay.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  <MapIcon className="size-4" />
                  Get directions
                  <ExternalLinkIcon className="size-3.5 opacity-70" />
                </a>
              ) : null}
              <Link
                href={stayPath}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
              >
                Back to {stay.name}
              </Link>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4">
              <span className="text-sm text-sand-600">Share or save</span>
              <span className="flex gap-1">
                <ShareButton path={path} name={`${room.name} — ${stay.name}`} text={room.summary} />
                <SaveButton slug={`${region.slug}/${stay.slug}`} name={stay.name} />
              </span>
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 ? (
        <section className="mt-16 border-t border-sand-200 pt-12">
          <h2 className="font-display text-2xl font-semibold text-sand-900">
            Other rooms at {stay.name}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`${stayPath}/rooms/${other.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-sand-900/5"
                >
                  <span className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                    <Image src={other.images[0]} alt="" fill sizes="6rem" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-sand-900">
                      {other.name}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-sand-500">
                      <span className="inline-flex items-center gap-1">
                        <UsersIcon className="size-3.5" />
                        {guestLabel(other)}
                      </span>
                      {other.size ? <span>{other.size} m²</span> : null}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                      View room
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}

function Chip({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-3.5 py-2 text-sm">
      <span className="text-brand-600">{icon}</span>
      <dt className="sr-only">{label}</dt>
      <dd className="font-semibold text-sand-800">{children}</dd>
    </div>
  );
}
