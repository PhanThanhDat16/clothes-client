import { ChatRoom, ChatMessage } from '@/models/chat'

export const mockRooms: ChatRoom[] = [
  // {
  //   _id: 'room_001',
  //   userId: 'user_001',
  //   adminId: 'admin_001',
  //   status: 'active',
  //   createdAt: '2024-01-15T10:00:00Z',
  //   updatedAt: '2024-01-15T14:30:00Z',
  //   lastMessage: {
  //     _id: 'msg_003',
  //     roomId: 'room_001',
  //     senderId: 'admin_001',
  //     senderType: 'admin',
  //     content: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ hỗ trợ bạn ngay.',
  //     timestamp: '2024-01-15T14:30:00Z',
  //     isRead: true
  //   }
  // }
]

export const mockMessages: ChatMessage[] = [
  // {
  //   _id: 'msg_001',
  //   roomId: 'room_001',
  //   senderId: 'user_001',
  //   senderType: 'user',
  //   content: 'Xin chào! Tôi có câu hỏi về sản phẩm này.',
  //   timestamp: '2024-01-15T10:00:00Z',
  //   isRead: true
  // },
  // {
  //   _id: 'msg_002',
  //   roomId: 'room_001',
  //   senderId: 'admin_001',
  //   senderType: 'admin',
  //   content: 'Chào bạn! Tôi có thể giúp gì cho bạn?',
  //   timestamp: '2024-01-15T10:05:00Z',
  //   isRead: true
  // },
  // {
  //   _id: 'msg_003',
  //   roomId: 'room_001',
  //   senderId: 'admin_001',
  //   senderType: 'admin',
  //   content: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ hỗ trợ bạn ngay.',
  //   timestamp: '2024-01-15T14:30:00Z',
  //   isRead: true
  // }
]

export const mockUsers = {
  user_001: {
    _id: 'user_001',
    fullName: 'Nguyễn Văn A',
    email: 'user@example.com'
  },
  admin_001: {
    _id: 'admin_001',
    fullName: 'Admin Support',
    email: 'admin@example.com'
  }
}

export const getMockRoomByUserId = (userId: string): ChatRoom | null => {
  return mockRooms.find((room) => room.userId === userId) || null
}

export const getMockMessagesByRoomId = (roomId: string): ChatMessage[] => {
  return mockMessages.filter((msg) => msg.roomId === roomId)
}

export const createMockRoom = (userId: string): ChatRoom => {
  const newRoom: ChatRoom = {
    _id: `room_${Date.now()}`,
    userId,
    status: 'waiting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  mockRooms.push(newRoom)
  return newRoom
}

export const createMockMessage = (
  roomId: string,
  senderId: string,
  senderType: 'user' | 'admin',
  content: string
): ChatMessage => {
  const newMessage: ChatMessage = {
    _id: `msg_${Date.now()}`,
    roomId,
    senderId,
    senderType,
    content,
    timestamp: new Date().toISOString(),
    isRead: false
  }
  mockMessages.push(newMessage)

  const room = mockRooms.find((r) => r._id === roomId)
  if (room) {
    room.lastMessage = newMessage
    room.updatedAt = new Date().toISOString()
  }

  return newMessage
}
