import { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import { Message } from "./message";

interface ChatBodyProps {
  messages: Message[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="qg-chat-body">
      {messages.map((message, index) => {
        return <ChatMessage key={index} message={message} />;
      })}
      <div ref={lastMessage} className="h-1 w-1"></div>
    </div>
  );
}
