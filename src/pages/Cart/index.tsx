import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HOME_PAGE, NEWIN_PAGE } from '@/constants'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useCartStoreUser } from '@/store/useCartStoreUser'
import { showToast } from '@/components/Toast/showToast'

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
  const localCart = useCartStore()
  const userCart = useCartStoreUser()
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const userId = localStorage.getItem('userId')
  // Lấy profile nếu có token
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLoadingUser(true)
      ;(async () => {
        try {
          setIsLoadingUser(true)
        } catch (error) {
          console.error('Error fetching user profile:', error)
        } finally {
          setIsLoadingUser(false)
        }
      })()
    } else {
      localCart.loadCart()
    }
  }, [])

  useEffect(() => {
    if (userId) {
      console.log('Fetching user cart for ID:', userId) // Debug log
      userCart.fetchCartUser(userId)
    } else if (!isLoadingUser && !userId) {
      console.log('Loading local cart') // Debug log
      localCart.loadCart()
    }
  }, [isLoadingUser])

  // Chọn data source với safe checks
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'))
  const cartItems = isLoggedIn ? userCart.cartUser || [] : localCart.cart
  const totalBill = isLoggedIn ? userCart.totalPriceUser() : localCart.TotalBill()
  const totalQuantity = isLoggedIn ? userCart.totalQuantityUser() : localCart.TotalItems()
  const savingCost = isLoggedIn ? userCart.SavingCostUser() : localCart.Savingcost()

  // Safe handlers with proper null checks
  const handleIncrease = async (item: any) => {
    if (isLoggedIn && userId) {
      await userCart.updateItemUser(userId, {
        itemId: item.itemId || item.id,
        size: item.size,
        quantity: 1
      })
    } else {
      localCart.increaseQty(item.id, item.size)
    }
  }

  const handleDecrease = async (item: any) => {
    if (item.quantity <= 1) {
      showToast.error('Số lượng sản phẩm hiện tại là 1 không thể giảm nữa!!')
      return
    }
    if (isLoggedIn && userId) {
      await userCart.updateItemUser(userId, {
        itemId: item.itemId || item.id,
        size: item.size,
        quantity: -1
      })
    } else {
      localCart.decreaseQty(item.id, item.size)
    }
  }

  const handleRemove = async (item: any) => {
    if (isLoggedIn && userId) {
      await userCart.removeItemUser(userId, item.itemId || item.id, item.size)
    } else {
      localCart.removeItem(item.id, item.size)
    }
  }
  const handlePayment = async () => {
    if (isLoggedIn && userId) {
      await userCart.payMentByUser(userId, cartItems as any, null)
      showToast.success('Thanh toán thành công!')
    } else {
      showToast.error('Vui lòng đăng nhập để tiến hành thanh toán!')
    }
  }

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center items-center min-h-[400px]">
        <div>Loading...</div>
      </div>
    )
  }

  // Error state for user cart
  if (isLoggedIn && userCart.error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {userCart.error}
          <button onClick={() => userCart.clearError()} className="ml-4 underline hover:no-underline">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
      {/* Left: Cart Items */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">
          GIỎ HÀNG <span className="text-xl font-semibold text-gray-600">({totalQuantity} sản phẩm)</span>
        </h1>

        {totalQuantity > 0 ? (
          <>
            {/* Free shipping info */}
            <p className="flex items-center gap-2 mb-4 text-base text-gray-700">
              🚚{' '}
              {totalBill >= 500000 ? (
                <span className="font-medium text-stone-700">
                  Chúc mừng! Bạn đã được <strong>Miễn phí</strong> vận chuyển
                </span>
              ) : (
                <span className="font-medium text-stone-700">
                  Bạn cần mua thêm <strong>{(500000 - totalBill).toLocaleString()}₫</strong> để được miễn phí vận chuyển
                </span>
              )}
            </p>

            {/* Progress bar */}
            <span
              className={`rounded-lg block py-1 transition-all duration-300 ${
                totalBill >= 500000 ? 'bg-green-700' : 'bg-orange-500'
              }`}
              style={{
                width: totalBill >= 500000 ? '742px' : `${Math.min(742, (totalBill / 500000) * 742)}px`
              }}
            ></span>

            {/* Cart list */}
            <div className="space-y-6 mt-10 mb-5">
              {cartItems.map((item: any, index: number) => {
                const displayItem = isLoggedIn ? item?.item : item // Safe access

                // Skip rendering if displayItem is null/undefined
                if (!displayItem) {
                  console.warn('Invalid cart item:', item)
                  return null
                }

                // Generate safe key
                const itemKey = `${item?.itemId || item?.id || index}-${item?.size || 'no-size'}`

                return (
                  <div key={itemKey} className="flex gap-4 border-b pb-4">
                    <img
                      src={displayItem?.images || displayItem?.image || '/placeholder-image.jpg'}
                      alt={displayItem?.name || 'Product'}
                      className="w-[200px] h-[200px] object-cover rounded cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg'
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-xl">{displayItem?.name || 'Unknown Product'}</p>
                        <div className="text-right">
                          <p className="font-bold text-base text-gray-800">
                            {(displayItem?.price || 0).toLocaleString()}đ
                          </p>
                          {displayItem?.oldPrice && (
                            <p className="text-gray-400 line-through text-sm">
                              {displayItem.oldPrice.toLocaleString()}đ
                            </p>
                          )}
                        </div>
                      </div>
                      {item?.size && <p className="text-sm text-gray-500 mt-2">Size: {item.size}</p>}

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-10 mb-auto">
                        <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-white shadow-md">
                          <button
                            className="px-4 py-3 border-r hover:bg-red-500 hover:text-white font-bold"
                            onClick={() => handleDecrease(item)}
                            disabled={userCart.loading}
                          >
                            −
                          </button>
                          <span className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 font-bold min-w-[60px] text-center">
                            {item?.quantity || 0}
                          </span>
                          <button
                            className="px-4 py-3 border-l hover:bg-green-500 hover:text-white font-bold"
                            onClick={() => handleIncrease(item)}
                            disabled={userCart.loading}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="ml-4 flex justify-center items-center rounded-full w-[40px] h-[40px] hover:bg-red-100 hover:text-red-600"
                          onClick={() => handleRemove(item)}
                          disabled={userCart.loading}
                        >
                          <Trash2 className="w-[22px] h-[22px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <NavLink to={HOME_PAGE} className="text-base text-black">
              ＜ Tiếp tục mua sắm
            </NavLink>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[20vh]">
            <p className="text-xl mb-6">Giỏ hàng của bạn đang trống</p>
            <NavLink
              to={NEWIN_PAGE}
              className="flex items-center justify-center w-[280px] h-[55px] bg-[var(--primary-color)] text-lg text-white rounded-lg"
            >
              Tiếp tục mua sắm
            </NavLink>
          </div>
        )}
      </div>

      {/* Right: Summary */}
      {totalQuantity > 0 && (
        <div className="mt-3">
          <div className="border border-gray-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Tóm tắt đơn hàng</h2>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-base text-stone-600">Tổng hóa đơn</span>
              <span className="font-bold text-base">{totalBill.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-base text-stone-600">Tiết kiệm</span>
              <span className="font-bold text-base text-red-500 line-through">{savingCost.toLocaleString()} ₫</span>
            </div>
            <button
              className="w-full font-semibold bg-gray-900 text-white py-4 rounded-md hover:opacity-90 disabled:opacity-50"
              disabled={userCart.loading}
              onClick={handlePayment}
            >
              {userCart.loading ? 'Đang xử lý...' : '🔒 Thanh toán'}
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
      )}
    </div>
  )
}

export default Cart
