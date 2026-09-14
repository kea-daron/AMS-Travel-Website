"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/actions";
import type { AuthState } from "@/app/actions";
import { startSession } from "@/lib/use-session";
import { Field } from "@/components/auth/field";
import {
  ArrowRightIcon,
  LockIcon,
  UserIcon,
} from "@/components/ui/icons";
import { SubmitButton } from "@/components/auth/form-parts";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    async (previous: AuthState, formData: FormData) => {
      const result = await signIn(previous, formData);
      if (result.status === "success") {
        startSession({ name: result.values?.username ?? "" }, next);
        router.replace(next ?? "/");
      }
      return result;
    },
    { status: "idle", message: "" } satisfies AuthState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      <Field
        label="Username or email"
        name="identifier"
        icon={UserIcon}
        placeholder="Your username or email"
        autoComplete="username"
        defaultValue={state.values?.identifier}
        error={state.errors?.identifier}
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
