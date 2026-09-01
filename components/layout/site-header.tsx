"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const solid = scrolled || menuOpen;

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
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 ${
                    solid
                      ? "text-sand-700 hover:text-brand-700"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors xl:inline-flex ${
              solid
                ? "text-sand-700 hover:bg-sand-100"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>

          <Link
            href="#contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 sm:inline-flex ${
              solid
                ? "bg-brand-600 text-white hover:bg-brand-700"
                : "bg-white text-brand-800 hover:bg-sand-100"
            }`}
          >
            Plan my trip
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
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-sand-200/70 py-3.5 text-base font-medium text-sand-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Plan my trip
          </Link>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-sand-600"
          >
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
