import type { ReactNode } from "react";

/** Sign-in and register stand alone — no site header, no footer. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
