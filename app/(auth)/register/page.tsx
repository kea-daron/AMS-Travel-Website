import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { loginHref, safeNext } from "@/lib/login-redirect";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create an AMS Travel account to save places across Cambodia and take them offline.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const next = safeNext((await searchParams).next);

  return (
    <AuthShell
      title="Create your account"
      subtitle="Save places as you browse, then take the list with you."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={loginHref(next)}
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm next={next} />
    </AuthShell>
  );
}
