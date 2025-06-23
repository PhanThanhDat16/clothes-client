import { PRODUCT_PAGE } from '@/constants'
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

// const listNameProduceShirt = [
//   { id: 1, name: 'Polo' },
//   { id: 2, name: 'T-shirt' },
//   { id: 3, name: 'SơMi' }
// ]
// const listNameProduceShort = [
//   { id: 1, name: 'Quần Dài' },
//   { id: 2, name: 'Quần Short' },
//   { id: 3, name: 'Quần Jean' },
// ]

export const ModalProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsModalOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsModalOpen(false), 500) // ⏱ delay 500ms
  }

  return (
    <div className="relative group">
      <NavLink
        to={PRODUCT_PAGE}
        className={`flex px-2 hover:opacity-80`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <p>Sản phẩm</p>
        <i className="bx bx-chevron-down"></i>
      </NavLink>

      <div
        className={`fixed left-0 right-0 h-60 z-auto mt-10 bg-white border ${isModalOpen ? '' : 'hidden'}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="grid grid-cols-[15%_15%_15%_15%_1fr] w-[90%] max-w-[1600px] mx-auto py-10 items-center text-blue-950">
          <ul className="flex flex-auto gap-[5%] w-full">
            <li className="text-2xl font-normal hover:bg-slate-500">Áo</li>
            <li className="text-2xl font-normal hover:bg-slate-500">Quần</li>
            <li className="text-2xl font-normal hover:bg-slate-500">Phụ kiện</li>
            <li className="text-2xl font-normal hover:bg-slate-500">Bán chạy nhất</li>
            <li className="text-2xl font-normal hover:bg-slate-500">Tất cả sản phẩm</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
