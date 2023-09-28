import { useState } from "react";
import ChatBody from "./chat-body";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";

export default function ChatWindow({
  className,
  onClose,
  apiKey,
  hideCredit,
}) {

  function firstMessage() {
    return {
      message: "Hi, I am QuestGPT. I am here to help you with your queries. Ask me anything.",
      isBot: true,
      timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
  };

  const [messages, setMessages] = useState([firstMessage()]);

  function addMessage(message) {
    // NOTE: idk why this works the way it works.
    messages.push(message);
    setMessages([...messages]);
  }

  return (
    <div className={`qg-chat-window ${className}`}>
      <ChatHeader onClose={onClose} onReset={(e) => {
        e.preventDefault();
        setMessages([firstMessage()]);
      }} />
      <ChatBody messages={messages} />
      <ChatFooter
        apiKey={apiKey}
        onSubmit={addMessage}
        onResponse={addMessage}
        hideCredit={hideCredit}
        onAddLoader={() => {
          addMessage({
            message: "Loading...",
            isBot: true,
            timestamp: new Date().toLocaleString(),
            isLoader: true,
          });
        }}
        onRemoveLoader={() => {
          const newMessages = messages.filter((message) => {
            return !message.isLoader;
          });
          setMessages(newMessages);
        }}
      />
    </div>
  );
}
