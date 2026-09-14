import type { ReactNode } from "react";
import {
  ClockIcon,
  FacebookIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  TelegramIcon,
} from "@/components/ui/icons";
import type { StayContact } from "@/lib/contacts";

/**
 * How to reach the stay's owner. With `sample`, the details are placeholders:
 * they are shown so the layout can be reviewed, but nothing links anywhere.
 */
export function ContactCard({
  contact,
  sample,
  stayName,
  roomName,
}: {
  contact: StayContact;
  sample: boolean;
  stayName: string;
  roomName?: string;
}) {
  const subject = roomName ? `Enquiry: ${roomName} — ${stayName}` : `Enquiry: ${stayName}`;
  const body = `Hello,\n\nI found ${stayName} on AMS Travel and would like to ask about ${
    roomName ? `the ${roomName}` : "a room"
  }.\n\nDates:\nGuests:\n\nThank you.`;
  const mailto = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : undefined;
  const tel = contact.phone ? `tel:${contact.phone.replace(/[^+\d]/g, "")}` : undefined;

  const channels: { icon: ReactNode; label: string; value: string; href?: string; action: string }[] = [];
  if (contact.phone) {
    channels.push({ icon: <PhoneIcon className="size-4.5" />, label: "Phone", value: contact.phone, href: tel, action: "Call" });
  }
  if (contact.telegram) {
    channels.push({ icon: <TelegramIcon className="size-4.5" />, label: "Telegram", value: `@${contact.telegram}`, href: `https://t.me/${contact.telegram}`, action: "Message" });
  }
  if (contact.facebook) {
    channels.push({ icon: <FacebookIcon className="size-4.5" />, label: "Facebook", value: `fb.com/${contact.facebook}`, href: `https://m.me/${contact.facebook}`, action: "Message" });
  }
  if (contact.email) {
    channels.push({ icon: <MailIcon className="size-4.5" />, label: "Email", value: contact.email, href: mailto, action: "Write" });
  }
  if (contact.website) {
    channels.push({ icon: <GlobeIcon className="size-4.5" />, label: "Website", value: contact.website.replace(/^https?:\/\//, ""), href: contact.website, action: "Visit" });
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="rounded-3xl border border-sand-200 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="contact-heading" className="font-display text-xl font-semibold text-sand-900">
            Contact the host
          </h2>
          <p className="mt-1 text-sm text-sand-600">
            {contact.name} · {stayName}
          </p>
        </div>
        {sample ? (
          <span className="shrink-0 rounded-full bg-sunset-50 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-sunset-700">
            Sample
          </span>
        ) : null}
      </div>

      {contact.hours || contact.languages?.length ? (
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sand-500">
          {contact.hours ? (
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" />
              {contact.hours}
            </span>
          ) : null}
          {contact.languages?.length ? <span>Speaks {contact.languages.join(" & ")}</span> : null}
        </p>
      ) : null}

      <ul className="mt-4 divide-y divide-sand-200 border-t border-sand-200">
        {channels.map((channel) => (
          <li key={channel.label} className="flex items-center gap-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              {channel.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-sand-500">{channel.label}</span>
              <span className="block truncate text-sm font-semibold text-sand-900">
                {channel.value}
              </span>
            </span>
            {sample || !channel.href ? (
              <span
                aria-disabled="true"
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-sand-300"
              >
                {channel.action}
              </span>
            ) : (
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shrink-0 rounded-full border border-sand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                {channel.action}
              </a>
            )}
          </li>
        ))}
      </ul>

      {sample ? (
        <p className="mt-2 rounded-xl bg-sunset-50/60 px-3.5 py-2.5 text-xs leading-relaxed text-sunset-800">
          Sample details — the buttons switch on once the owner&apos;s real
          contact details are added.
        </p>
      ) : (
        <p className="mt-2 text-xs text-sand-500">
          Mention AMS Travel when you get in touch.
        </p>
      )}
    </section>
  );
}
