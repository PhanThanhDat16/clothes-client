type CartIconProps = {
  count: number
}

const CartIcon = ({ count }: CartIconProps) => {
  return (
    <div className="relative inline-block mr-3">
      <i className="bx bx-cart text-gray-800 text-3xl pl-1"></i>
      {count > 0 && (
        <span className="absolute -top-2 -right-3 transition-all duration-300 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  )
}

export default CartIcon
