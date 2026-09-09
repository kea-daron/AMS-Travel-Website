import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CityIcon,
  ColumnsIcon,
  LeafIcon,
  MuseumIcon,
  PalmIcon,
  TempleIcon,
  UtensilsIcon,
  WaterIcon,
} from "@/components/ui/icons";
import { interests } from "@/lib/data";
import type { Interest } from "@/lib/data";

const iconFor: Record<Interest["icon"], typeof CityIcon> = {
  city: CityIcon,
  temple: TempleIcon,
  columns: ColumnsIcon,
  museum: MuseumIcon,
  palm: PalmIcon,
  water: WaterIcon,
  utensils: UtensilsIcon,
  leaf: LeafIcon,
};

export default function ExploreInterestsPage() {
  return (
    <>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand-600">
        The same places, cut a different way. Follow one interest across every
        region and province at once.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {interests.map((interest) => {
          const Icon = iconFor[interest.icon];
          return (
            <li key={interest.slug}>
              <Link
                href="#"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-sand-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-sand-200">
                  <Image
                    src={interest.image}
                    alt={interest.alt}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-sand-900/45 to-transparent" />
                  <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-brand-700">
                    <Icon className="size-5" />
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-display text-base font-semibold text-sand-900">
                      {interest.name}
                    </span>
                    <ArrowRightIcon className="mt-1 size-3.5 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-sand-600">
                    {interest.blurb}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
