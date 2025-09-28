import { create } from 'zustand'
import { cartService } from '@/apis/api_cart'
import type { ICart, ICartItems, CartItemAdd } from '@/models/cartItem'
import type { IProduct } from '@/models/product'
import { useAuthStore } from '@/store/authStore'

type DisplayItem = {
  id: string
  name: string
  images: string
  price: number
  oldPrice?: number
  size: string
  quantity: number
}

type UnifiedCartState = {
  // local state (guest)
  cart: ICart[]
  // remote state (user)
  cartUser: ICart[]
  loading: boolean

  // lifecycle
  load: () => Promise<void>

  // actions (auto-route to local or remote)
  add: (product: IProduct, size: string, quantity: number) => Promise<void>
  increase: (itemId: string, size: string) => Promise<void>
  decrease: (itemId: string, size: string) => Promise<void>
  remove: (itemId: string, size: string) => Promise<void>
  clearLocal: () => void
  clearRemote: () => void

  // selectors
  itemsForDisplay: () => DisplayItem[]
  totalQuantity: () => number
  totalPrice: () => number
  savingCost: () => number
}

const getCartFromStorage = (): ICart[] => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    return Array.isArray(cart) ? cart : []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

const saveCartToStorage = (cart: ICart[]): void => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

export const useCartStore = create<UnifiedCartState>((set, get) => ({
  cart: [],
  cartUser: [],
  loading: false,

  load: async () => {
    const { user } = useAuthStore.getState()
    if (user) {
      set({ loading: true })
      const data = await cartService.getCartByUserId(user.data._id)
      set({ cartUser: data?.data || [], loading: false })
    } else {
      const cart = getCartFromStorage()
      set({ cart })
    }
  },

  add: async (product, size, quantity = 1) => {
    const { user } = useAuthStore.getState()
    if (user) {
      set({ loading: true })
      const payload: CartItemAdd = { itemId: product._id, size, quantity }
      const data = await cartService.addItemToCart(user.data._id, payload)
      set({ cartUser: data?.data || [], loading: false })
      return
    }

    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.itemId === product._id && i.size === size)
    if (idx !== -1) {
      cart[idx].quantity += quantity
    } else {
      const localItem: ICart = {
        _id: crypto.randomUUID(),
        cartId: 'local',
        size,
        quantity,
        itemId: product._id,
        item: {
          name: product.name,
          images: product.images[0] || '',
          price: product.price,
          oldPrice: product.oldPrice,
          description: product.description
        } as ICartItems
      }
      cart.push(localItem)
    }
    saveCartToStorage(cart)
    set({ cart })
  },

  increase: async (itemId, size) => {
    const { user } = useAuthStore.getState()
    if (user) {
      set({ loading: true })
      const data = await cartService.updateQuantity(user.data._id, { itemId, size, quantity: 1 })
      set({ cartUser: data?.data || [], loading: false })
      return
    }
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.itemId === itemId && i.size === size)
    if (idx !== -1) {
      cart[idx].quantity += 1
      saveCartToStorage(cart)
      set({ cart })
    }
  },

  decrease: async (itemId, size) => {
    const { user } = useAuthStore.getState()
    if (user) {
      set({ loading: true })
      const target = get().cartUser.find((i) => i.itemId === itemId && i.size === size)

      if (target && target.quantity > 1) {
        const data = await cartService.updateQuantity(user.data._id, { itemId, size, quantity: -1 })
        set({ cartUser: data?.data || [], loading: false })
      }
      return
    }
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.itemId === itemId && i.size === size)
    if (idx !== -1) {
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1
      }
      saveCartToStorage(cart)
      set({ cart })
    }
  },

  remove: async (itemId, size) => {
    const { user } = useAuthStore.getState()
    if (user) {
      set({ loading: true })
      const data = await cartService.removeItem(user.data._id, itemId, size)
      set({ cartUser: data?.data || [], loading: false })
      return
    }
    const updatedCart = get().cart.filter((i) => !(i.itemId === itemId && i.size === size))
    saveCartToStorage(updatedCart)
    set({ cart: updatedCart })
  },

  clearLocal: () => set({ cart: [] }),
  clearRemote: () => set({ cartUser: [] }),

  itemsForDisplay: () => {
    const { user } = useAuthStore.getState()
    if (user) {
      const remote = Array.isArray(get().cartUser) ? get().cartUser : []
      return remote.map((i) => ({
        id: i.itemId || i._id,
        name: i.item?.name || '',
        images: i.item?.images || '',
        price: i.item?.price || 0,
        oldPrice: i.item?.oldPrice,
        size: i.size,
        quantity: i.quantity
      }))
    }
    return get().cart.map((i) => ({
      id: i.itemId || i._id,
      name: i.item?.name || '',
      images: i.item?.images || '',
      price: i.item?.price || 0,
      oldPrice: i.item?.oldPrice,
      size: i.size,
      quantity: i.quantity
    }))
  },

  totalQuantity: () => {
    return get()
      .itemsForDisplay()
      .reduce((sum, i) => sum + i.quantity, 0)
  },

  totalPrice: () => {
    return get()
      .itemsForDisplay()
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  savingCost: () => {
    const items = get().itemsForDisplay()
    const orig = items.reduce((s, i) => s + (i.oldPrice || 0) * i.quantity, 0)
    const sale = items.reduce((s, i) => s + i.price * i.quantity, 0)
    return orig - sale
  }
}))
