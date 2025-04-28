export enum SocketMessageTypes {
  SEND_MESSAGE = 'SEND_MESSAGE',
}

export interface WebSocketMessage {
  type: SocketMessageTypes;
  data: {
    body: string;
    userNickname?: string;
  };
}

export interface WebSocketEventHandler {
  onConnectionReady: () => void;
  onClose: () => void;
  onMessage: (message: WebSocketMessage) => void;
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private eventHandler: WebSocketEventHandler;
  private roomId: string = '';
  private nickname: string = '';

  constructor(eventHandler: WebSocketEventHandler) {
    this.eventHandler = eventHandler;
  }

  connect(url: string): void {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => this.eventHandler.onConnectionReady();
    this.ws.onclose = () => this.eventHandler.onClose();
    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        this.eventHandler.onMessage(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  }

  joinChatRoom(nickname: string, roomId: string, password: string = ''): void {
    this.nickname = nickname;
    this.roomId = roomId;
    // In a real implementation, you would send a join room message to the server
    console.log(`Joining room ${roomId} as ${nickname}`);
  }

  async createChatRoom(nickname: string, password: string = ''): Promise<string> {
    this.nickname = nickname;
    // In a real implementation, you would request a new room ID from the server
    const newRoomId = Math.random().toString(36).substring(2, 15);
    this.roomId = newRoomId;
    return newRoomId;
  }

  sendMessage(type: SocketMessageTypes, data: { body: string }): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const message: WebSocketMessage = {
      type,
      data: {
        ...data,
        userNickname: this.nickname,
      },
    };

    this.ws.send(JSON.stringify(message));
  }
} 