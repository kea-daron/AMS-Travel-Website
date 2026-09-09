import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared outline-icon wrapper: 24px grid, currentColor, 1.6 stroke. */
function Outline({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 21.5s7-6.4 7-11.5a7 7 0 1 0-14 0c0 5.1 7 11.5 7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Outline>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.75h17M8.25 3v4M15.75 3v4" />
    </Outline>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M3.5 20.5a6.5 6.5 0 0 1 13 0M16.5 5.6a3.5 3.5 0 0 1 0 6.8M18 14.6a6.5 6.5 0 0 1 3.5 5.9" />
    </Outline>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m15.75 15.75 4.5 4.5" />
    </Outline>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Outline>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Outline>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z" />
    </Outline>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 21.2c4-1.7 7-5.4 7-9.9V5.9l-7-2.9-7 2.9v5.4c0 4.5 3 8.2 7 9.9Z" />
      <path d="m9 11.8 2.2 2.2L15.4 9.8" />
    </Outline>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3.5 8.25A2.75 2.75 0 0 1 6.25 5.5h11A2.25 2.25 0 0 1 19.5 7.75v.5" />
      <rect x="3.5" y="8.25" width="17" height="11.25" rx="2.5" />
      <circle cx="16" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </Outline>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3" />
      <path d="M4.5 13.5h1.75a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1ZM19.5 13.5h-1.75a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1H19.5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z" />
      <path d="M19.5 18.5v.5a2.5 2.5 0 0 1-2.5 2.5h-2.25" />
    </Outline>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6.4 3.5h2.1l1.6 4-2 1.2a11.5 11.5 0 0 0 5.2 5.2l1.2-2 4 1.6v2.1a2.4 2.4 0 0 1-2.7 2.4A15.6 15.6 0 0 1 4 6.2 2.4 2.4 0 0 1 6.4 3.5Z" />
    </Outline>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 8 6.6 4.4a1.6 1.6 0 0 0 1.8 0L19.5 8" />
    </Outline>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3.5 5.5h17l-6.6 7.6v5.6l-3.8 2v-7.6L3.5 5.5Z" />
    </Outline>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M14 4.5h5.5V10" />
      <path d="M19.5 4.5 11 13" />
      <path d="M19 14v4.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.5" />
    </Outline>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </Outline>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M2.5 12S6.1 5.5 12 5.5 21.5 12 21.5 12 17.9 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Outline>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m4 4 16 16" />
      <path d="M9.9 5.8A9.9 9.9 0 0 1 12 5.5c5.9 0 9.5 6.5 9.5 6.5a17.6 17.6 0 0 1-2.5 3.4M6.6 7.4A17.4 17.4 0 0 0 2.5 12S6.1 18.5 12 18.5c1.3 0 2.6-.3 3.7-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </Outline>
  );
}

export function CityIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3.5 20.5V11l5-3v12.5M8.5 20.5V6l6-3v17.5M14.5 20.5V10l6 3v7.5M2.5 20.5h19" />
      <path d="M11 8.5v.01M11 12v.01M11 15.5v.01" />
    </Outline>
  );
}

export function ColumnsIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 8.5h16L12 3.5 4 8.5Z" />
      <path d="M6.5 8.5V16M12 8.5v9M17.5 8.5V13" />
      <path d="M3.5 20.5h17" />
    </Outline>
  );
}

export function MuseumIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3 9.5h18L12 4 3 9.5Z" />
      <path d="M6 9.5v8M10 9.5v8M14 9.5v8M18 9.5v8M3.5 17.5h17M2.5 20.5h19" />
    </Outline>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m3.5 16.5 6-6 3.5 3.5 7.5-7.5" />
      <path d="M15 6.5h5.5V12" />
    </Outline>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4.2-6.5 4.2v-16a1 1 0 0 1 1-1Z" />
    </Outline>
  );
}

