interface CategoriesCardProps {
  name: string
  href: string
  img: string
}

const CategoriesCard = ({ name, img }: CategoriesCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
      <div className="aspect-[3/4] relative">
        <img
          src={img}
          alt={name}
          className="h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white text-sm font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {name}
          </h3>
          <div className="w-0 group-hover:w-6 h-0.5 bg-white transition-all duration-300"></div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesCard
