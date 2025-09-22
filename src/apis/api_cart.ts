import type { CartItemAdd, RootCart } from '@/models/cartItem'

const BASE_URL = import.meta.env.VITE_API_URL

// Helper function to handle API responses
const handleApiResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error: ${response.status} - ${errorText}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await response.json()
  } else {
    throw new Error('Invalid response format')
  }
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('accessToken')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

export const cartService = {
  addItemToCart: async (userId: string, item: CartItemAdd): Promise<RootCart | null> => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          itemId: item.itemId,
          size: item.size,
          quantity: item.quantity
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error ${response.status}:`, errorText)
        return null
      }

      const data = await handleApiResponse(response)
      console.log('Add item response:', data)
      return data
    } catch (error) {
      console.error('Error adding item to cart:', error)
      return null // Return null instead of throwing
    }
  },

  getCartByUserId: async (userId: string): Promise<RootCart | null> => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })

      if (!response.ok) {
        console.error(`API Error ${response.status}`)
        return null
      }

      const data = await handleApiResponse(response)
      return data
    } catch (error) {
      console.error('Error fetching cart:', error)
      return null
    }
  },

  updateQuantity: async (userId: string, item: CartItemAdd): Promise<RootCart | null> => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          itemId: item.itemId,
          size: item.size,
          quantity: item.quantity
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error ${response.status}:`, errorText)
        return null
      }

      const data = await handleApiResponse(response)
      console.log('Update quantity response:', data)
      return data
    } catch (error) {
      console.error('Error updating quantity:', error)
      return null
    }
  },

  removeItem: async (userId: string, itemId: string, size: string): Promise<RootCart | null> => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          itemId: itemId,
          size: size
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error ${response.status}:`, errorText)
        return null
      }

      const data = await handleApiResponse(response)
      console.log('Remove item response:', data)
      return data
    } catch (error) {
      console.error('Error removing item:', error)
      return null
    }
  }
}
