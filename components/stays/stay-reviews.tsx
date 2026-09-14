"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Avatar } from "@/components/layout/account-menu";
import { PencilIcon, StarIcon, TrashIcon } from "@/components/ui/icons";
import { loginHref } from "@/lib/login-redirect";
import { useProfile } from "@/lib/use-profile";
import { summarise, useReviews } from "@/lib/use-reviews";
import type { Review } from "@/lib/use-reviews";
import { useSession } from "@/lib/use-session";

const TEXT_MAX = 400;
const WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/** Read-only stars, rounded to the nearest whole star. */
function Stars({ value, size = "size-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`${size} ${i <= Math.round(value) ? "text-sunset-500" : "text-sand-200"}`}
        />
      ))}
    </span>
  );
}

/** Five radio buttons drawn as stars, so keyboards and screen readers work. */
function StarInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const name = useId();
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Your rating</legend>
      <span className="flex" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <label
            key={i}
            onMouseEnter={() => setHover(i)}
            className="cursor-pointer p-0.5 has-[:focus-visible]:rounded has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-600"
          >
            <input
              type="radio"
              name={name}
              value={i}
              checked={value === i}
              onChange={() => onChange(i)}
              className="sr-only"
            />
            <span className="sr-only">
              {i} {i === 1 ? "star" : "stars"}
            </span>
            <StarIcon
              className={`size-6 transition-colors ${
                i <= shown ? "text-sunset-500" : "text-sand-200 hover:text-sunset-200"
              }`}
            />
          </label>
        ))}
      </span>
      <span className="text-xs font-semibold text-sand-600" aria-hidden="true">
        {WORDS[shown]}
      </span>
    </fieldset>
  );
}

/**
 * The stay's rating at a glance: the average, how many reviews it rests on,
 * and the latest review. Signed-in travellers can add or edit their own.
 */
