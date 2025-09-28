import { User } from './user'

export interface IConversation {
  _id: string
  userId: string
  fullName: string
  email: string
  avatar: string
  online: boolean
  lastMessage: string
  createdAt: string
}

export interface IConversationMessage {
  _id: string
  isRead: boolean
  conversationId: string
  receiverId: User
  senderId: User
  content: string
  createdAt: string
}
