import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ClockIcon, MapPinIcon } from "@/components/ui/icons";
import { corridors } from "@/lib/data";

export default function ExploreCorridorsPage() {
  return (
    <>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand-600">
        Routes that string several provinces together in an order that actually
        works on the road, with rough durations rather than fixed departures.
      </p>

      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {corridors.map((corridor) => (
          <li key={corridor.slug}>
            <Link
              href="#"
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:flex-row"
            >
              <span className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-sand-200 sm:aspect-auto sm:w-56">
                <Image
                  src={corridor.image}
                  alt={corridor.alt}
                  fill
                  sizes="(min-width: 640px) 14rem, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </span>

              <span className="flex flex-1 flex-col p-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                  <ClockIcon className="size-3.5" />
                  {corridor.days}
                </span>

                <span className="mt-2 block font-display text-xl leading-snug font-semibold text-sand-900">
                  {corridor.name}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-sand-600">
                  {corridor.summary}
                </span>

                <span className="mt-4 flex flex-wrap items-center gap-1.5">
                  {corridor.provinces.map((province, index) => (
                    <span
                      key={province}
                      className="inline-flex items-center gap-1.5 text-xs text-sand-500"
                    >
                      {index === 0 ? (
                        <MapPinIcon className="size-3.5 text-sand-400" />
                      ) : (
                        <span aria-hidden="true" className="text-sand-300">
                          →
                        </span>
                      )}
                      {province}
                    </span>
                  ))}
                </span>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  View corridor
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
