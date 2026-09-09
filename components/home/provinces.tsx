import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { provinces } from "@/lib/data";
import type { Province } from "@/lib/data";

export function Provinces() {
  return (
    <section id="provinces" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="All 25 provinces"
          title="Browse by Province"
          description="Every province in the country, with what it is best known for. Pick one to see its attraction sites, stays, food, water, activities and corridors."
          action={
            <Link
              href="/explore/provinces"
              className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              <MapPinIcon className="size-4" />
              Browse all 25 provinces
            </Link>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {provinces.map((province) => (
            <li key={province.slug}>
              <ProvinceTile province={province} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProvinceTile({ province }: { province: Province }) {
  return (
    <Link
      href="#"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-sand-50 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-md hover:shadow-sand-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-sand-200">
        <Image
          src={province.image}
          alt={province.alt}
          fill
          sizes="(min-width: 1280px) 12rem, (min-width: 640px) 20vw, 45vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-sand-900/10 transition-opacity group-hover:opacity-0" />
      </span>

      <span className="flex flex-1 flex-col p-4">
        <span className="flex items-start justify-between gap-2">
          <span className="font-display text-base leading-snug font-semibold text-sand-900">
            {province.name}
          </span>
          <ArrowRightIcon className="mt-0.5 size-3.5 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-1.5 block text-xs leading-relaxed text-sand-500">
          {province.highlight}
        </span>
      </span>
    </Link>
  );
}
