import { RegionCard } from "@/components/home/regions";
import { tourismRegions } from "@/lib/data";

export default function ExploreRegionsPage() {
  return (
    <>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand-600">
        Nine themed regions spanning all twenty-five provinces. Start with the
        one that matches how you want to travel.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tourismRegions.map((region, index) => (
          <li key={region.slug}>
            <RegionCard region={region} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
}
