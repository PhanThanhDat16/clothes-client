export interface Root {
  message: string
  data: DataProduct
}

export interface DataProduct {
  total: number
  page: number
  limit: number
  totalPages: number
  data: item[]
}

export interface item {
  _id: string
  name: string
  description: string
  price: number
  oldPrice: number
  categoryId: CategoryId
  images: string[]
  createdAt: string
  updatedAt: string
  options: Option[]
}

export interface CategoryId {
  _id: string
  name: string
}

export interface Option {
  size: string
  stockQuantity: number
}