export function RatingCard({
  stayKey,
  stayName,
  path,
}: {
  stayKey: string;
  stayName: string;
  /** The stay's page, to come back to after logging in. */
  path: string;
}) {
  const { user } = useSession();
  const { profile } = useProfile(user?.name ?? null);
  const { reviews, mine, submit, remove, ready } = useReviews(stayKey, user?.name ?? null);
  const [writing, setWriting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { count, average } = summarise(reviews);
  const listed = showAll ? reviews : reviews.slice(0, 1);

  return (
    <section
      id="rating"
      aria-label={`Rating for ${stayName}`}
      className="scroll-mt-28 rounded-3xl border border-sand-200 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {ready && count > 0 ? (
            <>
              <p>
                <span className="text-3xl font-semibold text-sand-900 tabular-nums">
                  {average.toFixed(1)}
                </span>
                <span className="ml-1 text-base font-medium text-sand-400">/ 5.0</span>
                <span className="ml-2 text-sm font-semibold text-sand-700">
                  {WORDS[Math.round(average)]}
                </span>
              </p>
              <p className="mt-1 text-sm text-sand-500">
                Based on {count.toLocaleString()} {count === 1 ? "review" : "reviews"}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-xl font-semibold text-sand-900">
                No reviews yet
              </p>
              <p className="mt-1 text-sm text-sand-500">Be the first to rate it.</p>
            </>
          )}
        </div>
        <span className="pt-1.5">
          <Stars value={count ? average : 0} size="size-5" />
        </span>
      </div>

      {listed.length > 0 ? (
        <ul className="mt-5 space-y-3 border-t border-sand-200 pt-5">
          {listed.map((review) => (
            <li key={review.user}>
              <ReviewQuote
                review={review}
                own={review.user === user?.name}
                photo={review.user === user?.name ? profile.photo : undefined}
              />
            </li>
          ))}
        </ul>
      ) : null}

      {count > 1 ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-3 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {showAll ? "Show fewer" : `Show all ${count} reviews`}
        </button>
      ) : null}

      <div className="mt-5 border-t border-sand-200 pt-4">
        {!ready ? null : !user ? (
          <Link
            href={loginHref(`${path}#rating`)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <StarIcon className="size-4" />
            Log in to write a review
          </Link>
        ) : writing ? (
          <ReviewForm
            initial={mine}
            onCancel={() => setWriting(false)}
            onDelete={
              mine
                ? () => {
                    remove();
                    setWriting(false);
                  }
                : undefined
            }
            onSubmit={(overall, text) => {
              submit({
                user: user.name,
                displayName: profile.displayName ?? user.name,
                overall,
                scores: mine?.scores ?? {},
                text,
              });
              setWriting(false);
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setWriting(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {mine ? <PencilIcon className="size-4" /> : <StarIcon className="size-4" />}
            {mine ? "Edit your review" : "Write a review"}
          </button>
        )}
      </div>
    </section>
  );
}

function ReviewQuote({
  review,
  own,
  photo,
}: {
  review: Review;
  own: boolean;
  photo?: string;
}) {
  return (
    <figure className="rounded-2xl bg-sand-50 p-4">
      <figcaption className="flex items-center gap-3">
        <Avatar name={review.displayName} photo={photo} className="size-11 text-base" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-sand-900">
            {review.displayName}
            {own ? (
              <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-brand-700">
                You
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-xs text-sand-500">
            Traveller
            <span aria-hidden="true">·</span>
            <StarIcon className="size-3 text-sunset-500" />
            <span className="font-semibold text-sand-700">{review.overall.toFixed(1)}</span>
            <span className="sr-only">out of 5</span>
            <span aria-hidden="true">·</span>
            {new Date(review.at).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            })}
          </span>
        </span>
      </figcaption>
      {review.text ? (
        <blockquote className="mt-3 text-sm leading-relaxed break-words text-sand-700">
          “{review.text}”
        </blockquote>
      ) : null}
    </figure>
  );
}

function ReviewForm({
  initial,
  onSubmit,
  onCancel,
  onDelete,
}: {
  initial?: Review;
  onSubmit: (overall: number, text: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [overall, setOverall] = useState(initial?.overall ?? 0);
  const [text, setText] = useState(initial?.text ?? "");
  const [error, setError] = useState("");

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!overall) return setError("Pick one to five stars.");
    if (text.length > TEXT_MAX) return setError(`Keep it to ${TEXT_MAX} characters.`);
    onSubmit(overall, text.trim());
  }

  return (
    <form onSubmit={onFormSubmit} noValidate>
      <p className="text-sm font-semibold text-sand-900">
        {initial ? "Edit your review" : "Your rating"}
      </p>
      <div className="mt-1">
        <StarInput
          value={overall}
          onChange={(value) => {
            setOverall(value);
            setError("");
          }}
        />
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Your review</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          placeholder="What stood out — the room, the food, the people?"
          className="w-full resize-none rounded-xl border border-sand-300 bg-white px-3.5 py-3 text-sm text-sand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </label>
      <p className={`mt-1 text-right text-xs tabular-nums ${text.length > TEXT_MAX ? "text-sunset-700" : "text-sand-400"}`}>
        {text.length}/{TEXT_MAX}
      </p>
      {error ? (
        <p role="alert" className="mt-1 text-sm font-semibold text-sunset-700">
          {error}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="submit" className="btn-sweep rounded-full px-5 py-2 text-sm font-semibold">
          {initial ? "Save" : "Post review"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-sand-700 hover:bg-sand-100"
        >
          Cancel
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-sand-500 hover:bg-sunset-50 hover:text-sunset-700"
          >
            <TrashIcon className="size-4" />
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}

/** Star and rating beside the stay's location; jumps to the rating card. */
export function StayRatingBadge({ stayKey }: { stayKey: string }) {
  const { reviews, ready } = useReviews(stayKey, null);
  if (!ready) return null;
  const { count, average } = summarise(reviews);

  return (
    <a href="#rating" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
      <StarIcon className={`size-4 ${count ? "text-sunset-400" : "text-white/50"}`} />
      {count ? (
        <>
          <span className="font-semibold text-white">{average.toFixed(1)}</span>
          <span>
            ({count.toLocaleString()} {count === 1 ? "review" : "reviews"})
          </span>
        </>
      ) : (
        "No reviews yet"
      )}
    </a>
  );
}
