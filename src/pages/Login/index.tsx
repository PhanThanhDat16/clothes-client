import { HOME_PAGE, PROFILE_PAGE, REGISTER_PAGE } from '@/constants'
import { useState, useCallback, useEffect } from 'react'
import { User, Settings, LogOut, Camera, Edit3, Save, X, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from '@/models/auth'
import { toast } from 'react-toastify'
import { EButtonType } from '@/models/common'
import Button from '@/components/common/Button'
import { logIn } from '@/apis/authService'
import google from '@/assets/google.png'
import Field from '@/components/common/Field'
import Input from '@/components/common/Input'
import InputPassword from '@/components/common/Input/InputPassword'

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

const schema = yup.object({
  email: yup.string().required('The email field is required.').email('Enter email, please!'),
  password: yup.string().required('The password field is required.').min(5, 'At least 5 characters.')
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
    password: ''
  }
}

const fieldClass =
  'w-full p-3 rounded-lg text-gray-800 bg-gray-50 border-2 border-stone-100 border-transparent focus:border-[var(--primary-color)] focus:outline-none transition-colors'

const Login = () => {
  const navigate = useNavigate()

  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<IAuthForm>(defaultForm)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      navigate(PROFILE_PAGE, { replace: true })
    }
  }, [navigate])

  const handleSignIn: SubmitHandler<IAuthForm> = async (values: IAuthForm) => {
    try {
      const res = await logIn(values)
      const { accessToken, refreshToken } = res.data

      if (!accessToken || !refreshToken) {
        throw new Error('Token empty')
      }

      toast.success(`Login successfull`, {
        pauseOnHover: false,
        autoClose: 3000
      })

      // logining  → HOME_PAGE
      localStorage.setItem('accessToken', accessToken)
      navigate(HOME_PAGE)

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      if (rememberMe) {
        localStorage.setItem('email', values.email)
        localStorage.setItem('password', values.password)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        localStorage.removeItem('rememberMe')
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
    if (e.target.checked) {
      localStorage.setItem('email', getValues('email'))
      localStorage.setItem('password', getValues('password'))
    } else {
      localStorage.setItem('email', '')
      localStorage.setItem('password', '')
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || ''
    const savedPassword = localStorage.getItem('password') || ''
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'

    if (savedRememberMe) {
      setValue('email', savedEmail)
      setValue('password', savedPassword)
    }
  }, [setValue])

  //gg
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
        //Công test
        // if (response.status === 401) {
        //   // Token hết hạn hoặc không hợp lệ → logout
        //   localStorage.removeItem("accessToken");
        //   setIsLoggedIn(false);
        //   setUser(null);
        // } else if (!response.ok) {
        //   // Lỗi khác (500, 404, network...) → không xóa token
        //   console.error("Fetch user error:", response.status);
        //   setIsLoggedIn(false);
        // } else {
        //   const data = await response.json();
        //   setUser(data);
        //   setIsLoggedIn(true);
        // }
      } catch (error) {
        console.error(error)
        // localStorage.removeItem('accessToken')
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

        <form className="p-6 space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <Field>
            <Input
              type="email"
              name="email"
              className={`!h-12 ${errors.email ? 'border-red-500' : ''}`}
              control={control}
              label="Email"
            />
            {errors.email && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.email.message}</p>}
          </Field>
          {/* <div>
            <input
              className="w-full border-2 border-gray-200 p-4 rounded-lg focus:border-[var(--primary-color)] focus:outline-none transition-colors"
              type="password"
              placeholder="Mật khẩu"
            />
          </div> */}

          <Field>
            <InputPassword
              type="password"
              name="password"
              className={errors.password ? 'border-red-500' : ''}
              control={control}
              label="Password"
            />
            {errors.password && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.password.message}</p>}
          </Field>

          <div className="flex items-center justify-between mb-6">
            <label htmlFor="remember-me" className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                name="remember-me"
                id="remember-me"
                onChange={handleRememberMe}
              />
              <span className="text-xs text-heading">Remember Me</span>
            </label>
            <NavLink
              to="/forget-password"
              className="text-xs font-medium capitalize transition cursor-pointer text-primary2 hover:underline"
            >
              Forget Password
            </NavLink>
          </div>

          <Button
            type={EButtonType.SUBMIT}
            text="Đăng nhập"
            isSubmitting={isSubmitting}
            isDisabled={isSubmitting}
            onClick={() => {}}
          />

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
            <img src={google} alt="Zalo" className="w-8 rounded-full mx-2" />
            Đăng nhập với Google
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <NavLink to={REGISTER_PAGE} className="text-[var(--primary-color)] text-base hover:underline font-bold">
              Đăng ký ngay
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
