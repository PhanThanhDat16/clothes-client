export interface ChatRoom {
  _id: string
  userId: string
  adminId?: string
  status: 'waiting' | 'active' | 'closed'
  createdAt: string
  updatedAt: string
  lastMessage?: ChatMessage
}

export interface ChatMessage {
  _id: string
  roomId: string
  senderId: string
  senderType: 'user' | 'admin'
  content: string
  timestamp: string
  isRead: boolean
}

export interface CreateRoomRequest {
  userId: string
}

export interface SendMessageRequest {
  roomId: string
  content: string
}
