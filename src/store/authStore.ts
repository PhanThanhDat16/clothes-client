import { create } from 'zustand'
import { getProfile } from '@/apis/userService'
import { User } from '@/models/user'

interface AuthState {
  user: User | null
  isLoading: boolean
  fetchUser: () => Promise<void>
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ user: null })
      return
    }
    try {
      set({ isLoading: true })
      const res = await getProfile()
      if (res) {
        set({ user: res.data })
      }
    } catch (error) {
      console.log(error)
      set({ user: null })
    } finally {
      set({ isLoading: false })
    }
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))
