import { getAllCategory } from '@/apis/categoriesService'
import { getAllProduct, getProductByCategoryId } from '@/apis/productService'
import ProductCard from '@/components/ProductCard'
import { ICategory } from '@/models/categories'
// import { type IProduct } from '@/models/product'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const NewInList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [productsData, setProductsData] = useState<{ data: [] }>({ data: [] })
  const [categories, setCategories] = useState<ICategory[] | []>([])
  const [loading, setLoading] = useState(true)

  // Pagination state
  const currentPage = parseInt(searchParams.get('page') || '1')
  const [totalPages, setTotalPages] = useState(1)

  const [selectedCate, setSelectedCate] = useState<string | null>(null)

  //api cate
  const handleGetAllCategory = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllCategory(params)
      if (!res || !res.data) return
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAllCategory()
  }, [])

  //Api product
  const handleGetAllProduct = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllProduct(params)
      if (!res || !res.data) return
      setProductsData(res.data)
      setTotalPages(res.data.totalPages)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetCategoryDetail = async (cateId: string) => {
    try {
      const res = await getProductByCategoryId(cateId)
      if (!res || !res.data) return
      setProductsData(res || [])
      setTotalPages(res.data.totalPages)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!selectedCate) {
      handleGetAllProduct({ page: currentPage })
    } else {
      handleGetCategoryDetail(selectedCate)
    }
  }, [selectedCate, currentPage])

  // Chọn category
  const handleCategoryChange = (cateId: string | null) => {
    setSelectedCate(cateId)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    setSearchParams(newSearchParams)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }
  if (loading) return <p>Đang tải sản phẩm...</p>
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-8 flex gap-8">
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
              <div className="flex py-2">
                <input type="checkbox" id="all" checked={!selectedCate} onChange={() => handleCategoryChange(null)} />
                <p className="px-2">Tất cả</p>
              </div>

              {categories.map((item) => (
                <div key={item._id} className="flex py-2">
                  <input
                    type="checkbox"
                    id={item._id}
                    checked={selectedCate === item._id}
                    onChange={() => handleCategoryChange(item._id)}
                  />
                  <p className="px-2">{item.name}</p>
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
            {productsData.data.map((product: any) => (
              <div key={product._id}>
                <ProductCard item={product} />
                <div>{product.createdAt}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md border ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                }`}
              >
                <i className="bx bx-chevron-left"></i>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-md border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                }`}
              >
                <i className="bx bx-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default NewInList
