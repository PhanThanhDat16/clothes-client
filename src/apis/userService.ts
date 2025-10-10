import { IAuthSignUpForm } from '@/models/auth'
import axiosConfig from './axiosConfig'
import { User } from '@/models/user'

const DEFAULT_URL = '/users'
export const register = async (values: IAuthSignUpForm) => await axiosConfig.post(`${DEFAULT_URL}/register`, values)
export const getProfile = async () => await axiosConfig.get(`${DEFAULT_URL}/profile`)
export const updateUser = async (userId: string, value: User) =>
  await axiosConfig.put(`${DEFAULT_URL}/${userId}`, value)

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return axiosConfig.post(`/upload/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
