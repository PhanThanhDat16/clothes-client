import React, { useState } from 'react'

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
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage
    return categories.slice(startIndex, startIndex + itemsPerPage)
  }

  const goToPrevious = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : totalPages - 1)
  }

  const goToNext = () => {
    setCurrentPage(currentPage < totalPages - 1 ? currentPage + 1 : 0)
  }

  return (
    <section className="py-16 bg-white">
      <div className="w-[1600px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Danh Mục Sản Phẩm</h2>

        <div className="relative">
          {/* Dòng duy nhất, cuộn nếu cần */}
          <div className="flex gap-8 overflow-x-hidden">
            {getCurrentItems().map((category, idx) => (
              <a href={category.href} key={idx} className="flex-shrink-0 w-[280px] group">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <div className="text-white text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      Xem thêm →
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Prev/Next Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === currentPage ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CategoriesSection
