import { getAllCategory } from '@/apis/categoriesService'
import { ICategory } from '@/models/categories'
import { useEffect, useState } from 'react'

// const ListNameCategory = [
//   { id: 1, name: 'Áo Thun' },
//   { id: 2, name: 'Áo Khoác' },
//   { id: 3, name: 'Jeans' },
//   { id: 4, name: 'Pants' },
//   { id: 5, name: 'Polo' },
//   { id: 6, name: 'Short' },
//   { id: 7, name: 'Sơmi' },
//   { id: 8, name: 'Phụ kiện' }
// ]
const Category = () => {
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
    <div className="w-[90%] max-w-[1600px] mx-auto py-10">
      <ul className="grid grid-cols-2 gap-6">
        {categories.map((item) => (
          <li key={item._id} className="text-xl">
            <a href={`/category/${item._id}`}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
