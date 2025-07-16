import React from 'react'

interface MediaGridItem {
  id: string
  href: string
  image: string
  alt: string
  text?: string
  columnSpan: number
  rowSpan: number
}

const MediaGrid: React.FC = () => {
  const mediaItems: MediaGridItem[] = [
    {
      id: 'media-grid-item-1',
      href: '/pages/ve-chung-toi',
      image: 'https://polomanor.vn/cdn/shop/files/about-polomanor.png?v=1744616276&width=752',
      alt: 'Giới thiệu về Polomanor',
      text: 'Mỗi sản phẩm đến tay bạn là những chất xám và công sức của cả một tập thể phía sau',
      columnSpan: 2,
      rowSpan: 2
    },
    {
      id: 'media-grid-item-2',
      href: '/collections/tat-ca-san-pham',
      image: 'https://polomanor.vn/cdn/shop/files/IMG_97921.jpg?v=1737000965&width=1200',
      alt: 'Xem tất cả sản phẩm Polomanor',
      columnSpan: 1,
      rowSpan: 1
    },
    {
      id: 'media-grid-item-3',
      href: '/collections',
      image: 'https://polomanor.vn/cdn/shop/files/alo_alo1.jpg?v=1671679448&width=1080',
      alt: 'Xem tất cả sản phẩm Polomanor',
      columnSpan: 1,
      rowSpan: 1
    },
    {
      id: 'media-grid-item-4',
      href: '/pages/tuyen-dung-polomanor',
      image:
        'https://polomanor.vn/cdn/shop/files/305285072_136619802433240_8264298626722550243_n_3472b698-1d7b-4011-9519-a548db6ebf0c.jpg?v=1671679605&width=886',
      alt: 'Cơ hội làm việc cùng Polomanor',
      columnSpan: 2,
      rowSpan: 1
    }
  ]

  return (
    <section className="w-full py-8 px-4">
      <div className="w-[1600px] mx-auto">
        {/* Grid Layout theo kiểu ảnh mẫu */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          {/* Item 1 - Large left (2x2) */}
          <a
            href={mediaItems[0].href}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
              <img
                src={mediaItems[0].image}
                alt={mediaItems[0].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />

              {/* Text content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-md">
                    {mediaItems[0].text}
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* Item 2 - Top right */}
          <a
            href={mediaItems[1].href}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
              <img
                src={mediaItems[1].image}
                alt={mediaItems[1].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          </a>

          {/* Item 3 - Top far right */}
          <a
            href={mediaItems[2].href}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
              <img
                src={mediaItems[2].image}
                alt={mediaItems[2].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          </a>

          {/* Item 4 - Bottom right (spanning 2 columns) */}
          <a
            href={mediaItems[3].href}
            className="col-span-2 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
              <img
                src={mediaItems[3].image}
                alt={mediaItems[3].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default MediaGrid
