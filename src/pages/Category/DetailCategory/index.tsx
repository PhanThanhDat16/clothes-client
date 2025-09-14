import { getProductByCategoryId } from '@/apis/productService'
import ProductCard from '@/components/ProductCard'
import { IProduct } from '@/models/product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailCategory = () => {
  const { id } = useParams<{ id: string }>()
  const [products, setProducts] = useState<IProduct[] | []>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchProductById(id)
    }
  }, [id])

  const fetchProductById = async (cateId: string) => {
    try {
      setLoading(true)

      const response = await getProductByCategoryId(cateId)

      if (response && response.data) {
        setProducts(response.data)
        // Set default size
      }
    } catch (err) {
      console.error('Error fetching product detail:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Đang tải sản phẩm...</p>

  return (
    <div className="max-w-7xl mx-auto w-[80%] py-10">
      {/* <div className="justify-end flex pb-10">
        <p className="font-semibold text-base">Sắp xếp theo:</p>
        <button className="ml-2 hover:bg-blue-950 hover:text-white rounded-full bg-gray-300">
          <i className="bx bx-chevron-down p-1"></i>
        </button>
      </div> */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailCategory
