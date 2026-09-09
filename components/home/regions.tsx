import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ArrowRightIcon,
  CompassIcon,
  DiamondIcon,
  LeafIcon,
  MoonIcon,
  MountainIcon,
  PalmIcon,
  TempleIcon,
  UtensilsIcon,
  WaterIcon,
} from "@/components/ui/icons";
import { tourismRegions } from "@/lib/data";
import type { TourismRegion } from "@/lib/data";

const iconFor: Record<TourismRegion["icon"], typeof CompassIcon> = {
  temple: TempleIcon,
  compass: CompassIcon,
  water: WaterIcon,
  mountain: MountainIcon,
  palm: PalmIcon,
  moon: MoonIcon,
  utensils: UtensilsIcon,
  leaf: LeafIcon,
  diamond: DiamondIcon,
};

export function Regions() {
  return (
    <section id="regions" className="page-x scroll-mt-24 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Discover"
        title="Explore by Tourism Regions"
        description="Nine themed regions spanning all twenty-five provinces. Start with the one that matches how you want to travel, then drill down into provinces, sites and corridors."
        action={
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            Browse all 9 regions
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tourismRegions.map((region, index) => (
          <li key={region.slug}>
            <RegionCard region={region} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RegionCard({
  region,
  index,
}: {
  region: TourismRegion;
  index: number;
}) {
  const Icon = iconFor[region.icon];

  return (
    <Link
      href={`/regions/${region.slug}`}
      className="group relative isolate flex h-80 flex-col justify-end overflow-hidden rounded-3xl bg-sand-200 p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <Image
        src={region.image}
        alt={region.alt}
        fill
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-sand-900/92 via-sand-900/55 to-sand-900/15" />

      <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-brand-700">
          <Icon className="size-6" />
        </span>
        <span className="font-display text-sm font-semibold text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-display text-xl leading-snug font-semibold text-balance text-white">
        {region.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">
        {region.blurb}
      </p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
        Explore region
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
