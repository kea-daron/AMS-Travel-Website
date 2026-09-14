"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { MapPin } from "@/components/map/map-canvas";

const MapCanvas = dynamic(
  () => import("@/components/map/map-canvas").then((m) => m.MapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center bg-sand-100 text-sm text-sand-500">
        Loading map…
      </div>
    ),
  },
);

/**
 * Every step of a region's timeline as a numbered pin, the current one
 * highlighted. Tapping another number opens that step's page.
 */
export function CoverageMap({
  regionSlug,
  pins,
  current,
}: {
  regionSlug: string;
  /** `slug` is the step's URL segment, `label` its number. */
  pins: MapPin[];
  current: string;
}) {
  const router = useRouter();
  const onSelect = useCallback(
    (slug: string) => {
      if (slug !== current) router.push(`/regions/${regionSlug}/stories/${slug}`);
    },
    [router, regionSlug, current],
  );

  return (
    <MapCanvas
      destinations={pins}
      selectedSlug={current}
      onSelect={onSelect}
      fitPins
    />
  );
}
