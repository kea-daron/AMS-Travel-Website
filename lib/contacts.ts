/**
 * How to reach each stay's owner or host, keyed `region/slug`.
 *
 * TODO: fill in the real details each owner gives you (or load them from the
 * API). A stay listed here gets a live contact card; any stay not listed shows
 * a sample card with its buttons switched off, so nobody is sent to a number
 * or account that isn't the owner's.
 */
export type StayContact = {
  /** Who answers, e.g. "Front desk" or "Community tourism office". */
  name: string;
  /** In international format, e.g. "+855 23 123 456". */
  phone?: string;
  /** Telegram username, without the @. */
  telegram?: string;
  /** Facebook page name — the part after facebook.com/. */
  facebook?: string;
  email?: string;
  website?: string;
  hours?: string;
  languages?: string[];
};

export const contacts: Record<string, StayContact> = {
  // "luxury/pp-riverside-hotels": {
  //   name: "Front desk",
  //   phone: "+855 …",
  //   telegram: "…",
  //   facebook: "…",
  //   email: "…",
  //   hours: "24 hours",
  //   languages: ["Khmer", "English"],
  // },
};

/** Who picks up at each kind of stay, for the sample card. */
const SAMPLE_NAME: Record<string, string> = {
  "Hotel & villas": "Front desk",
  "Island retreat": "Reservations team",
  Homestay: "Community tourism office",
  "Eco lodge": "Lodge office",
  Camping: "Park office",
};

export function contactFor(stayKey: string, stayType: string) {
  const real = contacts[stayKey];
  if (real) return { contact: real, sample: false };

  return {
    sample: true,
    contact: {
      name: SAMPLE_NAME[stayType] ?? "Host",
      phone: "+855 00 000 000",
      telegram: "owner_username",
      facebook: "owner-page",
      email: "owner@example.com",
      hours: "8 am – 8 pm, Cambodia time",
      languages: ["Khmer", "English"],
    } satisfies StayContact,
  };
}
