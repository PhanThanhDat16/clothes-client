import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, BadgeCheck, LogOut, Package, User2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ORDER_PAGE, PROFILE_PAGE } from '@/constants'
import { User } from '@/pages/Profile'

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const API_USER = 'http://localhost:5000/api/users'

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
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
        } else {
          localStorage.removeItem('accessToken')
        }
      } catch (error) {
        console.error(error)
        // localStorage.removeItem('accessToken')
        setUser(null)
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
              //onClick={}
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
