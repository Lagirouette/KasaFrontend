import type { Metadata } from "next";
import ConversationList from "@/components/messages/ConversationList";
import MessageComposer from "@/components/messages/MessageComposer";
import MessageThread from "@/components/messages/MessageThread";
import BackLink from "@/components/ui/BackLink";
import { CONVERSATIONS, MESSAGES_AFTER, MESSAGES_BEFORE } from "@/lib/messages-preview";

export const metadata: Metadata = {
  title: "Messagerie",
  description: "Échangez avec les hôtes et les voyageurs Kasa.",
  robots: { index: false },
};

export default function MessagesPage() {
  const active = CONVERSATIONS[0];

  return (
    <div className="mx-auto w-full max-w-[1000px] md:px-4 md:pt-10 md:pb-16">
      <div className="bg-surface flex overflow-hidden md:h-[640px] md:rounded-[10px] md:shadow-sm">
        <section
          aria-labelledby="messages-title"
          className="border-line flex w-full flex-col md:w-[300px] md:shrink-0 md:overflow-y-auto md:border-r"
        >
          <div className="px-4 pt-6 pb-4">
            <BackLink href="/">Retour</BackLink>
            <h1 id="messages-title" className="mt-6 text-2xl font-medium">
              Messages
            </h1>
          </div>
          <ConversationList conversations={CONVERSATIONS} activeId={active.id} />
        </section>

        <section
          aria-label={`Conversation avec ${active.name}`}
          className="bg-background hidden min-w-0 flex-1 flex-col md:flex"
        >
          <div className="flex-1 overflow-y-auto">
            <MessageThread before={MESSAGES_BEFORE} dateLabel="03 Septembre 2025" after={MESSAGES_AFTER} />
          </div>
          <MessageComposer />
        </section>
      </div>
    </div>
  );
}
