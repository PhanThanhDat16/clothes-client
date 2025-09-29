// order.model.ts

export interface ItemDetail {
  _id: string
  name: string
  description: string
  price: number
  oldPrice: number
  categoryId: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  _id: string
  orderId: string
  itemId: string
  quantity: number
  price: number
  size: string
  createdAt: string
  updatedAt: string
  itemDetail: ItemDetail
}

export interface Order {
  _id: string
  userId: string
  totalPrice: number
  finalTotal: number
  status: 'paid' | 'pending' | 'confirmed' | 'completed' | 'processing'
  voucherId: string | null
  discount: number
  createdAt: string
  updatedAt: string
  email: string
  fullName: string
  code: number
  items: OrderItem[]
}

export interface GetOrdersResponse {
  message: string
  data: Order[]
}

// Optional: Additional interfaces for better type safety
export interface OrderSummary {
  orderId: string
  totalPrice: number
  finalTotal: number
  status: Order['status']
  itemCount: number
  createdAt: string
}

export interface OrderFilters {
  status?: Order['status']
  userId?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}
