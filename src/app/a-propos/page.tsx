/**
 * Page « À propos » (`/a-propos`).
 * @module app/a-propos
 */
import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import PageHeading from "@/components/ui/PageHeading";
import { breadcrumbSchema } from "@/lib/structured-data";

/** Image principale de la page. */
const HERO_IMAGE = "/images/a-propos-maison-bois.webp";
/** Image de la section « Notre mission ». */
const MISSION_IMAGE = "/images/a-propos-chalet.webp";

/** Engagements listés dans la section « Notre mission ». */
const MISSION = [
  "Offrir une plateforme fiable et simple d'utilisation",
  "Proposer des hébergements variés et de qualité",
  "Favoriser des échanges humains et chaleureux entre hôtes et voyageurs",
];

/** Métadonnées SEO de la page. */
export const metadata: Metadata = {
  title: "À propos",
  description:
    "Kasa met en relation des voyageurs en quête d'authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.",
  alternates: { canonical: "/a-propos" },
  openGraph: { url: "/a-propos", images: [HERO_IMAGE] },
};

/** Présente Kasa, sa mission et ses engagements. */
export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[508px] px-4 pt-8 pb-16 md:max-w-[1147px] md:pt-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ])}
      />

      <PageHeading title="À propos">
        <p>Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
        <p>
          Depuis notre création, nous mettons en relation des voyageurs en quête d&apos;authenticité avec des hôtes
          passionnés qui aiment partager leur région et leurs bonnes adresses.
        </p>
      </PageHeading>

      <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[20px] md:aspect-[1115/458]">
        <Image
          src={HERO_IMAGE}
          alt="Maison en bois entourée d'arbres, éclairée par le soleil couchant"
          fill
          preload
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1147px) 1115px, calc(100vw - 32px)"
          className="object-cover"
        />
      </div>

      <section
        aria-labelledby="mission-title"
        className="mt-8 grid items-center gap-6 md:mt-6 md:grid-cols-2 md:gap-x-6 md:gap-y-4"
      >
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <h2 id="mission-title" className="text-primary text-sm font-bold">
            Notre mission est simple :
          </h2>
          <ol className="mt-4 list-inside list-decimal space-y-3 text-xs">
            {MISSION.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] md:col-start-2 md:row-span-2 md:row-start-1 md:aspect-[27/25]">
          <Image
            src={MISSION_IMAGE}
            alt="Chalet en bois avec une grande baie vitrée, éclairé à la tombée de la nuit"
            fill
            sizes="(min-width: 1147px) 545px, (min-width: 768px) 50vw, calc(100vw - 32px)"
            className="object-cover"
          />
        </div>

        <p className="text-primary text-sm leading-relaxed md:col-start-1 md:row-start-2 md:self-start">
          Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne,
          Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.
        </p>
      </section>
    </div>
  );
}
