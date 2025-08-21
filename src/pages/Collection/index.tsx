const ListNameCategory = [
  { id: 1, name: 'Áo Thun' },
  { id: 2, name: 'Áo Khoác' },
  { id: 3, name: 'Jeans' },
  { id: 4, name: 'Pants' },
  { id: 5, name: 'Polo' },
  { id: 6, name: 'Short' },
  { id: 7, name: 'Sơmi' },
  { id: 8, name: 'Phụ kiện' }
]
const Collection = () => {
  return (
    <div className="w-[90%] max-w-[1600px] mx-auto py-10">
      <ul className="grid grid-cols-2 gap-6">
        {ListNameCategory.map((item) => (
          <li key={item.id} className="text-xl">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Collection
