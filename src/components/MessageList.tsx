import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <span className="message-user">{message.user}:</span>
          <span className="message-text">{message.text}</span>
          <span className="message-time">{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 