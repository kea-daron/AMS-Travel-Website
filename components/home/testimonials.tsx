import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { QuoteIcon } from "@/components/ui/icons";
import { testimonials } from "@/lib/data";

/** Monogram avatar — avoids stock portraits standing in for real reviewers. */
function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-brand-950 py-20 lg:py-28">
      <div className="page-x">
        <SectionHeading
          eyebrow="Traveller reviews"
          title="The part of the trip nobody plans for"
          description="Anyone can sell a good week of weather. These are the reviews we care about — the ones written after something went wrong."
          align="center"
          tone="light"
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="flex flex-col rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/8"
            >
              <QuoteIcon className="size-8 text-brand-400/70" />
              <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-white/80">
                {testimonial.quote}
              </blockquote>
              <Rating
                value={testimonial.rating}
                className="mt-6 text-white/70"
              />
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-500/25 font-display text-sm font-semibold text-brand-100 ring-1 ring-brand-400/40"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {testimonial.name}
                  </span>
                  <span className="block text-xs text-white/55">
                    {testimonial.trip}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
