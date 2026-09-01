import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CompassIcon,
  ShieldIcon,
  SupportIcon,
  WalletIcon,
} from "@/components/ui/icons";
import { aboutImage, features } from "@/lib/data";
import type { Feature } from "@/lib/data";

const iconFor: Record<Feature["icon"], typeof CompassIcon> = {
  compass: CompassIcon,
  shield: ShieldIcon,
  wallet: WalletIcon,
  support: SupportIcon,
};

export function WhyUs() {
  return (
    <section id="why-us" className="page-x scroll-mt-24 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand-200">
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl shadow-sand-900/10 ring-1 ring-sand-900/5 sm:-right-6 sm:left-auto">
            <p className="font-display text-3xl font-semibold text-brand-700">
              17 years
            </p>
            <p className="mt-1 max-w-[13rem] text-sm text-sand-600">
              of routing trips, and still no call centre.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Why AMS Travel"
            title="A travel agency that answers the phone"
            description="We keep the company small on purpose: fewer trips, planned properly, by the people who will also pick up when something goes sideways at 3am local time."
          />

          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = iconFor[feature.icon];
              return (
                <li key={feature.title}>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon className="size-5.5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-sand-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-600">
                    {feature.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
