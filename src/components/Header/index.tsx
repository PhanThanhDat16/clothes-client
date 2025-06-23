/// Bo Suu Tap
// const ListNameCollection = [
//   { id: 1, name: 'Summer Manor' },
//   { id: 2, name: 'The Real Jeans' },
//   { id: 3, name: 'Sánh Đôi' },
//   { id: 4, name: 'Từ Nhà Ra Phố' },
//   { id: 5, name: 'Chill Thé' },
//   { id: 6, name: 'Smart F' },
//   { id: 7, name: 'Social Circle' }
// ]

import { COLLECTION_PAGE, CONTACT_PAGE, HOME_PAGE, LOGIN_PAGE, NEWIN_PAGE } from '@/constants'
import { NavLink } from 'react-router-dom'
import { ModalProduct } from './ModalProduct'

const Header = () => {
  return (
    <div className="w-[90%] max-w-[1600px] grid grid-cols-3 gap-6 mx-auto h-24 items-center">
      <NavLink to={HOME_PAGE} className="w-[160px] col-start-1">
        <img src="https://polomanor.vn/cdn/shop/files/Polomanor-logo-main-color.png" alt="" />
      </NavLink>
      <div className="col-start-2 w-full flex justify-center text-blue-950 font-bold">
        {/* PAGE NEW IN */}
        <NavLink to={NEWIN_PAGE} className="px-2 hover:opacity-80">
          Hàng mới
        </NavLink>

        <ModalProduct />

        <NavLink to={COLLECTION_PAGE} className="px-2 flex hover:opacity-80">
          Bộ sưu tập
          <i className="bx bx-chevron-down"></i>
        </NavLink>

        <NavLink to={CONTACT_PAGE} className="px-2 hover:opacity-80">
          Liên hệ
        </NavLink>
      </div>
      <div className="col-start-3 text-end text-blue-950 text-2xl">
        <button>
          <i className="bx bx-search px-2"></i>
        </button>
        <NavLink to={LOGIN_PAGE}>
          <i className="bx bx-user px-2"></i>
        </NavLink>
        <button>
          <i className="bx bx-cart px-2"></i>
        </button>
      </div>
    </div>
  )
}

export default Header
