"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Regions", href: "/explore" },
  { label: "Interests", href: "/explore/interests" },
  { label: "Provinces", href: "/explore/provinces" },
  { label: "Corridors", href: "/explore/corridors" },
];

export function ExploreTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Explore" className="border-b border-sand-200">
      <ul className="-mb-px flex gap-6 overflow-x-auto sm:gap-8">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`block border-b-2 pb-3 text-base font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "border-sunset-500 text-sand-900"
                    : "border-transparent text-sand-500 hover:border-sand-300 hover:text-sand-800"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
