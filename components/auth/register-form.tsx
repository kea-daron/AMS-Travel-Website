"use client";

import { useActionState } from "react";
import { authInitialState, signUp } from "@/app/actions";
import { Field } from "@/components/auth/field";
import {
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "@/components/ui/icons";
import { SubmitButton } from "@/components/auth/form-parts";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    signUp,
    authInitialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      <Field
        label="Username"
        name="username"
        icon={UserIcon}
        placeholder="sopheatraveller"
        autoComplete="username"
        defaultValue={state.values?.username}
        error={state.errors?.username}
        hint="3–24 characters — letters, numbers, dots or underscores."
      />

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

      <Field
        label="Password"
        name="password"
        type="password"
        icon={LockIcon}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={state.errors?.password}
        hint="At least 8 characters, with a letter and a number."
      />

      <Field
        label="Confirm password"
        name="confirmPassword"
        type="password"
        icon={LockIcon}
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={state.errors?.confirmPassword}
      />

      <SubmitButton
        pending={pending}
        label="Create account"
        pendingLabel="Creating account…"
      >
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </SubmitButton>

    </form>
  );
}
