"use client";

import { useActionState } from "react";
import Link from "next/link";
import { authInitialState, signIn } from "@/app/actions";
import { Field } from "@/components/auth/field";
import {
  ArrowRightIcon,
  LockIcon,
  MailIcon,
} from "@/components/ui/icons";
import { SubmitButton } from "@/components/auth/form-parts";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signIn,
    authInitialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      <Field
        label="Email"
        name="email"
        type="email"
        icon={MailIcon}
        placeholder="you@example.com"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email}
      />

      <div>
        <Field
          label="Password"
          name="password"
          type="password"
          icon={LockIcon}
          placeholder="Your password"
          autoComplete="current-password"
          error={state.errors?.password}
        />
        <div className="mt-2 flex justify-end">
          <Link
            href="#"
            className="text-xs font-semibold text-brand-700 hover:text-brand-800 hover:underline underline-offset-4"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <SubmitButton pending={pending} label="Log in" pendingLabel="Signing in…">
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </SubmitButton>

    </form>
  );
}
