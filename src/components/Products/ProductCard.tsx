// src/components/ProductCard.tsx

import React, { useState } from 'react'

export interface Product {
  id: string
  handle: string
  name: string
  image: {
    src: string
    alt: string
  }
  price: {
    sale?: string
    original: string
  }
  savings?: string
  isNew?: boolean
  colors?: {
    name: string
    className: string
  }[]
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

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '')

  return (
    <div className="group w-[382px] h-[679px] flex-shrink-0">
      <div className="relative overflow-hidden bg-white text-[#23314B] rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start space-y-2">
          {product.isNew && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">New Product</span>
          )}
          {product.savings && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
              Tiết kiệm {product.savings}
            </span>
          )}
        </div>

        {/* Product Image and Quick Buy */}
        <div className="relative">
          <a href={`/products/${product.handle}`}>
            <img
              src={product.image.src}
              alt={product.image.alt}
              width="1200"
              height="1800"
              className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-80 aspect-[2/3]"
              loading="lazy"
            />
          </a>
          <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6">
            <button className="hidden w-full items-center justify-center rounded-md bg-gray-800 bg-opacity-90 py-2.5 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-opacity-100 md:flex">
              + Thêm nhanh
            </button>
            <button className="flex w-full items-center justify-center rounded-md bg-gray-800 bg-opacity-90 py-2.5 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-opacity-100 md:hidden">
              <QuickBuyCartIcon />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 text-left">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="font-bold text-base md:text-lg">
                <a href={`/products/${product.handle}`} className="hover:underline">
                  {product.name}
                </a>
              </h3>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-red-600 font-bold">{product.price.sale}</span>
                <span className="text-gray-500 line-through text-sm">{product.price.original}</span>
              </div>
            </div>
            {/* Color Swatches */}
            {product.colors && (
              <div className="flex flex-shrink-0 space-x-1.5 mt-1">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-5 w-5 rounded-full border-2 border-gray-800 transition-all shadow-[0_0_0_1px_#d1d5db] ${color.className} ${
                      selectedColor === color.name ? 'ring-2 ring-offset-2 ring-offset-white ring-blue-500' : ''
                    }`}
                    aria-label={`Select color ${color.name}`}
                  />
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
