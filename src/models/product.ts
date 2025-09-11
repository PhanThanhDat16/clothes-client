import { ICategory } from './categories'

export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  oldPrice: number
  categoryId: string
  images: string[]
  options: IProductSizeCreate[]
}

export interface IProductDefault {
  _id: string
  name: string
  description: string
  price: number
  oldPrice: number
  categoryId: ICategory
  images: string[]
  options: IProductSizeCreate[]
}

export enum EProductSize {
  M = 'M',
  L = 'L',
  XL = 'XL'
}

export interface IProductSizeCreate {
  size: EProductSize | string
  stockQuantity: number
}

export interface IProductSize {
  _id: string
  itemId: string
  size: EProductSize
  stockQuantity: number
}
