import { useState, useRef } from "react";
import "./App.css";
import { TelepartyClient, SocketMessageTypes } from "teleparty-websocket-lib";
import { User, Message, EventHandler, MessageObject } from "./types";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const eventHandler: EventHandler = {
    onConnectionReady: () => {
      // alert("Connection has been established");
    },
    onClose: () => {},
    onMessage: (message: MessageObject) => {
      const messageBody = JSON.stringify(message, null, 2);
      const messageObject = JSON.parse(messageBody) as MessageObject;
      if (messageObject?.data?.body) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          {
            text: messageObject?.data?.body || "",
            user: messageObject?.data?.userNickname || "",
          },
        ]);
      }
    },
  };

  const clientRef = useRef<TelepartyClient>(new TelepartyClient(eventHandler));
  const client = clientRef.current;

  const handleWelcomeSubmit = async (nickname: string, roomIdInput: string) => {
    setUser({ nickname: nickname || "" });

    if (roomIdInput) {
      // Join existing room
      client.joinChatRoom(nickname || "", roomIdInput, "");
      setRoomId(roomIdInput);
    } else {
      // Create new room
      let newRoomId = await client.createChatRoom(nickname, "");
      client.joinChatRoom(nickname || "", newRoomId, "");
      setRoomId(newRoomId);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="app">
      {!user ? (
        <WelcomeScreen onSubmit={handleWelcomeSubmit} />
      ) : (
        <ChatRoom
          roomId={roomId}
          user={user}
          messages={messages}
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onMessageSubmit={handleMessageSubmit}
        />
      )}
    </div>
  );
}

export default App;
