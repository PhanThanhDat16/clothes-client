// src/components/NewProductsSection.tsx

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ProductCard from '../../ProductCard'
import { useEffect, useState } from 'react'
import { getAllProduct } from '@/apis/productService'
import { IProduct } from '@/models/product'

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
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fectProducts = async () => {
      setLoading(true)
      const res = await getAllProduct()
      if (res && res.data) {
        setProducts(res.data.data)
      }
      setLoading(false)
    }
    fectProducts()
  }, [])

  if (loading) return <p>Đang tải sản phẩm...</p>
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
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard item={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default NewProductsSection
