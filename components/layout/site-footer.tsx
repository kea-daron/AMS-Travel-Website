import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { footerNav, site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Accessibility", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-white">
      <div className="page-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-600">
              {site.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-sand-600">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-brand-700"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {footerNav.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h3
                  id={`footer-${column.title}`}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-900"
                >
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-sand-600 transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-sand-200 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-sand-500">
            &copy; {new Date().getFullYear()} {site.name} B.V. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-sand-500 transition-colors hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-sand-200 text-sand-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon className="size-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
