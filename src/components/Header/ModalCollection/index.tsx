import { COLLECTION_PAGE } from '@/constants'
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

// Bo Suu Tap
const ListNameCategory = [
  { id: 1, name: 'Áo Thun' },
  { id: 2, name: 'Áo Khoác' },
  { id: 3, name: 'Jeans' },
  { id: 4, name: 'Pants' },
  { id: 5, name: 'Polo' },
  { id: 6, name: 'Short' },
  { id: 7, name: 'Sơmi' },
  { id: 8, name: 'Phụ kiện' }
]

export const ModalCollection = () => {
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
    <div>
      <NavLink
        to={COLLECTION_PAGE}
        className={`flex px-2 hover:opacity-80`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <p>Danh Mục</p>
        <i className="bx bx-chevron-down"></i>
      </NavLink>

      <div
        className={`absolute inset-x-0 h-auto mt-10 bg-white border ${isModalOpen ? '' : 'hidden'}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="w-[90%] max-w-[1600px] mx-auto py-10 text-[var(--primary-color)] flex justify-between">
          <ul className="flex flex-auto flex-wrap gap-[4rem]">
            {ListNameCategory.map((item) => (
              <li key={item.id} className="font-normal grid">
                <a href="#" className="text-xl hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-5">
            <img
              src="https://polomanor.vn/cdn/shop/files/summer-manor-collection-app.webp?v=1749184462"
              alt=""
              className="w-[200px]"
            />
            <img
              src="https://polomanor.vn/cdn/shop/files/summer-manor-collection-app.webp?v=1749184462"
              alt=""
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
