import axiosConfig from './axiosConfig'

const DEFAULT_URL = '/items'

export const getProductDetail = async (productId: string) => await axiosConfig.get(`${DEFAULT_URL}/${productId}`)
export const getAllProduct = async (params?: { search?: string; page?: number; limit?: number; categoryId?: string }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 9,
      categoryId: params?.categoryId
    }
  })

export const getProductTopPopular = async () => await axiosConfig.get(`${DEFAULT_URL}/popular`)
export const getProductByCategoryId = async (categoryId: string) =>
  await axiosConfig.get(`${DEFAULT_URL}/category/${categoryId}`)
