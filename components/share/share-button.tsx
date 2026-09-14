"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ShareIcon } from "@/components/ui/icons";

/**
 * Share toggle for visitors, who can share a place but not save one. Opens the
 * device's share sheet where there is one (phones, Safari); elsewhere it copies
 * the link. `tone` follows the surface it sits on.
 */
export function ShareButton({
  path,
  name,
  text,
  tone = "light",
}: {
  /** Site-relative path of the page being shared. */
  path: string;
  name: string;
  text?: string;
  tone?: "light" | "overlay";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function share() {
    const url = new URL(path, window.location.origin).href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: name, text, url });
        return;
      } catch (error) {
        // Closing the sheet is a choice, not a failure worth a fallback.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; leave the link where it can be copied.
      window.prompt("Copy this link", url);
    }
  }

  const skin =
    tone === "overlay"
      ? copied
        ? "bg-white text-brand-700"
        : "bg-sand-900/55 text-white backdrop-blur-sm hover:bg-sand-900/75"
      : copied
        ? "bg-brand-600 text-white"
        : "text-sand-400 hover:bg-sand-100 hover:text-sand-700";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        share();
      }}
      aria-label={copied ? `Link to ${name} copied` : `Share ${name}`}
      title={copied ? "Link copied" : "Share"}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${skin}`}
    >
      {copied ? (
        <CheckIcon className="size-4.5" />
      ) : (
        <ShareIcon className="size-4.5" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
