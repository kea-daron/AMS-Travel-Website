"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/** The minimum a pin needs; any richer record satisfies it. */
export type MapPin = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  /** When set, the pin is drawn as a numbered stop instead of a teardrop. */
  label?: string;
};

/** Roughly the centre of Cambodia, used for the default view. */
const CENTER: [number, number] = [12.5657, 104.991];
const DEFAULT_ZOOM = 7;
const FOCUS_ZOOM = 12;

/**
 * Leaflet's default marker points at PNGs that bundlers rewrite, so every pin
 * is a divIcon instead — no image assets, and it carries our own styles.
 */
function stopIcon(label: string, active: boolean) {
  const size = active ? 34 : 28;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:100%;height:100%;border-radius:9999px;box-sizing:border-box;
      background:${active ? "#c12938" : "#443c84"};color:#fff;
      border:2px solid #fff;
      box-shadow:0 3px 8px rgba(15,23,42,.45);
      font:700 ${active ? 14 : 12}px/1 system-ui,sans-serif;
    ">${label}</span>`,
  });
}

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
  center = CENTER,
  zoom = DEFAULT_ZOOM,
  legs,
  fitPins,
}: {
  destinations: MapPin[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  center?: [number, number];
  zoom?: number;
  /** Corridor legs — road geometry drawn solid, crossings dashed. */
  legs?: { mode: "road" | "direct"; coords: [number, number][] }[];
  /** Frame the pins on mount instead of using `center` and `zoom`. */
  fitPins?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const firstRunRef = useRef(true);
  const lastFlownRef = useRef<string | null>(null);
  const routeRef = useRef<L.LayerGroup | null>(null);

  // Create the map once, and tear it down completely on unmount.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const markers = markersRef.current;
    const map = L.map(container, {
      center,
      zoom,
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
    // Only the initial view; later changes move the map through flyTo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const pin = destinations.find((item) => item.slug === slug);
      marker.setIcon(
        pin?.label ? stopIcon(pin.label, active) : pinIcon(active),
      );
      marker.setZIndexOffset(active ? 1000 : 0);
    }
  }, [destinations, selectedSlug, onSelect]);

  // Draw the corridor: real road geometry solid, sea and mountain crossings
  // dashed, then frame the whole thing.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    routeRef.current?.remove();
    routeRef.current = null;

    if (!legs || legs.length === 0) return;

    const group = L.layerGroup().addTo(map);

    for (const leg of legs) {
      if (leg.coords.length < 2) continue;

      // A wider pale line under the route keeps it readable over map detail.
      L.polyline(leg.coords, {
        color: "#ffffff",
        weight: 8,
        opacity: 0.75,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(group);

      L.polyline(leg.coords, {
        color: leg.mode === "road" ? "#443c84" : "#c12938",
        weight: 4,
        opacity: 0.95,
        dashArray: leg.mode === "road" ? undefined : "2 10",
        lineJoin: "round",
        lineCap: "round",
      }).addTo(group);
    }

    routeRef.current = group;

    const bounds = L.latLngBounds(legs.flatMap((leg) => leg.coords));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
    }

    return () => {
      group.remove();
      routeRef.current = null;
    };
  }, [legs]);

  // Frame every pin, for views showing one province or area.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !fitPins || destinations.length === 0) return;

    const bounds = L.latLngBounds(
      destinations.map((item) => [item.lat, item.lng] as [number, number]),
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
    }
  }, [fitPins, destinations]);

  // Move the view whenever the selection changes, but not on first paint and
  // not when only the filtered list underneath it changed.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (firstRunRef.current) {
      firstRunRef.current = false;
      lastFlownRef.current = selectedSlug;
      if (!selectedSlug) return;
    }
    if (lastFlownRef.current === selectedSlug) return;
    lastFlownRef.current = selectedSlug;

    const target = destinations.find((item) => item.slug === selectedSlug);

    if (target) {
      map.flyTo([target.lat, target.lng], FOCUS_ZOOM, { duration: 1.1 });
    } else if (!routeRef.current && !fitPins) {
      map.flyTo(center, zoom, { duration: 0.8 });
    }
  }, [selectedSlug, destinations, center, zoom, fitPins]);

  return <div ref={containerRef} className="size-full" />;
}
