import { useState } from "react";
import ChatWindow from "./components/chat-window";
import QuestGptLogoWhite from "../assets/questgpt-logo-white";
import "./questgpt.css";

interface QuestGptProps {
  apiKey: string;
  introText?: string;
  hideCredit?: boolean;
}

const QuestGpt: React.FC<QuestGptProps> = ({
  apiKey,
  introText,
  hideCredit = false,
}) => {
  const [chatWindowOpen, setChatWindowOpen] = useState(false);
  const [chatWindowOpenedOnce, setChatWindowOpenedOnce] = useState(false);

  function toggleChatWindow(e: React.MouseEvent<HTMLButtonElement>) {
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
          <QuestGptLogoWhite
            className="qg-toggle-logo"
          />
        </button>
      </div>
      {introText &&
        introText.length > 0 &&
        !chatWindowOpen &&
        !chatWindowOpenedOnce && (
          <div className="intro-text">
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
  )
}

export default QuestGpt;