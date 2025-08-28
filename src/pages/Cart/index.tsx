import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HOME_PAGE } from '@/constants'
import { Trash2 } from 'lucide-react'

type CartItem = {
  id: number
  name: string
  size?: string
  color?: string
  price: number
  oldPrice?: number
  qty: number
  img: string
  gift?: boolean
}

type SuggestItem = {
  id: number
  name: string
  price: number
  oldPrice?: number
  img: string
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Áo Polo Nam Symbol',
    size: 'M',
    color: 'Be-Black',
    price: 287000,
    oldPrice: 350000,
    qty: 1,
    img: '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200'
  },
  {
    id: 2,
    name: 'Áo thun nam trẻ trung',
    price: 299000,
    size: 'M',
    color: 'Be',
    oldPrice: 350000,
    qty: 1,
    img: '//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200',
    gift: true
  }
]

const suggestItems: SuggestItem[] = [
  {
    id: 101,
    name: 'Áo Polo Nam Travis',
    price: 305000,
    oldPrice: 500000,
    img: '//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200'
  },
  {
    id: 102,
    name: 'Áo Polo Basic',
    price: 250000,
    oldPrice: 400000,
    img: '//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200'
  }
]

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart)

  const handleQtyChange = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
    )
  }

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
      {/* Left: Cart Items */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">
          GIỎ HÀNG <span className="text-xl font-semibold text-gray-600">({cartItems.length} sản phẩm)</span>
        </h1>
        <p className="flex items-center gap-2 mb-4 text-sm text-gray-700">
          🚚{' '}
          <span className="font-medium text-stone-700 text-base">
            Chúc mừng! Bạn đã được <strong> Miễn phí </strong> vận chuyển
          </span>
        </p>
        <span className="bg-green-700 rounded-lg mb-4 block py-1"></span>
        <div className="space-y-6 mt-10">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              {/* Ảnh sản phẩm */}
              <img src={item.img} alt={item.name} className="w-[200px] h-[200px] object-cover rounded" />

              {/* Nội dung sản phẩm */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Phần trên: tên + giá */}
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xl">{item.name}</p>
                  <div className="text-right">
                    <p className="font-bold text-base text-gray-800">{item.price.toLocaleString()}đ</p>
                    {item.oldPrice && (
                      <p className="text-gray-400 line-through text-sm">{item.oldPrice.toLocaleString()}đ</p>
                    )}
                  </div>
                </div>

                {/* Phần giữa: size/màu (nếu có) */}
                {item.size && (
                  <p className="text-sm text-gray-500 mt-2">
                    Size: {item.size} / Màu: {item.color}
                  </p>
                )}

                {/* Phần dưới: số lượng + xoá */}
                <div className="flex items-center justify-between mt-10 mb-auto">
                  <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-white shadow-md">
                    <button
                      className="px-4 py-3 border-r border-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
                      onClick={() => handleQtyChange(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-gray-800 min-w-[60px] text-center border-gray-300">
                      {item.qty || 0}
                    </span>
                    <button
                      className="px-4 py-3 border-l border-gray-300 hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
                      onClick={() => handleQtyChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Nút xoá */}
                  <button className="ml-4 text-red-500 hover:text-red-700" onClick={() => handleRemove(item.id)}>
                    <Trash2 className="w-[22px] h-[22px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div>
        <div className="border border-gray-600 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-base">Tổng phụ</span>
            <span className="font-medium">{subtotal.toLocaleString()}đ</span>
          </div>
          <button className="w-full bg-gray-900 text-white py-4 rounded-md flex items-center justify-center gap-2">
            🔒 Thanh toán
          </button>
        </div>

        {/* Suggest Items */}
        <div className="mt-6 border p-5 bg-gray-200 rounded-lg border-gray-300">
          <h3 className="text-lg text-stone-700 mb-3">You may also like...</h3>
          <div className="grid grid-cols-2 gap-4">
            {suggestItems.map((s) => (
              <div key={s.id} className="border rounded-md p-2">
                <img src={s.img} alt={s.name} className="w-full h-32 object-cover rounded" />
                <p className="mt-2 text-base font-bold">{s.name}</p>
                <p className="text-sm font-medium">{s.price.toLocaleString()}đ</p>
                {s.oldPrice && <p className="text-xs line-through text-gray-400">{s.oldPrice.toLocaleString()}đ</p>}
                <button className="text-blue-600 text-sm mt-1 underline">Xem nhanh</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavLink to={HOME_PAGE} className="text-base text-black">
        ＜ Tiếp tục mua sắm
      </NavLink>
    </div>
  )
}

export default Cart
