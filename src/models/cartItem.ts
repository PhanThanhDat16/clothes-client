export interface RootCart {
  message: string
  data: CartItems[]
}

export interface CartItems {
  _id: string
  cartId: string
  size: string
  quantity: number
  itemId?: string
  item: CartItem
}

export interface CartItem {
  name?: string
  images?: string
  price?: number
  oldPrice?: number
  description?: string
}

export interface CartItemAdd {
  itemId?: string
  size: string
  quantity: number
}
