"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  AwardIcon,
  CheckIcon,
  CloseIcon,
  CompassIcon,
  FacebookIcon,
  LockIcon,
  MountainIcon,
  StarIcon,
} from "@/components/ui/icons";
import { MAX_POINTS, overallRank } from "@/lib/badges";
import type { Badge, Rank, Tier } from "@/lib/badges";

const ICONS = {
  browser: CompassIcon,
  reviewer: StarIcon,
  adventure: MountainIcon,
} as const;

/** Each tier its own colour, so the level reads at a glance. */
const TIER_STYLES: Record<Tier, { pill: string; icon: string; bar: string }> = {
  Silver: { pill: "bg-sand-200 text-sand-700", icon: "bg-sand-100 text-sand-600", bar: "bg-sand-400" },
  Gold: { pill: "bg-sunset-50 text-sunset-700", icon: "bg-sunset-50 text-sunset-600", bar: "bg-sunset-500" },
  Platinum: { pill: "btn-sweep", icon: "brand-sweep text-white", bar: "bg-brand-700" },
};

/** What each tier contributes to the overall rank. */
const TIER_POINTS: Record<Tier, number> = { Silver: 1, Gold: 2, Platinum: 3 };

const LOCKED = {
  pill: "bg-sand-100 text-sand-500",
  icon: "bg-sand-100 text-sand-400",
  bar: "bg-brand-400",
};

function styleFor(tier: Tier | null) {
  return tier ? TIER_STYLES[tier] : LOCKED;
}

