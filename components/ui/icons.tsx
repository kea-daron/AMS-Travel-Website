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
