import React from "react";
import { useState } from "react";
import { QuestGPT } from "questgpt-js";

export default function ChatFooter({
  onSubmit,
  onRemoveLoader,
  onAddLoader,
  onResponse,
  apiKey,
  hideCredit = false,
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Ask me a question...");
  const questGptAPI = new QuestGPT(apiKey);

  async function submitQuery() {
    setLoading(true);
    onSubmit({
      message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    });
    onAddLoader();
    const res = await questGptAPI.makeQuery({
      query: message,
    });
    const resMessage = {
      message: res.response,
      metadata: res.metadata,
      isBot: true,
      timestamp: new Date().toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    onResponse(resMessage);
    onRemoveLoader();
    setLoading(false);
  }

  return (
    <div className="qg-chat-footer-container">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // await onSubmit(message);
          setMessage("");
          await submitQuery();
        }}
        className="qg-chat-footer-form"
      >
        <input
          type="text"
          className="qg-chat-input"
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="qg-chat-submit">
          <svg
            className="qg-chat-submit-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </form>
      {!hideCredit && (
        <div className="qg-chat-footer-brand">
          Powered by{" "}
          <a
            rel="noreferrer"
            href="https://www.questgpt.ai/"
            target="_blank"
            className="qg-chat-footer-credit"
          >
            QuestGPT
          </a>
        </div>
      )}
    </div>
  );
}
