import type { ConversationPreview } from "@/lib/messages-preview";

type Props = {
  conversations: ConversationPreview[];
  activeId?: string;
};

export default function ConversationList({ conversations, activeId }: Props) {
  return (
    <ul aria-label="Conversations" className="flex flex-col">
      {conversations.map((conversation) => {
        const active = conversation.id === activeId;
        return (
          <li
            key={conversation.id}
            aria-current={active ? "true" : undefined}
            className={`border-line flex items-center gap-3 border-b px-4 py-3 ${active ? "bg-background" : ""}`}
          >
            <span aria-hidden className="bg-chip size-9 shrink-0 rounded-[5px]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm">{conversation.name}</p>
                <p className="text-muted shrink-0 text-[11px]">{conversation.time}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-muted truncate text-xs">{conversation.lastMessage}</p>
                {conversation.unread && (
                  <span className="bg-primary size-1.5 shrink-0 rounded-full">
                    <span className="sr-only">Non lu</span>
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