export function TempleIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 3 4 8h16l-8-5Z" />
      <path d="M6.5 8v8.5M12 8v8.5M17.5 8v8.5M3.5 16.5h17M2.5 20.5h19" />
    </Outline>
  );
}

export function MountainIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M2.5 19.5h19L14 6.5l-4.2 7.3-2.1-2.4-5.2 8.1Z" />
      <path d="m11.6 11.2 2.4-1.4 2.4 1.4" />
    </Outline>
  );
}

export function WaterIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M2.5 8c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 5.5 0" />
      <path d="M2.5 13c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 5.5 0" />
      <path d="M2.5 18c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 5.5 0" />
    </Outline>
  );
}

export function PalmIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M13.4 10.2C12.3 13.6 12 17.3 12 21" />
      <path d="M13.4 10.2c-2.4-2.6-5.9-2.9-8.6-.7M13.4 10.2c.6-3.5 3.4-5.6 6.9-5M13.4 10.2c3 .1 5.2 2 6 5" />
      <path d="M6.5 21h11" />
    </Outline>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M20.5 15.2A8.6 8.6 0 0 1 9.3 4a8.6 8.6 0 1 0 11.2 11.2Z" />
    </Outline>
  );
}

export function UtensilsIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M7 3v18M4.4 3v5.2a2.6 2.6 0 0 0 5.2 0V3" />
      <path d="M17 21v-6.6c2 0 3.2-1.2 3.2-4.4C20.2 6.5 19 3 17 3s-3.2 3.5-3.2 7c0 3.2 1.2 4.4 3.2 4.4Z" />
    </Outline>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M20.5 3.5c.6 8.6-4.4 14.2-10.4 14.2a5.6 5.6 0 0 1-5.6-5.6C4.5 6.6 12 3 20.5 3.5Z" />
      <path d="M4 20.5c1.6-5.6 5.6-9.7 10.6-12.2" />
    </Outline>
  );
}

export function DiamondIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6.2 3.5h11.6l3.7 6L12 20.5 2.5 9.5l3.7-6Z" />
      <path d="M2.5 9.5h19M9.2 3.5 6.8 9.5 12 20.5M14.8 3.5l2.4 6L12 20.5" />
    </Outline>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M9 4.5 3.5 6.75v12.75L9 17.25l6 2.25 5.5-2.25V4.5L15 6.75 9 4.5Z" />
      <path d="M9 4.5v12.75M15 6.75V19.5" />
    </Outline>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </Outline>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="8.25" r="3.75" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </Outline>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Outline>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Outline>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3 13.2 21 4l-5.2 17-3.4-6.4-2.6 3.7-.6-4.4L3 13.2Z" />
    </Outline>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M9.4 5.5C6.2 7 4.2 9.9 4.2 13.4c0 3.1 1.9 5.1 4.4 5.1 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.4-3.5-.4 0-.8 0-1.1.2.4-1.7 1.7-3.2 3.5-4.1l-2.1-1.9Zm10 0C16.2 7 14.2 9.9 14.2 13.4c0 3.1 1.9 5.1 4.4 5.1 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.4-3.5-.4 0-.8 0-1.1.2.4-1.7 1.7-3.2 3.5-4.1l-2.1-1.9Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.6 2.9 5.9 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.6Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.6V4.4A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </Outline>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-4.4-5.7L5.7 21H2.4l7.7-8.8L2.6 3h6.8l4 5.3L17.2 3Zm-1.2 16h1.8L8.1 4.9H6.1L16 19Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.6a2.6 2.6 0 0 0-1.8-1.8C18.2 5.3 12 5.3 12 5.3s-6.2 0-7.8.5A2.6 2.6 0 0 0 2.4 7.6 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.4 2.6 2.6 0 0 0 1.8 1.8c1.6.5 7.8.5 7.8.5s6.2 0 7.8-.5a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.4ZM10.1 15V9l5.1 3-5.1 3Z" />
    </svg>
  );
}