/** Current status, the three badges, and a panel for whichever is tapped. */
export function Badges({ badges, top }: { badges: Badge[]; top: Badge }) {
  const [open, setOpen] = useState<Badge | null>(null);
  const [rankOpen, setRankOpen] = useState(false);
  const rank = overallRank(badges);

  return (
    <section aria-labelledby="badges-heading" className="space-y-4">
      <h2 id="badges-heading" className="sr-only">
        Your badges
      </h2>

      <button
        type="button"
        onClick={() => setRankOpen(true)}
        aria-haspopup="dialog"
        className="brand-sweep w-full rounded-3xl p-6 text-left text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <span className="flex items-start justify-between gap-4">
          <span>
            <span className="block text-sm text-white/70">Current status</span>
            <span className="mt-1 block font-display text-2xl font-semibold sm:text-3xl">
              {rank.name}
            </span>
          </span>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            <AwardIcon className="size-7" />
          </span>
        </span>

        <span className="mt-5 block">
          <span className="flex items-baseline justify-between text-sm text-white/80">
            <span>
              {rank.earned} of {badges.length} badges earned
            </span>
            <span className="font-semibold tabular-nums">
              {rank.points}/{MAX_POINTS} points
            </span>
          </span>
          <span
            className="mt-2 block h-2 overflow-hidden rounded-full bg-white/20"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={MAX_POINTS}
            aria-valuenow={rank.points}
            aria-label="Rank progress"
          >
            <span
              className="block h-full rounded-full bg-white transition-[width] duration-500"
              style={{ width: `${Math.max(2, (rank.points / MAX_POINTS) * 100)}%` }}
            />
          </span>
          <span className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
            {rank.next
              ? `${rank.next.needed} more ${rank.next.needed === 1 ? "point" : "points"} to ${rank.next.name}`
              : "Top rank reached"}
            <ArrowRightIcon className="size-3.5" />
          </span>
        </span>
      </button>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {badges.map((badge) => {
          const Icon = ICONS[badge.id];
          const badgeStyle = styleFor(badge.tier);
          return (
            <li key={badge.id}>
              <button
                type="button"
                onClick={() => setOpen(badge)}
                aria-haspopup="dialog"
                className={`h-full w-full rounded-3xl border bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sand-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  badge.id === top.id && badge.tier
                    ? "border-brand-200 hover:border-brand-300"
                    : "border-sand-200 hover:border-brand-200"
                }`}
              >
                <span className={`flex size-12 items-center justify-center rounded-2xl ${badgeStyle.icon}`}>
                  <Icon className="size-6" />
                </span>
                <span className="mt-4 block font-display text-lg leading-snug font-semibold text-sand-900">
                  {badge.name}
                </span>
                <span className="mt-1 block text-xs text-sand-500">{badge.earn}</span>

                <span className="mt-3 block">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeStyle.pill}`}>
                    {badge.tier ? `${badge.tier} tier` : "Not started"}
                  </span>
                </span>

                <span className="mt-4 block h-1.5 overflow-hidden rounded-full bg-sand-100">
                  <span
                    className={`block h-full rounded-full transition-[width] duration-500 ${badgeStyle.bar}`}
                    style={{ width: `${badge.fraction * 100}%` }}
                  />
                </span>
                <span className="mt-2 flex justify-between text-xs text-sand-500">
                  <span>{badge.progressLabel}</span>
                  {badge.next ? (
                    <span className="font-semibold text-sand-600 tabular-nums">
                      {badge.value.toLocaleString()}/{badge.next.at.toLocaleString()}
                    </span>
                  ) : (
                    <span className="font-semibold text-brand-700">Complete</span>
                  )}
                </span>

                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                  How to earn it
                  <ArrowRightIcon className="size-3.5" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <BadgeDetail badge={open} onClose={() => setOpen(null)} />
      <RankDetail
        rank={rank}
        badges={badges}
        top={top}
        open={rankOpen}
        onClose={() => setRankOpen(false)}
      />
    </section>
  );
}

/** The badge's ladder: what each tier takes, and where the traveller is. */
function BadgeDetail({ badge, onClose }: { badge: Badge | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (badge) dialog.current?.showModal();
    else dialog.current?.close();
  }, [badge]);

  const style = styleFor(badge?.tier ?? null);
  const Icon = badge ? ICONS[badge.id] : CompassIcon;

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-label={badge ? `${badge.name} details` : undefined}
      className="m-auto w-[min(30rem,92vw)] rounded-3xl bg-white p-0 text-sand-800 backdrop:bg-sand-900/50 backdrop:backdrop-blur-sm"
    >
      {badge ? (
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}>
                <Icon className="size-7" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-sand-900">
                  {badge.name}
                </h3>
                <p className="mt-0.5 text-sm text-sand-500">{badge.earn}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-700"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-sand-50 p-4">
            <p className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-sand-900">
                {badge.tier ? `${badge.tier} tier` : "Not started"}
              </span>
              <span className="text-sm text-sand-500">{badge.progressLabel}</span>
            </p>
            <span className="mt-2 block h-2 overflow-hidden rounded-full bg-sand-200">
              <span
                className={`block h-full rounded-full ${style.bar}`}
                style={{ width: `${Math.max(2, badge.fraction * 100)}%` }}
              />
            </span>
            <p className="mt-2 text-xs text-sand-500">
              {badge.next
                ? `${badge.remainingLabel} to ${badge.next.tier}.`
                : "Top tier reached."}
            </p>
          </div>

          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
            Tiers
          </h4>
          <ol className="mt-3 space-y-2">
            {badge.steps.map((step) => {
              const earned = badge.value >= step.at;
              const current = !earned && badge.next?.tier === step.tier;
              return (
                <li
                  key={step.tier}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                    earned
                      ? "border-brand-200 bg-brand-50/50"
                      : current
                        ? "border-sand-300 bg-white"
                        : "border-sand-200 bg-sand-50/60"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                      earned ? "bg-brand-600 text-white" : "bg-sand-200 text-sand-500"
                    }`}
                  >
                    {earned ? <CheckIcon className="size-4" /> : <LockIcon className="size-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-sand-900">
                      {step.tier} badge
                    </span>
                    <span className="block text-xs text-sand-500">{step.label}</span>
                  </span>
                  <span
                    className={`shrink-0 text-xs font-semibold ${
                      earned ? "text-brand-700" : current ? "text-sand-600" : "text-sand-400"
                    }`}
                  >
                    {earned ? "Earned" : current ? badge.remainingLabel : "Locked"}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-5 rounded-xl bg-sand-50 px-4 py-3 text-xs leading-relaxed text-sand-500">
            {badge.how}
          </p>

          <Link
            href="/explore"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {badge.id === "reviewer" ? "Find a stay to review" : "Keep exploring"}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : null}
    </dialog>
  );
}

/** The whole picture: rank, the points behind it, and a way to show it off. */
function RankDetail({
  rank,
  badges,
  top,
  open,
  onClose,
}: {
  rank: Rank;
  badges: Badge[];
  top: Badge;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  /** Facebook takes a link; the sentence goes along for platforms that use it. */
  function shareToFacebook() {
    const url = new URL("/", window.location.origin).href;
    const article = /^[AEIOU]/.test(rank.name) ? "an" : "a";
    const text = `I'm ${article} ${rank.name} on AMS Travel — ${rank.points} of ${MAX_POINTS} badge points exploring Cambodia.`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer,width=640,height=640",
    );
    setShared(true);
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-label="Your rank"
      className="m-auto w-[min(32rem,92vw)] rounded-3xl bg-white p-0 text-sand-800 backdrop:bg-sand-900/50 backdrop:backdrop-blur-sm"
    >
      {open ? (
        <div>
          <div className="brand-sweep relative px-6 py-7 text-white sm:px-7">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <CloseIcon className="size-5" />
            </button>

            <p className="text-sm text-white/70">Total rank</p>
            <p className="mt-1 flex items-center gap-3 font-display text-3xl font-semibold">
              <AwardIcon className="size-8" />
              {rank.name}
            </p>
            <p className="mt-4 flex items-baseline justify-between text-sm text-white/80">
              <span>
                {rank.next
                  ? `${rank.next.needed} more ${rank.next.needed === 1 ? "point" : "points"} to ${rank.next.name}`
                  : "Top rank reached"}
              </span>
              <span className="font-semibold tabular-nums">
                {rank.points}/{MAX_POINTS}
              </span>
            </p>
            <span className="mt-2 block h-2 overflow-hidden rounded-full bg-white/20">
              <span
                className="block h-full rounded-full bg-white"
                style={{ width: `${Math.max(2, (rank.points / MAX_POINTS) * 100)}%` }}
              />
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-500">
              Where the points come from
            </h4>
            <ul className="mt-3 space-y-2">
              {badges.map((badge) => {
                const Icon = ICONS[badge.id];
                const badgeStyle = styleFor(badge.tier);
                const points = badge.tier ? TIER_POINTS[badge.tier] : 0;
                return (
                  <li
                    key={badge.id}
                    className="flex items-center gap-3 rounded-2xl border border-sand-200 px-4 py-3"
                  >
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${badgeStyle.icon}`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-sand-900">
                        {badge.name.replace(" Badge", "")}
                      </span>
                      <span className="block text-xs text-sand-500">
                        {badge.progressLabel}
                      </span>
                    </span>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${badgeStyle.pill}`}>
                      {badge.tier ?? "—"}
                    </span>
                    <span className="w-10 shrink-0 text-right text-sm font-semibold text-sand-700 tabular-nums">
                      {points} pt
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-xs leading-relaxed text-sand-500">
              Silver is worth 1 point, Gold 2 and Platinum 3. Your next step is{" "}
              {top.next ? `${top.remainingLabel} on the ${top.name.replace(" Badge", "")} badge.` : "already at the top."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-sand-200 pt-5">
              <button
                type="button"
                onClick={shareToFacebook}
                className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1465d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
              >
                <FacebookIcon className="size-4" />
                Share to Facebook
              </button>
              <span aria-live="polite" className="text-xs font-semibold text-brand-700">
                {shared ? "Facebook opened in a new tab." : ""}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
