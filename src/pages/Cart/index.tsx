import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { PRODUCT_PAGE } from '@/constants'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/authStore'
import { showToast } from '@/components/Toast/showToast'
import { ICart } from '@/models/cartItem'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'

type SuggestItem = {
  id: number
  name: string
  price: number
  oldPrice?: number
  img: string
}

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
  const { load, itemsForDisplay, totalPrice, totalQuantity, savingCost, increase, decrease, remove, payMentByUser } =
    useCartStore()
  const { user, fetchUser } = useAuthStore()
  const { socket } = useStoreSocketIO((state) => state)

  useEffect(() => {
    fetchUser()
    load()
  }, [])

  const items = itemsForDisplay()
  const totalBill = totalPrice()
  const totalQuantityCart = totalQuantity()

  const handleIncrease = async (itemId: string, size: string) => {
    await increase(itemId, size)
    load()
  }
  const handleDecrease = async (itemId: string, size: string) => {
    await decrease(itemId, size)
    load()
  }
  const handleRemove = async (itemId: string, size: string) => {
    await remove(itemId, size)
    load()
  }

  const handlePayment = async () => {
    if (!user) {
      showToast.error('Vui lòng đăng nhập để tiến hành thanh toán!')
      return
    }

    if (items.length === 0) {
      showToast.error('Giỏ hàng trống!')
      return
    }

    try {
      const cartItems: ICart[] = items.map((item) => ({
        _id: item.id,
        cartId: '',
        itemId: item.id,
        size: item.size,
        quantity: item.quantity,
        item: {
          name: item.name,
          images: item.images,
          price: item.price,
          oldPrice: item.oldPrice
        }
      }))

      await payMentByUser(user.data._id, cartItems, null)
      if (socket) {
        socket.emit('createOrder', { userId: user.data._id, userName: user.data.fullName })
      }
      showToast.success('Thanh toán thành công!')
    } catch (error) {
      console.error('Payment error:', error)
      showToast.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
      {/* Left: Cart Items */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">
          GIỎ HÀNG <span className="text-xl font-semibold text-gray-600">({totalQuantityCart} sản phẩm)</span>
        </h1>
        <div>
          {totalQuantityCart > 0 ? (
            <>
              {/* Thông báo freeship */}
              <p className="flex items-center gap-2 mb-4 text-base text-gray-700">
                🚚{' '}
                {totalBill >= 500000 ? (
                  <span className="font-medium text-stone-700 text-base">
                    Chúc mừng! Bạn đã được <strong>Miễn phí</strong> vận chuyển
                  </span>
                ) : (
                  <span className="font-medium text-stone-700 text-base">
                    Bạn cần mua thêm <strong>{500000 - totalBill}₫</strong> để được miễn phí vận chuyển
                  </span>
                )}
              </p>

              {/* Progress bar */}
              <span
                className={`rounded-lg block py-1 transition-all duration-300 ${
                  totalBill >= 500000 ? 'bg-green-700' : 'bg-orange-500'
                }`}
                style={{
                  width: totalBill >= 500000 ? '742px' : `${742 - (500 - totalBill / 1000)}px`
                }}
              ></span>

              {/* Danh sách sản phẩm */}
              <div className="space-y-6 mt-10 mb-5">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-[200px] h-[200px] object-cover rounded cursor-pointer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-xl">{item.name}</p>
                        <div className="text-right">
                          <p className="font-bold text-base text-gray-800">{item.price.toLocaleString()}đ</p>
                          {item.oldPrice && (
                            <p className="text-gray-400 line-through text-sm">{item.oldPrice.toLocaleString()}đ</p>
                          )}
                        </div>
                      </div>

                      {item.size && <p className="text-sm text-gray-500 mt-2">Size: {item.size}</p>}

                      <div className="flex items-center justify-between mt-10 mb-auto">
                        <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-white shadow-md">
                          <button
                            className="px-4 py-3 border-r border-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
                            onClick={() => handleDecrease(item.id, item.size)}
                          >
                            −
                          </button>
                          <span className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-gray-800 min-w-[60px] text-center border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            className="px-4 py-3 border-l border-gray-300 hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
                            onClick={() => handleIncrease(item.id, item.size)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="ml-4 flex justify-center items-center transition-colors rounded-full w-[40px] h-[40px] hover:bg-red-100 hover:text-red-600"
                          onClick={() => handleRemove(item.id, item.size)}
                        >
                          <i className="bx bx-trash text-2xl "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <NavLink to={PRODUCT_PAGE} className="text-base text-black">
                ＜ Tiếp tục mua sắm
              </NavLink>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[20vh]">
              <p className="text-xl mb-6">Giỏ hàng của bạn đang trống</p>
              <NavLink
                to={PRODUCT_PAGE}
                className="flex items-center justify-center w-[280px] h-[55px] bg-[var(--primary-color)] p-6 text-lg text-white rounded-lg"
              >
                Tiếp tục mua sắm
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Right: Summary */}
      {totalQuantityCart > 0 && (
        <div className="mt-3">
          <div className="border border-gray-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Tóm tắt đơn hàng</h2>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-base text-stone-600">Tổng hóa đơn</span>
              <span className="font-bold text-base">{totalBill.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-base text-stone-600">Tiết kiệm</span>
              <span className="font-bold text-sm text-red-500 line-through mt-1">
                {savingCost().toLocaleString()} ₫
              </span>
            </div>

            {/* Nút Thanh toán: xét user ngay tại đây */}
            <button
              onClick={handlePayment}
              className="w-full font-semibold bg-gray-900 text-white py-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            >
              {user ? '🔓️ Thanh toán' : '🔒 Đăng nhập để thanh toán'}
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
                  {/* <button className="text-blue-600 text-sm mt-1 underline">Xem nhanh</button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
