import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  oldPrice: number
  description: string
  image: string
  quantity: number
  size: string
}

type CartState = {
  cart: CartItem[]
  addItemlocal: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  increaseQty: (id: string, size: string) => void
  decreaseQty: (id: string, size: string) => void
  loadCart: () => void
  TotalBill: () => number
  TotalItems: () => number
  Savingcost: () => number
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

  addItemlocal: (item) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === item.id && i.size === item.size)
    if (idx !== -1) {
      cart[idx].quantity += item.quantity
    } else {
      cart.push(item)
    }
    saveCartToStorage(cart)
    set({ cart })
  },

  removeItem: (id, size) => {
    const updatedCart = get().cart.filter((i) => !(i.id === id && i.size === size))
    saveCartToStorage(updatedCart)
    set({ cart: updatedCart })
  },

  increaseQty: (id, size) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === id && i.size === size)
    if (idx !== -1) {
      cart[idx].quantity += 1
      saveCartToStorage(cart)
      set({ cart })
    }
  },

  decreaseQty: (id, size) => {
    const cart = [...get().cart]
    const idx = cart.findIndex((i) => i.id === id && i.size === size)
    if (idx !== -1 && cart[idx].quantity > 1) {
      cart[idx].quantity -= 1
      saveCartToStorage(cart)
      set({ cart })
    }
  },

  TotalBill: () => {
    const cart = [...get().cart]
    const totalAmount = cart.reduce((sum, item) => {
      const priceNumber = Number(item.price.toString().replace(/[^\d]/g, '')) // convert "269.000₫" -> 269000
      return sum + priceNumber * item.quantity
    }, 0)
    return totalAmount
  },

  TotalItems: () => {
    const cart = [...get().cart]
    const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0)
    return totalItem
  },

  Savingcost: () => {
    const cart = [...get().cart]
    const totalBillOriginal = cart.reduce((sum, item) => sum + item.oldPrice * item.quantity, 0)
    const totalBillSale = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return totalBillOriginal - totalBillSale
  }
}))
