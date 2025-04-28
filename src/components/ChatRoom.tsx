import { User, Message } from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatRoomProps {
  roomId: string;
  user: User;
  messages: Message[];
  newMessage: string;
  onMessageChange: (value: string) => void;
  onMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatRoom = ({
  roomId,
  user,
  messages,
  newMessage,
  onMessageChange,
  onMessageSubmit,
}: ChatRoomProps) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room: {roomId}</h2>
        <p>Welcome, {user.nickname}!</p>
      </div>
      <MessageList messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={onMessageChange}
        onSubmit={onMessageSubmit}
      />
    </div>
  );
};

export default ChatRoom; 