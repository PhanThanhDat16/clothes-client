import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { showToast } from '@/components/Toast/showToast'
import { getProductDetail } from '@/apis/productService'
import { useCartStore } from '@/store/useCartStore'

interface CartItemProps {
  id: string
  size: string
  name: string
  price: number
  oldPrice?: number
  images: string
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({ id, size, name, price, oldPrice, images, quantity }) => {
  const { updateQuantity, remove } = useCartStore()
  const [stock, setStock] = useState<number>(Infinity)
  const [localQuantity, setLocalQuantity] = useState<number>(quantity)
  const [debouncedQuantity] = useDebounce(localQuantity, 400) // debounce 400ms

  // Lấy stock chỉ 1 lần duy nhất
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const product = await getProductDetail(id)
        const option = product?.data?.options?.find((opt: any) => opt.size === size)
        if (option) setStock(option.stockQuantity)
      } catch (error) {
        console.error('fetchStock error:', error)
      }
    }
    fetchStock()
  }, [id, size])

  // Khi quantity thay đổi (sau debounce) → update store
  useEffect(() => {
    if (debouncedQuantity !== quantity) {
      updateQuantity(id, size, debouncedQuantity)
    }
  }, [debouncedQuantity])

  const handleIncrease = () => {
    if (localQuantity + 1 > stock) {
      showToast.warning(`Hiện tại chỉ còn ${stock} sản phẩm.`)
      setLocalQuantity(stock)
      return
    }
    setLocalQuantity((prev) => prev + 1)
  }

  const handleDecrease = () => {
    if (localQuantity <= 1) return
    setLocalQuantity((prev) => prev - 1)
  }

  const handleInputChange = (value: string) => {
    let num = Number(value)
    if (isNaN(num) || num < 1) num = 1
    if (num > stock) {
      showToast.warning(`Hiện tại chỉ còn ${stock} sản phẩm.`)
      num = stock
    }
    setLocalQuantity(num)
  }

  const handleRemove = async () => {
    await remove(id, size)
  }

  return (
    <div className="flex gap-4 border-b pb-4">
      <a href={`/product/${id}`}>
        <img src={images} alt={name} className="w-[200px] h-[200px] object-cover rounded cursor-pointer" />
      </a>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="font-bold text-xl">{name}</p>
          <div className="text-right">
            <p className="font-bold text-base text-gray-800">{price.toLocaleString()}đ</p>
            {oldPrice && <p className="text-gray-400 line-through text-sm">{oldPrice.toLocaleString()}đ</p>}
          </div>
        </div>

        {size && <p className="text-sm text-gray-500 mt-2">Size: {size}</p>}

        <div className="flex items-center justify-between mt-10 mb-auto">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-white shadow-md">
            <button
              className="px-4 py-3 border-r border-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
              onClick={handleDecrease}
            >
              −
            </button>
            <input
              type="number"
              value={localQuantity}
              onChange={(e) => handleInputChange(e.target.value)}
              className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-gray-800 min-w-[60px] text-center border-gray-300"
            />
            <button
              className="px-4 py-3 border-l border-gray-300 hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-gray-700"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <button
            className="ml-4 flex justify-center items-center transition-colors rounded-full w-[40px] h-[40px] hover:bg-red-100 hover:text-red-600"
            onClick={handleRemove}
          >
            <i className="bx bx-trash text-2xl "></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
