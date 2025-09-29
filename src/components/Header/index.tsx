import { CART_PAGE, CONTACT_PAGE, HOME_PAGE, LOGIN_PAGE, NEWIN_PAGE } from '@/constants'
import { NavLink } from 'react-router-dom'
import { ModalProduct } from './ModalProduct'
import { ModalCategory } from './ModalCategory'
import UserDropdown from '../UserDropdown/userdropdown'
import { useEffect, useState } from 'react'
import CartIcon from '../cart_badge'
import { useCartStore } from '@/store/useCartStore'
import { useCartStoreUser } from '@/store/useCartStoreUser'

const Header = () => {
  const [isCheckLogin, setIsChekLogin] = useState(false)
  const localCart = useCartStore()
  const userCart = useCartStoreUser()
  useEffect(() => {
    const checkLogin = () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          setIsChekLogin(false)
          return
        }
        setIsChekLogin(true)
      } catch (error) {
        console.error('Error', error)
      }
    }
    checkLogin()
  }, [])
  const totalQuantity = isCheckLogin ? userCart.totalQuantityUser() : localCart.TotalItems()
  return (
    <div className="w-[90%] max-w-[var(--max-width)] grid grid-cols-3 gap-6 mx-auto h-24 items-center">
      <NavLink to={HOME_PAGE} className="w-[160px] col-start-1">
        <img src="https://polomanor.vn/cdn/shop/files/Polomanor-logo-main-color.png" alt="" />
      </NavLink>
      <div className="col-start-2 w-full flex justify-center text-[var(--primary-color)] font-bold">
        {/* PAGE NEW IN */}
        <NavLink to={NEWIN_PAGE} className="px-2 hover:opacity-80 text-xl">
          HÀNG MỚI
        </NavLink>

        <ModalProduct />
        <ModalCategory />

        <NavLink to={CONTACT_PAGE} className="px-2 hover:opacity-80 text-xl">
          LIÊN HỆ
        </NavLink>
      </div>
      <div className="col-start-3 text-end text-[var(--primary-color)] text-2xl">
        <button>
          <i className="bx bx-search px-2 mr-1"></i>
        </button>
        <NavLink to={CART_PAGE}>
          <CartIcon count={totalQuantity} />
        </NavLink>
        {isCheckLogin ? (
          <UserDropdown />
        ) : (
          <NavLink to={LOGIN_PAGE}>
            <i className="bx bx-user px-2 mr-1"></i>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header
