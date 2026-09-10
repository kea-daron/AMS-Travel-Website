import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { DestinationCard } from "@/components/regions/destination-card";
import { recommendedPicks } from "@/lib/data";
import { getRegionDestination } from "@/lib/regions";

export function Recommended() {
  return (
    <section id="recommended" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="Handpicked"
          title="Recommended"
          description="Six places we send first-time visitors — temples and floating villages, islands and pepper farms, the capital after dark and the eastern highlands."
          align="center"
        />

        <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {recommendedPicks.map((pick) => {
            const found = getRegionDestination(pick.region, pick.place);
            // Skip a pick whose destination has been renamed or removed.
            if (!found) return null;

            return (
              <li key={`${pick.region}/${pick.place}`}>
                <DestinationCard
                  destination={found.destination}
                  regionSlug={pick.region}
                  badge={pick.badge}
                  rating={pick.rating}
                  footnote={`Best time to go · ${pick.bestTime}`}
                />
              </li>
            );
          })}
        </ul>

        <p className="mt-12 text-center text-sm text-sand-500">
          Want more than six?{" "}
          <Link
            href="/explore"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            Explore all nine tourism regions
          </Link>{" "}
          across twenty-five provinces.
        </p>
      </div>
    </section>
  );
}
