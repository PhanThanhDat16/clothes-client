import { IAuthSignUpForm } from '@/models/auth'
import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/users'
export const register = async (values: IAuthSignUpForm) => await axiosConfig.post(`${DEFAULT_URL}/register`, values)
export const getProfile = async () => await axiosConfig.get(`${DEFAULT_URL}/profile`)
