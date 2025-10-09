import { HOME_PAGE, REGISTER_PAGE } from '@/constants'
import { useState, useCallback, useEffect } from 'react'
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
import Profile from '../Profile'

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

  const handleSignIn: SubmitHandler<IAuthForm> = async (values: IAuthForm) => {
    try {
      const res = await logIn(values)
      const { accessToken, refreshToken } = res.data
      console.log(res.data.dataToken.id)

      localStorage.setItem('userId', res.data.dataToken.id)

      if (!accessToken || !refreshToken) {
        throw new Error('Token empty')
      }

      toast.success(`Login successfull`, {
        pauseOnHover: false,
        autoClose: 3000
      })

      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      // Dispatch custom event to notify Header component
      window.dispatchEvent(new CustomEvent('loginStateChanged'))

      // Navigate to home page
      navigate(HOME_PAGE)

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
  const [loading, setLoading] = useState(true)
  const API_BASE_LOGIN_GG = 'http://localhost:5000/api/auth/google'

  console.log(loading)
  // Simulate checking localStorage (in real app, use: localStorage.getItem('accessToken'))
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    } else {
      setIsLoggedIn(true)
      setLoading(true)
    }
  }, [])

  const handleGoogleLogin = useCallback(() => {
    window.location.href = API_BASE_LOGIN_GG
  }, [])

  if (isLoggedIn) {
    return <Profile />
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
