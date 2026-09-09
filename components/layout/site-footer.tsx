import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100">
      <div className="page-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-600">
              {site.description}
            </p>
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

        <div className="mt-14 flex flex-col gap-3 border-t border-sand-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-sand-500">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-sm text-sand-500">
            Version 1.0 with our team development
          </p>
        </div>
      </div>
    </footer>
  );
}
