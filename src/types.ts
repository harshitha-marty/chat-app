export interface User {
  nickname: string;
}

export interface Message {
  text: string;
  user: string;
  timestamp: string;
}

export interface EventHandler {
  onConnectionReady: () => void;
  onClose: () => void;
  onMessage: (message: any) => void;
}

export interface MessageObject {
  data?: {
    body?: string;
    userNickname?: string;
  };
} 