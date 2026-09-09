"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { mapDestinations } from "@/lib/data";
import type { MapDestination } from "@/lib/data";
import "leaflet/dist/leaflet.css";

/** Roughly the centre of Cambodia, used for the default view. */
const CENTER: [number, number] = [12.5657, 104.991];
const DEFAULT_ZOOM = 7;
const FOCUS_ZOOM = 12;

/**
 * Leaflet's default marker points at PNGs that bundlers rewrite, so every pin
 * is a divIcon instead — no image assets, and it carries our own styles.
 */
function pinIcon(active: boolean) {
  const size = active ? 38 : 28;
  const fill = active ? "#443c84" : "#ffffff";
  const line = active ? "#ffffff" : "#443c84";

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    // Anchored at the point of the teardrop, not its centre.
    iconAnchor: [size / 2, size],
    html: `<svg viewBox="0 0 24 24" width="${size}" height="${size}"
      fill="${fill}" stroke="${line}" stroke-width="1.6"
      stroke-linecap="round" stroke-linejoin="round"
      style="filter:drop-shadow(0 3px 6px rgba(15,23,42,.4));display:block">
      <path d="M12 21.5s7-6.4 7-11.5a7 7 0 1 0-14 0c0 5.1 7 11.5 7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" fill="${line}" stroke="none" />
    </svg>`,
  });
}

/**
 * Leaflet is driven imperatively rather than through react-leaflet: React's
 * development double-mount tears the map down between render and effect, which
 * left child layers attaching to a map that no longer had panes.
 */
export function MapCanvas({
  destinations,
  selectedSlug,
  onSelect,
}: {
  destinations: MapDestination[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const firstRunRef = useRef(true);

  // Create the map once, and tear it down completely on unmount.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const markers = markersRef.current;
    const map = L.map(container, {
      center: CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 6,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // The map lives in a grid cell, so it can be sized after Leaflet measures.
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  // Add, remove and restyle pins as the filtered list or selection changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers = markersRef.current;
    const wanted = new Set(destinations.map((item) => item.slug));

    for (const [slug, marker] of markers) {
      if (!wanted.has(slug)) {
        marker.remove();
        markers.delete(slug);
      }
    }

    for (const destination of destinations) {
      if (markers.has(destination.slug)) continue;

      const marker = L.marker([destination.lat, destination.lng], {
        alt: destination.name,
        title: destination.name,
      })
        .addTo(map)
        .on("click", () => onSelect(destination.slug));

      markers.set(destination.slug, marker);
    }

    for (const [slug, marker] of markers) {
      const active = slug === selectedSlug;
      marker.setIcon(pinIcon(active));
      marker.setZIndexOffset(active ? 1000 : 0);
    }
  }, [destinations, selectedSlug, onSelect]);

  // Move the view whenever the selection changes, but not on first paint.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (firstRunRef.current) {
      firstRunRef.current = false;
      if (!selectedSlug) return;
    }

    const target = mapDestinations.find((item) => item.slug === selectedSlug);

    if (target) {
      map.flyTo([target.lat, target.lng], FOCUS_ZOOM, { duration: 1.1 });
    } else {
      map.flyTo(CENTER, DEFAULT_ZOOM, { duration: 0.8 });
    }
  }, [selectedSlug]);

  return <div ref={containerRef} className="size-full" />;
}
