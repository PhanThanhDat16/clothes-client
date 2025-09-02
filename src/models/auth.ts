export interface IAuthForm {
  email: string
  password: string
}

export interface IAuthSignUpForm {
  fullName: string
  email: string
  password: string
  phone: string
  type?: 'user' | 'admin'
}

export interface IAuthTokens {
  accessToken: string
  refreshToken: string
}
