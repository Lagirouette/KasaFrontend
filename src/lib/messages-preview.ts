export type ConversationPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

export type MessagePreview = {
  id: string;
  fromMe: boolean;
  author: string;
  time: string;
  text: string;
};

const SAMPLE = "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?";

export const CONVERSATIONS: ConversationPreview[] = Array.from({ length: 8 }, (_, index) => ({
  id: `conversation-${index + 1}`,
  name: "Utilisateur",
  lastMessage: SAMPLE,
  time: "11:04",
  unread: index > 0 && index < 3,
}));

export const MESSAGES_BEFORE: MessagePreview[] = [
  { id: "m1", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m2", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m3", fromMe: true, author: "Vous", time: "11:04", text: SAMPLE },
];

export const MESSAGES_AFTER: MessagePreview[] = [
  { id: "m4", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
  { id: "m5", fromMe: true, author: "Vous", time: "11:04", text: SAMPLE },
  { id: "m6", fromMe: false, author: "Utilisateur", time: "11:04", text: SAMPLE },
];
