"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProfileForm } from "@/components/account/profile-form";
import { AvatarEditor } from "@/components/account/avatar-editor";
import { Badges } from "@/components/account/badges";
import { History } from "@/components/account/history";
import { HelpSupport } from "@/components/account/help-support";
import type { HistoryItem } from "@/components/account/history";
import { LoginRequired } from "@/components/auth/login-required";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
  CompassIcon,
  LogOutIcon,
  MapPinIcon,
  PencilIcon,
} from "@/components/ui/icons";
import { useProfile } from "@/lib/use-profile";
import type { Profile } from "@/lib/use-profile";
import { useSaved, useSavedTimes } from "@/lib/use-saved";
import { useMyReviews, useReviewCount } from "@/lib/use-reviews";
import { useBrowseCount } from "@/lib/use-browsed";
import { useStamps } from "@/lib/use-stamps";
import { buildBadges, topBadge } from "@/lib/badges";
import { endSession, useSession } from "@/lib/use-session";
import { groupSaved } from "@/lib/saved-entries";
import type { SavedPlace } from "@/lib/saved-entries";

const RECENT = 4;

export function AccountView({
  places,
  regions,
  provinces,
}: {
  places: SavedPlace[];
  regions: { slug: string; name: string }[];
  provinces: string[];
}) {
  const { user, ready: sessionReady } = useSession();
  const { slugs, ready } = useSaved();
  const savedTimes = useSavedTimes();
  const myReviews = useMyReviews(user?.name ?? null);
  const { profile, save } = useProfile(user?.name ?? null);
  const reviewCount = useReviewCount(user?.name ?? null);
  const browsed = useBrowseCount();
  const { count: stampCount } = useStamps();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  // Bring the form into view, first field focused, whichever button opened it.
  useEffect(() => {
    if (!editing) return;
    const card = detailsRef.current;
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
    card?.querySelector("input")?.focus({ preventScroll: true });
  }, [editing]);

  if (!ready || !sessionReady) {
    return <p className="text-sm text-sand-500">Loading your account…</p>;
  }

  if (!user) {
    return (
      <>
        <PageTitle />
        <LoginRequired
          title="Log in to see your account"
          body="Your profile, saved places and the regions you've explored all live here once you're logged in."
          next="/account"
        />
      </>
    );
  }

  const saved = groupSaved(slugs, places).map((entry) => entry.place);

  // What the form starts from, with the login's own details as fallbacks.
  const current: Profile = {
    ...profile,
    displayName: profile.displayName ?? user.name,
    email: profile.email ?? user.email,
  };

  function onSave(next: Profile) {
    save({ ...profile, ...next });
    setEditing(false);
    setNotice(true);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(false), 3000);
  }

  const perRegion = regions.map((region) => ({
    ...region,
    count: saved.filter((place) => place.region === region.slug).length,
  }));
  const regionsExplored = perRegion.filter((region) => region.count > 0).length;
  const provincesExplored = new Set(saved.map((place) => place.province)).size;
  const provinceCount = provinces.length;
  const mapOnly = saved.filter((place) => !place.region).length;
  const most = Math.max(1, ...perRegion.map((region) => region.count));

  // Saves and reviews on one timeline, newest first.
  const history: HistoryItem[] = [
    ...groupSaved(slugs, places).map(({ place, keys }) => ({
      id: `saved:${place.key}`,
      kind: "saved" as const,
      at: Math.max(...keys.map((key) => savedTimes[key] ?? 0)) || undefined,
      name: place.name,
      place: place.province,
      href: place.href,
      image: place.image,
    })),
    ...myReviews.map(({ stayKey, review }) => {
      const stay = places.find((item) => item.key === stayKey);
      return {
        id: `review:${stayKey}`,
        kind: "review" as const,
        at: review.at,
        name: stay?.name ?? stayKey,
        place: stay?.province ?? "",
        href: stay?.href ?? "/saved",
        image: stay?.image,
        rating: review.overall,
        note: review.text,
      };
    }),
  ].sort((a, b) => (b.at ?? 0) - (a.at ?? 0));

  const badges = buildBadges({
    browsed,
    reviews: reviewCount,
    stamps: stampCount,
  });

  return (
    <>
      <PageTitle />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[20rem_1fr]">
        {/* Profile */}
        <aside className="overflow-hidden rounded-3xl border border-sand-200 bg-white lg:sticky lg:top-28">
          <div className="brand-sweep h-24" />
          <div className="px-6 pb-6">
            <div className="-mt-12">
              <AvatarEditor
                name={current.displayName!}
                photo={profile.photo}
                onChange={(photo) => save({ ...profile, photo })}
              />
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold break-words text-sand-900">
              {current.displayName}
            </h2>
            <p className="mt-0.5 text-sm text-sand-500">@{user.name}</p>
            {current.bio ? (
              <p className="mt-3 text-sm leading-relaxed break-words text-sand-600">
                {current.bio}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                <span className="size-1.5 rounded-full bg-brand-600" />
                Signed in
              </span>
              {current.homeProvince ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-sand-600">
                  <MapPinIcon className="size-3.5" />
                  {current.homeProvince}
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid gap-2">
              <button
                type="button"
                onClick={() => setEditing(true)}
                disabled={editing}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-default disabled:border-brand-300 disabled:bg-brand-50 disabled:text-brand-700"
              >
                <PencilIcon className="size-4" />
                {editing ? "Editing…" : "Edit profile"}
              </button>
              <Link
                href="/saved"
                className="inline-flex items-center justify-center gap-2 btn-sweep rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                <BookmarkIcon className="size-4" />
                Saved places
              </Link>
              <button
                type="button"
                onClick={endSession}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-700 transition-colors hover:border-sunset-300 hover:bg-sunset-50 hover:text-sunset-700"
              >
                <LogOutIcon className="size-4" />
                Log out
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          {/* Headline numbers */}
          <dl className="grid gap-4 sm:grid-cols-3">
            <StatTile label="Saved places" value={String(saved.length)} />
            <StatTile
              label="Regions explored"
              value={String(regionsExplored)}
              of={regions.length}
            />
            <StatTile
              label="Provinces explored"
              value={String(provincesExplored)}
              of={provinceCount}
            />
          </dl>

          <Badges badges={badges} top={topBadge(badges)} />

          {/* Where the saves fall */}
          <Card
            title="Your Cambodia"
            caption="Saved places in each of the nine tourism regions."
          >
            <ul className="mt-5 space-y-3">
              {perRegion.map((region) => (
                <li
                  key={region.slug}
                  className="grid grid-cols-[minmax(0,11rem)_1fr_2rem] items-center gap-4 sm:grid-cols-[minmax(0,19rem)_1fr_2rem]"
                >
                  <Link
                    href={`/regions/${region.slug}`}
                    className="truncate text-sm font-medium text-sand-700 hover:text-brand-700"
                    title={region.name}
                  >
                    {region.name}
                  </Link>
                  <span
                    className="h-2 overflow-hidden rounded-full bg-brand-100"
                    title={`${region.count} saved in ${region.name}`}
                  >
                    <span
                      className="block h-full rounded-full bg-brand-600 transition-[width] duration-500"
                      style={{ width: `${(region.count / most) * 100}%` }}
                    />
                  </span>
                  <span
                    className={`text-right text-sm font-semibold tabular-nums ${
                      region.count ? "text-sand-900" : "text-sand-400"
                    }`}
                  >
                    {region.count}
                  </span>
                </li>
              ))}
            </ul>
            {mapOnly > 0 ? (
              <p className="mt-4 text-xs text-sand-500">
                Plus {mapOnly} saved from the map, which isn&apos;t sorted by
                region.
              </p>
            ) : null}
          </Card>

          {/* Latest saves */}
          <Card
            title="Recently saved"
            action={
              saved.length > 0 ? (
                <Link
                  href="/saved"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  View all {saved.length}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null
            }
          >
            {saved.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {saved.slice(0, RECENT).map((place) => (
                  <li key={place.key}>
                    <Link
                      href={place.href}
                      className="group flex items-center gap-3 rounded-2xl border border-sand-200 p-2.5 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                        <Image
                          src={place.image}
                          alt={place.alt}
                          fill
                          sizes="3.5rem"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-sand-900">
                          {place.name}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-xs text-sand-500">
                          <MapPinIcon className="size-3.5 shrink-0 text-sand-400" />
                          <span className="truncate">{place.province}</span>
                        </span>
                      </span>
                      <ArrowRightIcon className="size-4 shrink-0 text-sand-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl bg-sand-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-sand-600">
                  Nothing saved yet. Tap the bookmark on any destination and it
                  shows up here.
                </p>
                <Link
                  href="/explore"
                  className="inline-flex shrink-0 items-center gap-2 btn-sweep rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <CompassIcon className="size-4" />
                  Start exploring
                </Link>
              </div>
            )}
          </Card>

          <History items={history} />

          {/* Details */}
          <div ref={detailsRef} className="scroll-mt-28">
            <Card
              title={editing ? "Edit profile" : "Account details"}
              action={
                editing ? null : (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 px-3.5 py-1.5 text-sm font-semibold text-sand-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <PencilIcon className="size-3.5" />
                    Edit
                  </button>
                )
              }
            >
              {editing ? (
                <ProfileForm
                  username={user.name}
                  profile={current}
                  provinces={provinces}
                  onSave={onSave}
                  onCancel={() => setEditing(false)}
                />
              ) : (
                <>
                  <p
                    aria-live="polite"
                    className={notice ? "mt-4 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700" : "sr-only"}
                  >
                    {notice ? (
                      <>
                        <CheckIcon className="size-4" />
                        Profile updated
                      </>
                    ) : null}
                  </p>
                  <dl className="mt-4 divide-y divide-sand-200">
                    <Detail label="Display name">{current.displayName}</Detail>
                    <Detail label="Username">@{user.name}</Detail>
                    <Detail label="Email">
                      {current.email ?? <NotSet />}
                    </Detail>
                    <Detail label="Phone">{current.phone ?? <NotSet />}</Detail>
                    <Detail label="Home province">
                      {current.homeProvince ?? <NotSet />}
                    </Detail>
                    <Detail label="About you">
                      {current.bio ?? <NotSet />}
                    </Detail>
                    <Detail label="Saved list">
                      {saved.length} {saved.length === 1 ? "place" : "places"}
                    </Detail>
                  </dl>
                </>
              )}
              <p className="mt-4 rounded-xl bg-sand-50 px-4 py-3 text-xs leading-relaxed text-sand-500">
                Accounts aren&apos;t connected to a server yet, so your profile
                and saved list are kept in this browser only. Changing your
                password will come with the server.
              </p>
            </Card>
          </div>

          <HelpSupport />
        </div>
      </div>
    </>
  );
}

function PageTitle() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
        Account
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-sand-900 sm:text-5xl">
        Your account
      </h1>
    </>
  );
}

function StatTile({
  label,
  value,
  of,
}: {
  label: string;
  value: string;
  /** When set, the value is a share of this total, drawn as a meter. */
  of?: number;
}) {
  const count = Number(value);
  return (
    <div className="rounded-3xl border border-sand-200 bg-white p-5">
      <dt className="text-sm text-sand-500">{label}</dt>
      <dd className="mt-2">
        <span className="text-3xl font-semibold text-sand-900 tabular-nums">
          {value}
        </span>
        {of ? (
          <span className="ml-1 text-sm font-medium text-sand-400">
            of {of}
          </span>
        ) : null}
        {of ? (
          <span
            className="mt-3 block h-1.5 overflow-hidden rounded-full bg-brand-100"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={of}
            aria-valuenow={count}
            aria-label={`${label}: ${count} of ${of}`}
          >
            <span
              className="block h-full rounded-full bg-brand-600 transition-[width] duration-500"
              style={{ width: `${(count / of) * 100}%` }}
            />
          </span>
        ) : null}
      </dd>
    </div>
  );
}

function Card({
  title,
  caption,
  action,
  children,
}: {
  title: string;
  caption?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-sand-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-sand-900">
            {title}
          </h2>
          {caption ? (
            <p className="mt-1 text-sm text-sand-500">{caption}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function NotSet() {
  return <span className="font-normal text-sand-400">Not added</span>;
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm text-sand-500">{label}</dt>
      <dd className="text-sm font-medium break-words text-sand-900">
        {children}
      </dd>
    </div>
  );
}
