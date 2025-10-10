import { logOut } from '@/apis/authService'
import { LOGIN_PAGE } from '@/constants'

export const handleLogout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const email = localStorage.getItem('email')
  const pwd = localStorage.getItem('password')
  const rememberMe = localStorage.getItem('rememberMe')

  try {
    if (refreshToken) {
      await logOut(refreshToken)
    }
  } catch (error) {
    console.error('Failed to log out from server:', error)
  } finally {
    localStorage.clear()
    if (rememberMe === 'true' && email && pwd) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', pwd)
      localStorage.setItem('rememberMe', 'true')
    }
    // Thông báo cho các component khác thay đổi trạng thái đăng nhập
    window.dispatchEvent(new CustomEvent('loginStateChanged'))
    window.location.replace(LOGIN_PAGE)
  }
  // if (refreshToken) {
  //   await logOut(refreshToken)
  //   localStorage.clear()
  //   localStorage.setItem('email', email || '')
  //   localStorage.setItem('password', pwd || '')
  //   localStorage.setItem('rememberMe', rememberMe || '')

  //   // Dispatch custom event to notify Header component
  //   window.dispatchEvent(new CustomEvent('loginStateChanged'))

  //   location.replace(LOGIN_PAGE)
  // } else {
  //   localStorage.clear()
  //   // Dispatch custom event to notify Header component
  //   window.dispatchEvent(new CustomEvent('loginStateChanged'))
  // }

  // window.location.replace(LOGIN_PAGE)
}
