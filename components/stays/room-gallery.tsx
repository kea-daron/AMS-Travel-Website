"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";

/** Tiles on the page before "+N": one large photo and four small ones. */
const TILES = 5;

/**
 * A room's photos: a mosaic on the page, and a full-screen viewer that opens
 * on whichever photo was tapped. The viewer is a native modal <dialog>, so it
 * traps focus and closes on Escape by itself.
 */
export function RoomGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const extra = images.length - TILES;

  function show(at: number) {
    setIndex(at);
    setOpen(true);
    dialog.current?.showModal();
  }

  const step = (by: number) =>
    setIndex((current) => (current + by + images.length) % images.length);

  // Keep the page behind the viewer from scrolling while it is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <div className="relative">
        <div className="grid h-72 grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl sm:h-96 lg:h-[30rem]">
          {images.slice(0, TILES).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => show(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
              className={`group relative overflow-hidden bg-sand-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white ${
                i === 0
                  ? "col-span-4 row-span-2 sm:col-span-2"
                  : "hidden sm:block"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "25vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-sand-900/0 transition-colors group-hover:bg-sand-900/10" />
              {i === TILES - 1 && extra > 0 ? (
                <span className="absolute inset-0 flex items-center justify-center bg-sand-900/55 text-2xl font-semibold text-white">
                  +{extra}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => show(0)}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-sand-900 shadow-lg shadow-sand-900/20 transition-colors hover:bg-sand-100"
        >
          <span aria-hidden="true" className="grid grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-1.5 rounded-[2px] bg-current" />
            ))}
          </span>
          Show all {images.length} photos
        </button>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label={`${title} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-sand-900 p-0 text-white backdrop:bg-sand-900/90"
      >
        {open ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold">
                {title}
                <span className="ml-3 font-normal text-white/60 tabular-nums">
                  {index + 1} / {images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close photos"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <div className="relative flex-1">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${title}, photo ${index + 1} of ${images.length}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sand-900 shadow-lg transition-colors hover:bg-white sm:left-6"
              >
                <ArrowRightIcon className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sand-900 shadow-lg transition-colors hover:bg-white sm:right-6"
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </div>

            {/* Centred when it fits, scrollable from the first photo when not. */}
            <div className="overflow-x-auto px-4 py-4">
              <ul className="mx-auto flex w-max gap-2">
                {images.map((src, i) => (
                  <li key={src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Photo ${i + 1}`}
                      aria-current={i === index ? "true" : undefined}
                      className={`relative block size-16 overflow-hidden rounded-lg transition-opacity sm:size-20 ${
                        i === index
                          ? "ring-2 ring-white"
                          : "opacity-50 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="5rem"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
