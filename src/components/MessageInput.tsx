import { FormEvent, ChangeEvent } from "react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const MessageInput = ({ value, onChange, onSubmit }: MessageInputProps) => {
  return (
    <form onSubmit={onSubmit} className="message-form">
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput; 