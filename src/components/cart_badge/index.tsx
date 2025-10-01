type CartIconProps = {
  count: number
}

const CartIcon = ({ count }: CartIconProps) => {
  return (
    <div className="relative inline-block mr-3">
      <i className="bx bx-cart text-gray-800 text-3xl"></i>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 transition-all duration-300 bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-full shadow-md">
          {count}
        </span>
      )}
    </div>
  )
}

export default CartIcon
