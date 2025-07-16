import React from 'react'
import ProductCard, { type Product } from './ProductCard'

const bestSellerProducts: Product[] = [
  {
    id: '9903737241906',
    handle: 'ao-thun-neo',
    name: 'Áo Thun Neo',
    image: {
      src: '//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200',
      alt: 'Áo Thun Nam Neo Polomanor Màu Trắng'
    },
    price: {
      sale: '269.000₫',
      original: '450.000₫'
    },
    savings: '181.000₫',
    colors: [
      { name: 'Trắng', className: 'bg-white' },
      { name: 'Đen', className: 'bg-black' }
    ]
  },
  {
    id: '9903737176370',
    handle: 'ao-thun-lio',
    name: 'Áo Thun Lio',
    image: {
      src: '//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200',
      alt: 'Áo Thun Nam Lio Polomanor Màu Kem Nhạt'
    },
    price: {
      sale: '269.000₫',
      original: '450.000₫'
    },
    savings: '181.000₫',
    colors: [
      { name: 'Be', className: 'bg-[#f2eeeb]' },
      { name: 'Trắng', className: 'bg-white' }
    ]
  },
  {
    id: '9903734817074',
    handle: 'ao-polo-rum',
    name: 'Áo Polo Rum',
    image: {
      src: '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200',
      alt: 'Áo Polo Nam Rum Polomanor Màu Kem Navy'
    },
    price: {
      sale: '339.000₫',
      original: '500.000₫'
    },
    savings: '161.000₫',
    colors: [
      { name: 'Kem Navy', className: 'bg-[#e4e2de]' },
      { name: 'Xám Nhạt', className: 'bg-gray-300' }
    ]
  },
  {
    id: '9903734882610',
    handle: 'ao-polo-marco',
    name: 'Áo Polo Marco',
    image: {
      src: '//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200',
      alt: 'Áo Polo Nam Marco Polomanor Màu Cafe'
    },
    price: {
      sale: '339.000₫',
      original: '500.000₫'
    },
    savings: '161.000₫',
    colors: [
      { name: 'CaPhe', className: 'bg-[#b0a395]' },
      { name: 'Kem Nhạt', className: 'bg-[#f7f4eb]' }
    ]
  }
]

const ChevronRightIcon = () => (
  <svg role="presentation" focusable="false" width="5" height="8" viewBox="0 0 5 8">
    <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
  </svg>
)

const BestSellerProductsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 text-[#23314B] w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[1600px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Sản Phẩm Bán Chạy</h2>
          <a
            href="/collections/best-sellers"
            className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>Xem toàn bộ sản phẩm</span>
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <ChevronRightIcon />
            </span>
          </a>
        </header>

        {/* Products Grid */}
        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-x-6">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellerProductsSection
