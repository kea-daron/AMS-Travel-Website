"use client";

import dynamic from "next/dynamic";

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

/** Stable identity so the canvas does not resync its markers each render. */
const noop = () => {};

export function PlaceMap({
  slug,
  name,
  lat,
  lng,
}: {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}) {
  return (
    <MapCanvas
      destinations={[{ slug, name, lat, lng }]}
      selectedSlug={slug}
      onSelect={noop}
      center={[lat, lng]}
      zoom={12}
    />
  );
}
