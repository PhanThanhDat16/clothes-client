import { useEffect, useState } from 'react'
import { User2, Settings, Camera, Edit3, Save, X, Mail, Phone, Calendar } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateUser, uploadAvatar } from '@/apis/userService'
import { toast } from 'react-toastify'
import { User } from '@/models/user'

interface IDefaultForm extends User {
  email: string
  fullName: string
  phone?: string
  avatar?: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('required'),
  fullName: yup.string().max(100, 'Maximum 100 characters').required('required'),
  phone: yup.string().max(11, 'Phone number maximum 11 characters').optional(),
  avatar: yup.string().optional()
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema) as any,
  defaultValues: {
    email: '',
    fullName: '',
    phone: '',
    avatar: ''
  }
}

const fieldClass =
  'w-full p-3 rounded-lg text-gray-800 bg-gray-50 border-2 border-stone-100 border-transparent focus:border-[var(--primary-color)] focus:outline-none transition-colors'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user, fetchUser } = useAuthStore()
  const [avatar, setAvatar] = useState<string | ''>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IDefaultForm>(defaultForm)

  useEffect(() => {
    fetchUser()
    setAvatar(user?.avatar ?? '')
  }, [fetchUser, user?.avatar])

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        avatar: user.avatar
      })
    }
  }, [user, reset])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user?._id) return
    // Hiển thị tạm thời
    const reader = new FileReader()
    reader.onloadend = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
    try {
      if (user?._id) {
        const res = await uploadAvatar(file)
        await updateUser(user._id, {
          ...user,
          avatar: res.data.image
        })
        toast.success('Cập nhật ảnh đại diện thành công!')
        fetchUser()
      }
    } catch (err) {
      toast.error('Có lỗi khi cập nhật ảnh!')
      console.error(err)
    }
  }

  const onSubmit: SubmitHandler<IDefaultForm> = async (data) => {
    try {
      if (user?._id) {
        await updateUser(user._id, data)
        toast.success('Cập nhật thông tin thành công!')
        setIsEditing(false)
        fetchUser()
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật thông tin!')
      console.error(error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (user) {
      reset({
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        avatar: user.avatar
      })
    }
  }

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-[var(--primary-color)] p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Trang cá nhân</h1>
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
                      avatar
                        ? avatar
                        : 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
                    }
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatarInput"
                  className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors"
                >
                  <Camera size={16} />
                </label>
                <input id="avatarInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">{user?.fullName}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  <span>Tham gia {user?.createdAt?.split('T')[0]}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-[var(--primary-color)] hover:opacity-95 transition-transform duration-300 hover:-translate-y-0.5  text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                <Settings size={16} />
                Đổi mật khẩu
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
                      <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors disabled:opacity-60"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-[var(--primary-color)] hover:opacity-85 transition-transform duration-300 hover:-translate-y-0.5 text-white p-2 rounded-lg"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User2 size={16} />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className={`${fieldClass} ${errors.fullName ? 'border-red-500' : ''}`}
                    disabled={!isEditing}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`${fieldClass} ${errors.email ? 'border-red-500' : ''}`}
                    disabled={!isEditing}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone size={16} />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`${fieldClass} ${errors.phone ? 'border-red-500' : ''}`}
                    disabled={!isEditing}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
