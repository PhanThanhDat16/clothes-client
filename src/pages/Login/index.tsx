import { REGISTER_PAGE } from '@/constants'
import { useState, useCallback, useEffect } from 'react'
import { User, Settings, LogOut, Camera, Edit3, Save, X, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface User {
  data: {
    fullName: string
    email: string
    phone?: string
    avatar?: string
    type?: string
    createdAt?: string
    address?: string
  }
}
const fieldClass =
  'w-full p-3 rounded-lg text-gray-800 bg-gray-50 border-2 border-stone-100 border-transparent focus:border-[var(--primary-color)] focus:outline-none transition-colors'
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const API_BASE_LOGIN_GG = 'http://localhost:5000/api/auth/google'
  const API_USER = 'http://localhost:5000/api/users'
  const API_AUTH = 'http://localhost:5000/api/auth'
  const [editForm, setEditForm] = useState<User | null>(null)
  console.log(loading)
  // Simulate checking localStorage (in real app, use: localStorage.getItem('accessToken'))
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_USER}/profile`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setUser(data) // ✅ lấy user từ `data`
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          localStorage.removeItem('accessToken')
        }
      } catch (error) {
        console.error(error)
        localStorage.removeItem('accessToken')
        setUser(null)
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])
  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(user)
    }
    setIsEditing(!isEditing)
  }
  const handleGoogleLogin = useCallback(() => {
    window.location.href = API_BASE_LOGIN_GG
  }, [])

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')

      const logOut = await fetch(`${API_AUTH}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })
      const data = await logOut.json()
      if (data) {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        setIsLoggedIn(false)
        window.location.href = '/login'
      } else {
        console.error('Logout failed:', data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  if (isLoggedIn) {
    return (
      <div className="p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 ">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
            <div className="bg-[var(--primary-color)] p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Trang cá nhân</h1>
                <button
                  onClick={handleLogout}
                  className="flex text-lg font-semibold items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-gray-200 rounded-2xl shadow-xl p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100">
                    <img
                      src={
                        user?.data.avatar
                          ? user?.data.avatar
                          : 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                    <Camera size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">{user?.data.fullName}</h2>
                <p className="text-gray-600 mb-4">{user?.data.email}</p>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    <span>Tham gia {user?.data.createdAt?.split('T')[0]}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={16} />
                    <span>{user?.data.address ? user?.data.address : '..........'}</span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-[var(--primary-color)] hover:opacity-95 transition-transform duration-300 hover:-translate-y-0.5  text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                  <Settings size={16} />
                  Cài đặt hồ sơ
                </button>
              </div>
            </div>

            {/* Info and Edit Panel */}
            <div className="md:col-span-2">
              <div className="bg-gray-200 rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h3>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleEditToggle}
                          className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[var(--primary-color)] hover:opacity-85 transition-transform duration-300 hover:-translate-y-0.5 text-white p-2 rounded-lg"
                      >
                        <Edit3 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User size={16} />
                      Họ và tên
                    </label>
                    <input type="text" value={editForm?.data.fullName} className={fieldClass} disabled={!isEditing} />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail size={16} />
                      Email
                    </label>
                    <input type="email" disabled={!isEditing} value={editForm?.data.email} className={fieldClass} />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone size={16} />
                      Số điện thoại
                    </label>
                    <input type="tel" className={fieldClass} disabled={!isEditing} />
                  </div>

                  {/* Location Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin size={16} />
                      Địa chỉ
                    </label>
                    <input disabled={!isEditing} type="text" value={editForm?.data.address} className={fieldClass} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Login Form (original design enhanced)
  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[var(--primary-color)] p-6 text-center">
          <h1 className="text-3xl text-white font-bold">Đăng nhập</h1>
          <p className="text-blue-100 mt-2">Chào mừng bạn trở lại!</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <input
              className="w-full border-2 border-gray-200 p-4 rounded-lg focus:border-[var(--primary-color)] focus:outline-none transition-colors"
              type="email"
              placeholder="E-mail"
            />
          </div>

          <div>
            <input
              className="w-full border-2 border-gray-200 p-4 rounded-lg focus:border-[var(--primary-color)] focus:outline-none transition-colors"
              type="password"
              placeholder="Mật khẩu"
            />
          </div>

          <div className="text-right">
            <a href="#" className="hover:underline text-[var(--primary-color)] text-sm font-semibold">
              Quên mật khẩu?
            </a>
          </div>

          <button className="w-full bg-[var(--primary-color)] hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5">
            Đăng nhập
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Hoặc</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full inline-flex justify-center items-center px-4 py-3 border-2 border-gray-50 rounded-lg bg-white  text-gray-700 hover:bg-gray-300 hover:border-gray-300 transition-all duration-200 font-medium"
          >
            <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Đăng nhập với Google
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <NavLink to={REGISTER_PAGE} className="text-[var(--primary-color)] text-base hover:underline font-bold">
              Đăng ký ngay
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
