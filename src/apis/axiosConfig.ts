import { handleLogout } from '@/store'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any'
  }
})

// Handle attach accessToken in headers
axiosConfig.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle accessToken and refreshToken expired
axiosConfig.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config
    // Check token expired
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { refreshToken }) // check again
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          // console.log(newAccessToken)
          localStorage.setItem('accessToken', newAccessToken)
          localStorage.setItem('refreshToken', newRefreshToken)

          return axiosConfig(originalRequest)
        } catch (error) {
          toast.error('Invalid Token', {
            pauseOnHover: false,
            autoClose: 3000
          })
          localStorage.clear()
          handleLogout()
          return Promise.reject(error)
        }
      }
    }

    if (error instanceof AxiosError) {
      const { message } = error.response?.data || { message: 'An unexpected error occurred.' }

      toast.error(message, {
        pauseOnHover: false,
        autoClose: 3000
      })
    } else {
      toast.error('Invalid Token', {
        pauseOnHover: false,
        autoClose: 3000
      })
    }

    return Promise.reject(error)
  }
)

export default axiosConfig
