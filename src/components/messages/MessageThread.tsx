/**
 * Fil de discussion de la messagerie.
 * @module components/messages/MessageThread
 */
import type { MessagePreview } from "@/lib/messages-preview";

/** Propriétés de {@link MessageThread}. */
type Props = {
  /** Messages affichés avant le séparateur de date. */
  before: MessagePreview[];
  /** Texte du séparateur de date. */
  dateLabel: string;
  /** Messages affichés après le séparateur de date. */
  after: MessagePreview[];
};

/**
 * Bulle d'un message, alignée à droite pour les messages envoyés par l'utilisateur.
 *
 * @param props Propriétés du composant.
 * @param props.message Message à afficher.
 */
function Message({ message }: { message: MessagePreview }) {
  return (
    <li className={`flex items-start gap-2 ${message.fromMe ? "flex-row-reverse" : ""}`}>
      <span aria-hidden className="bg-muted/70 size-6 shrink-0 rounded-[4px]" />
      <div className={`flex max-w-[75%] flex-col gap-1 ${message.fromMe ? "items-end" : "items-start"}`}>
        <p className="text-muted text-[10px]">
          {message.author} <span aria-hidden>•</span> <time>{message.time}</time>
        </p>
        <p
          className={`rounded-[10px] px-3 py-2 text-xs leading-relaxed ${
            message.fromMe ? "bg-primary text-white" : "bg-surface border-line border"
          }`}
        >
          {message.text}
        </p>
      </div>
    </li>
  );
}

/** Affiche les messages d'une conversation, séparés par une date. */
export default function MessageThread({ before, dateLabel, after }: Props) {
  return (
    <ol aria-label="Messages de la conversation" className="flex flex-col gap-5 px-4 py-6 md:px-6">
      {before.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <li className="text-muted flex items-center gap-3 text-[10px]" aria-label={dateLabel}>
        <span aria-hidden className="bg-line h-px flex-1" />
        <span aria-hidden>{dateLabel}</span>
        <span aria-hidden className="bg-line h-px flex-1" />
      </li>
      {after.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ol>
  );
}
