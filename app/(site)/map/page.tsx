import { Suspense } from "react";
import type { Metadata } from "next";
import { MapExplorer } from "@/components/map/map-explorer";

export const metadata: Metadata = {
  title: "Map",
  description:
    "Every destination on this site pinned across Cambodia — search, filter and zoom to any of them.",
};

export default function MapPage() {
  return (
    <div className="pt-20">
      {/* MapExplorer reads ?place=, so it needs its own boundary. */}
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-5rem)] items-center justify-center bg-sand-100 text-sm text-sand-500">
            Loading map…
          </div>
        }
      >
        <MapExplorer />
      </Suspense>
    </div>
  );
}
