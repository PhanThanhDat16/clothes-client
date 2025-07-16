import React from 'react'

const ExploreSection: React.FC = () => {
  const images = [
    {
      src: '//polomanor.vn/cdn/shop/files/polomanor-gram-1551041818521505792_007eab80-b634-4686-9a11-de8a4883b72c.jpg?v=1671091632&width=411',
      alt: 'Kết nối Instagram Polomanor'
    },
    {
      src: '//polomanor.vn/cdn/shop/files/ong-chu-polo-1551042005788790784.jpg?v=1671091656&width=412',
      alt: 'Kênh TikTok Ông Chú Polo'
    },
    {
      src: '//polomanor.vn/cdn/shop/files/nghien-polo-1551042039641018368.jpg?v=1671091701&width=411',
      alt: 'Fanpage Polomanor Official'
    }
  ]

  return (
    <div className="section section-blends section-full py-8">
      <div className="w-[1600px] mx-auto">
        <div className="section-stack space-y-6">
          <header className="section-header text-start">
            <h2 className="text-2xl font-bold">Khám phá</h2>
          </header>

          {/* Dùng justify-between để ảnh dàn đều */}
          <div className="flex justify-between items-start">
            {images.map((img, index) => (
              <div key={index} className="w-[411px] h-[598px] overflow-hidden rounded">
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreSection
