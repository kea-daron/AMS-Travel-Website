import Link from "next/link";
import { ArrowRightIcon, UserIcon } from "@/components/ui/icons";
import { loginHref, registerHref } from "@/lib/login-redirect";

/** Shown in place of a page that needs an account, with the way back after. */
export function LoginRequired({
  title,
  body,
  next,
}: {
  title: string;
  body: string;
  next: string;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-sand-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <UserIcon className="size-7" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold text-sand-900">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sand-600">
        {body}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={loginHref(next)}
          className="group inline-flex items-center gap-2 btn-sweep rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Log in
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href={registerHref(next)}
          className="inline-flex items-center rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
