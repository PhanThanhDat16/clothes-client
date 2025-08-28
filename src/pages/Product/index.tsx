import ProductCard, { Product } from '@/components/ProductCard'

interface PropsCategories {
  nameCate: string
  countCate: number
}

const Categories: PropsCategories[] = [
  {
    nameCate: 'Áo Khoác',
    countCate: 1
  },
  {
    nameCate: 'Áo Thun',
    countCate: 17
  },
  {
    nameCate: 'Jeans',
    countCate: 1
  },
  {
    nameCate: 'Pants',
    countCate: 6
  },
  {
    nameCate: 'Phụ kiện',
    countCate: 9
  },
  {
    nameCate: 'Polo',
    countCate: 92
  },
  {
    nameCate: 'Short',
    countCate: 6
  },
  {
    nameCate: 'Sơmi',
    countCate: 9
  }
]

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

const ProductPage = () => {
  return (
    <div className="w-full">
      <div className="relative max-h-[400px] overflow-hidden">
        <img
          src="https://polomanor.vn/cdn/shop/collections/BannerWeb_AlbumSaiGon.jpg?v=1734486682&width=1080"
          alt=""
          className="h-full w-full object-cover filter "
        />
      </div>

      <div className="p-8 flex gap-8">
        <div className="w-[20%]">
          <div className="border-black border-b text-base pb-10">
            <button>
              <i className="bx bx-filter"></i>
            </button>
          </div>

          <div>
            <div className="flex justify-between pt-10 pb-3">
              <p className="font-semibold text-base">Phân loại</p>
              <button className="ml-2 hover:bg-blue-950 hover:text-white rounded-full bg-gray-300">
                <i className="bx bx-chevron-down p-1"></i>
              </button>
            </div>
            <div className="border-b border-black pb-5">
              {Categories.map((item, idx) => (
                <div className="flex py-2">
                  <input type="checkbox" name="" id="" />
                  <p className="px-2" key={idx}>
                    {item.nameCate}
                  </p>
                  <p>({item.countCate})</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-5 border-b border-black">
              <p className="font-semibold">Sẵn Hàng </p>
              <input type="checkbox" name="" id="" />
            </div>

            <div className="pb-5 border-b border-black flex justify-between pt-10">
              <p className="font-semibold text-base">Giá</p>
              <button className="ml-2 hover:bg-blue-950 hover:text-white rounded-full bg-gray-300">
                <i className="bx bx-chevron-down p-1"></i>
              </button>
            </div>
            <div className="grid grid-cols-3 py-5">
              <input className="border border-gray-500 py-2" type="text" />
              <p className="text-center py-2">tới</p>
              <input className="border border-gray-500 py-2" type="text" />
            </div>
          </div>
        </div>

        <div className="w-[80%]">
          <div className="justify-end flex pb-10">
            <p className="font-semibold text-base">Sắp xếp theo:</p>
            <button className="ml-2 hover:bg-blue-950 hover:text-white rounded-full bg-gray-300">
              <i className="bx bx-chevron-down p-1"></i>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
