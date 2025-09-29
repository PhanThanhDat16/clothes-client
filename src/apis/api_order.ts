import { CartItems } from '@/models/cartItem'
import { GetOrdersResponse, Order } from '@/models/order'

const BASE_URL = import.meta.env.VITE_API_URL

// Sử dụng axiosConfig của bạn thay vì fetch
export const getOrderByUserId = async (userId: string): Promise<GetOrdersResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
        ...(localStorage.getItem('accessToken')
          ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          : {})
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error ${response.status}:`, errorText)
      return null
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return null
  }
}
export const payMent = async (userId: string, items: CartItems[], voucherCode?: string): Promise<string | null> => {
  try {
    const response = await fetch(`${BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
        ...(localStorage.getItem('accessToken')
          ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          : {})
      },
      body: JSON.stringify({ userId, items, voucherCode })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error ${response.status}:`, errorText)
      return null
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return null
  }
}
// Utility functions for order data processing
export class OrderUtils {
  // Calculate total items in an order
  static getTotalItems(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0)
  }

  // Get unique product names in an order
  static getProductNames(order: Order): string[] {
    return order.items.map((item) => item.itemDetail.name)
  }

  // Calculate total savings (old price vs current price)
  static getTotalSavings(order: Order): number {
    return order.items.reduce((savings, item) => {
      const itemSavings = (item.itemDetail.oldPrice - item.itemDetail.price) * item.quantity
      return savings + itemSavings
    }, 0)
  }

  // Format order date
  static formatOrderDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Format price to Vietnamese currency
  static formatPrice(price: number): string {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    })
  }

  // Group orders by status
  static groupOrdersByStatus(orders: Order[]): Record<Order['status'], Order[]> {
    return orders.reduce(
      (groups, order) => {
        const status = order.status
        if (!groups[status]) {
          groups[status] = []
        }
        groups[status].push(order)
        return groups
      },
      {} as Record<Order['status'], Order[]>
    )
  }
}
