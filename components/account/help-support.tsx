import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MailIcon,
  SupportIcon,
} from "@/components/ui/icons";
import { site } from "@/lib/site";

/** Answers to what people actually ask on this site, in its own words. */
const FAQS = [
  {
    q: "How do I save a place?",
    a: "Tap the bookmark on any destination, stay or card. Saving needs an account, so you will be asked to log in first — and the place you tapped is saved as soon as you are back.",
  },
  {
    q: "Where do my saved places and reviews live?",
    a: "In this browser, for now. Accounts are not connected to a server yet, so your list, reviews, stamps and profile stay on the device you used. They will move to your account once sign-in is connected.",
  },
  {
    q: "How do badges work?",
    a: "Each badge has three tiers — Silver, Gold and Platinum. Browsing pages earns the Browser badge, reviews earn the Reviewer badge, and digital stamps earn the Adventure badge. Tap any badge to see what each tier takes.",
  },
  {
    q: "What is a digital stamp?",
    a: "A stamp is a mark that you have been somewhere. Every destination and stay page has a Collect stamp button; tap it again to remove one you added by mistake.",
  },
  {
    q: "How do I contact a hotel or homestay?",
    a: "Open the stay, then a room, and use the Contact the host card. Where the owner has given us their details, the phone, Telegram, Facebook and email buttons work; the rest show sample details until then.",
  },
  {
    q: "Something looks wrong on a page",
    a: "Tell us which page and what looked wrong, and we will check it. Opening hours, prices and road conditions change often, so reports like these are genuinely useful.",
  },
];

export function HelpSupport() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Help with AMS Travel")}`;

  return (
    <section className="rounded-3xl border border-sand-200 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <SupportIcon className="size-5.5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-sand-900">
            Help &amp; support
          </h2>
          <p className="mt-1 text-sm text-sand-500">
            Common questions, and how to reach us if the answer is not here.
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-sand-200 border-y border-sand-200">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-sm font-semibold text-sand-800 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDownIcon className="size-4 shrink-0 text-sand-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-sand-600">{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-sand-600">Still stuck? We answer within a working day.</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 btn-sweep rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            <MailIcon className="size-4" />
            Email us
          </a>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-sand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            Browse the guide
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
