export interface User {
  data: {
    _id: string
    fullName: string
    email: string
    phone?: string
    avatar?: string
    type?: string
    createdAt?: string
    address?: string
  }
}
