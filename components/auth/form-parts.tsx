import type { ReactNode } from "react";

/** Full-width primary submit shared by both auth forms. */
export function SubmitButton({
  pending,
  label,
  pendingLabel,
  children,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 btn-sweep rounded-xl px-6 py-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
      {pending ? null : children}
    </button>
  );
}
