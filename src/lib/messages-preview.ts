/**
 * Données de démonstration du squelette de la messagerie, en attendant une API de messages.
 * @module lib/messages-preview
 */
/** Aperçu d'une conversation dans la liste. */
export type ConversationPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

/** Message affiché dans le fil de discussion. */
export type MessagePreview = {
  id: string;
  fromMe: boolean;
  author: string;
  time: string;
  text: string;
};

/** Texte d'exemple utilisé pour tous les messages. */
const SAMPLE = "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?";

/** Conversations de démonstration. */
export const CONVERSATIONS: ConversationPreview[] = Array.from({ length: 8 }, (_, index) => ({
  id: `conversation-${index + 1}`,
  name: "Utilisateur",
  lastMessage: SAMPLE,
  time: "11:04",
  unread: index > 0 && index < 3,
}));

/** Messages affichés avant le séparateur de date. */
export const MESSAGES_BEFORE: MessagePreview[] = [
  { id: "m1", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m2", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m3", fromMe: true, author: "Vous", time: "11:04", text: SAMPLE },
];

/** Messages affichés après le séparateur de date. */
export const MESSAGES_AFTER: MessagePreview[] = [
  { id: "m4", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m5", fromMe: true, author: "Vous", time: "11:04", text: SAMPLE },
  { id: "m6", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
];
