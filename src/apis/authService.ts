import { IAuthForm } from '@/models/auth'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/auth'
export const logIn = async (values: IAuthForm) => await axiosConfig.post(`${DEFAULT_URL}/login`, values)
export const logOut = async (refreshToken: string) => await axiosConfig.post(`${DEFAULT_URL}/logout`, { refreshToken })
