import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { BookmarkIcon, MapIcon, ShieldIcon } from "@/components/ui/icons";
import { authImage } from "@/lib/data";

const perks = [
  {
    Icon: BookmarkIcon,
    text: "Save any place, region or corridor to your own list.",
  },
  { Icon: MapIcon, text: "Take your saved map with you when the signal goes." },
  {
    Icon: ShieldIcon,
    text: "Get told when opening hours, fees or roads change.",
  },
];

/** Split layout shared by the sign-in and register pages. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative isolate hidden overflow-hidden bg-brand-950 lg:block">
          <Image
            src={authImage.src}
            alt={authImage.alt}
            fill
            sizes="50vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-brand-950/85 via-brand-950/65 to-brand-900/45" />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <Logo tone="light" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sunset-200">
                Cambodia
              </p>
              <p className="mt-4 max-w-md font-display text-3xl leading-snug font-semibold text-balance text-white xl:text-4xl">
                Keep the places you want to see in one list.
              </p>

              <ul className="mt-8 space-y-4">
                {perks.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white ring-1 ring-white/25">
                      <Icon className="size-4" />
                    </span>
                    <span className="max-w-sm text-sm leading-relaxed text-white/80">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} AMS Travel
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-16 sm:px-10">
          <div className="w-full max-w-md">
            <div className="lg:hidden">
              <Link href="/" aria-label="AMS Travel home">
                <Logo />
              </Link>
            </div>

            <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl lg:mt-0">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-sand-600">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>

            <div className="mt-8 border-t border-sand-200 pt-6 text-sm text-sand-600">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
