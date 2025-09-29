import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, BadgeCheck, LogOut, Package, User2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ORDER_PAGE, PROFILE_PAGE } from '@/constants'
import { User } from '@/models/user'
import { showToast } from '../Toast/showToast'
import { getProfile } from '@/apis/user'
import { logOut } from '@/apis/authService'

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken') || ''

      const handlerLogout = logOut(refreshToken)
      if (!handlerLogout) {
        showToast.error('Bạn không thể đăng xuất ra khỏi')
        return
      }
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')

      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getProfile()
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="relative inline-block text-left">
      {/* Nút chính */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
      >
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="text-left">
          <p className="text-sm font-medium">{user?.data.fullName}</p>
          <p className="text-xs text-gray-500">{user?.data.email}</p>
        </div>
        {open ? (
          <ChevronUp className="ml-2 w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Menu Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition z-50">
          <div className="py-1">
            <NavLink
              to={PROFILE_PAGE}
              className={
                'flex items-center gap-2 px-4 py-2 text-base text-stone-800 hover:bg-stone-200 hover:text-gray-900'
              }
            >
              <User2 className="w-4 h-4 text-stone-800" />
              Tài Khoản
            </NavLink>
            <NavLink
              to={ORDER_PAGE}
              className="flex items-center gap-2 px-4 py-2 text-base text-stone-800 hover:bg-stone-200 hover:text-gray-900"
            >
              <Package className="w-4 h-4 text-stone-800" />
              Đơn Mua
            </NavLink>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-base text-stone-800 hover:bg-stone-200 hover:text-gray-900"
            >
              <BadgeCheck className="w-4 h-4 text-stone-800" />
              Chính Sách
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full  items-center gap-2 px-4 py-2 text-base text-stone-800 hover:bg-stone-200 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 text-stone-800" />
              Đăng Xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
