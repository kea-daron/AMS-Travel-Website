"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { CloseIcon, MenuIcon, UserIcon } from "@/components/ui/icons";
import { languages, mainNav, type LanguageCode } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<LanguageCode>("en");
  const pathname = usePathname();

  // Only the homepage has a dark hero for the header to float over; everywhere
  // else it needs its own background or the white text lands on a light page.
  const overHero = pathname === "/";

  // "/" matches only itself; the others also own their sub-routes, so
  // /explore/provinces still lights up Explore.
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // The header floats over the hero image until the page scrolls past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't leave the panel hanging open when the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = !overHero || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="page-x flex h-20 items-center justify-between gap-6">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors after:absolute after:inset-x-4 after:bottom-1 after:origin-left after:bg-current after:transition-transform ${
                      active
                        ? "font-semibold after:h-0.5 after:scale-x-100"
                        : "font-medium after:h-px after:scale-x-0 hover:after:scale-x-100"
                    } ${
                      active
                        ? solid
                          ? "text-brand-700 after:bg-sunset-500"
                          : "text-white after:bg-sunset-400"
                        : solid
                          ? "text-sand-700 hover:text-brand-700"
                          : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className={`hidden h-11 w-28 items-center rounded-full p-1 transition-colors sm:inline-flex ${
              solid ? "bg-sand-100" : "bg-white/15"
            }`}
          >
            {languages.map((language) => {
              const active = language.code === lang;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setLang(language.code)}
                  aria-pressed={active}
                  title={language.label}
                  className={`inline-flex h-9 flex-1 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    active
                      ? solid
                        ? "bg-white text-brand-700 shadow-sm"
                        : "bg-white text-brand-800"
                      : solid
                        ? "text-sand-600 hover:text-sand-900"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {language.short}
                </button>
              );
            })}
          </div>

          <Link
            href="/login"
            className={`hidden h-11 w-36 items-center justify-center gap-2 rounded-full text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 sm:inline-flex ${
              solid
                ? "btn-sweep"
                : "bg-white text-brand-800 hover:bg-sand-100"
            }`}
          >
            <UserIcon className="size-4" />
            Log in
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              solid
                ? "text-sand-800 hover:bg-sand-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-sand-200 bg-sand-50 lg:hidden"
      >
        <nav aria-label="Mobile" className="page-x py-5">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-sand-200/70 py-3.5 text-base ${
                      active
                        ? "font-semibold text-brand-700"
                        : "font-medium text-sand-800"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-sunset-500"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            role="group"
            aria-label="Language"
            className="mt-5 flex items-center rounded-full bg-sand-100 p-1"
          >
            {languages.map((language) => {
              const active = language.code === lang;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setLang(language.code)}
                  aria-pressed={active}
                  className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-sand-600"
                  }`}
                >
                  {language.label}
                </button>
              );
            })}
          </div>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 btn-sweep rounded-full px-5 py-3 text-sm font-semibold"
          >
            <UserIcon className="size-4" />
            Log in
          </Link>
        </nav>
      </div>
    </header>
  );
}
