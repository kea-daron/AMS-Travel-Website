import type { Metadata } from "next";
import { SavedList } from "@/components/saved/saved-list";

export const metadata: Metadata = {
  title: "Saved",
  description: "The places you have saved across Cambodia, kept in one list.",
};

export default function SavedPage() {
  return (
    <div className="page-x pt-32 pb-20 lg:pt-40 lg:pb-28">
      <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight text-sand-900 sm:text-5xl">
        Saved places
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand-600">
        Everything you have bookmarked, ready to turn into a route.
      </p>

      <SavedList />
    </div>
  );
}
