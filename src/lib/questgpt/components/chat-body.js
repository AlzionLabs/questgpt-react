import { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";

export default function ChatBody({ messages }) {

  const lastMessage = useRef(null);

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  
  return (
    <div className="qg-chat-body">
      {messages.map((message, index) => {
        return (
          <ChatMessage key={index} message={message} />
        );
      })}
      <div ref={lastMessage} className="h-1 w-1"></div>
    </div>
  );
}
