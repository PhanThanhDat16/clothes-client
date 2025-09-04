import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  image: {
    src: string
    alt: string
  }
  quantity: number
  color: string
  size: string
  stock?: number
}

type CartState = {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, color: string, size: string) => void
  increaseQty: (id: string, color: string, size: string) => void
  decreaseQty: (id: string, color: string, size: string) => void
  loadCart: () => void
}
const getCartFromStorage = (): CartItem[] => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    return Array.isArray(cart) ? cart : []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  loadCart: () => {
    const cart = getCartFromStorage()
    set({ cart: cart })
  },

  addItem: (item) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === item.id && i.color === item.color)
    if (idx !== -1) {
      cart[idx].quantity += item.quantity
    } else {
      cart.push(item)
    }
    saveCartToStorage(cart)
    set({ cart })
  },

  removeItem: (id, color, size) => {
    const updatedCart = get().cart.filter((i) => !(i.id === id && i.color === color && i.size === size))
    saveCartToStorage(updatedCart)
    set({ cart: updatedCart })
  },

  increaseQty: (id, color, size) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === id && i.color === color && i.size === size)
    if (idx !== -1) {
      cart[idx].quantity += 1
      saveCartToStorage(cart)
      set({ cart })
    }
  },

  decreaseQty: (id, color, size) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === id && i.color === color && i.size === size)
    if (idx !== -1 && cart[idx].quantity > 1) {
      cart[idx].quantity -= 1
      saveCartToStorage(cart)
      set({ cart })
    }
  }
}))
