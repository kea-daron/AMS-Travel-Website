import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/home/search-bar";
import { ArrowRightIcon, MapIcon } from "@/components/ui/icons";
import { heroImage, stats } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Two overlays: a vertical wash for the header, a left wash for the copy. */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-950/65 via-brand-950/10 to-brand-950/85" />
      <div className="absolute inset-0 bg-linear-to-r from-brand-950/70 via-brand-950/5 to-transparent" />

      <div className="page-x relative pt-36 pb-16 sm:pt-44 lg:pt-52 lg:pb-24">
        <div className="max-w-3xl animate-rise">
          <span className="text-sm font-semibold tracking-[0.2em] text-sunset-200 uppercase">
            Cambodia
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
            Discover Cambodia&apos;s Hidden Gems
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/80">
            Ten tourism regions, twenty-five provinces, and curated corridors —
            with verified place details, maps, and trusted local contacts.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="btn-sweep group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg shadow-brand-950/30 transition-all hover:-translate-y-0.5"
            >
              Start exploring
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MapIcon className="size-4" />
              Open the map
            </Link>
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <SearchBar />
        </div>
      </div>

      <div className="page-x relative border-t border-white/15 py-8">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value}
                  <span className="text-brand-300">{stat.suffix}</span>
                </span>
                <span className="mt-1 block text-sm text-white/60">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
