import type { IProduct } from '@/models/product'
import { CartItem, useCartStore } from '@/store/useCartStore'
import { showToast } from '../Toast/showToast'
import { useCartStoreUser } from '@/store/useCartStoreUser'
import { CartItemAdd } from '@/models/cartItem'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

const QuickBuyCartIcon = () => (
  <svg role="presentation" fill="none" strokeWidth="1" focusable="false" width="16" height="14" viewBox="0 0 16 14">
    <path
      d="M7.75 4.75H2.283a1 1 0 0 0-.97 1.244l1.574 6.25a1 1 0 0 0 .97.756h7.787a1 1 0 0 0 .97-.756l1.573-6.25a1 1 0 0 0-.97-1.244H7.75Zm0 0V1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)

export interface ProductCardProps {
  item: IProduct
}

const ProductCard = ({ item }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('')

  const { user } = useAuthStore() //lấy user từ store (không cần gọi API trong Card)
  const { addItem } = useCartStoreUser()
  const { addItemlocal } = useCartStore()

  const productAddLocal: CartItem = {
    id: item._id,
    image: item.images[0] || item.images[1],
    name: item.name,
    oldPrice: item.oldPrice,
    description: item.description,
    price: item.price,
    quantity: 1,
    size: selectedSize
  }
  const productAddByUser: CartItemAdd = {
    itemId: item._id,
    size: selectedSize,
    quantity: 1
  }

  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        showToast.error('Vui lòng chọn size trước khi thêm sản phẩm!')
        return
      }

      if (user) {
        await addItem(user.data._id, productAddByUser)
      } else {
        addItemlocal(productAddLocal)
      }
      showToast.success('Đã thêm sản phẩm vào giỏ hàng!')
    } catch (error) {
      console.error('Error', error)
    }
  }

  const costSaving = item.oldPrice - item.price
  return (
    <div className="group flex-shrink-0">
      <div className="relative overflow-hidden bg-white text-[#23314B] rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start space-y-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">New Product</span>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
            Tiết kiệm {costSaving}₫
          </span>
        </div>

        <div className="relative">
          <a href={`/product/${item._id}`}>
            <img
              src={item.images[0]}
              width="1200"
              height="1800"
              className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-80 aspect-[2/3]"
              loading="lazy"
            />
          </a>
          <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6">
            <button
              onClick={handleAddToCart}
              className="hidden w-full items-center justify-center rounded-md bg-gray-800 bg-opacity-90 py-2.5 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-opacity-100 md:flex"
            >
              + Thêm nhanh
            </button>
            <button className="flex w-full items-center justify-center rounded-md bg-gray-800 bg-opacity-90 py-2.5 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-opacity-100 md:hidden">
              <QuickBuyCartIcon />
            </button>
          </div>
        </div>

        <div className="p-4 text-left">
          <div className="items-start">
            <h3 className="font-bold text-base md:text-lg overflow-y-hidden">
              <a href={`/product/${item._id}`} className="hover:underline">
                {item.name}
              </a>
            </h3>

            <div className="mt-3 flex flex-wrap gap-2 text-base font-medium">
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-red-600 font-bold">{item.price.toLocaleString()}₫</span>
                <span className="text-gray-500 line-through text-xs">{item.oldPrice.toLocaleString()}₫</span>
              </div>
              {item.options.map((opt) => (
                <button
                  onClick={() => setSelectedSize(opt.size)}
                  key={opt.size}
                  className={`
                    px-3 rounded-lg border-2 transition
                    ${
                      opt.stockQuantity > 0
                        ? `
                          border-gray-300 text-gray-700 hover:border-black hover:bg-gray-200
                          ${selectedSize === opt.size ? 'border-blue-600 bg-blue-100 text-blue-800 ring-2 ring-blue-400' : ''}
                        `
                        : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    }
                  `}
                  disabled={opt.stockQuantity <= 0}
                >
                  {opt.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
