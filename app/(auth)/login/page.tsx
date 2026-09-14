import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { registerHref, safeNext } from "@/lib/login-redirect";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your AMS Travel account to reach your saved places.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  // Where the traveller was when they tapped Save, so they can go straight back.
  const next = safeNext((await searchParams).next);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up your saved places, regions and corridors."
      footer={
        <>
          New here?{" "}
          <Link
            href={registerHref(next)}
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
