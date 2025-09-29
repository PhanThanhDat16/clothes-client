import { useEffect, useState } from 'react'
import { User2, Settings, Camera, Edit3, Save, X, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import type { User } from '@/models/user'
import { getProfile } from '@/apis/user'

const fieldClass =
  'w-full p-3 rounded-lg text-gray-800 bg-gray-50 border-2 border-stone-100 border-transparent focus:border-[var(--primary-color)] focus:outline-none transition-colors'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getProfile()
        if (response && response.data) {
          setUser(response)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
    getProfileData()
  }, [])
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
                      <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
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
                    <User2 size={16} />
                    Họ và tên
                  </label>
                  <input type="text" value={user?.data.fullName} className={fieldClass} disabled={!isEditing} />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail size={16} />
                    Email
                  </label>
                  <input type="email" value={user?.data.email} disabled={!isEditing} className={fieldClass} />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone size={16} />
                    Số điện thoại
                  </label>
                  <input type="tel" value={user?.data.phone} className={fieldClass} disabled={!isEditing} />
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} />
                    Địa chỉ
                  </label>
                  <input disabled={!isEditing} value={user?.data.address} type="text" className={fieldClass} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
