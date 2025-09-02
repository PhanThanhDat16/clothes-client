// src/components/NewProductsSection.tsx

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ProductCard, { type Product } from '../../ProductCard'

const newProducts: Product[] = [
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
    isNew: true,
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
    isNew: true,
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
    isNew: true
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
    isNew: true,
    colors: [
      { name: 'CaPhe', className: 'bg-[#b0a395]' },
      { name: 'Kem Nhạt', className: 'bg-[#f7f4eb]' }
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
              <SwiperSlide key={product.id}>
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
