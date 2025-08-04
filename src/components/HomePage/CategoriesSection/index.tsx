import { Swiper, SwiperSlide } from 'swiper/react'
import CategoriesCard from './CatergoriesCard'

const categories = [
  {
    name: 'Áo Polo',
    href: '/collections/ao-polo',
    img: '//polomanor.vn/cdn/shop/files/polotron.webp?v=1744617539&width=600'
  },
  {
    name: 'Áo Thun',
    href: '/collections/ao-thun',
    img: '//polomanor.vn/cdn/shop/files/MODELNENTRANG17.jpg?v=1697258446&width=600'
  },
  {
    name: 'Quần dài',
    href: '/collections/quan-dai',
    img: '//polomanor.vn/cdn/shop/files/MODELNENTRANG19.jpg?v=1697258468&width=600'
  },
  {
    name: 'Quần Short',
    href: '/collections/quan-short',
    img: '//polomanor.vn/cdn/shop/files/MODELNENTRANG2.jpg?v=1697258497&width=600'
  },
  {
    name: 'Áo Sơ Mi',
    href: '/collections/ao-so-mi',
    img: '//polomanor.vn/cdn/shop/files/so-mi.jpg?v=1697689898&width=600'
  },
  {
    name: 'Áo Khoác',
    href: '/collections/ao-khoac',
    img: '//polomanor.vn/cdn/shop/files/so-mi.jpg?v=1697689898&width=600'
  }
]

const CategoriesSection = () => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Danh Mục Sản Phẩm</h2>

        <div className="w-full">
          <Swiper grabCursor={true} spaceBetween={16} slidesPerView="auto">
            {categories.map((item, idx) => (
              <SwiperSlide key={item.name + idx} style={{ width: '250px' }}>
                <CategoriesCard name={item.name} href={item.href} img={item.img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default CategoriesSection
