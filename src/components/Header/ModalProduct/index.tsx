import { PRODUCT_PAGE } from '@/constants'
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
const listNameProduceShirt = [
  { id: 1, name: 'Polo' },
  { id: 2, name: 'T-shirt' },
  { id: 3, name: 'SơMi' }
]
const listNameProduceShort = [
  { id: 1, name: 'Quần Dài' },
  { id: 2, name: 'Quần Short' },
  { id: 3, name: 'Quần Jean' }
]

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
    <div className="z-10">
      <NavLink
        to={PRODUCT_PAGE}
        className={`flex px-2 hover:opacity-80`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <p className="text-xl">SẢN PHẨM</p>
        <ChevronDown className="w-[20px] h-[20px] mt-1" />
      </NavLink>

      <div
        className={`absolute inset-x-0 h-auto mt-10 bg-white border ${isModalOpen ? '' : 'hidden'}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="w-[90%] max-w-[1600px] mx-auto py-10 items-center text-[var(--primary-color)]">
          <ul className="flex justify-between">
            <li className="font-normal grid gap-3">
              <a href="#" className="text-xl hover:underline">
                Áo
              </a>
              <div className="row-start-2 flex flex-col gap-2">
                {listNameProduceShirt.map((item) => (
                  <a href="#" className="opacity-80 hover:opacity-100" key={item.id}>
                    {item.name}
                  </a>
                ))}
              </div>
            </li>
            <li className="font-normal grid gap-3">
              <a href="#" className="text-xl hover:underline">
                Quần
              </a>
              <div className="row-start-2 flex flex-col gap-2">
                {listNameProduceShort.map((item) => (
                  <a href="#" className="opacity-80 hover:opacity-100" key={item.id}>
                    {item.name}
                  </a>
                ))}
              </div>
            </li>
            <li className="font-normal">
              <a href="#" className="text-xl hover:underline">
                Phụ kiện
              </a>
            </li>
            <li className="font-normal">
              <a href="#" className="text-xl hover:underline">
                Bán chạy nhất
              </a>
            </li>
            <li className="font-normal grid">
              <a href="#" className="text-2xl hover:underline">
                Tất cả sản phẩm
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
