import { useState } from "react";
import ChatWindow from "./components/chat-window";
import logo from "../assets/questgpt-logo-white.svg";
import "./questgpt.css";

export default function QuestGPT({
  apiKey,
  introText,
  hideCredit,
}) {
  const [chatWindowOpen, setChatWindowOpen] = useState(false);
  const [chatWindowOpenedOnce, setChatWindowOpenedOnce] = useState(false);

  function toggleChatWindow(e) {
    e.preventDefault();
    if (typeof document !== "undefined") {
      chatWindowOpen
        ? window.parent?.postMessage("onWidgetClose", "*")
        : window.parent?.postMessage("onWidgetOpen", "*");
    }
    setChatWindowOpen(!chatWindowOpen);
    setChatWindowOpenedOnce(true);
  }

  return (
    <main className="qg-main-container">
      <div className="qg-toggle-container">
        <button
          className="qg-toggle"
          onClick={toggleChatWindow}
        >
          <img
            alt="QuestGPT"
            className="qg-toggle-logo"
            src={logo}
            width={24}
            height={24}
          />
        </button>
      </div>
      {introText &&
        introText.length > 0 &&
        !chatWindowOpen &&
        !chatWindowOpenedOnce && (
          <div className="flex-grow-0 flex-shrink-0 flex flex-col justify-center items-center bg-primary-500 text-white text-sm rounded-md px-3 py-2 mr-4 relative rounded-br-none">
            <div className="h-2 w-2 border-t-[8px] border-l-[8px] border-r-none border-l-transparent border-r-transparent border-t-primary-500 absolute top-[100%] right-0"></div>
            {introText}
          </div>
        )}
      <ChatWindow
        apiKey={apiKey}
        onClose={toggleChatWindow}
        hideCredit={hideCredit}
        className={chatWindowOpen ? "" : "qg-hidden"}
      />
    </main>
  );
}
