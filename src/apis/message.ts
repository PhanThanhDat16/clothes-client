import { IMessage } from '@/models/message'
import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/messages'

export const createMessage = (value: IMessage) => axiosConfig.post(DEFAULT_URL, value)

export const getMessageConversation = (conversationId: string) => axiosConfig.get(`${DEFAULT_URL}/${conversationId}`)
