import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CART_PAGE, CONTACT_PAGE, HOME_PAGE, LOGIN_PAGE, NEWIN_PAGE, SEARCH_PAGE } from '@/constants'
import { ModalProduct } from './ModalProduct'
import { ModalCategory } from './ModalCategory'
import UserDropdown from '../UserDropdown/userdropdown'
import CartIcon from '../cart_badge'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/useCartStore'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { INotification } from '@/models/notification'
import { getListNotification, readAllNotification } from '@/apis/notificationService'
import { formatDate } from '@/utils'

const Header = () => {
  const { user, fetchUser } = useAuthStore()
  const { load, totalQuantity } = useCartStore()
  const { socket } = useStoreSocketIO((state) => state)

  const [notiList, setNotiList] = useState<INotification[]>([])
  const [openNoti, setOpenNoti] = useState(false)
  const unreadCount = notiList.filter((n) => !n.isRead).length
  const notiRef = useRef<HTMLDivElement | null>(null)

  const totalquantity = totalQuantity()

  useEffect(() => {
    const init = async () => {
      await fetchUser()
    }
    init()

    const handleLoginStateChange = () => fetchUser()
    window.addEventListener('loginStateChanged', handleLoginStateChange)
    return () => window.removeEventListener('loginStateChanged', handleLoginStateChange)
  }, [fetchUser])

  useEffect(() => {
    if (user) {
      load()
      fetchNotifications()
    }
  }, [user])

  const handleReadAll = async () => {
    try {
      if (user) {
        await readAllNotification(user._id as string)
        await fetchNotifications()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNotifications = async () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      try {
        const res1 = await getListNotification(userId as string)
        setNotiList(res1.data)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('updateOrder', async () => {
        await fetchNotifications()
      })
    }
  }, [socket])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (notiRef.current && !notiRef.current.contains(target)) {
        setOpenNoti(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-[90%] max-w-[var(--max-width)] grid grid-cols-3 gap-6 mx-auto h-24 items-center relative">
      <NavLink to={HOME_PAGE} className="w-[160px] col-start-1">
        <img src="https://polomanor.vn/cdn/shop/files/Polomanor-logo-main-color.png" alt="" />
      </NavLink>

      <div className="col-start-2 w-full flex justify-center text-[var(--primary-color)] font-bold">
        <NavLink to={NEWIN_PAGE} className="px-2 hover:opacity-80 text-xl">
          NEW IN
        </NavLink>

        <ModalProduct />
        <ModalCategory />

        <NavLink to={CONTACT_PAGE} className="px-2 hover:opacity-80 text-xl">
          LIÊN HỆ
        </NavLink>
      </div>

      <div className="col-start-3 text-end text-[var(--primary-color)] text-2xl relative">
        <NavLink to={SEARCH_PAGE} className="bx bx-search px-2 text-3xl"></NavLink>

        {user && (
          <div ref={notiRef} className="inline-block relative">
            <button onClick={() => setOpenNoti(!openNoti)} className="relative">
              <i className="bx bx-bell px-2 text-3xl"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-0.5 transition-all duration-300 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {openNoti && (
              <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200 font-semibold flex justify-between">
                  <h3 className="text-xl">Thông báo</h3>
                  <button className="text-sm hover:underline" onClick={handleReadAll}>
                    Read all
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notiList.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/020/936/880/non_2x/notification-icon-for-your-website-design-logo-app-ui-free-vector.jpg"
                        alt=""
                        className="w-[100px] h-[100px] mx-auto mb-3"
                      />
                      Không có thông báo
                    </div>
                  ) : (
                    notiList.map((noti) => (
                      <button
                        key={noti._id}
                        className={`w-full text-left px-4 py-3 flex gap-3 items-center transition-colors ${
                          !noti.isRead ? '' : 'bg-white'
                        } hover:bg-gray-100`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 text-gray-600 text-xl">
                          <i className="bx bx-bell"></i>
                        </div>

                        <div className="flex flex-col text-left">
                          <span className="text-sm text-gray-800">{noti.message}</span>
                          <span className="text-xs text-gray-500">{formatDate(noti.createdAt)}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <NavLink to={CART_PAGE}>
          <CartIcon count={totalquantity} />
        </NavLink>

        {user ? <UserDropdown /> : <NavLink to={LOGIN_PAGE} className="bx bx-user px-2 text-3xl"></NavLink>}
      </div>
    </div>
  )
}

export default Header
