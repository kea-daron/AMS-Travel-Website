import { ProvinceTile } from "@/components/home/provinces";
import { provinces } from "@/lib/data";

export default function ExploreProvincesPage() {
  return (
    <>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand-600">
        All twenty-five provinces, with what each is best known for. Pick one to
        see its attraction sites, stays, food, water and activities.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {provinces.map((province) => (
          <li key={province.slug}>
            <ProvinceTile province={province} />
          </li>
        ))}
      </ul>
    </>
  );
}
