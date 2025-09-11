import axiosConfig from './axioConfig'

const DEFAULT_URL = '/items'

export const getProductDetail = async (productId: string) => await axiosConfig.get(`${DEFAULT_URL}/${productId}`)
export const getAllProduct = async (params?: { search?: string; page?: number; limit?: number }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 9
    }
  })

export const getProductTopPopular = async () => await axiosConfig.get(`${DEFAULT_URL}/popular`)
export const getProductByCategoryId = async (categoryId: string) =>
  await axiosConfig.get(`${DEFAULT_URL}/category/${categoryId}`)
