import { getAllCategory } from '@/apis/categoriesService'
import { getProductByCategoryId } from '@/apis/productService'
import { ICategory } from '@/models/categories'
import { useEffect, useState } from 'react'

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [images, setImages] = useState<string[]>([])

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllCategory(params)
      if (!res || !res.data) return
      const data = res.data.data
      setCategories(data)

      const imagePromises = data.map(async (cate: ICategory) => {
        try {
          const response = await getProductByCategoryId(cate._id)
          if (response && response.data && response.data.length > 0) {
            return response.data[0].images[0] // lấy ảnh đầu tiên của sản phẩm đầu tiên trong cate
          }
          return '/default.jpg'
        } catch (err) {
          console.error(`Error fetching image for category ${cate.name}:`, err)
          return '/default.jpg'
        }
      })

      const imageResults = await Promise.all(imagePromises)
      setImages(imageResults)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAll()
  }, [])

  return (
    <div className="w-[90%] max-w-6xl mx-auto py-10">
      <ul className="grid grid-cols-3 gap-10">
        {categories.map((item, idx) => (
          <li key={item._id} className="text-xl text-center">
            <a href={`/category/${item._id}`}>
              <div>
                <img
                  src={images[idx]}
                  alt={item.name}
                  className="h-auto w-full object-cover transition-opacity duration-300  aspect-[2/3] shadow-lg rounded-lg mb-2"
                />
              </div>
              <p>{item.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
