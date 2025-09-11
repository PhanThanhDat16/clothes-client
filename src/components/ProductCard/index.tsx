import { IProduct } from '@/models/product'
import { useCartStore } from '@/store/useCartStore'
import { useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  quantity: number
  size: string
  stock?: number
}

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
  product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.options?.[0]?.size || '')
  const [selectedStock, setSelectedStock] = useState(product.options?.[0]?.stockQuantity || 1)
  const { addItem } = useCartStore()

  const productAdd: CartItem = {
    id: product._id,
    name: product.name,
    price: product.price || 0,
    images: product.images, // lưu thành object
    quantity: 1,
    size: selectedSize,
    stock: selectedStock
  }

  return (
    <div className="group flex-shrink-0">
      <div className="relative overflow-hidden bg-white text-[#23314B] rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start space-y-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">New Product</span>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
            Tiết kiệm {product.oldPrice - product.price}
          </span>
        </div>

        <div className="relative">
          <a href={`/product/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.description}
              width="1200"
              height="1800"
              className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-80 aspect-[2/3]"
              loading="lazy"
            />
          </a>
          <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6">
            <button
              onClick={() => addItem(productAdd)}
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
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="font-bold text-base md:text-lg">
                <a href={`/product/${product._id}`} className="hover:underline">
                  {product.name}
                </a>
              </h3>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-red-600 font-bold">{product.price}</span>
                <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
              </div>
            </div>
            {product.options && (
              <div className="flex flex-shrink-0 space-x-1.5 mt-1">
                {product.options.map((item) => (
                  <button
                    key={item.size}
                    onClick={() => {
                      setSelectedSize(item.size)
                      setSelectedStock(item.stockQuantity)
                    }}
                    className={`px-2 py-1 text-xs border rounded transition-all ${
                      selectedSize === item.size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    aria-label={`Select size ${item.size}`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
