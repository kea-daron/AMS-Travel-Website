"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions";
import type { EnquiryState } from "@/app/actions";
import { ArrowRightIcon } from "@/components/ui/icons";

const initialState: EnquiryState = { status: "idle", message: "" };

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialState,
  );

  return (
    <div className="w-full max-w-xl">
      <form
        action={formAction}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-white/12 sm:p-1.5 sm:ring-1 sm:ring-white/30 sm:backdrop-blur"
      >
        <label htmlFor="enquiry-email" className="sr-only">
          Email address
        </label>
        <input
          id="enquiry-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-full bg-white/10 px-5 py-3.5 text-sm text-white ring-1 ring-white/25 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-white/60 sm:flex-1 sm:bg-transparent sm:ring-0 sm:focus:ring-0"
        />

        <label htmlFor="enquiry-destination" className="sr-only">
          Where would you like to go?
        </label>
        <input
          id="enquiry-destination"
          type="text"
          name="destination"
          placeholder="Where to?"
          className="w-full rounded-full bg-white/10 px-5 py-3.5 text-sm text-white ring-1 ring-white/25 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-white/60 sm:w-40 sm:bg-transparent sm:ring-0 sm:focus:ring-0"
        />

        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-800 transition-all hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending…" : "Start planning"}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <p
        aria-live="polite"
        className={`mt-4 min-h-5 text-sm ${
          state.status === "error" ? "text-sunset-200" : "text-brand-100"
        }`}
      >
        {state.message}
      </p>
    </div>
  );
}
