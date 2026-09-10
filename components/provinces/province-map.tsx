"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
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

/** Every pinnable destination in one province, framed to fit. */
export function ProvinceMap({ pins }: { pins: MapPin[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = pins.find((pin) => pin.slug === selected);

  return (
    <div className="relative size-full">
      <MapCanvas
        destinations={pins}
        selectedSlug={selected}
        onSelect={setSelected}
        fitPins
      />

      {active ? (
        <p className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-sand-800 shadow-lg backdrop-blur-sm">
          {active.name}
        </p>
      ) : null}
    </div>
  );
}
