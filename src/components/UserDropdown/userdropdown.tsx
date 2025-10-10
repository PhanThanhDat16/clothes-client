import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ORDER_PAGE, PROFILE_PAGE } from '@/constants'
import { showToast } from '../Toast/showToast'
import { logOut } from '@/apis/authService'
import { useAuthStore } from '@/store/authStore'

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const { user, clearUser } = useAuthStore()
  const dropdownRef = useRef<HTMLDivElement>(null) // theo dõi vùng dropdown

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken') || ''
      const handlerLogout = await logOut(refreshToken)
      if (!handlerLogout) {
        showToast.error('Bạn không thể đăng xuất ra khỏi')
        return
      }
      localStorage.clear()

      clearUser()
      window.dispatchEvent(new CustomEvent('loginStateChanged'))
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    }
  }

  // đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left px-3" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
      >
        <img src={user?.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <div className="text-left">
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        {open ? (
          <i className="bx bx-chevron-up text-lg text-gray-500"></i>
        ) : (
          <i className="bx bx-chevron-down text-lg text-gray-500"></i>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition z-50">
          <div className="py-1">
            <NavLink to={PROFILE_PAGE} className="flex items-center gap-2 px-4 py-2 text-base hover:bg-stone-200">
              <i className="bx bx-user text-stone-800 text-lg"></i>
              Tài Khoản
            </NavLink>
            <NavLink to={ORDER_PAGE} className="flex items-center gap-2 px-4 py-2 text-base hover:bg-stone-200">
              <i className="bx bx-package text-stone-800 text-lg"></i>
              Đơn Mua
            </NavLink>
            {/* <a href="#" className="flex items-center gap-2 px-4 py-2 text-base hover:bg-stone-200">
              <i className="bx bx-badge-check text-stone-800 text-lg"></i>
              Chính Sách
            </a> */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-base hover:bg-stone-200"
            >
              <i className="bx bx-arrow-out-left-square-half text-stone-800 text-lg"></i>
              Đăng Xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
