import { FormEvent } from "react";
import { User } from "../types";

interface WelcomeScreenProps {
  onSubmit: (nickname: string, roomId: string) => void;
}

const WelcomeScreen = ({ onSubmit }: WelcomeScreenProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nickname = (form.elements.namedItem("nickname") as HTMLInputElement).value;
    const roomId = (form.elements.namedItem("roomId") as HTMLInputElement).value;
    onSubmit(nickname, roomId);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Chat!</h1>
      <form onSubmit={handleSubmit} className="welcome-form">
        <div className="form-group">
          <label htmlFor="nickname">Nickname (optional):</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Enter a nickname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomId">
            Room ID (leave empty to create new room):
          </label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            placeholder="Enter room ID to join existing room"
          />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default WelcomeScreen; 