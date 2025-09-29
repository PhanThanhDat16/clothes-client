'use client'
import { getProfile } from '@/apis/user'
import { useEffect, useRef } from 'react' // Thêm useRef
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
  const navigate = useNavigate()
  const processed = useRef(false)
  const fetchUserProfile = async () => {
    try {
      const profile = await getProfile()
      if (profile) {
        localStorage.setItem('userId', profile.data._id)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  useEffect(() => {
    if (processed.current) return // Bỏ qua nếu đã xử lý
    // Lấy token từ URL
    const params = new URLSearchParams(window.location.search)

    const accessToken = params.get('accessToken')
    const refreshToken = params.get('refreshToken')

    console.log('Token received:', accessToken)
    if (accessToken && refreshToken) {
      // Lưu token vào localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      fetchUserProfile()
      processed.current = true // Chuyển hướng về trang chủ
      navigate('/', { replace: true })
    } else {
      // Nếu không có token thì về login
      processed.current = true // Vẫn đánh dấu để tránh lặp
      navigate('/login?error=true', { replace: true })
    }
  }, [navigate])
  return `<p>Đang xử lý đăng nhập...</p>`
}
export default AuthSuccess
