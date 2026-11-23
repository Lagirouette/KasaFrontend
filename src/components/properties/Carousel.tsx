"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { getThumbnailIndexes, wrapIndex } from "@/lib/carousel";

type Props = {
  pictures: string[];
  title: string;
};

export default function Carousel({ pictures, title }: Props) {
  const [current, setCurrent] = useState(0);
  const count = pictures.length;

  if (count === 0) {
    return (
      <div className="bg-line text-muted flex aspect-[4/3] items-center justify-center rounded-[10px] text-sm">
        Aucune photo disponible
      </div>
    );
  }

  const hasMany = count > 1;
  const thumbnails = getThumbnailIndexes(count, current);
  const goTo = (index: number) => setCurrent(wrapIndex(index, count));

  const onKeyDown = (e: KeyboardEvent) => {
    if (!hasMany) return;
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  };

  return (
    <section
      aria-roledescription="carrousel"
      aria-label={`Photos de ${title}`}
      onKeyDown={onKeyDown}
      className={hasMany ? "grid gap-2 md:grid-cols-2" : ""}
    >
      <div
        className={`bg-line relative aspect-[4/3.6] overflow-hidden rounded-[10px] ${
          hasMany ? "md:aspect-[7/8]" : "md:aspect-[16/10]"
        }`}
      >
        {pictures.map((src, index) => {
          const isCurrent = index === current;
          return (
            <Image
              key={src + index}
              src={src}
              alt={isCurrent ? (hasMany ? `${title}, photo ${index + 1} sur ${count}` : title) : ""}
              aria-hidden={!isCurrent}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes={
                hasMany
                  ? "(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw"
                  : "(min-width: 1024px) 680px, 100vw"
              }
              className={`object-cover transition-opacity duration-300 ${isCurrent ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Photo précédente"
              className="bg-surface/90 hover:bg-surface absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full shadow"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Photo suivante"
              className="bg-surface/90 hover:bg-surface absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full shadow"
            >
              <ChevronRightIcon />
            </button>
            <p
              aria-live="polite"
              className="bg-dark/70 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs text-white"
            >
              {current + 1}/{count}
            </p>
          </>
        )}
      </div>

      {hasMany && (
        <ul aria-label="Autres photos" className="grid grid-cols-4 gap-2 md:grid-cols-2 md:grid-rows-2">
          {thumbnails.map((index) => (
            <li key={index} className="relative aspect-square md:aspect-auto">
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                className="bg-line relative block size-full overflow-hidden rounded-[10px] transition hover:opacity-80"
              >
                <Image src={pictures[index]} alt="" fill sizes="(min-width: 768px) 170px, 25vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
