import type { CartItemAdd, RootCart } from '@/models/cartItem'

const BASE_URL = import.meta.env.VITE_API_URL
export const cartService = {
  addItemToCart: async (userId: string, item: CartItemAdd): Promise<RootCart | null> => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(item)
      })
      const data = await response.json()
      if (!response.ok) return null
      return data
    } catch (error) {
      console.error('error', error)
      return null
    }
  },

  getCartByUserId: async (userId: string): Promise<RootCart | null> => {
    try {
      const token = localStorage.getItem('accessToken')

      const res = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) return null
      const data = await res.json()
      return data
    } catch (error) {
      console.error('Error', error)
      return null
    }
  },

  updateQuantity: async (userId: string, item: CartItemAdd): Promise<RootCart | null> => {
    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${BASE_URL}/cart/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(item)
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  },

  removeItem: async (userId: string, itemId: string, size: string): Promise<RootCart | null> => {
    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${BASE_URL}/cart/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        itemId: itemId,
        size: size
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  },

  clearCart: async (userId: string): Promise<RootCart | null> => {
    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${BASE_URL}/cart/${userId}/all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({})
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  }
}
