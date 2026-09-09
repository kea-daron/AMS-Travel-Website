import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ExploreTabs } from "@/components/explore/explore-tabs";

export const metadata: Metadata = {
  title: "Explore Cambodia",
  description:
    "Browse Cambodia by tourism region, interest, province and curated corridor.",
};

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-x pt-32 pb-20 lg:pt-40 lg:pb-28">
      <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight text-sand-900 sm:text-5xl">
        Explore Cambodia
      </h1>

      <div className="mt-10">
        <ExploreTabs />
      </div>

      {children}
    </div>
  );
}
