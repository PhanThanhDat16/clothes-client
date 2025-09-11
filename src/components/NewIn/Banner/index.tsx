import ProductCard from '@/components/ProductCard'
import { IProduct } from '@/models/product'

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

const newProducts: IProduct[] = [
  {
    _id: '9903737241906',
    name: 'Áo Thun Neo',
    description: 'Áo Thun Neo',
    price: 269000,
    oldPrice: 450000,
    categoryId: '1',
    images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200'],
    options: [
      { size: 'M', stockQuantity: 10 },
      { size: 'L', stockQuantity: 10 },
      { size: 'XL', stockQuantity: 10 }
    ]
  }
]

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative max-h-[400px] overflow-hidden">
        <img
          src="https://polomanor.vn/cdn/shop/collections/PLM01983.jpg?v=1754277533&width=1080"
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
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
