const ImageBanner = () => {
  return (
    <div className="h-[500px] inset-0 z-10 flex items-center justify-center text-white bg-[url(https://polomanor.vn/cdn/shop/files/8_1_1_1.jpg?v=1671680555&width=2000)]">
      <div className="max-w-2xl text-center space-y-6 tracking-wide">
        <p className="text-lg font-bold uppercase">Định vị thương hiệu</p>
        <h1 className="font-bold mt-8 text-5xl">New class of casual Polo</h1>
        <div className="text-lg space-y-4">
          <p>
            Polomanor định vị sự khác biệt đến từ những chiếc áo Polo đời thường hằng ngày, mỗi sản phẩm mang đủ 3 yếu
            tố:
          </p>
          <p>Dễ phối - Sang trọng - Tiện lợi</p>
        </div>
      </div>
    </div>
  )
}

export default ImageBanner
