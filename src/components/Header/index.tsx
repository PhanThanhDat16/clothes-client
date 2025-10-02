import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { CART_PAGE, CONTACT_PAGE, HOME_PAGE, LOGIN_PAGE, NEWIN_PAGE, SEARCH_PAGE } from '@/constants'
import { ModalProduct } from './ModalProduct'
import { ModalCategory } from './ModalCategory'
import UserDropdown from '../UserDropdown/userdropdown'
import CartIcon from '../cart_badge'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/useCartStore'

const Header = () => {
  const { user, fetchUser } = useAuthStore()
  const { load, totalQuantity } = useCartStore()

  useEffect(() => {
    load()
  }, [user])

  useEffect(() => {
    fetchUser()

    const handleLoginStateChange = () => {
      fetchUser()
    }
    window.addEventListener('loginStateChanged', handleLoginStateChange)

    return () => {
      window.removeEventListener('loginStateChanged', handleLoginStateChange)
    }
  }, [fetchUser])
  const totalquantity = totalQuantity()

  return (
    <div className="w-[90%] max-w-[var(--max-width)] grid grid-cols-3 gap-6 mx-auto h-24 items-center">
      <NavLink to={HOME_PAGE} className="w-[160px] col-start-1">
        <img src="https://polomanor.vn/cdn/shop/files/Polomanor-logo-main-color.png" alt="" />
      </NavLink>

      <div className="col-start-2 w-full flex justify-center text-[var(--primary-color)] font-bold">
        {/* new in */}
        <NavLink to={NEWIN_PAGE} className="px-2 hover:opacity-80 text-xl">
          NEW IN
        </NavLink>

        <ModalProduct />
        <ModalCategory />

        <NavLink to={CONTACT_PAGE} className="px-2 hover:opacity-80 text-xl">
          LIÊN HỆ
        </NavLink>
      </div>
      <div className="col-start-3 text-end text-[var(--primary-color)] text-2xl">
        <button>
          <NavLink to={SEARCH_PAGE} className="bx bx-search px-2 mr-1 text-3xl"></NavLink>
        </button>
        <NavLink to={CART_PAGE}>
          <CartIcon count={totalquantity} />
        </NavLink>
        {user ? (
          <UserDropdown />
        ) : (
          <NavLink to={LOGIN_PAGE}>
            <i className="bx bx-user px-2 text-3xl"></i>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header
