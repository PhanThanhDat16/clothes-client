import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/conversations'

export const createConversation = async (userId: string) => axiosConfig.post(DEFAULT_URL, { userId })
export const getConversationDetail = async (conversationId: string) =>
  axiosConfig.get(`${DEFAULT_URL}/${conversationId}`)
export const getCheckConversationByUser = async (userId: string) => axiosConfig.get(`${DEFAULT_URL}/user/${userId}`)
