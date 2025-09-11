import { IAuthSignUpForm } from '@/models/auth'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/users'
export const register = async (values: IAuthSignUpForm) => await axiosConfig.post(`${DEFAULT_URL}/register`, values)
