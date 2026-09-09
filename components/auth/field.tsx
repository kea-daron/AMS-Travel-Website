"use client";

import { useId, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  icon: Icon;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
};

const inputClass =
  "w-full rounded-xl border bg-white py-3 pl-11 text-sm text-sand-900 outline-none transition-colors placeholder:text-sand-400";

/** Text or password input with a leading icon, inline error and a reveal toggle. */
export function Field({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  autoComplete,
  defaultValue,
  error,
  hint,
}: FieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-sand-800"
      >
        {label}
      </label>

      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-sand-400" />

        <input
          id={id}
          name={name}
          type={isPassword && revealed ? "text" : type}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass} ${isPassword ? "pr-11" : "pr-4"} ${
            error
              ? "border-sunset-500 focus:border-sunset-600 focus:ring-2 focus:ring-sunset-500/25"
              : "border-sand-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          }`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((open) => !open)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-700"
          >
            {revealed ? (
              <EyeOffIcon className="size-4.5" />
            ) : (
              <EyeIcon className="size-4.5" />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-sunset-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-sand-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
