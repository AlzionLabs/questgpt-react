import Typing from "./typing";
import logo from "../../assets/questgpt-logo-white.svg";

export default function ChatMessage({ message, key }) {
  return (
    <div key={key} className="qg-message-container">
      {message.isBot && (
        <div className="qg-chat-bot-image-container">
          <img
            alt="QuestGPT"
            className="qg-chat-bot-image"
            src={logo}
            width={24}
            height={24}
          />
        </div>
      )}
      <div
        className={`qg-message-content ${
          message.isBot ?"qg-message-text-bot" : "qg-message-text-user"
        }`}
      >
        <div
          className={`qg-message-text-bubble ${
            message.isBot
              ? "qg-message-text-bubble-bot"
              : "qg-message-text-bubble-user"
          }`}
        >
          {message.isLoader ? (
            <Typing />
          ) : (
            <>
              <p className="qg-message-text">{message.message}</p>
            </>
          )}
        </div>
        {!message.isLoader && (
          <p className="qg-message-timestamp">{message.timestamp}</p>
        )}
        {message.isBot &&
          message.metadata &&
          message.metadata.sources &&
          message.metadata.sources.length > 0 && (
            <div className="qg-sources-container">
              <div>Sources:</div>
              {message.metadata?.sources?.map((source, sourceIndex) => (
                <>
                  <a
                    rel="noreferrer"
                    key={sourceIndex}
                    className="qg-source-link"
                    href={source}
                    target="_blank"
                    title={source}
                  >
                    {source}
                  </a>
                </>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
