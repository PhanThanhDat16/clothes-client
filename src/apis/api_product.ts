import { toast } from 'react-toastify'
import type { Root } from '../models/products'

const BASE_URL = import.meta.env.VITE_API_URL

export const apiProductService = {
  getAll: async (): Promise<Root | null> => {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Lỗi khi gọi API: ' + response.statusText)
      }

      const data: Root = await response.json()
      return data
    } catch (error) {
      console.error('❌ Fetch getAll failed:', error)
      toast.error('Không thể tải danh sách sản phẩm')
      return null
    }
  }
}
