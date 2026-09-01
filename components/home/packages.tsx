import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { ArrowRightIcon, ClockIcon, UsersIcon } from "@/components/ui/icons";
import { packages } from "@/lib/data";
import type { Package } from "@/lib/data";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="Tour packages"
          title="Departures we'd book ourselves"
          description="Fixed departures with a named trip manager, capped group sizes and every transfer, permit and local tax already in the price."
          align="center"
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => (
            <PackageCard key={item.slug} item={item} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-sand-500">
          Nothing quite right?{" "}
          <Link
            href="#contact"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            Tell us what you had in mind
          </Link>{" "}
          and we&rsquo;ll build it around you.
        </p>
      </div>
    </section>
  );
}

function PackageCard({ item }: { item: Package }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-sand-50 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/5">
      <div className="relative aspect-[16/11] overflow-hidden bg-sand-200">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {item.badge ? (
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-brand-700 backdrop-blur-sm">
            {item.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {item.location}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-sand-900">
          {item.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-sand-600">
          {item.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sand-500">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-4 text-sand-400" />
            {item.days} days / {item.nights} nights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="size-4 text-sand-400" />
            {item.groupSize}
          </span>
        </div>

        <Rating
          value={item.rating}
          count={item.reviews}
          className="mt-4 text-sand-600"
        />

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-sand-200 pt-5">
          <p>
            <span className="block text-xs text-sand-500">
              from, per person
            </span>
            <span className="font-display text-2xl font-semibold text-sand-900">
              &euro;{item.price.toLocaleString("en-GB")}
            </span>
            {item.oldPrice ? (
              <span className="ml-2 text-sm text-sand-400 line-through">
                &euro;{item.oldPrice.toLocaleString("en-GB")}
              </span>
            ) : null}
          </p>

          <Link
            href="#contact"
            aria-label={`Enquire about ${item.title}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Enquire
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
