import { create } from 'zustand'
import { cartService } from '@/apis/api_cart'
import type { RootCart, CartItemAdd } from '@/models/cartItem'

interface CartState {
  cartUser: RootCart | null
  loading: boolean

  // actions
  fetchCartUser: (userId: string) => Promise<void>
  addItem: (userId: string, item: CartItemAdd) => Promise<void>
  updateItemUser: (userId: string, item: CartItemAdd) => Promise<void>
  removeItemUser: (userId: string, itemId: string, size: string) => Promise<void>
  clearCartByUser: () => void

  // selectors (computed)
  totalQuantityUser: () => number
  totalPriceUser: () => number
  SavingCostUser: () => number
}

export const useCartStoreUser = create<CartState>((set, get) => ({
  cartUser: null,
  loading: false,

  // actions
  fetchCartUser: async (userId) => {
    set({ loading: true })
    const data = await cartService.getCartByUserId(userId)
    set({ cartUser: data, loading: false })
  },

  addItem: async (userId, item) => {
    set({ loading: true })
    const data = await cartService.addItemToCart(userId, item)
    set({ cartUser: data, loading: false })
  },

  updateItemUser: async (userId, item) => {
    set({ loading: true })
    const data = await cartService.updateQuantity(userId, item)
    set({ cartUser: data, loading: false })
  },

  removeItemUser: async (userId, itemId, size) => {
    set({ loading: true })
    const data = await cartService.removeItem(userId, itemId, size)
    set({ cartUser: data, loading: false })
  },

  clearCartByUser: () => set({ cartUser: null }),

  // selectors
  totalQuantityUser: () => {
    const cart = get().cartUser
    if (!cart) return 0
    return cart.data.reduce((sum, item) => sum + item.quantity, 0)
  },

  totalPriceUser: () => {
    const cart = get().cartUser
    if (!cart) return 0
    return cart.data.reduce((sum, item) => sum + (item.item?.price || 0) * item.quantity, 0) // bug
  },

  SavingCostUser: () => {
    const cart = get().cartUser
    const originalCost = cart?.data.reduce((sum, item) => sum + (item.item?.oldPrice || 0) * item.quantity, 0) as number
    const costPrice = cart?.data.reduce((sum, item) => sum + (item.item?.oldPrice || 0) * item.quantity, 0) as number
    const saving = originalCost - costPrice
    return saving
  }
}))
