import Image from "next/image";
import { StarIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Host } from "@/types/api";

type Props = {
  host?: Host;
  rating: number | null;
};

export default function HostCard({ host, rating }: Props) {
  const hostName = host?.name ?? "Hôte Kasa";
  const messagesHref = host ? `/messages?hote=${host.id}` : "/messages";

  return (
    <Card as="aside" aria-labelledby="host-title">
      <h2 id="host-title" className="text-sm font-medium">
        Votre hôte
      </h2>

      <div className="mt-4 flex items-center gap-3">
        <div className="bg-line relative size-14 shrink-0 overflow-hidden rounded-[8px]">
          {host?.picture && <Image src={host.picture} alt="" fill sizes="56px" className="object-cover" />}
        </div>
        <p className="text-sm">{hostName}</p>
        {rating !== null && (
          <p className="bg-chip ml-auto flex items-center gap-1 rounded-[5px] px-2 py-1 text-xs">
            <StarIcon className="text-primary size-3.5" />
            <span className="sr-only">Note : </span>
            {Math.round(rating)}
            <span className="sr-only"> sur 5</span>
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <ButtonLink href={messagesHref} size="sm">
          Contacter l&apos;hôte <span className="sr-only">{hostName}</span>
        </ButtonLink>
        <ButtonLink href={messagesHref} size="sm">
          Envoyer un message <span className="sr-only">à {hostName}</span>
        </ButtonLink>
      </div>
    </Card>
  );
}
