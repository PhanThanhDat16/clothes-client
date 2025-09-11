import { getAllCategory } from '@/apis/categories'
import ProductCard from '@/components/ProductCard'
import { ICategory } from '@/models/categories'
import { IProduct } from '@/models/product'
import { useEffect, useState } from 'react'

// interface PropsCategories {
//   nameCate: string
//   countCate: number
// }

// const Categories: PropsCategories[] = [
//   {
//     nameCate: 'Áo Khoác',
//     countCate: 1
//   },
//   {
//     nameCate: 'Áo Thun',
//     countCate: 17
//   },
//   {
//     nameCate: 'Jeans',
//     countCate: 1
//   },
//   {
//     nameCate: 'Pants',
//     countCate: 6
//   },
//   {
//     nameCate: 'Phụ kiện',
//     countCate: 9
//   },
//   {
//     nameCate: 'Polo',
//     countCate: 92
//   },
//   {
//     nameCate: 'Short',
//     countCate: 6
//   },
//   {
//     nameCate: 'Sơmi',
//     countCate: 9
//   }
// ]

const newProducts: IProduct[] = [
  {
    _id: '9903737241906',
    name: 'Áo Thun Neo',
    description: 'Áo Thun Nam Neo Polomanor Màu Trắng',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200'],
    options: [
      { size: 'M', stockQuantity: 10 },
      { size: 'L', stockQuantity: 15 },
      { size: 'XL', stockQuantity: 8 }
    ]
  },
  {
    _id: '9903737176370',
    name: 'Áo Thun Lio',
    description: 'Áo Thun Nam Lio Polomanor Màu Kem Nhạt',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200'],
    options: [
      { size: 'M', stockQuantity: 12 },
      { size: 'L', stockQuantity: 18 },
      { size: 'XL', stockQuantity: 6 }
    ]
  },
  {
    _id: '9903734817074',
    name: 'Áo Polo Rum',
    description: 'Áo Polo Nam Rum Polomanor Màu Kem Navy',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200'],
    options: [
      { size: 'M', stockQuantity: 8 },
      { size: 'L', stockQuantity: 14 },
      { size: 'XL', stockQuantity: 10 }
    ]
  },
  {
    _id: '9903734882610',
    name: 'Áo Polo Marco',
    description: 'Áo Polo Nam Marco Polomanor Màu Cafe',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200'],
    options: [
      { size: 'M', stockQuantity: 9 },
      { size: 'L', stockQuantity: 16 },
      { size: 'XL', stockQuantity: 7 }
    ]
  }
]

const ProductPage = () => {
  const [categories, setCategories] = useState<ICategory[] | []>([])

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllCategory(params)
      if (!res || !res.data) return
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAll()
  }, [])

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
              {categories.map((item) => (
                <div className="flex py-2" key={item._id}>
                  <input type="checkbox" name="" id="" />
                  <p className="px-2">{item.name}</p>
                  <p>(số lượng)</p>
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

export default ProductPage
