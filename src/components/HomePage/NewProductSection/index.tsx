// src/components/NewProductsSection.tsx

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ProductCard from '../../ProductCard'
import { IProduct } from '@/models/product'

const newProducts: IProduct[] = [
  {
    _id: '9903737241906',
    name: 'Áo Thun Neo',
    description: 'Áo Thun Nam Neo Polomanor Màu Trắng',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200'],
    options: [
      { size: 'M', stockQuantity: 10 },
      { size: 'L', stockQuantity: 15 },
      { size: 'XL', stockQuantity: 8 }
    ]
  },
  {
    _id: '9903737176370',
    name: 'Áo Thun Lio',
    description: 'Áo Thun Nam Lio Polomanor Màu Kem Nhạt',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200'],
    options: [
      { size: 'M', stockQuantity: 12 },
      { size: 'L', stockQuantity: 18 },
      { size: 'XL', stockQuantity: 6 }
    ]
  },
  {
    _id: '9903734817074',
    name: 'Áo Polo Rum',
    description: 'Áo Polo Nam Rum Polomanor Màu Kem Navy',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200'],
    options: [
      { size: 'M', stockQuantity: 8 },
      { size: 'L', stockQuantity: 14 },
      { size: 'XL', stockQuantity: 10 }
    ]
  },
  {
    _id: '9903734882610',
    name: 'Áo Polo Marco',
    description: 'Áo Polo Nam Marco Polomanor Màu Cafe',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200'],
    options: [
      { size: 'M', stockQuantity: 9 },
      { size: 'L', stockQuantity: 16 },
      { size: 'XL', stockQuantity: 7 }
    ]
  }
]

const ChevronRightIcon = () => (
  <svg
    role="presentation"
    focusable="false"
    width="5"
    height="8"
    className="icon icon-chevron-right-small"
    viewBox="0 0 5 8"
  >
    <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
  </svg>
)

const NewProductsSection = () => {
  return (
    <section className="bg-gray-50 text-[#23314B] w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Sản Phẩm Mới</h2>
          <a
            href="/category/new-products-1"
            className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>Xem toàn bộ sản phẩm</span>
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <ChevronRightIcon />
            </span>
          </a>
        </header>

        <div className="w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{
              clickable: true
            }}
          >
            {newProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default NewProductsSection
