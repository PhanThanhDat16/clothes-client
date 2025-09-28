export interface RootCart {
  message: string
  data: ICart[]
}

export interface ICart {
  _id: string
  cartId: string
  size: string
  quantity: number
  itemId?: string
  item: ICartItems
}

export interface ICartItems {
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
