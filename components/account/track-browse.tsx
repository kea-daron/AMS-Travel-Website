"use client";

import { useEffect } from "react";
import { recordBrowse } from "@/lib/use-browsed";

/** Counts a page towards the Browser badge. Renders nothing. */
export function TrackBrowse({ id }: { id: string }) {
  useEffect(() => {
    recordBrowse(id);
  }, [id]);
  return null;
}
