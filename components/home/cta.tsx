import Image from "next/image";
import { EnquiryForm } from "@/components/home/enquiry-form";
import { ctaImage } from "@/lib/data";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="page-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Image
            src={ctaImage.src}
            alt={ctaImage.alt}
            fill
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand-950/90 via-brand-950/70 to-brand-900/40" />

          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">
              Tailor-made trips
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl lg:text-5xl">
              Tell us roughly where and when. We&rsquo;ll handle the rest.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/75">
              Leave an email and a rough idea. A specialist replies within one
              working day with a draft itinerary and a full price — no deposit,
              no obligation.
            </p>

            <div className="mt-9">
              <EnquiryForm />
            </div>

            <p className="mt-6 text-sm text-white/55">
              Prefer to talk? Call{" "}
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="font-semibold text-white underline underline-offset-4"
              >
                {site.phone}
              </a>{" "}
              — 24 hours, every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
