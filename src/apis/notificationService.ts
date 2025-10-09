import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/notifications'

export const getListNotification = async (userId: string) => await axiosConfig.get(`${DEFAULT_URL}/user/${userId}`)

export const readAllNotification = async (userId: string) =>
  await axiosConfig.post(`${DEFAULT_URL}/read-all`, { userId })
