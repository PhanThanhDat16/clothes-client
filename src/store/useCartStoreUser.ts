import { create } from 'zustand'
import { cartService } from '@/apis/api_cart'
import type { CartItemAdd, CartItems } from '@/models/cartItem'

interface CartState {
  cartUser: CartItems[] | null
  loading: boolean
  error: string | null

  // actions
  fetchCartUser: (userId: string) => Promise<void>
  addItem: (userId: string, item: CartItemAdd) => Promise<void>
  updateItemUser: (userId: string, item: CartItemAdd) => Promise<void>
  removeItemUser: (userId: string, itemId: string, size: string) => Promise<void>
  clearCartByUser: () => void
  clearError: () => void

  // selectors (computed)
  totalQuantityUser: () => number
  totalPriceUser: () => number
  SavingCostUser: () => number
}

export const useCartStoreUser = create<CartState>((set, get) => ({
  cartUser: null,
  loading: false,
  error: null,

  // actions
  fetchCartUser: async (userId) => {
    try {
      set({ loading: true, error: null })
      const data = await cartService.getCartByUserId(userId)
      set({ cartUser: data?.data, loading: false })
    } catch (error) {
      console.error('Error fetching cart:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    }
  },

  addItem: async (userId, item) => {
    try {
      set({ loading: true, error: null })
      const data = await cartService.addItemToCart(userId, item)
      set({ cartUser: data?.data, loading: false })
    } catch (error) {
      console.error('Error adding item:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to add item'
      })
    }
  },

  updateItemUser: async (userId, item) => {
    const currentState = get()
    try {
      set({ loading: true, error: null })
      const data = await cartService.updateQuantity(userId, item)

      // Only update if we get valid data back
      if (data && data.data) {
        set({ cartUser: data.data, loading: false })
        console.log('Cart after adding item:', data)
      } else {
        console.warn('Invalid update response, keeping current state')
        set({ loading: false })
      }
    } catch (error) {
      console.error('Error updating item:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update item',
        // Keep the current cart state instead of resetting
        cartUser: currentState.cartUser
      })
    }
  },

  removeItemUser: async (userId, itemId, size) => {
    const currentState = get()
    try {
      set({ loading: true, error: null })
      const data = await cartService.removeItem(userId, itemId, size)

      // Only update if we get valid data back
      if (data !== null) {
        set({ cartUser: data?.data, loading: false })
      } else {
        console.warn('Invalid remove response, keeping current state')
        set({ loading: false })
      }
    } catch (error) {
      console.error('Error removing item:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to remove item',
        // Keep the current cart state instead of resetting
        cartUser: currentState.cartUser
      })
    }
  },

  clearCartByUser: () => set({ cartUser: null, error: null }),

  clearError: () => set({ error: null }),

  // selectors
  totalQuantityUser: () => {
    const cart = get().cartUser
    if (!cart || !Array.isArray(cart)) return 0
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
  },

  totalPriceUser: () => {
    const cart = get().cartUser
    if (!cart || !Array.isArray(cart)) return 0
    return cart.reduce((sum, item) => {
      const price = item.item?.price || 0
      const quantity = item.quantity || 0
      return sum + price * quantity
    }, 0)
  },

  SavingCostUser: () => {
    const cart = get().cartUser
    if (!cart || !Array.isArray(cart)) return 0

    const originalCost = cart.reduce((sum, item) => {
      const oldPrice = item.item?.oldPrice || 0
      const quantity = item.quantity || 0
      return sum + oldPrice * quantity
    }, 0)

    const currentCost = cart.reduce((sum, item) => {
      const price = item.item?.price || 0
      const quantity = item.quantity || 0
      return sum + price * quantity
    }, 0)

    return originalCost - currentCost
  }
}))
