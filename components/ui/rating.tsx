import { StarIcon } from "@/components/ui/icons";

/** Star row with an accessible numeric label. */
export function Rating({
  value,
  count,
  className = "",
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon
            key={i}
            className={`size-3.5 ${
              i < Math.round(value) ? "text-sunset-400" : "text-current opacity-25"
            }`}
          />
        ))}
      </span>
      <span className="text-sm font-semibold">{value.toFixed(1)}</span>
      {count ? (
        <span className="text-sm font-normal opacity-70">({count})</span>
      ) : null}
      <span className="sr-only">
        Rated {value} out of 5{count ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}
