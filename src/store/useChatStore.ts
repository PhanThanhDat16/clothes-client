import { create } from 'zustand'
import { ChatRoom, ChatMessage } from '@/models/chat'
import { createRoom, getUserRoom, getRoomMessages, sendMessage } from '@/apis/chatService'

interface ChatState {
  // State
  currentRoom: ChatRoom | null
  messages: ChatMessage[]
  isLoading: boolean
  isCreatingRoom: boolean
  isSendingMessage: boolean

  // Actions
  setCurrentRoom: (room: ChatRoom | null) => void
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void

  // API calls
  checkExistingRoom: (userId: string) => Promise<void>
  createNewRoom: (userId: string) => Promise<void>
  loadRoomMessages: (roomId: string) => Promise<void>
  sendNewMessage: (roomId: string, content: string) => Promise<void>

  // Reset
  resetChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial state
  currentRoom: null,
  messages: [],
  isLoading: false,
  isCreatingRoom: false,
  isSendingMessage: false,

  // Setters
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),

  // API calls
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkExistingRoom: async (_userId: string) => {
    try {
      set({ isLoading: true })

      // Try to get existing room
      const existingRoomResponse = await getUserRoom()
      if (existingRoomResponse.data) {
        set({ currentRoom: existingRoomResponse.data })
        return
      }
    } catch (error) {
      console.error('Error checking existing room:', error)
      // No existing room found, don't create automatically
    } finally {
      set({ isLoading: false })
    }
  },

  createNewRoom: async (userId: string) => {
    try {
      set({ isCreatingRoom: true })
      const newRoomResponse = await createRoom({ userId })
      set({ currentRoom: newRoomResponse.data })
    } catch (error) {
      console.error('Error creating room:', error)
    } finally {
      set({ isCreatingRoom: false })
    }
  },

  loadRoomMessages: async (roomId: string) => {
    try {
      set({ isLoading: true })
      const response = await getRoomMessages(roomId)
      set({ messages: response.data })
    } catch (error) {
      console.error('Error loading messages:', error)
      set({ messages: [] })
    } finally {
      set({ isLoading: false })
    }
  },

  sendNewMessage: async (roomId: string, content: string) => {
    try {
      set({ isSendingMessage: true })
      const response = await sendMessage({ roomId, content })
      const newMessage = response.data

      set((state) => ({
        messages: [...state.messages, newMessage]
      }))
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      set({ isSendingMessage: false })
    }
  },

  // Reset
  resetChat: () =>
    set({
      currentRoom: null,
      messages: [],
      isLoading: false,
      isCreatingRoom: false,
      isSendingMessage: false
    })
}))
