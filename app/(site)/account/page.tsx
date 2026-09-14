import type { Metadata } from "next";
import { AccountView } from "@/components/account/account-view";
import { provinces, tourismRegions } from "@/lib/data";
import { savablePlaces } from "@/lib/savable";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your AMS Travel profile, saved places and account details.",
};

export default function AccountPage() {
  return (
    <div className="page-x pt-32 pb-20 lg:pt-40 lg:pb-28">
      <AccountView
        places={savablePlaces()}
        regions={tourismRegions.map(({ slug, name }) => ({ slug, name }))}
        provinces={provinces.map((province) => province.name)}
      />
    </div>
  );
}
