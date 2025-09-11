import { getAllProduct } from '@/apis/productService'
import ProductCard from '@/components/ProductCard'
import { type IProduct } from '@/models/product'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

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
const Banner = () => {
  const [products, setProducts] = useState<IProduct[] | []>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPage] = useState(1)
  console.log(page)

  const handleGetAllProduct = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllProduct(params)
      if (!res || !res.data) return
      setProducts(res.data.data)
      setTotalPage(res.data.totalPages)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAllProduct()
  }, [])

  const handleClickPage = (event: { selected: number }) => {
    setPage(event.selected + 1)
  }
  if (loading) return <p>Đang tải sản phẩm...</p>
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
                <div key={idx} className="flex py-2">
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
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard item={product} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <ReactPaginate
              breakLabel="..."
              pageCount={totalPages}
              nextLabel=">"
              onPageChange={handleClickPage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              previousLabel="<"
              containerClassName="flex gap-1"
              pageClassName="px-4 py-1 border border-gray-200 rounded-md hover:opacity-90"
              activeClassName="bg-[var(--primary-color)] text-white text-base"
              previousClassName="px-3 py-1 border rounded-md hover:bg-gray-200 text-base"
              nextClassName="px-3 py-1 border rounded-md hover:bg-gray-200 text-base"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner
