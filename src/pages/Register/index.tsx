import Field from '@/components/common/Field'
import Input from '@/components/common/Input'
import InputPassword from '@/components/common/Input/InputPassword'
import Button from '@/components/common/Button'
import { LOGIN_PAGE } from '@/constants'
import { NavLink, useNavigate } from 'react-router-dom'
import { EButtonType } from '@/models/common'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { register } from '@/apis/userService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthSignUpForm } from '@/models/auth'
import { toast } from 'react-toastify'

const schema = yup.object({
  fullName: yup.string().required('The fullName field is required.'),
  email: yup.string().required('The email field is required.').email('Enter email, please!'),
  phone: yup
    .string()
    .required('The phone field is required.')
    .matches(/^[0-9]{9,11}$/, 'Phone number must be 9–11 digits'),
  password: yup.string().required('The password field is required.').min(5, 'At least 5 characters.')
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema),
  defaultValues: {
    fullName: '',
    email: '',
    phone: '',
    password: ''
  }
}

const Register = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<IAuthSignUpForm>(defaultForm)

  const handleSignUp: SubmitHandler<IAuthSignUpForm> = async (values: IAuthSignUpForm) => {
    try {
      const dataValues: IAuthSignUpForm = {
        ...values,
        type: 'user'
      }
      await register(dataValues)

      toast.success(`SignUp successfull`, {
        pauseOnHover: false,
        autoClose: 3000
      })

      navigate(LOGIN_PAGE)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[var(--primary-color)] p-6 text-center">
          <h1 className="text-3xl text-white font-bold">Đăng ký</h1>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Input
              type="fullName"
              name="fullName"
              className={`!h-12 ${errors.fullName ? 'border-red-500' : ''}`}
              control={control}
              label="FullName"
            />
            {errors.fullName && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.fullName.message}</p>}
          </Field>
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
          <Field>
            <Input
              type="phone"
              name="phone"
              className={`!h-12 ${errors.phone ? 'border-red-500' : ''}`}
              control={control}
              label="phone"
            />
            {errors.phone && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.phone.message}</p>}
          </Field>
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
          <div>
            <Button
              type={EButtonType.SUBMIT}
              text="Create Account"
              className="mt-5"
              isSubmitting={isSubmitting}
              isDisabled={isSubmitting}
              onClick={() => {}}
            />
          </div>

          <div className="text-center">
            <NavLink to={LOGIN_PAGE} className="text-[var(--primary-color)] text-base hover:underline font-bold">
              Đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
