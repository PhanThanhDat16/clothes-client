import { CreateRoomRequest, SendMessageRequest } from '@/models/chat'
import { getMockRoomByUserId, getMockMessagesByRoomId, createMockRoom, createMockMessage } from './mockChatData'

const mockApiResponse = <T>(data: T, delay: number = 500) => {
  return new Promise<{ data: T }>((resolve) => {
    setTimeout(() => {
      resolve({ data })
    }, delay)
  })
}

export const createRoom = async (data: CreateRoomRequest) => {
  const newRoom = createMockRoom(data.userId)
  return mockApiResponse(newRoom, 800)
}

export const getUserRoom = async () => {
  const room = getMockRoomByUserId('user_001')
  if (!room) {
    throw new Error('Room not found')
  }
  return mockApiResponse(room, 600)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRoomById = async (_roomId: string) => {
  // Mock: Get room by ID
  const room = getMockRoomByUserId('user_001') // Simplified for demo
  if (!room) {
    throw new Error('Room not found')
  }
  return mockApiResponse(room, 400)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const closeRoom = async (_roomId: string) => {
  return mockApiResponse({ success: true }, 300)
}

export const getRoomMessages = async (roomId: string) => {
  const messages = getMockMessagesByRoomId(roomId)
  return mockApiResponse(messages, 500)
}

export const sendMessage = async (data: SendMessageRequest) => {
  const newMessage = createMockMessage(data.roomId, 'user_001', 'user', data.content)
  return mockApiResponse(newMessage, 400)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const markMessagesAsRead = async (_roomId: string) => {
  return mockApiResponse({ success: true }, 200)
}
