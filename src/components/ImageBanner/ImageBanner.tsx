import React from 'react'

const ImageBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 h-full">
        <picture>
          <img
            src="https://polomanor.vn/cdn/shop/files/8_1_1_1.jpg?v=1671680555&width=2000"
            alt="Polo Manor Brand Image"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-white">
        <div className="max-w-4xl text-center">
          <div className="space-y-6">
            <p className="text-lg font-bold tracking-wide uppercase">Định vị thương hiệu</p>

            <h1
              className="font-bold"
              style={{
                color: '#fff',
                fontFamily: '-apple-system',
                fontSize: '40px',
                lineHeight: '44px',
                margin: '32px 0 0',
                textAlign: 'center'
              }}
            >
              New class of casual Polo
            </h1>

            <div
              style={{
                color: '#fff',
                fontFamily: '-apple-system',
                lineHeight: '25.6px',
                textAlign: 'center'
              }}
              className="text-lg max-w-2xl mx-auto space-y-4"
            >
              <p>
                Polomanor định vị sự khác biệt đến từ những chiếc áo Polo đời thường hằng ngày, mỗi sản phẩm mang đủ 3
                yếu tố:
              </p>
              <p>Dễ phối - Sang trọng - Tiện lợi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageBanner
