"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Field } from "@/components/auth/field";
import { MailIcon, PhoneIcon, UserIcon } from "@/components/ui/icons";
import type { Profile } from "@/lib/use-profile";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]+$/;
const BIO_MAX = 160;
const OUTSIDE = "Outside Cambodia";

const boxClass =
  "w-full rounded-xl border border-sand-300 bg-white px-3.5 py-3 text-sm text-sand-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function validate(values: Profile) {
  const errors: Partial<Record<keyof Profile, string>> = {};
  const name = values.displayName?.trim() ?? "";
  if (name.length < 2) errors.displayName = "Use at least 2 characters.";
  if (values.email && !EMAIL.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "").length;
    if (!PHONE.test(values.phone.trim()) || digits < 8 || digits > 15) {
      errors.phone = "Use 8–15 digits, e.g. +855 12 345 678.";
    }
  }
  if ((values.bio?.length ?? 0) > BIO_MAX) {
    errors.bio = `Keep it to ${BIO_MAX} characters.`;
  }
  return errors;
}

/** Edits the profile in place; the username is shown but cannot change. */
export function ProfileForm({
  username,
  profile,
  provinces,
  onSave,
  onCancel,
}: {
  username: string;
  /** Current values, with fallbacks (e.g. the username as display name). */
  profile: Profile;
  provinces: string[];
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>(
    {},
  );
  const [bio, setBio] = useState(profile.bio ?? "");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: Profile = {
      displayName: String(data.get("displayName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      homeProvince: String(data.get("homeProvince") ?? ""),
      bio,
    };
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSave(values);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Display name"
          name="displayName"
          icon={UserIcon}
          placeholder="How your name appears"
          autoComplete="name"
          defaultValue={profile.displayName}
          error={errors.displayName}
          maxLength={40}
        />
        <div>
          <p className="block text-sm font-semibold text-sand-800">Username</p>
          <p className="mt-1.5 flex h-[2.875rem] items-center rounded-xl border border-dashed border-sand-300 bg-sand-50 px-3.5 text-sm text-sand-500">
            @{username}
          </p>
          <p className="mt-1.5 text-xs text-sand-500">
            Your login, so it can&apos;t be changed.
          </p>
        </div>

        <Field
          label="Email"
          name="email"
          type="email"
          icon={MailIcon}
          placeholder="you@example.com"
          autoComplete="email"
          defaultValue={profile.email}
          error={errors.email}
          required={false}
          hint="Optional"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          icon={PhoneIcon}
          placeholder="+855 12 345 678"
          autoComplete="tel"
          defaultValue={profile.phone}
          error={errors.phone}
          required={false}
          hint="Optional"
        />
      </div>

      <div>
        <label
          htmlFor="profile-province"
          className="block text-sm font-semibold text-sand-800"
        >
          Home province
        </label>
        <select
          id="profile-province"
          name="homeProvince"
          defaultValue={profile.homeProvince ?? ""}
          className={`mt-1.5 ${boxClass}`}
        >
          <option value="">Not set</option>
          {provinces.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value={OUTSIDE}>{OUTSIDE}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="profile-bio"
          className="block text-sm font-semibold text-sand-800"
        >
          About you
        </label>
        <textarea
          id="profile-bio"
          name="bio"
          rows={3}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Temples at sunrise, street food at night…"
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby="profile-bio-count"
          className={`mt-1.5 resize-none ${boxClass} ${
            errors.bio ? "border-sunset-500" : ""
          }`}
        />
        <p
          id="profile-bio-count"
          className={`mt-1.5 flex justify-between text-xs ${
            bio.length > BIO_MAX ? "text-sunset-700" : "text-sand-500"
          }`}
        >
          <span>{errors.bio ?? "Optional"}</span>
          <span className="tabular-nums">
            {bio.length}/{BIO_MAX}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-sand-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-700 transition-colors hover:border-sand-400 hover:bg-sand-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-sweep rounded-full px-6 py-2.5 text-sm font-semibold"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
