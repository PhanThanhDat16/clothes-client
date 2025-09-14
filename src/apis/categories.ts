import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/categories'

export const getCategoryDetail = async (cateId: string) => await axiosConfig.get(`${DEFAULT_URL}/${cateId}`)
export const getAllCategory = async (params?: { search?: string; page?: number; limit?: number }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 10
    }
  })
